"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import { authStorage } from "@/utils/auth";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navbarToggleHandler = useCallback(() => setNavbarOpen(prev => !prev), []);
  const closeNavbar = useCallback(() => setNavbarOpen(false), []);

  const handleStickyNavbar = useCallback(() => {
    setSticky(window.scrollY >= 60);
  }, []);

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const authData = authStorage.getCurrentUser();
      setIsAuthenticated(!!authData);
    };

    checkAuth();

    // Listen for storage changes (e.g., login/logout in another tab)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  // Logout handler
  const handleLogout = useCallback(() => {
    authStorage.clearAuthData();
    setIsAuthenticated(false);
    router.push('/');
    closeNavbar();
  }, [router, closeNavbar]);

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar, { passive: true });
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, [handleStickyNavbar]);

  const handleSubmenu = useCallback((index: number) => {
    setOpenIndex(prev => prev === index ? -1 : index);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        navbarOpen &&
        !target.closest("#navbarCollapse") &&
        !target.closest("#navbarToggler")
      ) {
        closeNavbar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navbarOpen, closeNavbar]);

  // Close mobile menu on route change
  useEffect(() => {
    closeNavbar();
    setOpenIndex(-1);
  }, [pathname, closeNavbar]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed left-0 right-0 top-0 z-50 flex w-full items-center transition-all duration-300 ${sticky
          ? "bg-white/95 shadow-lg shadow-gray-900/5 backdrop-blur-xl dark:bg-gray-900/95 dark:shadow-gray-100/5"
          : "bg-white/80 backdrop-blur-md dark:bg-gray-900/80"
          }`}
        dir="rtl"
      >
        {/* Animated gradient border */}
        <AnimatePresence>
          {sticky && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          )}
        </AnimatePresence>

        <div className="container mx-auto px-4">
          <div className="relative flex items-center justify-between">
            {/* Logo Section */}
            <Link
              href="/"
              className={`group flex items-center gap-3 transition-all duration-300 ${sticky ? "py-3" : "py-4"
                }`}
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="absolute inset-0 rounded-xl bg-primary/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary via-blue-600 to-blue-700 shadow-lg shadow-primary/30">
                  <div className="absolute inset-0 " />
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
              </motion.div>

              <div className="flex flex-col">
                <span className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
                  النور
                </span>
                <span className="hidden text-[10px] font-medium text-gray-500 dark:text-gray-400 sm:block">
                  نظام الحجز الطبي
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex lg:items-center lg:gap-1">
              {menuData.map((menuItem, index) => (
                <div key={index} className="group relative">
                  {menuItem.path ? (
                    <Link
                      href={menuItem.path}
                      className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${pathname === menuItem.path
                        ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg shadow-primary/30"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800/50"
                        }`}
                    >
                      {pathname === menuItem.path && (
                        <motion.span
                          layoutId="activeIndicator"
                          className="h-1.5 w-1.5 rounded-full bg-white"
                          initial={false}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      {menuItem.title}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => handleSubmenu(index)}
                        className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800/50"
                      >
                        <span>{menuItem.title}</span>
                        <motion.svg
                          animate={{ rotate: openIndex === index ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          width="16"
                          height="16"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          />
                        </motion.svg>
                      </button>

                      {/* Desktop Submenu */}
                      <AnimatePresence>
                        {menuItem.submenu && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="invisible absolute right-0 top-full mt-2 w-64 rounded-2xl border border-gray-200/50 bg-white p-2 opacity-0 shadow-2xl backdrop-blur-xl transition-all group-hover:visible group-hover:opacity-100 dark:border-gray-700/50 dark:bg-gray-900"
                          >
                            {menuItem.submenu.map((submenuItem, subIndex) => (
                              <Link
                                href={submenuItem.path}
                                key={subIndex}
                                className="group/item flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-primary/10 hover:text-primary dark:text-gray-300 dark:hover:bg-primary/10 dark:hover:text-primary"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-gray-400 transition-all group-hover/item:scale-150 group-hover/item:bg-primary" />
                                {submenuItem.title}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Sign In / Logout - Hidden on mobile */}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="group hidden items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-red-50 hover:text-red-600 dark:text-gray-200 dark:hover:bg-red-900/20 dark:hover:text-red-400 md:flex"
                >
                  تسجيل الخروج
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              ) : (
                <Link
                  href="/signin"
                  className="group hidden items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 md:flex"
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
                    />
                  </svg>
                </Link>
              )}

              {/* Book Appointment - Hidden on mobile */}
              <Link
                href="/contact"
                className="group relative hidden overflow-hidden rounded-xl bg-gradient-to-r from-primary via-blue-600 to-blue-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/40 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/50 md:flex md:items-center md:gap-2"
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
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
                  />
                </svg>
              </Link>

              {/* Theme Toggle */}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
                <ThemeToggler />
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={navbarToggleHandler}
                id="navbarToggler"
                aria-label="القائمة"
                aria-expanded={navbarOpen}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 lg:hidden"
              >
                <div className="relative h-5 w-6">
                  <motion.span
                    animate={{
                      rotate: navbarOpen ? 45 : 0,
                      y: navbarOpen ? 8 : 0,
                    }}
                    className="absolute right-0 top-0 block h-0.5 w-full rounded-full bg-gray-700 dark:bg-gray-200"
                  />
                  <motion.span
                    animate={{ opacity: navbarOpen ? 0 : 1 }}
                    className="absolute right-0 top-2 block h-0.5 w-full rounded-full bg-gray-700 dark:bg-gray-200"
                  />
                  <motion.span
                    animate={{
                      rotate: navbarOpen ? -45 : 0,
                      y: navbarOpen ? -8 : 0,
                    }}
                    className="absolute right-0 top-4 block h-0.5 w-full rounded-full bg-gray-700 dark:bg-gray-200"
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {navbarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={closeNavbar}
            />

            {/* Mobile Navigation */}
            <motion.nav
              id="navbarCollapse"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] overflow-y-auto bg-white shadow-2xl dark:bg-gray-900 lg:hidden"
              dir="rtl"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-700">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">القائمة</span>
                </div>
                <button
                  onClick={closeNavbar}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Menu Items */}
              <div className="p-4 space-y-2">
                {menuData.map((menuItem, index) => (
                  <div key={index}>
                    {menuItem.path ? (
                      <Link
                        href={menuItem.path}
                        onClick={closeNavbar}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${pathname === menuItem.path
                          ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                          }`}
                      >
                        {pathname === menuItem.path && (
                          <span className="h-2 w-2 rounded-full bg-white" />
                        )}
                        {menuItem.title}
                      </Link>
                    ) : (
                      <>
                        <button
                          onClick={() => handleSubmenu(index)}
                          className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                          <span>{menuItem.title}</span>
                          <motion.svg
                            animate={{ rotate: openIndex === index ? 180 : 0 }}
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </motion.svg>
                        </button>
                        <AnimatePresence>
                          {openIndex === index && menuItem.submenu && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pr-4 space-y-1"
                            >
                              {menuItem.submenu.map((submenuItem, subIndex) => (
                                <Link
                                  href={submenuItem.path}
                                  key={subIndex}
                                  onClick={closeNavbar}
                                  className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-gray-600 hover:bg-primary/10 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                                  {submenuItem.title}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Menu Footer */}
              <div className="border-t border-gray-200 p-4 space-y-2 dark:border-gray-800">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                  >
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
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    تسجيل الخروج
                  </button>
                ) : (
                  <Link
                    href="/signin"
                    onClick={closeNavbar}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    تسجيل الدخول
                  </Link>
                )}
                <Link
                  href="/contact"
                  onClick={closeNavbar}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg"
                >
                  حجز موعد
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(Header);
