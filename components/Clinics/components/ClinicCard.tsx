"use client";
import React from 'react';
import { Clinic } from '../types';
import { useRouter } from 'next/navigation';
import Icon from '@/components/UI/AppIcon';

interface ClinicCardProps {
  clinic: Clinic;
  searchTerm?: string;
  className?: string;
}

const ClinicCard = ({ clinic, searchTerm = '', className = '' }: ClinicCardProps) => {
  const router = useRouter();

  const handleViewDetails = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    router.push(`/clinics/clinic`);
  };

  const handleQuickBook = (e: React.MouseEvent) => {
    e.stopPropagation();
    // router.push(`/clinics/${clinic.id}/book`);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, index) => {
          if (index < fullStars) {
            return <Icon key={index} name="Star" size={12} color="#FBBF24" />;
          } else if (index === fullStars && hasHalfStar) {
            return <Icon key={index} name="StarHalf" size={12} color="#FBBF24" />;
          } else {
            return <Icon key={index} name="Star" size={12} color="#D1D5DB" />;
          }
        })}
      </div>
    );
  };

  const highlightText = (text: string, term: string) => {
    if (!term) return text;

    try {
      const regex = new RegExp(`(${term})`, 'gi');
      const parts = text.split(regex);

      return parts.map((part, index) =>
        regex.test(part) ? (
          <mark key={index} className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded px-1">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      );
    } catch {
      return text;
    }
  };

  return (
    <article
      className={`relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300 overflow-hidden group cursor-pointer ${className}`}
      onClick={handleViewDetails}
      role="article"
      aria-label={`عيادة ${clinic.name}`}
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <img
          src={clinic.coverImage}
          alt={clinic.coverImageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" aria-hidden />

        {/* Floating Action Buttons */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {clinic.isVerified && (
            <div className="backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <Icon name="BadgeCheck" size={14} color="#10B981" />
              <span className="text-white text-xs font-medium">معتمدة</span>
            </div>
          )}

          <button
            onClick={(e) => e.stopPropagation()}
            aria-label="إضافة للمفضلة"
            className="backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 p-2 rounded-full hover:bg-white/30 dark:hover:bg-black/30 transition-all shadow-lg"
          >
            <Icon name="Heart" size={16} color="white" />
          </button>

          <button
            onClick={(e) => e.stopPropagation()}
            aria-label="مشاركة العيادة"
            className="backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 p-2 rounded-full hover:bg-white/30 dark:hover:bg-black/30 transition-all shadow-lg"
          >
            <Icon name="Share2" size={16} color="white" />
          </button>
        </div>

        {/* Floating Rating Badge */}
        <div className="absolute bottom-4 left-4 backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border border-white/50 dark:border-gray-700/50 rounded-xl px-3 py-2 shadow-xl">
          <div className="flex items-center gap-2">
            {renderStars(clinic.rating)}
            <span className="text-sm font-bold text-gray-900 dark:text-white">{clinic.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title & Price Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate leading-tight">
              {highlightText(clinic.name, searchTerm)}
            </h3>
          </div>
       
        </div>

        {/* Specialization & Location */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <Icon name="Stethoscope" size={18} color="#3B82F6" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">
              {highlightText(clinic.specialization, searchTerm)}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
            <Icon name="MapPin" size={16} />
            <span>{clinic.region}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {highlightText(clinic.description, searchTerm)}
        </p>

        {/* Languages */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {clinic.languages.slice(0, 3).map((lang) => (
            <span 
              key={lang} 
              className="inline-flex items-center gap-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs px-3 py-1.5 rounded-lg font-medium"
            >
              <Icon name="Globe" size={12} />
              {lang}
            </span>
          ))}
          {clinic.languages.length > 3 && (
            <span className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs px-3 py-1.5 rounded-lg font-medium">
              +{clinic.languages.length - 3}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleViewDetails}
            aria-label="عرض التفاصيل"
            className="flex-1 px-4 py-2.5 text-sm font-semibold bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-750 transition-all"
          >
            عرض التفاصيل
          </button>

          <button
            onClick={handleQuickBook}
            aria-label="احجز الآن"
            className="flex-1 px-4 py-2.5 text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02]"
          >
            احجز الآن
          </button>
        </div>
      </div>
    </article>
  );
};

export default ClinicCard;