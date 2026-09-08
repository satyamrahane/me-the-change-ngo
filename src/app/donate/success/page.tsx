"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Heart,
  ArrowRight,
  ShieldCheck,
  Loader2,
  Clock,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface VerifiedDonationDetails {
  orderId: string;
  paymentId?: string;
  amount: number;
  currency: string;
  donorName: string;
  initiative: string;
  status: string;
  receiptNumber: string;
  createdAt: string;
  isMock: boolean;
}

function DonationSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const paymentId = searchParams.get("payment_id");

  const [isLoading, setIsLoading] = useState<boolean>(Boolean(orderId));
  const [donation, setDonation] = useState<VerifiedDonationDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      return;
    }

    let isMounted = true;
    async function fetchDonation() {
      try {
        const res = await fetch(`/api/donate/lookup?order_id=${encodeURIComponent(orderId!)}`);
        const data = await res.json();

        if (!isMounted) return;
        if (res.ok && data.success && data.donation) {
          setDonation(data.donation);
        } else {
          setError(data.error || "Unable to retrieve payment transaction details.");
        }
      } catch {
        if (isMounted) {
          setError("Network error fetching transaction details.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchDonation();
    return () => {
      isMounted = false;
    };
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="py-20 text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" aria-hidden="true" />
        <p className="text-sm text-slate-600">Verifying transaction confirmation...</p>
      </div>
    );
  }

  // Direct access without order reference
  if (!orderId || (!donation && error)) {
    return (
      <div className="mx-auto max-w-xl text-center space-y-6 py-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-600 border border-amber-200">
          <Clock className="h-7 w-7" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
            Donation Verification Status
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            No active or verified donation session was specified in this request. If you recently made a payment,
            please check your email for the digital receipt or reach out to our team with your payment reference.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button variant="primary" size="md" href="/donate">
            <span>Make a Contribution</span>
            <Heart className="h-4 w-4 ml-1.5 fill-current" aria-hidden="true" />
          </Button>

          <Button variant="outline" size="md" href="/contact">
            Contact Support Desk
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8 py-6">
      {/* Success Badge & Header */}
      <div className="text-center space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
        </div>

        <Badge variant="default" className="py-1 px-3">
          <span>Payment Verified</span>
        </Badge>

        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
          Thank You for Your Generosity!
        </h1>

        <p className="text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
          Your donation has been successfully processed. Every rupee directly strengthens our relief operations on
          the ground in Pune.
        </p>

        {donation?.isMock && (
          <div className="inline-block rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 px-3 py-1 text-xs text-amber-800 dark:text-amber-300 font-medium">
            Test Mode Simulated Transaction — No real money was charged
          </div>
        )}
      </div>

      {/* Transaction Details Card */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-border/70 pb-4">
          <div className="space-y-0.5">
            <span className="text-xs text-muted-foreground">Receipt Number</span>
            <div className="font-mono font-bold text-sm text-foreground">
              {donation?.receiptNumber}
            </div>
          </div>

          <div className="text-right space-y-0.5">
            <span className="text-xs text-muted-foreground">Contribution Amount</span>
            <div className="font-heading text-2xl font-bold text-primary">
              ₹{donation?.amount.toLocaleString("en-IN")}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-muted-foreground">Donor Name</span>
            <div className="font-medium text-foreground text-sm">{donation?.donorName}</div>
          </div>

          <div className="space-y-1">
            <span className="text-muted-foreground">Initiative Preference</span>
            <div className="font-medium text-foreground text-sm capitalize">
              {donation?.initiative.replace("-", " ")}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-muted-foreground">Order Reference</span>
            <div className="font-mono text-muted-foreground truncate">{donation?.orderId}</div>
          </div>

          <div className="space-y-1">
            <span className="text-muted-foreground">Payment ID</span>
            <div className="font-mono text-muted-foreground truncate">
              {donation?.paymentId || paymentId || "Captured via Gateway"}
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-border/60 p-4 text-xs text-slate-600 space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>Digital Receipt & Records</span>
          </div>
          <p>
            An official digital payment confirmation has been recorded. Please retain this receipt number for your records.
          </p>
        </div>
      </div>

      {/* Next Steps / Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <Button variant="primary" size="md" href="/initiatives" className="font-semibold">
          <span>Explore Supported Initiatives</span>
          <ArrowRight className="h-4 w-4 ml-1.5" aria-hidden="true" />
        </Button>

        <Button variant="outline" size="md" href="/">
          Back to Home
        </Button>
      </div>
    </div>
  );
}

export default function DonationSuccessPage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-14 sm:py-20">
      <Container size="lg">
        <Suspense
          fallback={
            <div className="py-20 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            </div>
          }
        >
          <DonationSuccessContent />
        </Suspense>
      </Container>
    </section>
  );
}
