import { getImagePath } from "@/lib/utils";
import { Blog } from "@/types/blog";

const getBlogData = (): Blog[] => [
  {
    id: 1,
    title: "أهمية الفحوصات الدورية للحفاظ على صحتك",
    paragraph:
      "الفحوصات الطبية الدورية تساعد في الكشف المبكر عن الأمراض وتزيد من فرص العلاج الناجح. تعرف على أهم الفحوصات التي يجب إجراؤها سنوياً.",
    image: getImagePath("/images/blog/blog-01.jpg"),
    author: {
      name: "د. سارة أحمد",
      image: getImagePath("/images/blog/author-01.png"),
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
    image: getImagePath("/images/blog/blog-02.jpg"),
    author: {
      name: "د. محمد حسن",
      image: getImagePath("/images/blog/author-02.png"),
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
    image: getImagePath("/images/blog/blog-03.jpg"),
    author: {
      name: "د. ليلى كمال",
      image: getImagePath("/images/blog/author-03.png"),
      designation: "مدير الخدمات الطبية",
    },
    tags: ["تقنية"],
    publishDate: "2025",
  },
];

export default getBlogData;
