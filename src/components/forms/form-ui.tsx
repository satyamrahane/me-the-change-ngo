"use client";

import React from "react";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  children: (props: {
    id: string;
    hasError: boolean;
    describedBy?: string;
  }) => React.ReactNode;
}

export function FormField({
  id,
  label,
  required = false,
  error,
  helperText,
  children,
}: FormFieldProps) {
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="space-y-1.5 text-left">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
      </div>

      {children({ id, hasError: Boolean(error), describedBy })}

      {helperText && !error && (
        <p id={helperId} className="text-xs text-muted-foreground">
          {helperText}
        </p>
      )}

      {error && (
        <p id={errorId} className="text-xs font-medium text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", hasError, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`flex h-11 w-full rounded-xl border bg-background px-3.5 py-2 text-sm text-foreground shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${
          hasError
            ? "border-red-500 focus-visible:ring-red-500"
            : "border-border hover:border-slate-400 focus-visible:ring-primary"
        } ${className}`}
        aria-invalid={hasError ? "true" : "false"}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", hasError, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`flex min-h-[120px] w-full rounded-xl border bg-background p-3.5 text-sm text-foreground shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${
          hasError
            ? "border-red-500 focus-visible:ring-red-500"
            : "border-border hover:border-slate-400 focus-visible:ring-primary"
        } ${className}`}
        aria-invalid={hasError ? "true" : "false"}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", hasError, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`flex h-11 w-full rounded-xl border bg-background px-3.5 py-2 text-sm text-foreground shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${
          hasError
            ? "border-red-500 focus-visible:ring-red-500"
            : "border-border hover:border-slate-400 focus-visible:ring-primary"
        } ${className}`}
        aria-invalid={hasError ? "true" : "false"}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";

/**
 * Hidden honeypot field for anti-spam bot trap
 */
export function HoneypotField({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: "-9999px",
        top: "-9999px",
        opacity: 0,
        height: 0,
        width: 0,
        zIndex: -1,
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <label htmlFor="hp_website">Leave this field blank</label>
      <input
        type="text"
        id="hp_website"
        name="website"
        value={value}
        onChange={onChange}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
