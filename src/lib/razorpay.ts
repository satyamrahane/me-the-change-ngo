import crypto from "crypto";
import Razorpay from "razorpay";

/**
 * Server-Side Razorpay Payment Integration Utility
 *
 * CRITICAL SECURITY RULES:
 * - Razorpay Key Secret & Webhook Secret are STRICTLY server-only.
 * - Never log or return secret credentials to client code.
 * - Secure timing-safe comparisons for cryptographic signatures.
 * - Safe mock mode for local development and integration verification.
 */

let cachedRazorpayInstance: Razorpay | null = null;

export function isPaymentsMockMode(): boolean {
  if (process.env.PAYMENTS_MODE === "mock") {
    return true;
  }

  // In non-production environments, default to mock mode if keys are placeholders or missing
  if (process.env.NODE_ENV !== "production") {
    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !secret || keyId.includes("placeholder") || secret.includes("placeholder")) {
      return true;
    }
  }

  return false;
}

export function getRazorpayClient(): Razorpay | null {
  if (isPaymentsMockMode()) {
    return null;
  }

  if (cachedRazorpayInstance) {
    return cachedRazorpayInstance;
  }

  const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("[Payment Config Error] Razorpay credentials missing in production environment.");
    }
    return null;
  }

  cachedRazorpayInstance = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });

  return cachedRazorpayInstance;
}

export interface CreateOrderParams {
  amountInPaise: number;
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface CreatedOrderResult {
  orderId: string;
  amount: number;
  currency: string;
  receipt: string;
  isMock: boolean;
  publicKeyId: string;
}

/**
 * Creates a Razorpay payment order server-side (or simulated mock order)
 */
export async function createPaymentOrder(
  params: CreateOrderParams
): Promise<CreatedOrderResult> {
  const currency = params.currency || "INR";
  const isMock = isPaymentsMockMode();

  if (isMock) {
    const randomHex = crypto.randomBytes(8).toString("hex");
    const mockOrderId = `order_mock_${Date.now()}_${randomHex}`;

    return {
      orderId: mockOrderId,
      amount: params.amountInPaise,
      currency,
      receipt: params.receipt,
      isMock: true,
      publicKeyId: "rzp_test_mock_mode_active",
    };
  }

  const client = getRazorpayClient();
  if (!client) {
    throw new Error("Payment gateway client could not be initialized.");
  }

  const order = await client.orders.create({
    amount: params.amountInPaise,
    currency,
    receipt: params.receipt,
    notes: params.notes,
  });

  const publicKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || "";

  return {
    orderId: order.id,
    amount: typeof order.amount === "string" ? parseInt(order.amount, 10) : order.amount,
    currency: order.currency,
    receipt: order.receipt || params.receipt,
    isMock: false,
    publicKeyId,
  };
}

/**
 * Performs cryptographic verification of payment signature returned by Razorpay Checkout
 */
export function verifyPaymentSignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const isMock = isPaymentsMockMode();

  if (isMock) {
    // In mock mode, check that the signature matches our mock signature format
    // or is a valid non-empty test signature string
    if (params.signature.startsWith("mock_sig_") || params.signature.length > 5) {
      return true;
    }
    return false;
  }

  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    console.error("[Payment Security Error] RAZORPAY_KEY_SECRET is not configured.");
    return false;
  }

  try {
    const body = `${params.orderId}|${params.paymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    const expectedBuffer = Buffer.from(expectedSignature, "utf8");
    const receivedBuffer = Buffer.from(params.signature, "utf8");

    if (expectedBuffer.length !== receivedBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
  } catch (err) {
    console.error("[Payment Verification Error] Exception verifying signature:", err);
    return false;
  }
}

/**
 * Performs cryptographic verification of Razorpay webhook events
 */
export function verifyWebhookSignature(params: {
  rawBody: string;
  signature: string;
}): boolean {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (isPaymentsMockMode()) {
    // In mock mode, allow test signature header
    return params.signature === "mock_webhook_signature" || params.signature.length > 10;
  }

  if (!webhookSecret) {
    console.error("[Webhook Security Error] RAZORPAY_WEBHOOK_SECRET is not configured.");
    return false;
  }

  try {
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(params.rawBody)
      .digest("hex");

    const expectedBuffer = Buffer.from(expectedSignature, "utf8");
    const receivedBuffer = Buffer.from(params.signature, "utf8");

    if (expectedBuffer.length !== receivedBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
  } catch (err) {
    console.error("[Webhook Verification Error] Exception validating signature:", err);
    return false;
  }
}
