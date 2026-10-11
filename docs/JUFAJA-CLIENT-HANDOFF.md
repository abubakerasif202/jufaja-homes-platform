# JUFAJA Constructions client handoff

Prepared 12 October 2026 for existing PR #12: https://github.com/abubakerasif202/jufaja-homes-platform/pull/12.

## Catalogue

The Production release contains **63 catalogue records and 63 unique reviewed representative facade images, zero pending**. Cards, detail pages, related designs and homepage featured designs use the same registry mapping. All 56 suitable earlier images are preserved; seven new concepts replace rejected crops or incorrect storey assignments. Authentic completed-property photography at `/projects` is preserved.

These architectural renders are generic representative CGI. They are not verified completed JUFAJA projects, current construction drawings or evidence of a matching approved floorplan. This disclosure appears in accessible HTML outside the artwork. Existing plan counts and dimensions remain reference information requiring confirmation; unverified external floorplans, prices and virtual tours are not published.

The seven replacement concepts, prompts and provenance are in `JUFAJA-REPLACEMENT-CONCEPTS.json`. The native 1200×896 exception for 34 supplied assets was explicitly approved by the owner on 12 October 2026 with the response “Approve native 1200×896 exception”. The earlier unconfirmed approval statement has been corrected. Files are not upscaled.

## Updating images

1. Supply a complete, distinct facade with no embedded text, logos, watermark, borders or collage. Use at least 1200×900; do not upscale a tiny source or fabricate missing edges.
2. Verify storeys, dwelling units and plausible garage count. Internal `granny` and `rural` categories do not imply storeys. Keep CGI disclosure for conceptual renders.
3. Optimize to `public/images/designs/<slug>.webp`. Update that record in `src/data/design-images.json` with actual dimensions, bytes, SHA-256, pixel pHash, source provenance and a file-bound manual visual review. Keep superseded-source provenance.
4. Remove a dimension exception when a replacement meets the generic minimum. An exception requires explicit recorded owner approval and the exact file SHA; a generic statement is insufficient.
5. Run `npm run audit:design-images`, `npm test`, `npm run build`, and `node scripts/qa-design-images.mjs` against the local production server. Compare all catalogue facades visually and check cards/details on mobile and desktop.
6. Before release, inspect authenticated Preview responses. A redirect or HTML login page is a failure. Hash downloaded original WebP response bytes against the registry; do not hash a local file as remote evidence.

Downloads originals and generated PNG sources remain untouched. Final assets are in the repository. Labelled contact sheets, browser screenshots and runtime reports are outside Git under `C:\Users\abuba\jufaja-image-review\release-completion`.

## QA and release

Lint, TypeScript, 36 tests, build, image audit, production dependency audit, HTTP, accessibility, SSR, no-JavaScript, gallery, intro and 200-load local hydration checks passed. Responsive browser checks passed 235 route/viewport checks with zero overflow, broken images or browser errors. All-design image QA passed 63 response hashes, 63 detail pages, 189 related cards and 3 homepage featured cards. Authenticated 63-image Preview verification passed with actual downloaded response SHA-256 checks and no missing images. Four release checks passed before PR #12 merged. The source release is commit `5ca4622` on `main`; Vercel Production was verified READY. The exact checks and limitations are recorded in `JUFAJA-FINAL-QA-REPORT.md`.

The preceding Preview failures were protection redirects: unauthenticated 56/56 HTTP 302 `text/plain`; authenticated actual response downloads 56/56 HTTP 200 `image/webp`, every hash matching. The final verifier records per-file HTTP and actual byte evidence. CI is now an actual Windows Actions workflow, rather than treating Vercel and skipped CodeRabbit statuses as CI.

**Production is live:** PR #12 merged as `5ca4622105e6b0aa1b104f62a8eb62ed0eea6742` and Production deployment `dpl_FjdPmN8B23FLipQsUfCA9msKyQ8d` is READY on `www.jufajaconstructions.com.au`. After release, `/designs`, `/sitemap.xml`, `/robots.txt`, and `/privacy` returned HTTP 200, and a missing route returned 404. The post-release transcript does not contain a new complete Production browser sweep; local and authenticated Preview QA results must not be presented as full Production QA.

## External services

No QA customer enquiry is delivered. Browser form tests intercept requests. Resend sender verification, inbox delivery and Upstash live connectivity remain unverified by this image release; existing server-side protections are preserved. Search Console access and production field Core Web Vitals are also unverified. Local reports are lab evidence. Use the exact deployment/SHA evidence in the final report to distinguish Preview from Production.

## Final handoff follow-ups

- Obtain the client's acknowledgement that generic CGI renders are representative and do not establish exact approved floorplans or completed projects.
- Arrange an owner-authorized Resend delivery/inbox test and non-destructive Upstash connectivity check; browser form tests intercepted enquiries and did not prove live delivery.
- Inspect live security headers: the release transcript's direct HTTP report recorded no `Content-Security-Policy` header on the sampled responses. Review the complete policy before changes.
- Confirm Search Console ownership, sitemap submission/indexing and real-user Core Web Vitals separately.
- Keep deployment rollback reference `2a244a200668bc3a229a0a67747319ad4dbd06f7` if a regression requires a revert or redeploy of the prior known release.
