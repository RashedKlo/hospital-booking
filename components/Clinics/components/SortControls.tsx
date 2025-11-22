"use client";
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { SortOption } from '../types';
import Icon from '@/components/UI/AppIcon';

interface SortControlsProps {
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  className?: string;
}

const SORT_OPTIONS: SortOption[] = [
  { value: 'rating', label: '⭐ الأعلى تقييماً' },
  { value: 'reviews', label: '💬 الأكثر تقييماً' },
  { value: 'name', label: '🔤 الاسم (أ-ي)' },
  { value: 'price-low', label: '💰 السعر (الأقل أولاً)' },
  { value: 'price-high', label: '💵 السعر (الأعلى أولاً)' },
  { value: 'newest', label: '🆕 الأحدث' }
];

const VIEW_MODES = [
  { mode: 'grid' as const, icon: 'Grid3X3', label: 'شبكي' },
  { mode: 'list' as const, icon: 'List', label: 'قائمة' }
];

const SortControls: React.FC<SortControlsProps> = memo(({
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  className = ''
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shadow-sm hover:shadow-md transition-shadow ${className}`}
      role="region"
      aria-label="عناصر التحكم في الترتيب والعرض"
    >
      {/* Sort Section */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center border border-blue-100 dark:border-blue-800/50 shadow-sm"
        >
          <Icon name="ArrowUpDown" size={18} color="#3B82F6" />
        </motion.div>

        <div className="flex-1 min-w-0">
          <label
            htmlFor="sort-select"
            className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 tracking-wide uppercase"
          >
            ترتيب حسب
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full appearance-none bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-xl px-4 py-2.5 pr-10 text-sm font-semibold text-gray-800 dark:text-gray-100 focus:outline-none focus:border-primary dark:focus:border-primary focus:ring-4 focus:ring-primary/10 dark:focus:ring-primary/20 transition-all cursor-pointer hover:border-gray-200 dark:hover:border-gray-600"
              aria-label="اختر طريقة الترتيب"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <Icon name="ChevronDown" size={16} color="#9CA3AF" />
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-gray-200 dark:via-gray-700 to-transparent" aria-hidden="true" />

      {/* View Mode Section */}
      <div className="flex items-center gap-3">
        <span className="hidden sm:block text-xs font-bold text-gray-500 dark:text-gray-400 tracking-wide uppercase whitespace-nowrap">
          طريقة العرض
        </span>

        <div className="flex items-center bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-1 gap-1">
          {VIEW_MODES.map(({ mode, icon, label }) => {
            const isActive = viewMode === mode;
            return (
              <motion.button
                key={mode}
                onClick={() => onViewModeChange(mode)}
                aria-label={`عرض ${label}`}
                aria-pressed={isActive}
                whileHover={{ scale: isActive ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive
                    ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg shadow-primary/30'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                  }`}
              >
                <Icon name={icon as any} size={16} />
                <span className="hidden sm:inline">{label}</span>

                {isActive && (
                  <motion.div
                    layoutId="activeViewMode"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-blue-600"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
});

SortControls.displayName = 'SortControls';

export default SortControls;