import { Blog } from "@/types/blog";

const getBlogData = (): Blog[] => [
  {
    id: 1,
    title: "أهمية الفحوصات الدورية للحفاظ على صحتك",
    paragraph:
      "الفحوصات الطبية الدورية تساعد في الكشف المبكر عن الأمراض وتزيد من فرص العلاج الناجح. تعرف على أهم الفحوصات التي يجب إجراؤها سنوياً للحفاظ على صحة جيدة.",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop&auto=format&q=80",
    author: {
      name: "د. سارة أحمد",
      image: "https://ui-avatars.com/api/?name=Dr+Sarah&background=4A6CF7&color=fff&size=128",
      designation: "أخصائية طب الأسرة",
    },
    tags: ["صحة عامة"],
    publishDate: "15 نوفمبر 2024",
  },
  {
    id: 2,
    title: "نصائح لتقوية جهاز المناعة في فصل الشتاء",
    paragraph:
      "جهاز المناعة القوي يحميك من الأمراض الموسمية. اكتشف أفضل الطرق الطبيعية لتعزيز مناعتك من خلال التغذية السليمة والعادات الصحية اليومية.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=600&fit=crop&auto=format&q=80",
    author: {
      name: "د. محمد حسن",
      image: "https://ui-avatars.com/api/?name=Dr+Mohamed&background=10B981&color=fff&size=128",
      designation: "استشاري التغذية العلاجية",
    },
    tags: ["تغذية"],
    publishDate: "10 نوفمبر 2024",
  },
  {
    id: 3,
    title: "كيف تحجز موعدك الطبي بسهولة عبر الإنترنت",
    paragraph:
      "دليل شامل لحجز المواعيد الطبية إلكترونياً. تعلم كيف توفر وقتك وتتجنب الانتظار من خلال نظام الحجز الإلكتروني المتطور والآمن.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&auto=format&q=80",
    author: {
      name: "د. ليلى كمال",
      image: "https://ui-avatars.com/api/?name=Dr+Laila&background=F59E0B&color=fff&size=128",
      designation: "مديرة الخدمات الطبية",
    },
    tags: ["تقنية"],
    publishDate: "5 نوفمبر 2024",
  },
  {
    id: 4,
    title: "العناية بصحة القلب: نصائح وإرشادات هامة",
    paragraph:
      "القلب هو محرك الجسم. تعرف على أهم النصائح للحفاظ على صحة قلبك من خلال النظام الغذائي الصحي والنشاط البدني المنتظم.",
    image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop&auto=format&q=80",
    author: {
      name: "د. أحمد علي",
      image: "https://ui-avatars.com/api/?name=Dr+Ahmed&background=EF4444&color=fff&size=128",
      designation: "استشاري أمراض القلب",
    },
    tags: ["صحة القلب"],
    publishDate: "1 نوفمبر 2024",
  },
  {
    id: 5,
    title: "الصحة النفسية: لماذا يجب أن نهتم بها؟",
    paragraph:
      "الصحة النفسية لا تقل أهمية عن الصحة الجسدية. اكتشف كيف تحافظ على توازنك النفسي وتتعامل مع ضغوط الحياة اليومية بشكل صحي.",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=600&fit=crop&auto=format&q=80",
    author: {
      name: "د. نور الدين",
      image: "https://ui-avatars.com/api/?name=Dr+Nour&background=8B5CF6&color=fff&size=128",
      designation: "أخصائي الصحة النفسية",
    },
    tags: ["صحة نفسية"],
    publishDate: "28 أكتوبر 2024",
  },
  {
    id: 6,
    title: "أهمية النوم الجيد لصحة أفضل",
    paragraph:
      "النوم الكافي والجيد ضروري لصحة الجسم والعقل. تعرف على عدد ساعات النوم المثالية ونصائح للحصول على نوم هادئ ومريح.",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=600&fit=crop&auto=format&q=80",
    author: {
      name: "د. فاطمة حسين",
      image: "https://ui-avatars.com/api/?name=Dr+Fatima&background=06B6D4&color=fff&size=128",
      designation: "أخصائية طب النوم",
    },
    tags: ["نمط حياة"],
    publishDate: "20 أكتوبر 2024",
  },
];

export default getBlogData;
