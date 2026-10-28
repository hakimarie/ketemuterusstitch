<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/bd9d0a4c-13e0-401c-8419-62894e99adbc

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`



## Audit data integrations — no paid Google Maps API

- **AI estimate:** Gemini creates a heuristic checklist from the submitted business name, category, and location. Scores are estimates, not verified findings.
- **Public Google Maps profile:** no Google Places API is called. To avoid Google API billing, users manually open the profile/search in Google Maps and verify rating, review count, address, website, hours, and profile details.
- **Local ranking grid:** client-side grid creates nine coordinate-specific Google Maps search links. Users inspect the visible results and record positions manually. No Google Maps API, SERP scraping, or paid ranking provider is called.
- **Owner-authorized metrics:** Google Business Profile and Search Console OAuth integrations are not connected in this phase.

### Environment variables

- `GEMINI_API_KEY` — required for AI-generated audit recommendations. This is a Gemini service credential, not a Google Maps API key.
- No `GOOGLE_MAPS_API_KEY`, `GOOGLE_PLACES_API_KEY`, `DATAFORSEO_LOGIN`, or `DATAFORSEO_PASSWORD` is required for the manual audit/grid path.

### Local ranking measurement limits

The grid is a manual observation worksheet, not an automated rank measurement. Google Maps search URLs may open different result layouts or personalize results. Record the device, time, search context, and visible position consistently when comparing snapshots. A business not visible in the first 20 results is recorded only as “not seen in 20 results” for that manual check, not proof that the business is absent from Maps.

The grid currently does not save results to a database or create automatic history. Export CSV to keep a record. Build/typecheck and end-to-end UI checks must pass before production rollout.
