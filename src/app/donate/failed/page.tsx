"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { XCircle, RefreshCw, ArrowRight, HelpCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function DonationFailedContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  return (
    <div className="mx-auto max-w-xl text-center space-y-8 py-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/50 text-red-600">
        <XCircle className="h-10 w-10" aria-hidden="true" />
      </div>

      <div className="space-y-3">
        <Badge variant="warning" className="py-1 px-3">
          <span>Transaction Incomplete</span>
        </Badge>

        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
          Payment Could Not Be Completed
        </h1>

        <p className="text-base text-slate-600 leading-relaxed max-w-md mx-auto">
          Your payment attempt was not completed by the gateway. Don&apos;t worry — no funds were transferred to the foundation.
        </p>
      </div>

      {orderId && (
        <div className="rounded-xl border border-border bg-card p-3 text-xs text-muted-foreground font-mono">
          Reference ID: {orderId}
        </div>
      )}

      {/* Helpful Guidance */}
      <div className="rounded-2xl border border-border bg-card p-6 text-left text-xs text-slate-600 space-y-3 shadow-xs">
        <div className="font-semibold text-foreground text-sm flex items-center gap-1.5">
          <HelpCircle className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>Common Reasons for Transaction Interruptions:</span>
        </div>
        <ul className="list-disc list-inside space-y-1.5 leading-relaxed">
          <li>UPI authorization request timed out or was closed in the banking app.</li>
          <li>Two-factor authentication (OTP) was delayed or not entered.</li>
          <li>Temporary connectivity issue with your bank or card issuer.</li>
        </ul>
        <div className="pt-2 border-t border-border/60 text-slate-500">
          <strong>Bank Deduction Notice:</strong> If your bank account was debited despite this message, the banking network will automatically initiate a full reversal within 3 to 5 business days.
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Button variant="primary" size="md" href="/donate" className="font-semibold">
          <RefreshCw className="h-4 w-4 mr-1.5" aria-hidden="true" />
          <span>Try Again</span>
        </Button>

        <Button variant="outline" size="md" href="/contact">
          <span>Contact Support Desk</span>
          <ArrowRight className="h-4 w-4 ml-1.5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}

export default function DonationFailedPage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-14 sm:py-20">
      <Container size="lg">
        <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
          <DonationFailedContent />
        </Suspense>
      </Container>
    </section>
  );
}
