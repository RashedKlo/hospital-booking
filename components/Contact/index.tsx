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
    { value: "cardiology", label: "أمراض القلب" },
    { value: "orthopedics", label: "جراحة العظام" },
    { value: "pediatrics", label: "طب الأطفال" },
    { value: "dermatology", label: "الأمراض الجلدية" },
    { value: "general", label: "الطب العام" },
    { value: "neurology", label: "الأمراض العصبية" },
    { value: "ophthalmology", label: "طب العيون" },
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
      className="overflow-hidden py-16 md:py-20 lg:py-28"
      dir="rtl"
    >
      <div className="container">
        {/* Info Cards */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center dark:from-gray-800 dark:to-gray-700">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white">
              <svg
                className="h-8 w-8"
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
            <h3 className="mb-2 text-lg font-bold text-dark dark:text-white">
              مواعيد مرنة
            </h3>
            <p className="text-sm text-body-color">
              نوفر مواعيد صباحية ومسائية
            </p>
          </div>

          <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-6 text-center dark:from-gray-800 dark:to-gray-700">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white">
              <svg
                className="h-8 w-8"
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
            <h3 className="mb-2 text-lg font-bold text-dark dark:text-white">
              أطباء متخصصون
            </h3>
            <p className="text-sm text-body-color">فريق طبي محترف ومعتمد</p>
          </div>

          <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-6 text-center dark:from-gray-800 dark:to-gray-700">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500 text-white">
              <svg
                className="h-8 w-8"
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
            <h3 className="mb-2 text-lg font-bold text-dark dark:text-white">
              رعاية شاملة
            </h3>
            <p className="text-sm text-body-color">نهتم بصحتك ونتابع حالتك</p>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="wow fadeInUp mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s"
            >
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                احجز موعدك الطبي
              </h2>
              <p className="mb-8 text-base font-medium text-body-color">
                املأ النموذج أدناه وسيتواصل معك فريقنا الطبي لتأكيد موعدك.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="-mx-4 flex flex-wrap">
                  {/* Full Name */}
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="fullName"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        الاسم الكامل <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="أدخل اسمك الكامل"
                        className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="phone"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        رقم الهاتف <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="05xxxxxxxx"
                        className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        البريد الإلكتروني{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="example@email.com"
                        className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>

                  {/* Department */}
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="department"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        القسم الطبي <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      >
                        <option value="">اختر القسم</option>
                        {departments.map((dept) => (
                          <option key={dept.value} value={dept.value}>
                            {dept.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Doctor */}
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="doctor"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        اختر الطبيب <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="doctor"
                        value={formData.doctor}
                        onChange={handleChange}
                        required
                        disabled={!formData.department}
                        className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary disabled:bg-gray-200 dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      >
                        <option value="">اختر الطبيب</option>
                        {formData.department &&
                          doctors[formData.department]?.map((doctor) => (
                            <option key={doctor} value={doctor}>
                              {doctor}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="date"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        التاريخ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>

                  {/* Time */}
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="time"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        الوقت المفضل <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      >
                        <option value="">اختر الوقت</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="notes"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        ملاحظات أو أعراض
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={5}
                        placeholder="اكتب أي ملاحظات أو أعراض تود إخبار الطبيب بها..."
                        className="w-full resize-none rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      ></textarea>
                    </div>
                  </div>

                  <div className="w-full px-4">
                    <button
                      type="submit"
                      className="rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark"
                    >
                      تأكيد الحجز
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
