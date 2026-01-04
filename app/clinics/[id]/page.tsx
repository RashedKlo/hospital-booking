import ClinicDetails from '../../../components/Clinic/ClinicDetails';
import { getClinicDetail, getAllClinicIds } from '@/lib/api';
import { ClinicDetail } from '@/types/clinic';
import { notFound } from 'next/navigation';

// 1. generateStaticParams tells Next.js which paths to pre-render at build time
// This is essential for output: 'export' with dynamic segments
export async function generateStaticParams() {
    try {
        const ids = await getAllClinicIds();
        return ids;
    } catch (error) {
        console.error('Error in generateStaticParams:', error);
        return [];
    }
}

async function getMappedClinicData(id: string): Promise<ClinicDetail | null> {
    const responseData = await getClinicDetail(id);

    if (responseData?.success && responseData?.data) {
        const { clinic, facilities, services, reviews, doctors } = responseData.data;

        return {
            id: clinic.clinicId.toString(),
            name: clinic.name,
            primarySpecialty: 'عام',
            rating: clinic.rating || 0,
            reviewCount: clinic.reviewCount || 0,
            coverImage: clinic.imageUrl || '/images/placeholder-clinic.jpg',
            coverAlt: clinic.name || 'Clinic Image',
            description: clinic.description || '',
            services: services.services.map((s: any) => ({
                id: s.serviceId?.toString() || Math.random().toString(),
                name: s.title || s.name || '',
                description: s.description || '',
                icon: 'Stethoscope',
                price: s.price?.toString()
            })),
            facilities: facilities.map((f: any) => ({
                id: f.facilityId?.toString(),
                name: f.title || f.name || '',
                icon: 'CheckCircle2',
                available: true
            })),
            doctors: doctors.doctors.map((d: any) => ({
                id: d.doctorId.toString(),
                name: d.fullName,
                specialty: 'طبيب متخصص',
                rating: 5,
                reviewCount: 0,
                languages: ['العربية', 'English'],
                availability: d.isActive ? 'available' : 'unavailable',
                image: '/images/doctor-placeholder.jpg',
                alt: d.fullName,
                experience: `${d.experienceYears || 0} سنوات خبرة`,
                education: d.bio || ''
            })),
            testimonials: reviews.reviews.map((r: any) => ({
                id: r.reviewId?.toString(),
                patientName: r.patientName || 'مريض',
                rating: r.rating || 5,
                comment: r.comment || '',
                date: r.createdAt || new Date().toISOString(),
                avatar: '/images/avatar-placeholder.jpg',
                alt: 'Patient Avatar',
                verified: true
            })),
            contactInfo: {
                phone: clinic.phone || '',
                whatsapp: clinic.phone || '',
                address: clinic.address || '',
                consultationPrice: '100 ر.س',
                workingHours: clinic.openingHours || 'غير محدد',
                rating: clinic.rating || 0,
                reviewCount: clinic.reviewCount || 0,
            },
            location: {
                lat: clinic.latitude || 0,
                lng: clinic.longitude || 0,
            }
        };
    }
    return null;
}

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ClinicDetailPage({ params }: PageProps) {
    const { id } = await params;
    const initialData = await getMappedClinicData(id);

    if (!initialData) {
        notFound();
    }

    // SSR: This data is passed to the Client Component ('ClinicDetails')
    // In static export, this happens at BUILD TIME, making the page instant.
    return <ClinicDetails initialData={initialData} />;
}
