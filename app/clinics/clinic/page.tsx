"use client";
import React, { useState, useEffect } from 'react';
import ContactSidebar from '../../../components/UI/ContactSidebar';
import BookingModal from '../../../components/UI/BookingModal';
import ClinicHero from '../../../components/Clinic/components/ClinicHero';
import ClinicInfo from '../../../components/Clinic/components/ClinicInfo';
import DoctorsGrid from '../../../components/Clinic/components/DoctorsGrid';
import TestimonialsSection from '../../../components/Clinic/components/TestimonialsSection';
import LocationMap from '../../../components/Clinic/components/LocationMap';
import Breadcrumb from '../../../components/Clinic/components/Breadcrumb';
import { ClinicDetail, Doctor, BreadcrumbItem } from '../../../components/Clinic/types';
import {  useRouter } from 'next/navigation';

const ClinicDetailPage = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock clinic data
  const clinicData: ClinicDetail = {
    id: "clinic-001",
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
    }],

    facilities: [
    { id: "facility-001", name: "غرف فحص مجهزة", icon: "Building", available: true },
    { id: "facility-002", name: "أجهزة تصوير متطورة", icon: "Camera", available: true },
    { id: "facility-003", name: "مختبر تحاليل", icon: "TestTube", available: true },
    { id: "facility-004", name: "صيدلية", icon: "Pill", available: true },
    { id: "facility-005", name: "موقف سيارات", icon: "Car", available: true },
    { id: "facility-006", name: "واي فاي مجاني", icon: "Wifi", available: true },
    { id: "facility-007", name: "مصعد", icon: "ArrowUp", available: true },
    { id: "facility-008", name: "كافيتيريا", icon: "Coffee", available: false }],

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
    }],

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
    }],

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

  const breadcrumbItems: BreadcrumbItem[] = [
  { label: "الرئيسية", href: "/", isActive: false },
  { label: "العيادات", href: "/clinics-overview", isActive: false },
  { label: clinicData.name, href: "/clinic-detail", isActive: true }];


  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  const router=useRouter();

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="pt-16 flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-arabic-body text-muted-foreground">جاري تحميل بيانات العيادة...</p>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-surface border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <ClinicHero clinic={clinicData} />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6 pb-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Content */}
            <div className="flex-1 space-y-8">
              <ClinicInfo clinic={clinicData} />
              <DoctorsGrid
                doctors={clinicData.doctors}
                onBookingClick={handleBookingClick} />

              <TestimonialsSection testimonials={clinicData.testimonials} />
              <LocationMap clinic={clinicData} />
            </div>

            {/* Right Sidebar */}
            <div className="lg:w-80">
              <ContactSidebar
                contactInfo={clinicData.contactInfo}
                onBookingClick={() => handleBookingClick()} />

            </div>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        clinicName={clinicData.name}
        doctorName={selectedDoctor?.name} />

    </div>);

};

export default ClinicDetailPage;