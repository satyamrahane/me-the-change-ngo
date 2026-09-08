import { z } from "zod";

const phoneRegex = /^(\+?[0-9\s\-]{10,15})$/;

export const createDonationOrderSchema = z.object({
  amount: z
    .number({
      message: "Please enter a valid donation amount in Rupees",
    })
    .min(100, "Minimum donation amount is ₹100")
    .max(500000, "Maximum online donation limit is ₹5,00,000 per transaction"),
  donorName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  donorEmail: z
    .string()
    .trim()
    .email("Please provide a valid email address for receipt delivery")
    .max(100, "Email must not exceed 100 characters"),
  donorPhone: z
    .string()
    .trim()
    .regex(phoneRegex, "Please provide a valid phone number (10–15 digits)"),
  initiative: z.enum(
    ["general", "food-relief", "medicine-aid", "crisis-relief"],
    {
      message: "Please select a valid initiative preference",
    }
  ),
  notes: z
    .string()
    .trim()
    .max(500, "Notes must not exceed 500 characters")
    .optional()
    .or(z.literal("")),
  /** Honeypot field for bot detection */
  website: z.string().max(0, "Bot detected").optional().or(z.literal("")),
});

export type CreateDonationOrderInput = z.infer<typeof createDonationOrderSchema>;

export const verifyDonationPaymentSchema = z.object({
  razorpay_order_id: z
    .string()
    .trim()
    .min(5, "Valid order ID is required"),
  razorpay_payment_id: z
    .string()
    .trim()
    .min(5, "Valid payment ID is required"),
  razorpay_signature: z
    .string()
    .trim()
    .min(5, "Valid payment signature is required"),
});

export type VerifyDonationPaymentInput = z.infer<typeof verifyDonationPaymentSchema>;
