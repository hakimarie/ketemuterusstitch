import {StrictMode} from "react";
import {hydrateRoot} from "react-dom/client";
import App from "./App.tsx";
import LocalSeoGoogleMapsPage from "./pages/LocalSeoGoogleMapsPage.tsx";
import WebsiteUmkmPage from "./pages/WebsiteUmkmPage.tsx";
import { DigitalAdvertisingPage, GrowthAutomationPage } from "./pages/GrowthServicesPages.tsx";
import "./index.css";

const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
const pages: Record<string, typeof App> = {
  "/layanan/local-seo-google-maps": LocalSeoGoogleMapsPage,
  "/layanan/website-umkm": WebsiteUmkmPage,
  "/layanan/digital-advertising": DigitalAdvertisingPage,
  "/layanan/growth-automation": GrowthAutomationPage,
};
const Page = pages[pathname] ?? App;

hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <Page />
  </StrictMode>,
);
