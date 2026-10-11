/** Owner-supplied address register, 11 Oct 2026.
 * Research sources are external references only; no third-party photos may be republished
 * without permission. Do not claim construction or completion based on a listing.
 */
export interface PropertyLocation {
  street: string;
  suburb: string;
  postcode: string;
  sourceUrl?: string;
  listedPhotos?: number;
  /** Locally hosted property photographs; source evidence is recorded in the provenance manifest. */
  photos?: string[];
  /** Architecturally representative design, not a photograph of this address. */
  fallbackImages?: string[];
  imageMode: 'real' | 'representative';
  displayNote?: 'Representative exterior';
  photoCredit?: string;
  photoNote?: string;
}
export const PROPERTY_LOCATIONS: PropertyLocation[] = [
  {
    "street": "5 Daintrees Street",
    "suburb": "Campbelltown",
    "postcode": "2560",
    "sourceUrl": "https://www.realestate.com.au/property/5-daintrees-st-campbelltown-nsw-2560/",
    "displayNote": "Representative exterior",
    "fallbackImages": [
      "/images/designs/blaxland-series.webp",
      "/images/designs/majestic-series.webp"
    ],
    "imageMode": "representative"
  },
  {
    "street": "18 Quondong Street",
    "suburb": "Campbelltown",
    "postcode": "2560",
    "sourceUrl": "https://www.realestate.com.au/property/18-quondong-st-campbelltown-nsw-2560/",
    "displayNote": "Representative exterior",
    "fallbackImages": [
      "/images/designs/kingston-series.webp",
      "/images/designs/oxley-26-series.webp"
    ],
    "imageMode": "representative"
  },
  {
    "street": "30A Westview Street",
    "suburb": "Campbelltown",
    "postcode": "2560",
    "sourceUrl": "https://www.property.com.au/nsw/campbelltown-2560/westview-st/30a-pid-20357559/",
    "listedPhotos": 6,
    "photos": [
      "/images/projects/30a-westview-street-campbelltown-01.webp"
    ],
    "photoCredit": "Property.com.au",
    "imageMode": "real"
  },
  {
    "street": "30 Westview Street",
    "suburb": "Campbelltown",
    "postcode": "2560",
    "sourceUrl": "https://www.domain.com.au/property-profile/30-westview-street-campbelltown-nsw-2560",
    "photos": [],
    "photoCredit": "Domain (historical listing image)",
    "photoNote": "Historical listing photograph. Appearance may differ from the current property.",
    "displayNote": "Representative exterior",
    "fallbackImages": [
      "/images/designs/hemsworth-series.webp",
      "/images/designs/eden-series.webp"
    ],
    "imageMode": "representative"
  },
  {
    "street": "32 Ganugan Road",
    "suburb": "Austral",
    "postcode": "2179",
    "sourceUrl": "https://www.allhomes.com.au/32-ganugan-road-austral-nsw-2179",
    "photos": [],
    "photoCredit": "Allhomes property profile",
    "photoNote": "Exact-address profile photographs. Image age and current facade have not been independently verified.",
    "displayNote": "Representative exterior",
    "fallbackImages": [
      "/images/designs/bennelong-series.webp",
      "/images/designs/montreal-series.webp"
    ],
    "imageMode": "representative"
  },
  {
    "street": "34 Horatio Street",
    "suburb": "Rosemeadow",
    "postcode": "2560",
    "sourceUrl": "https://www.raywhite.com/nsw/rosemeadow/1522948",
    "photos": [
      "/images/projects/34-horatio-street-rosemeadow-01.webp",
      "/images/projects/34-horatio-street-rosemeadow-02.webp",
      "/images/projects/34-horatio-street-rosemeadow-03.webp",
      "/images/projects/34-horatio-street-rosemeadow-04.webp",
      "/images/projects/34-horatio-street-rosemeadow-05.webp",
      "/images/projects/34-horatio-street-rosemeadow-06.webp",
      "/images/projects/34-horatio-street-rosemeadow-07.webp",
      "/images/projects/34-horatio-street-rosemeadow-08.webp",
      "/images/projects/34-horatio-street-rosemeadow-09.webp",
      "/images/projects/34-horatio-street-rosemeadow-10.webp"
    ],
    "photoCredit": "Ray White (2016 historical listing)",
    "photoNote": "Historical listing photographs from 2016; these do not document JUFAJA's subsequent building work.",
    "imageMode": "real"
  },
  {
    "street": "3 Lakeman Street",
    "suburb": "Leppington",
    "postcode": "2179",
    "sourceUrl": "https://www.realestate.com.au/property/3-lakeman-st-leppington-nsw-2179/",
    "photos": [],
    "photoCredit": "realestate.com.au property profile",
    "photoNote": "Property-profile photo. The original 2020 sale was vacant land; this image should not be treated as proof of construction stage.",
    "displayNote": "Representative exterior",
    "fallbackImages": [
      "/images/designs/oxley-series.webp",
      "/images/designs/patterson-series.webp"
    ],
    "imageMode": "representative"
  },
  {
    "street": "6 Burns Avenue",
    "suburb": "Macquarie Fields",
    "postcode": "2564",
    "sourceUrl": "https://www.domain.com.au/property-profile/6-burns-avenue-macquarie-fields-nsw-2564",
    "photos": [],
    "photoCredit": "Domain historical property profile",
    "photoNote": "Historical property image. Do not use as evidence of the current condition or JUFAJA work.",
    "displayNote": "Representative exterior",
    "fallbackImages": [
      "/images/designs/hastings-series.webp",
      "/images/designs/riley-series.webp"
    ],
    "imageMode": "representative"
  },
  {
    "street": "6 Blane Street",
    "suburb": "Minto",
    "postcode": "2566",
    "sourceUrl": "https://www.property.com.au/nsw/minto-2566/blane-st/6-pid-8528366/",
    "photos": [
      "/images/projects/6-blane-street-minto-01.webp"
    ],
    "photoCredit": "Property.com.au",
    "imageMode": "real"
  },
  {
    "street": "59 Fieldhouse Circuit",
    "suburb": "Campbelltown",
    "postcode": "2560",
    "sourceUrl": "https://www.property.com.au/nsw/campbelltown-2560/fieldhouse-cct/59-pid-20358385/",
    "listedPhotos": 4,
    "photos": [
      "/images/projects/59-fieldhouse-circuit-campbelltown-01.webp"
    ],
    "photoCredit": "Property.com.au",
    "imageMode": "real"
  },
  {
    "street": "59A Fieldhouse Circuit",
    "suburb": "Campbelltown",
    "postcode": "2560",
    "photos": [
      "/images/projects/59a-fieldhouse-circuit-campbelltown-06.webp",
      "/images/projects/59a-fieldhouse-circuit-campbelltown-01.webp",
      "/images/projects/59a-fieldhouse-circuit-campbelltown-02.webp",
      "/images/projects/59a-fieldhouse-circuit-campbelltown-03.webp",
      "/images/projects/59a-fieldhouse-circuit-campbelltown-04.webp",
      "/images/projects/59a-fieldhouse-circuit-campbelltown-05.webp",
      "/images/projects/59a-fieldhouse-circuit-campbelltown-07.webp"
    ],
    "photoCredit": "LJ Hooker Ingleburn",
    "sourceUrl": "https://property.ljhooker.com.au/rental-campbelltown-nsw--59a-fieldhouse-circuit-c0hhg3",
    "photoNote": "Exact-address two-bedroom secondary dwelling rental gallery.",
    "imageMode": "real"
  },
  {
    "street": "5 Jandaroi Road",
    "suburb": "Austral",
    "postcode": "2179",
    "sourceUrl": "https://www.property.com.au/nsw/austral-2179/jandaroi-rd/5-pid-19805686/",
    "listedPhotos": 5,
    "displayNote": "Representative exterior",
    "fallbackImages": [
      "/images/designs/centennial-series.webp",
      "/images/designs/crawford-series.webp"
    ],
    "imageMode": "representative"
  },
  {
    "street": "110 Fieldhouse Circuit",
    "suburb": "Campbelltown",
    "postcode": "2560",
    "sourceUrl": "https://www.property.com.au/nsw/campbelltown-2560/fieldhouse-cct/110-pid-20358787/",
    "listedPhotos": 6,
    "displayNote": "Representative exterior",
    "fallbackImages": [
      "/images/designs/grange-series.webp",
      "/images/designs/denison-series.webp"
    ],
    "imageMode": "representative"
  },
  {
    "street": "47 Gleeson Rise",
    "suburb": "Oran Park",
    "postcode": "2570",
    "sourceUrl": "https://www.realestate.com.au/property/47-gleeson-rise-oran-park-nsw-2570/",
    "displayNote": "Representative exterior",
    "fallbackImages": [
      "/images/designs/urban-series.webp",
      "/images/designs/elwood-series.webp"
    ],
    "imageMode": "representative"
  },
  {
    "street": "26 Wilenski Way",
    "suburb": "Catherine Field",
    "postcode": "2557",
    "sourceUrl": "https://www.property.com.au/nsw/catherine-field-2557/wilenski-way/26-pid-21039303/",
    "listedPhotos": 34,
    "photos": [
      "/images/projects/26-wilenski-way-catherine-field-01.webp"
    ],
    "photoCredit": "Property.com.au",
    "imageMode": "real"
  },
  {
    "street": "28 Waterhouse Road",
    "suburb": "Bradbury",
    "postcode": "2560",
    "sourceUrl": "https://rwmg.com.au/properties/sold-residential/nsw/bradbury-2560/house/3369239",
    "listedPhotos": 14,
    "photos": [
      "/images/projects/28-waterhouse-road-bradbury-02.webp",
      "/images/projects/28-waterhouse-road-bradbury-01.webp",
      "/images/projects/28-waterhouse-road-bradbury-03.webp",
      "/images/projects/28-waterhouse-road-bradbury-04.webp",
      "/images/projects/28-waterhouse-road-bradbury-05.webp",
      "/images/projects/28-waterhouse-road-bradbury-06.webp",
      "/images/projects/28-waterhouse-road-bradbury-07.webp",
      "/images/projects/28-waterhouse-road-bradbury-08.webp",
      "/images/projects/28-waterhouse-road-bradbury-09.webp",
      "/images/projects/28-waterhouse-road-bradbury-10.webp"
    ],
    "photoCredit": "Ray White Macarthur Group",
    "imageMode": "real"
  },
  {
    "street": "10A Westview Street",
    "suburb": "Campbelltown",
    "postcode": "2560",
    "displayNote": "Representative exterior",
    "fallbackImages": [
      "/images/designs/lennox-series.webp",
      "/images/designs/lindsay-series.webp"
    ],
    "imageMode": "representative"
  },
  {
    "street": "10 Westview Street",
    "suburb": "Campbelltown",
    "postcode": "2560",
    "sourceUrl": "https://property.ljhooker.com.au/rental-campbelltown-nsw--10-westview-street-fcehg3",
    "listedPhotos": 16,
    "photos": [
      "/images/projects/10-westview-street-campbelltown-01.webp",
      "/images/projects/10-westview-street-campbelltown-02.webp",
      "/images/projects/10-westview-street-campbelltown-03.webp",
      "/images/projects/10-westview-street-campbelltown-04.webp",
      "/images/projects/10-westview-street-campbelltown-05.webp",
      "/images/projects/10-westview-street-campbelltown-06.webp",
      "/images/projects/10-westview-street-campbelltown-07.webp",
      "/images/projects/10-westview-street-campbelltown-08.webp",
      "/images/projects/10-westview-street-campbelltown-09.webp",
      "/images/projects/10-westview-street-campbelltown-10.webp",
      "/images/projects/10-westview-street-campbelltown-11.webp",
      "/images/projects/10-westview-street-campbelltown-12.webp",
      "/images/projects/10-westview-street-campbelltown-13.webp",
      "/images/projects/10-westview-street-campbelltown-14.webp",
      "/images/projects/10-westview-street-campbelltown-15.webp",
      "/images/projects/10-westview-street-campbelltown-16.webp"
    ],
    "photoCredit": "LJ Hooker",
    "imageMode": "real"
  },
  {
    "street": "7 Meeson Street",
    "suburb": "Claymore",
    "postcode": "2559",
    "sourceUrl": "https://www.property.com.au/nsw/claymore-2559/meeson-st/7-pid-20375741/",
    "listedPhotos": 11,
    "photos": [
      "/images/projects/7-meeson-street-claymore-01.webp"
    ],
    "photoCredit": "Property.com.au",
    "imageMode": "real"
  },
  {
    "street": "5 Meeson Street",
    "suburb": "Claymore",
    "postcode": "2559",
    "sourceUrl": "https://www.property.com.au/nsw/claymore-2559/meeson-st/5-pid-20376496/",
    "listedPhotos": 11,
    "photos": [
      "/images/projects/5-meeson-street-claymore-01.webp"
    ],
    "photoCredit": "Property.com.au / view.com.au",
    "imageMode": "real"
  },
  {
    "street": "30 Wilenski Way",
    "suburb": "Catherine Field",
    "postcode": "2557",
    "displayNote": "Representative exterior",
    "fallbackImages": [
      "/images/designs/delta-series.webp",
      "/images/designs/meadow-series.webp"
    ],
    "imageMode": "representative"
  },
  {
    "street": "32 Emperor Street",
    "suburb": "Leppington",
    "postcode": "2179",
    "displayNote": "Representative exterior",
    "fallbackImages": [
      "/images/designs/verona-series.webp",
      "/images/designs/atlantic-series.webp"
    ],
    "imageMode": "representative"
  },
  {
    "street": "130 Webber Circuit",
    "suburb": "Bardia",
    "postcode": "2565",
    "sourceUrl": "https://www.property.com.au/nsw/bardia-2565/webber-cct/130-pid-15177352/",
    "displayNote": "Representative exterior",
    "fallbackImages": [
      "/images/designs/elite-series.webp",
      "/images/designs/primavera-series.webp"
    ],
    "imageMode": "representative"
  },
  {
    "street": "18A Dallas Drive",
    "suburb": "Gilead",
    "postcode": "2560",
    "sourceUrl": "https://www.realestate.com.au/property-flat-nsw-gilead-445186016",
    "listedPhotos": 8,
    "photos": [
      "/images/projects/18a-dallas-drive-gilead-01.webp"
    ],
    "photoCredit": "Realestate.com.au",
    "imageMode": "real"
  },
  {
    "street": "18 Dallas Drive",
    "suburb": "Gilead",
    "postcode": "2560",
    "displayNote": "Representative exterior",
    "fallbackImages": [
      "/images/designs/stuart-series.webp",
      "/images/designs/rozelle-series.webp"
    ],
    "imageMode": "representative"
  },
  {
    "street": "112A Brassil Avenue",
    "suburb": "Claymore",
    "postcode": "2559",
    "displayNote": "Representative exterior",
    "fallbackImages": [
      "/images/designs/collins-series.webp",
      "/images/designs/chesterfield-series.webp"
    ],
    "imageMode": "representative"
  },
  {
    "street": "112 Brassil Avenue",
    "suburb": "Claymore",
    "postcode": "2559",
    "sourceUrl": "https://www.aussie.com.au/property/nsw/claymore-2559/112-brassil-avenue/",
    "displayNote": "Representative exterior",
    "fallbackImages": [
      "/images/designs/alpha-series.webp",
      "/images/designs/stellar-series.webp"
    ],
    "imageMode": "representative"
  },
  {
    "street": "110 Brassil Avenue",
    "suburb": "Claymore",
    "postcode": "2559",
    "sourceUrl": "https://www.aussie.com.au/property/nsw/claymore-2559/110-brassil-avenue/",
    "displayNote": "Representative exterior",
    "fallbackImages": [
      "/images/designs/glenbrook-series.webp",
      "/images/designs/crest-series.webp"
    ],
    "imageMode": "representative"
  }
];
export const propertyAddress = (location: PropertyLocation) =>
  `${location.street}, ${location.suburb} NSW ${location.postcode}`;
export const propertyImageSearchUrl = (location: PropertyLocation) =>
  `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(propertyAddress(location) + ' property')}`;
export const propertyMapUrl = (location: PropertyLocation) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(propertyAddress(location))}`;
