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
}
export const PROPERTY_LOCATIONS: PropertyLocation[] = [
  {
    "street": "5 Daintrees Street",
    "suburb": "Campbelltown",
    "postcode": "2560",
    "sourceUrl": "https://www.realestate.com.au/property/5-daintrees-st-campbelltown-nsw-2560/"
  },
  {
    "street": "18 Quondong Street",
    "suburb": "Campbelltown",
    "postcode": "2560",
    "sourceUrl": "https://www.realestate.com.au/property/18-quondong-st-campbelltown-nsw-2560/"
  },
  {
    "street": "30A Westview Street",
    "suburb": "Campbelltown",
    "postcode": "2560",
    "sourceUrl": "https://www.property.com.au/nsw/campbelltown-2560/westview-st/30a-pid-20357559/",
    "listedPhotos": 6
  },
  {
    "street": "30 Westview Street",
    "suburb": "Campbelltown",
    "postcode": "2560",
    "sourceUrl": "https://www.realestate.com.au/property/30-westview-st-campbelltown-nsw-2560/"
  },
  {
    "street": "32 Ganugan Road",
    "suburb": "Austral",
    "postcode": "2179",
    "sourceUrl": "https://www.realestate.com.au/property/32-ganugan-rd-austral-nsw-2179/"
  },
  {
    "street": "34 Horatio Street",
    "suburb": "Rosemeadow",
    "postcode": "2560",
    "sourceUrl": "https://www.raywhite.com/nsw/rosemeadow/1522948"
  },
  {
    "street": "3 Lakeman Street",
    "suburb": "Leppington",
    "postcode": "2179",
    "sourceUrl": "https://www.realestate.com.au/property/3-lakeman-st-leppington-nsw-2179/"
  },
  {
    "street": "6 Burns Avenue",
    "suburb": "Macquarie Fields",
    "postcode": "2564",
    "sourceUrl": "https://www.realestate.com.au/property/6-burns-ave-macquarie-fields-nsw-2564/"
  },
  {
    "street": "6 Blane Street",
    "suburb": "Minto",
    "postcode": "2566",
    "sourceUrl": "https://www.onthehouse.com.au/property/nsw/minto-2566/6-blane-st-minto-nsw-2566-4578216"
  },
  {
    "street": "59 Fieldhouse Circuit",
    "suburb": "Campbelltown",
    "postcode": "2560",
    "sourceUrl": "https://www.property.com.au/nsw/campbelltown-2560/fieldhouse-cct/59-pid-20358385/",
    "listedPhotos": 4
  },
  {
    "street": "59A Fieldhouse Circuit",
    "suburb": "Campbelltown",
    "postcode": "2560"
  },
  {
    "street": "5 Jandaroi Road",
    "suburb": "Austral",
    "postcode": "2179",
    "sourceUrl": "https://www.property.com.au/nsw/austral-2179/jandaroi-rd/5-pid-19805686/",
    "listedPhotos": 5
  },
  {
    "street": "110 Fieldhouse Circuit",
    "suburb": "Campbelltown",
    "postcode": "2560",
    "sourceUrl": "https://www.property.com.au/nsw/campbelltown-2560/fieldhouse-cct/110-pid-20358787/",
    "listedPhotos": 6
  },
  {
    "street": "47 Gleeson Rise",
    "suburb": "Oran Park",
    "postcode": "2570",
    "sourceUrl": "https://www.realestate.com.au/property/47-gleeson-rise-oran-park-nsw-2570/"
  },
  {
    "street": "26 Wilenski Way",
    "suburb": "Catherine Field",
    "postcode": "2557",
    "sourceUrl": "https://www.realestate.com.au/property-house-nsw-catherine%2Bfield-150806824",
    "listedPhotos": 34
  },
  {
    "street": "28 Waterhouse Road",
    "suburb": "Bradbury",
    "postcode": "2560",
    "sourceUrl": "https://www.realestate.com.au/property-house-nsw-bradbury-149066988",
    "listedPhotos": 14
  },
  {
    "street": "10A Westview Street",
    "suburb": "Campbelltown",
    "postcode": "2560"
  },
  {
    "street": "10 Westview Street",
    "suburb": "Campbelltown",
    "postcode": "2560",
    "sourceUrl": "https://www.realestate.com.au/property-house-nsw-campbelltown-443958556",
    "listedPhotos": 16
  },
  {
    "street": "7 Meeson Street",
    "suburb": "Claymore",
    "postcode": "2559",
    "sourceUrl": "https://www.property.com.au/nsw/claymore-2559/meeson-st/7-pid-20375741/",
    "listedPhotos": 11
  },
  {
    "street": "5 Meeson Street",
    "suburb": "Claymore",
    "postcode": "2559",
    "sourceUrl": "https://www.property.com.au/nsw/claymore-2559/meeson-st/5-pid-20376496/",
    "listedPhotos": 11
  },
  {
    "street": "30 Wilenski Way",
    "suburb": "Catherine Field",
    "postcode": "2557"
  },
  {
    "street": "32 Emperor Street",
    "suburb": "Leppington",
    "postcode": "2179"
  },
  {
    "street": "130 Webber Circuit",
    "suburb": "Bardia",
    "postcode": "2565",
    "sourceUrl": "https://www.property.com.au/nsw/bardia-2565/webber-cct/130-pid-15177352/"
  },
  {
    "street": "18A Dallas Drive",
    "suburb": "Gilead",
    "postcode": "2560",
    "sourceUrl": "https://www.realestate.com.au/property-flat-nsw-gilead-445186016",
    "listedPhotos": 8
  },
  {
    "street": "18 Dallas Drive",
    "suburb": "Gilead",
    "postcode": "2560"
  },
  {
    "street": "112A Brassil Avenue",
    "suburb": "Claymore",
    "postcode": "2559"
  },
  {
    "street": "112 Brassil Avenue",
    "suburb": "Claymore",
    "postcode": "2559",
    "sourceUrl": "https://www.aussie.com.au/property/nsw/claymore-2559/112-brassil-avenue/"
  },
  {
    "street": "110 Brassil Avenue",
    "suburb": "Claymore",
    "postcode": "2559",
    "sourceUrl": "https://www.aussie.com.au/property/nsw/claymore-2559/110-brassil-avenue/"
  }
];
export const propertyAddress = (location: PropertyLocation) =>
  `${location.street}, ${location.suburb} NSW ${location.postcode}`;
export const propertyImageSearchUrl = (location: PropertyLocation) =>
  `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(propertyAddress(location) + ' property')}`;
export const propertyMapUrl = (location: PropertyLocation) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(propertyAddress(location))}`;
