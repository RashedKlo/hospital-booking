import { getImagePath } from "@/lib/utils";
import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const AboutSectionOne = () => {
  const List = ({ text, icon }) => (
    <div
      className="group mb-4 flex items-start gap-4 rounded-xl bg-white p-4 transition-all duration-300 hover:bg-primary/5 hover:shadow-md dark:bg-gray-800/50 dark:hover:bg-primary/10"
      dir="rtl"
    >
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 text-primary shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:from-primary group-hover:to-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30">
        {icon || checkIcon}
      </span>
      <p className="pt-1.5 text-base font-semibold text-gray-700 dark:text-gray-200 sm:text-lg">
        {text}
      </p>
    </div>
  );

  const features = [
    {
      text: "أطباء ذوو خبرة عالية",
      icon: (
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
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      text: "أحدث المعدات الطبية",
      icon: (
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
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      ),
    },
    {
      text: "خدمة متاحة 24/7",
      icon: (
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      text: "حجز فوري ومباشر",
      icon: (
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      text: "رعاية صحية شاملة",
      icon: (
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
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
    {
      text: "أسعار تنافسية",
      icon: (
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
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden py-16 md:py-20 lg:py-28"
      dir="rtl"
    >
      {/* Background decorations */}
      <div className="absolute left-0 top-0 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 -z-10 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl"></div>

      <div className="container">
        <div className="border-b border-gray-200 pb-16 dark:border-gray-800 md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-col-reverse flex-wrap items-center gap-y-12 md:flex-row">
            {/* Content Side */}
            <div className="w-full px-4 lg:w-1/2">
              <SectionTitle
                title="نظام متطور لحجز المواعيد الطبية"
                paragraph="نحن نركز على توفير أفضل تجربة للمرضى من خلال نظام حجز إلكتروني سهل وسريع. هدفنا هو تقديم رعاية صحية عالية الجودة مع توفير الوقت والجهد."
                mb="44px"
                label="من نحن"
              />

              <div
                className="wow fadeInUp mb-8 max-w-[620px]"
                data-wow-delay=".15s"
              >
                {/* Stats Cards */}
                <div className="mb-8 grid grid-cols-3 gap-4">
                  <div className="rounded-xl bg-gradient-to-br from-primary/10 to-blue-500/10 p-4 text-center">
                    <div className="text-2xl font-bold text-primary sm:text-3xl">
                      500+
                    </div>
                    <div className="mt-1 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                      طبيب
                    </div>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-4 text-center">
                    <div className="text-2xl font-bold text-green-600 sm:text-3xl">
                      15k+
                    </div>
                    <div className="mt-1 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                      مريض
                    </div>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600 sm:text-3xl">
                      98%
                    </div>
                    <div className="mt-1 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                      رضا
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="wow fadeInUp"
                      data-wow-delay={`.${index + 2}s`}
                    >
                      <List text={feature.text} icon={feature.icon} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className=" w-full px-4  lg:w-1/2">
              <div
                className="wow fadeInUp group relative mx-auto max-w-[540px] lg:mr-0"
                data-wow-delay=".2s"
              >
                {/* Decorative elements */}
                <div className="absolute -right-6 -top-6 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-2xl transition-all duration-500 group-hover:scale-110"></div>
                <div className="absolute -bottom-6 -left-6 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-2xl transition-all duration-500 group-hover:scale-110"></div>

                {/* Main image container with modern styling */}
                <div className="group-hover:shadow-3xl relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-white p-8 shadow-2xl transition-all duration-500 dark:from-gray-800 dark:to-gray-900">
                  {/* Pattern overlay */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>

                  <div className="relative aspect-square">
                    {/* Medical Care Image (light & dark modes) */}
                    {/* Medical Care Images - Professional & Modern */}
                    <Image
                      src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&h=800&fit=crop&auto=format&q=80"
                      alt="Modern medical laboratory with diagnostic equipment"
                      fill
                      className="rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105 dark:hidden"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&h=800&fit=crop&auto=format&q=80"
                      alt="Medical monitoring screens and healthcare technology"
                      fill
                      className="hidden rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105 dark:block"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                  </div>

                  {/* Floating badge */}
                  <div className="absolute left-8 top-8 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 shadow-lg backdrop-blur-sm dark:bg-gray-900/90">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      متاح الآن
                    </span>
                  </div>
                </div>

                {/* Decorative stats cards */}
                <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white p-4 shadow-xl dark:bg-gray-800 sm:-left-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600">
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
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        2,450+
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        حجز اليوم
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
