"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, RefreshCw, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField, Input, Textarea, HoneypotField } from "./form-ui";

interface CsrFormState {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  areaOfInterest: string;
  message: string;
  website: string; // Honeypot
}

const initialFormState: CsrFormState = {
  companyName: "",
  contactPerson: "",
  email: "",
  phone: "",
  areaOfInterest: "",
  message: "",
  website: "",
};

export function CsrForm() {
  const [formData, setFormData] = useState<CsrFormState>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setFieldErrors({});
    setFeedbackMessage("");

    try {
      const response = await fetch("/api/forms/csr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setStatus("error");
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        setFeedbackMessage(
          data.error || "We couldn't submit your partnership inquiry right now. Please try again."
        );
        return;
      }

      setStatus("success");
      setFeedbackMessage(
        data.message ||
          "Thank you for reaching out. Your partnership inquiry has been received. Our team will review your message and contact you."
      );
      setFormData(initialFormState);
    } catch {
      setStatus("error");
      setFeedbackMessage(
        "Network connection error. Please verify your internet connection and try again."
      );
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setFieldErrors({});
    setStatus("idle");
    setFeedbackMessage("");
  };

  if (status === "success") {
    return (
      <div
        className="rounded-2xl border border-primary/20 bg-primary/5 p-8 sm:p-10 text-center space-y-5"
        role="region"
        aria-live="polite"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <h3 className="font-heading text-2xl font-bold text-foreground">
            Inquiry Received
          </h3>
          <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
            {feedbackMessage}
          </p>
        </div>
        <div className="pt-3">
          <Button
            variant="outline"
            size="md"
            onClick={handleReset}
            className="gap-2 mx-auto"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            <span>Submit Another Inquiry</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-xs"
    >
      <HoneypotField
        value={formData.website}
        onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
      />

      {status === "error" && (
        <div
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300 flex items-start gap-3"
          role="alert"
        >
          <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <strong className="font-semibold">Submission Error:</strong>{" "}
            {feedbackMessage}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          id="csr-company"
          label="Company / Foundation Name"
          required
          error={fieldErrors.companyName}
        >
          {({ id, hasError, describedBy }) => (
            <Input
              id={id}
              name="companyName"
              type="text"
              required
              hasError={hasError}
              aria-describedby={describedBy}
              placeholder="e.g. Acme Corporation"
              value={formData.companyName}
              onChange={handleChange}
              disabled={status === "submitting"}
            />
          )}
        </FormField>

        <FormField
          id="csr-contact"
          label="Contact Person & Designation"
          required
          error={fieldErrors.contactPerson}
        >
          {({ id, hasError, describedBy }) => (
            <Input
              id={id}
              name="contactPerson"
              type="text"
              required
              hasError={hasError}
              aria-describedby={describedBy}
              placeholder="e.g. Anita Roy (CSR Lead)"
              value={formData.contactPerson}
              onChange={handleChange}
              disabled={status === "submitting"}
              autoComplete="name"
            />
          )}
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          id="csr-email"
          label="Corporate Email Address"
          required
          error={fieldErrors.email}
        >
          {({ id, hasError, describedBy }) => (
            <Input
              id={id}
              name="email"
              type="email"
              required
              hasError={hasError}
              aria-describedby={describedBy}
              placeholder="anita@company.com"
              value={formData.email}
              onChange={handleChange}
              disabled={status === "submitting"}
              autoComplete="email"
            />
          )}
        </FormField>

        <FormField
          id="csr-phone"
          label="Direct Contact Number"
          required
          error={fieldErrors.phone}
          helperText="Official phone or mobile number"
        >
          {({ id, hasError, describedBy }) => (
            <Input
              id={id}
              name="phone"
              type="tel"
              required
              hasError={hasError}
              aria-describedby={describedBy}
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              disabled={status === "submitting"}
              autoComplete="tel"
            />
          )}
        </FormField>
      </div>

      <FormField
        id="csr-area"
        label="Area of Collaboration Interest"
        required
        error={fieldErrors.areaOfInterest}
        helperText="e.g., Food distribution sponsorship, medicine support, disaster response, or employee volunteering"
      >
        {({ id, hasError, describedBy }) => (
          <Input
            id={id}
            name="areaOfInterest"
            type="text"
            required
            hasError={hasError}
            aria-describedby={describedBy}
            placeholder="e.g. Food Relief or Medicine Aid collaboration"
            value={formData.areaOfInterest}
            onChange={handleChange}
            disabled={status === "submitting"}
          />
        )}
      </FormField>

      <FormField
        id="csr-message"
        label="Collaboration Proposal or Inquiry"
        required
        error={fieldErrors.message}
        helperText="Briefly outline your organization's CSR priorities and how you envision partnering."
      >
        {({ id, hasError, describedBy }) => (
          <Textarea
            id={id}
            name="message"
            required
            hasError={hasError}
            aria-describedby={describedBy}
            placeholder="Share details about your objectives, timeline, or inquiries..."
            value={formData.message}
            onChange={handleChange}
            disabled={status === "submitting"}
            rows={4}
          />
        )}
      </FormField>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === "submitting"}
        className="w-full justify-center font-semibold text-base py-3 shadow-sm"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin mr-2" aria-hidden="true" />
            <span>Submitting Partnership Inquiry...</span>
          </>
        ) : (
          <>
            <Building2 className="h-4 w-4 mr-2" aria-hidden="true" />
            <span>Submit CSR Inquiry</span>
          </>
        )}
      </Button>
    </form>
  );
}
