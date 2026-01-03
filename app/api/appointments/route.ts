import { NextRequest, NextResponse } from 'next/server';
import { API_CONFIG } from '@/config/api.config';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Relay the Authorization header if present
        const authHeader = request.headers.get('Authorization');
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        if (authHeader) {
            headers['Authorization'] = authHeader;
        }

        // Proxy the request to the backend
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.APPOINTMENTS.CREATE}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        });

        const data = await response.json();

        // Return the response directly
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Error in appointment creation proxy:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        // Relay the Authorization header if present
        const authHeader = request.headers.get('Authorization');
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        if (authHeader) {
            headers['Authorization'] = authHeader;
        }

        const searchParams = request.nextUrl.searchParams;
        const queryString = searchParams.toString();
        const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.APPOINTMENTS.CREATE}${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Error in appointment fetch proxy:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
