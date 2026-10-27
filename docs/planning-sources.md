# Design studio planning integration

Verified on 27 October 2026. This is an address/parcel/map-data integration with
concept screening. It is not a complete statutory rules engine, a planning
certificate, a survey, construction documentation or a certification service.

## Live sources

- Address lookup: [NSW Spatial Services Address Location documentation](https://maps.six.nsw.gov.au/sws/AddressLocation.html).
  The fixed upstream endpoint is `https://mapsq.six.nsw.gov.au/services/public/Address_Location`.
  Only house number, street name/type, suburb, postcode and a fixed EPSG:4326
  projection are forwarded. Candidates retain the provider's matching notes;
  users must choose and confirm the correct result. The service can return
  nearby or substituted addresses, street ranges and multiple units.
- Planning maps: [NSW Planning Portal Spatial Viewer](https://www.planningportal.nsw.gov.au/spatialviewer/).
  Server-side ArcGIS queries use the fixed service root
  `https://mapprod3.environment.nsw.gov.au/arcgis/rest/services/ePlanning`.
- Background map: [NSW Spatial Services base map](https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_Base_Map/MapServer).
  Its `export` endpoint was verified to return PNG data using a longitude/
  latitude bounding box, `bboxSR=4326` and `imageSR=4326`. An export can adjust
  the extent to match the requested image aspect ratio; display geometry must
  use a matching extent and aspect ratio. It is not a cadastral survey.

All layer IDs and relevant attribute names below were checked against the live
ArcGIS layer metadata. Layer names are prefixed `Planning_Portal_`:

| Service | Layer | Data |
| --- | ---: | --- |
| Administration | 3 | Lot polygons, lot number and deposited/strata plan label |
| Administration | 5 | Council/LGA |
| Principal_Planning | 8 | LEP name and legislative reference |
| Principal_Planning | 19 | Zoning code/class and instrument |
| Principal_Planning | 14 | Height, units, qualified areas and legislative reference |
| Principal_Planning | 11 | FSR and legislative reference |
| Principal_Planning | 16 | LEP heritage name, identifier and significance |
| Principal_Planning | 221 | State heritage curtilage: ITEMNAME, LISTING and LISTINGNO |
| Hazard | 229 | Bushfire-prone land categories |
| Hazard | 230 | Flood planning map |
| Development_Control | 220 | LGA-based DCP document index |
| Protection | 234 | Acid sulfate soils |
| Protection | 243 | Terrestrial biodiversity |

Map data attribution: **NSW Crown Copyright – Department of Planning and
Environment**. Background map attribution: **NSW Spatial Services**. The
Planning Portal's terms and individual data-source conditions apply; an
official source does not establish that a map is a certified legal control or
that a particular development is permitted.

## Spatial and control semantics

An address point selects intersecting official lot polygons. Every planning
layer is then queried against the complete returned parcel geometry using
`esriSpatialRelIntersects`. There is no address-point fallback that could miss
an overlay at the edge of a property. Multiple intersecting parcels are kept
separate. These may include adjoining lots or strata/vertical interests;
users must confirm the actual site with a survey/title professional. Unknown,
oversized, unclosed or malformed boundaries disable spatial comparisons.

- `available`: an official mapped record was returned. It is not confirmation
  that its provisions are applicable, current or sufficient for this proposal.
- `not-mapped`: a complete query returned no intersecting record in this
  layer. This does not mean that a property has no constraint or risk.
- `unavailable`: the source failed, timed out, returned an incomplete or
  malformed result, or no usable parcel was available. It never counts as clear.
- `requires-assessment`: the topic needs additional information and qualified
  assessment; no automatic eligibility or compliance conclusion is made.

`retrievedAt` records the lookup time, not the date of the statutory instrument
or a guarantee of dataset currency. The source link is retained on each result.
Confirm the current instrument, amendments, applicable provisions and a current
section 10.7 planning certificate. The checked layers are not an exhaustive list
of overlays, easements, airport constraints, contamination or other restrictions.

The numeric height value is supplied only when every intersecting mapped value
is the same positive number, expressed in metres and not qualified by a mapped
area reference. Conflicting, textual, relative-level and qualified records are
shown for review without a numeric result. FSR follows the same unambiguous
numeric/area-reference gate. Comparing concept dimensions with those numbers
is only screening: actual height requires surveyed existing ground levels and
roof design; statutory GFA requires exclusions, definitions and complete plans.
Manual dimensions/limits are assumptions and never become verified controls.

The DCP layer is a document index over an LGA. Live results include historical
plans and unrelated development chapters. Complete document URLs are offered
only when they are HTTPS government URLs; third-party archived PDFs are not
promoted as current council rules. The City of Sydney lookup also links to
[council's instrument guide](https://www.cityofsydney.nsw.gov.au/local-environmental-plans)
and [Sydney DCP 2012](https://www.cityofsydney.nsw.gov.au/development-control-plans/sydney-dcp-2012).
These references are limited to the identified council. Controls are not copied
to other Sydney councils or treated as universally applicable.

## Approval and building assessments

- [Codes SEPP 2008, current legislation](https://legislation.nsw.gov.au/view/html/inforce/current/epi-2008-0572):
  Housing Code, alterations/additions and other codes depend on development
  type, exclusions, lot conditions and all applicable standards. Automated
  access to this current-law page encountered the publisher's security check
  during research. No unverified provisions were encoded from an older copy.
- [NSW exempt development guidance](https://www.planning.nsw.gov.au/the-planning-system/development-assessment/planning-approval-pathways/exempt-development)
  and [complying development guidance](https://www.planning.nsw.gov.au/the-planning-system/development-assessment/planning-approval-pathways/complying-development):
  no automatic exempt, complying-development or DA eligibility decision is made.
  The latter was read live on 27 October 2026 and identifies council or an
  accredited certifier as the assessing party. Proposed policy changes do not
  become active rules in this builder.
- [BASIX](https://www.planningportal.nsw.gov.au/development-and-assessment/basix):
  the official assessment covers water, energy and thermal performance. The
  studio cannot issue a BASIX certificate or infer a result from room dimensions.
- [NatHERS](https://www.nathers.gov.au/): obtain appropriate accredited thermal
  and Whole of Home assessment using actual construction and services details.
  No energy/star rating is generated here.
- [NCC in NSW](https://www.nsw.gov.au/housing-and-construction/compliance-and-regulation/how-to-comply-national-construction-code):
  the applicable edition, NSW variations and project-specific performance
  requirements require professional assessment. No certificate or whole-NCC
  pass is generated. Dates and applicable editions must be checked at lodgement.

Setbacks, site coverage, landscaping, privacy, solar access, drainage, structure,
fire safety and other DCP/NCC details remain unassessed where the proposal and
site do not provide the information required. Council/certifier approval where
required must precede construction. Downloaded concepts retain these limits.

## API safeguards and operations

The endpoints accept bounded GET parameters and use fixed upstream hosts.
Requests have 12-second upstream timeouts, reject redirects, cap JSON responses
at 2 MB, bound feature/geometry counts, and reject exceeded transfer limits.
No caller-supplied URL or raw upstream error is returned. Address/coordinate
responses are `private, no-store`. Browser users must be informed that their
search is sent to NSW services. Do not use personal/client addresses in QA.

Per-instance protection allows at most six active lookup requests and 20
requests per connection per minute, with a bounded 1,000-key store. It prefers
Vercel's forwarded connection header. This is not a distributed quota. Before
large public traffic, configure a shared Vercel firewall rule or equivalent
quota for `/api/planning/*`; independent serverless instances do not share the
in-memory limit. Monitor official-service availability and policy changes.

## Verification evidence

Live service verification on 27 October 2026 used the publicly documented
example address **320 Pitt Street, Sydney 2000**. It returned multiple explicit
candidates including 310–322 Pitt Street, council Sydney and property 2939585.
Selecting that candidate returned lot **4 / DP1044304**, City of Sydney, Sydney
LEP 2012, SP5 Metropolitan Centre, mapped height 235 m, FSR 8:1 and local heritage
item I1704. These are integration-test observations for that city-centre example,
not assumptions for a residential home. Repeated live lookups exposed intermittent
official-service failures: bushfire, FSR and the parcel service each failed or
timed out in different runs and correctly remained unavailable. No-parcel runs
disabled all map comparisons. Flood returned no mapped intersection
and retained the warning that this does not establish absence of flood risk.

`node --test tests/planning.test.js` covers numeric ambiguity, unsafe/truncated
document links, address candidate filtering, malformed/oversized provider
responses, no-parcel failure, polygon-only overlay queries, incomplete results,
invalid boundaries, API validation, rate limiting and reservation cleanup.
These tests use controlled fixtures, not live personal-property searches.
