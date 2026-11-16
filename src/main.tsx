import {StrictMode} from "react";
import {hydrateRoot} from "react-dom/client";
import App from "./App.tsx";
import LocalSeoGoogleMapsPage from "./pages/LocalSeoGoogleMapsPage.tsx";
import WebsiteUmkmPage from "./pages/WebsiteUmkmPage.tsx";
import "./index.css";

const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
const pages: Record<string, typeof App> = {
  "/layanan/local-seo-google-maps": LocalSeoGoogleMapsPage,
  "/layanan/website-umkm": WebsiteUmkmPage,
};
const Page = pages[pathname] ?? App;

hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <Page />
  </StrictMode>,
);
