"use client";
import { getImagePath } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);
  const usePathName = usePathname();

  const navbarToggleHandler = () => setNavbarOpen(!navbarOpen);

  const handleStickyNavbar = () => {
    setSticky(window.scrollY >= 80);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  const handleSubmenu = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        navbarOpen &&
        !e.target.closest("#navbarCollapse") &&
        !e.target.closest("#navbarToggler")
      ) {
        setNavbarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navbarOpen]);

  return (
    <>
      <header
        className={`header left-0 right-0 top-0 z-40 flex w-full items-center transition-all duration-500 ${
          sticky
            ? "fixed z-[9999] bg-white/80 shadow-2xl shadow-gray-900/5 backdrop-blur-xl dark:bg-gray-900/80 dark:shadow-gray-100/5"
            : "absolute bg-transparent"
        }`}
        dir="rtl"
      >
        {/* Animated gradient border on scroll */}
        {sticky && (
          <div className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden">
            <div className="animate-shimmer h-full w-full bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </div>
        )}

        <div className="container">
          <div className="relative flex items-center justify-between">
            {/* Logo Section - Enhanced with modern design */}
            <div className="flex items-center px-4 xl:ml-12">
              <Link
                href="/"
                className={`header-logo group flex items-center transition-all duration-300 ${
                  sticky ? "py-3 lg:py-2" : "py-6 lg:py-8"
                }`}
              >
                <div className="relative">
                  {/* Animated glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-primary/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"></div>

                  {/* Logo icon */}
                  <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary via-blue-600 to-blue-700 shadow-lg shadow-primary/30 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-primary/40">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gOCAwIEwgMCAwIDAgOCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>

                    <svg
                      className="relative z-10 h-7 w-7 text-white transition-transform duration-300 group-hover:rotate-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="mr-3 flex flex-col">
                  <span className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
                    النور
                  </span>
                  <span className="hidden text-[10px] font-medium text-gray-500 dark:text-gray-400 md:block">
                    نظام الحجز الطبي
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation & Mobile Toggle */}
            <div className="flex w-full items-center justify-between px-4">
              {/* Animated Mobile Menu Button */}
              <button
                onClick={navbarToggleHandler}
                id="navbarToggler"
                aria-label="القائمة"
                className="group absolute left-4 top-1/2 z-50 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl bg-white shadow-lg transition-all hover:scale-105 hover:shadow-xl dark:bg-gray-800 lg:hidden"
              >
                <div className="relative h-5 w-6">
                  <span
                    className={`absolute right-0 block h-0.5 w-full rounded-full bg-gray-700 transition-all duration-300 dark:bg-gray-200 ${
                      navbarOpen ? "top-[9px] w-5 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute right-0 top-[9px] block h-0.5 rounded-full bg-gray-700 transition-all duration-300 dark:bg-gray-200 ${
                      navbarOpen ? "w-0 opacity-0" : "w-full opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute right-0 block h-0.5 w-full rounded-full bg-gray-700 transition-all duration-300 dark:bg-gray-200 ${
                      navbarOpen ? "top-[9px] w-5 -rotate-45" : "top-[18px]"
                    }`}
                  />
                </div>
              </button>

              {/* Navigation Menu - Enhanced with modern styling */}
              <nav
                id="navbarCollapse"
                className={`navbar absolute left-4 right-4 top-full z-30 mt-3 rounded-2xl border border-gray-200/50 bg-white shadow-2xl backdrop-blur-xl transition-all duration-500 dark:border-gray-700/50 dark:bg-gray-900/95 lg:visible lg:static lg:left-auto lg:right-auto lg:mt-0 lg:w-auto lg:rounded-none lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none lg:backdrop-blur-none ${
                  navbarOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-4 opacity-0 lg:translate-y-0"
                }`}
              >
                <ul className="block space-y-1 p-4 lg:flex lg:items-center lg:space-x-1 lg:space-y-0 lg:space-x-reverse lg:p-0">
                  {menuData.map((menuItem, index) => (
                    <li key={index} className="group relative">
                      {menuItem.path ? (
                        <Link
                          href={menuItem.path}
                          onClick={() => setNavbarOpen(false)}
                          className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 lg:px-4 lg:py-2 ${
                            usePathName === menuItem.path
                              ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg shadow-primary/30"
                              : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800/50"
                          }`}
                        >
                          {/* Active indicator dot */}
                          {usePathName === menuItem.path && (
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white"></span>
                          )}
                          {menuItem.title}
                        </Link>
                      ) : (
                        <>
                          <button
                            onClick={() => handleSubmenu(index)}
                            className="flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800/50 lg:w-auto lg:px-4 lg:py-2"
                          >
                            <span>{menuItem.title}</span>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 20 20"
                              className={`transition-transform duration-300 ${
                                openIndex === index ? "rotate-180" : ""
                              }`}
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                fill="currentColor"
                              />
                            </svg>
                          </button>

                          {/* Enhanced Submenu */}
                          <div
                            className={`mr-2 mt-2 space-y-1 overflow-hidden rounded-xl bg-gray-50 transition-all duration-300 dark:bg-gray-800/50 lg:invisible lg:absolute lg:right-0 lg:top-full lg:mr-0 lg:mt-3 lg:w-[260px] lg:space-y-1 lg:rounded-2xl lg:border lg:border-gray-200/50 lg:bg-white lg:p-2 lg:opacity-0 lg:shadow-2xl lg:group-hover:visible lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:dark:border-gray-700/50 lg:dark:bg-gray-900 ${
                              openIndex === index
                                ? "max-h-96 p-2 lg:max-h-none"
                                : "max-h-0 p-0 lg:max-h-none lg:-translate-y-2"
                            }`}
                          >
                            {menuItem.submenu?.map((submenuItem, subIndex) => (
                              <Link
                                href={submenuItem.path}
                                key={subIndex}
                                onClick={() => {
                                  setNavbarOpen(false);
                                  setOpenIndex(-1);
                                }}
                                className="group/item flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-primary/10 hover:text-primary dark:text-gray-300 dark:hover:bg-primary/10 dark:hover:text-primary"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-gray-400 transition-all group-hover/item:scale-150 group-hover/item:bg-primary"></span>
                                {submenuItem.title}
                              </Link>
                            ))}
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Enhanced Auth Buttons & Theme Toggle */}
              <div className="flex items-center gap-2 pl-4 lg:gap-3 lg:pl-0">
                <Link
                  href="/signin"
                  className="group hidden items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 md:flex"
                >
                  تسجيل الدخول
                  <svg
                    className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    ></path>
                  </svg>
                </Link>

                <Link
                  href="/contact"
                  className="group relative hidden overflow-hidden rounded-xl bg-gradient-to-r from-primary via-blue-600 to-blue-700 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/40 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/50 md:flex md:items-center md:gap-2"
                >
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>

                  <span className="relative">حجز موعد</span>
                  <svg
                    className="relative h-4 w-4 transition-transform group-hover:-translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </Link>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <ThemeToggler />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Overlay for mobile menu */}
      {navbarOpen && (
        <div
          className="animate-fadeIn fixed inset-0 z-20 bg-gradient-to-b from-black/40 to-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setNavbarOpen(false)}
        />
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Header;
