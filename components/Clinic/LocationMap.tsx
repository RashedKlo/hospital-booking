"use client";
import React, { useState } from 'react';
import { ClinicDetail } from '@/types/clinic';
import Icon from '@/components/UI/AppIcon';

interface LocationMapProps {
  clinic: ClinicDetail;
  className?: string;
}

const LocationMap = ({ clinic, className = '' }: LocationMapProps) => {
  const [showIframe, setShowIframe] = useState(false);

  // Use location from ClinicDetail type
  const lat = clinic.location?.lat || 0;
  const lng = clinic.location?.lng || 0;
  const hasValidLocation = lat !== 0 && lng !== 0;

  const handleDirectionsClick = () => {
    if (hasValidLocation) {
      window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
    } else {
      const encodedAddress = encodeURIComponent(clinic.contactInfo?.address || '');
      window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
    }
  };

  const handleShareLocation = () => {
    const url = hasValidLocation
      ? `https://maps.google.com/?q=${lat},${lng}`
      : `https://maps.google.com/?q=${encodeURIComponent(clinic.contactInfo?.address || '')}`;

    if (navigator.share) {
      navigator.share({
        title: clinic.name,
        text: `موقع ${clinic.name}`,
        url: url
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(url);
      alert('تم نسخ رابط الموقع');
    }
  };

  return (
    <div dir='rtl' className={`bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Icon name="MapPin" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
                موقع العيادة
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {clinic.contactInfo?.address || 'العنوان غير متوفر'}
              </p>
            </div>
          </div>

          <button
            onClick={handleShareLocation}
            className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
            aria-label="مشاركة الموقع"
          >
            <Icon name="Share2" size={18} />
          </button>
        </div>
      </div>

      {/* Map */}
      {hasValidLocation ? (
        <div className="relative h-64 lg:h-80 bg-gray-100 dark:bg-gray-800">
          {!showIframe ? (
            // Show static placeholder with click to load (Performance optimization)
            <div
              className="w-full h-full flex items-center justify-center cursor-pointer group"
              onClick={() => setShowIframe(true)}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon name="MapPin" size={32} color="var(--color-primary)" />
                </div>
                <p className="text-gray-900 dark:text-white font-semibold mb-2">
                  اضغط لعرض الخريطة
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  سيتم تحميل خريطة Google Maps
                </p>
              </div>
            </div>
          ) : (
            // Load iframe only when clicked (performance optimization)
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title={`موقع ${clinic.name}`}
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
              className="border-0"
            />
          )}

          {/* Overlay Controls */}
          {showIframe && (
            <div className="absolute top-4 right-4">
              <button
                onClick={handleDirectionsClick}
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold text-sm border border-gray-200 dark:border-gray-700"
              >
                الاتجاهات
              </button>
            </div>
          )}
        </div>
      ) : (
        // No location available
        <div className="h-64 lg:h-80 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <div className="text-center">
            <Icon name="MapPin" size={48} color="#9CA3AF" />
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              الموقع غير متوفر
            </p>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 space-x-reverse text-gray-600 dark:text-gray-400">
            <Icon name="Clock" size={14} />
            <span>
              {clinic.contactInfo?.workingHours || 'غير محدد'}
            </span>
          </div>

          <div className="flex items-center space-x-2 space-x-reverse text-gray-600 dark:text-gray-400">
            <Icon name="Phone" size={14} />
            <span className="font-mono">
              {clinic.contactInfo?.phone || 'غير متوفر'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;