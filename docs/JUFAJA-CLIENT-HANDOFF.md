# JUFAJA Constructions client handoff

Prepared 12 October 2026 for the final 36-design image QA branch. This is a **Preview review candidate, not a Production release**. It contains 56 unique catalogue images; 7 of 63 designs remain pending because the supplied or previously assigned facade is visibly cropped or the storey count conflicts with the catalogue.

## Website and image status

The site has 63 catalogue design records. Each published facade is slug-specific and registry-backed. Cards, detail pages, related designs and homepage featured designs share the catalogue image mapping. The site labels this artwork as representative CGI. It does not assert that a CGI is a completed JUFAJA project or an approved construction plan.

The seven pending designs and the reason for each are in [`JUFAJA-IMAGE-QA-REPORT.md`](JUFAJA-IMAGE-QA-REPORT.md). Do not mark the catalogue complete until those assignments pass visual review. The actual property gallery at `/projects` remains unchanged.

Public routes include `/`, `/about-us`, `/custom-homes`, `/knockdown-rebuild`, `/designs`, 63 `/designs/[slug]` details, `/packages`, `/display-homes`, `/inclusions`, `/projects`, `/contact`, `/privacy`, `/sitemap.xml`, `/robots.txt`, and `/manifest.webmanifest`.

## Updating catalogue art

1. Supply a complete facade with no embedded text or watermark. Use at least 1200 × 900 where available; do not upscale or fabricate missing edges.
2. Verify the image represents the correct number of storeys and dwelling units. Internal `granny` and `rural` categories do not determine storeys.
3. Save an optimized WebP at `public/images/designs/<slug>.webp` and update that slug's registry entry in `src/data/design-images.json` with actual dimensions, byte count, SHA-256, pixel pHash, source path, and a SHA-bound visual review.
4. Run `npm run audit:design-images`, `npm test`, `npm run build` and `node scripts/qa-design-images.mjs` against a local production server.
5. Review the rendered image on mobile and desktop and preserve the representative CGI disclosure.

The supplied source inventory is summarized in `docs/JUFAJA-36-SOURCE-REVIEW.json`. The original files remain in the owner's Downloads directory, outside the repository.

## QA and external services

Local verification passed lint, typecheck, 31 tests, production build, image audit, HTTP, accessibility, browser, no-JavaScript, SSR, gallery and intro QA. The final hydration run was still in progress when this document was drafted; consult the final QA report and saved report before acceptance. Browser tests intercepted all enquiry delivery. No real customer enquiry was sent.

Resend sender authentication and Upstash live rate-limit health have not been verified. Credentials were not printed. The local dependency audit found 9 development advisories; production dependencies have zero reported advisories.

## Release state

Base `main` is `2a244a200668bc3a229a0a67747319ad4dbd06f7`, merged PR #11. Production still uses that SHA. The final image branch/PR and Vercel Preview URL are recorded in the final QA report after creation. Production release remains blocked by the seven pending facade assignments; do not merge while they remain unresolved.

For SEO, the build and HTTP QA confirmed the canonical host and sitemap behavior. Search Console access was not used. After a future approved production release, the owner can inspect indexed canonicals and submit `/sitemap.xml` through Search Console.
