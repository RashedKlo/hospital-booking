import React from 'react';
import ClinicDetails from '../../../components/Clinic/ClinicDetails';

// Generate static params for all clinic IDs
export async function generateStaticParams() {
    // In a real app, fetch this from your API
    // For now, return the IDs from your mock data
    const clinicIds = ['1', '2', '3', '4', '5', '6'];

    return clinicIds.map((id) => ({
        id: id,
    }));
}

const ClinicDetailPage = () => {
    return <ClinicDetails />;
};

export default ClinicDetailPage;
