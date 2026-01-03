"use client";
import React from 'react';
import Icon from '@/components/UI/AppIcon';
import { BreadcrumbItem } from '@/types/clinic';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = ({ items, className = '' }: BreadcrumbProps) => {
  return (
    <nav className={`flex items-center space-x-2 space-x-reverse text-sm ${className}`} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          {index > 0 && (
            <Icon
              name="ChevronLeft"
              size={14}
              color="var(--color-muted-foreground)"
              className="rotate-180"
            />
          )}

          {item.isActive ? (
            <span className="font-arabic-body font-medium text-foreground">
              {item.label}
            </span>
          ) : (
            <a
              href={item.href}
              className="font-arabic-body text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {item.label}
            </a>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;