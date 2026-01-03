"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import AppointmentsList from "@/components/MyAppointments/AppointmentsList";
import AppointmentStats from "@/components/MyAppointments/AppointmentStats";
import { motion } from "framer-motion";
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

const MainView = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <>
                <Breadcrumb
                    pageName="مواعيدي"
                    description="جاري التحقق من حالة تسجيل الدخول..."
                />
                <section className="pb-[120px] pt-[60px]" dir="rtl">
                    <div className="container flex justify-center">
                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </section>
            </>
        );
    }

    if (!isAuthenticated) {
        return (
            <>
                <Breadcrumb
                    pageName="مواعيدي"
                    description="إدارة مواعيدك الطبية بسهولة وأمان."
                />
                <section className="pb-[120px] pt-[60px]" dir="rtl">
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center bg-white dark:bg-gray-dark rounded-2xl p-12 shadow-lg border border-gray-100 dark:border-gray-800 max-w-2xl mx-auto"
                        >
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                يجب عليك تسجيل الدخول
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                                لعرض مواعيدك وإدارتها، يرجى تسجيل الدخول إلى حسابك أو إنشاء حساب جديد.
                            </p>
                            <Link
                                href="/signin?redirect=/myappointments"
                                className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                تسجيل الدخول
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <Breadcrumb
                pageName="مواعيدي"
                description="لوحة تحكم شاملة لإدارة كافة مواعيدك الطبية. استعرض المواعيد القادمة، وسجل الزيارات السابقة، وتحكم في حجوزاتك بكل مرونة."
            />

            <section className="pb-[120px] pt-[60px]" dir="rtl">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col gap-10"
                    >
                        <AppointmentStats />
                        <AppointmentsList />
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default MainView;
