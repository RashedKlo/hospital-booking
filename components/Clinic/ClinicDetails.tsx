"use client";
import React, { useState, useEffect, memo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ContactSidebar from '@/components/UI/ContactSidebar';
import BookingModal from '@/components/UI/BookingModal';
import ClinicHero from './components/ClinicHero';
import ClinicInfo from './components/ClinicInfo';
import DoctorsGrid from './components/DoctorsGrid';
import TestimonialsSection from './components/TestimonialsSection';
import LocationMap from './components/LocationMap';
import { ClinicDetail, Doctor } from './types';
import Icon from '@/components/UI/AppIcon';

const ClinicDetails = memo(() => {
    const params = useParams();
    const router = useRouter();
    const clinicId = params.id as string;

    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [clinicData, setClinicData] = useState<ClinicDetail | null>(null);

    // Fetch clinic data based on ID
    useEffect(() => {
        const fetchClinicData = async () => {
            setIsLoading(true);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1200));

            // Mock clinic data - In real app, fetch from API using clinicId
            const mockData: ClinicDetail = {
                id: clinicId,
                name: "مركز النور الطبي المتخصص",
                primarySpecialty: "طب القلب والأوعية الدموية",
                rating: 4.8,
                reviewCount: 342,
                coverImage: "https://images.unsplash.com/photo-1734787277873-b9b25ec2196d",
                coverAlt: "Modern medical clinic interior with comfortable seating area and professional lighting",
                description: `مركز النور الطبي المتخصص هو واحد من أرقى المراكز الطبية في المنطقة، يقدم خدمات طبية متميزة في تخصص القلب والأوعية الدموية. يضم المركز نخبة من أفضل الأطباء المتخصصين والمعتمدين دولياً، مع أحدث التقنيات والأجهزة الطبية المتطورة.

نحن نؤمن بأن صحة المريض هي أولويتنا القصوى، لذلك نحرص على تقديم رعاية طبية شاملة ومتكاملة تشمل التشخيص الدقيق والعلاج الفعال والمتابعة المستمرة. كما نوفر بيئة مريحة وآمنة لجميع مرضانا مع الالتزام بأعلى معايير الجودة والسلامة الطبية.`,
                services: [
                    {
                        id: "service-001",
                        name: "تخطيط القلب الكهربائي",
                        description: "فحص شامل لكهربائية القلب وتشخيص اضطرابات النظم",
                        icon: "Activity",
                        price: "150 ريال"
                    },
                    {
                        id: "service-002",
                        name: "تصوير القلب بالموجات فوق الصوتية",
                        description: "فحص دقيق لعضلة القلب والصمامات",
                        icon: "Heart",
                        price: "300 ريال"
                    },
                    {
                        id: "service-003",
                        name: "قسطرة القلب التشخيصية",
                        description: "إجراء متقدم لتشخيص أمراض الشرايين التاجية",
                        icon: "Zap",
                        price: "1500 ريال"
                    },
                    {
                        id: "service-004",
                        name: "متابعة ضغط الدم",
                        description: "برنامج شامل لمراقبة وعلاج ارتفاع ضغط الدم",
                        icon: "TrendingUp",
                        price: "100 ريال"
                    },
                    {
                        id: "service-005",
                        name: "استشارة طبية متخصصة",
                        description: "استشارة شاملة مع طبيب القلب المختص",
                        icon: "UserCheck",
                        price: "200 ريال"
                    },
                    {
                        id: "service-006",
                        name: "فحص الكوليسترول الشامل",
                        description: "تحليل مفصل لمستويات الدهون في الدم",
                        icon: "BarChart3",
                        price: "80 ريال"
                    }
                ],
                facilities: [
                    { id: "facility-001", name: "غرف فحص مجهزة", icon: "Building", available: true },
                    { id: "facility-002", name: "أجهزة تصوير متطورة", icon: "Camera", available: true },
                    { id: "facility-003", name: "مختبر تحاليل", icon: "TestTube", available: true },
                    { id: "facility-004", name: "صيدلية", icon: "Pill", available: true },
                    { id: "facility-005", name: "موقف سيارات", icon: "Car", available: true },
                    { id: "facility-006", name: "واي فاي مجاني", icon: "Wifi", available: true },
                    { id: "facility-007", name: "مصعد", icon: "ArrowUp", available: true },
                    { id: "facility-008", name: "كافيتيريا", icon: "Coffee", available: false }
                ],
                doctors: [
                    {
                        id: "doctor-001",
                        name: "د. أحمد محمد العلي",
                        specialty: "استشاري أمراض القلب والقسطرة",
                        rating: 4.9,
                        reviewCount: 156,
                        languages: ["العربية", "الإنجليزية"],
                        availability: "available",
                        image: "https://images.unsplash.com/photo-1718954222379-900772c6ff2f",
                        alt: "Professional male doctor in white coat with stethoscope smiling at camera in medical office",
                        experience: "15 سنة خبرة",
                        education: "دكتوراه في طب القلب - جامعة الملك سعود"
                    },
                    {
                        id: "doctor-002",
                        name: "د. فاطمة سالم الزهراني",
                        specialty: "أخصائية أمراض القلب للأطفال",
                        rating: 4.7,
                        reviewCount: 89,
                        languages: ["العربية", "الإنجليزية", "الفرنسية"],
                        availability: "busy",
                        image: "https://images.unsplash.com/photo-1685022036574-12bffde5e2b7",
                        alt: "Professional female doctor in white coat with hijab holding medical chart in hospital corridor",
                        experience: "12 سنة خبرة",
                        education: "ماجستير طب الأطفال - جامعة الملك عبدالعزيز"
                    },
                    {
                        id: "doctor-003",
                        name: "د. خالد عبدالله الشمري",
                        specialty: "استشاري جراحة القلب",
                        rating: 4.8,
                        reviewCount: 203,
                        languages: ["العربية", "الإنجليزية"],
                        availability: "available",
                        image: "https://images.unsplash.com/photo-1728474372689-c3072b79806e",
                        alt: "Experienced male surgeon in scrubs with surgical mask around neck in operating room",
                        experience: "20 سنة خبرة",
                        education: "دكتوراه جراحة القلب - جامعة هارفارد"
                    }
                ],
                testimonials: [
                    {
                        id: "testimonial-001",
                        patientName: "محمد أحمد السعدي",
                        rating: 5,
                        comment: "تجربة ممتازة في مركز النور الطبي. الدكتور أحمد العلي طبيب محترف جداً وشرح لي حالتي بوضوح تام. الموظفون متعاونون والمركز نظيف ومجهز بأحدث الأجهزة. أنصح بشدة بهذا المركز لكل من يحتاج علاج أمراض القلب.",
                        date: "2024-01-15",
                        avatar: "https://images.unsplash.com/photo-1624411024074-18a756682b50",
                        alt: "Middle-aged man with beard wearing traditional white thobe smiling at camera",
                        verified: true
                    },
                    {
                        id: "testimonial-002",
                        patientName: "أم عبدالله الخالدي",
                        rating: 4,
                        comment: "الدكتورة فاطمة الزهراني ممتازة في التعامل مع الأطفال. ابني كان خائف من الفحص لكنها تعاملت معه بصبر وحنان. النتائج كانت دقيقة والعلاج فعال. المركز منظم والمواعيد دقيقة. شكراً لكم على الخدمة المميزة.",
                        date: "2024-01-10",
                        avatar: "https://images.unsplash.com/photo-1645011093223-77c4692e9843",
                        alt: "Professional woman wearing hijab and business attire smiling warmly at camera",
                        verified: true
                    },
                    {
                        id: "testimonial-003",
                        patientName: "عبدالرحمن الغامدي",
                        rating: 5,
                        comment: "خضعت لعملية قسطرة القلب مع الدكتور خالد الشمري وكانت تجربة ناجحة بفضل الله. الطبيب خبير ومتمكن والفريق الطبي محترف. التعافي كان سريع والمتابعة ممتازة. أشكر جميع العاملين في المركز على الاهتمام والرعاية.",
                        date: "2024-01-05",
                        avatar: "https://images.unsplash.com/photo-1520434087499-0fa48ffb40c9",
                        alt: "Elderly man with gray beard wearing traditional Saudi dress smiling contentedly",
                        verified: true
                    }
                ],
                contactInfo: {
                    phone: "+966 11 234 5678",
                    whatsapp: "+966 50 123 4567",
                    address: "شارع الملك فهد، حي العليا، الرياض 12345، المملكة العربية السعودية",
                    consultationPrice: "200 ريال",
                    workingHours: "السبت - الخميس: 8:00 ص - 10:00 م",
                    rating: 4.8,
                    reviewCount: 342
                },
                location: {
                    lat: 24.7136,
                    lng: 46.6753
                }
            };

            setClinicData(mockData);
            setIsLoading(false);
        };

        fetchClinicData();
    }, [clinicId]);

    const handleBookingClick = (doctor?: Doctor) => {
        if (doctor) {
            setSelectedDoctor(doctor);
        }
        router.push("/contact");
    };

    const handleCloseBookingModal = () => {
        setIsBookingModalOpen(false);
        setSelectedDoctor(null);
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
                            <ContactSidebar
                                contactInfo={clinicData.contactInfo}
                                onBookingClick={() => handleBookingClick()}
                            />
                        </div>
                    </div>
                </motion.div>
            </main>

            {/* Booking Modal */}
            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={handleCloseBookingModal}
                clinicName={clinicData.name}
                doctorName={selectedDoctor?.name}
            />
        </motion.div>
    );
});

ClinicDetails.displayName = 'ClinicDetails';

export default ClinicDetails;
