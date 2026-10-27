export interface Source { title: string; url: string; retrievedAt: string }
export interface AddressCandidate {
  id: string; label: string; longitude: number; latitude: number;
  council: string; propertyId: string; matchNotes: string[];
}
export interface AddressResult { candidates: AddressCandidate[]; warnings: string[]; source: Source }
export interface Parcel { id: string; label: string; rings: number[][][]; source: Source }
export interface PlanningControl {
  id: string; label: string;
  status: 'available' | 'not-mapped' | 'unavailable' | 'requires-assessment';
  values: string[]; numericValue?: number; unit?: string; source: Source; notes: string;
  documentLinks?: PlanningReference[];
}
export interface PlanningReference { title: string; url: string; description: string }
export interface PlanningSite {
  location: { longitude: number; latitude: number }; retrievedAt: string;
  parcels: Parcel[]; controls: PlanningControl[]; warnings: string[]; references: PlanningReference[];
}
