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


## Audit data integrations

The audit has three explicitly separated data states:

- **AI estimate**: generated from the submitted business details; scores are heuristic, not measurements.
- **Public Google Maps data**: optional lookup through Google Places API (New) using a server-side key. Only an exact normalized business-name match with a location match is accepted; ambiguous/no-match results are not presented as verified business data.
- **Owner-authorized data**: Google Business Profile and Search Console owner metrics are **not connected** in this phase.

### Environment variables

- `GEMINI_API_KEY` — required for the AI audit text.
- `GOOGLE_MAPS_API_KEY` or `GOOGLE_PLACES_API_KEY` — optional, for public Places lookup. Enable Places API (New), billing, and appropriate key restrictions in Google Cloud. Keep the key server-side; never expose it in client code.
- `DATAFORSEO_LOGIN` and `DATAFORSEO_PASSWORD` — optional, for live local Google Maps ranking measurement. The 3×3 grid sends nine paid provider requests per run. The UI requires explicit cost acknowledgement; verify provider pricing/account balance before use.

If the Google Places key is absent, the audit falls back to an explicitly labelled AI estimate. If the ranking provider credentials are absent, the ranking endpoint returns a configuration error and does not fabricate results.

### Local ranking measurement limits

The rank grid measures the provider's returned Google Maps SERP for one keyword at nine coordinates, on mobile, at the measurement timestamp. A business not found in the returned top 20 is labelled as not found in that result set, not as absent from Google Maps. These are localized snapshots and are not universal or guaranteed rankings.

This phase does not connect owner-authorized Google Business Profile or Search Console data, persist historical measurements, or run automated scheduled rank checks. Validate provider credentials, API billing, live endpoint behavior, and deployment logs before enabling it for customers.
