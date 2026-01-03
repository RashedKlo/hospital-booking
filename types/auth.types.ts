/**
 * Authentication Type Definitions
 * Maps to backend DTOs and responses
 */

// ============= API Request Types =============

export interface UserRegistrationDto {
    fullname: string;
    email: string;
    password: string;
}

export interface UserLoginDto {
    email: string;
    password: string;
}

// ============= API Response Types =============

export interface UserAuthenticationData {
    user: User;
    accessToken: string;
}

export interface User {
    userId: number;
    fullName: string;
    email: string;
    password?: string;
}

export type UserRole = 'patient' | 'doctor' | 'admin' | 'clinic_owner';

// ============= Frontend Types =============

export interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface UseAuthReturn extends AuthState {
    login: (credentials: UserLoginDto, redirectUrl?: string) => Promise<void>;
    register: (credentials: UserRegistrationDto) => Promise<void>;
    loginWithGoogle: () => void;
    error: string | null;
    clearError: () => void;
}


// ============= Google OAuth Types =============

export interface GoogleCallbackParams {
    token?: string;
    error?: string;
    message?: string;
}
