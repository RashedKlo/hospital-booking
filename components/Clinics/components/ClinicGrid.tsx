"use client";
import React from 'react';
import ClinicCard from './ClinicCard';
import { Clinic } from '../types';
import Icon from '@/components/UI/AppIcon';

interface ClinicGridProps {
  clinics: Clinic[];
  searchTerm?: string;
  viewMode: 'grid' | 'list';
  loading?: boolean;
  className?: string;
}

const ClinicGrid: React.FC<ClinicGridProps> = ({ 
  clinics, 
  searchTerm = '', 
  viewMode, 
  loading = false,
  className = '' 
}) => {
  
  // Loading Skeleton
  if (loading) {
    return (
      <div className={`${
        viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6' 
          : 'space-y-4'
      } ${className}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div 
            key={index} 
            className="bg-surface dark:bg-gray-800 rounded-clinical medical-card-elevation-1 overflow-hidden"
            role="status"
            aria-label="جاري التحميل..."
          >
            {/* Image Skeleton */}
            <div className="h-48 sm:h-52 bg-gradient-to-r from-muted via-muted/50 to-muted dark:from-gray-700 dark:via-gray-700 dark:to-gray-700 animate-pulse" />
            
            {/* Content Skeleton */}
            <div className="p-5 sm:p-6 space-y-4">
              {/* Title */}
              <div className="space-y-3">
                <div className="h-6 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
                <div className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded w-2/3 animate-pulse" />
                <div className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded w-1/2 animate-pulse" />
              </div>
              
              {/* Description Lines */}
              <div className="space-y-2">
                <div className="h-3 bg-gradient-to-r from-muted via-muted/50 to-muted dark:from-gray-700 dark:via-gray-700 dark:to-gray-700 rounded animate-pulse" />
                <div className="h-3 bg-gradient-to-r from-muted via-muted/50 to-muted dark:from-gray-700 dark:via-gray-700 dark:to-gray-700 rounded w-5/6 animate-pulse" />
              </div>
              
              {/* Tags */}
              <div className="flex gap-2">
                <div className="h-6 w-20 bg-gradient-to-r from-muted via-muted/50 to-muted dark:from-gray-700 dark:via-gray-700 dark:to-gray-700 rounded-clinical-sm animate-pulse" />
                <div className="h-6 w-20 bg-gradient-to-r from-muted via-muted/50 to-muted dark:from-gray-700 dark:via-gray-700 dark:to-gray-700 rounded-clinical-sm animate-pulse" />
              </div>
              
              {/* Footer */}
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <div className="h-8 w-20 bg-gradient-to-r from-muted via-muted/50 to-muted dark:from-gray-700 dark:via-gray-700 dark:to-gray-700 rounded animate-pulse" />
                <div className="h-9 w-24 bg-gradient-to-r from-muted via-muted/50 to-muted dark:from-gray-700 dark:via-gray-700 dark:to-gray-700 rounded-clinical-sm animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty State
  if (clinics.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-16 sm:py-24 px-4 ${className}`}>
        {/* Icon with Animation */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-muted to-muted/50 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <Icon name="Building2" size={48} color="var(--color-muted-foreground)" />
        </div>
        
        {/* Title */}
        <h3 className="font-arabic-heading font-bold text-xl sm:text-2xl text-foreground dark:text-gray-100 mb-3 text-center">
          لم يتم العثور على عيادات
        </h3>
        
        {/* Description */}
        <p className="font-arabic-body text-muted-foreground dark:text-gray-300 text-center max-w-md leading-relaxed mb-8 text-sm sm:text-base">
          لم نتمكن من العثور على عيادات تطابق معايير البحث الخاصة بك. 
          يرجى تجربة معايير بحث مختلفة أو مسح الفلاتر.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button 
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto font-arabic-body bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-clinical transition-all duration-200 hover:scale-[1.02] shadow-sm hover:shadow-md"
          >
            إعادة تحميل الصفحة
          </button>
          
          <button 
            onClick={() => {/* Clear filters logic */}}
            className="w-full sm:w-auto font-arabic-body bg-muted dark:bg-gray-800 hover:bg-muted/80 dark:hover:bg-gray-700 text-foreground dark:text-gray-100 px-6 py-3 rounded-clinical transition-all duration-200 hover:scale-[1.02]"
          >
            مسح الفلاتر
          </button>
        </div>
        
        {/* Help Text */}
        <div className="mt-8 flex items-start space-x-3 space-x-reverse bg-info/10 dark:bg-gray-800 border border-info/20 dark:border-gray-700 rounded-clinical p-4 max-w-md">
          <Icon name="Info" size={20} color="var(--color-info)" className="flex-shrink-0 mt-0.5" />
          <p className="font-arabic-body text-sm text-info leading-relaxed dark:text-gray-200">
            <strong>نصيحة:</strong> جرب البحث باستخدام كلمات أكثر عمومية أو اختر منطقة أو تخصص مختلف
          </p>
        </div>
      </div>
    );
  }

  // Clinics Grid
  return (
    <div 
      className={`${
        viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6' 
          : 'flex flex-col space-y-4'
      } ${className}`}
      role="list"
      aria-label="قائمة العيادات الطبية"
    >
      {clinics.map((clinic, index) => (
        <div
          key={clinic.id}
          role="listitem"
          style={{
            animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
          }}
        >
          <ClinicCard
            clinic={clinic}
            searchTerm={searchTerm}
            className={viewMode === 'list' ? 'flex-row' : ''}
          />
        </div>
      ))}
      
    
    </div>
  );
};

export default ClinicGrid;