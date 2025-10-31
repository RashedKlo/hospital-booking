"use client";

import { useState } from "react";

type AppointmentStatus = "upcoming" | "completed" | "cancelled";

interface Appointment {
  id: number;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  department: string;
  appointmentNumber: string;
}

const SingleAppointment = ({ appointment }: { appointment: Appointment }) => {
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case "upcoming":
        return "bg-primary/10 text-primary";
      case "completed":
        return "bg-[#13C296]/10 text-[#13C296]";
      case "cancelled":
        return "bg-[#F04438]/10 text-[#F04438]";
      default:
        return "bg-body-color/10 text-body-color";
    }
  };

  const getStatusText = (status: AppointmentStatus) => {
    switch (status) {
      case "upcoming":
        return "قادم";
      case "completed":
        return "مكتمل";
      case "cancelled":
        return "ملغي";
      default:
        return "";
    }
  };

  const handleReschedule = () => {
    alert(`إعادة جدولة الموعد رقم: ${appointment.appointmentNumber}`);
  };

  const handleCancel = () => {
    if (confirm("هل أنت متأكد من إلغاء هذا الموعد؟")) {
      alert(`تم إلغاء الموعد رقم: ${appointment.appointmentNumber}`);
    }
  };

  const handleViewDetails = () => {
    alert(`عرض تفاصيل الموعد رقم: ${appointment.appointmentNumber}`);
  };

  return (
    <div className="rounded-sm bg-white p-6 shadow-three transition duration-300 hover:shadow-one dark:bg-gray-dark dark:hover:shadow-gray-dark">
      <div className="flex flex-wrap items-start justify-between gap-4">
        {/* Right Side - Info */}
        <div className="flex-1">
          <div className="mb-3 flex items-center gap-3">
            <h3 className="text-xl font-bold text-black dark:text-white">
              {appointment.doctorName}
            </h3>
            <span
              className={`${getStatusColor(
                appointment.status,
              )} rounded-full px-3 py-1 text-xs font-semibold`}
            >
              {getStatusText(appointment.status)}
            </span>
          </div>

          <div className="mb-4 space-y-2">
            <p className="flex items-center text-base text-body-color dark:text-body-color-dark">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                className="ml-2 fill-current"
              >
                <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z" />
              </svg>
              <span className="font-medium">{appointment.specialty}</span>
            </p>

            <p className="flex items-center text-base text-body-color dark:text-body-color-dark">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                className="ml-2 fill-current"
              >
                <path d="M16 2H15V0H13V2H7V0H5V2H4C2.9 2 2 2.9 2 4V18C2 19.1 2.9 20 4 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM16 18H4V8H16V18ZM16 6H4V4H16V6Z" />
              </svg>
              {appointment.date} - {appointment.time}
            </p>

            <p className="flex items-center text-base text-body-color dark:text-body-color-dark">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                className="ml-2 fill-current"
              >
                <path d="M10 0C6.69 0 4 2.69 4 6C4 10.5 10 18 10 18C10 18 16 10.5 16 6C16 2.69 13.31 0 10 0ZM10 8C8.9 8 8 7.1 8 6C8 4.9 8.9 4 10 4C11.1 4 12 4.9 12 6C12 7.1 11.1 8 10 8Z" />
              </svg>
              {appointment.department}
            </p>

            <p className="text-sm text-body-color dark:text-body-color-dark">
              رقم الموعد:{" "}
              <span className="font-semibold">
                {appointment.appointmentNumber}
              </span>
            </p>
          </div>
        </div>

        {/* Left Side - Actions */}
        <div className="flex flex-col gap-2">
          {appointment.status === "upcoming" && (
            <>
              <button
                onClick={handleViewDetails}
                className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-white transition duration-300 hover:bg-primary/90"
              >
                عرض التفاصيل
              </button>
              <button
                onClick={handleReschedule}
                className="rounded-md border border-primary bg-transparent px-5 py-2 text-sm font-medium text-primary transition duration-300 hover:bg-primary hover:text-white"
              >
                إعادة الجدولة
              </button>
              <button
                onClick={handleCancel}
                className="rounded-md bg-[#F04438] px-5 py-2 text-sm font-medium text-white transition duration-300 hover:bg-[#F04438]/90"
              >
                إلغاء الموعد
              </button>
            </>
          )}

          {appointment.status === "completed" && (
            <>
              <button
                onClick={handleViewDetails}
                className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-white transition duration-300 hover:bg-primary/90"
              >
                عرض التفاصيل
              </button>
              <button
                onClick={() => alert("تحميل التقرير الطبي")}
                className="rounded-md border border-primary bg-transparent px-5 py-2 text-sm font-medium text-primary transition duration-300 hover:bg-primary hover:text-white"
              >
                التقرير الطبي
              </button>
            </>
          )}

          {appointment.status === "cancelled" && (
            <button
              onClick={handleViewDetails}
              className="rounded-md bg-body-color px-5 py-2 text-sm font-medium text-white transition duration-300 hover:bg-body-color/90"
            >
              عرض التفاصيل
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleAppointment;
