# JUFAJA image integration and quality report

Audit date: 12 October 2026

Source archive: `JUFAJA_50_Design_Renders_5_Batches.zip` in the user's Downloads folder. The archive and extracted staging files remain outside the website repository.

## Result

The package contains 50 candidate images for a catalogue of 63 designs. The initial source mapping was not safe to publish as supplied: two single-storey assignments visibly showed two-storey homes, two full-size renders repeated the same facade compositions, 21 images were portrait crops from collage boards, and the Tempus crop contained brochure text. The package README also states that its images are representative CGI, not evidence of an exact approved design or completed build.

The site now publishes 27 unique 1440 × 1080 WebP images: 25 suitable full-size package renders and two newly generated, storey-correct concept renders for Oxley and Eden. The two incorrect package images were not used. Two package images were excluded as visual near-duplicates. The 21 collage crops and all 13 designs outside the package remain explicitly pending. No pending design silently reuses another design's image.

The 27 published files total 10,039,612 bytes (9.57 MiB) before Next.js image optimization. Every path and SHA-256 is recorded in [`src/data/design-images.json`](../src/data/design-images.json). The production audit checks that all 63 designs have a review record, assignment dwelling type matches the catalogue, available files exist and decode as WebP, dimensions are at least 1200 × 900 with an aspect ratio from 1.25 to 1.5, registry dimensions and byte counts match, SHA-256 values match, paths and file hashes are unique, and DCT perceptual hashes are recalculated from decoded image pixels before pairwise comparison. The registry hash must exactly match the recomputed hash, so a stale or fabricated registry value cannot hide a near-duplicate.

## Published image assignments

| Dwelling type | Designs with unique images |
|---|---|
| Single-storey | Blaxland, Kingston, Hemsworth, Oxley, Eden, Patterson, Hastings, Riley, Lennox, Collins, Glenbrook, Lindsay |
| Double-storey | Bennelong, Centennial, Grange, Delta, Urban, Verona, Elite, Alpha, Montreal, Crawford, Denison |
| Duplex | McEvoy, Mayfield, Fair Haven, Ivory |

Oxley and Eden use new representative CGI renders generated on 12 October 2026. Both show a complete single-storey facade and have no visible text, logo, watermark, border, or collage panel. These are generic concept images; they are not claimed to be the corresponding approved JUFAJA plans or completed homes. The remaining published images are the package's full-size individual renders. The 28-address genuine property gallery was not changed.

## Rejected and pending package candidates

| Design | Candidate | Finding |
|---|---|---|
| Majestic Series | `04_majestic-series.webp` | Visually repeats the Blaxland facade composition. Blaxland is retained; Majestic remains without an image. |
| Oxley 26 Series | `05_oxley-26-series.webp` | Visually repeats the Kingston facade composition. Kingston is retained; Oxley 26 remains without an image. |
| Oxley Series | `06_oxley-series.webp` | Candidate visibly shows an upper storey despite the single-storey catalogue record. Replaced with a new representative single-storey concept render. |
| Eden Series | `07_eden-series.webp` | Candidate visibly shows an upper storey despite the single-storey catalogue record. Replaced with a new representative single-storey concept render. |
| Stuart, Rozelle, Chesterfield, Crest, Darlington, Lithgow, Jardine, Stamford, Winton | Batch 2–3 collage crops | Portrait, lower-resolution crops that do not suit the landscape card and detail presentation. |
| Elwood, Meadow, Atlantic, Primavera, Stellar, Linden, Coral, Fingal, Pacific | Batch 4–5 collage crops | Portrait, lower-resolution crops that do not suit the landscape card and detail presentation. |
| Altona, Pine Lea Duplex | Batch 5 collage crops | Lower-resolution collage crops; unsuitable for a premium full-width catalogue detail image. |
| Tempus Duplex | `50_tempus-duplex.webp` | 552 × 378 crop contains visible “luxury inclusions” and “illustrative render” brochure text; rejected. |

The following 13 designs are outside the package and have no distinct approved source in the repository: Stanmore Duplex, Tempus Mk2 Duplex, Marbella 35.5, Marbella 31, Marbella 31 MK1, Austin 26, Austin 25, Austin 25 MK1, Berkeley 27 Wide Lot, Edgeworth 35 Wide Lot, Ashford 38.5 Wide Lot, Holbrook 40 Wide Lot, and Cowra 47.5 Wide Lot.

## Duplicate and visual review

SHA-256 found no exact duplicate files in the package. A 32 × 32 grayscale DCT perceptual hash was also calculated for each candidate. Visual review identified two same-facade compositions despite different crops and rendering details: Blaxland/Majestic (Hamming distance 14/64) and Kingston/Oxley 26 (22/64). Both duplicate candidates are excluded, and no published pair is within the audit's 8-bit near-duplicate threshold. Perceptual hashes support the contact-sheet review; they do not replace visual review.

The package was decoded and checked for actual dimensions. Five labelled contact sheets were reviewed at full detail. Visible brochure text was found on Tempus; the other rejected collage crops were rejected for composition and resolution. All published images were inspected for facade completeness and dwelling type. The two generated files were inspected separately before conversion to WebP. New card and detail views use the same slug-keyed file, and all catalogue text is rendered as HTML outside the image.

## Remaining work before complete catalogue handoff

Create or obtain a distinct, high-resolution, correct-dwelling-type exterior render for each of the 36 pending designs. Confirm the final facade against approved design material before calling an image design-specific. Then update the slug-keyed registry, recalculate hashes, rerun `npm run audit:design-images`, and repeat the image and responsive browser reviews. Until then the catalogue correctly identifies missing artwork, and the website is not ready for a complete image handoff or production merge.
