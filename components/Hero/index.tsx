import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-900 md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 z-[-2] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[900px] text-center" dir="rtl">
                {/* Optional badge/label */}
                <div className="mb-6 inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-primary dark:bg-blue-900/30">
                  <span>نظام الحجز الإلكتروني</span>
                </div>

                <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight">
                  احجز موعدك الطبي
                  <span className="block text-primary">بكل سهولة وسرعة</span>
                </h1>

                <p className="mx-auto mb-10 max-w-[700px] text-lg leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl md:text-xl">
                  منصة متقدمة لحجز المواعيد الطبية. اختر الطبيب والوقت المناسب
                  لك دون الحاجة للانتظار أو المكالمات الهاتفية.
                </p>

                {/* Feature highlights */}
                <div className="mb-12 flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>حجز فوري</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>متاح 24/7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>تأكيد تلقائي</span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-4">
                  <Link
                    href="/clinics"
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/40"
                  >
                    احجز موعدك الآن
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      ></path>
                    </svg>
                  </Link>
                  <Link
                    href="/how-it-works"
                    className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-700 transition-all duration-300 ease-in-out hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-500 dark:hover:bg-gray-700"
                  >
                    كيف يعمل النظام
                  </Link>
                </div>

                {/* Trust indicators */}
                <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
                  <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                    موثوق به من قبل
                  </p>
                  <div className="flex items-center justify-center gap-8 text-gray-400">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        15,000+
                      </div>
                      <div className="text-sm">موعد شهرياً</div>
                    </div>
                    <div className="h-12 w-px bg-gray-300"></div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        50+
                      </div>
                      <div className="text-sm">طبيب متخصص</div>
                    </div>
                    <div className="h-12 w-px bg-gray-300"></div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        98%
                      </div>
                      <div className="text-sm">رضا المرضى</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimalist decorative elements */}
        <div className="absolute right-0 top-0 z-[-1] h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 z-[-1] h-96 w-96 rounded-full bg-blue-500/5 blur-3xl"></div>
      </section>
    </>
  );
};

export default Hero;
