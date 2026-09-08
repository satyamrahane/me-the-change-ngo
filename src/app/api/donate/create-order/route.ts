import { NextRequest, NextResponse } from "next/server";
import { createDonationOrderSchema } from "@/lib/validations/donations";
import { checkRateLimit, sanitizeText } from "@/lib/security/rate-limit";
import { createPaymentOrder } from "@/lib/razorpay";
import { createDonationRecord } from "@/lib/donations/store";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous-client";
    const rateLimit = checkRateLimit(`donate-order:${ip}`, { maxRequests: 10, windowMs: 60 * 1000 });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many payment requests. Please wait ${rateLimit.resetInSeconds} seconds.`,
        },
        { status: 429 }
      );
    }

    // 2. Parse JSON
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON format in request." },
        { status: 400 }
      );
    }

    // 3. Honeypot Bot Trap
    if (body.website && body.website.trim() !== "") {
      return NextResponse.json(
        { success: false, error: "Payment could not be initiated." },
        { status: 400 }
      );
    }

    // 4. Zod Validation
    const validation = createDonationOrderSchema.safeParse(body);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of validation.error.issues) {
        const field = issue.path[0]?.toString() || "form";
        fieldErrors[field] = issue.message;
      }
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please correct the highlighted fields.",
          fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // 5. Server-Side Calculations
    const amountRupees = Math.round(data.amount);
    const amountInPaise = amountRupees * 100;
    const receiptNumber = `MTC-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const sanitizedDonor = {
      name: sanitizeText(data.donorName),
      email: data.donorEmail.toLowerCase(),
      phone: sanitizeText(data.donorPhone),
      initiative: data.initiative,
    };

    // 6. Create Razorpay Payment Order
    const orderResult = await createPaymentOrder({
      amountInPaise,
      currency: "INR",
      receipt: receiptNumber,
      notes: {
        donor_name: sanitizedDonor.name,
        donor_email: sanitizedDonor.email,
        initiative: sanitizedDonor.initiative,
      },
    });

    // 7. Store Pending Donation Record
    await createDonationRecord({
      donorName: sanitizedDonor.name,
      donorEmail: sanitizedDonor.email,
      donorPhone: sanitizedDonor.phone,
      amount: amountRupees,
      amountPaise: amountInPaise,
      currency: "INR",
      initiative: sanitizedDonor.initiative,
      razorpayOrderId: orderResult.orderId,
      isMock: orderResult.isMock,
      receiptNumber,
    });

    // 8. Return Only Safe Client Data
    return NextResponse.json(
      {
        success: true,
        orderId: orderResult.orderId,
        amount: orderResult.amount, // in paise for Razorpay Checkout
        amountRupees,
        currency: orderResult.currency,
        publicKeyId: orderResult.publicKeyId,
        receiptNumber,
        isMock: orderResult.isMock,
        donor: {
          name: sanitizedDonor.name,
          email: sanitizedDonor.email,
          phone: sanitizedDonor.phone,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Create Donation Order API] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to initiate payment transaction at this time. Please try again.",
      },
      { status: 500 }
    );
  }
}
