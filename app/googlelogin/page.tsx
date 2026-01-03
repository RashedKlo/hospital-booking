'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { authStorage } from '@/utils/auth';

export default function GoogleLoginCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        const handleCallback = () => {
            const token = searchParams.get('token');
            const error = searchParams.get('error');
            const message = searchParams.get('message');

            if (error) {
                // Handle error from backend
                setStatus('error');
                setErrorMessage(
                    message || 'حدث خطأ أثناء تسجيل الدخول باستخدام Google'
                );

                // Redirect to signin after 3 seconds
                setTimeout(() => {
                    router.push('/signin');
                }, 3000);
                return;
            }

            if (token) {
                // Success - save token and redirect
                try {
                    // Decode token to get user info (basic JWT decode)
                    const payload = JSON.parse(atob(token.split('.')[1]));

                    // Save auth data
                    const authData = {
                        user: {
                            userId: payload.userId || payload.sub,
                            fullname: payload.fullname || payload.name,
                            email: payload.email,
                            emailVerified: true,
                            role: payload.role || 'patient',
                            createdAt: new Date().toISOString(),
                        },
                        accessToken: token,
                    };

                    authStorage.saveAuthData(authData);
                    setStatus('success');

                    // Redirect to home after 1 second
                    setTimeout(() => {
                        router.push('/');
                    }, 1000);
                } catch (err) {
                    console.error('Error processing token:', err);
                    setStatus('error');
                    setErrorMessage('حدث خطأ أثناء معالجة البيانات');
                    setTimeout(() => {
                        router.push('/signin');
                    }, 3000);
                }
            } else {
                // No token and no error - invalid state
                setStatus('error');
                setErrorMessage('رابط غير صالح');
                setTimeout(() => {
                    router.push('/signin');
                }, 3000);
            }
        };

        handleCallback();
    }, [searchParams, router]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center" dir="rtl">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl max-w-md w-full mx-4"
            >
                {status === 'loading' && (
                    <div className="text-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-16 h-16 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full"
                        />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            جاري تسجيل الدخول...
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            يرجى الانتظار قليلاً
                        </p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center"
                        >
                            <svg
                                className="w-8 h-8 text-green-600 dark:text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </motion.div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            تم تسجيل الدخول بنجاح!
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            جاري تحويلك إلى الصفحة الرئيسية...
                        </p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center"
                        >
                            <svg
                                className="w-8 h-8 text-red-600 dark:text-red-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </motion.div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            فشل تسجيل الدخول
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {errorMessage}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                            جاري تحويلك إلى صفحة تسجيل الدخول...
                        </p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
