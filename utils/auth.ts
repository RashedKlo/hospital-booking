/**
 * Auth Utilities
 * Handles authentication data persistence in local storage
 */

export interface AuthData {
    user: any;
    accessToken: string;
}

export const authStorage = {
    /**
     * Get current user from storage
     */
    getCurrentUser(): AuthData | null {
        if (typeof window === 'undefined') return null;

        try {
            const authData = localStorage.getItem('authData');
            return authData ? JSON.parse(authData) : null;
        } catch {
            return null;
        }
    },

    /**
     * Save auth data to storage
     */
    saveAuthData(data: AuthData): void {
        if (typeof window === 'undefined') return;

        try {
            localStorage.setItem('authData', JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save auth data:', error);
        }
    },

    /**
     * Clear auth data (logout)
     */
    clearAuthData(): void {
        if (typeof window === 'undefined') return;

        try {
            localStorage.removeItem('authData');
        } catch (error) {
            console.error('Failed to clear auth data:', error);
        }
    },
};
