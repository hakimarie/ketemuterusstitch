import {readFile, writeFile} from "node:fs/promises";
import {resolve} from "node:path";
import {StrictMode} from "react";
import {renderToString} from "react-dom/server";
import App from "../src/App";

const outputPath = resolve(process.cwd(), "dist/index.html");
const html = await readFile(outputPath, "utf8");
const appHtml = renderToString(
  <StrictMode>
    <App />
  </StrictMode>,
);

if (!html.includes("<!--app-html-->")) {
  throw new Error("Prerender placeholder <!--app-html--> was not found in dist/index.html");
}

await writeFile(outputPath, html.replace("<!--app-html-->", appHtml), "utf8");
console.log(`Prerendered KetemuTerus homepage (${appHtml.length.toLocaleString("en-US")} HTML characters).`);
