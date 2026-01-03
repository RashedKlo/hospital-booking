/**
 * API Configuration
 * Centralized configuration for all API endpoints
 */

export const API_CONFIG = {
    BASE_URL: 'http://localhost:5193/api',
    TIMEOUT: 30000, // 30 seconds

    ENDPOINTS: {
        // Authentication endpoints
        AUTH: {
            REGISTER: '/auth/register',
            LOGIN: '/auth/login',
            GOOGLE_LOGIN: '/auth/sign-google',
            GOOGLE_CALLBACK: '/auth/callback-google',
        },

        // Appointments endpoints
        APPOINTMENTS: {
            CREATE: '/Appointment',
        },

        // Clinics endpoints
        CLINICS: {
            LIST: '/Clinic',
            DETAIL: (id: string | number) => `/Clinic/${id}`,
        },

        // Clinic related data
        CLINIC_LANGUAGES: (clinicId: string) => `/clinics/${clinicId}/languages`,
        CLINIC_SERVICES: (clinicId: string) => `/clinics/${clinicId}/services`,
        CLINIC_FACILITIES: (clinicId: string) => `/clinics/${clinicId}/facilities`,

        // Doctors
        DOCTORS: {
            BY_CLINIC: (clinicId: string) => `/clinics/${clinicId}/doctors`,
            DETAIL: (id: string) => `/doctors/${id}`,
            LANGUAGES: (doctorId: string) => `/doctors/${doctorId}/languages`,
        },

        // Testimonials
        TESTIMONIALS: {
            BY_CLINIC: (clinicId: string) => `/clinics/${clinicId}/testimonials`,
        },

        // Reference data
        SPECIALIZATIONS: '/specializations',
        REGIONS: '/regions',
    },
} as const;

export const API_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
} as const;
