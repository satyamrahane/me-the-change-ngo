"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Loader2, Send, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { FormField, Input, PhoneInput, Textarea, HoneypotField } from "./form-ui";

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  website: string; // Honeypot
}

const initialFormState: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormState>(initialFormState);
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
      const response = await fetch("/api/forms/contact", {
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
          data.error || "We couldn't submit your message right now. Please try again."
        );
        return;
      }

      setStatus("success");
      setFeedbackMessage(
        data.message ||
          "Thank you. Your message has been received. We will respond as soon as possible."
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
            Message Sent
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
            <span>Send Another Message</span>
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
          id="contact-name"
          label="Your Name"
          required
          error={fieldErrors.name}
        >
          {({ id, hasError, describedBy }) => (
            <Input
              id={id}
              name="name"
              type="text"
              required
              hasError={hasError}
              aria-describedby={describedBy}
              placeholder="e.g. Priya Deshmukh"
              value={formData.name}
              onChange={handleChange}
              disabled={status === "submitting"}
              autoComplete="name"
            />
          )}
        </FormField>

        <FormField
          id="contact-email"
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
              placeholder="priya@example.com"
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
          id="contact-phone"
          label="Phone Number (Optional)"
          error={fieldErrors.phone}
          helperText="Optional, 10-digit mobile number"
        >
          {({ id, hasError, describedBy }) => (
            <PhoneInput
              id={id}
              name="phone"
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
          id="contact-subject"
          label="Subject"
          required
          error={fieldErrors.subject}
        >
          {({ id, hasError, describedBy }) => (
            <Input
              id={id}
              name="subject"
              type="text"
              required
              hasError={hasError}
              aria-describedby={describedBy}
              placeholder="General inquiry, relief aid, or feedback"
              value={formData.subject}
              onChange={handleChange}
              disabled={status === "submitting"}
            />
          )}
        </FormField>
      </div>

      <FormField
        id="contact-message"
        label="Message"
        required
        error={fieldErrors.message}
        helperText="Please describe your question or inquiry in detail."
      >
        {({ id, hasError, describedBy }) => (
          <Textarea
            id={id}
            name="message"
            required
            hasError={hasError}
            aria-describedby={describedBy}
            placeholder="How can we assist you or collaborate?"
            value={formData.message}
            onChange={handleChange}
            disabled={status === "submitting"}
            rows={4}
          />
        )}
      </FormField>

      <p className="text-xs text-muted-foreground leading-relaxed">
        By submitting this form, you agree that {siteConfig.name} may contact you regarding your inquiry. Personal information is processed in accordance with our{" "}
        <Link href="/privacy-policy" className="text-primary underline hover:text-primary-hover">
          Privacy Policy
        </Link>.
      </p>

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
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" aria-hidden="true" />
            <span>Send Message</span>
          </>
        )}
      </Button>
    </form>
  );
}
