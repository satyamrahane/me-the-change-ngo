import { NextRequest, NextResponse } from "next/server";
import { verifyDonationPaymentSchema } from "@/lib/validations/donations";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { getDonationByOrderId, markDonationCaptured, markDonationFailed } from "@/lib/donations/store";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous-client";
    const rateLimit = checkRateLimit(`donate-verify:${ip}`, { maxRequests: 15, windowMs: 60 * 1000 });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many verification requests. Please wait a moment." },
        { status: 429 }
      );
    }

    // 2. Parse JSON
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON format." },
        { status: 400 }
      );
    }

    // 3. Zod Validation
    const validation = verifyDonationPaymentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing or invalid payment verification parameters.",
        },
        { status: 400 }
      );
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = validation.data;

    // 4. Retrieve Existing Donation Record
    const donation = await getDonationByOrderId(razorpay_order_id);
    if (!donation) {
      return NextResponse.json(
        {
          success: false,
          error: "No matching payment transaction found for this order ID.",
        },
        { status: 404 }
      );
    }

    // 5. Idempotency Check: If already captured, return safe success immediately
    if (donation.status === "captured") {
      return NextResponse.json(
        {
          success: true,
          message: "Payment verified successfully.",
          orderId: donation.razorpay_order_id,
          paymentId: donation.razorpay_payment_id,
          amount: donation.amount,
          initiative: donation.initiative,
          receiptNumber: donation.receipt_number,
          alreadyProcessed: true,
        },
        { status: 200 }
      );
    }

    // 6. Cryptographic Signature Verification
    const isSignatureValid = verifyPaymentSignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    if (!isSignatureValid) {
      console.warn(`[Payment Verification Failed] Signature mismatch for order ${razorpay_order_id}`);
      await markDonationFailed(razorpay_order_id);

      return NextResponse.json(
        {
          success: false,
          error: "Payment authentication signature could not be verified.",
        },
        { status: 400 }
      );
    }

    // 7. Update Status to Captured
    const result = await markDonationCaptured({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Payment successfully verified and captured.",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        amount: donation.amount,
        initiative: donation.initiative,
        receiptNumber: donation.receipt_number,
        alreadyProcessed: result.alreadyCaptured,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Verify Donation API] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An internal error occurred during payment verification. Please contact support with your payment ID.",
      },
      { status: 500 }
    );
  }
}
