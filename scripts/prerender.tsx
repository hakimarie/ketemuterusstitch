import {mkdir, readFile, writeFile} from "node:fs/promises";
import {resolve, dirname} from "node:path";
import {StrictMode} from "react";
import {renderToString} from "react-dom/server";
import App from "../src/App";
import LocalSeoGoogleMapsPage from "../src/pages/LocalSeoGoogleMapsPage";
import {localSeoGoogleMapsMetadata} from "../src/pages/pageMetadata";

const distPath = resolve(process.cwd(), "dist");
const homepagePath = resolve(distPath, "index.html");
const template = await readFile(homepagePath, "utf8");

const render = (element: React.ReactElement) =>
  renderToString(<StrictMode>{element}</StrictMode>);

const homepageHtml = render(<App />);
if (!template.includes("<!--app-html-->")) {
  throw new Error("Prerender placeholder <!--app-html--> was not found in dist/index.html");
}
await writeFile(homepagePath, template.replace("<!--app-html-->", homepageHtml), "utf8");
console.log(`Prerendered KetemuTerus homepage (${homepageHtml.length.toLocaleString("en-US")} HTML characters).`);

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function replaceJsonLd(html: string, jsonLd: object) {
  const startTag = '<script type="application/ld+json">';
  const start = html.indexOf(startTag);
  if (start === -1) throw new Error("JSON-LD script tag was not found in the HTML template.");
  const end = html.indexOf("</script>", start);
  if (end === -1) throw new Error("JSON-LD script closing tag was not found in the HTML template.");
  return html.slice(0, start) + startTag + JSON.stringify(jsonLd) + html.slice(end + "</script>".length);
}

function renderRouteDocument(source: string, appHtml: string) {
  const {title, description, url, pageName} = localSeoGoogleMapsMetadata;
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: pageName,
        description,
        inLanguage: "id-ID",
        isPartOf: {"@id": "https://www.ketemuterus.biz.id/#website"},
        about: {"@id": "https://www.ketemuterus.biz.id/#organization"},
        mainEntity: {"@id": `${url}#service`},
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: "Local SEO dan Optimasi Google Maps",
        serviceType: ["Local SEO", "Google Business Profile Optimization", "Google Maps Optimization", "Review Management"],
        description,
        provider: {"@id": "https://www.ketemuterus.biz.id/#organization"},
        areaServed: {"@type": "Country", name: "Indonesia"},
        url,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {"@type": "ListItem", position: 1, name: "Beranda", item: "https://www.ketemuterus.biz.id/"},
          {"@type": "ListItem", position: 2, name: "Layanan", item: "https://www.ketemuterus.biz.id/#services"},
          {"@type": "ListItem", position: 3, name: "Local SEO & Google Maps", item: url},
        ],
      },
    ],
  };

  let html = source.replace("<!--app-html-->", appHtml);
  html = html.replace("<title>KetemuTerus — Local Business Growth Partner</title>", `<title>${safeTitle}</title>`);
  html = html.replace('content="KetemuTerus adalah mitra pertumbuhan digital untuk UMKM dan bisnis lokal di Indonesia. Tingkatkan visibilitas Google Search dan Maps, website, Google Ads, Meta Ads, serta otomasi pemasaran."', `content="${safeDescription}"`);
  html = html.replace('href="https://www.ketemuterus.biz.id/"', `href="${url}"`);
  html = html.replace('content="KetemuTerus — Local Business Growth Partner"', `content="${safeTitle}"`);
  html = html.replace('content="Partner pertumbuhan digital untuk UMKM dan bisnis lokal. Bangun visibilitas, kepercayaan, dan pertumbuhan dengan strategi yang sesuai kebutuhan bisnis."', `content="${safeDescription}"`);
  html = html.replace('content="Mitra pertumbuhan digital untuk UMKM dan bisnis lokal di Indonesia."', `content="${safeDescription}"`);
  html = replaceJsonLd(html, structuredData);
  return html;
}

const routeHtml = renderRouteDocument(template, render(<LocalSeoGoogleMapsPage />));
const routeOutput = resolve(distPath, "layanan/local-seo-google-maps/index.html");
await mkdir(dirname(routeOutput), {recursive: true});
await writeFile(routeOutput, routeHtml, "utf8");
console.log(`Prerendered ${localSeoGoogleMapsMetadata.path} (${routeHtml.length.toLocaleString("en-US")} HTML characters).`);
