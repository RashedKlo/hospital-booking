"use client";
import React from "react";
import { Testimonial } from "@/types/clinic";
import Icon from "@/components/UI/AppIcon";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  className?: string;
}

const TestimonialsSection = ({ testimonials, className = "" }: TestimonialsSectionProps) => {
  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        color={i < Math.floor(rating) ? "#F59E0B" : "#E5E7EB"}
        className={i < Math.floor(rating) ? "text-warning" : "text-border"}
      />
    ));

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <section
      dir="rtl"
      className={`bg-surface rounded-clinical medical-card-elevation-1 p-6 ${className}`}
    >
      {/* Section Header */}
      <header className="flex items-center justify-between mb-8">
        <h2 className="font-arabic-heading font-semibold text-xl text-foreground">
          آراء المرضى
        </h2>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon name="MessageSquare" size={16} />
          <span className="font-arabic-caption text-sm">
            {testimonials.length} تقييم
          </span>
        </div>
      </header>

      {/* Testimonials List */}
      <div className="space-y-6">
        {testimonials.map((t) => (
          <article
            key={t.id}
            className="bg-muted rounded-clinical p-5 border border-border/40 hover:shadow-md transition-all duration-300"
          >
            {/* Header */}
            <header className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-border/30">
                  <img
                    src={t.avatar}
                    alt={t.alt || t.patientName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name + Date */}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-arabic-body font-semibold text-base text-foreground">
                      {t.patientName}
                    </h3>
                    {t.verified && (
                      <span className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                        <Icon name="Check" size={12} color="white" />
                      </span>
                    )}
                  </div>
                  <p className="font-arabic-caption text-sm text-muted-foreground">
                    {formatDate(t.date)}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">{renderStars(t.rating)}</div>
            </header>

            {/* Comment */}
            <p className="font-arabic-body text-base text-foreground leading-relaxed mb-3">
              {t.comment}
            </p>

            {/* Footer */}
            <footer className="flex items-center justify-between pt-3 border-t border-border/20 text-muted-foreground">
              <button
                className="flex items-center gap-1 text-xs font-arabic-caption hover:text-primary transition-colors"
                aria-label="تقييم مفيد"
              >
                <Icon name="ThumbsUp" size={14} />
                <span>مفيد</span>
              </button>

              {t.verified && (
                <div className="flex items-center gap-1 text-success">
                  <Icon name="Shield" size={14} />
                  <span className="font-arabic-caption text-xs">تقييم موثق</span>
                </div>
              )}
            </footer>
          </article>
        ))}
      </div>

      {/* View More */}
      <div className="mt-8 text-center">
        <button
          className="flex items-center gap-2 font-arabic-body text-sm text-primary hover:text-primary/80 transition-colors mx-auto"
          aria-label="عرض المزيد من التقييمات"
        >
          <span>عرض المزيد من التقييمات</span>
          <Icon name="ChevronDown" size={16} />
        </button>
      </div>
    </section>
  );
};

export default TestimonialsSection;
