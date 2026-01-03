/**
 * Database Type Definitions
 * Complete type definitions for all database tables in the hospital booking system
 */

// ============= User Authentication =============

export interface User {
    userId: number;
    email: string;
    password?: string; // Hashed password, optional for Google OAuth users
    fullName: string;
    phoneNumber?: string;
    profilePicture?: string;
    isEmailVerified: boolean;
    isActive: boolean;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    lastLoginAt?: Date;
}

export type UserRole = 'patient' | 'doctor' | 'admin' | 'clinic_owner';

// ============= Patient Information =============

export interface Patient {
    patientId: number;
    userId: number; // Foreign key to users table
    dateOfBirth: Date;
    gender: Gender;
    bloodType?: BloodType;
    nationalId?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    address?: string;
    city?: string;
    country?: string;
    allergies?: string[]; // JSON array of allergies
    chronicDiseases?: string[]; // JSON array of chronic conditions
    currentMedications?: string[]; // JSON array of current medications
    insuranceProvider?: string;
    insurancePolicyNumber?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type Gender = 'male' | 'female' | 'other';
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

// ============= Clinic Information =============

export interface Clinic {
    clinicId: number;
    name: string;
    nameAr?: string; // Arabic name
    description: string;
    descriptionAr?: string; // Arabic description
    primarySpecialty: string;
    specialties: string[]; // JSON array of all specialties offered
    address: string;
    city: string;
    country: string;
    latitude?: number;
    longitude?: number;
    phone: string;
    whatsapp?: string;
    email: string;
    website?: string;
    imageUrl: string;
    coverImage?: string;
    rating: number; // Average rating (0-5)
    reviewCount: number;
    consultationPrice: number;
    currency: string; // e.g., 'USD', 'SAR', 'EGP'
    openingHours: string; // JSON object with daily hours
    workingDays: string[]; // JSON array of working days
    isActive: boolean;
    isVerified: boolean;
    licenseNumber?: string;
    establishedYear?: number;
    createdAt: Date;
    updatedAt: Date;
}

// ============= Clinic Facilities =============

export interface ClinicFacility {
    facilityId: number;
    clinicId: number; // Foreign key to clinics table
    name: string;
    nameAr?: string;
    icon: string; // Icon identifier or URL
    description?: string;
    isAvailable: boolean;
    createdAt: Date;
}

// ============= Clinic Services =============

export interface ClinicService {
    serviceId: number;
    clinicId: number; // Foreign key to clinics table
    name: string;
    nameAr?: string;
    description: string;
    descriptionAr?: string;
    icon?: string;
    price?: number;
    duration?: number; // Duration in minutes
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// ============= Doctor Information =============

export interface Doctor {
    doctorId: number;
    userId: number; // Foreign key to users table
    clinicId?: number; // Primary clinic (optional, can work at multiple)
    specialty: string;
    subSpecialty?: string;
    licenseNumber: string;
    yearsOfExperience: number;
    education: string; // Degree and university
    certifications?: string[]; // JSON array of certifications
    languages: string[]; // JSON array of languages spoken
    biography?: string;
    biographyAr?: string;
    imageUrl?: string;
    rating: number; // Average rating (0-5)
    reviewCount: number;
    consultationFee: number;
    currency: string;
    isAvailable: boolean;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// ============= Doctor Schedules =============

export interface DoctorSchedule {
    scheduleId: number;
    doctorId: number; // Foreign key to doctors table
    clinicId: number; // Foreign key to clinics table
    dayOfWeek: DayOfWeek;
    startTime: string; // Time in HH:mm format
    endTime: string; // Time in HH:mm format
    slotDuration: number; // Duration of each appointment slot in minutes
    maxPatientsPerSlot: number;
    isActive: boolean;
    effectiveFrom: Date;
    effectiveTo?: Date; // Optional end date for temporary schedules
    createdAt: Date;
    updatedAt: Date;
}

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

// ============= Appointments =============

export interface Appointment {
    appointmentId: number;
    patientId: number; // Foreign key to patients table
    doctorId: number; // Foreign key to doctors table
    clinicId: number; // Foreign key to clinics table
    scheduleId?: number; // Foreign key to doctor_schedules table
    appointmentDate: Date;
    appointmentTime: string; // Time in HH:mm format
    duration: number; // Duration in minutes
    status: AppointmentStatus;
    appointmentType: AppointmentType;
    reasonForVisit: string;
    symptoms?: string;
    notes?: string;
    consultationFee: number;
    paymentStatus: PaymentStatus;
    paymentMethod?: PaymentMethod;
    transactionId?: string;
    cancellationReason?: string;
    cancelledBy?: number; // userId who cancelled
    cancelledAt?: Date;
    rescheduledFrom?: number; // Original appointmentId if rescheduled
    reminderSent: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type AppointmentStatus =
    | 'scheduled'
    | 'confirmed'
    | 'in_progress'
    | 'completed'
    | 'cancelled'
    | 'no_show'
    | 'rescheduled';

export type AppointmentType =
    | 'first_visit'
    | 'follow_up'
    | 'emergency'
    | 'consultation'
    | 'checkup';

export type PaymentStatus =
    | 'pending'
    | 'paid'
    | 'refunded'
    | 'failed';

export type PaymentMethod =
    | 'cash'
    | 'credit_card'
    | 'debit_card'
    | 'insurance'
    | 'online';

// ============= Medical Reports =============

export interface MedicalReport {
    reportId: number;
    appointmentId: number; // Foreign key to appointments table
    patientId: number; // Foreign key to patients table
    doctorId: number; // Foreign key to doctors table
    reportType: ReportType;
    diagnosis: string;
    symptoms: string;
    examination: string;
    vitalSigns?: VitalSigns; // JSON object
    labResults?: string;
    imagingResults?: string;
    recommendations: string;
    followUpRequired: boolean;
    followUpDate?: Date;
    attachments?: string[]; // JSON array of file URLs
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type ReportType =
    | 'consultation'
    | 'diagnosis'
    | 'lab_test'
    | 'imaging'
    | 'surgery'
    | 'follow_up';

export interface VitalSigns {
    bloodPressure?: string; // e.g., "120/80"
    heartRate?: number; // beats per minute
    temperature?: number; // in Celsius
    respiratoryRate?: number; // breaths per minute
    oxygenSaturation?: number; // percentage
    weight?: number; // in kg
    height?: number; // in cm
    bmi?: number;
}

// ============= Prescriptions =============

export interface Prescription {
    prescriptionId: number;
    appointmentId: number; // Foreign key to appointments table
    reportId?: number; // Foreign key to medical_reports table
    patientId: number; // Foreign key to patients table
    doctorId: number; // Foreign key to doctors table
    prescriptionDate: Date;
    validUntil?: Date;
    instructions: string;
    notes?: string;
    status: PrescriptionStatus;
    pharmacyId?: number; // If filled at specific pharmacy
    filledAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export type PrescriptionStatus =
    | 'active'
    | 'filled'
    | 'expired'
    | 'cancelled';

// ============= Prescription Items =============

export interface PrescriptionItem {
    itemId: number;
    prescriptionId: number; // Foreign key to prescriptions table
    medicationName: string;
    medicationNameAr?: string;
    dosage: string; // e.g., "500mg"
    frequency: string; // e.g., "twice daily", "every 8 hours"
    duration: string; // e.g., "7 days", "2 weeks"
    quantity: number;
    instructions: string;
    instructionsAr?: string;
    warnings?: string;
    createdAt: Date;
}

// ============= Patient Medical History =============

export interface PatientMedicalHistory {
    historyId: number;
    patientId: number; // Foreign key to patients table
    appointmentId?: number; // Foreign key to appointments table (if related)
    reportId?: number; // Foreign key to medical_reports table (if related)
    prescriptionId?: number; // Foreign key to prescriptions table (if related)
    eventType: MedicalEventType;
    eventDate: Date;
    title: string;
    description: string;
    doctorId?: number; // Foreign key to doctors table
    clinicId?: number; // Foreign key to clinics table
    attachments?: string[]; // JSON array of file URLs
    isImportant: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type MedicalEventType =
    | 'appointment'
    | 'diagnosis'
    | 'prescription'
    | 'surgery'
    | 'hospitalization'
    | 'vaccination'
    | 'allergy'
    | 'lab_test'
    | 'imaging'
    | 'other';

// ============= Testimonials/Reviews =============

export interface Testimonial {
    testimonialId: number;
    patientId: number; // Foreign key to patients table
    clinicId?: number; // Foreign key to clinics table (if clinic review)
    doctorId?: number; // Foreign key to doctors table (if doctor review)
    appointmentId?: number; // Foreign key to appointments table
    rating: number; // 1-5 stars
    comment: string;
    isVerified: boolean;
    isApproved: boolean;
    isPublic: boolean;
    helpfulCount: number; // Number of users who found it helpful
    createdAt: Date;
    updatedAt: Date;
}

// ============= Admin Users =============

export interface Admin {
    adminId: number;
    userId: number; // Foreign key to users table
    adminLevel: AdminLevel;
    permissions: AdminPermission[]; // JSON array of permissions
    department?: string;
    canManageClinics: boolean;
    canManageDoctors: boolean;
    canManagePatients: boolean;
    canManageAppointments: boolean;
    canViewReports: boolean;
    canManageAdmins: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type AdminLevel = 'super_admin' | 'admin' | 'moderator' | 'support';

export type AdminPermission =
    | 'manage_users'
    | 'manage_clinics'
    | 'manage_doctors'
    | 'manage_appointments'
    | 'view_reports'
    | 'manage_content'
    | 'manage_payments'
    | 'manage_settings';

// ============= Helper Types =============

export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    limit: number;
    totalPages: number;
    totalCount: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
    errors?: string[];
}

// ============= DTOs (Data Transfer Objects) =============

export interface CreateAppointmentDto {
    doctorId: number;
    clinicId: number;
    appointmentDate: string; // ISO date string
    appointmentTime: string;
    appointmentType: AppointmentType;
    reasonForVisit: string;
    symptoms?: string;
    notes?: string;
}

export interface UpdateAppointmentDto {
    appointmentDate?: string;
    appointmentTime?: string;
    status?: AppointmentStatus;
    notes?: string;
}

export interface CancelAppointmentDto {
    cancellationReason: string;
}

export interface CreatePatientDto {
    dateOfBirth: string;
    gender: Gender;
    bloodType?: BloodType;
    phoneNumber?: string;
    address?: string;
    city?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
}

export interface UpdatePatientDto {
    phoneNumber?: string;
    address?: string;
    city?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    allergies?: string[];
    chronicDiseases?: string[];
    currentMedications?: string[];
}

export interface CreateTestimonialDto {
    clinicId?: number;
    doctorId?: number;
    appointmentId?: number;
    rating: number;
    comment: string;
}

export interface DoctorAvailabilityQuery {
    doctorId: number;
    clinicId: number;
    date: string; // ISO date string
}

export interface AvailableTimeSlot {
    time: string;
    isAvailable: boolean;
    appointmentCount: number;
}
