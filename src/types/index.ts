/**
 * Global Base Type Definitions for "Me The Change" (NGO)
 */

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

