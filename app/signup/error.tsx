"use client";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-white dark:bg-dark">
            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
                حدث خطأ ما!
            </h2>
            <button
                onClick={() => reset()}
                className="rounded-md bg-primary px-4 py-2 text-white transition hover:bg-primary/90"
            >
                حاول مرة أخرى
            </button>
        </div>
    );
}
