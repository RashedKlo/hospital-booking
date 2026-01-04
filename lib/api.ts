import { API_CONFIG } from '@/config/api.config';

const getBaseUrl = () => {
    let url = process.env.NEXT_PUBLIC_API_BASE_URL || API_CONFIG.BASE_URL;
    // Speed up local resolution by bypassing DNS (IPv6 vs IPv4 issues in Node)
    return url.replace('localhost', '127.0.0.1');
};

/**
 * Shared server-side fetching utility with Next.js caching
 */
export async function getClinics(params: { page?: number; limit?: number; query?: string } = {}) {
    const { page = 1, limit = 10, query = '' } = params;
    const queryParams = new URLSearchParams();
    queryParams.append('Page', page.toString());
    queryParams.append('Limit', limit.toString());
    if (query) queryParams.append('SearchQuery', query);

    const baseUrl = getBaseUrl();

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

        const response = await fetch(`${baseUrl}${API_CONFIG.ENDPOINTS.CLINICS.LIST}?${queryParams.toString()}`, {
            // Cache for 1 hour during build/revalidation
            next: { revalidate: 3600, tags: ['clinics'] },
            signal: controller.signal
        });

        clearTimeout(timeoutId);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error('Fetch Clinics Error:', error);
        return null;
    }
}

export async function getClinicDetail(id: string) {
    const baseUrl = getBaseUrl();

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

        const response = await fetch(`${baseUrl}${API_CONFIG.ENDPOINTS.CLINICS.DETAIL(id)}`, {
            next: { revalidate: 3600, tags: [`clinic-${id}`] },
            signal: controller.signal
        });

        clearTimeout(timeoutId);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error(`Fetch Clinic ${id} Error:`, error);
        return null;
    }
}

export async function getAllClinicIds() {
    // This is used for generateStaticParams
    const data = await getClinics({ limit: 100 }); // Fetch first 100 to pre-render
    if (data?.success && data?.data?.clinics) {
        return data.data.clinics.map((c: any) => ({ id: c.clinicId.toString() }));
    }
    return [];
}
