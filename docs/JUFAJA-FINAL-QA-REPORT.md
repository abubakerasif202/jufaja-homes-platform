# JUFAJA final QA and release report

Prepared 12 October 2026 for `feat/design-image-integration-qa`.

## Release decision

The branch is locally validated and suitable for preview review, but it is not ready for Production merge. The catalogue has 63 designs and 27 reviewed unique image assignments; 36 designs remain pending because their package candidates are duplicate compositions, low-resolution collage crops, text-bearing artwork, or absent from the supplied archive. No repeated fallback image is shown for those records. Do not merge this change until the remaining imagery has been supplied or approved.

## Image integration

- Source package: `JUFAJA_50_Design_Renders_5_Batches.zip`, with manifest and README, staged outside the repository.
- Published: 27 slug-specific 1440 × 1080 WebP images, totaling 10,039,612 bytes (9.57 MiB). Each card/detail pair uses the same path.
- Pending: 36 of 63 catalogue designs. See [`JUFAJA-IMAGE-QA-REPORT.md`](JUFAJA-IMAGE-QA-REPORT.md) for every rejected candidate and missing slug.
- `npm run audit:design-images`: passed; 63 registry records, 27 available images and 36 pending. Audit checks catalogue type, unique path and SHA-256, WebP format, minimum 1200 × 900 dimensions and accepted aspect ratio, exact registry dimensions/bytes, recalculated pixel DCT pHash, and pairwise near-duplicate threshold.
- Package-wide candidate comparison identified Blaxland/Majestic and Kingston/Oxley 26 as similar facade compositions; the latter two candidates remain unpublished. Wrong-storey Oxley and Eden package candidates were excluded. Two generic representative single-storey concept images were generated for those slugs; neither is claimed to be an approved design facade or completed JUFAJA home.
- Existing property photography in `/projects` remains unchanged. `node scripts/audit-assets.mjs` completed and inventoried 102 assets; it reported three exact-match groups and nine visual candidates for reference in `docs/asset-inventory.json`. No existing gallery or brand assets were removed.

## Automated verification

| Check | Result | Evidence |
|---|---|---|
| `npm ci` | Pass | Installed 396 packages from the lockfile; 9 development-tree advisories were reported. |
| `npm run lint` | Pass | ESLint: no issues. |
| `npx tsc --noEmit` | Pass | No errors when run after the production build completed. A parallel attempt raced the build while it regenerated `.next/types`; the sequential check passed. |
| `npm test` | Pass | 28 tests, 0 failures. |
| `npm run build` | Pass | Next.js 16.3.8 production build; 80 static pages generated. |
| `npm run audit:design-images` | Pass with pending inventory | 63 records; 27 unique image files; 36 pending. |
| `python scripts/qa-http.py` | Pass | 74 public routes, sitemap/robots and enquiry context verified; invalid design, package and general URLs return 404. |
| `node scripts/audit-assets.mjs` | Pass | 102 assets inventoried; duplicate/candidate groups are recorded, not deleted. |
| `node scripts/qa-accessibility.mjs` | Pass | 34 checks, 0 violations. |
| `node scripts/qa-ssr.mjs` | Pass | First-response HTML validated on all 74 public routes. |
| `node scripts/qa-nojs.mjs` | Pass | 148 page checks across all 74 routes at mobile and desktop, 0 failures. |
| `node scripts/qa-intro.mjs` | Pass | Normal-motion intro at 390, 430, 768, 1440, and 1920px; WebGL-disabled and JavaScript-disabled paths; CLS 0. |
| `node scripts/qa-hydration.mjs --soak=true --loads=200` | Pass | 200 loads; 0 hydration events, runtime errors, or failed requests. |
| `node scripts/qa-gallery.mjs` | Pass | All 11 galleries at 320, 390, 430, 768, 1024, 1440, and 1920px; image controls, thumbnails, swipe, Escape, close, focus and search passed. |
| `node scripts/qa-browser.mjs` | Pass | 269 route/viewport checks; 10 major interaction journeys; 0 browser errors. All 74 routes at 390/1440px and representative routes at 320/360/430/768/1024/1280/1920px. |
| Focused `qa-browser.mjs` | Pass | 48 page/viewport checks for homepage, catalogue, available single-storey/duplex details, and pending duplex detail at 320/360/390/430/768/1024/1440/1920px; 10 interactions; zero overflow, broken images, missing alt text, or browser errors. |
| Current Production browser comparison | Pass | 12 checks at 390/1440px for home, catalogue, Blaxland detail, property gallery, contact, and an unknown route. This is the existing Production site, not the feature preview. |
| `npm audit --omit=dev` | Pass | 0 production dependency vulnerabilities. |
| `npm audit` | Outstanding maintenance | 9 development-tree findings: 7 high and 2 moderate. Automated remediation proposes a Tailwind 4 major upgrade; no forced upgrade was applied. |
| `git diff --check` | Pass | No whitespace errors. |

## Visual and runtime evidence

Responsive screenshots and JSON reports are stored outside the repository under `C:\Users\abuba\jufaja-image-qa-artifacts\`:

- `release-local-all/` — final all-route browser matrix and screenshots after the image aspect-ratio correction.
- `release-local-responsive/` — final focused eight-width responsive matrix; the pending Stanmore and available Blaxland screenshots were visually inspected at 390px, and the catalogue screenshot at 1440px.
- `final-production-current/` — current Production comparison, not the feature branch.
- `final-local-responsive-retest/` — corrected run for the hydration timing assertion; the final `release-local-responsive/` run also passed.

The site uses no measured field Core Web Vitals in this task. Final local Playwright lab data recorded maximum observed LCP of 3.52 seconds on the first cold 320px homepage run and 492 ms in the focused catalogue/detail run; CLS was 0 in both. The slower cold load did not repeat at subsequent viewport sizes. INP and Lighthouse were not measured. These are local lab observations, not field-performance guarantees.

## Enquiry, secrets, and integrations

No real enquiry was submitted. Browser form journeys intercepted `/api/enquiry`. Vercel Production lists the required environment-variable names as configured hidden secrets; values were not read or printed. Resend sender verification and live Upstash connectivity were not tested, so live delivery and rate-limit service health remain unverified. Do not bypass rate limiting to test them.

## Production and repository state

- Canonical domain: `https://www.jufajaconstructions.com.au`; current Production returned HTTP 200 over TLS and the existing Vercel project has a Ready Production deployment.
- Current `main` base: `045c30a3d61bf71739994d4f172f31844c705798`.
- Feature commit SHA: pending.
- GitHub pull request: pending.
- Vercel preview URL/status: pending.
- No Production deployment or DNS change was made for this feature.

## Remaining release blockers

1. Obtain, create, or approve distinct, high-resolution, dwelling-type-correct imagery for all 36 pending designs. Confirm each design-specific assignment against approved source material.
2. Review the preview after branch deployment, then replace the pending preview, PR, and SHA fields above with verified values.
3. Review the development dependency findings and confirm Resend sender and Upstash health before a release that claims live enquiry delivery is verified.

The requested implementation, local validation, and client handoff are complete for preview review. Production acceptance is not complete while the catalogue has 36 pending images and the integration checks above remain unverified.
