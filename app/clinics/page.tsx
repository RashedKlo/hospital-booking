import { getClinics } from '@/lib/api';
import ClinicsOverview from './ClinicsClient';
import { Clinic } from '@/types/clinic';

export const metadata = {
    title: 'العيادات | نظام حجز المواعيد',
    description: 'تصفح قائمة العيادات المتاحة واحجز موعدك الآن بكل سهولة.',
};

export default async function ClinicsPage() {
    // Fetch initial data on the server during build (SSG)
    const responseData = await getClinics({ page: 1, limit: 10 });

    let initialClinics: Clinic[] = [];
    let initialTotalPages = 0;

    if (responseData?.success && responseData?.data) {
        const { clinics: apiClinics, pagination } = responseData.data;

        initialClinics = apiClinics.map((apiClinic: any) => ({
            id: apiClinic.clinicId.toString(),
            name: apiClinic.name || 'عيادة',
            specialization: 'عيادة طبية',
            region: apiClinic.address?.split(' - ')[0] || 'المملكة',
            rating: apiClinic.rating || 0,
            reviewCount: apiClinic.reviewCount || 0,
            description: apiClinic.description || '',
            coverImage: apiClinic.imageUrl || '',
            coverImageAlt: apiClinic.name || 'Clinic Image',
            consultationPrice: '100 ر.س',
            address: apiClinic.address || '',
            phone: apiClinic.phone || '',
            whatsapp: apiClinic.phone || '',
            workingHours: apiClinic.openingHours || 'غير محدد',
            isVerified: true,
            languages: ['العربية', 'English'],
            services: [],
        }));

        initialTotalPages = pagination.totalPages;
    }

    return (
        <ClinicsOverview
            initialClinics={initialClinics}
            initialTotalPages={initialTotalPages}
        />
    );
}
