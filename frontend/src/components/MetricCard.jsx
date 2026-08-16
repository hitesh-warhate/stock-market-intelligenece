import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const MetricCard = ({ title, value, subtitle, footer, className, valueClassName, subtitleClassName, indicatorColor }) => {
  return (
    <div className={cn("glass-card p-5 flex flex-col justify-between h-full", className)}>
      <div>
        <h3 className="tracking-widest text-[11px] font-semibold text-muted-foreground uppercase mb-3">
          {title}
        </h3>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            {indicatorColor && (
              <div className={`h-2.5 w-2.5 rounded-full ${indicatorColor}`}></div>
            )}
            <div className={cn("text-3xl font-bold tracking-tight text-foreground", valueClassName)}>
              {value}
            </div>
          </div>
          {subtitle && (
            <p className={cn("text-sm font-medium mt-1", subtitleClassName)}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      
      {footer && (
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-[11px] text-muted-foreground">
            {footer}
          </p>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
