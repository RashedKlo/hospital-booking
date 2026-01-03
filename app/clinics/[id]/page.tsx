import ClinicDetails from '../../../components/Clinic/ClinicDetails';
import { API_CONFIG } from '@/config/api.config';
import { ClinicDetail } from '@/types/clinic';

async function getClinicData(id: string): Promise<ClinicDetail | null> {
    try {
        // Direct backend call for SSR
        const backendUrl = API_CONFIG.BASE_URL; // Direct backend URL (avoid next.js api route loop in SSR)
        const response = await fetch(`${backendUrl}/Clinic/${id}`, {
            next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
        });

        if (!response.ok) {
            return null;
        }

        const responseData = await response.json();

        if (responseData.success && responseData.data) {
            const { clinic, facilities, services, reviews, doctors } = responseData.data;

            // Map data (Duplicate mapping logic from client - ideally move to a shared utility)
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
    } catch (error) {
        console.error('SSR Fetch Error:', error);
        return null;
    }
}

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ClinicDetailPage({ params }: PageProps) {
    const { id } = await params;
    const initialData = await getClinicData(id);

    return <ClinicDetails initialData={initialData || undefined} />;
}
