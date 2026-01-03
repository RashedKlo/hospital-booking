"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SingleAppointment, { Appointment } from "./SingleAppointment";
import { ToastContainer, Toast } from "./Toast";
import { useAuth } from "@/hooks/useAuth";
import { API_CONFIG } from "@/config/api.config";

const AppointmentsList = () => {
  const { accessToken, isAuthenticated } = useAuth();
  const [filter, setFilter] = useState<
    "all" | "upcoming" | "completed" | "cancelled" | string
  >("all");
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!isAuthenticated || !accessToken) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.APPOINTMENTS.CREATE}?Page=1&Limit=20`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Fetched appointments:", result);

          if (result.success && result.data && Array.isArray(result.data.appointments)) {
            const mapped = result.data.appointments.map((apt: any) => {
              const dateObj = new Date(apt.appointmentTime);
              const date = dateObj.toISOString().split('T')[0];
              const time = dateObj.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });

              return {
                id: apt.appointmentId,
                doctorName: apt.doctor?.fullName || "غير محدد",
                clinicName: apt.doctor?.clinic?.name || "العيادة الرئيسية",
                specialty: "عام", // Property not available in current API response
                date: date,
                time: time,
                status: (apt.status || "upcoming").toLowerCase(),
                department: "عام", // Property not available in current API response
                appointmentNumber: `A-${apt.appointmentId}`,
                price: "0", // Property not available in current API response
              };
            });
            setAppointments(mapped);
          } else {
            setAppointments([]);
          }

        } else {
          console.error("Failed to fetch appointments");
          setAppointments([]);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [isAuthenticated, accessToken]);

  const addToast = (type: Toast["type"], message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleCancel = (id: number) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, status: "cancelled" as const } : apt
      )
    );
    addToast("success", "تم إلغاء الموعد بنجاح");
  };

  const handleReschedule = (id: number, date: string, time: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, date, time } : apt
      )
    );
    addToast("success", `تم إعادة جدولة الموعد إلى ${date} في ${time}`);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    if (filter === "all") return true;
    return appointment.status === filter;
  });

  const filterButtons = [
    { value: "all" as const, label: "الكل", count: appointments.length },
    {
      value: "upcoming" as const,
      label: "القادمة",
      count: appointments.filter((a) => a.status === "upcoming").length,
    },
    {
      value: "completed" as const,
      label: "المكتملة",
      count: appointments.filter((a) => a.status === "completed").length,
    },
    {
      value: "cancelled" as const,
      label: "الملغاة",
      count: appointments.filter((a) => a.status === "cancelled").length,
    },
  ];

  const SkeletonCard = () => (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-dark">
      <div className="flex animate-pulse flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1 space-y-5">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="flex-1 space-y-2">
              <div className="h-6 w-48 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-7 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-800/50"
              >
                <div className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-700" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2.5 lg:w-48">
          <div className="h-11 rounded-xl bg-gray-200 dark:bg-gray-700" />
          <div className="h-11 rounded-xl bg-gray-200 dark:bg-gray-700" />
          <div className="h-11 rounded-xl bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <div className="wow fadeInUp" data-wow-delay=".2s">
        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-wrap gap-3"
        >
          {filterButtons.map((btn, index) => (
            <motion.button
              key={btn.value}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(btn.value)}
              disabled={isLoading}
              className={`${filter === btn.value
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                : "bg-white text-body-color dark:bg-gray-dark dark:text-body-color-dark"
                } rounded-xl px-6 py-3 text-base font-semibold shadow-md transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {btn.label} <span className="font-bold">({btn.count})</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Appointments List */}
        <motion.div layout className="space-y-6">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              // Skeleton Loading State
              <>
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={`skeleton-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <SkeletonCard />
                  </motion.div>
                ))}
              </>
            ) : filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment, index) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SingleAppointment
                    appointment={appointment}
                    onCancel={handleCancel}
                    onReschedule={handleReschedule}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="rounded-2xl bg-white p-12 text-center shadow-md dark:bg-gray-dark"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                  <svg
                    className="h-8 w-8 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  لا توجد مواعيد في هذه الفئة
                </p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  جرب تصفية مختلفة أو احجز موعداً جديداً
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};

export default AppointmentsList;
