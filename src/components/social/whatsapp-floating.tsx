"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43-.14-.01-.31-.01-.47-.01-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.3" />
    </svg>
  );
}

export function WhatsAppFloating() {
  const [showTooltip, setShowTooltip] = useState(false);

  const rawNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || siteConfig.contact.whatsapp || "";
  const isConfigured = !rawNumber.includes("X") && rawNumber.replace(/[^0-9]/g, "").length >= 10;
  const cleanDigits = rawNumber.replace(/[^0-9]/g, "");
  const prefilledMessage = siteConfig.contact.whatsappPrefillMessage;
  const whatsappUrl = `https://wa.me/${cleanDigits}?text=${encodeURIComponent(prefilledMessage)}`;

  // Safe non-configured handler to avoid navigating to broken links
  const handleClick = (e: React.MouseEvent) => {
    if (!isConfigured) {
      e.preventDefault();
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 4000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 sm:bottom-8 sm:right-8 flex flex-col items-end">
      {/* Informative Tooltip if unconfigured or on hover */}
      {showTooltip && (
        <div
          role="status"
          className="mb-2 rounded-xl border border-border bg-card p-3 shadow-lg text-xs text-foreground max-w-xs transition-all animate-in fade-in slide-in-from-bottom-2"
        >
          <p className="font-semibold text-primary">WhatsApp Helpdesk</p>
          <p className="text-muted-foreground mt-0.5">
            {isConfigured
              ? "Click to chat directly with our volunteer team on WhatsApp."
              : "Official WhatsApp helpline number is pending verification and will be activated shortly."}
          </p>
        </div>
      )}

      {isConfigured ? (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          aria-label="Contact Me The Change team on WhatsApp"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20bd5a] hover:scale-105 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
        >
          <WhatsAppIcon className="h-7 w-7" />
          <span className="sr-only">Chat with us on WhatsApp</span>
        </a>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          aria-label="WhatsApp Helpdesk (Pending official verification)"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366]/90 text-white shadow-lg hover:bg-[#20bd5a] hover:scale-105 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 opacity-90"
        >
          <WhatsAppIcon className="h-7 w-7" />
          <span className="sr-only">WhatsApp Helpdesk (Pending setup)</span>
        </button>
      )}
    </div>
  );
}
