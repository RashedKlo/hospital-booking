"use client";
import NewsLatterBox from "./NewsLatterBox";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    department: "",
    doctor: "",
    date: "",
    time: "",
    notes: "",
  });

  const departments = [
    { value: "cardiology", label: "أمراض القلب", icon: "❤️" },
    { value: "orthopedics", label: "جراحة العظام", icon: "🦴" },
    { value: "pediatrics", label: "طب الأطفال", icon: "👶" },
    { value: "dermatology", label: "الأمراض الجلدية", icon: "🔬" },
    { value: "general", label: "الطب العام", icon: "⚕️" },
    { value: "neurology", label: "الأمراض العصبية", icon: "🧠" },
    { value: "ophthalmology", label: "طب العيون", icon: "👁️" },
  ];

  const doctors = {
    cardiology: ["د. أحمد محمود", "د. سارة علي"],
    orthopedics: ["د. محمد حسن", "د. فاطمة خالد"],
    pediatrics: ["د. ليلى أحمد", "د. عمر سعيد"],
    dermatology: ["د. نور الدين", "د. هدى عبدالله"],
    general: ["د. يوسف إبراهيم", "د. منى حسين"],
    neurology: ["د. خالد السيد", "د. رانيا عبدالله"],
    ophthalmology: ["د. طارق فهمي", "د. ندى حسان"],
  };

  const timeSlots = [
    "09:00 صباحاً",
    "09:30 صباحاً",
    "10:00 صباحاً",
    "10:30 صباحاً",
    "11:00 صباحاً",
    "11:30 صباحاً",
    "02:00 مساءً",
    "02:30 مساءً",
    "03:00 مساءً",
    "03:30 مساءً",
    "04:00 مساءً",
    "04:30 مساءً",
    "05:00 مساءً",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "department" && { doctor: "" }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("تم إرسال طلب الحجز بنجاح! سيتم التواصل معك قريباً للتأكيد.");
    console.log("Booking data:", formData);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-16 dark:from-gray-900 dark:to-gray-800 md:py-20 lg:py-28"
      dir="rtl"
    >
      {/* Background decorations */}
      <div className="absolute left-0 top-0 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 -z-10 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl"></div>

      <div className="container">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary dark:bg-primary/20">
            احجز موعدك
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
            نسهل عليك الوصول للرعاية الصحية
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            احجز موعدك مع أفضل الأطباء في دقائق معدودة
          </p>
        </div>

        {/* Info Cards with modern design */}
        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:border-blue-500/20 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
            <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 opacity-10 transition-opacity group-hover:opacity-20"></div>
              <svg
                className="relative h-8 w-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
              مواعيد مرنة
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              نوفر مواعيد صباحية ومسائية تناسب جدولك
            </p>
          </div>

          <div className="group rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:border-green-500/20 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
            <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 opacity-10 transition-opacity group-hover:opacity-20"></div>
              <svg
                className="relative h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
              أطباء متخصصون
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              فريق طبي محترف ومعتمد بأعلى الشهادات
            </p>
          </div>

          <div className="group rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:border-purple-500/20 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 sm:col-span-2 lg:col-span-1">
            <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 opacity-10 transition-opacity group-hover:opacity-20"></div>
              <svg
                className="relative h-8 w-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
              رعاية شاملة
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              نهتم بصحتك ونتابع حالتك بشكل مستمر
            </p>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="wow fadeInUp mb-12 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900 lg:mb-5"
              data-wow-delay=".15s"
            >
              {/* Form Header */}
              <div className="border-b border-gray-200 bg-gradient-to-r from-primary/5 to-blue-500/5 px-8 py-8 dark:border-gray-800 sm:px-12">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-blue-600">
                    <svg
                      className="h-7 w-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                      احجز موعدك الطبي
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      املأ النموذج وسنتواصل معك لتأكيد الموعد
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="px-8 py-10 sm:px-12">
                <div className="-mx-4 flex flex-wrap">
                  {/* Full Name */}
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-6">
                      <label
                        htmlFor="fullName"
                        className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
                      >
                        الاسم الكامل <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          placeholder="أدخل اسمك الكامل"
                          className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 pr-12 text-base text-gray-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-primary dark:focus:bg-gray-900"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-6">
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
                      >
                        رقم الهاتف <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="05xxxxxxxx"
                          className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 pr-12 text-base text-gray-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-primary dark:focus:bg-gray-900"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="w-full px-4">
                    <div className="mb-6">
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
                      >
                        البريد الإلكتروني{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="example@email.com"
                          className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 pr-12 text-base text-gray-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-primary dark:focus:bg-gray-900"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Department */}
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-6">
                      <label
                        htmlFor="department"
                        className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
                      >
                        القسم الطبي <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                        </div>
                        <select
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          required
                          className="w-full appearance-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 pr-12 text-base text-gray-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-primary dark:focus:bg-gray-900"
                        >
                          <option value="">اختر القسم</option>
                          {departments.map((dept) => (
                            <option key={dept.value} value={dept.value}>
                              {dept.icon} {dept.label}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Doctor */}
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-6">
                      <label
                        htmlFor="doctor"
                        className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
                      >
                        اختر الطبيب <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <select
                          name="doctor"
                          value={formData.doctor}
                          onChange={handleChange}
                          required
                          disabled={!formData.department}
                          className="w-full appearance-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 pr-12 text-base text-gray-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-primary dark:focus:bg-gray-900"
                        >
                          <option value="">اختر الطبيب</option>
                          {formData.department &&
                            doctors[formData.department]?.map((doctor) => (
                              <option key={doctor} value={doctor}>
                                {doctor}
                              </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-6">
                      <label
                        htmlFor="date"
                        className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
                      >
                        التاريخ <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 pr-12 text-base text-gray-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-primary dark:focus:bg-gray-900"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-6">
                      <label
                        htmlFor="time"
                        className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
                      >
                        الوقت المفضل <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          required
                          className="w-full appearance-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 pr-12 text-base text-gray-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-primary dark:focus:bg-gray-900"
                        >
                          <option value="">اختر الوقت</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="w-full px-4">
                    <div className="mb-6">
                      <label
                        htmlFor="notes"
                        className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white"
                      >
                        ملاحظات أو أعراض
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={4}
                        placeholder="اكتب أي ملاحظات أو أعراض تود إخبار الطبيب بها..."
                        className="w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-base text-gray-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-primary dark:focus:bg-gray-900"
                      ></textarea>
                    </div>
                  </div>

                  <div className="w-full px-4">
                    <button
                      type="submit"
                      className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary to-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/40 sm:w-auto"
                    >
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                      <span className="relative flex items-center justify-center gap-2">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        تأكيد الحجز
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
