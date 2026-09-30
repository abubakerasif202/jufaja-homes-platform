# JUFAJA Constructions website

The JUFAJA website is a light, editorial home-design and building-enquiry site built with Next.js App Router. Catalogue measurements and external residential imagery are presented as indicative references; confirm current plans and project details with JUFAJA before relying on them. The `/projects` page is design inspiration, not a portfolio of verified completed builds.

## Development

Requirements: Node.js 20 or later and npm.

```sh
npm install
npm run dev
```

Available validation commands:

```sh
npm run lint
npx tsc --noEmit
npm test
npm run build
```

## Enquiry delivery

`POST /api/enquiry` validates and bounds submissions, applies a honeypot, and sends accepted enquiries through Resend. It does not store submissions in the repository: filesystem writes are ephemeral on serverless deployments. Configure these variables in the local environment or deployment platform before enabling the form:

```dotenv
RESEND_API_KEY=
ENQUIRY_TO_EMAIL=
ENQUIRY_FROM_EMAIL=
```

The sender must be accepted by the Resend account. If configuration is missing or delivery fails, the API returns an error and the UI does not claim success. Distributed rate limiting still requires an external shared rate-limit service before launch.

## Content requiring owner confirmation

The design catalogue contains 63 source records whose measurements, names, availability and plan documentation have not been independently verified in this repository. Several image URLs repeat generic external imagery; visible labels identify those as illustrative. House-and-land and display-home data files are retained as source material but are not currently published as factual offers or locations. Verify the source records and provide genuine project photography, current offers, contact details, privacy/legal links and any credentials or service-area claims before restoring them to public pages.

## Brand and route notes

- Canonical logo files are in `public/brand/`; the header uses the SVG horizontal lockup.
- The home-page logo intro runs once per session, can be skipped, and has a reduced-motion path.
- The public sitemap contains the indexable top-level routes. Individual design detail pages and legacy package detail URLs are noindex and omitted from it.
- Production metadata currently uses `https://jufaja-homes-platform.vercel.app/`, the production URL supplied for this project.
