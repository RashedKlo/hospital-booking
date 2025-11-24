"use client";

import SharePost from "@/components/Blog/SharePost";
import TagButton from "@/components/Blog/TagButton";
import { getImagePath } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";

const BlogDetailsPage = () => {
  return (
    <section className="bg-white py-16 dark:bg-gray-950 md:py-20 lg:py-24" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            {/* Category Badge */}
            <span className="mb-4 inline-block rounded-lg bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              صحة عامة
            </span>

            {/* Title */}
            <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
              أهمية الفحوصات الدورية للحفاظ على صحتك
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 border-b border-gray-200 pb-6 dark:border-gray-800">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src="https://ui-avatars.com/api/?name=Dr+Sarah&background=4A6CF7&color=fff&size=128"
                    alt="د. سارة أحمد"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    د. سارة أحمد
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    أخصائية طب الأسرة
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">15 نوفمبر 2024</span>
              </div>

              {/* Reading Time */}
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">5 دقائق قراءة</span>
              </div>

              {/* Views */}
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-sm">2,340 مشاهدة</span>
              </div>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10 overflow-hidden rounded-2xl"
          >
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&h=800&fit=crop&auto=format&q=80"
                alt="الفحوصات الطبية الدورية"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-lg max-w-none dark:prose-invert"
          >
            <p className="mb-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              الفحوصات الطبية الدورية هي أحد أهم الإجراءات الوقائية التي يمكن أن تتخذها للحفاظ على صحتك. فهي تساعد في الكشف المبكر عن الأمراض والمشاكل الصحية قبل أن تتطور إلى حالات أكثر خطورة، مما يزيد من فرص العلاج الناجح ويحسن جودة حياتك.
            </p>

            <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
              لماذا تعتبر الفحوصات الدورية مهمة؟
            </h2>

            <p className="mb-6 leading-relaxed text-gray-600 dark:text-gray-400">
              العديد من الأمراض الخطيرة مثل السكري وارتفاع ضغط الدم وأمراض القلب لا تظهر لها أعراض واضحة في مراحلها الأولى. الفحوصات الدورية تساعد في اكتشاف هذه الحالات مبكراً، مما يتيح لك البدء في العلاج قبل أن تتفاقم المشكلة.
            </p>

            <h3 className="mb-4 mt-6 text-xl font-bold text-gray-900 dark:text-white">
              الفحوصات الأساسية التي يجب إجراؤها سنوياً:
            </h3>

            <ul className="mb-8 space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-3">
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>فحص ضغط الدم:</strong> للكشف المبكر عن ارتفاع ضغط الدم الذي قد يؤدي إلى مشاكل قلبية خطيرة</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>فحص السكر في الدم:</strong> للكشف عن مرض السكري أو مقدمات السكري</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>فحص الكوليسترول:</strong> لتقييم مستويات الدهون في الدم وصحة القلب</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>فحص وظائف الكلى والكبد:</strong> للتأكد من سلامة هذه الأعضاء الحيوية</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>فحص صورة الدم الكاملة:</strong> للكشف عن فقر الدم والالتهابات</span>
              </li>
            </ul>

            {/* Quote */}
            <div className="my-10 rounded-2xl border-r-4 border-primary bg-gray-50 p-6 dark:bg-gray-900 md:p-8">
              <p className="text-lg italic text-gray-700 dark:text-gray-300">
                &quot;الوقاية خير من العلاج. الفحوصات الدورية هي استثمار في صحتك المستقبلية وضمان لحياة أطول وأكثر صحة.&quot;
              </p>
              <p className="mt-3 text-sm font-semibold text-primary">
                - د. سارة أحمد، أخصائية طب الأسرة
              </p>
            </div>

            <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
              متى يجب إجراء الفحوصات؟
            </h2>

            <p className="mb-6 leading-relaxed text-gray-600 dark:text-gray-400">
              يُنصح بإجراء الفحوصات الأساسية مرة واحدة على الأقل سنوياً للأشخاص الأصحاء. أما الأشخاص الذين لديهم عوامل خطر معينة مثل التاريخ العائلي للأمراض أو السمنة، فقد يحتاجون إلى فحوصات أكثر تكراراً.
            </p>

            <h3 className="mb-4 mt-6 text-xl font-bold text-gray-900 dark:text-white">
              نصائح للاستعداد للفحوصات:
            </h3>

            <ul className="mb-8 space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-3">
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>الصيام لمدة 8-12 ساعة قبل فحوصات الدم إذا طلب منك ذلك</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>إحضار قائمة بجميع الأدوية التي تتناولها</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>تدوين أي أعراض أو مخاوف صحية لمناقشتها مع الطبيب</span>
              </li>
            </ul>

            <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
              احجز فحصك الدوري الآن
            </h2>

            <p className="mb-6 leading-relaxed text-gray-600 dark:text-gray-400">
              من خلال نظامنا الإلكتروني المتطور، يمكنك حجز موعد للفحوصات الدورية بكل سهولة. اختر الوقت المناسب لك واحصل على تذكير تلقائي قبل الموعد. صحتك تستحق الاهتمام، فلا تؤجل فحصك الدوري.
            </p>

            <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6 dark:bg-primary/10">
              <h4 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
                هل تحتاج إلى مساعدة؟
              </h4>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                فريقنا الطبي جاهز للإجابة على جميع استفساراتك ومساعدتك في اختيار الفحوصات المناسبة لحالتك.
              </p>
              <button className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90">
                احجز موعدك الآن
              </button>
            </div>
          </motion.div>

          {/* Tags and Share */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-gray-200 pt-8 dark:border-gray-800"
          >
            {/* Tags */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                الوسوم:
              </h4>
              <div className="flex flex-wrap gap-2">
                <TagButton text="صحة عامة" />
                <TagButton text="فحوصات طبية" />
                <TagButton text="وقاية" />
              </div>
            </div>

            {/* Share */}
            <div>
              <h5 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                شارك المقال:
              </h5>
              <SharePost />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsPage;
