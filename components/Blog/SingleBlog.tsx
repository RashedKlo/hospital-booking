// SingleBlog.tsx
import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

const SingleBlog = ({ blog }: { blog: Blog }) => {
  const { title, image, paragraph, author, tags, publishDate } = blog;

  return (
    <>
      <div
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg duration-500 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-dark"
        dir="rtl"
      >
        <Link
          href="/blog-details"
          className="relative block aspect-[16/10] w-full overflow-hidden"
        >
          {/* Tag Badge with Modern Design */}
          <span className="absolute right-4 top-4 z-20 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-purple-600 px-4 py-2 text-sm font-semibold capitalize text-white shadow-lg backdrop-blur-sm">
            {tags[0]}
          </span>

          {/* Image with Hover Effect */}
          <div className="relative h-full w-full">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
          </div>
        </Link>

        <div className="flex flex-grow flex-col p-6 sm:p-8">
          {/* Title */}
          <h3 className="mb-4">
            <Link
              href="/blog-details"
              className="line-clamp-2 block text-xl font-bold text-black transition-colors duration-300 hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
            >
              {title}
            </Link>
          </h3>

          {/* Description */}
          <p className="mb-6 line-clamp-3 flex-grow text-base font-medium text-body-color dark:text-body-color-dark">
            {paragraph}
          </p>

          {/* Divider with Gradient */}
          <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700"></div>

          {/* Author and Date Section */}
          <div className="flex items-center justify-between">
            {/* Author Info */}
            <div className="flex flex-row-reverse items-center gap-3">
              <div className="text-right">
                <h4 className="mb-0.5 text-sm font-semibold text-dark dark:text-white">
                  {author.name}
                </h4>
                <p className="text-xs text-body-color dark:text-body-color-dark">
                  {author.designation}
                </p>
              </div>

              {/* Author Avatar with Ring */}
              <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-primary/20 transition-all duration-300 group-hover:ring-primary/40">
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Date with Icon */}
            <div className="flex items-center gap-2 text-body-color dark:text-body-color-dark">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="whitespace-nowrap text-sm font-medium">
                {publishDate}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Hover Accent Line */}
        <div className="h-1 w-full origin-right scale-x-0 transform bg-gradient-to-r from-primary via-purple-600 to-primary transition-transform duration-500 group-hover:scale-x-100"></div>
      </div>
    </>
  );
};

export default SingleBlog;
