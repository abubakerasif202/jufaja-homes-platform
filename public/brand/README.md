# Approved JUFAJA artwork

The supplied `ChatGPT Image Oct 1, 2026, 01_58_21 AM.png` is byte-identical to the already committed `jufaja-logo-3d.png`. Its SHA-256 is `54aabe5a0672589e2633a2042a665612f87d42ae43f5e834cff524d266b642fd`.

`jufaja-logo-transparent.png` is an unchanged copy of that approved source, including its genuine alpha channel. Header, footer and cinematic intro all use it with responsive Next.js image optimisation. No lettering, geometry or colours are recreated.

`jufaja-logo.png` is a 768px proportional derivative for metadata. `jufaja-mark.png` crops only the emblem from the source. The SVG filenames are raster carriers with embedded PNG artwork, **not vector conversions**. The favicon contains only the source emblem. Previous `*-3d.png` assets are retained as source/reference artwork.

Regenerate the mechanical derivatives with `node scripts/prepare-brand-assets.mjs` using the installed Sharp image tooling. This does not generate or trace a new logo.
