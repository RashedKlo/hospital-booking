"use client";
import React, { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Icon from '@/components/UI/AppIcon';
import { Clinic } from '@/types/clinic';

interface ClinicCardProps {
  clinic: Clinic;
  searchTerm?: string;
  className?: string;
  index?: number;
}

const ClinicCard = memo(({ clinic, searchTerm = '', className = '', index = 0 }: ClinicCardProps) => {
  const router = useRouter();

  const handleViewDetails = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    router.push(`/clinics/${clinic.id}`);
  }, [router, clinic.id]);

  const handleQuickBook = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    // router.push(`/clinics/${clinic.id}/book`);
  }, []);

  const handleFavorite = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    // Add to favorites logic
  }, []);

  const handleShare = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    // Share logic
  }, []);

  const renderStars = useCallback((rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => {
          if (i < fullStars) {
            return <Icon key={i} name="Star" size={12} color="#FBBF24" />;
          } else if (i === fullStars && hasHalfStar) {
            return <Icon key={i} name="StarHalf" size={12} color="#FBBF24" />;
          } else {
            return <Icon key={i} name="Star" size={12} color="#D1D5DB" />;
          }
        })}
      </div>
    );
  }, []);

  const highlightText = useCallback((text: string, term: string) => {
    if (!term) return text;

    try {
      const regex = new RegExp(`(${term})`, 'gi');
      const parts = text.split(regex);

      return parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded px-1">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      );
    } catch {
      return text;
    }
  }, []);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden group cursor-pointer ${className}`}
      onClick={handleViewDetails}
      role="article"
      aria-label={`عيادة ${clinic.name}`}
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        {clinic.coverImage ? (
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            src={clinic.coverImage}
            alt={clinic.coverImageAlt || clinic.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-blue-500/10">
            <Icon name="Building2" size={48} color="#3B82F6" />
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" aria-hidden="true" />

        {/* Floating Action Buttons */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {clinic.isVerified && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="backdrop-blur-md bg-emerald-500/90 border border-white/30 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg"
            >
              <Icon name="BadgeCheck" size={14} color="white" />
              <span className="text-white text-xs font-bold">معتمدة</span>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavorite}
            aria-label="إضافة للمفضلة"
            className="backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 p-2 rounded-full hover:bg-rose-500 hover:border-rose-500 transition-all shadow-lg"
          >
            <Icon name="Heart" size={16} color="white" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            aria-label="مشاركة العيادة"
            className="backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 p-2 rounded-full hover:bg-blue-500 hover:border-blue-500 transition-all shadow-lg"
          >
            <Icon name="Share2" size={16} color="white" />
          </motion.button>
        </div>

        {/* Floating Rating Badge */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-4 left-4 backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border border-white/50 dark:border-gray-700/50 rounded-xl px-3 py-2 shadow-xl"
        >
          <div className="flex items-center gap-2">
            {renderStars(clinic.rating)}
            <span className="text-sm font-bold text-gray-900 dark:text-white">{clinic.rating.toFixed(1)}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">({clinic.reviewCount})</span>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate leading-tight group-hover:text-primary transition-colors">
              {highlightText(clinic.name, searchTerm)}
            </h3>
          </div>
        </div>

        {/* Specialization & Location */}
        <div className="flex items-center gap-4 flex-wrap">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-sm"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Icon name="Stethoscope" size={18} color="#3B82F6" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">
              {highlightText(clinic.specialization, searchTerm)}
            </span>
          </motion.div>

          <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
            <Icon name="MapPin" size={16} />
            <span>{clinic.region}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {highlightText(clinic.description, searchTerm)}
        </p>

        {/* Services/Languages */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {clinic.languages?.slice(0, 3).map((lang) => (
            <motion.span
              key={lang}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-1 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs px-3 py-1.5 rounded-lg font-medium shadow-sm"
            >
              <Icon name="Globe" size={12} />
              {lang}
            </motion.span>
          ))}
          {clinic.languages && clinic.languages.length > 3 && (
            <span className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs px-3 py-1.5 rounded-lg font-medium">
              +{clinic.languages.length - 3}
            </span>
          )}
        </div>

        {/* Price & Working Hours */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Icon name="DollarSign" size={16} color="#10B981" />
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{clinic.consultationPrice}</span>
          </div>
          {clinic.workingHours && (
            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
              <Icon name="Clock" size={14} />
              <span className="text-xs truncate max-w-[150px]">{clinic.workingHours.split(':')[0]}</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleViewDetails}
            aria-label="عرض التفاصيل"
            className="flex-1 px-4 py-2.5 text-sm font-semibold bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:border-primary dark:hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
          >
            عرض التفاصيل
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleQuickBook}
            aria-label="احجز الآن"
            className="flex-1 px-4 py-2.5 text-sm font-bold bg-gradient-to-r from-primary via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white rounded-xl transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
          >
            احجز الآن
          </motion.button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      </div>
    </motion.article>
  );
});

ClinicCard.displayName = 'ClinicCard';

export default ClinicCard;