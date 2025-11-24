"use client";

import SharePost from "@/components/Blog/SharePost";
import TagButton from "@/components/Blog/TagButton";
import blogData from "@/components/Blog/blogData";
import Image from "next/image";
import { motion } from "framer-motion";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";

// Medical content for each blog post
const blogContent: Record<number, {
    sections: Array<{
        title: string;
        content: string;
        list?: string[];
    }>;
    quote?: {
        text: string;
        author: string;
    };
    cta?: {
        title: string;
        description: string;
        buttonText: string;
    };
}> = {
    1: {
        sections: [
            {
                title: "لماذا تعتبر الفحوصات الدورية مهمة؟",
                content: "العديد من الأمراض الخطيرة مثل السكري وارتفاع ضغط الدم وأمراض القلب لا تظهر لها أعراض واضحة في مراحلها الأولى. الفحوصات الدورية تساعد في اكتشاف هذه الحالات مبكراً، مما يتيح لك البدء في العلاج قبل أن تتفاقم المشكلة.",
            },
            {
                title: "الفحوصات الأساسية التي يجب إجراؤها سنوياً:",
                content: "",
                list: [
                    "فحص ضغط الدم: للكشف المبكر عن ارتفاع ضغط الدم",
                    "فحص السكر في الدم: للكشف عن مرض السكري أو مقدمات السكري",
                    "فحص الكوليسترول: لتقييم مستويات الدهون في الدم",
                    "فحص وظائف الكلى والكبد: للتأكد من سلامة هذه الأعضاء",
                    "فحص صورة الدم الكاملة: للكشف عن فقر الدم والالتهابات",
                ],
            },
        ],
        quote: {
            text: "الوقاية خير من العلاج. الفحوصات الدورية هي استثمار في صحتك المستقبلية.",
            author: "د. سارة أحمد",
        },
        cta: {
            title: "احجز فحصك الدوري الآن",
            description: "من خلال نظامنا الإلكتروني، يمكنك حجز موعد للفحوصات بكل سهولة.",
            buttonText: "احجز موعدك",
        },
    },
    2: {
        sections: [
            {
                title: "كيف يعمل جهاز المناعة؟",
                content: "جهاز المناعة هو خط الدفاع الأول ضد الأمراض. في فصل الشتاء، يواجه تحديات إضافية بسبب البرد والفيروسات المنتشرة.",
            },
            {
                title: "أفضل الأطعمة لتقوية المناعة:",
                content: "",
                list: [
                    "الحمضيات الغنية بفيتامين C مثل البرتقال والليمون",
                    "الثوم والبصل لخصائصهما المضادة للبكتيريا",
                    "الزنجبيل والكركم للحد من الالتهابات",
                    "المكسرات والبذور الغنية بفيتامين E",
                    "الخضروات الورقية الداكنة",
                ],
            },
        ],
        quote: {
            text: "التغذية السليمة هي أساس جهاز مناعة قوي يحميك من الأمراض.",
            author: "د. محمد حسن",
        },
    },
    3: {
        sections: [
            {
                title: "مميزات الحجز الإلكتروني",
                content: "نظام الحجز الإلكتروني يوفر لك الوقت والجهد. لا حاجة للانتظار على الهاتف أو زيارة العيادة شخصياً.",
            },
            {
                title: "خطوات الحجز السهلة:",
                content: "",
                list: [
                    "اختر التخصص الطبي المناسب",
                    "حدد الطبيب المفضل لديك",
                    "اختر الموعد المناسب من الأوقات المتاحة",
                    "أدخل بياناتك الشخصية",
                    "احصل على تأكيد فوري وتذكير قبل الموعد",
                ],
            },
        ],
        cta: {
            title: "ابدأ الحجز الآن",
            description: "جرب نظامنا السهل والسريع لحجز موعدك الطبي.",
            buttonText: "احجز الآن",
        },
    },
    4: {
        sections: [
            {
                title: "أهمية صحة القلب",
                content: "القلب هو العضو الأكثر أهمية في جسمك. الحفاظ على صحته يعني حياة أطول وأكثر نشاطاً.",
            },
            {
                title: "نصائح للحفاظ على صحة القلب:",
                content: "",
                list: [
                    "ممارسة الرياضة بانتظام لمدة 30 دقيقة يومياً",
                    "تناول نظام غذائي غني بالخضروات والفواكه",
                    "تجنب التدخين والكحول",
                    "الحفاظ على وزن صحي",
                    "إدارة التوتر والضغوط النفسية",
                ],
            },
        ],
        quote: {
            text: "قلب سليم يعني حياة سعيدة. اعتنِ بقلبك اليوم لتستمتع بالغد.",
            author: "د. أحمد علي",
        },
    },
    5: {
        sections: [
            {
                title: "الصحة النفسية جزء من الصحة العامة",
                content: "الصحة النفسية لا تقل أهمية عن الصحة الجسدية. التوازن النفسي يؤثر على جودة حياتك بشكل كبير.",
            },
            {
                title: "علامات تحتاج فيها لاستشارة نفسية:",
                content: "",
                list: [
                    "الشعور بالحزن أو القلق المستمر",
                    "صعوبة في النوم أو النوم الزائد",
                    "فقدان الاهتمام بالأنشطة المفضلة",
                    "تغيرات في الشهية أو الوزن",
                    "صعوبة في التركيز أو اتخاذ القرارات",
                ],
            },
        ],
        quote: {
            text: "طلب المساعدة النفسية ليس ضعفاً، بل هو قوة وشجاعة.",
            author: "د. نور الدين",
        },
    },
    6: {
        sections: [
            {
                title: "لماذا النوم مهم؟",
                content: "النوم الجيد ضروري لتجديد طاقة الجسم والعقل. قلة النوم تؤثر على المناعة والتركيز والمزاج.",
            },
            {
                title: "نصائح للحصول على نوم أفضل:",
                content: "",
                list: [
                    "حدد موعداً ثابتاً للنوم والاستيقاظ",
                    "تجنب الكافيين قبل النوم بـ 6 ساعات",
                    "اجعل غرفة النوم مظلمة وهادئة",
                    "تجنب الشاشات قبل النوم بساعة",
                    "مارس الاسترخاء قبل النوم",
                ],
            },
        ],
        quote: {
            text: "النوم الجيد هو أفضل دواء طبيعي لجسمك وعقلك.",
            author: "د. فاطمة حسين",
        },
    },
};

const BlogDetails = () => {
    const params = useParams();
    const blogId = parseInt(params.id as string);
    const blog = blogData().find((b) => b.id === blogId);

    if (!blog) {
        notFound();
    }

    const content = blogContent[blogId] || blogContent[1];

    return (
        <section className="bg-white py-12 dark:bg-gray-950 sm:py-16 md:py-20 lg:py-24" dir="rtl">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-6 sm:mb-8"
                    >
                        {/* Back Button */}
                        <Link
                            href="/blog"
                            className="mb-3 inline-flex items-center gap-2 text-xs text-gray-600 transition-colors hover:text-primary dark:text-gray-400 sm:mb-4 sm:text-sm"
                        >
                            <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            العودة للمدونة
                        </Link>

                        {/* Category Badge */}
                        <span className="mb-3 inline-block rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:mb-4 sm:px-4 sm:py-1.5 sm:text-sm">
                            {blog.tags[0]}
                        </span>

                        {/* Title */}
                        <h1 className="mb-4 text-2xl font-bold leading-tight text-gray-900 dark:text-white sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
                            {blog.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-3 border-b border-gray-200 pb-4 dark:border-gray-800 sm:gap-4 sm:pb-6 md:gap-6">
                            {/* Author */}
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="relative h-10 w-10 overflow-hidden rounded-full sm:h-12 sm:w-12">
                                    <Image
                                        src={blog.author.image}
                                        alt={blog.author.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-900 dark:text-white sm:text-sm">
                                        {blog.author.name}
                                    </p>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400 sm:text-xs">
                                        {blog.author.designation}
                                    </p>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 sm:gap-2">
                                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-xs sm:text-sm">{blog.publishDate}</span>
                            </div>

                            {/* Reading Time */}
                            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 sm:gap-2">
                                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-xs sm:text-sm">5 دقائق قراءة</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Featured Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-8 overflow-hidden rounded-2xl sm:mb-10"
                    >
                        <div className="relative aspect-[16/9] w-full">
                            <Image
                                src={blog.image}
                                alt={blog.title}
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
                        className="prose prose-base max-w-none dark:prose-invert sm:prose-lg"
                    >
                        {/* Introduction */}
                        <p className="mb-6 text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:mb-8 sm:text-lg">
                            {blog.paragraph}
                        </p>

                        {/* Dynamic Sections */}
                        {content.sections.map((section, index) => (
                            <div key={index} className="mb-6 sm:mb-8">
                                {section.title && (
                                    <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white sm:mb-4 sm:text-2xl">
                                        {section.title}
                                    </h2>
                                )}
                                {section.content && (
                                    <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-400 sm:mb-6">
                                        {section.content}
                                    </p>
                                )}
                                {section.list && (
                                    <ul className="mb-4 space-y-2 sm:mb-6 sm:space-y-3">
                                        {section.list.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 sm:gap-3 sm:text-base">
                                                <svg className="mt-1 h-4 w-4 flex-shrink-0 text-primary sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}

                        {/* Quote */}
                        {content.quote && (
                            <div className="my-8 rounded-2xl border-r-4 border-primary bg-gray-50 p-4 dark:bg-gray-900 sm:my-10 sm:p-6 md:p-8">
                                <p className="text-base italic text-gray-700 dark:text-gray-300 sm:text-lg">
                                    &quot;{content.quote.text}&quot;
                                </p>
                                <p className="mt-2 text-xs font-semibold text-primary sm:mt-3 sm:text-sm">
                                    - {content.quote.author}
                                </p>
                            </div>
                        )}

                        {/* CTA */}
                        {content.cta && (
                            <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-4 dark:bg-primary/10 sm:mt-10 sm:p-6">
                                <h4 className="mb-2 text-base font-bold text-gray-900 dark:text-white sm:mb-3 sm:text-lg">
                                    {content.cta.title}
                                </h4>
                                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400 sm:mb-4 sm:text-base">
                                    {content.cta.description}
                                </p>
                                <Link href="/contact">
                                    <button className="rounded-lg bg-primary px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-primary/90 sm:px-6 sm:py-3 sm:text-sm">
                                        {content.cta.buttonText}
                                    </button>
                                </Link>
                            </div>
                        )}
                    </motion.div>

                    {/* Tags and Share */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-8 flex flex-wrap items-start justify-between gap-4 border-t border-gray-200 pt-6 dark:border-gray-800 sm:mt-10 sm:gap-6 sm:pt-8"
                    >
                        {/* Tags */}
                        <div>
                            <h4 className="mb-2 text-xs font-semibold text-gray-900 dark:text-white sm:mb-3 sm:text-sm">
                                الوسوم:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {blog.tags.map((tag, index) => (
                                    <TagButton key={index} text={tag} />
                                ))}
                            </div>
                        </div>

                        {/* Share */}
                        <div>
                            <h5 className="mb-2 text-xs font-semibold text-gray-900 dark:text-white sm:mb-3 sm:text-sm">
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

export default BlogDetails;
