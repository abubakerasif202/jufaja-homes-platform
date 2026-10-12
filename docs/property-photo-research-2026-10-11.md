# JUFAJA property photograph publication log — 11 October 2026

The owner's permission to use these images was recorded on 11 October 2026. Written photographer licensing contracts have not been independently audited. Matching a listing address establishes image-to-address provenance; it does not establish JUFAJA's construction scope or completion of the residence.

## Source audit and published result

- Starting register: 28 unique addresses, 15 photo sets, 58 image URLs; 13 addresses without photographs.
- Downloaded 55 of the 58 supplied references. Three view.com.au images for 5 Meeson Street return HTTP 403, including a retry with a browser user agent and source referrer. Their original references remain in the internal provenance manifest; the working exterior remains public.
- Visually inspected all 55 downloads in a labelled contact sheet and inspected dimensions before publication.
- Excluded both 32 Ganugan Road images: land-sale concept renders with registered-land/build-process overlays, not authentic photographs of a completed residence.
- Excluded the 3 Lakeman Street aerial vacant-land image, the 134×110 historical vacant-land thumbnail for 30 Westview Street, and the 150×99 low-resolution historical thumbnail for 6 Burns Avenue.
- Final collection: **50 locally hosted property photographs across 11 galleries**. All 28 address records remain internal; 17 currently have no suitable public photographs. No fabricated replacements were added.
- All 50 delivery assets use WebP, quality 86, orientation correction and a maximum 1920×1440 bounding box without enlargement. Original downloaded bytes remain in the local temporary audit cache, not the public website.
- Corrected seven sideways 59A Fieldhouse Circuit photographs by rotating 90 degrees clockwise. Its covered exterior is the cover. Selected the genuine front exterior for 28 Waterhouse Road instead of the kitchen.
- No AI edits, fabricated buildings, colour reinterpretations or perspective warps were used. Existing handheld perspective and source compression remain where improving them would remove material architectural content or invent detail.

`property-photo-provenance.json` records all 58 source URLs, source pages, SHA-256 hashes, dimensions, derivative sizes, exact processing, download failures and exclusions. This file is internal repository documentation; gallery visitors cannot navigate to property listings, map searches, image searches or original-image sources.

## Address/source evidence and limitations

The existing owner-approved registry and its prior address-matching research were retained. The current Ray White Macarthur listing for 28 Waterhouse Road was independently reopened and confirms the exact address and listing gallery. LJ Hooker source pages and the historical Ray White page could not be reopened through the research tool; their image CDNs downloaded successfully. Successful image delivery alone is not a fresh independent address verification. Attribution remains visible and unobtrusive.

34 Horatio Street retains its explicit 2016 historical listing note: these photos do not document JUFAJA's subsequent work. The collection is labelled residential property photography, with conceptual architectural studies separately identified as not completed JUFAJA projects.

## Regression protection

- Integrity tests require 28 unique records, 11 galleries, 50 locally hosted delivered assets, 58 audited source references, three blocked references and five rejected images. Delivered assets must have source provenance and match their reviewed SHA-256 hashes.
- `scripts/qa-gallery.mjs` checks every delivered image and every gallery at 320, 390, 430, 768, 1024, 1440 and 1920 pixels; local-only image sources, no public source links, image loading, overflow, next/previous, thumbnail selection, arrow keys, touch swipes, Escape, close button, focus restoration and empty search results. It aborts enquiry requests.
- Release requires the complete repository QA gates and live verification; this document is not itself evidence that those runtime checks passed.

## Remaining owner asset needs

Supply authorised original photographs for the 17 records without suitable public photos, and high-resolution replacements wherever the source quality is limited. Do not publish current JUFAJA construction claims based only on historical property listings. No public-office address or other business claim is inferred from residential records.


## 12 October 2026 continuation (PR #14)
The directory now exposes all 28 addresses: 11 real-photo galleries retain all 50 original delivered files and hashes, and 17 representative galleries each contain two distinct reviewed catalogue exteriors (34 distinct local assets). Reference sets are architectural references, not authenticated multiple views of the listed residence. Original real galleries never include representative images. No additional real photos could be retrieved within the approved reference manifest; see property-gallery-source-audit-2026-10-12.md for the 28-address audit and HTTP 403/429 retrieval results. Listing provenance is now server-only and excluded from client display props. Runtime and preview release evidence is recorded separately in the PR release report.
