# Windows release evidence — 11 October 2026

## Runtime repair

The checkout's lockfile specified Next.js 16.3.8 but the installed runtime was
16.4.0, while the prior build used 16.3.8. This dependency/build drift explains
the reported missing `.next/server/preview-props.json` startup failure. Restored
the lockfile installation with `npm ci`, pinned Next and eslint-config-next to
16.3.8, and rebuilt with the same version used by the production server. The
repaired server returns HTTP 200 at `http://127.0.0.1:3010/projects`.

`qa-http.py` now rejects an occupied 3011 port, uses the resolved Node executable,
waits for a real projects HTTP response, detects child exit, limits route
concurrency and reports captured server output on failure. Playwright and
axe-core are now declared local development dependencies rather than relying
on extraneous or parent-directory packages. Removed an extraneous parent
workspace entry from the lockfile through npm's normal update.

Locked delivery dependencies: Next 16.3.8, React/React DOM 18.3.1, Sharp 0.35.5.
Tooling: Tailwind 3.4.19, Playwright 1.64.0, axe-core 4.14.0.
Native PowerShell 7.6.6 and Windows Node 26.11.0/npm 11.20.0 were used.

## Gallery and whole-site changes

58 source references audited; 55 downloaded; 50 suitable local WebPs delivered
across 11 galleries. All 28 property records retained internally. Three blocked
URLs and five concept/land/unusable images excluded. Seven sideways images
rotated; exterior covers chosen where available. Delivery bytes reduced from
18,699,596 to 6,351,568 (66.0%). No synthetic restoration, geometry alteration
or fabricated replacements. Seventeen properties need suitable authorised
photographs. See the photo research log and provenance manifest for address
evidence, historical notes and remaining source-quality/licensing limitations.

The public property collection contains no listing, map, image-search or
original-source links. Concepts remain separately labelled. Its hero is now
a genuine local property photograph. Dedicated QA covers every image and
gallery at all seven required widths, keyboard, controls, thumbnails, synthetic
touch swipes, closing, focus restoration, search/filter and overflow.

Corrected homepage image-card accessible names. Gallery cover buttons now use
native accessible names from their image description and visible text. Removed
the pre-hydration root-class mutation and `suppressHydrationWarning`; the intro
reads session state after mount. Server-rendered page content stays visible.
Accessibility QA loads deferred content and restores the entry viewport before
axe; it does not suppress rules. A bottom-scroll clipped footer link beneath
the fixed header was independently traced as a test-position artefact.

## Licence, SEO and Google services

The official NSW record was checked live: current contractor licence 346427C,
Jufaja Constructions Pty Ltd, ACN 636 488 910, commencement 20 January 2020,
expiry 19 January 2028, Builder/Carpenter classes and the recorded Builder
limitation. Footer, About and Organization schema include appropriate verified
facts and the exact official verification link. No residential address, NSW
endorsement, unrestricted permission or project insurance claim was added.
The compliance history is not characterised as spotless.

Existing canonical metadata/robots/manifest and sitemap correctly cover 11
legitimate core pages. All 63 indicative design details remain noindex and
excluded from the sitemap. All 11 current live sitemap entries returned 200.
Google Search Console submission was unavailable: one connected service was
payment-blocked and the other exposed no authorised property. Exact manual
submission steps are in the licence/SEO/Business Profile report.

No legitimate Google Maps profile could be reliably identified and no authorised
Business Profile management connection was available. No listing was edited
or created. Owner-review fields and address-display safeguards are documented.

## Release blocker

Vercel production environment metadata was inspected without decrypting or
printing values. Only `RESEND_API_KEY` and `ENQUIRY_TO_EMAIL` are configured.
`ENQUIRY_FROM_EMAIL`, `UPSTASH_REDIS_REST_URL` and
`UPSTASH_REDIS_REST_TOKEN` are missing. The existing API correctly fails closed
with HTTP 503 without its shared limiter/sender. No real enquiry was sent.
Browser provider requests were intercepted. Credentials and authenticated
sender configuration must be supplied before release; controls were not weakened.

Production currently remains on main SHA
`4d8c807ebdd1a011f47fce21841c85acdee63054`, Vercel deployment
`dpl_CjRGJxLBqwjYJYVsdiHxz1TMust7`, READY. The current live gallery still has
source navigation. This work must not be described as deployed while PR #10
is unmerged. Original sibling checkout directories were not changed.

## Security

`npm audit --omit=dev`: zero vulnerabilities. Full audit: nine development
findings (seven high, two moderate), via braces and selector-parser paths in
Tailwind/ESLint. Braces has no published patched version; selector-parser's
patched release is a major change from Tailwind 3's declared dependency.
No forced framework/styling upgrade or unverified override was applied.

## Validation

Executed release gates:

- `npm run lint`: pass.
- `npx tsc --noEmit`: pass.
- `npm test`: 24/24 pass.
- `npm run build`: pass, Next 16.3.8, 80 generated static pages.
- `python scripts/qa-http.py`: 74 routes, genuine 404s, enquiry context and sitemap pass.
- `node scripts/audit-assets.mjs`: 75 assets inventoried; intentional duplicate variants preserved.
- `node scripts/qa-accessibility.mjs`: 34 checks, zero WCAG violations.
- Scoped `/projects` browser matrix: 14 checks at seven widths, pass.
- Complete-site browser matrix: 235 page/viewport checks, zero errors;
  ten navigation/form/catalogue interaction groups pass, four delivery requests intercepted.
- `node scripts/qa-gallery.mjs`: every gallery/photo at seven widths, pass.
- `node scripts/qa-ssr.mjs`: 74/74 pass.
- `node scripts/qa-nojs.mjs`: 148/148 pass.
- `node scripts/qa-intro.mjs`: five normal-motion viewports plus WebGL-off/JS-off pass.
- `node scripts/qa-hydration.mjs --loads=30 --soak=true`: 30 loads,
  zero hydration/other errors or failed requests, repeated on the final build.
- `npm audit --omit=dev`: zero vulnerabilities.
- `git diff --check`: pass.
- Independent review: no remaining actionable findings.

Screenshots/runtime JSON remain under Windows temporary directories and are
not committed. The already-dirty generated `docs/asset-inventory.json` remains
unstaged. Native gallery naming was the final frontend change; gallery, axe,
HTTP/SSR, hydration, lint/types/tests/build and audit were validated afterward.
Whole-site/JS-off/intro checks had already passed with the same page content.

Commits: `d19472c` (runtime/QA) and `a47b505` (property gallery).
Licence/company publication and this evidence accompany a separate commit.
PR #10 must remain draft/unmerged until the production form configuration
blocker is resolved. No production deployment of this work is authorised by
passing local checks alone while that material blocker exists.
