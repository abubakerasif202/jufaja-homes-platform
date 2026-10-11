# JUFAJA property image publication log (updated 11 Oct 2026)

**Owner permission confirmation:** The owner explicitly confirmed permission to use the property photos on the JUFAJA website on 11 Oct 2026. This was taken as approval to publish identifiable exact-address-matched images, subject to source accuracy and credits. The assistant cannot independently audit written licensing contracts.

**Current PR:** 28 unique address records, 46 publicly sourced photographs from 10 exact-address-matched photo sets. The other 18 addresses remain in the directory with research and maps links, rather than fabricated / mislabelled galleries.

Images are served from source website/CDN URLs; no image source was silently relabelled as JUFAJA-owned. Direct image hotlinks can expire or block embedding. Prefer original authorised photo uploads for long-term production reliability.

## Important source accuracy notes

- `28 Waterhouse Road`: 10 photographs matched to Ray White Macarthur Group listing; exact address and gallery source.
- `10 Westview Street`: 16 photographs matched to LJ Hooker exact-address rental listing.
- `34 Horatio Street`: 10 *historical (2016)* Ray White listing photos. Explicitly labelled historical: these do **not** document JUFAJA's subsequent work.
- `30 Westview Street`: 1 historical Domain property image. Exact address, but date/current appearance differ.
- `26 Wilenski Way`, `30A Westview Street`, `59 Fieldhouse Circuit`, `5 Meeson Street`, `7 Meeson Street`, `18A Dallas Drive`: additional matched imagery from property.com.au, view.com.au or realestate.com.au.
- `130 Webber Circuit, Bardia`: an older result is vacant land, not a verified completed home. No image shown.
- `3 Lakeman Street, Leppington`: a historical result depicts land. No finished-property photo shown.
- `18 Dallas Drive` and `18A Dallas Drive` are separate addresses.
- `110 Fieldhouse Circuit`: published public records include aerial/land imagery; not used as a building photo.
- `18 Quondong Street`: duplicate submission removed. A single unique address remains.
- A matching source address establishes image-to-address provenance, **not** what work was performed by JUFAJA. No fabricated completed-project claims.

## Release safeguards

- Show source credits and direct public source page links.
- Gallery uses lazy-loaded external photographs, keyboard-reachable gallery buttons, thumbnail selection, search and suburb filtering.
- Show a brand-themed address fallback for empty/missing photos; do not reuse unrelated imagery to fill gaps.
- Keep the separately labelled illustrative architecture images in their original concept-study section.
- Test mobile image layout and external CDN load in the deployed application.
- User authorisation to use imagery is not independent verification of build scope or completion status.

## Outstanding

- Run local lint, TypeScript, tests, build, accessibility and asset scripts listed in `AGENTS.md` when a shell runner with repository access is available. Vercel READY indicates a successful preview build, **not** all local tests passed.
- The preview may require authorised Vercel login, preventing unauthenticated external browser screenshot QA.
- Obtain approved high-resolution original files where feasible, then move fragile remote photo URLs to local optimised assets.
- Research imagery for the 18 address entries with no exact-match photos found so far.
