"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  ShieldCheck,
  Lock,
  Loader2,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField, Input, HoneypotField } from "@/components/forms/form-ui";
import { InitiativePreference } from "@/lib/donations/store";

const PRESET_AMOUNTS = [500, 1000, 2500, 5000];

const INITIATIVE_OPTIONS: { id: InitiativePreference; label: string; description: string }[] = [
  {
    id: "general",
    label: "Where Needed Most (General Fund)",
    description: "Allocated flexibly to our most critical grassroots needs in Pune.",
  },
  {
    id: "food-relief",
    label: "Food Relief (Hospital Drives & Nutrition)",
    description: "Supports patient food distribution outside Sassoon General Hospital.",
  },
  {
    id: "medicine-aid",
    label: "Medicine Aid (Prescription Assistance)",
    description: "Assists underprivileged patients with essential emergency medicines.",
  },
  {
    id: "crisis-relief",
    label: "Crisis Relief (Emergency Support)",
    description: "Funds rapid mobilization during local disasters and community crises.",
  },
];

interface DonationFormState {
  amount: number;
  customAmount: string;
  isCustom: boolean;
  initiative: InitiativePreference;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  website: string; // Honeypot
}

export function DonationBox() {
  const router = useRouter();

  const [formData, setFormData] = useState<DonationFormState>({
    amount: 1000,
    customAmount: "",
    isCustom: false,
    initiative: "general",
    donorName: "",
    donorEmail: "",
    donorPhone: "",
    website: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Simulated Mock Modal State
  const [mockModal, setMockModal] = useState<{
    isOpen: boolean;
    orderId: string;
    amountRupees: number;
    receiptNumber: string;
    donorName: string;
  } | null>(null);

  useEffect(() => {
    if (!mockModal?.isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMockModal(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mockModal?.isOpen]);

  const handlePresetSelect = (preset: number) => {
    setFormData((prev) => ({
      ...prev,
      amount: preset,
      isCustom: false,
      customAmount: "",
    }));
    if (fieldErrors.amount) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.amount;
        return next;
      });
    }
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setFormData((prev) => ({
      ...prev,
      customAmount: val,
      isCustom: true,
      amount: val ? parseInt(val, 10) : 0,
    }));
    if (fieldErrors.amount) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.amount;
        return next;
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleInitiativeChange = (initId: InitiativePreference) => {
    setFormData((prev) => ({ ...prev, initiative: initId }));
  };

  const effectiveAmount = formData.isCustom
    ? parseInt(formData.customAmount || "0", 10)
    : formData.amount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setFieldErrors({});

    if (effectiveAmount < 100) {
      setFieldErrors((prev) => ({
        ...prev,
        amount: "Minimum donation amount is ₹100",
      }));
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Create order on server
      const res = await fetch("/api/donate/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: effectiveAmount,
          donorName: formData.donorName,
          donorEmail: formData.donorEmail,
          donorPhone: formData.donorPhone,
          initiative: formData.initiative,
          website: formData.website,
        }),
      });

      const orderData = await res.json();

      if (!res.ok || !orderData.success) {
        setIsSubmitting(false);
        if (orderData.fieldErrors) {
          setFieldErrors(orderData.fieldErrors);
        }
        setErrorMessage(
          orderData.error || "Unable to initialize payment transaction. Please try again."
        );
        return;
      }

      // 2. Check if Mock Mode or Live Razorpay
      if (orderData.isMock) {
        setIsSubmitting(false);
        setMockModal({
          isOpen: true,
          orderId: orderData.orderId,
          amountRupees: orderData.amountRupees,
          receiptNumber: orderData.receiptNumber,
          donorName: orderData.donor.name,
        });
        return;
      }

      // 3. Live Razorpay Mode
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setIsSubmitting(false);
        setErrorMessage("Razorpay payment gateway SDK failed to load. Check your connection.");
        return;
      }

      const options = {
        key: orderData.publicKeyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Me The Change Foundation",
        description: `Donation to ${formData.initiative.replace("-", " ")}`,
        order_id: orderData.orderId,
        prefill: {
          name: orderData.donor.name,
          email: orderData.donor.email,
          contact: orderData.donor.phone,
        },
        theme: {
          color: "#1b4d3e", // Primary brand green
        },
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          try {
            const verifyRes = await fetch("/api/donate/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              router.push(
                `/donate/success?order_id=${encodeURIComponent(
                  response.razorpay_order_id
                )}&payment_id=${encodeURIComponent(response.razorpay_payment_id)}`
              );
            } else {
              router.push(
                `/donate/failed?order_id=${encodeURIComponent(
                  response.razorpay_order_id
                )}&reason=verification_failed`
              );
            }
          } catch {
            router.push(
              `/donate/failed?order_id=${encodeURIComponent(
                response.razorpay_order_id
              )}&reason=network_error`
            );
          }
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
          },
        },
      };

      // Open Razorpay Checkout modal
      const rzp = new (window as unknown as { Razorpay: new (opts: typeof options) => { open: () => void } }).Razorpay(options);
      rzp.open();
    } catch {
      setIsSubmitting(false);
      setErrorMessage("Network error occurred while preparing your donation. Please retry.");
    }
  };

  // Mock Mode Simulation Handlers
  const handleSimulateSuccess = async () => {
    if (!mockModal) return;
    setIsSubmitting(true);
    const mockPaymentId = `pay_mock_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const mockSignature = `mock_sig_${mockModal.orderId}_${mockPaymentId}`;

    try {
      const res = await fetch("/api/donate/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id: mockModal.orderId,
          razorpay_payment_id: mockPaymentId,
          razorpay_signature: mockSignature,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push(
          `/donate/success?order_id=${encodeURIComponent(
            mockModal.orderId
          )}&payment_id=${encodeURIComponent(mockPaymentId)}`
        );
      } else {
        router.push(
          `/donate/failed?order_id=${encodeURIComponent(mockModal.orderId)}&reason=test_verification_failed`
        );
      }
    } catch {
      router.push(`/donate/failed?order_id=${encodeURIComponent(mockModal.orderId)}`);
    }
  };

  const handleSimulateFailure = () => {
    if (!mockModal) return;
    router.push(
      `/donate/failed?order_id=${encodeURIComponent(mockModal.orderId)}&reason=simulated_user_cancellation`
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-sm space-y-8"
      >
        <HoneypotField
          value={formData.website}
          onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
        />

        {errorMessage && (
          <div
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300 flex items-start gap-3"
            role="alert"
          >
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong className="font-semibold">Payment Error:</strong> {errorMessage}
            </div>
          </div>
        )}

        {/* 1. Select Amount */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="block text-sm font-semibold text-foreground">
              Choose Contribution Amount (INR) <span className="text-red-500">*</span>
            </span>
            <span className="text-xs text-muted-foreground">Min ₹100</span>
          </div>

          <div role="group" aria-label="Preset contribution amounts" className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PRESET_AMOUNTS.map((amt) => {
              const selected = !formData.isCustom && formData.amount === amt;
              return (
                <button
                  type="button"
                  key={amt}
                  aria-pressed={selected}
                  onClick={() => handlePresetSelect(amt)}
                  disabled={isSubmitting}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border text-base font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    selected
                      ? "border-primary bg-primary text-white shadow-xs"
                      : "border-border bg-background hover:border-slate-400 text-foreground"
                  }`}
                >
                  <span>₹{amt.toLocaleString("en-IN")}</span>
                </button>
              );
            })}
          </div>

          {/* Custom Amount Input */}
          <div className="pt-2">
            <label htmlFor="custom-amount" className="block text-xs font-medium text-muted-foreground mb-1.5">
              Or enter custom amount in Rupees:
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-semibold text-sm">
                ₹
              </span>
              <input
                id="custom-amount"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter custom amount (e.g. 1500)"
                value={formData.customAmount}
                onChange={handleCustomChange}
                disabled={isSubmitting}
                aria-describedby={fieldErrors.amount ? "custom-amount-error" : undefined}
                className={`flex h-11 w-full rounded-xl border bg-background pl-8 pr-3.5 py-2 text-sm text-foreground shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${
                  formData.isCustom && effectiveAmount < 100
                    ? "border-red-500 focus-visible:ring-red-500"
                    : "border-border hover:border-slate-400 focus-visible:ring-primary"
                }`}
              />
            </div>
            {fieldErrors.amount && (
              <p id="custom-amount-error" className="text-xs font-medium text-red-600 dark:text-red-400 mt-1" role="alert">
                {fieldErrors.amount}
              </p>
            )}
          </div>
        </div>

        {/* 2. Choose Initiative Preference */}
        <fieldset className="space-y-3 pt-2">
          <legend className="block text-sm font-semibold text-foreground">
            Initiative Preference <span className="text-xs font-normal text-muted-foreground">(Optional)</span>
          </legend>
          <div className="space-y-2">
            {INITIATIVE_OPTIONS.map((init) => {
              const selected = formData.initiative === init.id;
              return (
                <label
                  key={init.id}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer text-sm transition-colors ${
                    selected
                      ? "border-primary bg-primary/5 text-foreground font-medium"
                      : "border-border bg-background hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="initiative"
                    value={init.id}
                    checked={selected}
                    onChange={() => handleInitiativeChange(init.id)}
                    disabled={isSubmitting}
                    className="h-4 w-4 mt-0.5 text-primary border-border focus:ring-primary"
                  />
                  <div className="space-y-0.5">
                    <div className="font-medium text-foreground">{init.label}</div>
                    <div className="text-xs text-muted-foreground leading-normal">{init.description}</div>
                  </div>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* 3. Donor Details */}
        <div className="space-y-5 pt-2">
          <h3 className="text-sm font-semibold text-foreground">
            Donor Information for Electronic Receipt
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              id="donorName"
              label="Full Name"
              required
              error={fieldErrors.donorName}
            >
              {({ id, hasError, describedBy }) => (
                <Input
                  id={id}
                  name="donorName"
                  type="text"
                  required
                  hasError={hasError}
                  aria-describedby={describedBy}
                  placeholder="e.g. Ramesh Kulkarni"
                  value={formData.donorName}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  autoComplete="name"
                />
              )}
            </FormField>

            <FormField
              id="donorEmail"
              label="Email Address"
              required
              error={fieldErrors.donorEmail}
              helperText="Digital payment confirmation sent here"
            >
              {({ id, hasError, describedBy }) => (
                <Input
                  id={id}
                  name="donorEmail"
                  type="email"
                  required
                  hasError={hasError}
                  aria-describedby={describedBy}
                  placeholder="ramesh@example.com"
                  value={formData.donorEmail}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  autoComplete="email"
                />
              )}
            </FormField>
          </div>

          <FormField
            id="donorPhone"
            label="Phone Number"
            required
            error={fieldErrors.donorPhone}
            helperText="For payment verification & SMS notification"
          >
            {({ id, hasError, describedBy }) => (
              <Input
                id={id}
                name="donorPhone"
                type="tel"
                required
                hasError={hasError}
                aria-describedby={describedBy}
                placeholder="+91 98765 43210"
                value={formData.donorPhone}
                onChange={handleInputChange}
                disabled={isSubmitting}
                autoComplete="tel"
              />
            )}
          </FormField>
        </div>

        {/* 4. Tax Exemption & Regulatory Disclosure */}
        <div className="rounded-xl border border-border bg-slate-50 dark:bg-slate-900/40 p-4 text-xs text-slate-600 leading-relaxed space-y-1.5">
          <div className="flex items-center gap-1.5 font-semibold text-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>Tax Exemption & Receipt Policy</span>
          </div>
          <p>
            Standard digital receipts are issued immediately for all online contributions. Section 80G tax exemption
            certification for Me The Change Foundation is currently under statutory renewal/verification with the
            Income Tax Department. Contributions directly fund grassroots field relief in Pune.
          </p>
        </div>

        {/* 5. Submit Button */}
        <div className="space-y-3">
          <Button
            type="submit"
            variant="secondary"
            size="lg"
            disabled={isSubmitting || effectiveAmount < 100}
            className="w-full justify-center text-base py-4 font-bold shadow-md"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" aria-hidden="true" />
                <span>Connecting Payment Gateway...</span>
              </>
            ) : (
              <>
                <Heart className="h-5 w-5 fill-current mr-2" aria-hidden="true" />
                <span>Donate ₹{effectiveAmount.toLocaleString("en-IN")} Now</span>
              </>
            )}
          </Button>

          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-1">
            <span className="flex items-center gap-1">
              <Lock className="h-3 w-3 text-slate-500" aria-hidden="true" />
              <span>256-bit SSL Secure</span>
            </span>
            <span>•</span>
            <span>Razorpay Payment Gateway</span>
            <span>•</span>
            <span>UPI / Cards / NetBanking</span>
          </div>
        </div>
      </form>

      {/* Mock Payment Simulation Modal */}
      {mockModal?.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mock-modal-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                <Sparkles className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h3 id="mock-modal-title" className="font-heading text-lg font-bold text-foreground">
                  Razorpay Simulation Mode
                </h3>
                <p className="text-xs text-muted-foreground">Test integration environment</p>
              </div>
            </div>

            <div className="rounded-xl bg-muted/60 p-4 text-xs space-y-2 text-slate-700">
              <p>
                <strong>No real funds will be charged.</strong> This simulated checkout confirms that order creation,
                cryptographic signature verification, and donation storage are functioning seamlessly.
              </p>
              <div className="border-t border-border/70 pt-2 space-y-1">
                <div>Order Ref: <span className="font-mono font-medium">{mockModal.orderId}</span></div>
                <div>Amount: <span className="font-semibold text-foreground">₹{mockModal.amountRupees}</span></div>
                <div>Donor: <span className="font-medium">{mockModal.donorName}</span></div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <Button
                variant="primary"
                size="md"
                onClick={handleSimulateSuccess}
                disabled={isSubmitting}
                className="w-full justify-center gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="h-4 w-4" />
                )}
                <span>Simulate Successful Payment</span>
              </Button>

              <Button
                variant="outline"
                size="md"
                onClick={handleSimulateFailure}
                disabled={isSubmitting}
                className="w-full justify-center gap-2 text-red-600 hover:text-red-700"
              >
                <XCircle className="h-4 w-4" />
                <span>Simulate Payment Failure</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Loads the external Razorpay Checkout SDK dynamically when in live mode
 */
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    if ((window as unknown as { Razorpay?: unknown }).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}
