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
  /** Exact-address-matched public photography URLs, supplied for authorised portfolio use. */
  photos?: string[];
  photoCredit?: string;
  photoNote?: string;
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
    "listedPhotos": 6,
    "photos": [
      "https://i2.au.reastatic.net/1200x630-format=jpg/40e5bd43ebd8692a07126800835fa1d6606b680b3c2696e145f5857616030ad4/main.jpg"
    ],
    "photoCredit": "Property.com.au"
  },
  {
    "street": "30 Westview Street",
    "suburb": "Campbelltown",
    "postcode": "2560",
    "sourceUrl": "https://www.domain.com.au/property-profile/30-westview-street-campbelltown-nsw-2560",
    "photos": [
      "https://rimh2.domainstatic.com.au/VkJVOL8CYYaClPV9rtNCCg7k7Zc=/filters:format(png):quality(80):no_upscale()/2016109265_1_1_200226_052112-w3012-h2466"
    ],
    "photoCredit": "Domain (historical listing image)",
    "photoNote": "Historical listing photograph. Appearance may differ from the current property."
  },
  {
    "street": "32 Ganugan Road",
    "suburb": "Austral",
    "postcode": "2179",
    "sourceUrl": "https://www.allhomes.com.au/32-ganugan-road-austral-nsw-2179",
    "photos": [
      "https://images.allhomes.com.au/property/photo/fd5967067bc34c16cd3da82f76bf271b_hd.jpg",
      "https://images.allhomes.com.au/property/photo/0eb3759776dcab6ff68b22c12d3ba3f9_hd.jpg"
    ],
    "photoCredit": "Allhomes property profile",
    "photoNote": "Exact-address profile photographs. Image age and current facade have not been independently verified."
  },
  {
    "street": "34 Horatio Street",
    "suburb": "Rosemeadow",
    "postcode": "2560",
    "sourceUrl": "https://www.raywhite.com/nsw/rosemeadow/1522948",
    "photos": [
      "https://cdn6.ep.dynamics.net/s3/rw-media/propertyphotos/2016/8/29/H1327-hires.29537-DSC2726.jpg?width=1200&quality=85",
      "https://cdn6.ep.dynamics.net/s3/rw-media/propertyphotos/2016/8/29/H1327-hires.17740-DSC2701.jpg?width=1200&quality=85",
      "https://cdn6.ep.dynamics.net/s3/rw-media/propertyphotos/2016/8/29/H1327-hires.32290-DSC2702.jpg?width=1200&quality=85",
      "https://cdn6.ep.dynamics.net/s3/rw-media/propertyphotos/2016/8/29/H1327-hires.18015-DSC2705.jpg?width=1200&quality=85",
      "https://cdn6.ep.dynamics.net/s3/rw-media/propertyphotos/2016/8/29/H1327-hires.11749-DSC2708.jpg?width=1200&quality=85",
      "https://cdn6.ep.dynamics.net/s3/rw-media/propertyphotos/2016/8/29/H1327-hires.19762-DSC2709.jpg?width=1200&quality=85",
      "https://cdn6.ep.dynamics.net/s3/rw-media/propertyphotos/2016/8/29/H1327-hires.12010-DSC2714.jpg?width=1200&quality=85",
      "https://cdn6.ep.dynamics.net/s3/rw-media/propertyphotos/2016/8/29/H1327-hires.29074-DSC2716.jpg?width=1200&quality=85",
      "https://cdn6.ep.dynamics.net/s3/rw-media/propertyphotos/2016/8/29/H1327-hires.32554-DSC2719.jpg?width=1200&quality=85",
      "https://cdn6.ep.dynamics.net/s3/rw-media/propertyphotos/2016/8/29/H1327-hires.12537-DSC2720.jpg?width=1200&quality=85"
    ],
    "photoCredit": "Ray White (2016 historical listing)",
    "photoNote": "Historical listing photographs from 2016; these do not document JUFAJA's subsequent building work."
  },
  {
    "street": "3 Lakeman Street",
    "suburb": "Leppington",
    "postcode": "2179",
    "sourceUrl": "https://www.realestate.com.au/property/3-lakeman-st-leppington-nsw-2179/",
    "photos": [
      "https://i2.au.reastatic.net/800x600/20535f6b5a42713a410e9af4cfd20d76e893848a24089559f1603a99df4fb6fa/main.jpg"
    ],
    "photoCredit": "realestate.com.au property profile",
    "photoNote": "Property-profile photo. The original 2020 sale was vacant land; this image should not be treated as proof of construction stage."
  },
  {
    "street": "6 Burns Avenue",
    "suburb": "Macquarie Fields",
    "postcode": "2564",
    "sourceUrl": "https://www.domain.com.au/property-profile/6-burns-avenue-macquarie-fields-nsw-2564",
    "photos": [
      "https://rimh2.domainstatic.com.au/wq7wcdYjFcd8OlI9Sar8Smxn6fc=/filters:format(png):quality(80):no_upscale()/w800-h533-2009250978_1_pi_150304_073959"
    ],
    "photoCredit": "Domain historical property profile",
    "photoNote": "Historical property image. Do not use as evidence of the current condition or JUFAJA work."
  },
  {
    "street": "6 Blane Street",
    "suburb": "Minto",
    "postcode": "2566",
    "sourceUrl": "https://www.property.com.au/nsw/minto-2566/blane-st/6-pid-8528366/",
    "photos": [
      "https://i2.au.reastatic.net/1200x630-format=jpg/4fc335ea85e5c1cc0b3e58849fcec0048b275d7c8033987aebbe911be32848d2/main.jpg"
    ],
    "photoCredit": "Property.com.au"
  },
  {
    "street": "59 Fieldhouse Circuit",
    "suburb": "Campbelltown",
    "postcode": "2560",
    "sourceUrl": "https://www.property.com.au/nsw/campbelltown-2560/fieldhouse-cct/59-pid-20358385/",
    "listedPhotos": 4,
    "photos": [
      "https://i2.au.reastatic.net/1200x630-format=jpg/f9eb046e02cd268fce467833fd63f1ef33f41098dcc3cc4fcb5290678d9db26e/main.jpg"
    ],
    "photoCredit": "Property.com.au"
  },
  {
    "street": "59A Fieldhouse Circuit",
    "suburb": "Campbelltown",
    "postcode": "2560",
    "photos": [
      "https://website-static.ljhooker.com/images/10726/0003725368.JPG?r=0",
      "https://website-static.ljhooker.com/images/10726/0003725369.JPG?r=0",
      "https://website-static.ljhooker.com/images/10726/0003725370.JPG?r=0",
      "https://website-static.ljhooker.com/images/10726/0003725371.JPG?r=0",
      "https://website-static.ljhooker.com/images/10726/0003725372.JPG?r=0",
      "https://website-static.ljhooker.com/images/10726/0003725373.JPG?r=0",
      "https://website-static.ljhooker.com/images/10726/0003725374.JPG?r=0"
    ],
    "photoCredit": "LJ Hooker Ingleburn",
    "sourceUrl": "https://property.ljhooker.com.au/rental-campbelltown-nsw--59a-fieldhouse-circuit-c0hhg3",
    "photoNote": "Exact-address two-bedroom secondary dwelling rental gallery."
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
    "sourceUrl": "https://www.property.com.au/nsw/catherine-field-2557/wilenski-way/26-pid-21039303/",
    "listedPhotos": 34,
    "photos": [
      "https://i2.au.reastatic.net/1200x630-format=jpg/88f51a492c6bb967207c5886f4c3227106df22862ce5045d03bde5c3209f4a14/main.jpg"
    ],
    "photoCredit": "Property.com.au"
  },
  {
    "street": "28 Waterhouse Road",
    "suburb": "Bradbury",
    "postcode": "2560",
    "sourceUrl": "https://rwmg.com.au/properties/sold-residential/nsw/bradbury-2560/house/3369239",
    "listedPhotos": 14,
    "photos": [
      "https://cdn6.ep.dynamics.net/s3/rw-propertyimages/53ff-H3369239-160547081__1756083402-36848-28WaterhouseRoadBradbury-5.jpg?width=1200&quality=85",
      "https://cdn6.ep.dynamics.net/s3/rw-propertyimages/b55c-H3369239-160547006__1756083388-46297-28WaterhouseRoadBradbury.jpg?width=1200&quality=85",
      "https://cdn6.ep.dynamics.net/s3/rw-propertyimages/1879-H3369239-160547061__1756083396-46257-28WaterhouseRoadBradbury-3.jpg?width=1200&quality=85",
      "https://cdn6.ep.dynamics.net/s3/rw-propertyimages/ad1c-H3369239-160547071__1756083399-36726-28WaterhouseRoadBradbury-4.jpg?width=1200&quality=85",
      "https://cdn6.ep.dynamics.net/s3/rw-propertyimages/d678-H3369239-160547134__1756083405-46370-28WaterhouseRoadBradbury-6.jpg?width=1200&quality=85",
      "https://cdn6.ep.dynamics.net/s3/rw-propertyimages/c6fa-H3369239-160547148__1756083409-36780-28WaterhouseRoadBradbury-7.jpg?width=1200&quality=85",
      "https://cdn6.ep.dynamics.net/s3/rw-propertyimages/58cf-H3369239-160547158__1756083411-46478-28WaterhouseRoadBradbury-8.jpg?width=1200&quality=85",
      "https://cdn6.ep.dynamics.net/s3/rw-propertyimages/7ddb-H3369239-160547224__1756083414-46368-28WaterhouseRoadBradbury-9.jpg?width=1200&quality=85",
      "https://cdn6.ep.dynamics.net/s3/rw-propertyimages/4639-H3369239-160547236__1756083417-36807-28WaterhouseRoadBradbury-10.jpg?width=1200&quality=85",
      "https://cdn6.ep.dynamics.net/s3/rw-propertyimages/b35e-H3369239-160547293__1756083421-46304-28WaterhouseRoadBradbury-11.jpg?width=1200&quality=85"
    ],
    "photoCredit": "Ray White Macarthur Group"
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
    "sourceUrl": "https://property.ljhooker.com.au/rental-campbelltown-nsw--10-westview-street-fcehg3",
    "listedPhotos": 16,
    "photos": [
      "https://website-static.ljhooker.com/images/10726/0009391975.JPG?r=837201",
      "https://website-static.ljhooker.com/images/10726/0009391976.JPG?r=885542",
      "https://website-static.ljhooker.com/images/10726/0009391977.JPG?r=998191",
      "https://website-static.ljhooker.com/images/10726/0009391978.JPG?r=420414",
      "https://website-static.ljhooker.com/images/10726/0009391979.JPG?r=467087",
      "https://website-static.ljhooker.com/images/10726/0009391980.JPG?r=577093",
      "https://website-static.ljhooker.com/images/10726/0009391981.JPG?r=925986",
      "https://website-static.ljhooker.com/images/10726/0009391982.JPG?r=335447",
      "https://website-static.ljhooker.com/images/10726/0009391983.JPG?r=320584",
      "https://website-static.ljhooker.com/images/10726/0009391984.JPG?r=693367",
      "https://website-static.ljhooker.com/images/10726/0009391985.JPG?r=856691",
      "https://website-static.ljhooker.com/images/10726/0009391986.JPG?r=945870",
      "https://website-static.ljhooker.com/images/10726/0009391987.JPG?r=423977",
      "https://website-static.ljhooker.com/images/10726/0009391988.JPG?r=414589",
      "https://website-static.ljhooker.com/images/10726/0009391989.JPG?r=951627",
      "https://website-static.ljhooker.com/images/10726/0009391990.JPG?r=615997"
    ],
    "photoCredit": "LJ Hooker"
  },
  {
    "street": "7 Meeson Street",
    "suburb": "Claymore",
    "postcode": "2559",
    "sourceUrl": "https://www.property.com.au/nsw/claymore-2559/meeson-st/7-pid-20375741/",
    "listedPhotos": 11,
    "photos": [
      "https://i2.au.reastatic.net/1200x630-format=jpg/bfc0bfadee4db87a6d2a89366ecf5c2ffc48cc92a4695ede42f17dc598b4f4c0/main.jpg"
    ],
    "photoCredit": "Property.com.au"
  },
  {
    "street": "5 Meeson Street",
    "suburb": "Claymore",
    "postcode": "2559",
    "sourceUrl": "https://www.property.com.au/nsw/claymore-2559/meeson-st/5-pid-20376496/",
    "listedPhotos": 11,
    "photos": [
      "https://i2.au.reastatic.net/1200x630-format=jpg/48378d33391f7daa7104f7e6832ec857fcea8575e80e30aec71d22cbc33f23a2/main.jpg",
      "https://view.com.au/viewstatic/images/listing/5-meeson-street-claymore-nsw-2559/400-w/16559477-2-A2DFA41.jpg",
      "https://view.com.au/viewstatic/images/listing/5-meeson-street-claymore-nsw-2559/400-w/16559477-11-F273834.jpg",
      "https://view.com.au/viewstatic/images/listing/5-meeson-street-claymore-nsw-2559/400-w/16559477-3-964835A.jpg"
    ],
    "photoCredit": "Property.com.au / view.com.au"
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
    "listedPhotos": 8,
    "photos": [
      "https://i2.au.reastatic.net/800x600/62ff010d79c42dab26079d2a792d5946dfb43d006c90c63de3e9a89c82ea0e9d/image.png"
    ],
    "photoCredit": "Realestate.com.au"
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
