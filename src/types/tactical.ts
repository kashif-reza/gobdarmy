/**
 * Tactical // BD Data Models and Types
 */

export type ForceType = 'Bangladesh Army' | 'Bangladesh Navy' | 'Bangladesh Air Force';

export interface DefenseForce {
  id: string;
  name: ForceType;
  nativeName: string;
  established: string;
  motto: string;
  nativeMotto: string;
  headquarters: string;
  commanderTitle: string;
  officialColors: string[];
  bannerImage: string;
  overview: string;
  role: string;
  keyBases: string[];
  personnelEstimate: string;
  historicalFoundation: string;
  officialPortal: string;
}

export type RankCategory = 
  | 'Commissioned Officer' 
  | 'Junior Commissioned Officer' 
  | 'Non-Commissioned Officer' 
  | 'Other Rank';

export interface RankItem {
  id: string;
  name: string;
  nativeName: string;
  force: ForceType;
  category: RankCategory;
  hierarchyLevel: number; // 1 (Highest) to 15 (Entry level)
  insigniaDescription: string;
  insigniaType: 'general' | 'officer' | 'jco' | 'nco' | 'soldier';
  starsCount?: number;
  hasShapla?: boolean;
  hasSwords?: boolean;
  hasAnchor?: boolean;
  hasEagle?: boolean;
  stripesCount?: number;
  generalResponsibilities: string[];
  careerLevel: string;
  equivalentArmy: string;
  equivalentNavy: string;
  equivalentAirForce: string;
  associatedUniform: string;
  source: string;
}

export interface PostRole {
  id: string;
  title: string;
  force: ForceType;
  department: string;
  rankEligibility: string;
  description: string;
  keyDuties: string[];
  requiredSkills: string[];
  relatedUniform: string;
  relatedEquipment: string[];
  relatedBadges: string[];
  source: string;
}

export type UniformCategory = 
  | 'Combat & Field Dress' 
  | 'Service / Office Dress' 
  | 'Ceremonial / Full Dress' 
  | 'Mess Dress' 
  | 'Specialist / Flight Suit'
  | 'Naval Working Dress';

export interface UniformItem {
  id: string;
  name: string;
  force: ForceType;
  category: UniformCategory;
  image: string;
  colors: string[];
  colorHexes: string[];
  purpose: string;
  wearOccasions: string[];
  associatedRanks: string;
  insigniaAndAccessories: string[];
  description: string;
  source: string;
}

export type BadgeCategory = 
  | 'Rank Insignia' 
  | 'Qualification & Specialist' 
  | 'Service Badge' 
  | 'National Gallantry Decoration' 
  | 'Unit Insignia';

export interface BadgeItem {
  id: string;
  name: string;
  nativeName?: string;
  force: ForceType | 'Joint / Armed Forces';
  category: BadgeCategory;
  meaning: string;
  eligibility: string;
  ribbonColors?: string[];
  iconType: 'parachute' | 'wings' | 'submarine' | 'cross' | 'star' | 'crest' | 'shield' | 'swords';
  description: string;
  relatedRank?: string;
  relatedRole?: string;
  source: string;
}

export type EquipmentCategory = 
  | 'Aviation & Combat Aircraft' 
  | 'Naval Fleet & Surface Vessels' 
  | 'Armored Vehicles & Tanks' 
  | 'Air Defense & Missiles' 
  | 'Infantry & Small Arms' 
  | 'Sensors, Radar & Comms' 
  | 'Protective & Tactical Gear';

export interface EquipmentItem {
  id: string;
  name: string;
  category: EquipmentCategory;
  force: ForceType;
  image: string;
  description: string;
  generalPurpose: string;
  manufacturerOrigin: string;
  specifications: { [key: string]: string };
  relatedRole: string;
  publicVerificationStatus: string;
  source: string;
}

export interface CapabilityItem {
  id: string;
  title: string;
  force: ForceType | 'Joint Armed Forces';
  domain: string;
  description: string;
  keyAssets: string[];
  verifiedStatistic: {
    value: string;
    label: string;
    source: string;
  };
  operationalHighlights: string[];
  source: string;
}

export interface CareerPathway {
  id: string;
  title: string;
  force: ForceType;
  category: 'Commissioned Officer' | 'Specialist Entry' | 'Soldier / Sailor / Airman' | 'Female Officer Stream';
  entryRoute: string;
  overview: string;
  eligibilityEducation: string[];
  physicalStandards: string[];
  selectionSteps: string[];
  trainingAcademy: string;
  trainingDuration: string;
  officialPortalUrl: string;
  relatedRank: string;
  source: string;
}

export interface ComparisonItem {
  id: string;
  type: 'rank' | 'uniform' | 'equipment' | 'career';
  data: any;
}
