import { NextRequest, NextResponse } from "next/server";
import { getDonationByOrderId } from "@/lib/donations/store";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("order_id");

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "Order ID parameter missing." },
        { status: 400 }
      );
    }

    const donation = await getDonationByOrderId(orderId);

    if (!donation) {
      return NextResponse.json(
        { success: false, error: "No donation record found for this order ID." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      donation: {
        orderId: donation.razorpay_order_id,
        paymentId: donation.razorpay_payment_id,
        amount: donation.amount,
        currency: donation.currency,
        donorName: donation.donor_name,
        initiative: donation.initiative,
        status: donation.status,
        receiptNumber: donation.receipt_number,
        createdAt: donation.created_at,
        isMock: donation.is_mock,
      },
    });
  } catch (error) {
    console.error("[Donation Lookup API] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to look up donation." },
      { status: 500 }
    );
  }
}
