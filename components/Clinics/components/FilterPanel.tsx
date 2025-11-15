"use client";
import React, { useState, useEffect } from 'react';
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
  { value: 'riyadh', label: 'الرياض' },
  { value: 'jeddah', label: 'جدة' },
  { value: 'dammam', label: 'الدمام' },
  { value: 'mecca', label: 'مكة المكرمة' },
  { value: 'medina', label: 'المدينة المنورة' },
  { value: 'khobar', label: 'الخبر' },
  { value: 'taif', label: 'الطائف' },
  { value: 'tabuk', label: 'تبوك' },
  { value: 'qassim', label: 'القصيم' },
  { value: 'abha', label: 'أبها' },
  { value: 'hail', label: 'حائل' }
];

const SPECIALIZATION_OPTIONS: SpecializationOption[] = [
  { value: '', label: 'جميع التخصصات' },
  { value: 'cardiology', label: '❤️ أمراض القلب' },
  { value: 'dermatology', label: '🧴 الأمراض الجلدية' },
  { value: 'orthopedics', label: '🦴 العظام' },
  { value: 'pediatrics', label: '👶 طب الأطفال' },
  { value: 'gynecology', label: '🤰 النساء والولادة' },
  { value: 'neurology', label: '🧠 الأعصاب' },
  { value: 'ophthalmology', label: '👁️ العيون' },
  { value: 'dentistry', label: '🦷 طب الأسنان' },
  { value: 'ent', label: '👃 الأنف والأذن والحنجرة' },
  { value: 'internal', label: '🩺 الباطنية' },
  { value: 'psychiatry', label: '🧘 الطب النفسي' }
];

const RATING_OPTIONS = [
  { value: 0, label: 'جميع التقييمات' },
  { value: 3, label: '3 نجوم فأكثر ⭐⭐⭐' },
  { value: 4, label: '4 نجوم فأكثر ⭐⭐⭐⭐' },
  { value: 4.5, label: '4.5 نجوم فأكثر ⭐⭐⭐⭐⭐' }
];

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  filters, 
  onFiltersChange, 
  totalResults,
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Sticky scroll handler
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper functions
  const getActiveFilterCount = () => {
    return [
      filters.region,
      filters.specialization,
      filters.minRating > 0,
      filters.searchTerm
    ].filter(Boolean).length;
  };

  const hasActiveFilters = getActiveFilterCount() > 0;
  const activeFilterCount = getActiveFilterCount();

  const handleFilterChange = (key: keyof FilterOptions, value: string | number) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      region: '',
      specialization: '',
      minRating: 0,
      searchTerm: ''
    });
    
    if (window.innerWidth < 768) {
      setIsExpanded(false);
    }
  };

  const getFilterLabel = (type: 'region' | 'specialization', value: string) => {
    const options = type === 'region' ? REGION_OPTIONS : SPECIALIZATION_OPTIONS;
    return options.find(opt => opt.value === value)?.label || '';
  };

  return (
    <aside 
      className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 transition-all duration-300 ${
        isSticky ? 'shadow-lg' : 'shadow-sm'
      } ${className}`}
    >
      {/* Mobile Toggle */}
      <MobileToggle 
        isExpanded={isExpanded}
        activeFilterCount={activeFilterCount}
        onToggle={() => setIsExpanded(!isExpanded)}
      />

      {/* Filter Content */}
      <div className={`transition-all duration-300 overflow-hidden ${!isExpanded ? 'hidden md:block' : 'block'}`}>
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

          {/* Active Filters */}
          {hasActiveFilters && (
            <ActiveFilters 
              filters={filters}
              onRemoveFilter={handleFilterChange}
              getFilterLabel={getFilterLabel}
            />
          )}
        </div>
      </div>
    </aside>
  );
};

// Sub-components
const MobileToggle: React.FC<{
  isExpanded: boolean;
  activeFilterCount: number;
  onToggle: () => void;
}> = ({ isExpanded, activeFilterCount, onToggle }) => (
  <div className="md:hidden p-4 border-b border-gray-100 dark:border-gray-800">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      aria-expanded={isExpanded}
    >
      <div className="flex items-center gap-2">
        <Icon name="SlidersHorizontal" size={20} />
        <span className="font-semibold">
          {isExpanded ? 'إخفاء الفلاتر' : 'إظهار الفلاتر'}
        </span>
        {activeFilterCount > 0 && (
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {activeFilterCount}
          </span>
        )}
      </div>
      <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={20} />
    </button>
  </div>
);

const FilterHeader: React.FC<{
  activeFilterCount: number;
  hasActiveFilters: boolean;
  onClearAll: () => void;
}> = ({ activeFilterCount, hasActiveFilters, onClearAll }) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl flex items-center justify-center">
        <Icon name="Filter" size={18} color="#3B82F6" />
      </div>
      <div>
        <h2 className="font-bold text-lg text-gray-900 dark:text-white">
          تصفية النتائج
        </h2>
        {activeFilterCount > 0 && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {activeFilterCount} فلتر نشط
          </p>
        )}
      </div>
    </div>
    
    {hasActiveFilters && (
      <button
        onClick={onClearAll}
        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-semibold flex items-center gap-1 group"
        aria-label="مسح جميع الفلاتر"
      >
        <Icon name="X" size={14} className="group-hover:rotate-90 transition-transform" />
        <span>مسح الكل</span>
      </button>
    )}
  </div>
);

const ResultsCounter: React.FC<{ totalResults: number }> = ({ totalResults }) => (
  <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 border border-blue-100 dark:border-gray-700 rounded-xl">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon name="Building2" size={18} color="#3B82F6" />
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">{totalResults}</span>
          <span className="mr-1">عيادة متاحة</span>
        </p>
      </div>
      {totalResults > 0 && (
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      )}
    </div>
  </div>
);

const SearchInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => (
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
        className="w-full px-4 py-3 pr-11 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <Icon name="Search" size={18} color="#9CA3AF" />
      </div>
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
          aria-label="مسح البحث"
        >
          <Icon name="X" size={14} />
        </button>
      )}
    </div>
  </div>
);

const FilterSelect: React.FC<{
  id: string;
  label: string;
  icon: string;
  value: string | number;
  options: Array<{ value: string | number; label: string }>;
  onChange: (value: string) => void;
}> = ({ id, label, icon, value, options, onChange }) => (
  <div>
    <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
      <Icon name={icon} size={16} />
      <span>{label}</span>
    </label>
    <select
      id={`${id}-select`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 bg-white dark:bg-gray-800 dark:text-gray-100 transition-all cursor-pointer hover:border-gray-300 dark:hover:border-gray-600"
      aria-label={label}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const ActiveFilters: React.FC<{
  filters: FilterOptions;
  onRemoveFilter: (key: keyof FilterOptions, value: string | number) => void;
  getFilterLabel: (type: 'region' | 'specialization', value: string) => string;
}> = ({ filters, onRemoveFilter, getFilterLabel }) => {
  const activeFilters = [
    { key: 'region', value: filters.region, label: getFilterLabel('region', filters.region), icon: 'MapPin', color: 'blue' },
    { key: 'specialization', value: filters.specialization, label: getFilterLabel('specialization', filters.specialization), icon: 'Stethoscope', color: 'purple' },
    { key: 'minRating', value: filters.minRating > 0, label: `${filters.minRating} نجوم فأكثر`, icon: 'Star', color: 'yellow' },
    { key: 'searchTerm', value: filters.searchTerm, label: `"${filters.searchTerm}"`, icon: 'Search', color: 'green' }
  ].filter(f => f.value);

  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300',
    purple: 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300',
    green: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300'
  };

  return (
    <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-200 dark:border-gray-700">
      <p className="font-bold text-sm text-gray-900 dark:text-white mb-3 flex items-center gap-2">
        <Icon name="Filter" size={14} />
        <span>الفلاتر النشطة:</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter) => (
          <div 
            key={filter.key}
            className={`flex items-center gap-1.5 border px-3 py-2 rounded-lg hover:opacity-80 transition-opacity ${colorClasses[filter.color as keyof typeof colorClasses]}`}
          >
            <Icon name={filter.icon} size={12} />
            <span className="text-xs font-semibold line-clamp-1 max-w-[120px]">
              {filter.label}
            </span>
            <button
              onClick={() => onRemoveFilter(filter.key as keyof FilterOptions, filter.key === 'minRating' ? 0 : '')}
              className="hover:scale-110 transition-transform ml-1"
              aria-label={`إزالة فلتر ${filter.label}`}
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;