import React, { useState, useEffect } from 'react';
import Icon from './AppIcon';


interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  clinicName?: string;
  doctorName?: string;
  className?: string;
}

interface BookingFormData {
  patientName: string;
  phoneNumber: string;
  appointmentDate: string;
  appointmentTime: string;
  serviceType: string;
  notes: string;
}

const BookingModal = ({
  isOpen,
  onClose,
  clinicName = 'العيادة المختارة',
  doctorName = 'الطبيب المختار',
  className = ''
}: BookingModalProps) => {
  const [formData, setFormData] = useState<BookingFormData>({
    patientName: '',
    phoneNumber: '',
    appointmentDate: '',
    appointmentTime: '',
    serviceType: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<BookingFormData>>({});

  const serviceOptions = [
    { value: 'consultation', label: 'استشارة طبية' },
    { value: 'checkup', label: 'فحص دوري' },
    { value: 'followup', label: 'متابعة' },
    { value: 'emergency', label: 'حالة طارئة' }
  ];

  const timeSlots = [
    { value: '09:00', label: '09:00 صباحاً' },
    { value: '10:00', label: '10:00 صباحاً' },
    { value: '11:00', label: '11:00 صباحاً' },
    { value: '14:00', label: '02:00 مساءً' },
    { value: '15:00', label: '03:00 مساءً' },
    { value: '16:00', label: '04:00 مساءً' },
    { value: '17:00', label: '05:00 مساءً' }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<BookingFormData> = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'اسم المريض مطلوب';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'رقم الهاتف مطلوب';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'رقم الهاتف غير صحيح';
    }

    if (!formData.appointmentDate) {
      newErrors.appointmentDate = 'تاريخ الموعد مطلوب';
    }

    if (!formData.appointmentTime) {
      newErrors.appointmentTime = 'وقت الموعد مطلوب';
    }

    if (!formData.serviceType) {
      newErrors.serviceType = 'نوع الخدمة مطلوب';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Reset form and close modal
      setFormData({
        patientName: '',
        phoneNumber: '',
        appointmentDate: '',
        appointmentTime: '',
        serviceType: '',
        notes: ''
      });

      onClose();

      // Show success message (in real app, use toast notification)
      alert('تم حجز الموعد بنجاح! سيتم التواصل معك قريباً لتأكيد الموعد.');

    } catch (error) {
      console.error('Booking error:', error);
      alert('حدث خطأ أثناء حجز الموعد. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-2000 flex items-center justify-center p-4 modal-backdrop bg-black/50 animate-fade-in ${className}`}
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md bg-surface rounded-clinical medical-card-elevation-3 animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-primary/10 rounded-clinical flex items-center justify-center">
              <Icon name="Calendar" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h2 className="font-arabic-heading font-semibold text-lg text-foreground">
                حجز موعد
              </h2>
              <p className="font-arabic-body text-sm text-muted-foreground">
                {clinicName} - {doctorName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Patient Name */}
          <input
            type="text"
            placeholder="أدخل اسم المريض الكامل"
            value={formData.patientName}
            onChange={(e) => handleInputChange('patientName', e.target.value)}
            required
            className="font-arabic-body"
          />

          {/* Phone Number */}
          <input
            type="tel"
            placeholder="05xxxxxxxx"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            className="font-arabic-body"
          />

          {/* Appointment Date */}
          <input
            type="date"
            value={formData.appointmentDate}
            onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
            required
            min={new Date().toISOString().split('T')[0]}
          />

          {/* Appointment Time */}
          <select
            value={formData.appointmentTime}
            onChange={(e) => handleInputChange('appointmentTime', e.target.value)}
            required
            className="w-full px-3 py-2 border border-border rounded-clinical-sm font-arabic-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="" disabled>اختر الوقت المناسب</option>
            {timeSlots.map((slot) => (
              <option key={slot.value} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </select>

          {/* Service Type */}
          <select
            value={formData.serviceType}
            onChange={(e) => handleInputChange('serviceType', e.target.value)}
            required
            className="w-full px-3 py-2 border border-border rounded-clinical-sm font-arabic-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="" disabled>اختر نوع الخدمة</option>
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Notes */}
          <div>
            <label className="block font-arabic-body font-medium text-sm text-foreground mb-2">
              ملاحظات إضافية (اختياري)
            </label>
            <textarea
              placeholder="أي معلومات إضافية تود إضافتها..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-clinical-sm font-arabic-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          {/* Action buttons */}
          <div className="flex space-x-3 space-x-reverse pt-4">
            <button
              type="button"
              disabled={isSubmitting}
              className="flex-1 font-arabic-body"
            >
              إلغاء
            </button>

            <button
              type="submit"
              className="flex-1 font-arabic-body"
            >
              {isSubmitting ? 'جاري الحجز...' : 'تأكيد الحجز'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;