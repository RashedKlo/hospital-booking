"use client";
import React from "react";
import { ClinicDetail } from "@/types/clinic";
import Icon from "@/components/UI/AppIcon";

interface ClinicInfoProps {
  clinic: ClinicDetail;
  className?: string;
}

const ClinicInfo = ({ clinic, className = "" }: ClinicInfoProps) => {
  return (
    <section
      dir="rtl"
      className={`space-y-10 ${className} transition-all duration-300`}
    >
      {/* Clinic Overview */}
      <article className="relative bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-md hover:shadow-lg border border-border/30 p-8 transition-all">
        <h2 className="font-arabic-heading font-bold text-2xl text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
          <Icon name="Info" size={20} color="var(--color-primary)" />
          نبذة عن العيادة
        </h2>
        <p className="font-arabic-body text-base leading-relaxed text-gray-700 dark:text-gray-300">
          {clinic.description || "لم يتم توفير وصف للعيادة حالياً."}
        </p>
      </article>

      {/* Services Section */}
      <article className="bg-gradient-to-br from-blue-100/40 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-md hover:shadow-lg border border-border/30 p-8 transition-all">
        <h2 className="font-arabic-heading font-bold text-2xl text-blue-900 dark:text-blue-100 mb-6 flex items-center gap-2">
          <Icon name="HeartPulse" size={20} color="var(--color-primary)" />
          الخدمات المتاحة
        </h2>
        {clinic.services?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {clinic.services.map((service) => (
              <div
                key={service.id}
                className="flex flex-row-reverse items-start gap-4 bg-white/60 dark:bg-gray-800/70 border border-border/40 rounded-2xl p-5 hover:bg-blue-50/60 dark:hover:bg-gray-700/60 transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon
                    name={service.icon as any}
                    size={22}
                    color="var(--color-primary)"
                  />
                </div>
                <div className="flex-1 text-right">
                  <h3 className="font-arabic-body font-semibold text-lg text-foreground mb-1">
                    {service.name}
                  </h3>
                  <p className="font-arabic-caption text-sm text-muted-foreground mb-2">
                    {service.description}
                  </p>
                  {service.price && (
                    <span className="inline-block font-arabic-data text-sm font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-md">
                      {service.price}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            لا توجد خدمات متاحة حالياً.
          </p>
        )}
      </article>

      {/* Facilities Section */}
      <article className="bg-gradient-to-br from-green-50/40 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-md hover:shadow-lg border border-border/30 p-8 transition-all">
        <h2 className="font-arabic-heading font-bold text-2xl text-green-800 dark:text-green-100 mb-6 flex items-center gap-2">
          <Icon name="Building2" size={20} color="var(--color-success)" />
          المرافق والتجهيزات
        </h2>
        {clinic.facilities?.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {clinic.facilities.map((facility) => {
              const available = facility.available;
              return (
                <div
                  key={facility.id}
                  className={`flex flex-row-reverse items-center gap-2 border rounded-xl p-3 transition-all duration-300 ${available
                      ? "border-green-300 bg-green-50 text-green-700 dark:bg-green-900/30 dark:border-green-600 dark:text-green-300"
                      : "border-gray-200 bg-gray-100 text-gray-400 dark:bg-gray-800 dark:border-gray-700"
                    } hover:scale-[1.02]`}
                >
                  <Icon
                    name={facility.icon as any}
                    size={16}
                    color={
                      available
                        ? "var(--color-success)"
                        : "var(--color-muted-foreground)"
                    }
                  />
                  <span className="font-arabic-caption text-sm font-medium flex-1 text-right">
                    {facility.name}
                  </span>
                  {available && (
                    <Icon
                      name="CheckCircle2"
                      size={16}
                      color="var(--color-success)"
                    />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            لا توجد مرافق مسجلة حالياً.
          </p>
        )}
      </article>
    </section>
  );
};

export default ClinicInfo;
