import { Feature } from "@/types/feature";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;
  return (
    <div className="w-full">
      <div className="wow fadeInUp group relative h-full" data-wow-delay=".15s">
        {/* Card container with hover effect */}
        <div className="relative h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 sm:p-10 lg:p-8 xl:p-10">
          {/* Decorative gradient background on hover */}
          <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

          {/* Icon container with modern styling */}
          <div className="mb-8 inline-flex">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30 sm:h-20 sm:w-20">
              <div className="scale-125 sm:scale-150">{icon}</div>
            </div>
          </div>

          {/* Title with accent */}
          <h3 className="mb-4 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-primary dark:text-white dark:group-hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl">
            {title}
          </h3>

          {/* Decorative line */}
          <div className="mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-primary/30 transition-all duration-300 group-hover:w-16"></div>

          {/* Description */}
          <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg lg:text-base">
            {paragraph}
          </p>

          {/* Optional hover indicator */}
          <div className="mt-6 flex items-center text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
            <span className="ml-2">اعرف المزيد</span>
            <svg
              className="mr-1 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFeature;
