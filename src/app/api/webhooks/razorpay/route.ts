import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { markDonationCaptured, markDonationFailed } from "@/lib/donations/store";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Webhook signature header missing." },
        { status: 400 }
      );
    }

    // 1. Verify Webhook Signature
    const isSignatureValid = verifyWebhookSignature({
      rawBody,
      signature,
    });

    if (!isSignatureValid) {
      console.warn("[Razorpay Webhook] Invalid signature rejected.");
      return NextResponse.json(
        { error: "Invalid webhook signature." },
        { status: 400 }
      );
    }

    // 2. Parse Event JSON safely
    let eventPayload;
    try {
      eventPayload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: "Malformed webhook payload." },
        { status: 400 }
      );
    }

    const eventType = eventPayload.event;
    const paymentEntity = eventPayload.payload?.payment?.entity;
    const orderId = paymentEntity?.order_id || eventPayload.payload?.order?.entity?.id;
    const paymentId = paymentEntity?.id;

    // 3. Process Event Idempotently
    if (orderId) {
      if (eventType === "payment.captured" || eventType === "order.paid") {
        if (paymentId) {
          await markDonationCaptured({
            orderId,
            paymentId,
            signature: signature || "webhook_verified",
          });
        }
      } else if (eventType === "payment.failed") {
        await markDonationFailed(orderId);
      }
    }

    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (error) {
    console.error("[Razorpay Webhook Handler] Error:", error);
    return NextResponse.json(
      { error: "Internal webhook processing error." },
      { status: 500 }
    );
  }
}
