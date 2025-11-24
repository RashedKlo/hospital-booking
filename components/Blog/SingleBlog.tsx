"use client";

import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const SingleBlog = ({ blog }: { blog: Blog }) => {
  const { id, title, image, paragraph, author, tags, publishDate } = blog;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group h-full"
      dir="rtl"
    >
      <Link
        href={`/blog-details/${id}`}
        className="block h-full overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:border-primary/20 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950"
      >
        {/* Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Tag Badge */}
          <span className="absolute right-4 top-4 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold text-primary backdrop-blur-sm dark:bg-gray-900/95">
            {tags[0]}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-primary dark:text-white">
            {title}
          </h3>

          {/* Description */}
          <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {paragraph}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-800">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {author.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {publishDate}
                </p>
              </div>
            </div>

            {/* Read More Arrow */}
            <svg
              className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default SingleBlog;
