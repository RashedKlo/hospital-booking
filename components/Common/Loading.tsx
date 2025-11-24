"use client";
import { motion } from "framer-motion";

const Loading = () => {
    return (
        <div className="flex h-[70vh] w-full items-center justify-center bg-white dark:bg-gray-950">
            <div className="relative flex items-center justify-center">
                {/* Outer Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary"
                />

                {/* Inner Ring */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute h-10 w-10 rounded-full border-4 border-blue-400/20 border-t-blue-400"
                />

                {/* Center Dot */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute h-3 w-3 rounded-full bg-primary"
                />
            </div>
        </div>
    );
};

export default Loading;
