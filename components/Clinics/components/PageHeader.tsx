"use client";
import Icon from '@/components/UI/AppIcon';
import React from 'react';

interface PageHeaderProps {
  totalClinics: number;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ totalClinics, className = '' }) => {
  return (
    <header className={`relative bg-gradient-to-r from-primary via-primary/95 to-secondary dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 text-white rounded-clinical medical-card-elevation-3 p-6 sm:p-8 md:p-10 overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Decorative Elements */}
  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 dark:bg-white/3 rounded-full blur-3xl" />
  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 dark:bg-white/3 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10">
        {/* Main Title Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-5 sm:space-x-reverse mb-6">
          {/* Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/15 dark:bg-white/10 backdrop-blur-md rounded-clinical-lg flex items-center justify-center shadow-xl group hover:scale-110 transition-transform duration-300">
            <Icon name="Building2" size={36} color="white" className="group-hover:rotate-12 transition-transform duration-300" />
          </div>
          
          {/* Title & Subtitle */}
          <div className="flex-1">
            <h1 className="font-arabic-heading font-black text-2xl sm:text-3xl md:text-4xl mb-2 leading-tight">
              العيادات الطبية المتخصصة
            </h1>
            
            <p className="font-arabic-body text-base sm:text-lg opacity-95 leading-relaxed max-w-2xl">
              اكتشف أفضل العيادات الطبية المستقلة واحجز موعدك بسهولة مع أطباء متخصصين
            </p>
          </div>
        </div>
        
        {/* Features Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="flex items-center space-x-2 space-x-reverse bg-white/10 dark:bg-white/5 backdrop-blur-sm px-3 py-2.5 rounded-clinical hover:bg-white/15 dark:hover:bg-white/10 transition-colors">
            <div className="w-8 h-8 bg-white/20 rounded-clinical-sm flex items-center justify-center flex-shrink-0">
              <Icon name="MapPin" size={16} color="white" />
            </div>
            <span className="font-arabic-body text-sm font-medium">
              جميع أنحاء المملكة
            </span>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse bg-white/10 dark:bg-white/5 backdrop-blur-sm px-3 py-2.5 rounded-clinical hover:bg-white/15 dark:hover:bg-white/10 transition-colors">
            <div className="w-8 h-8 bg-white/20 rounded-clinical-sm flex items-center justify-center flex-shrink-0">
              <Icon name="Clock" size={16} color="white" />
            </div>
            <span className="font-arabic-body text-sm font-medium">
              حجز فوري 24/7
            </span>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse bg-white/10 dark:bg-white/5 backdrop-blur-sm px-3 py-2.5 rounded-clinical hover:bg-white/15 dark:hover:bg-white/10 transition-colors">
            <div className="w-8 h-8 bg-white/20 rounded-clinical-sm flex items-center justify-center flex-shrink-0">
              <Icon name="BadgeCheck" size={16} color="white" />
            </div>
            <span className="font-arabic-body text-sm font-medium">
              عيادات معتمدة
            </span>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse bg-white/10 dark:bg-white/5 backdrop-blur-sm px-3 py-2.5 rounded-clinical hover:bg-white/15 dark:hover:bg-white/10 transition-colors">
            <div className="w-8 h-8 bg-white/20 rounded-clinical-sm flex items-center justify-center flex-shrink-0">
              <Icon name="UserCheck" size={16} color="white" />
            </div>
            <span className="font-arabic-body text-sm font-medium">
              أطباء متخصصون
            </span>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="border-t border-white/20 dark:border-white/10 pt-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Clinics Count */}
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-clinical flex items-center justify-center">
                  <span className="font-arabic-data font-black text-2xl">
                    {totalClinics}
                  </span>
                </div>
                <div>
                  <p className="font-arabic-body text-sm font-bold">
                    عيادة مستقلة
                  </p>
                  <p className="font-arabic-caption text-xs opacity-80">
                    متاحة للحجز الآن
                  </p>
                </div>
              </div>
            </div>
            
            {/* Info Badge */}
            <div className="flex items-start space-x-2 space-x-reverse bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10 px-4 py-2.5 rounded-clinical">
              <Icon name="Info" size={16} color="white" className="flex-shrink-0 mt-0.5" />
              <p className="font-arabic-caption text-xs leading-relaxed max-w-xs">
                كل عيادة مستقلة بأطبائها وتخصصها الخاص، مما يضمن لك رعاية طبية متخصصة
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="font-arabic-body text-sm bg-white dark:bg-gray-100 text-primary hover:bg-white/95 px-5 py-2.5 rounded-clinical transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl font-bold flex items-center space-x-2 space-x-reverse">
            <Icon name="Calendar" size={16} />
            <span>احجز الآن</span>
          </button>
          
          <button className="font-arabic-body text-sm bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/10 text-white px-5 py-2.5 rounded-clinical transition-all duration-200 hover:scale-[1.02] font-semibold flex items-center space-x-2 space-x-reverse">
            <Icon name="Phone" size={16} />
            <span>اتصل بنا</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;