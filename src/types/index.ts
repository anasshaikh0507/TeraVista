export type BiomeType = 
  | 'Alpine' 
  | 'Coastal' 
  | 'Desert' 
  | 'Archipelago' 
  | 'Highland' 
  | 'Urban Coastal' 
  | 'Heritage Coastal' 
  | 'Island Harbour' 
  | 'Forest Sanctuary';

export type SeasonType = 'Summer' | 'Autumn' | 'Winter' | 'Spring' | 'Year-round';

export type DifficultyLevel = 'Accessible' | 'Moderate' | 'Challenging' | 'Expert';

export type FilterCategory = 
  | 'All' 
  | 'Beaches' 
  | 'Heritage' 
  | 'Religious Places' 
  | 'Nature' 
  | 'Viewpoints';

export interface Destination {
  id: string;
  name: string;
  region: string;
  country: string;
  biome: BiomeType;
  category: FilterCategory;
  secondaryCategories?: FilterCategory[];
  elevationMeters: number;
  latitude: number;
  longitude: number;
  difficulty: DifficultyLevel;
  bestSeason: SeasonType;
  climateSummary: string;
  terrainFeatures: string[];
  readiness3D: boolean;
  highlightTag: string;
  imageUrl: string;
  description: string;
  ecoRating: number; // 1 - 5 curated eco-sensitivity index
  estimatedDurationDays: number;
  isMumbai?: boolean;
  curatedNotice?: string; // Clearly distinguishes curated sample information from live data
}

export interface TravelFilterState {
  searchQuery: string;
  category: FilterCategory;
  biome: BiomeType | 'All';
  season: SeasonType | 'All';
  difficulty: DifficultyLevel | 'All';
}

export interface TelemetryMetric {
  id: string;
  label: string;
  value: string;
  subValue?: string;
  status: 'optimal' | 'nominal' | 'alert';
}

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export interface PhaseDeliverable {
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  tags: string[];
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  description?: string;
}
