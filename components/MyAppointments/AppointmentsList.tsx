"use client";

import { useState } from "react";
import SingleAppointment from "./SingleAppointment";

const AppointmentsList = () => {
  const [filter, setFilter] = useState<
    "all" | "upcoming" | "completed" | "cancelled"
  >("all");

  const appointments = [
    {
      id: 1,
      doctorName: "د. سارة أحمد",
      specialty: "طب الأسرة",
      date: "2025-11-15",
      time: "10:00 صباحاً",
      status: "upcoming" as const,
      department: "العيادات الخارجية",
      appointmentNumber: "A-2025-001",
    },
    {
      id: 2,
      doctorName: "د. محمد حسن",
      specialty: "أخصائي قلب",
      date: "2025-11-18",
      time: "02:30 مساءً",
      status: "upcoming" as const,
      department: "قسم القلب",
      appointmentNumber: "A-2025-002",
    },
    {
      id: 3,
      doctorName: "د. ليلى كمال",
      specialty: "جراحة عامة",
      date: "2025-10-25",
      time: "09:00 صباحاً",
      status: "completed" as const,
      department: "الجراحة",
      appointmentNumber: "A-2025-003",
    },
    {
      id: 4,
      doctorName: "د. أحمد يوسف",
      specialty: "أطفال",
      date: "2025-10-20",
      time: "11:00 صباحاً",
      status: "cancelled" as const,
      department: "طب الأطفال",
      appointmentNumber: "A-2025-004",
    },
    {
      id: 5,
      doctorName: "د. فاطمة علي",
      specialty: "نساء وولادة",
      date: "2025-11-20",
      time: "03:00 مساءً",
      status: "upcoming" as const,
      department: "النساء والولادة",
      appointmentNumber: "A-2025-005",
    },
  ];

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

  return (
    <div className="wow fadeInUp" data-wow-delay=".2s">
      {/* Filter Buttons */}
      <div className="mb-8 flex flex-wrap gap-3">
        {filterButtons.map((btn) => (
          <button
            key={btn.value}
            onClick={() => setFilter(btn.value)}
            className={`${
              filter === btn.value
                ? "bg-primary text-white"
                : "bg-white text-body-color dark:bg-gray-dark dark:text-body-color-dark"
            } rounded-md px-6 py-3 text-base font-medium shadow-three transition duration-300 hover:shadow-one dark:shadow-two dark:hover:shadow-gray-dark`}
          >
            {btn.label} ({btn.count})
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="space-y-6">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <SingleAppointment key={appointment.id} appointment={appointment} />
          ))
        ) : (
          <div className="rounded-sm bg-white p-12 text-center shadow-three dark:bg-gray-dark">
            <p className="text-lg text-body-color dark:text-body-color-dark">
              لا توجد مواعيد في هذه الفئة
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsList;
