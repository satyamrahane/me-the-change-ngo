import React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  href?: string;
  external?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm active:bg-[#082d1c]",
  secondary:
    "bg-accent text-accent-foreground hover:bg-accent-hover shadow-sm active:bg-[#9a3412]",
  outline:
    "border border-border bg-card text-foreground hover:bg-muted hover:border-slate-300",
  ghost:
    "bg-transparent text-foreground hover:bg-muted active:bg-slate-200",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-xs rounded-md gap-1.5",
  md: "h-11 px-4 text-sm rounded-md gap-2 font-medium",
  lg: "h-12 px-6 text-base rounded-lg gap-2.5 font-semibold",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      href,
      external,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      "inline-flex items-center justify-center font-medium transition-colors select-none",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    // If an href is provided, render accessible link with matching button styles
    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={baseClasses}
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin text-current" />}
            {children}
          </a>
        );
      }

      return (
        <Link href={href} className={baseClasses}>
          {isLoading && <Loader2 className="h-4 w-4 animate-spin text-current" />}
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        className={baseClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin text-current" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
