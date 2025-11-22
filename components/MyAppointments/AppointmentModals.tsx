"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Calendar,
    Clock,
    MapPin,
    Stethoscope,
    FileText,
    CreditCard,
    User,
    AlertTriangle,
    CalendarDays,
} from "lucide-react";
import { Appointment } from "./SingleAppointment";
import { useState } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface DetailsModalProps extends ModalProps {
    appointment: Appointment | null;
}

export const DetailsModal = ({ isOpen, onClose, appointment }: DetailsModalProps) => {
    if (!appointment) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4" dir="rtl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-gray-dark"
                        >
                            {/* Header */}
                            <div className="border-b border-gray-200 p-4 sm:p-6 dark:border-gray-700">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                                            تفاصيل الموعد
                                        </h2>
                                        <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                            رقم الموعد: {appointment.appointmentNumber}
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="rounded-lg p-1.5 sm:p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                                    >
                                        <X className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 sm:p-6">
                                <div className="space-y-4 sm:space-y-6">
                                    {/* Doctor Info */}
                                    <div className="flex items-center gap-3 sm:gap-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-3 sm:p-4 dark:from-blue-900/20 dark:to-indigo-900/20">
                                        <div className="flex h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg sm:text-2xl font-bold text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                                            {appointment.doctorName.split(" ")[1]?.[0] || "د"}
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate">
                                                {appointment.doctorName}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                                                {appointment.specialty}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Details Grid */}
                                    <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                                        <DetailItem
                                            icon={<MapPin className="h-4 w-4 sm:h-5 sm:w-5" />}
                                            label="العيادة"
                                            value={appointment.clinicName}
                                        />
                                        <DetailItem
                                            icon={<CalendarDays className="h-4 w-4 sm:h-5 sm:w-5" />}
                                            label="التاريخ"
                                            value={appointment.date}
                                        />
                                        <DetailItem
                                            icon={<Clock className="h-4 w-4 sm:h-5 sm:w-5" />}
                                            label="الوقت"
                                            value={appointment.time}
                                        />
                                        <DetailItem
                                            icon={<CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />}
                                            label="سعر الكشف"
                                            value={appointment.price}
                                        />
                                        <DetailItem
                                            icon={<FileText className="h-4 w-4 sm:h-5 sm:w-5" />}
                                            label="القسم"
                                            value={appointment.department}
                                        />
                                        <DetailItem
                                            icon={<Stethoscope className="h-4 w-4 sm:h-5 sm:w-5" />}
                                            label="الحالة"
                                            value={
                                                appointment.status === "upcoming"
                                                    ? "قادم"
                                                    : appointment.status === "completed"
                                                        ? "مكتمل"
                                                        : "ملغي"
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="border-t border-gray-200 p-4 sm:p-6 dark:border-gray-700">
                                <button
                                    onClick={onClose}
                                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                                >
                                    إغلاق
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <div className="flex items-center gap-2 sm:gap-3 rounded-lg bg-gray-50 p-2.5 sm:p-3 dark:bg-gray-800/50">
        <div className="text-gray-600 dark:text-gray-400 flex-shrink-0">{icon}</div>
        <div className="min-w-0 flex-1">
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-500">{label}</p>
            <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">{value}</p>
        </div>
    </div>
);

interface CancelModalProps extends ModalProps {
    onConfirm: () => void;
}

export const CancelModal = ({ isOpen, onClose, onConfirm }: CancelModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                    />

                    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4" dir="rtl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-dark"
                        >
                            <div className="p-4 sm:p-6">
                                <div className="mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/30">
                                    <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-rose-600 dark:text-rose-400" />
                                </div>
                                <h3 className="mb-2 text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                                    تأكيد الإلغاء
                                </h3>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                                    هل أنت متأكد من إلغاء هذا الموعد؟ لا يمكن التراجع عن هذا الإجراء.
                                </p>
                            </div>

                            <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 border-t border-gray-200 p-4 sm:p-6 dark:border-gray-700">
                                <button
                                    onClick={onClose}
                                    className="flex-1 rounded-xl border-2 border-gray-300 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                                >
                                    إلغاء
                                </button>
                                <button
                                    onClick={() => {
                                        onConfirm();
                                        onClose();
                                    }}
                                    className="flex-1 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                                >
                                    تأكيد الإلغاء
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

interface RescheduleModalProps extends ModalProps {
    onConfirm: (date: string, time: string) => void;
}

export const RescheduleModal = ({ isOpen, onClose, onConfirm }: RescheduleModalProps) => {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    const handleConfirm = () => {
        if (selectedDate && selectedTime) {
            onConfirm(selectedDate, selectedTime);
            onClose();
            setSelectedDate("");
            setSelectedTime("");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                    />

                    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4" dir="rtl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-dark"
                        >
                            <div className="border-b border-gray-200 p-4 sm:p-6 dark:border-gray-700">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                                            إعادة جدولة الموعد
                                        </h2>
                                        <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                            اختر التاريخ والوقت الجديد
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="rounded-lg p-1.5 sm:p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
                                    >
                                        <X className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 sm:p-6">
                                <div className="space-y-3 sm:space-y-4">
                                    <div>
                                        <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                                            التاريخ
                                        </label>
                                        <input
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            className="w-full rounded-xl border border-gray-300 bg-white px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                                            الوقت
                                        </label>
                                        <select
                                            value={selectedTime}
                                            onChange={(e) => setSelectedTime(e.target.value)}
                                            className="w-full rounded-xl border border-gray-300 bg-white px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                        >
                                            <option value="">اختر الوقت</option>
                                            <option value="09:00 صباحاً">09:00 صباحاً</option>
                                            <option value="10:00 صباحاً">10:00 صباحاً</option>
                                            <option value="11:00 صباحاً">11:00 صباحاً</option>
                                            <option value="02:00 مساءً">02:00 مساءً</option>
                                            <option value="03:00 مساءً">03:00 مساءً</option>
                                            <option value="04:00 مساءً">04:00 مساءً</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 border-t border-gray-200 p-4 sm:p-6 dark:border-gray-700">
                                <button
                                    onClick={onClose}
                                    className="flex-1 rounded-xl border-2 border-gray-300 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                                >
                                    إلغاء
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    disabled={!selectedDate || !selectedTime}
                                    className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    تأكيد
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
