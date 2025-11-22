"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, AlertCircle, X } from "lucide-react";
import { useEffect } from "react";

export type ToastType = "success" | "error" | "warning";

export interface Toast {
    id: string;
    type: ToastType;
    message: string;
}

interface ToastProps {
    toast: Toast;
    onClose: (id: string) => void;
}

const ToastNotification = ({ toast, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(toast.id);
        }, 5000);
        return () => clearTimeout(timer);
    }, [toast.id, onClose]);

    const config = {
        success: {
            icon: <CheckCircle2 className="h-5 w-5" />,
            bg: "bg-emerald-50 dark:bg-emerald-900/20",
            border: "border-emerald-200 dark:border-emerald-800",
            text: "text-emerald-800 dark:text-emerald-200",
            iconColor: "text-emerald-600 dark:text-emerald-400",
        },
        error: {
            icon: <XCircle className="h-5 w-5" />,
            bg: "bg-rose-50 dark:bg-rose-900/20",
            border: "border-rose-200 dark:border-rose-800",
            text: "text-rose-800 dark:text-rose-200",
            iconColor: "text-rose-600 dark:text-rose-400",
        },
        warning: {
            icon: <AlertCircle className="h-5 w-5" />,
            bg: "bg-amber-50 dark:bg-amber-900/20",
            border: "border-amber-200 dark:border-amber-800",
            text: "text-amber-800 dark:text-amber-200",
            iconColor: "text-amber-600 dark:text-amber-400",
        },
    };

    const style = config[toast.type];

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            className={`${style.bg} ${style.border} ${style.text} flex items-start gap-3 rounded-xl border p-4 shadow-lg backdrop-blur-sm`}
        >
            <div className={style.iconColor}>{style.icon}</div>
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
                onClick={() => onClose(toast.id)}
                className={`${style.iconColor} hover:opacity-70 transition-opacity`}
            >
                <X className="h-4 w-4" />
            </button>
        </motion.div>
    );
};

interface ToastContainerProps {
    toasts: Toast[];
    onClose: (id: string) => void;
}

export const ToastContainer = ({ toasts, onClose }: ToastContainerProps) => {
    return (
        <div className="fixed left-4 top-4 z-50 flex flex-col gap-3 sm:left-auto sm:right-4" dir="ltr">
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <ToastNotification key={toast.id} toast={toast} onClose={onClose} />
                ))}
            </AnimatePresence>
        </div>
    );
};
