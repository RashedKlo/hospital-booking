// --- Clinic Related Types ---

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

export interface SortParams {
    sortBy: 'rating' | 'name' | 'created_at';
    order: 'asc' | 'desc';
}

// --- Clinic Detail Related Types ---

export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    reviewCount: number;
    languages: string[];
    availability: 'available' | 'busy' | 'unavailable';
    image: string;
    alt: string;
    experience: string;
    education: string;
}

export interface Testimonial {
    id: string;
    patientName: string;
    rating: number;
    comment: string;
    date: string;
    avatar: string;
    alt: string;
    verified: boolean;
}

export interface Service {
    id: string;
    name: string;
    description: string;
    icon: string;
    price?: string;
}

export interface Facility {
    id: string;
    name: string;
    icon: string;
    available: boolean;
}

export interface ClinicDetail {
    id: string;
    name: string;
    primarySpecialty: string;
    rating: number;
    reviewCount: number;
    coverImage: string;
    coverAlt: string;
    description: string;
    services: Service[];
    facilities: Facility[];
    doctors: Doctor[];
    testimonials: Testimonial[];
    contactInfo: {
        phone: string;
        whatsapp?: string;
        address: string;
        consultationPrice: string;
        workingHours: string;
        rating: number;
        reviewCount: number;
    };
    location: {
        lat: number;
        lng: number;
    };
}

export interface BreadcrumbItem {
    label: string;
    href: string;
    isActive: boolean;
}

// --- API Response Types ---

export interface ApiPagination {
    page: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
    totalItems: number;
    hasPrevious: boolean;
    hasNext: boolean;
}

export interface ApiClinic {
    clinicId: number;
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string | null;
    website: string | null;
    imageUrl: string | null;
    rating: number;
    reviewCount: number;
    openingHours: string | null;
    latitude: number | null;
    longitude: number | null;
    createdAt: string;
    updatedAt: string;
}

export interface ApiFacility {
    facilityId: number;
    clinicId: number;
    title: string;
    createdAt: string;
    updatedAt: string;
}

export interface ApiDoctor {
    doctorId: number;
    clinicId: number;
    fullName: string;
    bio: string;
    phone: string;
    isActive: boolean;
    experienceYears: number;
    clinic: ApiClinic;
}

export interface ClinicDetailResponseData {
    clinic: ApiClinic;
    facilities: ApiFacility[];
    services: {
        services: any[];
        pagination: ApiPagination;
    };
    reviews: {
        reviews: any[];
        pagination: ApiPagination;
    };
    doctors: {
        doctors: ApiDoctor[];
        pagination: ApiPagination;
    };
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
}

export interface ApiClinicsResponseData {
    clinics: ApiClinic[];
    pagination: ApiPagination;
}
