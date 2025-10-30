"use client";
import { getImagePath } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  // Close mobile menu when clicking outside
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

  const usePathName = usePathname();

  return (
    <>
      <header
        className={`header left-0 right-0 top-0 z-40 flex w-full items-center transition-all duration-300 ${
          sticky
            ? "fixed z-[9999] bg-white/95 shadow-lg backdrop-blur-md dark:bg-gray-dark/95"
            : "absolute bg-transparent"
        }`}
        dir="rtl"
      >
        <div className="container">
          <div className="relative flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center px-4 xl:ml-12">
              <Link
                href="/"
                className={`header-logo flex items-center transition-all duration-300 ${
                  sticky ? "py-3 lg:py-2" : "py-6 lg:py-8"
                }`}
              >
                {/* Light mode logo - using text as fallback if image doesn't exist */}
                <div className="flex items-center dark:hidden">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-600">
                    <svg
                      className="h-6 w-6 text-white"
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
                  <span className="mr-3 text-xl font-bold text-dark">
                    النور
                  </span>
                </div>

                {/* Dark mode logo */}
                <div className="hidden items-center dark:flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-600">
                    <svg
                      className="h-6 w-6 text-white"
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
                  <span className="mr-3 text-xl font-bold text-white">
                    النور
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation & Mobile Toggle */}
            <div className="flex w-full items-center justify-between px-4">
              {/* Mobile Menu Button */}
              <button
                onClick={navbarToggleHandler}
                id="navbarToggler"
                aria-label="القائمة"
                className="absolute left-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20 focus:ring-2 focus:ring-primary dark:bg-gray-800/50 dark:hover:bg-gray-800/70 lg:hidden"
              >
                <div className="relative h-5 w-6">
                  <span
                    className={`absolute right-0 block h-0.5 w-full bg-dark transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "top-2 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute right-0 top-2 block h-0.5 w-full bg-dark transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute right-0 block h-0.5 w-full bg-dark transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "top-2 -rotate-45" : "top-4"
                    }`}
                  />
                </div>
              </button>

              {/* Navigation Menu */}
              <nav
                id="navbarCollapse"
                className={`navbar absolute left-0 top-full z-30 mt-2 w-full rounded-lg border border-body-color/20 bg-white/95 px-6 py-5 shadow-xl backdrop-blur-md transition-all duration-300 dark:border-body-color/10 dark:bg-gray-dark/95 lg:visible lg:static lg:mt-0 lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none lg:backdrop-blur-none ${
                  navbarOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-4 opacity-0 lg:translate-y-0"
                }`}
              >
                <ul className="block space-y-2 lg:flex lg:items-center lg:space-x-8 lg:space-y-0 lg:space-x-reverse">
                  {menuData.map((menuItem, index) => (
                    <li key={index} className="group relative">
                      {menuItem.path ? (
                        <Link
                          href={menuItem.path}
                          onClick={() => setNavbarOpen(false)}
                          className={`flex items-center rounded-md px-3 py-2 text-base font-medium transition-all duration-200 lg:px-0 lg:py-6 ${
                            usePathName === menuItem.path
                              ? "bg-primary/10 text-primary dark:text-white lg:bg-transparent"
                              : "text-dark hover:bg-primary/5 hover:text-primary dark:text-white/80 dark:hover:text-white lg:hover:bg-transparent"
                          }`}
                        >
                          {menuItem.title}
                        </Link>
                      ) : (
                        <>
                          <button
                            onClick={() => handleSubmenu(index)}
                            className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-dark transition-all duration-200 hover:bg-primary/5 hover:text-primary group-hover:text-primary dark:text-white/80 dark:hover:text-white dark:group-hover:text-white lg:w-auto lg:px-0 lg:py-6 lg:hover:bg-transparent"
                          >
                            <span>{menuItem.title}</span>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              className={`mr-2 transition-transform duration-200 lg:ml-1 lg:mr-0 ${
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
                          <div
                            className={`mr-4 mt-2 space-y-1 overflow-hidden rounded-lg bg-gray-50 transition-all duration-300 dark:bg-gray-800/50 lg:invisible lg:absolute lg:right-0 lg:top-full lg:mr-0 lg:mt-2 lg:w-[240px] lg:space-y-0 lg:bg-white lg:p-2 lg:opacity-0 lg:shadow-xl lg:group-hover:visible lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:dark:bg-gray-dark ${
                              openIndex === index
                                ? "max-h-96 py-2 lg:max-h-none"
                                : "max-h-0 py-0 lg:max-h-none lg:-translate-y-2"
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
                                className="block rounded-md px-4 py-2.5 text-sm font-medium text-dark transition-all hover:bg-primary/10 hover:text-primary dark:text-white/70 dark:hover:bg-primary/10 dark:hover:text-white"
                              >
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

              {/* Auth Buttons & Theme Toggle */}
              <div className="flex items-center gap-3 pl-4 lg:pl-0">
                <Link
                  href="/signin"
                  className="hidden rounded-lg px-5 py-2.5 text-sm font-medium text-dark transition-all hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800 md:block"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  href="/contact"
                  className="hidden rounded-lg bg-gradient-to-r from-primary to-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg hover:brightness-110 md:block"
                >
                  حجز موعد
                </Link>
                <div className="flex h-10 w-10 items-center justify-center">
                  <ThemeToggler />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay for mobile menu */}
      {navbarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setNavbarOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
