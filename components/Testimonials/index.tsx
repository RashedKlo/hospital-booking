import { getImagePath } from "@/lib/utils";
import { Testimonial } from "@/types/testimonial";
import SectionTitle from "../Common/SectionTitle";
import SingleTestimonial from "./SingleTestimonial";

const getTestimonialData = (): Testimonial[] => [
  {
    id: 1,
    name: "أحمد محمد العلي",
    designation: "مريض - قسم الباطنية",
    content:
      "تجربة رائعة مع نظام الحجز الإلكتروني. سهل الاستخدام ووفر علي الكثير من الوقت. لم أعد أضطر للانتظار في طوابير طويلة.",
    image: getImagePath("/images/testimonials/auth-01.png"),
    star: 5,
  },
  {
    id: 2,
    name: "فاطمة حسن الخالدي",
    designation: "مريضة - قسم النساء والولادة",
    content:
      "الخدمة ممتازة والأطباء محترفون جداً. نظام الحجز الإلكتروني سهل ومريح، وحصلت على موعدي في الوقت المحدد بالضبط.",
    image: getImagePath("/images/testimonials/auth-02.png"),
    star: 5,
  },
  {
    id: 3,
    name: "خالد يوسف السعيد",
    designation: "مريض - قسم العظام",
    content:
      "أفضل مستشفى تعاملت معها. النظام الإلكتروني منظم ومرتب، والموظفون متعاونون. أنصح الجميع بهذه الخدمة الرائعة.",
    image: getImagePath("/images/testimonials/auth-03.png"),
    star: 5,
  },
];

const Testimonials = () => {
  return (
    <section
      className="relative z-10 overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16 dark:from-gray-900 dark:to-gray-800 md:py-20 lg:py-28"
      dir="rtl"
    >
      {/* Decorative background elements */}
      <div className="absolute left-0 top-0 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 -z-10 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl"></div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="container">
        {/* Header with stats */}
        <div className="mb-16">
          <SectionTitle
            title="ماذا يقول مرضانا"
            paragraph="آراء حقيقية من مرضى استخدموا نظام الحجز الإلكتروني وحصلوا على أفضل رعاية صحية. رضاكم هو هدفنا الأول."
            center
            label="شهادات العملاء"
            variant="gradient"
          />

          {/* Stats bar */}
          <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-8 rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-900 sm:gap-12">
            <div className="text-center">
              <div className="mb-1 flex items-center justify-center gap-1">
                <span className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                  4.9
                </span>
                <svg
                  className="text-yellow-400 h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                متوسط التقييم
              </p>
            </div>

            <div className="h-12 w-px bg-gray-300 dark:bg-gray-700"></div>

            <div className="text-center">
              <div className="mb-1 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                2,450+
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                مراجعة إيجابية
              </p>
            </div>

            <div className="h-12 w-px bg-gray-300 dark:bg-gray-700"></div>

            <div className="text-center">
              <div className="mb-1 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                98%
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                نسبة الرضا
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {getTestimonialData().map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="wow fadeInUp"
              data-wow-delay={`.${index + 1}s`}
            >
              <SingleTestimonial testimonial={testimonial} />
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-sm font-medium text-gray-600 dark:text-gray-400">
            موثوق به من قبل آلاف المرضى
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0">
            {/* Trust badges - You can replace with actual images */}
            <div className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                ISO معتمد
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                أمان البيانات
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                خدمة سريعة
              </span>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-r from-primary to-blue-600 p-8 shadow-2xl shadow-primary/30">
            <h3 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
              هل أنت مستعد لتجربة أفضل؟
            </h3>
            <p className="mb-6 text-lg text-white/90">
              انضم إلى آلاف المرضى الراضين واحجز موعدك الآن
            </p>
            <button className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-primary shadow-lg transition-all hover:scale-105 hover:shadow-xl">
              <span>احجز موعدك الآن</span>
              <svg
                className="h-5 w-5 transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Minimalist decorative SVG */}
      <div className="absolute right-0 top-20 -z-10 opacity-30">
        <svg
          width="150"
          height="150"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#4A6CF7", stopOpacity: 0.2 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#4A6CF7", stopOpacity: 0 }}
              />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="80" fill="url(#grad1)" />
        </svg>
      </div>

      <div className="absolute bottom-20 left-0 -z-10 opacity-30">
        <svg
          width="120"
          height="120"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#4A6CF7", stopOpacity: 0.2 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#4A6CF7", stopOpacity: 0 }}
              />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="60" fill="url(#grad2)" />
        </svg>
      </div>
    </section>
  );
};

export default Testimonials;
