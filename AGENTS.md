# JUFAJA project execution instructions

## Scope and working style

Inspect the existing implementation before editing. Diagnose root causes, make
the smallest reliable repair, check related occurrences, validate, and review
the final diff. Complete authorised work end to end; do not return an audit-only
response when repairs are requested. Cover the full website, not just the home
page: discover public routes, catalogue details, legal pages, forms, navigation,
loading/error states, genuine 404s, metadata, sitemap, robots and manifest.

Preserve working functionality and the existing Next.js architecture. Avoid
unnecessary rewrites, dependencies, abstractions and risky upgrades. Keep
client boundaries small, use strict types, semantic HTML and native controls,
and clean up listeners, timers and observers. Never hide significant content
to solve layout problems. Respect prefers-reduced-motion and preserve the
premium logo-opening direction with usable reduced-motion fallbacks.

## Brand and truthful content

Preserve JUFAJA's premium Australian construction identity and established
forest green, antique gold, burgundy, charcoal and warm ivory visual system.
Use deliberate typography, spacing, realistic architectural imagery and
restrained motion. Preserve verified business content and contact details.

Never fabricate projects, prices, reviews, ratings, awards, statistics, service
areas, addresses, guarantees, licences, certifications or accreditations.
Unsupported claims must be removed or safely neutralised. Indicative catalogue
content and conceptual imagery must be clearly distinguished from verified
completed work. Generated architectural imagery must never be represented as
a completed JUFAJA project without authoritative supporting project data.

## Assets

Inventory image content, dimensions and repository-wide usage before cleanup.
Use SHA-256 for exact duplicates and perceptual/visual checks for near copies.
Choose canonical assets, update references and verify before deletion. Do not
delete intentional responsive crops, brand originals, light/dark logos,
favicons, social variants or user-provided source assets merely because their
content is similar. Optimise delivery assets, preserve suitable mobile crops,
provide meaningful alt text and verify all images in the rendered site.

## Mobile, accessibility and performance

Use mobile-first QA, including 320, 390 and 430px, tablet and 1024, 1440 and
1920px desktop widths. Check overflow, heading wrapping, gutters, image crops,
touch targets, keyboard navigation, menu focus/Escape behaviour, forms,
drawers, sticky/floating controls and unobstructed CTAs. Target WCAG 2.2 AA.
Preserve SEO and improve metadata, canonical links, structured data and
internal links using factual Australian business language. Avoid unnecessary
JavaScript, oversized images, layout shifts and expensive render loops.

## Forms and credentials

Validate on the server, enforce spam/rate-limit controls, prevent duplicate
submissions, and provide loading, success and useful failure states. Fail
safely when required production credentials are unavailable. Keep credentials
server-side; never print, expose or commit secrets or .env.local. Use
.env.example only for non-secret configuration guidance. The approved enquiry
recipient is admin@jufajaconstructions.com.au; a recipient is not proof of a
verified sender or approval to publish that address as a public contact.
Never send real QA enquiries unless the owner authorises delivery and sender
authentication and credentials are confirmed. Browser form QA must intercept
delivery requests.

## Git and release

Start shell commands with:
`Set-Location -LiteralPath 'C:\Users\abuba\jufaja-homes-platform'`

Inspect status and preserve unrelated user work. Do not use destructive reset,
clean or force-push operations. Review deletions, additions and the staged diff;
stage only intended changes. Keep build output, screenshots, caches, temporary
files and environment files out of commits. Use clear conventional commits.

Run the repository's release gates before publishing:

```text
npm run lint
npx tsc --noEmit
npm test
npm run build
python scripts/qa-http.py
node scripts/audit-assets.mjs
node scripts/qa-accessibility.mjs
git diff --check
npm audit --omit=dev
```

Run the production server, scripts/qa-browser.mjs and scripts/qa-intro.mjs (normal-motion intro, WebGL-off and JS-off) scripts/qa-hydration.mjs (hydration stress, local and live; use --soak=true for the root-race pattern), scripts/qa-ssr.mjs (raw server HTML, no JS) and scripts/qa-nojs.mjs (JavaScript-disabled browser) for mobile and desktop QA.
Architecture rule: public pages ship their real content in the first server HTML. Never wrap page content in a Suspense/loading.tsx boundary (React outlines boundaries over 12.8KB into a hidden, script-revealed block) and never server-render content hidden for animation; enhance after mount instead.
Do not claim unexecuted checks passed. Block release on hydration/console errors,
broken visible assets, overflow, inaccessible navigation, obstructed CTAs,
form regressions or incorrect 404 handling. Reuse the existing Vercel project
and domains. After a release, verify the pushed SHA, deployment readiness and
actual live routes, assets, metadata, headers and responsive behaviour. Fix
regressions and repeat the affected checks. Report genuine external blockers
separately from checks that passed.

Independent investigation/review may use parallel agents with clearly assigned
ownership. The primary agent reviews and integrates their work; agents must
preserve other contributors' changes.
