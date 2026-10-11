# JUFAJA Constructions website handoff

Prepared 12 October 2026 for the image-integration feature branch. This is a tested preview handoff, not production acceptance: 36 of 63 designs still lack an approved unique image, so the feature must not be merged to Production yet.

## Website overview

The site presents JUFAJA Constructions, its building services, property photography, enquiry options, and a 63-entry design-reference catalogue. Catalogue renders are representative CGI; they are not proof of completed JUFAJA builds or approved construction drawings. The catalogue now shows a unique image only when its slug-specific asset passes the image review. Other records show an explicit pending state.

The genuine `/projects` property gallery remains unchanged. Its 28 addresses and 50 delivered photos are protected by the existing gallery integrity tests.

## Public pages

- `/` — Home
- `/about-us` — About JUFAJA
- `/custom-homes` — Custom homes
- `/knockdown-rebuild` — Knockdown rebuild
- `/designs` — Home design catalogue and filters
- `/designs/[slug]` — 63 catalogue detail routes
- `/packages` — House and land package listings
- `/display-homes` — Display home enquiries
- `/inclusions` — Inclusions
- `/projects` — Genuine property gallery
- `/contact` — Contact and enquiry form
- `/privacy` — Enquiry privacy

The generated sitemap, robots file, and web manifest are `/sitemap.xml`, `/robots.txt`, and `/manifest.webmanifest`.

## Technology

Next.js 16.3.8 App Router, React 18.3.1, TypeScript, Tailwind CSS 3.4.19, Vercel, Resend, and Upstash Redis. Local validation used Node.js 26.11.0 and npm 11.20.0. `sharp` 0.35.5 is a development-only dependency used by the image audit to decode actual WebP pixels and recalculate perceptual hashes; it is not imported by the site runtime.

## Images and catalogue editing

The source package was `JUFAJA_50_Design_Renders_5_Batches.zip`; it remains in the user's Downloads folder and its extracted staging copy is outside the repository. The site contains 27 unique WebP files in `public/images/designs/`: 25 suitable full-size package renders and two new generic representative CGI replacements for the wrong-storey Oxley and Eden candidates. Each file is 1440 × 1080. No CGI was added to the genuine property gallery.

The complete per-design image status, dwelling type, source, dimensions, file size, SHA-256, and perceptual hash are in `src/data/design-images.json`. `src/data/designs.json` remains the source of catalogue names and listed specifications. To replace an image, add the reviewed WebP as `public/images/designs/<slug>.webp`, update only that slug's `image` record and provenance/hash fields, then run `npm run audit:design-images`, `npm test`, and the responsive browser review. Do not reuse another design's file or promote a collage crop, wrong-storey image, or unverified property photo. The complete 36-design replacement list and reasons are in `JUFAJA-IMAGE-QA-REPORT.md`.

The archive includes 50 candidates, but only 27 currently pass the type, composition, resolution, uniqueness, and no-text checks. The other 36 remain visibly pending in the catalogue. The two generated images are indicative generic renders, not approved design-specific facades.

## Enquiries and integrations

The contact form and quick enquiry drawer submit to the server-side `/api/enquiry` route. Server validation, duplicate/spam controls, and the production rate-limit fail-closed path are covered by automated tests. Successful delivery is intended to use Resend; production rate limiting uses Upstash Redis.

Vercel's Production environment lists all five required variable names as hidden secrets: `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL`, `ENQUIRY_TO_EMAIL`, `UPSTASH_REDIS_REST_URL`, and `UPSTASH_REDIS_REST_TOKEN`. Their values were not read. No real enquiry was sent. This review did not verify the configured sender value against Resend's domain verification or make a live Redis request, so those service-health claims remain unverified. The owner should confirm the approved sender address and provider status before treating enquiry delivery as production-verified.

## Domain and deployment

The canonical domain is `https://www.jufajaconstructions.com.au`. At review time it returned HTTP 200 through Vercel over TLS; DNS returned Vercel A records `216.150.16.65` and `216.150.16.129`. No DNS or domain settings were changed. Vercel CLI showed a recent Production deployment in Ready state for the existing `jufaja-homes-platform` project. This feature branch is based on `main` at `045c30a3d61bf71739994d4f172f31844c705798`. The image change has not been merged or deployed to Production.

The tested feature commit is `c92a08186ca00a558207118e6607a0c244fe3ba9`, on draft [PR #11](https://github.com/abubakerasif202/jufaja-homes-platform/pull/11). Its Vercel Preview deployment is Ready and passed authenticated browser checks on 14 key public routes at 390px and 1440px; the full local browser suite covered all 74 public routes. The feature remains out of Production while 36 catalogue designs need approved, unique imagery. See the final QA report for deployment and test evidence.

## SEO and Search Console

The canonical host remains the `www` domain. Local HTTP QA checked canonical tags, page headings, route titles, sitemap and robots responses, and 404 behavior across 74 public routes. Catalogue detail pages remain `noindex` and are excluded from the sitemap because their listed data is reference material that must be confirmed; the sitemap includes the approved indexable routes. Invalid design, package, and general routes return a real 404.

Google Search Console access was not available in this task. After an approved release, the owner should verify the `https://www.jufajaconstructions.com.au/` property, submit `/sitemap.xml`, inspect indexed canonical URLs, and review Page Indexing and Core Web Vitals. Google Business Profile is separate from the website sitemap; no listing access or change was made.

## Accessibility and performance QA

On the final local build, the Playwright browser suite checked all 74 public routes at 390px and 1440px. It checked the homepage, top-level routes, one design per dwelling category, and a missing route at 320, 360, 430, 768, 1024, 1280, and 1920px. A focused run checked the homepage, catalogue, available single-storey and duplex details, and pending duplex detail at 320, 360, 390, 430, 768, 1024, 1440, and 1920px. The measured matrices had no horizontal overflow, broken images, missing alt attributes, or browser errors. Responsive screenshots were inspected. The production-current site was also checked at 390px and 1440px for homepage, catalogue, Blaxland detail, property gallery, and contact page.

The accessibility script reported 0 violations in 34 route/viewport checks. Raw SSR passed all 74 routes. JavaScript-disabled browser QA passed all 74 routes at mobile and desktop sizes (148 page checks). Intro QA passed normal motion, WebGL-disabled, and JavaScript-disabled checks with measured CLS 0. A 200-load local hydration soak recorded zero hydration events, other runtime errors, and failed requests. Browser enquiry journeys used intercepted success and failure responses and sent no email.

The final local Playwright run recorded maximum LCP of 3.52 seconds across the all-route matrix (the first cold 320px homepage load), and 492 ms in the focused catalogue/detail run; CLS was 0 in both. These are lab measurements, not field Core Web Vitals. INP and a Lighthouse score were not measured. Browser screenshots and JSON reports are stored outside the repository under `C:\Users\abuba\jufaja-image-qa-artifacts\`.

## Security and dependencies

`npm audit --omit=dev` reported zero production dependency vulnerabilities. A full development dependency audit reported 7 high and 2 moderate findings. The available automatic remediations require a Tailwind CSS major migration to 4.3.3 and an incompatible `eslint-config-next` downgrade to 14.2.35; no automatic or forced upgrade was applied. Keep this development-tooling review separate from the clean production dependency result, and schedule a compatible patch review before the next dependency-maintenance release.

The project keeps Resend and Upstash credentials server-side. Vercel reported the required environment names as hidden; no values were printed or committed. No API credential was added by this change.

## Backup and rollback

The feature branch is based on the current `main` commit `045c30a`. If a later merge causes a regression, revert the feature commit with a new revert commit or redeploy the last known-good Vercel Production deployment. Do not rewrite shared history or force-push. Keep the image files and their registry entries in the same rollback unit.

## Outstanding work and recommendations

- Obtain or create distinct high-resolution imagery for the 36 pending designs, then confirm each image against approved design material and dwelling type.
- Review the seven high and two moderate development-tool audit findings and choose compatible fixes without a broad framework migration.
- Confirm the production sender identity and Resend verification; perform an owner-authorized delivery test only after that check. Verify Upstash connectivity separately without bypassing rate limits.
- Re-run the Vercel preview and browser review after the missing image work; only then consider Production merge and release.
- Verify Search Console and Google Business Profile with the owner after release; neither was changed here.

## Client acceptance checklist

- [ ] Approve or replace all 27 currently published indicative images against the final design references.
- [ ] Supply unique, type-correct images for the 36 pending design records.
- [ ] Confirm the Resend sender domain and production sender/recipient settings without exposing credentials.
- [ ] Review the preview website, all catalogue imagery, service pages, forms, and genuine property photography.
- [ ] Confirm Search Console ownership and submit the sitemap after the production release.
- [ ] Accept accessibility, responsive, security, and dependency findings in the final QA report.
- [ ] Approve merge and Production release only after the image and integration blockers are closed.
