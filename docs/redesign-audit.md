# JUFAJA cinematic redesign

> Final pass update: the Google Fonts build blocker is resolved and production builds pass. Browser verification remains blocked by this session environment. See [Final QA report](final-qa-report.md) for current results and the exact files changed in the final pass. The original validation record below is preserved as history.

## Repository audit

The starting worktree contained extensive uncommitted changes. This work continues those files in place; nothing was reset, staged, committed, pushed or deployed.

Stack: Next.js 15 App Router, React 18, TypeScript, Tailwind 3, Framer Motion. The existing motion system included Reveal, ParallaxImage, a session intro, CSS hero slideshow and pointer-responsive leadership portrait. No animation dependencies were added.

Reviewed all ten top-level pages, design-detail routing, catalogue/filter components, leadership treatments, header/footer, enquiry form and drawer, brand assets, data sources, metadata, sitemap, robots and the existing tests. No repository-local AGENTS.md or agent.md was found. The supplied global instructions and README were followed.

### Starting visual weaknesses and treatment

- Homepage: six icon cards, six small catalogue cards, four values cards and four study cards repeated similar grid rhythms. Replaced with a photo-driven service accordion, a large swipe rail, a sticky editorial statement and asymmetric oversized studies.
- Hero: strong existing slideshow and intro, but the composition relied on background imagery and text. Added an axonometric house drawing, perspective detail frame, larger typography, exploration cue and pause when offscreen or in a hidden tab.
- Inner pages: small text-only openings and sparse endings. Introduced image-led PageHero scenes in forest green, ivory and burgundy, with gold drawing motifs and numbered planning sequences.
- Projects: elevated image proportions, mask reveals, parallax and oversized editorial numbering. Kept all concept descriptions and suitability notes.
- Designs: larger collection opening, deeper image cards, pointer depth and animated facade switching. Filtering, specifications, routes and enquiry controls remain intact.
- About: preserved the supplied CEO imagery and biography/title scope; added a site-image opening and larger editorial route treatments.
- Contact: image-led ivory opening and larger gold-edged form composition; delivery logic untouched.
- Navigation/footer: full-height green mobile navigation, numbered links, in-panel close action, large footer statement and outlined JUFAJA wordmark.

## Business content boundaries

The README identifies project imagery as illustrative and catalogue data as unverified. The redesign retains these disclosures. No new completed projects, addresses, licences, testimonials, years, pricing, availability, achievements or numerical business claims were introduced. Planning numbers represent sequence only. Existing supplied portraits and canonical logo artwork are unchanged. Metadata, sitemap, structured data, enquiry API and rate limiting were preserved.

## Motion and performance

Framer Motion remains the single JavaScript animation library. New reusable components: ArchitecturalLines, TextReveal, DepthFrame, PageHero and PlanningSequence. Existing Reveal and ParallaxImage are reused and improved. Fade/mask entrances, word reveals, photo crossfades, scroll parallax, restrained pointer rotation, arrow interactions and CSS button fills form the motion vocabulary.

Pointer transforms use MotionValues and springs without pointer-driven React renders. Touch and reduced-motion paths suppress depth. Mask reveals run once. Responsive image sizes and lazy loading remain in use; only page-opening imagery is prioritised. Heavy hero detail geometry is hidden below desktop widths. No WebGL engine, video, new fonts or large new dependency was introduced. Slideshow autoplay pauses offscreen and on hidden tabs. Timers/listeners retain cleanup.

## Responsive implementation

Fluid display typography; dedicated mobile image ratios; single-column planning sequences; touch-scrollable catalogue rail; full-height mobile navigation; smaller static architectural layers; responsive image frames. Breakpoints support common mobile, tablet and 1280/1440/1920 desktop widths. These are implemented but **not visually verified in a browser** in this sandbox.

## Validation observed in this run

- `npx tsc --noEmit`: passed.
- `npm run lint`: passed.
- `npm test`: all four existing test files passed, none skipped.
- Source route/assets audit: passed for all 10 top-level routes, 63 unique catalogue detail slugs and all local brand references; canonical brand files untouched.
- Tailwind stylesheet compilation: passed. The installed Browserslist dataset reported an existing age warning.
- `npm run build`: blocked by Google Fonts DNS/network access. A diagnostic build with the webpack worker disabled in memory revealed `EAI_AGAIN fonts.googleapis.com` for the existing Cormorant Garamond and Manrope loaders. No repository build configuration was changed to conceal this.
- Dev server: `listen EPERM 0.0.0.0:3000` under the sandbox.
- Windows fallback: WSL interop reports `UtilBindVsockAnyPort: socket failed 1`.
- Browser: agent-browser unavailable; Playwright Chromium executable absent; Chrome MCP returns `Target closed`.
- Browser console, hydration, rendered route checks, real responsive screenshots, motion sequence/fps, live form delivery and deployed behavior: **NOT TESTED**. No green production-readiness claim is made.

## Files changed by this redesign

- `src/app/globals.css`, `src/app/layout.tsx`
- `src/app/about-us/page.tsx`, `src/app/contact/page.tsx`
- `src/app/custom-homes/page.tsx`, `src/app/knockdown-rebuild/page.tsx`
- `src/app/designs/page.tsx`, `src/app/designs/[slug]/page.tsx`
- `src/app/display-homes/page.tsx`, `src/app/inclusions/page.tsx`
- `src/app/packages/page.tsx`, `src/app/projects/page.tsx`
- `src/components/home/HeroSlideshow.tsx`, `SelectorDashboard.tsx`
- `src/components/home/FeaturedGalleries.tsx`, `BrandDifference.tsx`
- `src/components/home/SelectedProjects.tsx`, `ContactPrompt.tsx`, `DisplayLocationsStrip.tsx`
- `src/components/catalogue/DesignCard.tsx`
- `src/components/designs/FacadeGallery.tsx`
- `src/components/layout/Header.tsx`, `Footer.tsx`
- `src/components/motion/Reveal.tsx`, `ParallaxImage.tsx`
- New: `src/components/motion/ArchitecturalLines.tsx`, `TextReveal.tsx`, `DepthFrame.tsx`
- `src/components/ui/ButtonLink.tsx`
- New: `src/components/ui/PageHero.tsx`, `PlanningSequence.tsx`
- New: `docs/redesign-audit.md`

Other dirty files predate this task and were preserved.

## Validation commands on a working Windows runtime

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
npm.cmd test
npm.cmd run build
npm.cmd run start
```

After building, inspect every top-level route plus single/double/duplex design details at 1920, 1440, 1280, 768, 430, 390, 375 and 320 pixels. Check horizontal overflow, image crops, intro completion/skip, slider pause/keyboard/swipe, all six service panels, catalogue filters/reset, facade switching, mobile menu focus/Escape, enquiry drawer focus/close, form error handling and reduced-motion mode. Check the browser console for hydration, image sizing and missing-resource errors. Test form delivery only against an explicitly configured test recipient.
