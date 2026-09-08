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

export interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className = "", hasError, disabled, onChange, ...props }, ref) => {
    const internalRef = React.useRef<HTMLInputElement | null>(null);

    const handleContainerClick = () => {
      internalRef.current?.focus();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!onChange) return;
      let val = e.target.value;
      const rawDigits = val.replace(/\D/g, "");
      // If user pasted with leading country code or zero, strip to 10-digit national number
      if (rawDigits.startsWith("91") && rawDigits.length > 10) {
        val = rawDigits.slice(2, 12);
      } else if (rawDigits.startsWith("0") && rawDigits.length > 10) {
        val = rawDigits.slice(1, 11);
      } else {
        // Strip out non-digits while allowing spaces or dashes up to 11 chars
        val = val.replace(/[^\d\s-]/g, "").slice(0, 11);
      }
      e.target.value = val;
      onChange(e);
    };

    return (
      <div
        onClick={handleContainerClick}
        className={`flex h-11 w-full items-center rounded-xl border bg-background shadow-xs transition-colors cursor-text focus-within:ring-2 focus-within:ring-offset-1 ${
          hasError
            ? "border-red-500 focus-within:ring-red-500"
            : "border-border hover:border-slate-400 focus-within:ring-primary"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      >
        <div
          className="flex items-center pl-3.5 pr-1 select-none font-medium text-sm text-slate-500 shrink-0 pointer-events-none"
          aria-hidden="true"
        >
          <span>+91</span>
          <span className="mx-2 text-slate-300 dark:text-slate-600 font-light select-none">|</span>
        </div>
        <input
          ref={(node) => {
            internalRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          type="tel"
          inputMode="numeric"
          disabled={disabled}
          autoComplete="tel-national"
          className="flex-1 h-full w-full bg-transparent pr-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed"
          aria-invalid={hasError ? "true" : "false"}
          onChange={handleInputChange}
          {...props}
        />
      </div>
    );
  }
);
PhoneInput.displayName = "PhoneInput";

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
