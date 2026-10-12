# JUFAJA 34 representative exteriors — intake report

- Source: owner-uploaded `JUFAJA_34_Property_Views_Representative_Updated.zip`.
- 34 validated local WebP files of recorded per-image dimensions, mapped to 17 addresses (two images each).
- All 50 existing authentic property photographs are preserved; no new real property photographs supplied.
- These are fictional architectural reference images, not real address-specific photographs or evidence of JUFAJA construction.
- Public UI uses “Representative exterior” and the existing representative-gallery disclosure.
- The import script and integrity tests verify file hashes against this handoff pack.

## Pair visual QA

Structural similarity measured on 300 × 224 grayscale previews (not a model verification of architectural consistency).
The six originally flagged pairs are manually approved after regeneration. The other 11 pairs retain their original `different-composition` automated review results; no SSIM result is claimed for regenerated pairs. Pixel-difference scores are only composition checks, not proof of architectural continuity.


## Publication gates

- Review each updated View 02 against View 01 at its supplied 1200×896 resolution.
- Run property integrity, full tests, lint, TypeScript, production build and Playwright gallery checks.
- Verify the exact PR #14 Vercel preview and delivered image bytes.
- Keep PR #14 draft until every required visual, security, CI and browser gate passes.
- Do not merge/deploy automatically.

## Updated regeneration handoff (2026-10-12)

- Six View 02 images were replaced from the owner-supplied `JUFAJA_34_Property_Views_Representative_Updated.zip`; the other 28 representative WebPs were verified byte-identical to the earlier handoff.
- Updated source archive SHA-256: `feb85741d2a5afd7e4bb2eb46621d5d11924903b97fc13e10b5eef9a4a1ca931`.
- The six source JPEGs and published WebPs are 1200×896. The original 2K/minimum-resolution gate was relaxed at the owner's instruction; no upscaling was applied.
- All six pairs were reviewed side-by-side. The house identity cues remain consistent and each second view has a materially different camera angle.
- Automated mean grayscale differences are recorded in `assets_manifest.json`; they are a composition check and do not establish architectural continuity.
- The supplied updated archive contained the replacement source JPEGs. This session imported and converted those owner-supplied images; no Gemini generation session was run here.


### Regenerated View 02 outputs

| Address | Output SHA-256 | Bytes | Dimensions | Visual review |
|---|---|---:|---:|---|
| 10A Westview Street, Campbelltown NSW 2560 | `d4405b618faf9ec8c4cdae9034c41e016779236a21a14495f4feb74e9140766b` | 245078 | 1200×896 | Approved: same design, distinct camera angle |
| 110 Brassil Avenue, Claymore NSW 2559 | `a4e5a1286f62e80b4b615bdb37c861aed5378aea9bbf6e05cfb0d83340041c35` | 155810 | 1200×896 | Approved: same design, distinct camera angle |
| 30 Westview Street, Campbelltown NSW 2560 | `68d05a28c61d6cd6b9e347457c58d8e81736e78558e2459c1a0cad06f742de1a` | 343444 | 1200×896 | Approved: same design, distinct camera angle |
| 32 Emperor Street, Leppington NSW 2179 | `15f777542c98f4a0836d231ead44d4c61b442280f1985afdbe4c3379726d13d1` | 255756 | 1200×896 | Approved: same design, distinct camera angle |
| 32 Ganugan Road, Austral NSW 2179 | `2ec5bb38bc3129500068aa38946e8e28a0bbf5767336dd82bfa7f70cffba990f` | 192202 | 1200×896 | Approved: same design, distinct camera angle |
| 6 Burns Avenue, Macquarie Fields NSW 2564 | `cf9f3e670dab600956b5ddbe922b5cb48a46e9eb9979ef3f1896c058818aafae` | 190330 | 1200×896 | Approved: same design, distinct camera angle |

Per-source JPEG hashes and generation job IDs are recorded in the internal provenance JSON.

## Local validation results (2026-10-12)

Passed: `npm ci`; `npm run lint`; `npx tsc --noEmit`; `npm test` (39/39); `npm run audit:design-images`; `npm run build` (80 static routes/pages); `npm audit --omit=dev` (0 production vulnerabilities); `git diff --check`; `scripts/qa-http.py` (74 routes); `scripts/qa-ssr.mjs` (74/74); `scripts/qa-accessibility.mjs` (34 checks, 0 violations); and `scripts/qa-intro.mjs` (normal motion, WebGL disabled and JavaScript disabled).

`qa-gallery.mjs` passed all 28 cards, representative-image decode, gallery interactions and search at 320, 390 and 430px. It then timed out waiting for `networkidle` on `/projects` at the next 768px viewport. `qa-browser.mjs --routes=/projects --widths=320,390,430` timed out waiting for all visible images to complete. `qa-nojs.mjs` checked 146/148 page/viewport combinations; desktop and mobile `/` timed out waiting for the browser `load` event. These are recorded as unresolved QA failures, not passes. Tablet/desktop gallery checks and no-JavaScript homepage load remain unverified; preview image delivery is recorded below.

The PR remains draft pending successful completion of all required gallery, browser, preview, CI and security gates.

`qa-site-motion.mjs` passed its normal-motion, keyboard pause/resume, touch-target and overflow checks at 320, 390 and 430px, then timed out waiting for `networkidle` on `/` at the next viewport. Tablet/desktop motion QA is therefore not complete.


## PR preview and security verification (2026-10-12)

- PR #14 checks for commit `b0a6a9d5d2154065f411da73d75a5d99a9a191ca`: GitHub Actions passed, CodeRabbit passed and Vercel passed. PR remains open and draft.
- Initial Vercel Preview: `https://jufaja-homes-platform-5lc5njq3q-abubakerasif202s-projects.vercel.app`. After removing the temporary bypass, Vercel redeployed the preview: `https://jufaja-homes-platform-mitsj2gef-abubakerasif202s-projects.vercel.app` (Ready).
- Browser review on the refreshed preview showed all 28 property cards, all 17 representative galleries and all 11 real-photo galleries. Search and suburb filtering returned the expected results. All 34 representative WebPs and all 50 genuine photos were downloaded through the signed-in preview browser; their byte sizes and SHA-256 hashes matched the local source/provenance files (84/84 exact matches). The six updated View 02 files also match the hashes in the table above.
- Vercel Deployment Protection settings showed one masked automation-bypass entry, added about three hours earlier. The entry was removed, and Vercel confirmed “Automation Bypass removed.” The refreshed Preview was created after removal. No bypass secret was read or printed.
- A browser log captured one generic Chrome asynchronous message-channel error on the preview page; attribution to the site or browser extension was not established. Treat browser-console cleanliness as unverified.
- `qa-hydration.mjs` did not complete its 200-load run: navigation to `/` timed out waiting for `load` at 30 seconds. The PR remains draft because browser matrix and hydration gates did not all complete successfully.
