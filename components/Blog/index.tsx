import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import blogData from "./blogData";

const Blog = () => {
  return (
    <section
      id="blog"
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16 dark:from-gray-dark dark:to-bg-color-dark md:py-20 lg:py-28"
      dir="rtl"
    >
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-10 top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        {/* Section Title */}
        <SectionTitle
          title="آخر المقالات الطبية"
          paragraph="تابع آخر المقالات والنصائح الطبية من خبرائنا. معلومات صحية موثوقة لمساعدتك في الحفاظ على صحتك وصحة عائلتك."
          center
        />

        {/* Blog Grid with Modern Spacing */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
          {blogData().map((blog, index) => (
            <div
              key={blog.id}
              className="w-full"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <SingleBlog blog={blog} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 flex justify-center">
          <button className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-primary to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <span>عرض جميع المقالات</span>
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
                d="M13 7l-5 5 5 5"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
