"use client";


const AppointmentStats = () => {
  const stats = [
    {
      id: 1,
      title: "المواعيد القادمة",
      count: 3,
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          className="fill-current"
        >
          <path d="M26 3H24V1H22V3H10V1H8V3H6C4.9 3 4 3.9 4 5V27C4 28.1 4.9 29 6 29H26C27.1 29 28 28.1 28 27V5C28 3.9 27.1 3 26 3ZM26 27H6V11H26V27ZM26 9H6V5H26V9Z" />
        </svg>
      ),
      bgColor: "from-blue-500 via-blue-600 to-indigo-600",
      lightBg: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      trend: "+12%",
      trendUp: true,
      lastUpdate: "آخر تحديث اليوم",
    },
    {
      id: 2,
      title: "المواعيد المكتملة",
      count: 12,
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          className="fill-current"
        >
          <path d="M16 2C8.3 2 2 8.3 2 16C2 23.7 8.3 30 16 30C23.7 30 30 23.7 30 16C30 8.3 23.7 2 16 2ZM13.5 23.5L6 16L8.8 13.2L13.5 17.9L23.2 8.2L26 11L13.5 23.5Z" />
        </svg>
      ),
      bgColor: "from-emerald-500 via-green-600 to-teal-600",
      lightBg: "bg-emerald-50 dark:bg-emerald-900/20",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      trend: "+8%",
      trendUp: true,
      lastUpdate: "هذا الشهر",
    },
    {
      id: 3,
      title: "المواعيد الملغاة",
      count: 2,
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          className="fill-current"
        >
          <path d="M16 2C8.3 2 2 8.3 2 16C2 23.7 8.3 30 16 30C23.7 30 30 23.7 30 16C30 8.3 23.7 2 16 2ZM21.5 19.1L19.1 21.5L16 18.4L12.9 21.5L10.5 19.1L13.6 16L10.5 12.9L12.9 10.5L16 13.6L19.1 10.5L21.5 12.9L18.4 16L21.5 19.1Z" />
        </svg>
      ),
      bgColor: "from-rose-500 via-red-600 to-pink-600",
      lightBg: "bg-rose-50 dark:bg-rose-900/20",
      iconColor: "text-rose-600 dark:text-rose-400",
      trend: "-15%",
      trendUp: false,
      lastUpdate: "هذا الشهر",
    },
    {
      id: 4,
      title: "إجمالي المواعيد",
      count: 17,
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          className="fill-current"
        >
          <path d="M28 6H24V4C24 2.9 23.1 2 22 2H10C8.9 2 8 2.9 8 4V6H4C2.9 6 2 6.9 2 8V26C2 27.1 2.9 28 4 28H28C29.1 28 30 27.1 30 26V8C30 6.9 29.1 6 28 6ZM10 4H22V6H10V4ZM28 26H4V8H28V26Z" />
        </svg>
      ),
      bgColor: "from-violet-500 via-purple-600 to-fuchsia-600",
      lightBg: "bg-violet-50 dark:bg-violet-900/20",
      iconColor: "text-violet-600 dark:text-violet-400",
      trend: "+5%",
      trendUp: true,
      lastUpdate: "آخر 30 يوم",
    },
  ];

  return (
    <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.id}
  
          className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-dark"
        >
          {/* Decorative gradient background */}
          <div
            className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${stat.bgColor} opacity-10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-20`}
          />

          {/* Content Container */}
          <div className="relative">
            {/* Icon with background */}
            <div
              className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl ${stat.lightBg} ${stat.iconColor} transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}
            >
              {stat.icon}
            </div>

            {/* Title */}
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              {stat.title}
            </p>

            {/* Count and Trend */}
            <div className="mb-3 flex items-end justify-between">
              <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
                {stat.count}
              </h3>

              {/* Trend Badge */}
              <div
                className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                  stat.trendUp
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                }`}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  className={`fill-current ${stat.trendUp ? "" : "rotate-180"}`}
                >
                  <path d="M6 2L10 8H2L6 2Z" />
                </svg>
                <span>{stat.trend}</span>
              </div>
            </div>

            {/* Last Update */}
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className="stroke-current"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path d="M12 6V12L16 14" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>{stat.lastUpdate}</span>
            </div>
          </div>

          {/* Bottom gradient line - appears on hover */}
          <div
            className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${stat.bgColor} transition-all duration-500 group-hover:w-full`}
          />
        </div>
      ))}
    </div>
  );
};

export default AppointmentStats;