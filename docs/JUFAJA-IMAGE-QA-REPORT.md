# JUFAJA image quality report

Reviewed 12 October 2026 on the existing `feat/final-36-design-images` branch and PR #12.

## Catalogue result

**63 designs / 63 unique available representative facades / zero pending.** The 56 suitable images from the preceding review are preserved with identical paths, dimensions, bytes, SHA-256 and pHashes. Seven rejected assignments have been replaced with distinct generic architectural concepts. Actual completed-property photography at `/projects` is unchanged.

All 63 images were manually compared on three labelled contact sheets, with labels outside the artwork. The seven replacements were also inspected at full size by two independent reviewers. Their complete roofs and facades remain inside the frame, with plausible garages and correct storeys. No visible text, logos, watermarks, borders, collage, stretching or blurred facade was found. CGI is labelled in accessible HTML as representative architecture, not a completed JUFAJA project or an approved construction drawing.

## Seven replacements

| Slug | Storeys | Garage spaces | Native delivered size |
|---|---:|---:|---|
| `majestic-series` | 1 | 2 | 1448 × 1086 |
| `stuart-series` | 1 | 2 | 1448 × 1086 |
| `hastings-series` | 1 | 2 | 1448 × 1086 |
| `lennox-series` | 1 | 1 | 1448 × 1086 |
| `collins-series` | 1 | 2 | 1448 × 1086 |
| `glenbrook-series` | 1 | 2 | 1448 × 1086 |
| `alpha-series` | 2 | 2 | 1448 × 1086 |

The built-in imagegen tool produced seven separate PNG sources. Each was converted to WebP at quality 92, effort 6, with no resize, padding or upscaling. Actual saved-file metadata, SHA-256, pixel-derived pHash and visual-review observations are in `src/data/design-images.json`. Generation prompts, original source filenames/hashes and superseded rejection reasons are in `docs/JUFAJA-REPLACEMENT-CONCEPTS.json`. Generated source files remain under the original `.codex/generated_images` path; the previous five incorrect-storey WebPs are archived externally under `C:\Users\abuba\jufaja-image-review\release-completion\superseded`. Downloads originals are untouched.

Distinct compositions use flat limestone masonry, federation brick, split skillion planes, a one-garage coastal cottage, low mid-century brick, sandstone bungalow and a restrained two-storey brick home. Shared architectural styles are not facade reuse. The existing `granny` and `rural` categories remain internal categories; storeys are determined visually.

## Native-resolution exception: corrected approval record

The earlier interpretation of “use provided” as confirmed approval has been superseded. On **12 October 2026**, the owner explicitly answered **“Approve native 1200×896 exception”** to the question approving publication of the **34 existing supplied renders at native 1200×896, without upscaling**, as a four-pixel exception to the 1200×900 gate.

Each exception is bound to the actual image SHA, exact 1200×896 dimensions, approval date, exact response and scope. The generic 1200×900 minimum remains unchanged. Unconfirmed, generic, missing or stale approvals fail the audit. The 22 earlier conforming files and all seven replacements meet the normal minimum without exceptions.

## Integrity and duplication

The audit passes 63 records, 63 available images and zero pending. All paths, exact hashes and published files are unique. All **1,953 pairwise pHash comparisons** exceed the near-duplicate threshold of 8; the minimum distance is **10**. Manual facade comparison found no reused building among published images. Published original WebPs total **22,497,406 bytes**; Next.js serves responsive derivatives through its image optimizer.

The source folder still contains 36 PNGs and 36 corresponding WebPs at 1200×896. `JUFAJA-36-SOURCE-REVIEW.json` is the historical pre-integration snapshot against the original 27-image baseline. Its dimension failures describe that original snapshot, not the explicitly approved final exception.

Final contact sheets are external review artifacts at `C:\Users\abuba\jufaja-image-review\release-completion\contact-1.jpg`, `contact-2.jpg` and `contact-3.jpg`.

## Remote verification correction

The preceding unauthenticated Preview attempt received **56 HTTP 302 responses with `text/plain`**, caused by Vercel Preview protection. It was not valid image verification; comparing local files to local registry hashes did not establish remote integrity.

Authenticated Chrome CDP downloads from Preview SHA `404bd024528794f8414601fbed314512fce9c41f` returned **56 HTTP 200 `image/webp` responses**. Their downloaded response bytes matched every registry byte count and SHA-256. No cookies or tokens were exported. Full sanitized evidence is at `C:\Users\abuba\jufaja-image-review\remote-preview-http\authenticated-design-images.json`.

The repaired verifier captures HTTP status, Content-Type, downloaded byte count/SHA and expected registry values. Authentication errors fail explicitly. Preview headers remain scoped to the exact permitted origin and cannot follow a redirect to another origin. Final 63-image Preview and Production evidence is recorded in the final QA report after deployment.
