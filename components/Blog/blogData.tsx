import { Blog } from "@/types/blog";

const getBlogData = (): Blog[] => [
  {
    id: 1,
    title: "أهمية الفحوصات الدورية للحفاظ على صحتك",
    paragraph:
      "الفحوصات الطبية الدورية تساعد في الكشف المبكر عن الأمراض وتزيد من فرص العلاج الناجح. تعرف على أهم الفحوصات التي يجب إجراؤها سنوياً.",
    image: "https://source.unsplash.com/random/800x600/?health+checkup",
    author: {
      name: "د. سارة أحمد",
      image:
        "https://ui-avatars.com/api/?name=د.+سارة+أحمد&background=random&size=128",
      designation: "أخصائية طب الأسرة",
    },
    tags: ["صحة عامة"],
    publishDate: "2025",
  },
  {
    id: 2,
    title: "نصائح لتقوية جهاز المناعة في فصل الشتاء",
    paragraph:
      "جهاز المناعة القوي يحميك من الأمراض الموسمية. اكتشف أفضل الطرق الطبيعية لتعزيز مناعتك من خلال التغذية السليمة والعادات الصحية.",
    image: "https://source.unsplash.com/random/800x600/?immune+system+winter",
    author: {
      name: "د. محمد حسن",
      image:
        "https://ui-avatars.com/api/?name=د.+محمد+حسن&background=random&size=128",
      designation: "استشاري التغذية العلاجية",
    },
    tags: ["تغذية"],
    publishDate: "2025",
  },
  {
    id: 3,
    title: "كيف تحجز موعدك الطبي بسهولة عبر الإنترنت",
    paragraph:
      "دليل شامل لحجز المواعيد الطبية إلكترونياً. تعلم كيف توفر وقتك وتتجنب الانتظار من خلال نظام الحجز الإلكتروني المتطور.",
    image:
      "https://source.unsplash.com/random/800x600/?online+doctor+appointment",
    author: {
      name: "د. ليلى كمال",
      image:
        "https://ui-avatars.com/api/?name=د.+ليلى+كمال&background=random&size=128",
      designation: "مدير الخدمات الطبية",
    },
    tags: ["تقنية"],
    publishDate: "2025",
  },
];

export default getBlogData;
