# Production audit and repair — 5 October 2026

This document records the completed local audit before release. At that point, website code had not been committed, pushed or deployed. Subsequent release preparation adds root AGENTS.md and uses the verified public canonical domain, https://www.jufajaconstructions.com.au. Live enquiry delivery remains blocked by DNS authentication and server credentials; no real enquiry or email was sent.

The checkout had no root `AGENTS.md`; the instructions supplied in the conversation governed execution. Existing untracked files `x` and the root portrait PNG were preserved.

## Repaired

- Fixed desktop service-menu toggling, mobile focus handling and resize unlock; retained the approved logo opening and keyboard skip behaviour.
- Fixed form cancellation, pending submissions, duplicate-submit guards and drawer close/reopen state. Tightened server phone validation, shared rate-limit response validation and Resend delivery-receipt checks.
- Fixed intermittent production hydration around streamed route content with an explicit Suspense boundary. Motion preferences now hydrate deterministically and update in a transition. Temporary diagnostic bundle changes were removed by clean rebuilds.
- Unknown design slugs now return HTTP 404 through static-only route parameters. Error/not-found screens retain one main landmark; loading reserves the initial viewport and respects reduced motion.
- Added a keyboard skip link; corrected low-contrast labels, heading structure, mobile wrapping and repetitive related cards. Removed the duplicate floating contact-page launcher that obscured content; the form and header CTA remain available.
- Diversified homepage featured dwelling types; removed eleven unreachable components, an obsolete fictional-data seed script, and unused form/schema dependencies.
- Added a manifest, corrected homepage social metadata/title handling, centralised sitemap/robots/schema URL usage and retained noindex for unverified design references.
- Added frame, MIME, referrer and browser-permission security headers. Removed obsolete remote-image allowances. No active WebGL renderer or 3D textures were found; the opening uses SVG/DOM motion.

## Images

See [asset audit](asset-audit.md) and [machine inventory](asset-inventory.json).

- 26 assets inventoried using SHA-256, dimensions, alpha metadata, repository references and perceptual difference hashes.
- Four exact duplicate groups and ten near-similarity candidates were reviewed. They are intentional brand variants/source-delivery pairs or original portraits. **Zero duplicate or unused images deleted**: no safely redundant architectural assets existed; approved originals remain intact.
- Six architectural WebPs reduced from 2,249,012 to 1,197,168 bytes (46.8%). Two portrait WebP delivery copies reduced their respective source sizes by 94.7% and 53.1%.
- Created two unique 1536×1024 support visuals: limestone courtyard detail (homepage detail section and inclusions hero) and architectural planning materials (contact hero). Both are optimised WebP, descriptively named and explicitly labelled illustrative; neither is represented as a completed project or confirmed inclusion.

## Rendered coverage

All 74 public pages: eleven top-level pages and 63 design references. Also checked generic 404, unknown design/package URLs, privacy, loading/error components, robots, sitemap and manifest.

The full matrix covered 320, 360, 390, 430, 768, 1024, 1280, 1440 and 1920px. All 74 pages plus 404 were checked at 390/1440px; top-level pages and five dwelling templates covered the other widths. Final mobile/desktop screenshots were inspected, including the repaired contact heading and related-card layout.

- [Full matrix](browser-audit.json): 269 route/viewport checks, zero console/hydration errors, no horizontal overflow or broken visible images, 150 unique internal links resolved.
- [All-route follow-up](browser-final-qa.json): 150 checks, zero errors, local maximum CLS 0 and LCP 300ms after loading-height repair.
- [Final contact regression](browser-contact-regression.json): twelve checks across 320/390/1440px, zero errors and local maximum CLS 0. Verified contact launcher removal, header drawer access, menu Escape/focus/resize, service client navigation/back, catalogue filtering, invalid/pending/error/success form states, drawer pending close/reopen and once-per-session intro.
- [Accessibility evidence](accessibility-audit.json): 34 route/template checks at mobile and desktop widths, zero axe WCAG AA violations.

All form delivery was intercepted or mocked. These checks do not establish real mailbox receipt. Local performance measurements are not field Core Web Vitals. The earlier full run had one CLS outlier (0.155) and one cold-load LCP outlier (7.624s); twenty isolated design retests recorded CLS 0, and the subsequent all-route follow-up recorded CLS 0 throughout. Loading now reserves the viewport to reduce streaming shifts.

## Commands executed

Commands ran from `C:\Users\abuba\jufaja-homes-platform`.

| Command | Result |
| --- | --- |
| `npm ls --depth=0` | Dependencies resolved; two local optional WASM helpers reported extraneous, not added to the package manifest. |
| `npm run lint` | Pass; no issues. |
| `npx tsc --noEmit` | Pass; no errors. |
| `npm test` | 22 passed, zero failed/skipped. |
| `npm run build` | Pass; 81 static build entries generated. |
| `python scripts/qa-http.py` | 74 routes, three true-404 checks, four enquiry-context checks and sitemap verified. |
| `node scripts/audit-assets.mjs` | 26 assets inventoried; duplicate decisions recorded. |
| `node scripts/qa-browser.mjs` | Full 269-check matrix passed. |
| `node scripts/qa-browser.mjs --widths=390,1440 --output=C:/Users/abuba/AppData/Local/Temp/jufaja-final-audit` | 150 all-route follow-up checks passed. |
| `node scripts/qa-browser.mjs --widths=320,390,1440 --routes=/contact,/,/designs/jardine-series --output=C:/Users/abuba/AppData/Local/Temp/jufaja-contact-regression` | Final targeted rendered and interaction regression passed. |
| `node scripts/qa-accessibility.mjs` | 34 checks, zero violations. |
| `npm audit --omit=dev` | Zero production dependency vulnerabilities. |
| `npm audit --json` | Seven high development-tool findings propagated from the braces advisory below. |
| `git diff --check` | Pass; no whitespace errors. |

Browser checks used installed Edge and existing Playwright/axe tooling; no browser-testing packages were added to production dependencies. Production was started with `node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3010`; the HTTP harness manages its own server on 3011. The footer's external developer-credit link returned HTTP 200. General, TypeScript, Python and accessibility reviews found no remaining actionable code issues.

The development-tool warning is [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), which has no patched braces release at audit time. Automatic audit fixes propose a major Tailwind migration and an unrelated Next ESLint downgrade; these were not applied as an incidental website repair. Production audit remains clean.

## Remaining external setup

- Resend domain `jufajaconstructions.com.au` is created but needs owner-managed DNS authentication. See [delivery setup and exact DNS records](enquiry-delivery.md).
- Approved recipient `admin@jufajaconstructions.com.au` is configured locally and in Vercel production. A verified/approved sender, Resend API key and Upstash shared-rate-limit credentials remain required before live form delivery can be enabled and tested.
- Verified public business contact details and genuine design/project documentation remain owner inputs. The existing 63 design references stay indicative, noindex and outside the sitemap; concept images are never presented as completed JUFAJA projects.
- After configuration, deploy the reviewed code and verify the actual public domain and one explicitly authorised test enquiry. No deployment or live send occurred during this audit.
