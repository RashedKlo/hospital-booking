"use client";
import React, { useState, memo, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import ContactSidebar from '@/components/UI/ContactSidebar';
import ClinicHero from './ClinicHero';
import ClinicInfo from './ClinicInfo';
import DoctorsGrid from './DoctorsGrid';
import TestimonialsSection from './TestimonialsSection';
import LocationMap from './LocationMap';
import { Doctor, ClinicDetail } from '@/types/clinic';
import Icon from '@/components/UI/AppIcon';
import Contact from '../Contact';
import { API_CONFIG } from '@/config/api.config';

interface ClinicDetailsProps {
    initialData?: ClinicDetail;
}

const ClinicDetails = memo(({ initialData }: ClinicDetailsProps) => {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const clinicId = (params.id as string) || searchParams.get('id');

    const [clinicData, setClinicData] = useState<ClinicDetail | null>(initialData || null);
    const [isLoading, setIsLoading] = useState(!initialData);
    const [error, setError] = useState<any>(null);

    // Fetch clinic data
    useEffect(() => {
        const fetchClinicData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Fetch clinic data directly from backend
                const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CLINICS.DETAIL(clinicId)}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch clinic: ${response.statusText}`);
                }

                const responseData = await response.json();
                console.log('Clinic data:', responseData);

                if (responseData.success && responseData.data) {
                    const { clinic, facilities, services, reviews, doctors } = responseData.data;

                    // Map API data to ClinicDetail format
                    setClinicData({
                        id: clinic.clinicId.toString(),
                        name: clinic.name,
                        primarySpecialty: 'عام', // Default specialty
                        rating: clinic.rating || 0,
                        reviewCount: clinic.reviewCount || 0,
                        coverImage: clinic.imageUrl || '/images/placeholder-clinic.jpg',
                        coverAlt: clinic.name || 'Clinic Image',
                        description: clinic.description || '',
                        services: services.services.map((s: any) => ({
                            id: s.serviceId?.toString() || Math.random().toString(),
                            name: s.title || s.name || '',
                            description: s.description || '',
                            icon: 'Stethoscope', // Default icon
                            price: s.price?.toString()
                        })),
                        facilities: facilities.map((f: any) => ({
                            id: f.facilityId?.toString(),
                            name: f.title || f.name || '',
                            icon: 'CheckCircle2', // Default icon
                            available: true
                        })),
                        doctors: doctors.doctors.map((d: any) => ({
                            id: d.doctorId.toString(),
                            name: d.fullName,
                            specialty: 'طبيب متخصص',
                            rating: 5, // Default or mock
                            reviewCount: 0,
                            languages: ['العربية', 'English'],
                            availability: d.isActive ? 'available' : 'unavailable',
                            image: '/images/doctor-placeholder.jpg', // Mock or add to API
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
                    });
                } else {
                    throw new Error(responseData.message || 'Failed to fetch clinic');
                }
            } catch (err) {
                console.error('Error fetching clinic:', err);
                setError(err instanceof Error ? err : new Error('An unknown error occurred'));
            } finally {
                setIsLoading(false);
            }
        };

        if (clinicId && !initialData) {
            fetchClinicData();
        } else if (initialData) {
            setIsLoading(false);
        }
    }, [clinicId, initialData]);

    const refetch = () => {
        setIsLoading(true);
        setError(null);
        // Trigger re-fetch by changing a dependency or calling fetchClinicData again
    };

    const handleBookingClick = (doctor?: Doctor) => {
        if (!doctor) return;

        // Check auth locally first for better UX (optional, page will also check)
        const isAuth = localStorage.getItem('authData');

        if (!isAuth) {
            const bookingPath = `/book?doctorId=${doctor.id}&clinicId=${clinicData?.id || ''}`;
            router.push(`/signin?redirect=${encodeURIComponent(bookingPath)}`);
            return;
        }

        router.push(`/book?doctorId=${doctor.id}&clinicId=${clinicData?.id || ''}`);
    };

    // Modern Loading State
    if (isLoading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen bg-gray-50 dark:bg-gray-950"
                dir="rtl"
            >
                <div className="pt-20 md:pt-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Animated Loading Header */}
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-12"
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 180, 360],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/30"
                            >
                                <Icon name="Building2" size={40} color="white" />
                            </motion.div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                جاري تحميل بيانات العيادة
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                يرجى الانتظار قليلاً...
                            </p>
                        </motion.div>

                        {/* Skeleton Content */}
                        <div className="space-y-8">
                            {/* Hero Skeleton */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
                                <div className="h-64 sm:h-80 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse" />
                                <div className="p-6 space-y-4">
                                    <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-pulse w-3/4" />
                                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-pulse w-1/2" />
                                </div>
                            </div>

                            {/* Content Grid Skeleton */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-6">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                                            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-pulse w-1/3 mb-4" />
                                            <div className="space-y-3">
                                                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-pulse" />
                                                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-pulse w-5/6" />
                                                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-pulse w-4/6" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-6">
                                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 sticky top-24">
                                        <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-pulse w-2/3 mb-4" />
                                        <div className="space-y-3">
                                            <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-xl animate-pulse" />
                                            <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-xl animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    // Error State
    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center"
                dir="rtl"
            >
                <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-6 bg-rose-100 dark:bg-rose-900/20 rounded-full flex items-center justify-center">
                        <Icon name="AlertCircle" size={48} color="#EF4444" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        حدث خطأ أثناء تحميل البيانات
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {error.message || 'المعذرة، لم نتمكن من تحميل بيانات العيادة'}
                    </p>
                    <div className="flex gap-4 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => refetch()}
                            className="bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                            إعادة المحاولة
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push('/clinics')}
                            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 px-6 py-3 rounded-xl font-semibold transition-all"
                        >
                            العودة للعيادات
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        );
    }

    // Not Found State
    if (!clinicData) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center"
                dir="rtl"
            >
                <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-6 bg-rose-100 dark:bg-rose-900/20 rounded-full flex items-center justify-center">
                        <Icon name="AlertCircle" size={48} color="#EF4444" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        لم يتم العثور على العيادة
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        المعذرة، لم نتمكن من العثور على بيانات هذه العيادة
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push('/clinics')}
                        className="bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                        العودة للعيادات
                    </motion.button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gray-50 dark:bg-gray-950"
            dir="rtl"
        >
            <main className="pt-20 md:pt-24">
                {/* Hero Section */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-7xl mx-auto px-4 lg:px-6 py-6"
                >
                    <ClinicHero clinic={clinicData} />
                </motion.div>

                {/* Main Content */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-7xl mx-auto px-4 lg:px-6 pb-12"
                >
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Content */}
                        <div className="flex-1 space-y-8">
                            <ClinicInfo clinic={clinicData} />
                            <DoctorsGrid
                                doctors={clinicData.doctors}
                                onBookingClick={handleBookingClick}
                            />
                            <TestimonialsSection testimonials={clinicData.testimonials} />
                            <LocationMap clinic={clinicData} />
                        </div>

                        {/* Right Sidebar */}
                        <div className="lg:w-80">

                        </div>
                    </div>
                </motion.div>
            </main>

            {/* Modal removed */}
        </motion.div>
    );
});

ClinicDetails.displayName = 'ClinicDetails';

export default ClinicDetails;
