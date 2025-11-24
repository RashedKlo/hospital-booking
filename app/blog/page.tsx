"use client";

import SingleBlog from "@/components/Blog/SingleBlog";
import blogData from "@/components/Blog/blogData";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { motion } from "framer-motion";
import { Metadata } from "next";

const Blog = () => {
  return (
    <>
      <Breadcrumb
        pageName="المدونة الطبية"
        description="اكتشف أحدث المقالات والنصائح الطبية. نشارك معك معلومات قيمة ومحتوى مفيد يساعدك على البقاء بصحة جيدة."
      />

      <section className="bg-white py-16 dark:bg-gray-950 md:py-20 lg:py-24" dir="rtl">
        <div className="container mx-auto px-4">
          {/* Blog Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogData().map((blog) => (
              <SingleBlog key={blog.id} blog={blog} />
            ))}
          </div>

          {/* Pagination */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 flex justify-center"
          >
            <nav className="flex items-center gap-2">
              <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition-colors hover:border-primary hover:bg-primary hover:text-white dark:border-gray-800 dark:hover:border-primary">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button className="flex h-10 min-w-[40px] items-center justify-center rounded-lg border border-primary bg-primary px-4 text-sm font-semibold text-white">
                1
              </button>
              <button className="flex h-10 min-w-[40px] items-center justify-center rounded-lg border border-gray-200 px-4 text-sm font-semibold text-gray-700 transition-colors hover:border-primary hover:bg-primary hover:text-white dark:border-gray-800 dark:text-gray-300">
                2
              </button>
              <button className="flex h-10 min-w-[40px] items-center justify-center rounded-lg border border-gray-200 px-4 text-sm font-semibold text-gray-700 transition-colors hover:border-primary hover:bg-primary hover:text-white dark:border-gray-800 dark:text-gray-300">
                3
              </button>
              <span className="flex h-10 items-center px-2 text-gray-400">...</span>
              <button className="flex h-10 min-w-[40px] items-center justify-center rounded-lg border border-gray-200 px-4 text-sm font-semibold text-gray-700 transition-colors hover:border-primary hover:bg-primary hover:text-white dark:border-gray-800 dark:text-gray-300">
                12
              </button>

              <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 transition-colors hover:border-primary hover:bg-primary hover:text-white dark:border-gray-800 dark:text-gray-300">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Blog;
