"use client";
import React, { useState, useEffect } from "react";
import Icon from "./AppIcon";

interface ContactInfo {
  phone: string;
  whatsapp?: string;
  address: string;
  consultationPrice: string;
  workingHours: string;
  rating: number;
  reviewCount: number;
}

interface ContactSidebarProps {
  contactInfo: ContactInfo;
  onBookingClick: () => void;
  className?: string;
}

const ContactSidebar = ({
  contactInfo,
  onBookingClick,
  className = "",
}: ContactSidebarProps) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsSticky(scrollTop > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePhoneClick = () => {
    window.location.href = `tel:${contactInfo.phone}`;
  };

  const handleWhatsAppClick = () => {
    if (contactInfo.whatsapp) {
      const message = encodeURIComponent("مرحباً، أود الاستفسار عن موعد في العيادة");
      window.open(
        `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}?text=${message}`,
        "_blank"
      );
    }
  };

  const handleDirectionsClick = () => {
    const encodedAddress = encodeURIComponent(contactInfo.address);
    window.open(`https://maps.google.com/?q=${encodedAddress}`, "_blank");
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        color={index < Math.floor(rating) ? "#FBBF24" : "#E5E7EB"}
        className={`rating-star ${
          index < Math.floor(rating) ? "text-yellow-400" : "text-border"
        }`}
      />
    ));
  };

  return (
    <div dir="rtl" className={`w-full lg:w-80 ${className}`}>
      <div
        className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg p-6 transition-all duration-300 ${
          isSticky ? "lg:fixed lg:top-20 lg:w-80" : "lg:static"
        }`}
        style={{ zIndex: 50 }}
      >
        {/* Header */}
        <div className="flex flex-row-reverse items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Icon name="Phone" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="font-arabic-heading font-semibold text-lg text-foreground">
              معلومات التواصل
            </h3>
            <p className="font-arabic-body text-sm text-muted-foreground">
              للحجز والاستفسارات
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex flex-row-reverse items-center gap-2 mb-4 p-3 bg-muted/50 rounded-xl">
          <div className="flex flex-row-reverse items-center gap-1">
            {renderStars(contactInfo.rating)}
          </div>
          <span className="font-arabic-data font-medium text-sm text-foreground">
            {contactInfo.rating.toFixed(1)}
          </span>
          <span className="font-arabic-caption text-xs text-muted-foreground">
            ({contactInfo.reviewCount} تقييم)
          </span>
        </div>

        {/* Contact Details */}
        <div className="space-y-4 mb-6">
          {/* Phone */}
          <div className="flex flex-row-reverse items-start gap-3">
            <div className="w-8 h-8 bg-success/10 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="Phone" size={16} color="var(--color-success)" />
            </div>
            <div className="flex-1">
              <p className="font-arabic-body font-medium text-sm text-foreground mb-1">
                رقم الهاتف
              </p>
              <p className="font-arabic-data text-sm text-muted-foreground">
                {contactInfo.phone}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-row-reverse items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="MapPin" size={16} color="var(--color-primary)" />
            </div>
            <div className="flex-1">
              <p className="font-arabic-body font-medium text-sm text-foreground mb-1">
                العنوان
              </p>
              <p className="font-arabic-body text-sm text-muted-foreground leading-relaxed">
                {contactInfo.address}
              </p>
            </div>
          </div>

          {/* Working Hours */}
          <div className="flex flex-row-reverse items-start gap-3">
            <div className="w-8 h-8 bg-warning/10 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="Clock" size={16} color="var(--color-warning)" />
            </div>
            <div className="flex-1">
              <p className="font-arabic-body font-medium text-sm text-foreground mb-1">
                ساعات العمل
              </p>
              <p className="font-arabic-body text-sm text-muted-foreground">
                {contactInfo.workingHours}
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-row-reverse items-start gap-3">
            <div className="w-8 h-8 bg-accent/10 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="DollarSign" size={16} color="var(--color-accent)" />
            </div>
            <div className="flex-1">
              <p className="font-arabic-body font-medium text-sm text-foreground mb-1">
                سعر الاستشارة
              </p>
              <p className="font-arabic-data font-semibold text-lg text-accent">
                {contactInfo.consultationPrice}
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={onBookingClick}
            className="w-full py-3 rounded-xl bg-primary text-white font-arabic-body font-medium hover:bg-primary/90 transition"
          >
            احجز موعد الآن
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handlePhoneClick}
              className="py-2 border border-border rounded-xl hover:bg-muted transition text-sm"
            >
              اتصال
            </button>

            {contactInfo.whatsapp && (
              <button
                onClick={handleWhatsAppClick}
                className="py-2 border border-success text-success rounded-xl hover:bg-success hover:text-white transition text-sm"
              >
                واتساب
              </button>
            )}
          </div>

          <button
            onClick={handleDirectionsClick}
            className="w-full py-2 text-primary border border-primary rounded-xl hover:bg-primary hover:text-white transition text-sm"
          >
            الحصول على الاتجاهات
          </button>
        </div>

        {/* Emergency */}
        <div className="mt-6 p-4 bg-error/5 border border-error/20 rounded-xl">
          <div className="flex flex-row-reverse items-start gap-2">
            <Icon
              name="AlertTriangle"
              size={16}
              color="var(--color-error)"
              className="mt-0.5 flex-shrink-0"
            />
            <div>
              <p className="font-arabic-body font-medium text-sm text-error mb-1">
                للحالات الطارئة
              </p>
              <p className="font-arabic-caption text-xs text-error/80 leading-relaxed">
                في حالة الطوارئ الطبية، يرجى الاتصال بالرقم 997 أو التوجه لأقرب
                مستشفى
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSidebar;
