"use client";
import React from 'react';
import ClinicCard from './ClinicCard';
import ClinicCardSkeleton from './ClinicCardSkeleton';
import { Clinic } from '@/types/clinic';

interface ClinicsGridExampleProps {
  clinics?: Clinic[];
  loading?: boolean;
}

const ClinicsGridExample: React.FC<ClinicsGridExampleProps> = ({ clinics = [], loading = false }) => {
  const placeholders = Array.from({ length: 6 });

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? placeholders.map((_, i) => <ClinicCardSkeleton key={i} />)
          : clinics.map((c) => (
            <ClinicCard key={c.id} clinic={c} />
          ))}
      </div>
    </div>
  );
};

export default ClinicsGridExample;
