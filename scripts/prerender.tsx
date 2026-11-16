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
  html = html.replace(/<title>[^<]*<\\/title>/, `<title>${safeTitle}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"\\s*\\/>/, `<meta name="description" content="${safeDescription}" />`);
  html = html.replace(/<link rel="canonical" href="[^"]*"\\s*\\/>/, `<link rel="canonical" href="${url}" />`);
  html = html.replace(/<meta property="og:title" content="[^"]*"\\s*\\/>/, `<meta property="og:title" content="${safeTitle}" />`);
  html = html.replace(/<meta property="og:description" content="[^"]*"\\s*\\/>/, `<meta property="og:description" content="${safeDescription}" />`);
  html = html.replace(/<meta property="og:url" content="[^"]*"\\s*\\/>/, `<meta property="og:url" content="${url}" />`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*"\\s*\\/>/, `<meta name="twitter:title" content="${safeTitle}" />`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"\\s*\\/>/, `<meta name="twitter:description" content="${safeDescription}" />`);
  html = html.replace(/<script type="application\\/ld\\+json">[\\s\\S]*?<\\/script>/, `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`);
  return html;
}

const routeHtml = renderRouteDocument(template, render(<LocalSeoGoogleMapsPage />));
const routeOutput = resolve(distPath, "layanan/local-seo-google-maps/index.html");
await mkdir(dirname(routeOutput), {recursive: true});
await writeFile(routeOutput, routeHtml, "utf8");
console.log(`Prerendered ${localSeoGoogleMapsMetadata.path} (${routeHtml.length.toLocaleString("en-US")} HTML characters).`);
