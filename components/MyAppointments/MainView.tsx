"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import AppointmentsList from "@/components/MyAppointments/AppointmentsList";
import AppointmentStats from "@/components/MyAppointments/AppointmentStats";
import { motion } from "framer-motion";

const MainView = () => {
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
