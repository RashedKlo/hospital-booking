/**
 * useAuth Hook
 * Custom hook for authentication state management
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authStorage, AuthData } from '@/utils/auth';
import {
    AuthState,
    UseAuthReturn,
    UserLoginDto,
    UserRegistrationDto,
} from '@/types/auth.types';

export function useAuth(): UseAuthReturn {
    const router = useRouter();
    const [state, setState] = useState<AuthState>({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: true,
    });
    const [error, setError] = useState<string | null>(null);

    /**
     * Initialize auth state from local storage
     */
    useEffect(() => {
        const initAuth = () => {
            const authData = authStorage.getCurrentUser();
            if (authData) {
                setState({
                    user: authData.user,
                    accessToken: authData.accessToken,
                    isAuthenticated: true,
                    isLoading: false,
                });
            } else {
                setState((prev) => ({ ...prev, isLoading: false }));
            }
        };

        initAuth();
    }, []);

    /**
     * Login with email and password
     */
    const login = useCallback(
        async (credentials: UserLoginDto, redirectUrl?: string) => {
            try {
                setState((prev) => ({ ...prev, isLoading: true }));
                setError(null);

                const response = await fetch('/hospital-booking/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(credentials),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'فشل تسجيل الدخول');
                }

                // Extract data from response envelope
                const responseData = data.data;

                // Save auth data
                authStorage.saveAuthData(responseData);

                // Update state
                setState({
                    user: responseData.user,
                    accessToken: responseData.accessToken,
                    isAuthenticated: true,
                    isLoading: false,
                });

                // Redirect to home or specified URL
                router.push(redirectUrl || '/');
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : 'فشل تسجيل الدخول';
                setError(errorMessage);
                setState((prev) => ({ ...prev, isLoading: false }));
                throw err;
            }
        },
        [router]
    );

    /**
     * Register new user
     */
    const register = useCallback(
        async (credentials: UserRegistrationDto) => {
            try {
                setState((prev) => ({ ...prev, isLoading: true }));
                setError(null);

                const response = await fetch('/hospital-booking/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(credentials),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'فشل إنشاء الحساب');
                }

                // Extract data from response envelope
                const responseData = data.data;

                // Save auth data
                authStorage.saveAuthData(responseData);

                // Update state
                setState({
                    user: responseData.user,
                    accessToken: responseData.accessToken,
                    isAuthenticated: true,
                    isLoading: false,
                });

                // Redirect to home or dashboard
                router.push('/');
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : 'فشل إنشاء الحساب';
                setError(errorMessage);
                setState((prev) => ({ ...prev, isLoading: false }));
                throw err;
            }
        },
        [router]
    );

    /**
     * Login with Google OAuth
     */
    const loginWithGoogle = useCallback(() => {
        // Redirection should still go to the backend or a proxy route
        // For simplicity, using the direct backend URL or a proxy route if it handles redirection
        window.location.href = `http://localhost:5193/auth/sign-google`;
    }, []);


    /**
     * Clear error message
     */
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        ...state,
        login,
        register,
        loginWithGoogle,
        error,
        clearError,
    };
}
