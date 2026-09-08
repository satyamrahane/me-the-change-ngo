/**
 * Global Base Type Definitions for "Me The Change" (NGO)
 */

export type ContentStatus = "verified" | "draft" | "pending" | "not-provided";

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  disabled?: boolean;
  external?: boolean;
  items?: NavItem[];
}

export interface FooterLink {
  title: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  items: FooterLink[];
}

export interface SocialLink {
  title: string;
  href: string;
  icon?: string;
}

export interface Initiative {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription?: string;
  category: "food-relief" | "medical-aid" | "crisis-relief";
  image?: string;
  gallery?: string[];
  features?: string[];
  status: ContentStatus;
  ctaText?: string;
  ctaHref?: string;
}

export interface TransparencyDocument {
  id: string;
  title: string;
  category: "registration" | "tax-exemption" | "csr" | "darpan" | "audit-report" | "license";
  description: string;
  status: ContentStatus;
  filePath?: string;
  year?: string;
  fileType?: string;
  fileSize?: string;
}

export interface ImpactStory {
  slug: string;
  title: string;
  summary: string;
  content?: string;
  image?: string;
  gallery?: string[];
  date?: string;
  category: "food-relief" | "medical-aid" | "crisis-relief";
  status: ContentStatus;
}

export interface ImpactStat {
  id: string;
  label: string;
  value?: string | number;
  unit?: string;
  description?: string;
  category?: string;
  status: ContentStatus;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: "general" | "donations" | "volunteering" | "transparency";
  status: ContentStatus;
}


