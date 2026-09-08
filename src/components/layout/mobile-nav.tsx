"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Heart, Shield, HeartPulse, Sparkles, AlertCircle, Award, FileText, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const itemIconMap: Record<string, React.ElementType> = {
  "Food Relief": HeartPulse,
  "Medicine Aid": Sparkles,
  "Crisis Relief": AlertCircle,
  "Certificates": Award,
  "Audit Reports": FileText,
  "Licenses": ShieldCheck,
};

export function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "Initiatives": true,
    "Transparency & Legal": false,
  });

  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Toggle mobile drawer
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }


  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false);
          toggleButtonRef.current?.focus();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      {/* Mobile Toggle Button */}
      <button
        ref={toggleButtonRef}
        type="button"
        aria-label={isOpen ? "Close main menu" : "Open main menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-drawer"
        onClick={toggleMenu}
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground",
          "hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        )}
      >
        {isOpen ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      {/* Drawer Overlay and Container */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
            onClick={closeMenu}
          />

          {/* Drawer Panel */}
          <div
            id="mobile-navigation-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            className={cn(
              "relative ml-auto flex h-full w-full max-w-sm flex-col bg-card shadow-2xl",
              "border-l border-border p-6 overflow-y-auto animate-in slide-in-from-right duration-200"
            )}
          >
            {/* Header in Drawer */}
            <div className="flex items-center justify-between border-b border-border pb-4">
              <Link
                href="/"
                onClick={closeMenu}
                className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-base shadow-sm">
                  MC
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-base font-bold text-foreground leading-tight">
                    {siteConfig.name}
                  </span>
                  <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    {siteConfig.registeredOffice.city}
                  </span>
                </div>
              </Link>

              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-slate-500 hover:bg-muted hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="my-4 flex-1 space-y-1">
              {siteConfig.mainNav.map((item) => {
                const hasSubItems = Boolean(item.items && item.items.length > 0);
                const isExpanded = expandedSections[item.title] || false;
                const isActive =
                  pathname === item.href ||
                  (item.items && item.items.some((sub) => pathname.startsWith(sub.href)));

                if (!hasSubItems) {
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={closeMenu}
                      className={cn(
                        "flex items-center rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                        isActive
                          ? "bg-primary-light text-primary font-semibold"
                          : "text-slate-800 hover:bg-slate-100"
                      )}
                    >
                      {item.title}
                    </Link>
                  );
                }

                const subMenuId = `mobile-submenu-${item.title.toLowerCase().replace(/\s+/g, "-")}`;

                return (
                  <div key={item.title} className="rounded-lg">
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={subMenuId}
                      onClick={() => toggleSection(item.title)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                        isActive
                          ? "text-primary font-semibold"
                          : "text-slate-800 hover:bg-slate-100"
                      )}
                    >
                      <span>{item.title}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-slate-500 transition-transform duration-200",
                          isExpanded && "rotate-180 text-primary"
                        )}
                        aria-hidden="true"
                      />
                    </button>

                    {isExpanded && (
                      <div id={subMenuId} className="ml-3 mt-1 space-y-1 border-l-2 border-primary/20 pl-3">
                        {item.items?.map((subItem) => {
                          const Icon = itemIconMap[subItem.title] || Shield;
                          const isSubActive = pathname === subItem.href;

                          return (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              onClick={closeMenu}
                              className={cn(
                                "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                                isSubActive
                                  ? "bg-primary-light text-primary font-semibold"
                                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                              )}
                            >
                              <Icon className="h-4 w-4 text-slate-400 shrink-0" aria-hidden="true" />
                              <span>{subItem.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Bottom Actions */}
            <div className="border-t border-border pt-4 space-y-3">
              <Button
                variant="secondary"
                size="lg"
                href="/donate"
                onClick={closeMenu}
                className="w-full justify-center shadow-sm text-base font-semibold"
              >
                <Heart className="h-4 w-4 fill-current mr-2" aria-hidden="true" />
                Donate Now
              </Button>

              <div className="rounded-lg bg-slate-50 p-3 text-center text-xs text-slate-500 border border-slate-200">
                <span className="font-medium text-slate-700">Need Immediate Assistance?</span>
                <div className="mt-1">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-primary hover:underline"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
