import { getImagePath } from "@/lib/utils";
import Image from "next/image";

const AboutSectionTwo = () => {
  const features = [
    {
      icon: (
        <svg
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "نظام آمن وموثوق",
      description:
        "نحمي بياناتك الشخصية والطبية بأحدث تقنيات التشفير. خصوصيتك وأمان معلوماتك هي أولويتنا القصوى.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: (
        <svg
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      title: "دعم فني متميز",
      description:
        "فريق الدعم الفني متاح على مدار الساعة لمساعدتك في أي استفسار أو مشكلة تواجهها أثناء استخدام النظام.",
      color: "from-blue-500 to-primary",
    },
    {
      icon: (
        <svg
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "تكنولوجيا حديثة",
      description:
        "نستخدم أحدث التقنيات لضمان سرعة وسهولة الحجز. واجهة بسيطة ومريحة لجميع الفئات العمرية.",
      color: "from-purple-500 to-indigo-600",
    },
  ];

  return (
    <section
      className="relative overflow-hidden py-16 md:py-20 lg:py-28"
      dir="rtl"
    >
      {/* Background decorations */}
      <div className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl"></div>

      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          {/* Image Side - Shows first on mobile */}
          <div className="order-1 w-full px-4 lg:order-2 lg:w-1/2">
            <div
              className="wow fadeInUp group relative mx-auto mb-12 max-w-[540px] lg:mb-0 lg:ml-0"
              data-wow-delay=".15s"
            >
              {/* Decorative elements */}
              <div className="absolute -left-6 -top-6 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-2xl transition-all duration-500 group-hover:scale-110"></div>
              <div className="absolute -bottom-6 -right-6 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-2xl transition-all duration-500 group-hover:scale-110"></div>

              {/* Main image container */}
              <div className="group-hover:shadow-3xl relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-white p-8 shadow-2xl transition-all duration-500 dark:from-gray-800 dark:to-gray-900">
                {/* Pattern overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>

                <div className="relative aspect-square">
                  {/* Professional medical technology image - no people */}
                  <Image
                    src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&h=800&fit=crop&auto=format&q=80"
                    alt="24/7 Medical Support Service"
                    fill
                    className="rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105 dark:hidden"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=800&fit=crop&auto=format&q=80"
                    alt="Customer Support Healthcare"
                    fill
                    className="hidden rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105 dark:block"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                </div>

                {/* Security badge */}
                <div className="absolute right-8 top-8 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 shadow-lg backdrop-blur-sm dark:bg-gray-900/90">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    آمن ومشفر
                  </span>
                </div>
              </div>

              {/* Floating feature card */}
              <div className="absolute -bottom-4 -right-4 hidden rounded-2xl bg-white p-4 shadow-xl dark:bg-gray-800 sm:-right-8 sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600">
                    <svg
                      className="h-6 w-6 text-white"
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
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      ISO 27001
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      معتمد
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-2 w-full px-4 lg:order-1 lg:w-1/2">
            <div className="wow fadeInUp max-w-[570px]" data-wow-delay=".2s">
              {/* Section label */}
              <div className="mb-8">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary dark:bg-primary/20">
                  لماذا نحن مختلفون
                </span>
              </div>

              {/* Features list */}
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="wow fadeInUp group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-primary/20"
                    data-wow-delay={`.${index + 2}s`}
                  >
                    {/* Icon with gradient */}
                    <div className="mb-4 inline-flex">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}
                      >
                        {feature.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-primary dark:text-white dark:group-hover:text-primary sm:text-2xl">
                      {feature.title}
                    </h3>

                    {/* Decorative line */}
                    <div className="mb-3 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-primary/30 transition-all duration-300 group-hover:w-16"></div>

                    {/* Description */}
                    <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA or additional info */}
              <div className="mt-8 flex items-center gap-4 rounded-2xl bg-gradient-to-r from-primary/5 to-blue-500/5 p-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-bold text-gray-900 dark:text-white">
                    هل لديك استفسار؟
                  </span>{" "}
                  تواصل مع فريق الدعم الفني على مدار الساعة
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
