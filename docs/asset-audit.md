# Asset audit — 5 October 2026

Run `node scripts/audit-assets.mjs` to regenerate the repository-wide inventory in `docs/asset-inventory.json`. It uses actual SHA-256 content, dimensions, alpha-channel metadata, and 64-bit difference hashes with a candidate distance of six or less. Filename reference searches cover source, data, scripts, tests and configuration, excluding generated build/dependency folders and audit documentation.

## Duplicate decisions

The initial inventory contained 24 visual assets, including the user's untracked original portrait and two new delivery copies. Four exact duplicate groups were found:

- The untracked root portrait and `public/brand/javed-iqbal-site.png`: preserve the user file and approved source portrait.
- `jufaja-logo-3d.png` and `jufaja-logo-transparent.png`: approved byte-for-byte source/runtime pair required by the generation workflow and brand tests.
- Four full-logo SVG carrier variants: preserve named brand variants and test contracts.
- Mark and monogram SVG carriers: preserve intentional named brand variants.

Ten perceptual candidates all represented the same intentional brand artwork at different dimensions/encodings, favicon/emblem variants, or original/optimized portraits. No architectural images were duplicates at the selected threshold. No duplicate assets were deleted because every group is protected source artwork or an intentional brand variant. The unreferenced `jufaja-mark-3d.png` is retained approved source/reference artwork; the root untracked portrait is untouched. New WebP files are delivery derivatives, not unnecessary source copies.

## Delivery improvements

Six existing architectural images were optimized in place, preserving crop and aspect ratio. Maximum width is now 1920px and WebP quality 82. Combined size decreased from 2,249,012 to 1,197,168 bytes (46.8%).

The leadership PNG originals remain unchanged. Two WebP delivery derivatives preserve original dimensions and composition: executive portrait 112,710 bytes (94.7% smaller) and site portrait 125,704 bytes (53.1% smaller).

No external project photography or third-party drawings were downloaded or attributed to JUFAJA. Existing architecture illustrations remain labelled concepts. New supporting visuals must likewise be labelled illustrative references and cannot substantiate business or portfolio claims.

## New support imagery
Two new, visibly illustrative support visuals were generated and inspected: limestone-courtyard-detail.webp (247,958 bytes) for the homepage detail section and inclusions hero; architectural-planning-materials.webp (176,548 bytes) for the contact hero. Both are 1536 × 1024 WebP and have descriptive alternatives. Final inventory: 26 assets; four protected exact duplicate groups; no redundant architectural copies removed.
