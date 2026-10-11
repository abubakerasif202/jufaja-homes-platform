# JUFAJA final QA and release report

Prepared 12 October 2026 for existing PR #12: https://github.com/abubakerasif202/jufaja-homes-platform/pull/12.

## Implementation and release state

The candidate has **63 unique suitable facades for 63 catalogue designs, zero pending**. Seven generic architectural concepts replace cropped or wrong-storey candidates. All 56 previously suitable files and their metadata are unchanged. Representative CGI disclosure remains outside images; authentic `/projects` photography and verified catalogue figures are preserved.

The 34 native 1200×896 exceptions now carry the owner's explicit 12 October 2026 approval, exact response, scope and current file SHA. This corrects the preceding unconfirmed approval wording. Normal minimum dimensions and integrity controls are intact.

Release gates are being completed on the existing branch. Production remains at `2a244a200668bc3a229a0a67747319ad4dbd06f7` until the final Preview and new GitHub Actions release checks pass. No image blocker remains. Production performance, external services and deployment must not be inferred from local success.

## Local verification

| Check | Result |
|---|---|
| `npm run lint` | Pass |
| `npx tsc --noEmit` | Pass |
| `npm test` | Pass, 36 tests |
| `npm run build` | Pass, 80 prerender jobs |
| `npm run audit:design-images` | Pass, 63 records, 63 unique images, zero pending |
| `npm audit --omit=dev` | Pass, zero production dependency advisories |
| `git diff --check` | Pass |
| `node scripts/audit-assets.mjs` | Pass, 138 assets, 3 intentional brand duplicate groups, 9 visual candidates |
| `python scripts/qa-http.py` | Pass, 74 routes, true 404s, enquiry context, sitemap and robots |
| `node scripts/qa-ssr.mjs` | Pass, 74/74 public routes |
| `node scripts/qa-nojs.mjs` | Pass, 148 page checks across 74 routes |
| `node scripts/qa-accessibility.mjs` | Pass, 34 checks, zero violations |
| `node scripts/qa-gallery.mjs` | Pass at 320, 390, 430, 768, 1024, 1440, 1920 pixels |
| `node scripts/qa-intro.mjs` | Pass, normal motion, WebGL off, JavaScript off; CLS 0 |
| `node scripts/qa-hydration.mjs --loads=200 --soak=true --workers=2` | Pass, 200 loads, zero hydration events, console errors or failed requests |
| `node scripts/qa-browser.mjs` | Pass, 235 viewport/route checks, zero browser errors, broken images or overflow; 4 enquiry deliveries intercepted |
| `node scripts/qa-design-images.mjs` | Pass, 63 actual response hashes, 63 cards/detail routes, 189 related cards and 3 featured cards; zero errors/enquiries |

One concurrent intro QA attempt observed SSR markup before its blocking stylesheet and failed the early scroll assertion. The unchanged isolated run passed. The QA script now waits for fixed-position CSS to apply before checking the same scroll-lock assertion; all seven scenarios then passed. No application behavior or assertion was weakened.

Reports and screenshots are outside Git under `C:\Users\abuba\jufaja-image-review\release-completion`. These are local lab observations; no claim of production field Core Web Vitals is made.

## Remote Preview investigation

Unauthenticated requests on the preceding Preview failed **56/56 with HTTP 302 `text/plain`** due to Preview protection. Authenticated Chrome response downloads verified **56/56 HTTP 200 `image/webp`**, actual downloaded bytes and matching registry hashes on SHA `404bd024528794f8414601fbed314512fce9c41f`. Cookies/tokens were not exported. The old local-file comparison was not remote evidence.

`scripts/qa-design-images.mjs` and `scripts/remote-design-image-verification.mjs` now capture per-file statuses, media types, byte counts, downloaded SHA and expected SHA, and explicitly fail non-image/authentication responses. Preview hosts require exact explicit allowlisting. Five regression tests include a real two-origin redirect to prove the private bypass header cannot leak.

The prior claim that two passing statuses constituted CI was inaccurate: they were Vercel and a skipped CodeRabbit review. This release adds `.github/workflows/release-checks.yml` with native Windows PowerShell checks on Node 22. Actual Actions success is required before merge. CodeRabbit's skipped review is not counted as code approval; independent code and architectural reviews passed.

## SEO and external integrations

HTTP, SSR and no-JavaScript QA confirm canonical host, real initial content, sitemap/robots and actual missing-route 404s. All 63 design pages resolve; the sitemap preserves the existing policy excluding unverified plan detail records. Search Console and production field performance are unverified.

Form delivery is intercepted during browser QA. No real enquiry is sent. Existing Resend and Upstash protections remain intact and fail safely; sender authentication, inbox delivery and current live Redis connectivity have not been established by this image release. No secrets are printed or committed. The previous development dependency install reported nine advisories; production dependency audit is clean.

## Final release evidence

Final candidate SHA, authenticated 63-image Preview verification, GitHub Actions result, merge SHA, actual Production deployment and live browser/image/hydration results will be recorded after those checks run. A failed critical gate keeps PR #12 open.
