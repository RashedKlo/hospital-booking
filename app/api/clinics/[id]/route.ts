import { NextRequest, NextResponse } from 'next/server';
import { API_CONFIG } from '@/config/api.config';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CLINICS.DETAIL(id)}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error(`Error fetching clinic detail for id ${id}:`, error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
