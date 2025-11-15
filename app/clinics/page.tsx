"use client"
import React, { useState, useMemo, useEffect } from 'react';
import PageHeader from '../../components/Clinics/components/PageHeader';
import FilterPanel from '../../components/Clinics/components/FilterPanel';
import SortControls from '../../components/Clinics/components/SortControls';
import ClinicGrid from '../../components/Clinics/components/ClinicGrid';
import { Clinic, FilterOptions } from '../../components/Clinics/types';

const ClinicsOverview = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    region: '',
    specialization: '',
    minRating: 0,
    searchTerm: ''
  });

  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);

  // Mock clinics data
  const mockClinics: Clinic[] = [
    {
      id: '1',
      name: 'عيادة الدكتور أحمد للقلب',
      specialization: 'أمراض القلب',
      region: 'الرياض',
      rating: 4.8,
      reviewCount: 156,
      description: 'عيادة متخصصة في أمراض القلب والأوعية الدموية مع أحدث التقنيات الطبية والفحوصات المتقدمة لتشخيص وعلاج جميع أمراض القلب.',
      coverImage: "https://images.unsplash.com/photo-1734787277873-b9b25ec2196d",
      coverImageAlt: 'Modern cardiac clinic interior with medical equipment and comfortable patient seating area',
      consultationPrice: '300 ريال',
      address: 'شارع الملك فهد، حي العليا، الرياض',
      phone: '+966501234567',
      whatsapp: '+966501234567',
      workingHours: 'السبت - الخميس: 8:00 ص - 10:00 م',
      isVerified: true,
      languages: ['العربية', 'الإنجليزية'],
      services: ['تخطيط القلب', 'الموجات فوق الصوتية', 'قسطرة القلب']
    },
    {
      id: '2',
      name: 'مركز الدكتورة فاطمة للجلدية',
      specialization: 'الأمراض الجلدية',
      region: 'جدة',
      rating: 4.9,
      reviewCount: 203,
      description: 'مركز طبي متخصص في علاج الأمراض الجلدية والتجميل الطبي مع استخدام أحدث التقنيات في العلاج والتشخيص.',
      coverImage: "https://images.unsplash.com/photo-1735466002407-78d1dca9c064",
      coverImageAlt: 'Clean dermatology clinic with modern treatment rooms and skincare equipment',
      consultationPrice: '250 ريال',
      address: 'طريق الأمير سلطان، حي الزهراء، جدة',
      phone: '+966502345678',
      whatsapp: '+966502345678',
      workingHours: 'الأحد - الخميس: 9:00 ص - 9:00 م',
      isVerified: true,
      languages: ['العربية', 'الإنجليزية', 'الفرنسية'],
      services: ['علاج الأكزيما', 'إزالة الشامات', 'العلاج بالليزر']
    },
    {
      id: '3',
      name: 'عيادة الدكتور محمد للعظام',
      specialization: 'العظام',
      region: 'الدمام',
      rating: 4.7,
      reviewCount: 89,
      description: 'عيادة متخصصة في جراحة العظام والمفاصل مع خبرة واسعة في علاج الإصابات الرياضية وأمراض المفاصل.',
      coverImage: "",
      coverImageAlt: 'Orthopedic clinic with X-ray viewing area and physical therapy equipment',
      consultationPrice: '350 ريال',
      address: 'شارع الخليج العربي، حي الفيصلية، الدمام',
      phone: '+966503456789',
      workingHours: 'السبت - الأربعاء: 7:00 ص - 11:00 م',
      isVerified: true,
      languages: ['العربية', 'الإنجليزية'],
      services: ['جراحة المفاصل', 'العلاج الطبيعي', 'حقن المفاصل']
    },
    {
      id: '4',
      name: 'مركز الدكتورة سارة لطب الأطفال',
      specialization: 'طب الأطفال',
      region: 'مكة المكرمة',
      rating: 4.6,
      reviewCount: 134,
      description: 'مركز طبي متخصص في رعاية الأطفال من الولادة حتى سن المراهقة مع بيئة مريحة وودودة للأطفال.',
      coverImage: "https://images.unsplash.com/photo-1734172085045-1833b8c4596b",
      coverImageAlt: 'Colorful pediatric clinic with child-friendly decorations and play area',
      consultationPrice: '200 ريال',
      address: 'شارع إبراهيم الخليل، حي العزيزية، مكة المكرمة',
      phone: '+966504567890',
      whatsapp: '+966504567890',
      workingHours: 'يومياً: 8:00 ص - 12:00 ص',
      isVerified: true,
      languages: ['العربية', 'الإنجليزية'],
      services: ['فحص دوري', 'تطعيمات', 'علاج الحساسية']
    },
    {
      id: '5',
      name: 'عيادة الدكتورة نورا للنساء والولادة',
      specialization: 'النساء والولادة',
      region: 'المدينة المنورة',
      rating: 4.8,
      reviewCount: 167,
      description: 'عيادة متخصصة في صحة المرأة والولادة مع فريق طبي متميز وأحدث الأجهزة الطبية.',
      coverImage: "",
      coverImageAlt: 'Modern gynecology clinic with comfortable examination rooms and ultrasound equipment',
      consultationPrice: '280 ريال',
      address: 'طريق قباء، حي قربان، المدينة المنورة',
      phone: '+966505678901',
      whatsapp: '+966505678901',
      workingHours: 'السبت - الخميس: 9:00 ص - 10:00 م',
      isVerified: true,
      languages: ['العربية', 'الإنجليزية'],
      services: ['متابعة الحمل', 'الموجات فوق الصوتية', 'جراحة نسائية']
    },
    {
      id: '6',
      name: 'مركز الدكتور خالد للأعصاب',
      specialization: 'الأعصاب',
      region: 'الرياض',
      rating: 4.5,
      reviewCount: 78,
      description: 'مركز متخصص في علاج أمراض الجهاز العصبي والدماغ مع استخدام أحدث تقنيات التشخيص والعلاج.',
      coverImage: "",
      coverImageAlt: 'Neurology clinic with brain imaging equipment and consultation rooms',
      consultationPrice: '400 ريال',
      address: 'طريق الملك عبدالعزيز، حي المربع، الرياض',
      phone: '+966506789012',
      workingHours: 'الأحد - الخميس: 8:00 ص - 8:00 م',
      isVerified: true,
      languages: ['العربية', 'الإنجليزية', 'الألمانية'],
      services: ['تخطيط الدماغ', 'الرنين المغناطيسي', 'علاج الصرع']
    },

  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Filter and sort clinics
  const filteredAndSortedClinics = useMemo(() => {
    let filtered = mockClinics.filter((clinic) => {
      const matchesRegion = !filters.region || clinic.region === filters.region;
      const matchesSpecialization = !filters.specialization || clinic.specialization === filters.specialization;
      const matchesRating = clinic.rating >= filters.minRating;
      const matchesSearch = !filters.searchTerm ||
        clinic.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        clinic.specialization.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        clinic.description.toLowerCase().includes(filters.searchTerm.toLowerCase());

      return matchesRegion && matchesSpecialization && matchesRating && matchesSearch;
    });

    // Sort clinics
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name, 'ar');
        case 'price-low':
          return parseInt(a.consultationPrice) - parseInt(b.consultationPrice);
        case 'price-high':
          return parseInt(b.consultationPrice) - parseInt(a.consultationPrice);
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        case 'newest':
          return 0; // In real app, would sort by date
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters, sortBy]);

  return (
    <>
      <header>
        <title>العيادات الطبية المتخصصة - النور الطبية</title>
        <meta name="description" content="اكتشف أفضل العيادات الطبية المتخصصة في المملكة العربية السعودية. احجز موعدك الآن مع أفضل الأطباء." />
        <meta name="keywords" content="عيادات طبية، أطباء، حجز موعد، الرياض، جدة، الدمام" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </header>

      <div className="min-h-screen bg-background" dir="rtl">
        <main className="pt-16 md:pt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
            {/* Page Header */}
            <PageHeader
              totalClinics={mockClinics.length}
              className="mb-6 sm:mb-8"
            />

            {/* Main Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Filter Sidebar */}
              <aside className="lg:col-span-3">
                <FilterPanel
                  filters={filters}
                  onFiltersChange={setFilters}
                  totalResults={filteredAndSortedClinics.length}
                  className="lg:sticky lg:top-24"
                />
              </aside>

              {/* Main Content */}
              <div className="lg:col-span-9 space-y-4 sm:space-y-6">
                {/* Sort Controls */}
                <SortControls
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                />

                {/* Results Summary - Mobile */}
                <div className="block lg:hidden">
                  <div className="bg-surface rounded-clinical medical-card-elevation-1 p-4">
                    <p className="font-arabic-body text-sm text-muted-foreground text-center">
                      عرض <span className="font-semibold text-foreground">{filteredAndSortedClinics.length}</span> من أصل <span className="font-semibold text-foreground">{mockClinics.length}</span> عيادة
                    </p>
                  </div>
                </div>

                {/* Clinics Grid */}
                <ClinicGrid
                  clinics={filteredAndSortedClinics}
                  searchTerm={filters.searchTerm}
                  viewMode={viewMode}
                  loading={loading}
                />

                {/* Pagination Placeholder */}
                {!loading && filteredAndSortedClinics.length > 0 && (
                  <div className="flex justify-center items-center space-x-2 space-x-reverse pt-6">
                    <button className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-clinical-sm font-arabic-body text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                      السابق
                    </button>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button className="w-10 h-10 bg-primary text-white rounded-clinical-sm font-arabic-data text-sm">
                        1
                      </button>
                      <button className="w-10 h-10 bg-muted hover:bg-muted/80 rounded-clinical-sm font-arabic-data text-sm transition-colors">
                        2
                      </button>
                      <button className="w-10 h-10 bg-muted hover:bg-muted/80 rounded-clinical-sm font-arabic-data text-sm transition-colors">
                        3
                      </button>
                    </div>
                    <button className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-clinical-sm font-arabic-body text-sm transition-colors">
                      التالي
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom CTA Section */}
            {!loading && filteredAndSortedClinics.length > 0 && (
              <div className="mt-12 sm:mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-clinical p-6 sm:p-8 text-center">
                <h2 className="font-arabic-heading font-bold text-xl sm:text-2xl text-foreground mb-3">
                  لم تجد ما تبحث عنه؟
                </h2>
                <p className="font-arabic-body text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                  يمكنك التواصل معنا مباشرة وسنساعدك في إيجاد العيادة المناسبة لاحتياجاتك الطبية
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  <button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-clinical font-arabic-body transition-colors">
                    تواصل معنا
                  </button>
                  <button className="w-full sm:w-auto bg-white hover:bg-gray-50 text-primary border-2 border-primary px-6 py-3 rounded-clinical font-arabic-body transition-colors">
                    طلب استشارة مجانية
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default ClinicsOverview;