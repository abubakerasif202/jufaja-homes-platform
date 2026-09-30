const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\abuba';
const projectDir = 'C:\\Users\\abuba\\jufaja-homes-platform';
const dataDir = path.join(projectDir, 'src', 'data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 1. Process Designs
const rawDesigns = JSON.parse(fs.readFileSync(path.join(rootDir, 'casaview-home-designs.json'), 'utf8'));

const dwellingTypeMap = {
  'Single Storey Homes': 'single',
  'Double Storey Homes': 'double',
  'Duplexes': 'duplex',
  'Integrated Granny Flats': 'granny',
  'Rural Homes': 'rural'
};

const facadeLibrary = [
  { name: 'Contemporary Hamptons', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Executive Modernist', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Coastal Scandi', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Urban Brick Elite', image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Acreage Manor', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80' }
];

const processedDesigns = rawDesigns.map((d, index) => {
  const slug = d.design_name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');
  const dType = dwellingTypeMap[d.category] || 'single';
  const sq = d.floor_size_sq;
  const sqm = Math.round(sq * 9.2903 * 10) / 10;
  const minWidth = dType === 'single' ? (sq > 22 ? 13.5 : 11.5) : (sq > 32 ? 14.0 : 12.5);

  const facades = [
    facadeLibrary[index % facadeLibrary.length],
    facadeLibrary[(index + 1) % facadeLibrary.length],
  ];

  const floorplans = [];
  if (dType === 'double') {
    floorplans.push({
      level: 'Ground Floor',
      image: 'https://casaview.com.au/media/pages/designs/delta-series/998147837-1750051168/delta-36-high-res-001-600x400.jpg',
      dimensions: {
        livingAreaSqm: Math.round(sqm * 0.52 * 10) / 10,
        garageSqm: d.garages === 2 ? 36.5 : 20.2,
        alfrescoSqm: 18.4,
        porchSqm: 4.8,
        totalSqm: Math.round(sqm * 0.52 * 10) / 10 + (d.garages === 2 ? 36.5 : 20.2) + 23.2
      }
    });
    floorplans.push({
      level: 'First Floor',
      image: 'https://casaview.com.au/media/pages/designs/delta-series/3522714527-1750051168/delta-35-high-res-001-600x400.jpg',
      dimensions: {
        livingAreaSqm: Math.round(sqm * 0.48 * 10) / 10,
        garageSqm: 0,
        totalSqm: Math.round(sqm * 0.48 * 10) / 10
      }
    });
  } else {
    floorplans.push({
      level: 'Ground Floor',
      image: 'https://casaview.com.au/media/pages/designs/delta-series/2740366205-1757044933/delta-32-high-res-001-600x400.jpg',
      dimensions: {
        livingAreaSqm: Math.round((sqm - (d.garages === 2 ? 36.5 : 20.2) - 15) * 10) / 10,
        garageSqm: d.garages === 2 ? 36.5 : 20.2,
        alfrescoSqm: 15.0,
        porchSqm: 4.5,
        totalSqm: sqm
      }
    });
  }

  return {
    id: slug,
    slug: slug,
    name: d.design_name,
    series: d.design_name.replace(' Series', ''),
    dwellingType: dType,
    bedrooms: d.bedrooms,
    bathrooms: d.bathrooms,
    garages: d.garages,
    houseSizeSquares: sq,
    houseSizeSqm: sqm,
    minLotWidth: minWidth,
    description: `The ${d.design_name} exemplifies considered modern residential architecture by JUFAJA Homes. Expertly proportioned for contemporary family living, it features open-plan entertaining zones, expansive private quarters, and seamless indoor-outdoor alfresco connectivity.`,
    features: [
      'Master suite with private ensuite & walk-in dressing robe',
      'Designer open-plan kitchen with walk-in butler pantry',
      'Covered outdoor entertaining alfresco with recessed ceiling',
      'Dual-zone ducted reverse cycle air conditioning',
      'Engineered reinforced concrete slab foundation',
      'Energy efficient 7-star Basix thermal performance'
    ],
    facades: facades,
    floorplans: floorplans,
    virtualTourUrl: d.virtual_tour_url,
    featured: index < 6,
    priceGuideFrom: Math.round((sq * 11500 + 120000) / 1000) * 1000
  };
});

fs.writeFileSync(path.join(dataDir, 'designs.json'), JSON.stringify(processedDesigns, null, 2), 'utf8');
console.log(`Saved ${processedDesigns.length} designs to designs.json`);

// 2. Process Packages
const rawPackages = JSON.parse(fs.readFileSync(path.join(rootDir, 'house_and_land_packages.json'), 'utf8'));

const sydneySuburbs = ['Austral', 'Cobbitty', 'Tahmoor', 'Leppington', 'Gilead', 'Wilton', 'Box Hill', 'Gables'];

const processedPackages = rawPackages.slice(0, 16).map((p, idx) => {
  const suburb = sydneySuburbs[idx % sydneySuburbs.length];
  const slug = `lot-${100 + idx}-${suburb.toLowerCase()}`;
  return {
    id: slug,
    slug: slug,
    title: `Lot ${100 + idx} ${p.addressLine1 || 'Heritage Way'}`,
    packageType: idx % 4 === 0 ? 'ready_built' : 'house_and_land',
    suburb: suburb,
    estate: `${suburb} Release Estate`,
    designName: p.houseName || 'Kingston Executive',
    price: p.numericPrice || 985000,
    lotSizeSqm: p.numericBlockSize || 450,
    bedrooms: parseInt(p.bed) || 4,
    bathrooms: parseInt(p.bath) || 2,
    garages: parseInt(p.car) || 2,
    status: idx === 1 ? 'Under Contract' : (idx === 3 ? 'Deposit Taken' : 'Available'),
    facadeImage: facadeLibrary[idx % facadeLibrary.length].image,
    fixedSiteCosts: true,
    keyInclusions: [
      'Fixed Site Costs & Basix Commitments',
      '20mm Caesarstone kitchen benchtops',
      '900mm European stainless steel appliances',
      'Actron ducted air conditioning',
      'Complete flooring: hybrid timber & premium carpet',
      'Driveway, turf, letterbox & perimeter fencing'
    ],
    description: `Exceptional turnkey house and land package in ${suburb}. Designed and constructed by JUFAJA Homes with 100% fixed site costs, premium turnkey inclusions, and guaranteed completion timeline.`
  };
});

fs.writeFileSync(path.join(dataDir, 'packages.json'), JSON.stringify(processedPackages, null, 2), 'utf8');
console.log(`Saved ${processedPackages.length} packages to packages.json`);

// 3. Display Homes
const displayHomes = [
  {
    id: 'homeworld-box-hill',
    name: 'Box Hill &bull; Homeworld',
    estateOrHub: 'Homeworld Box Hill',
    address: '14 Fontana Drive',
    suburb: 'Box Hill',
    postcode: '2765',
    phone: '(02) 8783 8800',
    openingDays: 'Open 7 Days',
    openingHours: '10:00am - 5:00pm',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    designsOnDisplay: ['Kingston 28 Series', 'Delta 36 Series'],
    mapEmbedUrl: 'https://maps.google.com/?q=Homeworld+Box+Hill'
  },
  {
    id: 'homeworld-leppington',
    name: 'Leppington &bull; Homeworld',
    estateOrHub: 'Homeworld Leppington',
    address: '22 Arbour Avenue',
    suburb: 'Leppington',
    postcode: '2179',
    phone: '(02) 8783 8800',
    openingDays: 'Open 7 Days',
    openingHours: '10:00am - 5:00pm',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    designsOnDisplay: ['Verona 35 Series', 'Majestic 26 Series'],
    mapEmbedUrl: 'https://maps.google.com/?q=Homeworld+Leppington'
  },
  {
    id: 'oxley-ridge-cobbitty',
    name: 'Cobbitty &bull; Oxley Ridge',
    estateOrHub: 'Oxley Ridge Estate',
    address: '8 Horizon Circuit',
    suburb: 'Cobbitty',
    postcode: '2570',
    phone: '(02) 8783 8800',
    openingDays: 'Open Thursday to Monday',
    openingHours: '10:00am - 4:30pm',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    designsOnDisplay: ['Oxley 26 Series'],
    mapEmbedUrl: 'https://maps.google.com/?q=Oxley+Ridge+Cobbitty'
  },
  {
    id: 'prestons-head-office',
    name: 'Prestons &bull; Head Office & Selection Studio',
    estateOrHub: 'JUFAJA Head Office',
    address: '1 Avalli Road',
    suburb: 'Prestons',
    postcode: '2170',
    phone: '(02) 8783 8800',
    openingDays: 'Monday to Friday',
    openingHours: '8:30am - 5:00pm',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    designsOnDisplay: ['JUFAJA Select Colour Studio', 'Architectural Consultation Hub'],
    mapEmbedUrl: 'https://maps.google.com/?q=1+Avalli+Road+Prestons+NSW'
  }
];

fs.writeFileSync(path.join(dataDir, 'display-homes.json'), JSON.stringify(displayHomes, null, 2), 'utf8');
console.log(`Saved ${displayHomes.length} display homes to display-homes.json`);

// 4. Inclusions
const inclusions = [
  {
    category: 'Kitchen & Culinary',
    items: [
      { name: 'Kitchen Benchtops', standard: '20mm Caesarstone engineered stone with pencil round edge', luxuryUpgrade: '40mm Calacatta waterfall edge island bench' },
      { name: 'Oven & Cooktop', standard: '900mm Westinghouse European stainless steel 5-burner gas cooktop & oven', luxuryUpgrade: '900mm Smeg Dolce Stil Novo pyrolytic oven & induction' },
      { name: 'Rangehood', standard: '900mm concealed undermount high-airflow rangehood', luxuryUpgrade: 'Commercial-grade integrated glass canopy rangehood' },
      { name: 'Cabinetry & Hardware', standard: 'Polytec soft-close drawers and cupboards throughout', luxuryUpgrade: 'Finger-pull handleless overheads with warm LED strip illumination' },
      { name: 'Sink & Tapware', standard: 'Undermount double bowl stainless steel sink with pull-out mixer', luxuryUpgrade: 'Brushed brass or matte black Franke granite sink and pull-out spout' }
    ]
  },
  {
    category: 'Bathrooms & Ensuite',
    items: [
      { name: 'Wall Tiling', standard: 'Full height ceramic tiling to shower recess and 2m to bath', luxuryUpgrade: 'Floor-to-ceiling rectified porcelain 600x1200 tiles throughout' },
      { name: 'Vanities', standard: 'Floating wall-hung vanity with 20mm stone top and soft-close drawers', luxuryUpgrade: 'Custom timber veneer curved vanity with recessed LED mirror cabinets' },
      { name: 'Shower Screens', standard: 'Semi-frameless safety glass with polished chrome pivot door', luxuryUpgrade: 'Frameless 10mm glass with custom minimalist brass clips' },
      { name: 'Bathtub', standard: '1600mm freestanding white acrylic designer bathtub', luxuryUpgrade: '1700mm fluted luxury stone composite bathtub' }
    ]
  },
  {
    category: 'Structural, Frame & Foundation',
    items: [
      { name: 'Concrete Slab', standard: 'Engineered M or H1 class steel-reinforced concrete slab to AS2870', luxuryUpgrade: 'Engineered piering allowance with anti-termite collar barriers' },
      { name: 'Framing & Trusses', standard: 'T2 / H2 treated blue pine termite-resistant structural timber frame', luxuryUpgrade: 'Bluescope Truecore steel frame with 50-year structural warranty' },
      { name: 'Ceiling Heights', standard: '2600mm (8ft 6in) high ceilings to ground floor', luxuryUpgrade: '2740mm (9ft) ground floor + 2600mm first floor ceilings' },
      { name: 'Roofing', standard: 'Monier concrete roof tiles or Colorbond custom orb steel roofing', luxuryUpgrade: 'Terracotta flat profile designer tiles with heavy-duty sarking' }
    ]
  },
  {
    category: 'Electrical, Lighting & Comfort',
    items: [
      { name: 'Air Conditioning', standard: 'Actron dual-zone ducted reverse cycle inverter system', luxuryUpgrade: 'Actron Neo Smart 8-zone touchscreen Wi-Fi climate system' },
      { name: 'Downlights', standard: '30x warm white LED slimline recessed downlights package', luxuryUpgrade: 'Complete home architectural dimmable LED downlights package' },
      { name: 'Power & Data', standard: 'Double powerpoints to all rooms, dual USB points to kitchen & master', luxuryUpgrade: 'Smart Clipsal Wiser automated switches and Cat6 data hub' }
    ]
  },
  {
    category: 'Flooring & Paintwork',
    items: [
      { name: 'Main Living Flooring', standard: 'Choice of 600x600 porcelain tiles or timber-look hybrid planks', luxuryUpgrade: 'Engineered European Oak 190mm wide timber flooring' },
      { name: 'Bedrooms Flooring', standard: 'Premium cut-pile nylon carpet with 10mm foam underlay', luxuryUpgrade: '100% New Zealand pure wool plush carpet' },
      { name: 'Paint System', standard: 'Taubmans 3-coat premium washable low-VOC acrylic paint system', luxuryUpgrade: 'Dulux Wash&Wear with feature wall colour consult' }
    ]
  }
];

fs.writeFileSync(path.join(dataDir, 'inclusions.json'), JSON.stringify(inclusions, null, 2), 'utf8');
console.log(`Saved ${inclusions.length} inclusion categories to inclusions.json`);
