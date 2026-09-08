import { getSupabaseAdmin } from "@/lib/supabase/server";

export type DonationStatus = "pending" | "captured" | "failed" | "cancelled";
export type InitiativePreference = "general" | "food-relief" | "medicine-aid" | "crisis-relief";

export interface DonationRecord {
  id: string;
  created_at: string;
  updated_at: string;
  donor_name: string;
  donor_email: string;
  donor_phone: string;
  amount: number; // in Rupees (e.g. 500)
  amount_paise: number; // in Paise (e.g. 50000)
  currency: string;
  initiative: InitiativePreference;
  razorpay_order_id: string;
  razorpay_payment_id?: string | null;
  razorpay_signature?: string | null;
  status: DonationStatus;
  is_mock: boolean;
  receipt_number: string;
}

// In-memory store for local testing & development resilience
const donationsMemoryStore = new Map<string, DonationRecord>();

/**
 * Creates and stores a new pending donation record
 */
export async function createDonationRecord(params: {
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  amount: number;
  amountPaise: number;
  currency?: string;
  initiative: InitiativePreference;
  razorpayOrderId: string;
  isMock: boolean;
  receiptNumber: string;
}): Promise<DonationRecord> {
  const now = new Date().toISOString();
  const id = `don_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  const record: DonationRecord = {
    id,
    created_at: now,
    updated_at: now,
    donor_name: params.donorName,
    donor_email: params.donorEmail,
    donor_phone: params.donorPhone,
    amount: params.amount,
    amount_paise: params.amountPaise,
    currency: params.currency || "INR",
    initiative: params.initiative,
    razorpay_order_id: params.razorpayOrderId,
    razorpay_payment_id: null,
    razorpay_signature: null,
    status: "pending",
    is_mock: params.isMock,
    receipt_number: params.receiptNumber,
  };

  // 1. Cache in memory
  donationsMemoryStore.set(params.razorpayOrderId, record);

  // 2. Persist to Supabase if configured
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      await supabase.from("donations").insert({
        id: record.id,
        created_at: record.created_at,
        updated_at: record.updated_at,
        donor_name: record.donor_name,
        donor_email: record.donor_email,
        donor_phone: record.donor_phone,
        amount: record.amount,
        amount_paise: record.amount_paise,
        currency: record.currency,
        initiative: record.initiative,
        razorpay_order_id: record.razorpay_order_id,
        status: record.status,
        is_mock: record.is_mock,
        receipt_number: record.receipt_number,
      });
    } catch (err) {
      console.error("[Donation Store] Supabase insertion error:", err);
    }
  }

  return record;
}

/**
 * Retrieves a donation record by Razorpay Order ID
 */
export async function getDonationByOrderId(orderId: string): Promise<DonationRecord | null> {
  // Check memory store first
  const cached = donationsMemoryStore.get(orderId);
  if (cached) {
    return cached;
  }

  // Fallback to Supabase if configured
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("donations")
        .select("*")
        .eq("razorpay_order_id", orderId)
        .single();

      if (!error && data) {
        donationsMemoryStore.set(orderId, data as DonationRecord);
        return data as DonationRecord;
      }
    } catch (err) {
      console.error("[Donation Store] Error querying Supabase by order ID:", err);
    }
  }

  return null;
}

/**
 * Idempotently updates donation status to 'captured'
 */
export async function markDonationCaptured(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}): Promise<{ success: boolean; donation: DonationRecord | null; alreadyCaptured: boolean }> {
  const existing = await getDonationByOrderId(params.orderId);

  if (!existing) {
    return { success: false, donation: null, alreadyCaptured: false };
  }

  // Idempotency check: if already captured, don't duplicate processing
  if (existing.status === "captured") {
    return { success: true, donation: existing, alreadyCaptured: true };
  }

  const updated: DonationRecord = {
    ...existing,
    status: "captured",
    razorpay_payment_id: params.paymentId,
    razorpay_signature: params.signature,
    updated_at: new Date().toISOString(),
  };

  donationsMemoryStore.set(params.orderId, updated);

  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      await supabase
        .from("donations")
        .update({
          status: "captured",
          razorpay_payment_id: params.paymentId,
          razorpay_signature: params.signature,
          updated_at: updated.updated_at,
        })
        .eq("razorpay_order_id", params.orderId);
    } catch (err) {
      console.error("[Donation Store] Supabase update error:", err);
    }
  }

  return { success: true, donation: updated, alreadyCaptured: false };
}

/**
 * Updates donation status to 'failed'
 */
export async function markDonationFailed(orderId: string): Promise<{ success: boolean; donation: DonationRecord | null }> {
  const existing = await getDonationByOrderId(orderId);

  if (!existing) {
    return { success: false, donation: null };
  }

  if (existing.status === "captured") {
    // Cannot fail an already captured donation
    return { success: false, donation: existing };
  }

  const updated: DonationRecord = {
    ...existing,
    status: "failed",
    updated_at: new Date().toISOString(),
  };

  donationsMemoryStore.set(orderId, updated);

  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      await supabase
        .from("donations")
        .update({
          status: "failed",
          updated_at: updated.updated_at,
        })
        .eq("razorpay_order_id", orderId);
    } catch (err) {
      console.error("[Donation Store] Supabase update to failed error:", err);
    }
  }

  return { success: true, donation: updated };
}
