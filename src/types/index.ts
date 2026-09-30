export type DwellingType = 'single' | 'double' | 'duplex' | 'granny' | 'rural';

export interface FacadeOption {
  name: string;
  image: string;
}

export interface FloorplanDimension {
  livingAreaSqm: number;
  garageSqm: number;
  alfrescoSqm?: number;
  porchSqm?: number;
  totalSqm: number;
}

export interface FloorplanLevel {
  level: string; // "Ground Floor", "First Floor", "Alfresco Option"
  image: string;
  dimensions: FloorplanDimension;
}

export interface HomeDesign {
  id: string;
  slug: string;
  name: string;
  series: string;
  dwellingType: DwellingType;
  bedrooms: number;
  bathrooms: number;
  garages: number;
  houseSizeSquares: number;
  houseSizeSqm: number;
  minLotWidth: number;
  minLotLength?: number;
  description: string;
  features: string[];
  facades: FacadeOption[];
  floorplans: FloorplanLevel[];
  virtualTourUrl: string | null;
  featured: boolean;
  priceGuideFrom?: number;
}

export type PackageType = 'house_and_land' | 'ready_built';
export type PackageStatus = 'Available' | 'Under Contract' | 'Deposit Taken' | 'Ready Soon';

export interface PackageListing {
  id: string;
  slug: string;
  title: string;
  packageType: PackageType;
  suburb: string;
  estate?: string;
  designName: string;
  price: number;
  lotSizeSqm: number;
  bedrooms: number;
  bathrooms: number;
  garages: number;
  status: PackageStatus;
  facadeImage: string;
  fixedSiteCosts: boolean;
  keyInclusions: string[];
  description: string;
}

export interface DisplayHome {
  id: string;
  name: string;
  estateOrHub: string;
  address: string;
  suburb: string;
  postcode: string;
  phone: string;
  openingDays: string;
  openingHours: string;
  image: string;
  designsOnDisplay: string[];
  mapEmbedUrl?: string;
}

export interface InclusionItem {
  name: string;
  standard: string;
  luxuryUpgrade?: string;
}

export interface InclusionCategory {
  category: string;
  items: InclusionItem[];
}

export interface LeadEnquiry {
  fullName: string;
  email: string;
  phone: string;
  preferredContact: 'phone' | 'email';
  interestType: 'New Build' | 'Knock Down Rebuild' | 'House & Land' | 'Custom Design' | 'General';
  targetDesignSlug?: string;
  targetDesignName?: string;
  targetPackageSlug?: string;
  targetPackageName?: string;
  suburbOrCouncil?: string;
  ownLand: boolean;
  message?: string;
  honeypot?: string;
}
