"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const AboutSectionTwo = () => {
  const features = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "وفّر وقتك",
      description: "احجز موعدك في أقل من دقيقتين دون الحاجة للاتصال أو الانتظار. كل شيء من هاتفك مباشرة.",
      badge: "سريع",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "بياناتك محمية",
      description: "نحافظ على خصوصية معلوماتك الطبية بأعلى معايير الأمان والتشفير المعتمدة عالمياً.",
      badge: "آمن",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      title: "دعم متواصل",
      description: "فريقنا جاهز لمساعدتك في أي وقت. نجيب على استفساراتك ونحل مشاكلك بسرعة واحترافية.",
      badge: "24/7",
    },
  ];

  const benefits = [
    "اختر الطبيب المناسب حسب التخصص والتقييمات",
    "مواعيد مرنة تناسب جدولك اليومي",
    "تذكير تلقائي قبل الموعد عبر الرسائل",
    "إلغاء أو تعديل الموعد بكل سهولة",
  ];

  return (
    <section className="relative bg-gray-50 py-16 dark:bg-gray-900 md:py-20 lg:py-24" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <span className="mb-4 inline-block w-fit rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              لماذا تختارنا
            </span>

            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              تجربة حجز سهلة وموثوقة
            </h2>

            <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
              صممنا النظام ليكون بسيطاً وسريعاً. هدفنا راحتك وتوفير وقتك
            </p>

            {/* Features List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-primary/20 hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {feature.title}
                        </h3>
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                          {feature.badge}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Benefits List */}
            <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
              <h4 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                ما الذي تحصل عليه
              </h4>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex items-center"
          >
            <div className="relative w-full">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=1400&fit=crop&auto=format&q=80"
                  alt="نظام حجز مواعيد طبية سهل وآمن"
                  width={1200}
                  height={1400}
                  className="h-full w-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
              </div>

              {/* Floating Stats Card - Responsive */}
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-gray-200/50 bg-white/95 p-4 shadow-xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/95 sm:bottom-6 sm:left-6 sm:right-6 sm:p-6">
                <div className="grid grid-cols-2 gap-3 text-center sm:gap-6">
                  <div>
                    <div className="mb-0.5 text-lg font-bold text-primary sm:mb-1 sm:text-2xl">99.9%</div>
                    <div className="text-[10px] text-gray-600 dark:text-gray-400 sm:text-xs">نسبة الرضا</div>
                  </div>
                  <div>
                    <div className="mb-0.5 text-lg font-bold text-green-600 sm:mb-1 sm:text-2xl">آمن</div>
                    <div className="text-[10px] text-gray-600 dark:text-gray-400 sm:text-xs">ومشفر بالكامل</div>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full border border-green-500/20 bg-white/95 px-4 py-2 shadow-lg backdrop-blur-sm dark:bg-gray-900/95">
                <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  محمي ومؤمّن
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-950"
        >
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                  محتاج مساعدة؟
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  تواصل معنا في أي وقت
                </p>
              </div>
            </div>
            <button className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90">
              تحدث معنا الآن
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
