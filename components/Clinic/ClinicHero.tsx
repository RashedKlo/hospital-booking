"use client";
import React from "react";
import { ClinicDetail } from "@/types/clinic";
import Icon from "@/components/UI/AppIcon";

interface ClinicHeroProps {
  clinic: ClinicDetail;
  className?: string;
}

const ClinicHero = ({ clinic, className = "" }: ClinicHeroProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={20}
        color={index < Math.floor(rating) ? "#F59E0B" : "#E5E7EB"}
        className={`rating-star ${index < Math.floor(rating) ? "text-warning" : "text-border"
          }`}
      />
    ));
  };

  return (
    <div
      dir="rtl"
      className={`relative h-96 lg:h-[500px] overflow-hidden rounded-clinical ${className}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={clinic.coverImage}
          alt={clinic.coverAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-end">
        <div className="w-full p-6 lg:p-8">
          <div className="max-w-4xl text-right">
            {/* Clinic Name */}
            <h1 className="font-arabic-heading font-bold text-3xl lg:text-4xl text-white mb-2">
              {clinic.name}
            </h1>

            {/* Primary Specialty */}
            <div className="flex  items-center space-x-2 space-x-reverse mb-4">
              <div className="w-8 h-8 bg-primary/20 rounded-clinical-sm flex items-center justify-center">
                <Icon name="Stethoscope" size={16} color="white" />
              </div>
              <span className="font-arabic-body font-medium text-lg text-white/90">
                {clinic.primarySpecialty}
              </span>
            </div>

            {/* Rating */}
            <div className="flex  items-center space-x-3 space-x-reverse">
              <div className="flex  items-center space-x-1 space-x-reverse">
                {renderStars(clinic.rating)}
              </div>
              <span className="font-arabic-data font-semibold text-lg text-white">
                {clinic.rating.toFixed(1)}
              </span>
              <span className="font-arabic-caption text-sm text-white/80">
                ({clinic.reviewCount} تقييم)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent"></div>
    </div>
  );
};

export default ClinicHero;
