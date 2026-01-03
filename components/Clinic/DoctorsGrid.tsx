"use client";
import React, { useState, useCallback } from "react";
import { Doctor } from "@/types/clinic";
import Icon from "@/components/UI/AppIcon";

interface DoctorsGridProps {
  doctors: Doctor[];
  onBookingClick: (doctor: Doctor) => void;
  className?: string;
}

const DoctorsGrid = ({ doctors, onBookingClick, className = "" }: DoctorsGridProps) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = useCallback((doctorId: string) => {
    setLoadedImages(prev => new Set(prev).add(doctorId));
  }, []);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        color={i < Math.floor(rating) ? "#F59E0B" : "#E5E7EB"}
        className={i < Math.floor(rating) ? "text-warning" : "text-border"}
      />
    ));

  const availabilityConfig = {
    available: { text: "متاح", classes: "text-success bg-success/10 border-success/20" },
    busy: { text: "مشغول", classes: "text-warning bg-warning/10 border-warning/20" },
    unavailable: { text: "غير متاح", classes: "text-error bg-error/10 border-error/20" },
    default: { text: "غير محدد", classes: "text-muted-foreground bg-muted border-border" },
  };

  const getAvailability = (status: Doctor["availability"]) =>
    availabilityConfig[status] || availabilityConfig.default;

  return (
    <section
      dir="rtl"
      className={`bg-surface rounded-clinical medical-card-elevation-1 p-6 ${className}`}
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h2 className="font-arabic-heading font-semibold text-xl text-foreground">
          الأطباء المتخصصون
        </h2>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon name="Users" size={16} />
          <span className="font-arabic-caption text-sm">{doctors.length} طبيب</span>
        </div>
      </header>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor, index) => {
          const availability = getAvailability(doctor.availability);
          const isImageLoaded = loadedImages.has(doctor.id);

          return (
            <article
              key={doctor.id}
              style={{
                animationDelay: `${index * 75}ms`,
              }}
              className="bg-muted rounded-clinical medical-card-elevation-1 overflow-hidden 
                hover:shadow-lg hover:-translate-y-1 transition-all duration-300 
                animate-in fade-in slide-in-from-bottom-4"
            >
              {/* Doctor Image */}
              <div className="relative h-48 bg-muted overflow-hidden group">
                {/* Skeleton Loader */}
                {!isImageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted 
                    animate-pulse" />
                )}

                {/* Image */}
                <img
                  src={doctor.image}
                  alt={doctor.alt || doctor.name}
                  loading="lazy"
                  onLoad={() => handleImageLoad(doctor.id)}
                  className={`w-full h-full object-cover transition-all duration-500 
                    group-hover:scale-105 ${isImageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                />

                {/* Availability Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <div
                    className={`px-2 py-1 rounded-clinical-sm border text-xs font-arabic-caption 
                      font-medium backdrop-blur-sm transition-all duration-200 
                      hover:scale-105 ${availability.classes}`}
                  >
                    {availability.text}
                  </div>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent 
                  to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Doctor Info */}
              <div className="p-4 space-y-3">
                {/* Name & Specialty */}
                <header>
                  <h3 className="font-arabic-heading font-semibold text-lg text-foreground mb-1 
                    transition-colors duration-200 hover:text-primary">
                    {doctor.name}
                  </h3>
                  <p className="font-arabic-body text-sm text-primary font-medium">
                    {doctor.specialty}
                  </p>
                </header>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 transition-transform duration-200 
                    hover:scale-110">
                    {renderStars(doctor.rating)}
                  </div>
                  <span className="font-arabic-data font-medium text-sm text-foreground">
                    {doctor.rating.toFixed(1)}
                  </span>
                  <span className="font-arabic-caption text-xs text-muted-foreground">
                    ({doctor.reviewCount})
                  </span>
                </div>

                {/* Experience */}
                <div className="flex items-center gap-2 text-muted-foreground 
                  transition-colors duration-200 hover:text-foreground">
                  <Icon name="Award" size={14} />
                  <span className="font-arabic-caption text-sm">{doctor.experience}</span>
                </div>

                {/* Languages */}
                <div className="flex items-center gap-2 text-muted-foreground 
                  transition-colors duration-200 hover:text-foreground">
                  <Icon name="Globe" size={14} />
                  <span className="font-arabic-caption text-sm">
                    {doctor.languages.join("، ")}
                  </span>
                </div>

                {/* Education */}
                <div className="flex items-start gap-2 text-muted-foreground 
                  transition-colors duration-200 hover:text-foreground">
                  <Icon
                    name="GraduationCap"
                    size={14}
                    className="mt-0.5 flex-shrink-0"
                  />
                  <span className="font-arabic-caption text-sm leading-relaxed">
                    {doctor.education}
                  </span>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <button
                    onClick={() => onBookingClick(doctor)}
                    disabled={doctor.availability === "unavailable"}
                    className={`w-full py-2 rounded-clinical-sm text-sm font-arabic-body 
                      transition-all duration-200 transform active:scale-95
                      ${doctor.availability === "available"
                        ? "bg-primary text-white hover:bg-primary/90 hover:shadow-md"
                        : doctor.availability === "busy"
                          ? "bg-warning/10 text-warning hover:bg-warning/20"
                          : "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                      }`}
                  >
                    {doctor.availability === "available"
                      ? "احجز موعد"
                      : doctor.availability === "busy"
                        ? "قائمة الانتظار"
                        : "غير متاح"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default DoctorsGrid;