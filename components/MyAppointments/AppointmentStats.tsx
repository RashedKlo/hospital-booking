"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
} from "lucide-react";

const AppointmentStats = () => {
  const stats = [
    {
      id: 1,
      title: "المواعيد القادمة",
      count: 3,
      icon: <Calendar className="h-7 w-7" />,
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
      icon: <CheckCircle2 className="h-7 w-7" />,
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
      icon: <XCircle className="h-7 w-7" />,
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
      icon: <Activity className="h-7 w-7" />,
      bgColor: "from-violet-500 via-purple-600 to-fuchsia-600",
      lightBg: "bg-violet-50 dark:bg-violet-900/20",
      iconColor: "text-violet-600 dark:text-violet-400",
      trend: "+5%",
      trendUp: true,
      lastUpdate: "آخر 30 يوم",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.id}
          variants={item}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl dark:bg-gray-dark"
        >
          {/* Decorative gradient background */}
          <div
            className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${stat.bgColor} opacity-10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-20`}
          />

          {/* Content Container */}
          <div className="relative">
            {/* Icon with background */}
            <div
              className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl ${stat.lightBg} ${stat.iconColor} shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}
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
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${stat.trendUp
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                  }`}
              >
                {stat.trendUp ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span dir="ltr">{stat.trend}</span>
              </div>
            </div>

            {/* Last Update */}
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500">
              <Clock className="h-3.5 w-3.5" />
              <span>{stat.lastUpdate}</span>
            </div>
          </div>

          {/* Bottom gradient line - appears on hover */}
          <div
            className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${stat.bgColor} transition-all duration-500 group-hover:w-full`}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AppointmentStats;