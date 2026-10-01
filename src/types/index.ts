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

export interface InclusionItem {
  name: string;
  standard: string;
  luxuryUpgrade?: string;
}

export interface InclusionCategory {
  category: string;
  items: InclusionItem[];
}
