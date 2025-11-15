export interface Clinic {
  id: string;
  name: string;
  specialization: string;
  region: string;
  rating: number;
  reviewCount: number;
  description: string;
  coverImage: string;
  coverImageAlt: string;
  consultationPrice: string;
  address: string;
  phone: string;
  whatsapp?: string;
  workingHours: string;
  isVerified: boolean;
  languages: string[];
  services: string[];
}

export interface FilterOptions {
  region: string;
  specialization: string;
  minRating: number;
  searchTerm: string;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface RegionOption {
  value: string;
  label: string;
}

export interface SpecializationOption {
  value: string;
  label: string;
}