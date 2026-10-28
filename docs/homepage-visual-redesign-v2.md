# Homepage visual redesign V2 — 28 October 2026

Implementation branch: `feat/homepage-architectural-v2`. Baseline: `d2f7679`.
Status: local implementation for owner visual review. No merge, push or production deployment.
The pre-existing `AGENTS.md` change is excluded from the implementation commit.

## Composition

The homepage now contains eight sections: architectural slideshow, introduction,
asymmetric expertise, three featured designs, catalogue feature, three-step building
conversation, executive introduction and forest-green enquiry close. The extensive
inspiration galleries remain available at `/inspiration`.

The desktop hero allocates 60% to imagery and 40% to the fixed editorial panel.
The headline is 66.24px at 1440px and 84px at 1920px; mobile is 38–46px across
320–430px. Mobile puts the building first, with source disclosure and compact
controls on ivory, then the heading, supporting copy and gold catalogue action.
Tablet photography is height-limited to bring the editorial content into view sooner.
The original logo is more recognisable, desktop navigation is 13px and controls
retain at least 44px target heights.

The old layered homepage stylesheet was replaced with one scoped `jh-home`
composition. Homepage content remains a server component. The existing slideshow
and header retain their client boundaries. No dependency, route, metadata,
enquiry backend, catalogue data or logo artwork was replaced.

## Photography and provenance

- The six original slideshow assets and destinations are retained. Order: family
  home, sculptural home, paired homes, cantilever home, bathroom, kitchen.
- Architecture WebPs were visually inventoried and their native dimensions checked:
  main exteriors are 1920px wide; courtyard and supporting concepts are 1536px wide.
- Architecture is explicitly labelled illustrative. The repository documents these
  as supplied/generated concepts, not completed JUFAJA projects.
- The two interior slides remain credited third-party inspiration, with credits
  retained on Inspiration. No archived third-party property photographs or Milestone
  images were added to the homepage.
- Featured designs use three distinct existing catalogue facade assignments and
  catalogue specifications, labelled indicative. Prices and unsupported features
  are not promoted. The preceding services use different images from these designs.
- No asset was deleted. The SHA-256/perceptual asset inventory was regenerated.
- Limitation: this visual direction still relies on architectural concepts. A future
  completed-project presentation requires owner-approved professional exterior
  photographs with documented publication rights and verified project information.

## Visual review

Before and after full-page and first-screen captures cover 320, 375, 390, 430, 768,
1024, 1440 and 1920px. Screenshots were inspected and refined: compacted carousel
metadata, removed desktop letterboxing, widened the headline's usable space,
limited tablet hero height and reserved narrow-screen caption height.

The first screen now presents a house prominently. The two-line desktop headline,
bright materials and gold action establish the intended hierarchy. Mobile keeps
copy off the architecture. Service asymmetry, distinct catalogue facades, courtyard
feature, portrait and green close avoid repeating one section pattern. The page is
substantially shorter. Carousel controls and catalogue/enquiry links remain usable.
This is an engineering/art-direction review; client visual approval remains pending.

Review artifacts are outside Git:
`C:\Users\abuba\AppData\Local\Temp\jufaja-homepage-v2\index.html`.
The review page links all full-page screenshots, side-by-side comparisons and
Lighthouse reports. The `before-*.png` captures show the working tree before edits;
`after-*.png` captures show the final production build.

## Validation

| Check | Result |
| --- | --- |
| Lint, TypeScript, unit tests | Passed; 49/49 tests |
| Production build | Passed; 81 generated pages |
| HTTP audit | Passed; 74 routes, genuine missing-page/design/package 404s, sitemap and enquiry context |
| Asset audit | Passed; 188 assets inventoried; no deletions |
| Catalogue image browser audit | 63 assets verified by downloaded bytes, 63 catalogue cards, 63 detail pages, 189 related cards and 3 homepage features passed |
| Accessibility | 34 checks, zero violations |
| Site-wide browser audit | Passed across eight widths; every catalogue detail at 390/1440px |
| Final homepage/browser interaction rerun | Passed across eight widths; zero console or request failures; four intercepted enquiries |
| Carousel | 77 checks passed; six slides decoded, six-second cadence, keyboard/swipe/pause/play, hidden-document handling, reduced motion and stable height at every width |
| Intro | Passed at 390/430/768/1440/1920px with normal motion, plus WebGL-off and JS-off; measured CLS 0.000 |
| Raw server HTML | 75 routes passed |
| JavaScript-disabled browser | 150 page checks passed |
| Hydration soak, local final build | 200/200 loads, zero hydration events, other errors or failed requests |
| Hydration soak, existing live site | 100/100 loads, zero hydration events, other errors or failed requests |
| Dependency audit | Zero production vulnerabilities |
| Git whitespace check | Passed |

| Width | Before page height | Final page height | Reduction |
| --- | ---: | ---: | ---: |
| 320 | 14,906px | 8,715px | 41.5% |
| 375 | 14,845px | 8,649px | 41.7% |
| 390 | 14,642px | 8,508px | 41.9% |
| 430 | 14,682px | 8,569px | 41.6% |
| 768 | 9,736px | 7,309px | 24.9% |
| 1024 | 10,239px | 5,474px | 46.5% |
| 1440 | 10,542px | 6,043px | 42.7% |
| 1920 | 10,761px | 6,250px | 41.9% |

These are whole-document screenshot heights, including the existing footer.
The final carousel cadence sample was 6,024–6,036ms between observed changes.
An earlier two-loop run observed 6,005–6,061ms intervals after its first sample.

### Mobile Lighthouse

Lighthouse 13.6.0, local production servers, default mobile throttling, fresh
first-visit sessions including the preserved logo introduction:

| Metric | Baseline | Redesign |
| --- | ---: | ---: |
| Performance | 68 | 92 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| First contentful paint | 1.43s | 1.08s |
| Largest contentful paint | 3.96s | 3.15s |
| Total blocking time | 576ms | 92.5ms |
| Cumulative layout shift | 0 | 0 |
| Speed index | 5.60s | 3.34s |
| Transferred resources | 568KB | 691KB |

The table compares individual lab runs, not field Core Web Vitals. Two redesigned
runs returned performance scores of 90 and 92; the table shows the latest. The baseline
was built from a separate detached checkout of `d2f7679`; its external dependency
junction required Webpack, while the implementation uses the repository's default
Turbopack build. This limits causal attribution of the score difference. The
larger photographic presentation increases transferred bytes; responsiveness and
blocking time improved in the measured builds. Mobile LCP remains above 2.5s
under Lighthouse throttling and can be improved further. JSON and HTML reports
are linked from the visual review artifact.

The full site browser matrix also checks all 63 catalogue details at 390px and
1440px, representative designs at the other widths, legal and enquiry pages,
navigation, keyboard/Escape/focus restoration, filter/reset, loading/error/success
states, internal links and real 404 responses. Delivery requests are intercepted;
no real QA enquiry is sent.

Autoplay remains six seconds, with 900ms fades. Image mounting is limited to the
initial/active/previous/adjacent slides. Focus, hover, explicit pause and hidden
documents pause playback; reduced motion starts paused and allows manual control
or explicit play. Slide focus coordinates are now applied to rendered images.
Automatic prefetching is disabled in the header and homepage links to prevent
speculative route/style downloads; this resolved unused gallery stylesheet preload
warnings without suppressing console checks.

An older local server survived a rebuild and briefly served stale asset paths.
That server was stopped, the production process restarted, and affected audits
repeated against the current assets. Those failed runs are not counted as passes.

### Reproduce checks

Run from PowerShell, with the production server on port 3010 after the build.
Stop the previous local server before rebuilding to avoid stale in-memory manifests.

```powershell
Set-Location -LiteralPath 'C:\Users\abuba\jufaja-homes-platform'
npm run lint
npx tsc --noEmit
npm test
npm run build
# Separate terminal: npm run start -- -p 3010
python scripts/qa-http.py
node scripts/audit-assets.mjs
node scripts/qa-design-images.mjs
node scripts/qa-accessibility.mjs
node scripts/qa-browser.mjs --widths=320,375,390,430,768,1024,1440,1920
node scripts/qa-slideshow.mjs
node scripts/qa-intro.mjs
node scripts/qa-hydration.mjs --soak=true --loads=200
node scripts/qa-hydration.mjs --live=true --base-url=https://jufajaconstructions.com.au --soak=true --loads=100 --max-minutes=6
node scripts/qa-ssr.mjs
node scripts/qa-nojs.mjs
git diff --check
npm audit --omit=dev
```

The live hydration audit checks the existing production site; it is not evidence
that this redesign is deployed. The intro script covers normal motion, WebGL-off
and JavaScript-off. Raw-HTML and no-JavaScript audits traverse all public pages.

## Changed files

- `src/components/home/CasaviewHome.tsx` — eight-section server-rendered composition.
- `src/components/home/home-bright.css` — replacement responsive visual system.
- `src/components/home/HeroSlideshow.tsx` — focal positions, image sizing, fade timing and prefetch control.
- `src/components/home/hero-slideshow.css` — image framing, compact controls and stable captions.
- `src/data/hero-slides.ts` — exterior-first ordering, six assets retained.
- `src/components/layout/Header.tsx` — legible navigation and controlled prefetching.
- `src/app/globals.css` — original logo sizing and matching mobile-menu viewport allowance.
- `scripts/qa-slideshow.mjs` — new slide order, relative sampling, visibility and height tests.
- `scripts/qa-intro.mjs` — current approved CTA text and editorial-panel selector.
- `scripts/qa-design-images.mjs` — new featured-design selectors and explicit 3:2 homepage frames; catalogue/detail 4:3 checks retained.
- `tests/hero-gallery.test.js` — exterior-first expectations.
- `docs/asset-inventory.json` — current source usage inventory.
- `docs/homepage-visual-redesign-v2.md` — implementation and validation record.
