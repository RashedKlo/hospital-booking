"use client";
import React, { useState, useEffect, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FilterOptions, RegionOption, SpecializationOption } from '../types';
import Icon from '@/components/UI/AppIcon';

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  totalResults: number;
  className?: string;
}

// Constants
const REGION_OPTIONS: RegionOption[] = [
  { value: '', label: 'جميع المناطق' },
  { value: 'الرياض', label: 'الرياض' },
  { value: 'جدة', label: 'جدة' },
  { value: 'الدمام', label: 'الدمام' },
  { value: 'مكة المكرمة', label: 'مكة المكرمة' },
  { value: 'المدينة المنورة', label: 'المدينة المنورة' },
];

const SPECIALIZATION_OPTIONS: SpecializationOption[] = [
  { value: '', label: 'جميع التخصصات' },
  { value: 'أمراض القلب', label: '❤️ أمراض القلب' },
  { value: 'الأمراض الجلدية', label: '🧴 الأمراض الجلدية' },
  { value: 'العظام', label: '🦴 العظام' },
  { value: 'طب الأطفال', label: '👶 طب الأطفال' },
  { value: 'النساء والولادة', label: '🤰 النساء والولادة' },
  { value: 'الأعصاب', label: '🧠 الأعصاب' },
];

const RATING_OPTIONS = [
  { value: 0, label: 'جميع التقييمات' },
  { value: 3, label: '3 نجوم فأكثر ⭐⭐⭐' },
  { value: 4, label: '4 نجوم فأكثر ⭐⭐⭐⭐' },
  { value: 4.5, label: '4.5 نجوم فأكثر ⭐⭐⭐⭐⭐' }
];

// Sub-components
const MobileToggle = memo(({
  isExpanded,
  activeFilterCount,
  onToggle
}: {
  isExpanded: boolean;
  activeFilterCount: number;
  onToggle: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="md:hidden p-4 border-b border-gray-100 dark:border-gray-800"
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-primary transition-colors"
      aria-expanded={isExpanded}
    >
      <div className="flex items-center gap-2">
        <Icon name="SlidersHorizontal" size={20} />
        <span className="font-semibold">
          {isExpanded ? 'إخفاء الفلاتر' : 'إظهار الفلاتر'}
        </span>
        {activeFilterCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full"
          >
            {activeFilterCount}
          </motion.span>
        )}
      </div>
      <motion.div
        animate={{ rotate: isExpanded ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <Icon name="ChevronDown" size={20} />
      </motion.div>
    </button>
  </motion.div>
));

MobileToggle.displayName = 'MobileToggle';

const FilterHeader = memo(({
  activeFilterCount,
  hasActiveFilters,
  onClearAll
}: {
  activeFilterCount: number;
  hasActiveFilters: boolean;
  onClearAll: () => void;
}) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
      <motion.div
        whileHover={{ scale: 1.05, rotate: 5 }}
        className="w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl flex items-center justify-center shadow-sm"
      >
        <Icon name="Filter" size={18} color="#3B82F6" />
      </motion.div>
      <div>
        <h2 className="font-bold text-lg text-gray-900 dark:text-white">
          تصفية النتائج
        </h2>
        {activeFilterCount > 0 && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-gray-500 dark:text-gray-400"
          >
            {activeFilterCount} فلتر نشط
          </motion.p>
        )}
      </div>
    </div>

    {hasActiveFilters && (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClearAll}
        className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 text-sm font-semibold flex items-center gap-1 group"
        aria-label="مسح جميع الفلاتر"
      >
        <motion.div
          whileHover={{ rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          <Icon name="X" size={14} />
        </motion.div>
        <span>مسح الكل</span>
      </motion.button>
    )}
  </div>
));

FilterHeader.displayName = 'FilterHeader';

const ResultsCounter = memo(({ totalResults }: { totalResults: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.02 }}
    className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 border border-blue-100 dark:border-gray-700 rounded-xl shadow-sm"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon name="Building2" size={18} color="#3B82F6" />
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-bold text-primary text-lg">{totalResults}</span>
          <span className="mr-1">عيادة متاحة</span>
        </p>
      </div>
      {totalResults > 0 && (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 bg-emerald-500 rounded-full"
        />
      )}
    </div>
  </motion.div>
));

ResultsCounter.displayName = 'ResultsCounter';

const SearchInput = memo(({
  value,
  onChange
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="mb-6">
    <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
      <Icon name="Search" size={16} />
      <span>البحث السريع</span>
    </label>
    <div className="relative">
      <input
        type="search"
        placeholder="ابحث عن العيادة أو التخصص..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 pr-11 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:border-primary dark:focus:border-primary rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 dark:focus:ring-primary/20 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <Icon name="Search" size={18} color="#9CA3AF" />
      </div>
      <AnimatePresence>
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onChange('')}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            aria-label="مسح البحث"
          >
            <Icon name="X" size={14} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  </div>
));

SearchInput.displayName = 'SearchInput';

const FilterSelect = memo(({
  id,
  label,
  icon,
  value,
  options,
  onChange
}: {
  id: string;
  label: string;
  icon: string;
  value: string | number;
  options: Array<{ value: string | number; label: string }>;
  onChange: (value: string) => void;
}) => (
  <div>
    <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
      <Icon name={icon as any} size={16} />
      <span>{label}</span>
    </label>
    <select
      id={`${id}-select`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 focus:border-primary dark:focus:border-primary rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 dark:focus:ring-primary/20 bg-white dark:bg-gray-800 dark:text-gray-100 transition-all cursor-pointer hover:border-gray-300 dark:hover:border-gray-600"
      aria-label={label}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
));

FilterSelect.displayName = 'FilterSelect';

// Main Component
const FilterPanel: React.FC<FilterPanelProps> = memo(({
  filters,
  onFiltersChange,
  totalResults,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // Handle side effects
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    const handleScroll = () => setIsSticky(window.scrollY > 100);

    // Initial check
    handleResize();
    handleScroll();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Helper functions
  const getActiveFilterCount = useCallback(() => {
    return [
      filters.region,
      filters.specialization,
      filters.minRating > 0,
      filters.searchTerm
    ].filter(Boolean).length;
  }, [filters]);

  const hasActiveFilters = getActiveFilterCount() > 0;
  const activeFilterCount = getActiveFilterCount();

  const handleFilterChange = useCallback((key: keyof FilterOptions, value: string | number) => {
    onFiltersChange({ ...filters, [key]: value });
  }, [filters, onFiltersChange]);

  const clearAllFilters = useCallback(() => {
    onFiltersChange({
      region: '',
      specialization: '',
      minRating: 0,
      searchTerm: ''
    });

    if (!isDesktop) {
      setIsExpanded(false);
    }
  }, [onFiltersChange, isDesktop]);

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 transition-all duration-300 ${isSticky ? 'shadow-lg' : 'shadow-sm'
        } ${className}`}
    >
      {/* Mobile Toggle */}
      <MobileToggle
        isExpanded={isExpanded}
        activeFilterCount={activeFilterCount}
        onToggle={() => setIsExpanded(!isExpanded)}
      />

      {/* Filter Content */}
      <AnimatePresence>
        {(isExpanded || isDesktop) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden md:!h-auto md:!opacity-100"
          >
            <div className="p-6">
              {/* Header */}
              <FilterHeader
                activeFilterCount={activeFilterCount}
                hasActiveFilters={hasActiveFilters}
                onClearAll={clearAllFilters}
              />

              {/* Results Counter */}
              <ResultsCounter totalResults={totalResults} />

              {/* Search Input */}
              <SearchInput
                value={filters.searchTerm}
                onChange={(value) => handleFilterChange('searchTerm', value)}
              />

              {/* Filter Options */}
              <div className="space-y-5">
                <FilterSelect
                  id="region"
                  label="المنطقة"
                  icon="MapPin"
                  value={filters.region}
                  options={REGION_OPTIONS}
                  onChange={(value) => handleFilterChange('region', value)}
                />

                <FilterSelect
                  id="specialization"
                  label="التخصص الطبي"
                  icon="Stethoscope"
                  value={filters.specialization}
                  options={SPECIALIZATION_OPTIONS}
                  onChange={(value) => handleFilterChange('specialization', value)}
                />

                <FilterSelect
                  id="rating"
                  label="التقييم"
                  icon="Star"
                  value={filters.minRating}
                  options={RATING_OPTIONS}
                  onChange={(value) => handleFilterChange('minRating', Number(value))}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
});

FilterPanel.displayName = 'FilterPanel';

export default FilterPanel;