import { z } from "zod";

/**
 * Common regex for phone validation:
 * Allows 10 to 15 digits, optional leading +, spaces, hyphens
 */
const phoneRegex = /^(\+?[0-9\s\-]{10,15})$/;

/**
 * Volunteer Application Form Schema
 */
export const volunteerFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must not exceed 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(100, "Email must not exceed 100 characters"),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Please enter a valid phone number (10–15 digits)"),
  city: z
    .string()
    .trim()
    .min(2, "City / Locality must be at least 2 characters")
    .max(100, "City must not exceed 100 characters"),
  availability: z.enum(
    ["weekdays", "weekends", "flexible", "on-call-emergencies"],
    { message: "Please select your availability" }
  ),
  areasOfInterest: z
    .array(z.string())
    .min(1, "Please select at least one area of interest"),
  message: z
    .string()
    .trim()
    .max(1000, "Message must not exceed 1000 characters")
    .optional()
    .or(z.literal("")),
  /** Honeypot field for bot detection (must be empty) */
  website: z.string().max(0, "Bot detected").optional().or(z.literal("")),
});

export type VolunteerFormData = z.infer<typeof volunteerFormSchema>;

/**
 * General Contact Form Schema
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(100, "Email must not exceed 100 characters"),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Please enter a valid phone number (10–15 digits)")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters")
    .max(150, "Subject must not exceed 150 characters"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must not exceed 2000 characters"),
  /** Honeypot field for bot detection (must be empty) */
  website: z.string().max(0, "Bot detected").optional().or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * CSR & Institutional Partnership Form Schema
 */
export const csrFormSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, "Company / Organization name must be at least 2 characters")
    .max(150, "Organization name must not exceed 150 characters"),
  contactPerson: z
    .string()
    .trim()
    .min(2, "Contact person name must be at least 2 characters")
    .max(100, "Contact person name must not exceed 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid official email address")
    .max(100, "Email must not exceed 100 characters"),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Please enter a valid contact number (10–15 digits)"),
  areaOfInterest: z
    .string()
    .trim()
    .min(2, "Please specify an area of interest or collaboration")
    .max(150, "Area of interest must not exceed 150 characters"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must not exceed 2000 characters"),
  /** Honeypot field for bot detection (must be empty) */
  website: z.string().max(0, "Bot detected").optional().or(z.literal("")),
});

export type CsrFormData = z.infer<typeof csrFormSchema>;
