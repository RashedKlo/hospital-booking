"use client";
import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ClinicCard from './ClinicCard';
import { Clinic } from '@/types/clinic';
import Icon from '@/components/UI/AppIcon';

interface ClinicGridProps {
  clinics: Clinic[];
  searchTerm?: string;
  viewMode: 'grid' | 'list';
  loading?: boolean;
  className?: string;
}

// Skeleton Component
const ClinicCardSkeleton = memo(({ index }: { index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
    role="status"
    aria-label="جاري التحميل..."
  >
    {/* Image Skeleton */}
    <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse" />

    {/* Content Skeleton */}
    <div className="p-5 space-y-4">
      {/* Title */}
      <div className="space-y-3">
        <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-pulse" />
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded w-2/3 animate-pulse" />
      </div>

      {/* Description Lines */}
      <div className="space-y-2">
        <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-pulse" />
        <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded w-5/6 animate-pulse" />
      </div>

      {/* Tags */}
      <div className="flex gap-2">
        <div className="h-6 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-lg animate-pulse" />
        <div className="h-6 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-lg animate-pulse" />
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-gray-800" />

      {/* Buttons */}
      <div className="flex gap-2">
        <div className="flex-1 h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-xl animate-pulse" />
        <div className="flex-1 h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-xl animate-pulse" />
      </div>
    </div>
  </motion.div>
));

ClinicCardSkeleton.displayName = 'ClinicCardSkeleton';

// Empty State Component
const EmptyState = memo(() => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center justify-center py-16 sm:py-24 px-4"
  >
    {/* Icon with Animation */}
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-full flex items-center justify-center mb-6 shadow-xl"
    >
      <Icon name="Building2" size={48} color="var(--color-primary)" />
    </motion.div>

    {/* Title */}
    <h3 className="font-bold text-xl sm:text-2xl text-gray-900 dark:text-gray-100 mb-3 text-center">
      لم يتم العثور على عيادات
    </h3>

    {/* Description */}
    <p className="text-gray-600 dark:text-gray-300 text-center max-w-md leading-relaxed mb-8 text-sm sm:text-base">
      لم نتمكن من العثور على عيادات تطابق معايير البحث الخاصة بك.
      يرجى تجربة معايير بحث مختلفة أو مسح الفلاتر.
    </p>

    {/* Action Buttons */}
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.location.reload()}
        className="w-full sm:w-auto bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
      >
        إعادة تحميل الصفحة
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {/* Clear filters logic */ }}
        className="w-full sm:w-auto bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 px-6 py-3 rounded-xl transition-all duration-200 font-semibold"
      >
        مسح الفلاتر
      </motion.button>
    </div>

    {/* Help Text */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-8 flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 max-w-md"
    >
      <Icon name="Info" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
      <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
        <strong>نصيحة:</strong> جرب البحث باستخدام كلمات أكثر عمومية أو اختر منطقة أو تخصص مختلف
      </p>
    </motion.div>
  </motion.div>
));

EmptyState.displayName = 'EmptyState';

// Main Component
const ClinicGrid: React.FC<ClinicGridProps> = memo(({
  clinics,
  searchTerm = '',
  viewMode,
  loading = false,
  className = ''
}) => {

  // Loading Skeleton
  if (loading) {
    return (
      <div className={`${viewMode === 'grid'
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'
        : 'space-y-4'
        } ${className}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <ClinicCardSkeleton key={index} index={index} />
        ))}
      </div>
    );
  }

  // Empty State
  if (clinics.length === 0) {
    return <EmptyState />;
  }

  // Clinics Grid
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`${viewMode === 'grid'
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'
        : 'flex flex-col space-y-4'
        } ${className}`}
      role="list"
      aria-label="قائمة العيادات الطبية"
    >
      <AnimatePresence mode="popLayout">
        {clinics.map((clinic, index) => (
          <ClinicCard
            key={clinic.id}
            clinic={clinic}
            searchTerm={searchTerm}
            index={index}
            className={viewMode === 'list' ? 'flex-row' : ''}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
});

ClinicGrid.displayName = 'ClinicGrid';

export default ClinicGrid;