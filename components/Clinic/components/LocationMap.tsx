"use client";
import React from 'react';
import { ClinicDetail } from '../types';
import Icon from '@/components/UI/AppIcon';

interface LocationMapProps {
  clinic: ClinicDetail;
  className?: string;
}

const LocationMap = ({ clinic, className = '' }: LocationMapProps) => {
  const handleDirectionsClick = () => {
    const encodedAddress = encodeURIComponent(clinic.contactInfo.address);
    window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
  };

  const handleShareLocation = () => {
    if (navigator.share) {
      navigator.share({
        title: clinic.name,
        text: `موقع ${clinic.name}`,
        url: `https://maps.google.com/?q=${clinic.location.lat},${clinic.location.lng}`
      });
    } else {
      // Fallback to copying to clipboard
      const url = `https://maps.google.com/?q=${clinic.location.lat},${clinic.location.lng}`;
      navigator.clipboard.writeText(url);
      alert('تم نسخ رابط الموقع');
    }
  };

  return (
    <div dir='rtl' className={`bg-surface rounded-clinical medical-card-elevation-1 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-primary/10 rounded-clinical flex items-center justify-center">
              <Icon name="MapPin" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h2 className="font-arabic-heading font-semibold text-lg text-foreground">
                موقع العيادة
              </h2>
              <p className="font-arabic-body text-sm text-muted-foreground">
                {clinic.contactInfo.address}
              </p>
            </div>
          </div>
          
          <button
            
            onClick={handleShareLocation}
            className="text-muted-foreground hover:text-primary"
          >
            <Icon name="Share2" size={18} />
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="relative h-64 lg:h-80">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title={`موقع ${clinic.name}`}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${clinic.location.lat},${clinic.location.lng}&z=15&output=embed`}
          className="border-0"
        />
        
        {/* Overlay Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <button
            onClick={handleDirectionsClick}
            className="font-arabic-body text-sm shadow-lg"
          >
            الاتجاهات
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 bg-muted">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 space-x-reverse text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span className="font-arabic-caption">
              {clinic.contactInfo.workingHours}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse text-muted-foreground">
            <Icon name="Phone" size={14} />
            <span className="font-arabic-data">
              {clinic.contactInfo.phone}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;