# JUFAJA image quality report

Reviewed 12 October 2026 against main `2a244a200668bc3a229a0a67747319ad4dbd06f7` (merged PR #11).

## Result

The release branch has **56 unique published assignments and 7 pending designs**. It adds 34 of the supplied 36 designs, preserves 22 suitable existing assignments, and withdraws five verified wrong-storey assignments. All 27 original files are retained unchanged; no genuine `/projects` photography is changed.

The source folder `JUFAJA_36_Designs_Renders` contains 72 image files: 36 PNG originals and 36 corresponding WebPs, plus a manifest; no ZIPs. All decode at 1200 x 896 (aspect 1.3393). Filenames match all 36 requested slugs. PNG/WebP versions of the same design are intended format variants, not distinct designs. Originals remain untouched in Downloads.

The owner explicitly instructed “use provided” after being informed of the four-pixel shortfall against the existing 1200 x 900 minimum. Accepted supplied WebPs are therefore copied byte-for-byte with no upscaling, stretching, padding or lossy recompression. Each exception is exact-size and SHA-256-bound; the generic minimum predicate remains unchanged. The responsive 4:3 frame differs by only 0.45% from native aspect. Next.js provides responsive optimized delivery; separate physical derivatives are unnecessary.

## Visual review and provenance

All 63 entries were compared in three labelled contact sheets (labels outside artwork); suspicious crops and storey assignments were additionally opened full size. New accepted facades show distinct building compositions and plausible garage arrangements, with no visible text, logos, watermarks, borders or collage panels. Exposure ranges from daylight to dusk and is retained rather than flattening architectural materials. These are representative CGI, not verified completed JUFAJA projects or approved design plans. Accessible HTML disclosures remain outside images.

Granny is an internal category: Marbella 35.5, Marbella 31, Austin 26 and Austin 25 MK1 visibly show two storeys; Marbella 31 MK1 and Austin 25 show one. Rural candidates show one storey. These observations are recorded without inferring storeys from internal category names. Duplex candidates visibly represent paired dwellings.

`JUFAJA-36-SOURCE-REVIEW.json` is the initial pre-integration inventory against the original 27-image baseline at `2a244a2`. It contains actual dimensions, bytes, SHA-256 and pixel-derived pHashes for all 72 supplied files. Its 72 dimension failures predate the owner's explicit native-size approval. It found zero exact/cross-design near-duplicate candidates in 4,464 comparisons, excluding 36 intentional same-slug PNG/WebP pairs. Hash findings support, but cannot replace, manual review.

The registry records saved-file hashes, source provenance and SHA-bound manual architectural review. The release audit recalculates actual pHashes, checks every catalogue record, actual WebP dimensions/bytes/SHA, unique paths/files, near-duplicate threshold, visual-review approval and single/double/duplex architectural consistency. Human review remains necessary for text, crops and facade identity; the audit validates attestations, not computer vision.

## Pending designs

| Slug | Verified finding |
|---|---|
| `majestic-series` | Supplied native render crops the right-hand building wing at the image edge; a complete facade is required. |
| `hastings-series` | Manual visual review: facade depicts a double-storey dwelling, inconsistent with the single-storey catalogue classification. Replacement required. |
| `lennox-series` | Manual visual review: facade depicts a double-storey dwelling, inconsistent with the single-storey catalogue classification. Replacement required. |
| `collins-series` | Manual visual review: facade depicts a double-storey dwelling, inconsistent with the single-storey catalogue classification. Replacement required. |
| `glenbrook-series` | Manual visual review: facade depicts a double-storey dwelling, inconsistent with the single-storey catalogue classification. Replacement required. |
| `stuart-series` | Supplied native render crops the right-hand building wing at the image edge; a complete facade is required. |
| `alpha-series` | Manual visual review: facade depicts a single-storey dwelling, inconsistent with the double-storey catalogue classification. Replacement required. |

No rejected render is repurposed under another slug. The five old defective files remain on disk for provenance but are not used by catalogue cards, detail galleries or homepage featured selection. Majestic and Stuart need wider source compositions; changing CSS cannot recover pixels outside the source.

## Accepted assignments

| Slug | Native dimensions | Bytes |
|---|---|---|
| `blaxland-series` | 1440 x 1080 | 444250 |
| `kingston-series` | 1440 x 1080 | 364548 |
| `hemsworth-series` | 1440 x 1080 | 388170 |
| `oxley-26-series` | 1200 x 896 | 288032 |
| `oxley-series` | 1440 x 1080 | 299072 |
| `eden-series` | 1440 x 1080 | 337336 |
| `patterson-series` | 1440 x 1080 | 401414 |
| `riley-series` | 1440 x 1080 | 388214 |
| `lindsay-series` | 1440 x 1080 | 402046 |
| `rozelle-series` | 1200 x 896 | 337306 |
| `chesterfield-series` | 1200 x 896 | 290078 |
| `crest-series` | 1200 x 896 | 270878 |
| `darlington-series` | 1200 x 896 | 248338 |
| `lithgow-series` | 1200 x 896 | 328862 |
| `jardine-series` | 1200 x 896 | 364418 |
| `stamford-series` | 1200 x 896 | 317884 |
| `winton-series` | 1200 x 896 | 313716 |
| `bennelong-series` | 1440 x 1080 | 439144 |
| `centennial-series` | 1440 x 1080 | 350338 |
| `grange-series` | 1440 x 1080 | 345470 |
| `delta-series` | 1440 x 1080 | 381718 |
| `urban-series` | 1440 x 1080 | 312614 |
| `verona-series` | 1440 x 1080 | 356252 |
| `elite-series` | 1440 x 1080 | 411742 |
| `montreal-series` | 1440 x 1080 | 350122 |
| `crawford-series` | 1440 x 1080 | 417626 |
| `denison-series` | 1440 x 1080 | 395784 |
| `elwood-series` | 1200 x 896 | 325412 |
| `meadow-series` | 1200 x 896 | 378590 |
| `atlantic-series` | 1200 x 896 | 304770 |
| `primavera-series` | 1200 x 896 | 306676 |
| `stellar-series` | 1200 x 896 | 293966 |
| `linden-series` | 1200 x 896 | 323778 |
| `coral-series` | 1200 x 896 | 305886 |
| `fingal-series` | 1200 x 896 | 313190 |
| `pacific-series` | 1200 x 896 | 368196 |
| `mcevoy-duplex` | 1440 x 1080 | 341864 |
| `mayfield-duplex` | 1440 x 1080 | 372772 |
| `fair-haven-duplex` | 1440 x 1080 | 397970 |
| `ivory-duplex` | 1440 x 1080 | 386754 |
| `altona-duplex` | 1200 x 896 | 349650 |
| `pine-lea-duplex` | 1200 x 896 | 357370 |
| `tempus-duplex` | 1200 x 896 | 239138 |
| `stanmore-duplex` | 1200 x 896 | 314204 |
| `tempus-mk2-duplex` | 1200 x 896 | 301600 |
| `marbella-355` | 1200 x 896 | 355202 |
| `marbella-31` | 1200 x 896 | 344242 |
| `marbella-31-mk1` | 1200 x 896 | 352590 |
| `austin-26` | 1200 x 896 | 321680 |
| `austin-25` | 1200 x 896 | 345054 |
| `austin-25-mk1` | 1200 x 896 | 332030 |
| `berkeley-27-wide-lot` | 1200 x 896 | 325522 |
| `edgeworth-35-wide-lot` | 1200 x 896 | 383252 |
| `ashford-385-wide-lot` | 1200 x 896 | 377064 |
| `holbrook-40-wide-lot` | 1200 x 896 | 317430 |
| `cowra-475-wide-lot` | 1200 x 896 | 417414 |

Total published bytes: 19398638. All 56 paths and hashes are in `src/data/design-images.json`.

Contact sheets and full-size review artifacts are outside Git under `C:\Users\abuba\jufaja-image-review`. See the final QA report for browser/release results.
