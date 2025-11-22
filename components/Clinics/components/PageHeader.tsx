"use client";
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/UI/AppIcon';

interface PageHeaderProps {
  totalClinics: number;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = memo(({ totalClinics, className = '' }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.header
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`relative bg-gradient-to-r from-primary via-blue-600 to-blue-700 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 text-white rounded-2xl shadow-2xl shadow-primary/20 p-6 sm:p-8 md:p-10 overflow-hidden ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Decorative Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Main Title Section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mb-6"
        >
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 12 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 sm:w-20 sm:h-20 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl cursor-pointer"
          >
            <Icon name="Building2" size={36} color="white" />
          </motion.div>

          {/* Title & Subtitle */}
          <div className="flex-1">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-2 leading-tight">
              العيادات الطبية المتخصصة
            </h1>

            <p className="text-base sm:text-lg opacity-95 leading-relaxed max-w-2xl">
              اكتشف أفضل العيادات الطبية المستقلة واحجز موعدك بسهولة مع أطباء متخصصين
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6"
        >
          {[
            { icon: 'MapPin', text: 'جميع أنحاء المملكة' },
            { icon: 'Clock', text: 'حجز فوري 24/7' },
            { icon: 'BadgeCheck', text: 'عيادات معتمدة' },
            { icon: 'UserCheck', text: 'أطباء متخصصون' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2.5 rounded-xl hover:bg-white/20 transition-all cursor-pointer"
            >
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={feature.icon as any} size={16} color="white" />
              </div>
              <span className="text-sm font-medium truncate">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={itemVariants}
          className="border-t border-white/20 pt-5"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Clinics Count */}
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center"
              >
                <span className="font-black text-2xl">{totalClinics}</span>
              </motion.div>
              <div>
                <p className="text-sm font-bold">عيادة مستقلة</p>
                <p className="text-xs opacity-80">متاحة للحجز الآن</p>
              </div>
            </div>

            {/* Info Badge */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-start gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2.5 rounded-xl max-w-xs"
            >
              <Icon name="Info" size={16} color="white" className="flex-shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed">
                كل عيادة مستقلة بأطبائها وتخصصها الخاص، مما يضمن لك رعاية طبية متخصصة
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-wrap gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm bg-white dark:bg-gray-100 text-primary hover:bg-white/95 px-5 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-xl font-bold flex items-center gap-2"
          >
            <Icon name="Calendar" size={16} />
            <span>احجز الآن</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-5 py-2.5 rounded-xl transition-all font-semibold flex items-center gap-2"
          >
            <Icon name="Phone" size={16} />
            <span>اتصل بنا</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.header>
  );
});

PageHeader.displayName = 'PageHeader';

export default PageHeader;