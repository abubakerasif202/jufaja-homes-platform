# Final designer QA and hardening pass — 2 October 2026

## Verified status

| Gate | Result | Evidence |
| --- | --- | --- |
| SOURCE VERIFIED | YES | TypeScript, lint, four existing test files, generated HTML and unchanged-source hash checks |
| PRODUCTION BUILD VERIFIED | YES | Actual `npm run build` completed with exit 0, normal webpack worker enabled, 79/79 static outputs generated |
| BROWSER VERIFIED | NO / BLOCKED | No browser session could launch or connect under this environment |
| Client presentation ready | NOT CONFIRMED | Real visual, responsive, motion and runtime QA remain required |

This continues the existing dirty worktree. No reset, replacement checkout, staging, commit, push or deployment was performed.

## Build blocker fixed

Removed the `next/font/google` imports and initialisers for Cormorant Garamond and Manrope. Neither font was bundled in the repository. The site now uses explicit CSS platform stacks: Iowan Old Style/Baskerville/Palatino/Georgia for editorial display and Avenir Next/Aptos/Segoe UI/Helvetica Neue/Arial for body text. All fluid scales, serif/sans separation, italic treatments and cinematic composition remain. No proprietary operating-system font files were copied or redistributed. Build and first paint no longer require a font CDN.

The exact selected face varies by platform; it is not a claim that the original Cormorant/Manrope files are self-hosted. Generated HTML was checked for absence of Google Fonts URLs.

## Source-backed issues found and fixed

- The catalogue rail had native scrolling but lacked obvious controls or a keyboard-oriented region. Added previous/next controls, edge disabling, a labelled focusable region and a visible swipe cue. Reduced-motion uses immediate scrolling. Resize and passive scroll subscriptions clean up on unmount; edge state updates only when its booleans change.
- The mobile menu could remain logically open after being hidden by the desktop breakpoint, leaving the document locked. It now closes when entering desktop width and restores background state.
- Modal background content was still accessible, and drawer focus candidates included hidden/tab-excluded inputs. Main/footer content is inert during navigation; header/main/footer are inert during enquiries. Existing inert state is restored on cleanup. Focus traversal excludes hidden, disabled and negative-tabindex controls. Escape and focus restoration remain.
- Drawer entry was abrupt and the close target was small. Added a controlled CSS panel/scrim entrance, a 44px close target and 16px mobile form text to avoid input-focus zoom. Reduced-motion disables these entrances.
- Primary/outline button focus fills could obscure their text. Fixed focus text contrast and provided equivalent project-arrow keyboard feedback.
- The hero warmed every slide at once. It now warms only the next scene when visible, retains the outgoing fade and existing first-slide markup, and guards autoplay completion under pause/reduced-motion.
- Font-file metric checks showed the serif fallbacks are wider than the former display font. Explicit mobile breaks in “Building Homes” and “Homes Designed” preserve readable large text. These measurements are source/typography evidence, not browser screenshots.
- Small antique-gold text measured only 3.92:1 on the darkest ivory surface. Deepened the semantic/Tailwind gold-600 token to `#80622b`, giving 4.73:1 against `#efeae0`. Light gold focus outlines remain on dark scenes. This is not a full rendered WCAG audit.

No visually observed issues are claimed: browser rendering was unavailable. The cinematic hero, architectural studies, leadership portrait and imagery, editorial sections, motion framework, SEO and legitimate content were preserved.

## Validation completed

- `npm run build`: passed after the final production-source changes. Normal build configuration; no mocked fonts, ignored checks or disabled webpack workers.
- `npm run lint`: passed.
- `npx tsc --noEmit`: passed after the build regenerated route types. An earlier concurrent attempt raced `.next/types` regeneration and failed with missing generated files; it was rerun sequentially after the build.
- `npm test`: four existing test files passed; none skipped.
- Generated HTML: all ten top-level route outputs contain headings/canonicals; all 63 design-detail outputs preserve noindex; no Google Fonts CDN references in top-level HTML.
- Hash checks against the start-of-pass snapshot: design/project data, enquiry API, rate limiter, sitemap, robots, structured data and supplied logo/CEO imagery are unchanged.
- Browser QA script: Node syntax validation passed. Its attempted run failed at Chromium launch and recorded `FAILED_OR_BLOCKED`, with no route screenshots or interactions executed.

Checks ran with Linux Node/npm in the WSL workspace. Native Windows commands could not run because WSL interop itself failed.

## Actual browser attempts and blockers

1. Chrome MCP `list_pages` and `new_page`: `Target.setDiscoverTargets: Target closed`.
2. Playwright default Chromium: installed executable missing.
3. Installed `/usr/bin/chromium-browser`: snap startup cannot write its runtime directory and cannot connect to the session bus.
4. Direct installed Chromium binary via Playwright: socket setup denied (`setsockopt: Operation not permitted`). A crash-reporter-disabled attempt also failed with `sandbox_host_linux.cc ... shutdown: Operation not permitted`.
5. Node REPL browser tool: requires approval, unavailable under this session's `never` approval policy.
6. Local production server on `127.0.0.1:3000`: `listen EPERM`; Windows interop: `UtilBindVsockAnyPort: socket failed 1`.

No restrictions were bypassed and no deployed site was used as a substitute for the local changes.

**Routes visually tested: none. Viewports visually tested: none.** Browser console/hydration, actual overflow, crops, rendered colour contrast, touch behavior, CLS, FPS, animation sequencing, runtime form behavior and live delivery remain **NOT TESTED**. No customer enquiry was sent.

## Repeatable browser QA prepared

`scripts/qa-browser.mjs` targets localhost only, captures full-page screenshots, records overflow/broken-image/runtime errors and exercises the core controls. All `/api/enquiry` requests are intercepted with a deliberately delayed 503 response. It checks required-field validation, loading and error handling; it does not test real delivery or fabricate successful delivery.

Prepared route matrix: homepage, `/designs`, single/double/duplex detail examples, `/projects`, `/about-us`, `/custom-homes`, `/knockdown-rebuild`, `/packages`, `/display-homes`, `/inclusions`, `/contact`.

Prepared viewport matrix: 1920×1080, 1440×900, 1280×720, 1280×600, 1024×768, 768×1024, 430×932, 390×844, 375×812, 320×720. This matrix is **prepared, not executed**. A successful automated run still requires a designer to review the screenshots and motion in a real browser. Native touch and performance profiling require an additional manual/device pass.

On a working Windows runtime with Playwright and Chromium available:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
npm.cmd test
npm.cmd run build
npm.cmd run start -- --hostname 127.0.0.1
```

In a second terminal:

```powershell
node.exe scripts/qa-browser.mjs --base-url=http://127.0.0.1:3000
```

If Playwright is unavailable in that environment, install it locally without changing the manifest or lockfile: `npm.cmd install --no-save --package-lock=false playwright`, then `npx.cmd playwright install chromium`. An already-installed Chromium executable can be selected with `--browser-path=...`. Reports and screenshots go to the operating-system temporary directory under `jufaja-designer-qa`.

## Exact files changed during this pass

1. `src/app/layout.tsx`
2. `src/app/globals.css`
3. `tailwind.config.ts`
4. `src/components/catalogue/CatalogueRail.tsx` — new
5. `src/components/home/FeaturedGalleries.tsx`
6. `src/components/home/HeroSlideshow.tsx`
7. `src/components/layout/Header.tsx`
8. `src/components/layout/QuickEnquiryDrawer.tsx`
9. `scripts/qa-browser.mjs` — new
10. `docs/redesign-audit.md`
11. `docs/final-qa-report.md` — new

All other modifications predate this pass and were preserved.
