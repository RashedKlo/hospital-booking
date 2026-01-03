"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Stethoscope,
  FileText,
  CreditCard,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
  X,
  CalendarDays,
  Eye,
} from "lucide-react";
import { useState } from "react";
import { DetailsModal, CancelModal, RescheduleModal } from "./AppointmentModals";

type AppointmentStatus = "upcoming" | "completed" | "cancelled" | string;

export interface Appointment {
  id: number;
  doctorName: string;
  clinicName: string;
  specialty: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  department: string;
  appointmentNumber: string;
  price: string;
}

interface SingleAppointmentProps {
  appointment: Appointment;
  onCancel?: (id: number) => void;
  onReschedule?: (id: number, date: string, time: string) => void;
}

const SingleAppointment = ({ appointment, onCancel, onReschedule }: SingleAppointmentProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);

  const getStatusConfig = (status: AppointmentStatus) => {
    switch (status) {
      case "upcoming":
        return {
          bgColor: "bg-blue-50 dark:bg-blue-900/20",
          textColor: "text-blue-700 dark:text-blue-400",
          borderColor: "border-blue-200 dark:border-blue-800",
          gradientBorder: "from-blue-400 via-blue-500 to-indigo-500",
          icon: <Clock className="h-4 w-4" />,
          label: "قادم",
        };
      case "completed":
        return {
          bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
          textColor: "text-emerald-700 dark:text-emerald-400",
          borderColor: "border-emerald-200 dark:border-emerald-800",
          gradientBorder: "from-emerald-400 via-green-500 to-teal-500",
          icon: <CheckCircle2 className="h-4 w-4" />,
          label: "مكتمل",
        };
      case "cancelled":
        return {
          bgColor: "bg-rose-50 dark:bg-rose-900/20",
          textColor: "text-rose-700 dark:text-rose-400",
          borderColor: "border-rose-200 dark:border-rose-800",
          gradientBorder: "from-rose-400 via-red-500 to-pink-500",
          icon: <XCircle className="h-4 w-4" />,
          label: "ملغي",
        };
      default:
        return {
          bgColor: "bg-gray-50 dark:bg-gray-900/20",
          textColor: "text-gray-700 dark:text-gray-400",
          borderColor: "border-gray-200 dark:border-gray-800",
          gradientBorder: "from-gray-400 via-gray-500 to-gray-600",
          icon: <AlertCircle className="h-4 w-4" />,
          label: status || "غير محدد",
        };
    }
  };

  const statusConfig = getStatusConfig(appointment.status);

  const handleCancel = () => {
    if (onCancel) {
      onCancel(appointment.id);
    }
  };

  const handleReschedule = (date: string, time: string) => {
    if (onReschedule) {
      onReschedule(appointment.id, date, time);
    }
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3 }}
        className={`group relative overflow-hidden rounded-2xl border ${statusConfig.borderColor} bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-dark`}
      >
        {/* Gradient border accent - left side for RTL */}
        <div
          className={`absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b ${statusConfig.gradientBorder} opacity-80`}
        />

        {/* Decorative background blur */}
        <div
          className={`absolute -left-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${statusConfig.gradientBorder} opacity-5 blur-3xl transition-all duration-500 group-hover:scale-150`}
        />

        <div className="relative p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            {/* Right Section: Doctor Info and Details */}
            <div className="flex-1 space-y-5">
              {/* Doctor Header with Avatar */}
              <div className="flex items-start gap-4">
                {/* Avatar Circle with Initial */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full ${statusConfig.bgColor} ${statusConfig.textColor} text-2xl font-bold shadow-md`}
                >
                  {appointment.doctorName.split(" ")[1]?.[0] || "د"}
                </motion.div>

                {/* Doctor Name, Clinic and Status */}
                <div className="flex-1 min-w-0">
                  <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                    {appointment.doctorName}
                  </h3>
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{appointment.clinicName}</span>
                  </div>

                  {/* Status Badge */}
                  <div
                    className={`inline-flex items-center gap-2 rounded-full ${statusConfig.bgColor} ${statusConfig.textColor} px-3 py-1.5 text-sm font-semibold shadow-sm`}
                  >
                    {statusConfig.icon}
                    <span>{statusConfig.label}</span>
                  </div>
                </div>
              </div>

              {/* Appointment Details Grid */}
              <div className="grid gap-3 sm:grid-cols-2">
                {/* Specialty */}
                <InfoCard
                  icon={<Stethoscope className="h-5 w-5" />}
                  label="التخصص"
                  value={appointment.specialty}
                />

                {/* Date & Time */}
                <InfoCard
                  icon={<CalendarDays className="h-5 w-5" />}
                  label="التاريخ والوقت"
                  value={appointment.date}
                  subValue={appointment.time}
                />

                {/* Price */}
                <InfoCard
                  icon={<CreditCard className="h-5 w-5" />}
                  label="سعر الكشف"
                  value={appointment.price}
                />

                {/* Appointment Number */}
                <InfoCard
                  icon={<FileText className="h-5 w-5" />}
                  label="رقم الموعد"
                  value={appointment.appointmentNumber}
                  mono
                />
              </div>
            </div>

            {/* Left Section: Action Buttons */}
            <div className="flex flex-col gap-2.5 lg:w-48">
              {appointment.status === "upcoming" && (
                <>
                  <ActionButton
                    onClick={() => setShowDetails(true)}
                    variant="primary"
                    icon={<Eye className="h-4 w-4" />}
                  >
                    عرض التفاصيل
                  </ActionButton>

                  <ActionButton
                    onClick={() => setShowReschedule(true)}
                    variant="outline"
                    icon={<Calendar className="h-4 w-4" />}
                  >
                    إعادة الجدولة
                  </ActionButton>

                  <ActionButton
                    onClick={() => setShowCancel(true)}
                    variant="danger"
                    icon={<X className="h-4 w-4" />}
                  >
                    إلغاء الموعد
                  </ActionButton>
                </>
              )}

              {appointment.status === "completed" && (
                <>
                  <ActionButton
                    onClick={() => setShowDetails(true)}
                    variant="success"
                    icon={<Eye className="h-4 w-4" />}
                  >
                    عرض التفاصيل
                  </ActionButton>

                  <ActionButton
                    onClick={() => alert("تحميل التقرير الطبي")}
                    variant="outline-success"
                    icon={<Download className="h-4 w-4" />}
                  >
                    التقرير الطبي
                  </ActionButton>
                </>
              )}

              {appointment.status === "cancelled" && (
                <ActionButton
                  onClick={() => setShowDetails(true)}
                  variant="secondary"
                  icon={<Eye className="h-4 w-4" />}
                >
                  عرض التفاصيل
                </ActionButton>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modals */}
      <DetailsModal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        appointment={appointment}
      />

      <CancelModal
        isOpen={showCancel}
        onClose={() => setShowCancel(false)}
        onConfirm={handleCancel}
      />

      <RescheduleModal
        isOpen={showReschedule}
        onClose={() => setShowReschedule(false)}
        onConfirm={handleReschedule}
      />
    </>
  );
};

// Helper Components
const InfoCard = ({
  icon,
  label,
  value,
  subValue,
  mono = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  mono?: boolean;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 transition-colors hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-800"
  >
    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-gray-700">
      <div className="text-gray-600 dark:text-gray-400">{icon}</div>
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-xs text-gray-500 dark:text-gray-500">{label}</p>
      <p
        className={`truncate font-medium text-gray-900 dark:text-white ${mono ? "font-mono text-sm" : ""
          }`}
      >
        {value}
      </p>
      {subValue && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{subValue}</p>
      )}
    </div>
  </motion.div>
);

const ActionButton = ({
  onClick,
  variant,
  icon,
  children,
}: {
  onClick: () => void;
  variant: "primary" | "outline" | "danger" | "success" | "outline-success" | "secondary";
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg",
    outline:
      "border-2 border-blue-600 bg-white text-blue-600 hover:bg-blue-50 dark:bg-gray-dark dark:hover:bg-gray-800",
    danger:
      "bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-md hover:shadow-lg",
    success:
      "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md hover:shadow-lg",
    "outline-success":
      "border-2 border-emerald-600 bg-white text-emerald-600 hover:bg-emerald-50 dark:bg-gray-dark dark:hover:bg-gray-800",
    secondary:
      "bg-gray-600 text-white shadow-md hover:bg-gray-700 hover:shadow-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${variants[variant]}`}
    >
      {icon}
      {children}
    </motion.button>
  );
};

export default SingleAppointment;