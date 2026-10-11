# JUFAJA final QA and release report

Prepared 12 October 2026 from clean feature worktree based on `main` commit `2a244a200668bc3a229a0a67747319ad4dbd06f7` (merged PR #11).

## Release decision

The preview candidate contains 56 unique suitable catalogue images across 63 designs. Seven remain pending for wrong-storey or cropped-source defects. Production has not been changed. Per the release instructions, merge is blocked until suitable source art replaces the seven pending candidates and the owner accepts the preview. Resend and Upstash live service health were not verified.

## Changes

- Added 34 of the supplied 36 WebP renders at native 1200 × 896, with original bytes, SHA-256, pixel pHash, source provenance and SHA-bound visual-review attestations.
- Retained 22 conforming prior assignments and marked five visibly wrong-storey records pending, preserving their files/provenance.
- Kept Majestic and Stuart pending because their source frames cut off part of the house.
- Fixed related design cards so they display the same registry-backed representative image as cards and detail pages.
- Preserved verified plan metadata, existing project photography, CGI disclosures, Resend and Upstash controls and factual service content.
- Added reproducible source inventory and design-image browser QA scripts.

## Verification

| Check | Result |
|---|---|
| `npm ci` | Pass, lockfile install; npm reported 9 development dependency advisories |
| `npm run lint` | Pass, no issues |
| `npx tsc --noEmit` | Pass |
| `npm test` | Pass, 31 tests |
| `npm run build` | Pass, Next.js production build and 80 prerender jobs |
| `npm run audit:design-images` | Pass, 63 records, 56 unique images, 7 pending |
| `npm audit --omit=dev` | Pass, zero production advisories |
| `node scripts/audit-assets.mjs` | Pass, 136 repository assets inventoried; 3 exact groups and 9 visual candidates reported in local generated inventory |
| `git diff --check` | Pass |
| `python scripts/qa-http.py` | Pass; site routes, metadata, sitemap, robots, enquiry context and real 404 checks |
| `node scripts/qa-ssr.mjs` | Pass, 74/74 public routes |
| `node scripts/qa-nojs.mjs` | Pass, 148 mobile/desktop page checks across 74 routes |
| `node scripts/qa-accessibility.mjs` | Pass, 34 checks, 0 violations |
| `node scripts/qa-browser.mjs` | Pass, 235 route/viewport checks, 0 overflow or broken visible images, 0 browser errors; 4 enquiry calls intercepted and no message delivered |
| `node scripts/qa-design-images.mjs` | Pass, 56 assets byte/SHA verified; all 63 catalogue cards, all detail routes, 189 related cards, 3 homepage featured cards; zero errors/enquiries |
| `node scripts/qa-gallery.mjs` | Pass at 320, 390, 430, 768, 1024, 1440, 1920; image controls, focus, Escape and filters |
| `node scripts/qa-intro.mjs` | Pass, normal motion, WebGL disabled and JavaScript disabled |
| `node scripts/qa-hydration.mjs --loads=100` | Pass, 100 loads, 0 hydration events, 0 console errors, 0 failed requests |

The hydration report is at `C:\Users\abuba\jufaja-image-review\hydration-local\report.json`. The browser report and screenshots are outside the repository under `C:\Users\abuba\jufaja-image-review\browser`. The image-only report is at `%TEMP%\jufaja-design-image-qa\design-images.json`. Other logs and the 63-design visual contact sheets are outside Git under `C:\Users\abuba\jufaja-image-review`. These are local lab and preview evidence, not production field Core Web Vitals. The production-current deployment remains SHA `2a244a200668bc3a229a0a67747319ad4dbd06f7`; this feature has not been deployed to Production.

## Images and remaining review

The 36 pending-source files decode at 1200 × 896 and are matched by slug. The owner explicitly approved use at native resolution after the four-pixel shortfall from the standard 1200 × 900 minimum was explained. No stretching, padding or upscaling was used. The general dimension gate remains 1200 × 900; a separate exact-size exception is bound to each supplied image hash. Distinct facade checks include actual-file hash, pairwise pHash and manual comparison; human approval is an attestation, not automated architectural recognition.

The seven pending slugs are listed with individual reasons in `JUFAJA-IMAGE-QA-REPORT.md`. Do not label the catalogue 63/63 complete. All catalogue CGI is representative imagery and not evidence of completed JUFAJA projects. The `/projects` property gallery remains genuine photography and was not modified.

## SEO, integrations and deployment

The route audit confirms the sitemap excludes unverified catalogue details, canonical metadata and actual missing-route 404 behavior. No sitemap or SEO regression was found.

QA intercepted form delivery and made no customer enquiries. Resend sender verification and Upstash live connectivity remain unverified; this work does not establish external service health. Credentials remained server-side and were not printed or committed. npm reported 9 development-tree dependency advisories (7 high, 2 moderate); production audit is clean and no breaking dependency upgrade was attempted.

PR #12 is open at https://github.com/abubakerasif202/jufaja-homes-platform/pull/12. Commit `19b22f7b84a7915b4d1979a4390f40743b1dbf13` is deployed to Vercel Preview `https://jufaja-homes-platform-h7ui0y0ed-abubakerasif202s-projects.vercel.app` (deployment `dpl_GAxWvdTxnT8U6u6vbSz4jE8nv27K`, READY). GitHub reports both Vercel Preview and CI successful (2 checks, 0 failures); CodeRabbit reports a skipped review requiring manual OSS review, so it is not counted as code approval. The preview was opened in a browser: all 56 published image responses loaded, with 0 broken images; pending designs remain visibly pending. Production stays on SHA `2a244a200668bc3a229a0a67747319ad4dbd06f7` until suitable images resolve the seven blockers. No production release was attempted.

## Client handoff

To replace a pending render, supply an approved, complete facade at least 1200 × 900 if possible, with no text, watermark or collage. Confirm storeys and dwelling count against approved plan material. Save the optimized image to `public/images/designs/<slug>.webp`, update that slug's registry image/source/hash/visual-review fields, remove the native-size exception when the replacement meets the generic gate, and run the image audit, tests and browser image QA. Never reuse another design's picture or present CGI as a completed project.
