import {StrictMode} from "react";
import {hydrateRoot} from "react-dom/client";
import App from "./App.tsx";
import LocalSeoGoogleMapsPage from "./pages/LocalSeoGoogleMapsPage.tsx";
import "./index.css";

const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
const isLocalSeoPage = pathname === "/layanan/local-seo-google-maps";
const Page = isLocalSeoPage ? LocalSeoGoogleMapsPage : App;

hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <Page />
  </StrictMode>,
);
