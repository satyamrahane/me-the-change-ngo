/**
 * Global Base Type Definitions for "Me The Change" (NGO)
 */

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  disabled?: boolean;
  external?: boolean;
}

export interface SocialLink {
  title: string;
  href: string;
  icon?: string;
}
