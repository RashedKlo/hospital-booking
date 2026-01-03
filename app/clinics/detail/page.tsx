'use client';

import { useSearchParams } from 'next/navigation';
import ClinicDetails from '../../../components/Clinic/ClinicDetails';
import { Suspense } from 'react';

function ClinicDetailContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    if (!id) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
                <p className="text-gray-600 dark:text-gray-400 font-bold">معرّف العيادة غير موجود</p>
            </div>
        );
    }

    return <ClinicDetails />;
}

export default function ClinicDetailPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <ClinicDetailContent />
        </Suspense>
    );
}
