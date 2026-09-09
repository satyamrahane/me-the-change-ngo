"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Send, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField, Input, PhoneInput, Textarea, Select, HoneypotField } from "./form-ui";

interface VolunteerFormState {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  availability: "weekdays" | "weekends" | "flexible" | "on-call-emergencies";
  areasOfInterest: string[];
  message: string;
  website: string; // Honeypot
}

const initialFormState: VolunteerFormState = {
  fullName: "",
  email: "",
  phone: "",
  city: "Pune",
  availability: "flexible",
  areasOfInterest: ["Food Relief"],
  message: "",
  website: "",
};

const INTEREST_OPTIONS = [
  "Food Relief & Hospital Drives",
  "Medical Aid & Patient Support",
  "Emergency Crisis Response",
  "Ground Logistics & Distribution",
  "Event & Awareness Campaigns",
  "Administrative & Community Support",
];

export function VolunteerForm() {
  const [formData, setFormData] = useState<VolunteerFormState>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => {
      const exists = prev.areasOfInterest.includes(interest);
      const updated = exists
        ? prev.areasOfInterest.filter((item) => item !== interest)
        : [...prev.areasOfInterest, interest];
      return { ...prev, areasOfInterest: updated };
    });
    if (fieldErrors.areasOfInterest) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.areasOfInterest;
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
      const response = await fetch("/api/forms/volunteer", {
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
          data.error || "We couldn't submit your application right now. Please try again."
        );
        return;
      }

      setStatus("success");
      setFeedbackMessage(
        data.message ||
          "Thank you! Your volunteer application has been received. Our team will get in touch with you."
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
            Application Received
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
            <span>Submit Another Application</span>
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
          id="fullName"
          label="Full Name"
          required
          error={fieldErrors.fullName}
        >
          {({ id, hasError, describedBy }) => (
            <Input
              id={id}
              name="fullName"
              type="text"
              required
              hasError={hasError}
              aria-describedby={describedBy}
              placeholder="e.g. Rahul Sharma"
              value={formData.fullName}
              onChange={handleChange}
              disabled={status === "submitting"}
              autoComplete="name"
            />
          )}
        </FormField>

        <FormField
          id="email"
          label="Email Address"
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
              placeholder="rahul@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={status === "submitting"}
              autoComplete="email"
            />
          )}
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          id="phone"
          label="Phone Number"
          required
          error={fieldErrors.phone}
          helperText="10-digit Indian mobile number"
        >
          {({ id, hasError, describedBy }) => (
            <PhoneInput
              id={id}
              name="phone"
              required
              hasError={hasError}
              aria-describedby={describedBy}
              placeholder="98765 43210"
              value={formData.phone}
              onChange={handleChange}
              disabled={status === "submitting"}
            />
          )}
        </FormField>

        <FormField
          id="city"
          label="City / Locality"
          required
          error={fieldErrors.city}
        >
          {({ id, hasError, describedBy }) => (
            <Input
              id={id}
              name="city"
              type="text"
              required
              hasError={hasError}
              aria-describedby={describedBy}
              placeholder="e.g. Pune (Shivajinagar)"
              value={formData.city}
              onChange={handleChange}
              disabled={status === "submitting"}
            />
          )}
        </FormField>
      </div>

      <FormField
        id="availability"
        label="Availability"
        required
        error={fieldErrors.availability}
      >
        {({ id, hasError, describedBy }) => (
          <Select
            id={id}
            name="availability"
            required
            hasError={hasError}
            aria-describedby={describedBy}
            value={formData.availability}
            onChange={handleChange}
            disabled={status === "submitting"}
          >
            <option value="flexible">Flexible / Any time needed</option>
            <option value="weekends">Weekends only (Saturday & Sunday)</option>
            <option value="weekdays">Weekdays (Monday to Friday)</option>
            <option value="on-call-emergencies">Emergency & crisis on-call response</option>
          </Select>
        )}
      </FormField>

      {/* Areas of Interest Multi-select */}
      <fieldset
        className="space-y-2 text-left"
        aria-describedby={fieldErrors.areasOfInterest ? "areas-of-interest-error" : undefined}
      >
        <legend className="block text-sm font-medium text-foreground">
          Areas of Interest <span className="text-red-500" aria-hidden="true">*</span>
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {INTEREST_OPTIONS.map((option) => {
            const checked = formData.areasOfInterest.includes(option);
            return (
              <label
                key={option}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer text-sm transition-colors ${
                  checked
                    ? "border-primary bg-primary/5 text-foreground font-medium"
                    : "border-border bg-background hover:bg-slate-50 text-slate-700"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleInterestToggle(option)}
                  disabled={status === "submitting"}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <span>{option}</span>
              </label>
            );
          })}
        </div>
        {fieldErrors.areasOfInterest && (
          <p id="areas-of-interest-error" className="text-xs font-medium text-red-600 dark:text-red-400" role="alert">
            {fieldErrors.areasOfInterest}
          </p>
        )}
      </fieldset>

      <FormField
        id="message"
        label="Message or Relevant Skills (Optional)"
        error={fieldErrors.message}
        helperText="Tell us about any previous volunteering experience, languages spoken, or specific skills."
      >
        {({ id, hasError, describedBy }) => (
          <Textarea
            id={id}
            name="message"
            hasError={hasError}
            aria-describedby={describedBy}
            placeholder="Share any details that help us place you in the right initiative..."
            value={formData.message}
            onChange={handleChange}
            disabled={status === "submitting"}
            rows={3}
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
            <span>Submitting Application...</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" aria-hidden="true" />
            <span>Submit Volunteer Application</span>
          </>
        )}
      </Button>
    </form>
  );
}
