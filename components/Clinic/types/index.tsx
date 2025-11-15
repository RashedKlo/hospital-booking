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