import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "success" | "warning" | "neutral" | "trust";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-[#e8f5e9] text-[#0f5132] border border-[#c8e6c9]",
  success:
    "bg-emerald-50 text-emerald-800 border border-emerald-200",
  warning:
    "bg-[#fff7ed] text-[#c2410c] border border-[#ffedd5]",
  neutral:
    "bg-slate-100 text-slate-700 border border-slate-200",
  trust:
    "bg-slate-900 text-slate-50 border border-slate-800",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
          variantStyles[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";
