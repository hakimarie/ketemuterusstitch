#!/usr/bin/env python3
"""Production-only SEO release monitor for KetemuTerus. Standard library only."""
from __future__ import annotations

import datetime as dt
import html
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path

BASE = "https://www.ketemuterus.biz.id"
TARGETS = [
    "/layanan/local-seo-google-maps/",
    "/layanan/website-umkm/",
    "/layanan/google-ads/",
    "/layanan/meta-ads/",
    "/layanan/digital-marketing-umkm/",
    "/studi-kasus/home-steak-oemah-kopi/",
    "/studi-kasus/soto-mie-kang-hendi/",
]
STATE_PATH = Path("seo-monitor-state.json")
TODAY = dt.datetime.now(dt.timezone.utc).astimezone(dt.timezone(dt.timedelta(hours=7))).date()
UA = "KetemuTerus-SEO-Release-Monitor/1.0 (+https://github.com/hakimarie/ketemuterusstitch)"
TIMEOUT = 25

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title_parts, self.text_parts = [], []
        self.metas, self.links, self.headings, self.jsonld = [], [], [], []
        self._title = False
        self._heading = None
        self._script_type = None
        self._script_parts = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "title": self._title = True
        if tag in ("h1", "h2", "h3", "h4", "h5", "h6"): self._heading = [tag, []]
        if tag == "meta": self.metas.append(a)
        if tag == "link": self.links.append(a)
        if tag == "script" and "ld+json" in a.get("type", "").lower():
            self._script_type = "jsonld"; self._script_parts = []

    def handle_endtag(self, tag):
        if tag == "title": self._title = False
        if self._heading and tag == self._heading[0]:
            self.headings.append((self._heading[0], " ".join(self._heading[1]).strip()))
            self._heading = None
        if tag == "script" and self._script_type == "jsonld":
            self.jsonld.append("".join(self._script_parts))
            self._script_type = None

    def handle_data(self, data):
        if self._title: self.title_parts.append(data)
        if self._heading is not None: self._heading[1].append(data)
        if self._script_type == "jsonld": self._script_parts.append(data)
        if data.strip(): self.text_parts.append(data.strip())

def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/html,application/xml,*/*"})
    with urllib.request.urlopen(req, timeout=TIMEOUT) as response:
        body = response.read(3_000_000)
        return response.status, response.geturl(), response.headers.get("Content-Type", ""), body.decode("utf-8", "replace")

def read_state():
    if STATE_PATH.exists():
        try: return json.loads(STATE_PATH.read_text())
        except Exception: pass
    return {"first_live_date": None, "audit_due_date": None, "completed": False, "pages": {}}

def save_state(state):
    STATE_PATH.write_text(json.dumps(state, indent=2, ensure_ascii=False) + "\n")

def meta_value(metas, key, attr="name"):
    for m in metas:
        if (m.get(attr) or "").lower() == key.lower():
            return (m.get("content") or "").strip()
    return ""

def check_robots():
    url = BASE + "/robots.txt"
    try:
        status, final, ctype, body = fetch(url)
        disallow_all = False
        current_agent = False
        for raw in body.splitlines():
            line = raw.split("#", 1)[0].strip()
            if not line or ":" not in line: continue
            k, v = [x.strip() for x in line.split(":", 1)]
            if k.lower() == "user-agent": current_agent = v == "*"
            elif current_agent and k.lower() == "disallow" and v == "/": disallow_all = True
        return {"status": status, "url": final, "disallow_all": disallow_all, "body": body}
    except Exception as e:
        return {"error": str(e)}

def parse_sitemap():
    urls = set()
    sitemap_url = BASE + "/sitemap.xml"
    try:
        status, final, ctype, body = fetch(sitemap_url)
        root = ET.fromstring(body)
        for loc in root.iter():
            if loc.tag.split("}")[-1] == "loc" and loc.text:
                urls.add(loc.text.strip().rstrip("/"))
        return {"status": status, "url": final, "urls": urls, "error": None}
    except Exception as e:
        return {"status": None, "url": sitemap_url, "urls": urls, "error": str(e)}

def inspect_page(path):
    url = BASE + path
    try:
        status, final, ctype, body = fetch(url)
    except urllib.error.HTTPError as e:
        return {"url": url, "status": e.code, "error": str(e)}
    except Exception as e:
        return {"url": url, "status": None, "error": str(e)}
    p = PageParser()
    p.feed(body)
    metas = p.metas
    title = " ".join(" ".join(p.title_parts).split())
    desc = meta_value(metas, "description")
    robots = meta_value(metas, "robots")
    canonical = next((x.get("href", "").strip() for x in p.links if "canonical" in (x.get("rel") or "").lower().split()), "")
    og = {k: meta_value(metas, k, "property") for k in ("og:title", "og:description", "og:image", "og:url")}
    twitter = {k: meta_value(metas, k) for k in ("twitter:card", "twitter:title", "twitter:description", "twitter:image")}
    internal = []
    for link in p.links:
        href = link.get("href", "")
        if href.startswith("/") or (href.startswith(BASE) and urllib.parse.urlparse(href).netloc == urllib.parse.urlparse(BASE).netloc):
            internal.append(urllib.parse.urljoin(BASE, href))
    schemas, schema_errors = [], []
    for raw in p.jsonld:
        try:
            obj = json.loads(raw)
            objs = obj if isinstance(obj, list) else [obj]
            for item in objs:
                if isinstance(item, dict):
                    typ = item.get("@type")
                    if isinstance(typ, list): schemas.extend(map(str, typ))
                    elif typ: schemas.append(str(typ))
        except Exception as e: schema_errors.append(str(e))
    text_content = " ".join(p.text_parts)
    return {
        "url": url, "status": status, "final_url": final, "content_type": ctype,
        "title": title, "description": desc, "robots_meta": robots, "canonical": canonical,
        "headings": p.headings, "text_length": len(text_content), "text_sample": text_content[:1200],
        "internal_links": internal, "og": og, "twitter": twitter,
        "schemas": schemas, "schema_errors": schema_errors, "html_bytes": len(body),
    }

def add(findings, priority, url, issue, recommendation):
    findings.append({"priority": priority, "url": url, "issue": issue, "recommendation": recommendation})

def main():
    state = read_state()
    if state.get("completed"):
        print("SEO release monitor already completed; no further checks.")
        return 0

    sitemap = parse_sitemap()
    robots = check_robots()
    pages = {path: inspect_page(path) for path in TARGETS}

    # A DNS/network failure makes the run inconclusive. Do not mark pages absent or start the clock.
    attempted = [p for p in pages.values()]
    if all(p.get("status") is None for p in attempted) and sitemap.get("status") is None:
        print("INCONCLUSIVE: production DNS/network/HTTP could not be reached; state unchanged.")
        for p in attempted: print(f"- {p['url']}: {p.get('error')}")
        print(f"- sitemap: {sitemap.get('error')}")
        return 0

    live = {}
    for path, page in pages.items():
        if page.get("status") is not None and 200 <= page["status"] < 300 and page.get("final_url"):
            live[path] = page

    if live and not state.get("first_live_date"):
        state["first_live_date"] = TODAY.isoformat()
        state["audit_due_date"] = (TODAY + dt.timedelta(days=7)).isoformat()
        print(f"FIRST VERIFIED RELEASE: {state['first_live_date']}; SEO audit due {state['audit_due_date']} (Asia/Jakarta).")
        for path, page in live.items():
            print(f"- {page['url']} HTTP {page['status']} -> {page['final_url']}; sitemap={'yes' if page['final_url'].rstrip('/') in sitemap['urls'] or page['url'].rstrip('/') in sitemap['urls'] else 'no'}")
        state["pages"] = {path: {"first_live_date": TODAY.isoformat(), "last_status": page["status"]} for path, page in live.items()}
        save_state(state)
        return 0

    # Before audit date: remain silent except persist newly discovered live URLs.
    for path, page in live.items():
        state.setdefault("pages", {}).setdefault(path, {"first_live_date": TODAY.isoformat()})
        state["pages"][path]["last_status"] = page["status"]
    if not state.get("first_live_date"):
        print("NO VERIFIED TARGET PAGE LIVE. Routine report suppressed.")
        return 0
    if TODAY < dt.date.fromisoformat(state["audit_due_date"]):
        save_state(state)
        print("Monitoring only; audit date has not arrived. Routine report suppressed.")
        return 0

    findings = []
    print(f"SEO AUDIT — release {state['first_live_date']}; audit {TODAY.isoformat()}")
    print(f"robots.txt: {robots.get('status', 'unavailable')} {robots.get('url', '')}; disallow-all={robots.get('disallow_all', 'unknown')}")
    if robots.get("error"): add(findings, "tinggi", BASE + "/robots.txt", "robots.txt tidak dapat diverifikasi: " + robots["error"], "Pastikan robots.txt dapat diakses dan tidak memblokir halaman layanan/studi kasus.")
    if robots.get("disallow_all"): add(findings, "kritis", BASE + "/robots.txt", "Robots.txt memblokir seluruh crawler dengan Disallow: /.", "Hapus aturan blokir global jika halaman memang harus di-crawl.")
    if sitemap.get("error"): add(findings, "tinggi", BASE + "/sitemap.xml", "Sitemap tidak dapat dibaca: " + sitemap["error"], "Pulihkan sitemap XML dan pastikan URL kanonis baru tercantum.")

    live_audit = []
    for path, page in pages.items():
        if page.get("status") is None or not (200 <= page["status"] < 300):
            if path in state.get("pages", {}):
                add(findings, "tinggi", BASE + path, f"Halaman sebelumnya terdeteksi live tetapi sekarang HTTP {page.get('status')}: {page.get('error','')}", "Pulihkan URL atau redirect permanen yang relevan.")
            continue
        live_audit.append(page)
        url = page["url"]
        final = page.get("final_url", "")
        print(f"\n{url} — HTTP {page['status']} -> {final}")
        if urllib.parse.urlparse(final).path.rstrip("/") != path.rstrip("/"):
            add(findings, "sedang", url, f"URL dialihkan ke {final}.", "Pastikan redirect 301/308 menuju URL kanonis yang memang dimaksud.")
        if page.get("robots_meta") and re.search(r"\bnoindex\b", page["robots_meta"], re.I):
            add(findings, "kritis", url, "Meta robots memuat noindex.", "Hapus noindex jika halaman dimaksudkan untuk tampil di hasil pencarian.")
        if not page.get("canonical"):
            add(findings, "tinggi", url, "Canonical tidak ditemukan.", "Tambahkan canonical absolut yang menunjuk URL kanonis halaman.")
        elif urllib.parse.urlparse(page["canonical"]).path.rstrip("/") != path.rstrip("/"):
            add(findings, "tinggi", url, f"Canonical mengarah ke {page['canonical']}.", "Periksa dan arahkan canonical ke URL kanonis halaman ini.")
        if not page.get("title"): add(findings, "tinggi", url, "Title kosong/tidak terbaca.", "Tambahkan title deskriptif dan spesifik sesuai intent halaman.")
        if not page.get("description"): add(findings, "sedang", url, "Meta description kosong/tidak terbaca.", "Tambahkan meta description unik yang menjelaskan manfaat dan cakupan halaman.")
        h1 = [v for k, v in page["headings"] if k == "h1"]
        if len(h1) != 1: add(findings, "sedang", url, f"Jumlah H1 terdeteksi: {len(h1)}.", "Gunakan satu H1 utama yang menjelaskan topik halaman.")
        if page["text_length"] < 500: add(findings, "tinggi", url, f"Teks HTML terbaca relatif tipis ({page['text_length']} karakter).", "Pastikan konten utama, bukti, proses, manfaat, dan CTA ter-render di HTML awal.")
        if not page["internal_links"]: add(findings, "sedang", url, "Tidak ditemukan internal link.", "Tambahkan tautan kontekstual ke layanan terkait, studi kasus, dan kontak.")
        for key, value in page["og"].items():
            if not value: add(findings, "rendah", url, f"Metadata sosial {key} tidak ditemukan.", "Lengkapi Open Graph untuk pratinjau berbagi.")
        if not page["twitter"]["twitter:card"]: add(findings, "rendah", url, "twitter:card tidak ditemukan.", "Tambahkan Twitter Card metadata.")
        if page["schema_errors"]: add(findings, "tinggi", url, "JSON-LD gagal diparse: " + "; ".join(page["schema_errors"]), "Perbaiki sintaks JSON-LD dan validasi kembali.")
        if not page["schemas"]: add(findings, "sedang", url, "Structured data JSON-LD tidak ditemukan.", "Tambahkan hanya schema yang relevan dan didukung konten yang terlihat.")
        if page.get("canonical") and page["canonical"].rstrip("/") not in sitemap["urls"] and url.rstrip("/") not in sitemap["urls"]:
            add(findings, "sedang", url, "URL kanonis tidak ditemukan di sitemap.", "Masukkan URL kanonis ke sitemap.xml.")
        print(f"  title={page['title']!r}; description={page['description'][:160]!r}")
        print(f"  headings={page['headings']}; text_chars={page['text_length']}; internal_links={len(page['internal_links'])}")
        print(f"  schemas={page['schemas']}; JSON-LD parse errors={len(page['schema_errors'])}; HTML bytes={page['html_bytes']}")
        print(f"  OG={page['og']}; Twitter={page['twitter']}")
        print(f"  sitemap={'yes' if final.rstrip('/') in sitemap['urls'] or url.rstrip('/') in sitemap['urls'] else 'no'}")
        print(f"  visible-content sample={page['text_sample'][:500]!r}")

    # Uniqueness checks across all live target pages.
    for field, label in (("title", "Title"), ("description", "Meta description")):
        seen = {}
        for page in live_audit:
            value = page.get(field, "").strip().lower()
            if value:
                if value in seen:
                    add(findings, "tinggi" if field == "title" else "sedang", page["url"], f"{label} duplikat dengan {seen[value]}.", f"Buat {label.lower()} unik yang membedakan intent dan isi halaman.")
                else: seen[value] = page["url"]

    print("\nSearch Console / URL Inspection: tidak diuji oleh workflow ini; tidak ada klaim status indeks/performa.")
    print("\nVERIFIED FINDINGS")
    if not findings: print("- Tidak ditemukan masalah otomatis pada pemeriksaan ini. Search intent dan validitas schema semantik tetap perlu review manusia/tool validator.")
    for f in findings:
        print(f"- [{f['priority'].upper()}] {f['url']}: {f['issue']} Rekomendasi: {f['recommendation']}")
    state["last_audit_date"] = TODAY.isoformat()
    state["completed"] = True
    save_state(state)
    print("\nAUDIT COMPLETE: monitoring state marked completed; subsequent scheduled runs will no-op.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
