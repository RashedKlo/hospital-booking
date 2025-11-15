"use client";
import React from 'react';

const ClinicCardSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="h-44 sm:h-52 bg-gray-200 dark:bg-gray-700" />
      <div className="p-4 sm:p-5">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3" />
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3" />
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24" />
          </div>
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24" />
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicCardSkeleton;
