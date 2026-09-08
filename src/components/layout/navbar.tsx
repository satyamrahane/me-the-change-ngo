"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Sparkles, ShieldCheck, HeartPulse, AlertCircle, Award, FileText, Shield } from "lucide-react";
import { siteConfig } from "@/config/site";
import { NavItem } from "@/types";
import { cn } from "@/lib/utils";

const itemIconMap: Record<string, React.ElementType> = {
  "Food Relief": HeartPulse,
  "Medicine Aid": Sparkles,
  "Crisis Relief": AlertCircle,
  "Certificates": Award,
  "Audit Reports": FileText,
  "Licenses": ShieldCheck,
};

export function Navbar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpenDropdown(null);
  }


  const toggleDropdown = (title: string) => {
    setOpenDropdown((prev) => (prev === title ? null : title));
  };

  return (
    <nav
      ref={navRef}
      aria-label="Main Navigation"
      className="hidden lg:flex items-center gap-1 xl:gap-2"
    >
      {siteConfig.mainNav.map((item: NavItem) => {
        const hasSubItems = Boolean(item.items && item.items.length > 0);
        const isOpen = openDropdown === item.title;
        const isActive =
          pathname === item.href ||
          (item.items && item.items.some((sub) => pathname.startsWith(sub.href)));

        if (!hasSubItems) {
          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "relative px-3 py-2 text-sm font-medium rounded-md transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isActive
                  ? "text-primary font-semibold bg-primary/5"
                  : "text-slate-700 hover:text-primary hover:bg-slate-100/70"
              )}
            >
              {item.title}
            </Link>
          );
        }

        const dropdownId = `dropdown-${item.title.toLowerCase().replace(/\s+/g, "-")}`;

        return (
          <div
            key={item.title}
            className="relative"
            onMouseEnter={() => setOpenDropdown(item.title)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              id={`${dropdownId}-button`}
              aria-expanded={isOpen}
              aria-haspopup="true"
              aria-controls={dropdownId}
              onClick={() => toggleDropdown(item.title)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isActive || isOpen
                  ? "text-primary font-semibold bg-primary/5"
                  : "text-slate-700 hover:text-primary hover:bg-slate-100/70"
              )}
            >
              <span>{item.title}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-slate-500 transition-transform duration-200",
                  isOpen && "rotate-180 text-primary"
                )}
                aria-hidden="true"
              />
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
              <div
                id={dropdownId}
                role="menu"
                aria-labelledby={`${dropdownId}-button`}
                className={cn(
                  "absolute left-0 top-full pt-2 w-80 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
                )}
              >
                <div className="rounded-xl border border-border bg-card p-2 shadow-lg ring-1 ring-black/5">
                  <div className="px-3 py-2 border-b border-border/60 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {item.title} Overview
                    </span>
                  </div>

                  <div className="space-y-1">
                    {item.items?.map((subItem) => {
                      const Icon = itemIconMap[subItem.title] || Shield;
                      const isSubActive = pathname === subItem.href;

                      return (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          role="menuitem"
                          onClick={() => setOpenDropdown(null)}
                          className={cn(
                            "group flex items-start gap-3 rounded-lg p-2.5 text-sm transition-colors",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                            isSubActive
                              ? "bg-primary-light/60 text-primary"
                              : "hover:bg-slate-50 text-slate-800"
                          )}
                        >
                          <div
                            className={cn(
                              "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors",
                              isSubActive
                                ? "bg-primary text-white"
                                : "bg-slate-100 text-slate-600 group-hover:bg-primary-light group-hover:text-primary"
                            )}
                          >
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </div>
                          <div>
                            <div className="font-medium leading-none text-slate-900 group-hover:text-primary">
                              {subItem.title}
                            </div>
                            {subItem.description && (
                              <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                                {subItem.description}
                              </p>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
