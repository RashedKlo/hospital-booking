"use client"
import React, { useState, useCallback, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/Clinics/PageHeader';
import FilterPanel from '@/components/Clinics/FilterPanel';
import SortControls from '@/components/Clinics/SortControls';
import ClinicGrid from '@/components/Clinics/ClinicGrid';
import { Clinic, FilterOptions, SortParams } from '@/types/clinic';
import { API_CONFIG } from '@/config/api.config';

// --- Component ---

const ClinicsOverview = memo(() => {
  // State
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [filters, setFilters] = useState<FilterOptions>({
    region: '',
    specialization: '',
    minRating: 0,
    searchTerm: ''
  });

  const [sortBy, setSortBy] = useState<SortParams>({
    sortBy: 'rating',
    order: 'desc'
  });

  // Fetch Data
  const fetchClinics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      queryParams.append('Page', page.toString());
      queryParams.append('Limit', limit.toString());
      if (filters.searchTerm) queryParams.append('SearchQuery', filters.searchTerm);
      if (filters.minRating > 0) queryParams.append('MinRating', filters.minRating.toString());
      if (filters.region) queryParams.append('Address', filters.region);

      // Add sorting parameters
      queryParams.append('SortBy', sortBy.sortBy);
      queryParams.append('IsDescending', (sortBy.order === 'desc').toString());

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CLINICS.LIST}?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch clinics: ${response.statusText}`);
      }


      const responseData = await response.json();
      console.log('Clinics data:', responseData);

      if (responseData.success && responseData.data) {
        const { clinics: apiClinics, pagination } = responseData.data;

        // Map API response to UI model
        const mappedClinics = apiClinics.map((apiClinic: any) => ({
          id: apiClinic.clinicId.toString(),
          name: apiClinic.name || 'عيادة',
          specialization: 'عيادة طبية', // Could map from a field if available
          region: apiClinic.address?.split(' - ')[0] || 'المملكة', // Try to extract region from address
          rating: apiClinic.rating || 0,
          reviewCount: apiClinic.reviewCount || 0,
          description: apiClinic.description || '',
          coverImage: apiClinic.imageUrl || '/images/placeholder-clinic.jpg',
          coverImageAlt: apiClinic.name || 'Clinic Image',
          consultationPrice: '100 ر.س', // Placeholder
          address: apiClinic.address || '',
          phone: apiClinic.phone || '',
          whatsapp: apiClinic.phone || '', // Use phone as WhatsApp placeholder
          workingHours: apiClinic.openingHours || 'غير محدد',
          isVerified: true,
          languages: ['العربية', 'English'], // Mock
          services: [], // Services usually not in list response
        }));

        setClinics(mappedClinics);
        setTotalPages(pagination.totalPages);
      } else {
        throw new Error(responseData.message || 'Failed to fetch clinics');
      }

    } catch (err) {
      console.error('Error fetching clinics:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setClinics([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [page, limit, filters.searchTerm, filters.minRating, filters.region, sortBy]);

  // Initial Fetch & Refetch on dependencies change
  useEffect(() => {
    fetchClinics();
  }, [fetchClinics]);

  // Handlers
  const handleFiltersChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page
  }, []);

  const handleSortChange = useCallback((newSort: string) => {
    setSortBy({ sortBy: newSort as any, order: 'desc' });
    setPage(1);
  }, []);

  const handleViewModeChange = useCallback((mode: 'grid' | 'list') => {
    setViewMode(mode);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleRetry = useCallback(() => {
    fetchClinics();
  }, [fetchClinics]);

  const handleResetFilters = useCallback(() => {
    setFilters({ region: '', specialization: '', minRating: 0, searchTerm: '' });
    setPage(1);
  }, []);

  const totalClinics = clinics.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-950"
      dir="rtl"
    >
      <main className="pt-20 md:pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
          {/* Page Header */}
          <PageHeader
            totalClinics={totalClinics}
            className="mb-6 sm:mb-8"
          />

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4"
            >
              <p className="text-red-600 dark:text-red-400 text-center">
                حدث خطأ أثناء تحميل العيادات. يرجى المحاولة مرة أخرى.
              </p>
              <button
                onClick={handleRetry}
                className="mt-2 mx-auto block px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                إعادة المحاولة
              </button>
            </motion.div>
          )}

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Filter Sidebar */}
            <aside className="lg:col-span-3">
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                totalResults={totalClinics}
                className="lg:sticky lg:top-24"
              />
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-9 space-y-4 sm:space-y-6">
              {/* Sort Controls */}
              <SortControls
                sortBy={sortBy.sortBy}
                onSortChange={handleSortChange}
                viewMode={viewMode}
                onViewModeChange={handleViewModeChange}
              />

              {/* Results Summary - Mobile */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="block lg:hidden"
              >
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 shadow-sm">
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    عرض <span className="font-bold text-primary">{clinics.length}</span> عيادة
                  </p>
                </div>
              </motion.div>

              {/* Clinics Grid */}
              <ClinicGrid
                clinics={clinics}
                searchTerm={filters.searchTerm || ''}
                viewMode={viewMode}
                loading={loading}
              />

              {/* Pagination */}
              {!loading && clinics.length > 0 && totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center items-center gap-2 pt-6"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(page - 1)}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={page === 1}
                  >
                    السابق
                  </motion.button>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNum = i + 1;
                      if (totalPages > 5 && page > 3) {
                        pageNum = page - 2 + i;
                      }
                      if (pageNum > totalPages) return null;

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-10 h-10 rounded-xl text-sm font-semibold transition-colors ${page === pageNum
                            ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg'
                            : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(page + 1)}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={page === totalPages}
                  >
                    التالي
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Bottom CTA Section */}
          {!loading && clinics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 sm:mt-16 bg-gradient-to-r from-primary/10 via-blue-500/10 to-indigo-500/10 dark:from-primary/5 dark:via-blue-500/5 dark:to-indigo-500/5 rounded-2xl p-6 sm:p-8 text-center border border-primary/20 dark:border-primary/10"
            >
              <h2 className="font-bold text-xl sm:text-2xl text-gray-900 dark:text-white mb-3">
                لم تجد ما تبحث عنه؟
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto leading-relaxed">
                يمكنك التواصل معنا مباشرة وسنساعدك في إيجاد العيادة المناسبة لاحتياجاتك الطبية
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  تواصل معنا
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-primary dark:text-blue-400 border-2 border-primary dark:border-blue-500 px-6 py-3 rounded-xl font-semibold transition-all"
                >
                  طلب استشارة مجانية
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* No Results Message */}
          {!loading && clinics.length === 0 && !error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  لا توجد نتائج
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  لم نتمكن من العثور على عيادات. جرب تعديل الفلاتر أو التحقق من الاتصال بالخادم.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-3 bg-primary hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors"
                >
                  إعادة تعيين الفلاتر
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </motion.div>
  );
});

ClinicsOverview.displayName = 'ClinicsOverview';

export default ClinicsOverview;