'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Icon from '@/components/UI/AppIcon';
import Link from 'next/link';

export default function AppointmentSuccessPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4" dir="rtl">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl max-w-md w-full overflow-hidden text-center p-8 border border-gray-100 dark:border-gray-800"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
                    className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <Icon name="Check" size={48} className="text-green-600 dark:text-green-400" />
                </motion.div>

                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    تم حجز الموعد بنجاح!
                </h1>

                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    شكراً لك. تم استلام طلب الحجز الخاص بك وسيتم التواصل معك قريباً لتأكيد الموعد.
                </p>

                <div className="space-y-3">
                    <Link
                        href="/myappointments"
                        className="block w-full bg-primary hover:bg-blue-600 text-white font-semibold py-3.5 rounded-xl transition-colors"
                    >
                        عرض مواعيدي
                    </Link>

                    <Link
                        href="/"
                        className="block w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-3.5 rounded-xl transition-colors"
                    >
                        العودة للرئيسية
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
