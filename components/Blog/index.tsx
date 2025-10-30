import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import blogData from "./blogData";

const Blog = () => {
  return (
    <section
      id="blog"
      className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20 lg:py-28"
      dir="rtl"
    >
      <div className="container">
        <SectionTitle
          title="آخر المقالات الطبية"
          paragraph="تابع آخر المقالات والنصائح الطبية من خبرائنا. معلومات صحية موثوقة لمساعدتك في الحفاظ على صحتك وصحة عائلتك."
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {blogData().map((blog) => (
            <div key={blog.id} className="w-full">
              <SingleBlog blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
