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
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

The sender must be accepted by the Resend account. Production also requires an Upstash Redis REST URL and token for shared rate limiting; the limiter fails closed if either delivery or shared-rate-limit configuration is missing. Local development can run without Upstash and uses a bounded, process-local fallback. If configuration is missing or delivery fails, the API returns an error and the UI does not claim success.

## Content requiring owner confirmation

The design catalogue contains 63 source records whose measurements, names and plan documentation have not been independently verified in this repository. Several image URLs repeat generic external imagery; visible labels identify those as illustrative. Unverified package pricing, lot availability, display-home addresses, contact details and opening hours were removed; package-detail URLs return not found until a verified live listings source is provided. Verify the design records and provide genuine project photography, current offers, contact details, privacy/legal links and any credentials or service-area claims before publishing them as facts.

## Brand and route notes

- Canonical logo files are in `public/brand/`; header, footer and intro use the exact approved transparent PNG with responsive image optimisation. SVG compatibility files embed that artwork instead of redrawing it; see `public/brand/README.md`.
- The home-page logo intro runs once per session, can be skipped, and has a reduced-motion path.
- The public sitemap contains the indexable top-level routes and excludes unverified package-detail URLs.
- Production metadata currently uses `https://jufaja-homes-platform.vercel.app/`, the production URL supplied for this project.
- The home-page hero is a CSS-driven property slideshow (`src/components/home/HeroSlideshow.tsx`, slide copy and image choices in `src/data/hero-slides.ts`). Autoplay is paced by the active slide's progress bar, pauses on hover, keyboard focus or the pause button, and is disabled under `prefers-reduced-motion`. The imagery is illustrative, not JUFAJA project photography.

## Public contact details

Set the following server environment variables to **owner-approved public business details**, then redeploy so static pages pick them up:

```dotenv
JUFAJA_PUBLIC_PHONE=
JUFAJA_PUBLIC_EMAIL=
JUFAJA_PUBLIC_OFFICE=
JUFAJA_PUBLIC_HOURS=
```

Contact and footer links appear only when these details are supplied. The delivery recipient and sender variables are not treated as public contact information. `/privacy` describes the current website enquiry handling; it does not make claims about wider company practices or statutory compliance.

The contact route reads `interest`, `design` and `project` parameters on the server. The selected subject appears in the form and is included in the existing delivery payload. Catalogue filtering derives state from the current URL, including browser navigation, and ignores invalid filter values.

The published catalogue is projected through `src/lib/catalogue.ts`. Legacy prices, third-party floorplan URLs, unsupported features and tour links remain outside the public browser payload. Illustrative images are separate from approved design facades. The 63 unverified design references remain `noindex, follow` and excluded from the sitemap; only verified designs should be promoted to indexable pages in a future content update.
