const AppointmentStats = () => {
  const stats = [
    {
      id: 1,
      title: "المواعيد القادمة",
      count: 3,
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          className="fill-current"
        >
          <path d="M26 3H24V1H22V3H10V1H8V3H6C4.9 3 4 3.9 4 5V27C4 28.1 4.9 29 6 29H26C27.1 29 28 28.1 28 27V5C28 3.9 27.1 3 26 3ZM26 27H6V11H26V27ZM26 9H6V5H26V9Z" />
        </svg>
      ),
      bgColor: "from-primary to-blue-600",
    },
    {
      id: 2,
      title: "المواعيد المكتملة",
      count: 12,
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          className="fill-current"
        >
          <path d="M16 2C8.3 2 2 8.3 2 16C2 23.7 8.3 30 16 30C23.7 30 30 23.7 30 16C30 8.3 23.7 2 16 2ZM13.5 23.5L6 16L8.8 13.2L13.5 17.9L23.2 8.2L26 11L13.5 23.5Z" />
        </svg>
      ),
      bgColor: "from-[#13C296] to-green-600",
    },
    {
      id: 3,
      title: "المواعيد الملغاة",
      count: 2,
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          className="fill-current"
        >
          <path d="M16 2C8.3 2 2 8.3 2 16C2 23.7 8.3 30 16 30C23.7 30 30 23.7 30 16C30 8.3 23.7 2 16 2ZM21.5 19.1L19.1 21.5L16 18.4L12.9 21.5L10.5 19.1L13.6 16L10.5 12.9L12.9 10.5L16 13.6L19.1 10.5L21.5 12.9L18.4 16L21.5 19.1Z" />
        </svg>
      ),
      bgColor: "from-[#F04438] to-red-600",
    },
    {
      id: 4,
      title: "إجمالي المواعيد",
      count: 17,
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          className="fill-current"
        >
          <path d="M28 6H24V4C24 2.9 23.1 2 22 2H10C8.9 2 8 2.9 8 4V6H4C2.9 6 2 6.9 2 8V26C2 27.1 2.9 28 4 28H28C29.1 28 30 27.1 30 26V8C30 6.9 29.1 6 28 6ZM10 4H22V6H10V4ZM28 26H4V8H28V26Z" />
        </svg>
      ),
      bgColor: "from-purple-500 to-purple-700",
    },
  ];

  return (
    <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-three transition-all duration-300 hover:shadow-one dark:bg-gray-dark dark:hover:shadow-gray-dark"
        >
          {/* Background Gradient */}
          <div
            className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${stat.bgColor}`}
          />

          {/* Icon */}
          <div
            className={`mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br ${stat.bgColor} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
          >
            {stat.icon}
          </div>

          {/* Content */}
          <div>
            <p className="mb-2 text-sm font-medium text-body-color dark:text-body-color-dark">
              {stat.title}
            </p>
            <h3 className="text-3xl font-bold text-black dark:text-white">
              {stat.count}
            </h3>
          </div>

          {/* Hover Effect */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-blue-600 transition-all duration-300 group-hover:w-full" />
        </div>
      ))}
    </div>
  );
};

export default AppointmentStats;
