"use client";



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
  // Status configuration with modern design tokens
  const getStatusConfig = (status: AppointmentStatus) => {
    switch (status) {
      case "upcoming":
        return {
          bgColor: "bg-blue-50 dark:bg-blue-900/20",
          textColor: "text-blue-700 dark:text-blue-400",
          borderColor: "border-blue-200 dark:border-blue-800",
          gradientBorder: "from-blue-400 via-blue-500 to-indigo-500",
          icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="stroke-current">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path d="M12 6V12L16 14" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ),
          label: "قادم",
        };
      case "completed":
        return {
          bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
          textColor: "text-emerald-700 dark:text-emerald-400",
          borderColor: "border-emerald-200 dark:border-emerald-800",
          gradientBorder: "from-emerald-400 via-green-500 to-teal-500",
          icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="stroke-current">
              <path d="M20 6L9 17L4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ),
          label: "مكتمل",
        };
      case "cancelled":
        return {
          bgColor: "bg-rose-50 dark:bg-rose-900/20",
          textColor: "text-rose-700 dark:text-rose-400",
          borderColor: "border-rose-200 dark:border-rose-800",
          gradientBorder: "from-rose-400 via-red-500 to-pink-500",
          icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="stroke-current">
              <path d="M18 6L6 18M6 6L18 18" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ),
          label: "ملغي",
        };
    }
  };

  const statusConfig = getStatusConfig(appointment.status);

  // Event handlers (unchanged logic)
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

  const handleDownloadReport = () => {
    alert("تحميل التقرير الطبي");
  };

  return (
    <div
      
      className={`group relative overflow-hidden rounded-2xl border ${statusConfig.borderColor} bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-dark`}
    >
      {/* Gradient border accent - left side for RTL */}
      <div
        className={`absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b ${statusConfig.gradientBorder} opacity-80`}
      />

      {/* Decorative background blur */}
      <div
        className={`absolute -left-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${statusConfig.gradientBorder} opacity-5 blur-3xl transition-all duration-500 group-hover:scale-150`}
      />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        {/* Right Section: Doctor Info and Details */}
        <div className="flex-1 space-y-4">
          {/* Doctor Header with Avatar Placeholder */}
          <div className="flex items-start gap-4">
            {/* Avatar Circle with Initial */}
            <div
              className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full ${statusConfig.bgColor} ${statusConfig.textColor} text-xl font-bold shadow-md`}
            >
              {appointment.doctorName.split(" ")[1]?.[0] || "د"}
            </div>

            {/* Doctor Name and Status */}
            <div className="flex-1">
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                {appointment.doctorName}
              </h3>

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
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-gray-700">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="stroke-current text-gray-600 dark:text-gray-400"
                >
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="7" r="4" strokeWidth="2" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-500">التخصص</p>
                <p className="truncate font-medium text-gray-900 dark:text-white">
                  {appointment.specialty}
                </p>
              </div>
            </div>

            {/* Date & Time */}
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-gray-700">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="stroke-current text-gray-600 dark:text-gray-400"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
                  <path d="M16 2V6M8 2V6M3 10H21" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-500">التاريخ والوقت</p>
                <p className="truncate font-medium text-gray-900 dark:text-white">
                  {appointment.date}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.time}</p>
              </div>
            </div>

            {/* Department */}
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-gray-700">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="stroke-current text-gray-600 dark:text-gray-400"
                >
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M2 17L12 22L22 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-500">القسم</p>
                <p className="truncate font-medium text-gray-900 dark:text-white">
                  {appointment.department}
                </p>
              </div>
            </div>

            {/* Appointment Number */}
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-gray-700">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="stroke-current text-gray-600 dark:text-gray-400"
                >
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 2V8H20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-500">رقم الموعد</p>
                <p className="truncate font-mono text-sm font-semibold text-gray-900 dark:text-white">
                  {appointment.appointmentNumber}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Left Section: Action Buttons */}
        <div className="flex flex-col gap-2.5 lg:w-48">
          {appointment.status === "upcoming" && (
            <>
              <button
                onClick={handleViewDetails}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="stroke-current">
                  <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="3" strokeWidth="2" />
                </svg>
                عرض التفاصيل
              </button>

              <button
                onClick={handleReschedule}
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-blue-600 bg-white px-4 py-2.5 text-sm font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-50 dark:bg-gray-dark dark:hover:bg-gray-800"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="stroke-current">
                  <path d="M21.5 2V8H15.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2.5 22V16H8.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21.5 8C20.1 5.5 17.5 3.5 14.5 2.5C9.5 1 4 3 2.5 8M21.5 16C20 21 14.5 23 9.5 21.5C6.5 20.5 3.9 18.5 2.5 16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                إعادة الجدولة
              </button>

              <button
                onClick={handleCancel}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="stroke-current">
                  <path d="M18 6L6 18M6 6L18 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                إلغاء الموعد
              </button>
            </>
          )}

          {appointment.status === "completed" && (
            <>
              <button
                onClick={handleViewDetails}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="stroke-current">
                  <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="3" strokeWidth="2" />
                </svg>
                عرض التفاصيل
              </button>

              <button
                onClick={handleDownloadReport}
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-emerald-600 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-600 transition-all duration-300 hover:bg-emerald-50 dark:bg-gray-dark dark:hover:bg-gray-800"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="stroke-current">
                  <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 10L12 15L17 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 15V3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                التقرير الطبي
              </button>
            </>
          )}

          {appointment.status === "cancelled" && (
            <button
              onClick={handleViewDetails}
              className="flex items-center justify-center gap-2 rounded-xl bg-gray-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-gray-700 hover:shadow-lg"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="stroke-current">
                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="3" strokeWidth="2" />
              </svg>
              عرض التفاصيل
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleAppointment;