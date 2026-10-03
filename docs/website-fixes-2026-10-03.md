# Website audit fixes — 3 October 2026

The live review found that enquiries discarded URL context, design imagery conflicted with storey labels, contact and content pages gave visitors little actionable information, design pages nested main landmarks, and metadata repeated the brand.

## Changes

- Contact resolves service, design and project parameters on the server. The form displays the selected subject, selects the matching enquiry type, prefills an editable message and includes the subject in the email payload.
- Both forms use the same enquiry types, privacy information and field length limits. The drawer clears submitted personal details after success and selects Home design when opened from a design card.
- Added a factual enquiry privacy page and footer/form links. Added optional owner-configured public phone, email, office and hours. Delivery credentials are never published as business contact information.
- All design pages and the loading state use the root layout's single main landmark.
- Corrected page titles, per-page social titles/descriptions/URLs and design category contrast.
- Added an illustrative one-storey Australian home reference; single-storey cards no longer show a two-storey image. Catalogue photography is labelled inspiration, separate from approved facades. Secondary living labels explain that combined dwelling totals need confirmation.
- The client catalogue projection excludes unsupported prices/features, third-party plan URLs and unverified virtual tours. Original records remain available internally for owner review.
- Floorplan availability has a contextual request action. Package/display/inclusions pages explicitly explain which information is unpublished; navigation labels reflect enquiries rather than available listings.
- Filters derive from the current URL so navigation updates selections, and invalid filter values are ignored.
- Repaired the missing optional fsevents lockfile entry which prevented npm ci validation.

## Verification

- Production build: passed, 80 generated outputs.
- ESLint and TypeScript: passed.
- 20 tests: passed, including three mobile CSS regression checks. Enquiry API tests compile and call the actual route with mocked delivery, checking context in the email, validation, spam handling, missing configuration and provider failure. Filter tests call the actual filter implementation.
- Production HTTP verification: all 74 content URLs return 200 with one main landmark, one H1 and the expected canonical. Unverified design pages retain noindex. Public HTML excludes legacy price fields and third-party plan URLs.
- Four contact handoffs verified against server-rendered HTML: house and land, display homes, design and concept.
- Sitemap includes privacy and deliberately excludes noindex design references. The initial live review recommendation to include all 63 designs was corrected after source inspection confirmed their unverified status.
- npm ci dry run and git diff whitespace check: passed.
- Browser cannot open the local server from this cloud session. Desktop live verification follows deployment. Mobile device rendering, Lighthouse/Core Web Vitals and real inbox delivery are not certified by these checks. No customer enquiry was sent.

## Mobile layout follow-up

- Replaced the fixed-height mobile slideshow copy frame with overlapping, content-driven grid slides. Landscape image frames avoid the excessive portrait crop; larger text can grow the copy area.
- Wrapped slide controls into two rows with 44px touch targets and reserved copy padding. Scoped white hero text to desktop so mobile text stays readable on ivory.
- Added viewport-fit, header/menu safe-area spacing and dynamic-height, scrollable enquiry drawers. Reduced cramped card padding, retained landscape project previews and allowed numbered section text to shrink and wrap.
- Restored Inclusions in mobile navigation. Updated the optional browser QA matrix with short phones, landscape and privacy, and removed a vacuous old accordion assertion.
- Added three source regression tests for mobile CSS. These validate rules, not rendered geometry. Browser security blocks the local preview, so phone rendering, text zoom and keyboard/device behavior still require visual acceptance testing in an authorized environment.

## Owner content still required

Approved contact details and office hours; current plan drawings, design specifications and facade images; genuine completed-project photos; package listings and approved pricing; display locations and hours; written inclusions. The repository does not contain verified replacements for these items, so the update does not fabricate them.

Production enquiry delivery still requires the existing Resend and Upstash deployment environment variables described in README.md. Public contact details use the separate JUFAJA_PUBLIC_* variables.
