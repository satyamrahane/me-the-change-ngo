/**
 * Centralized Site Configuration for "Me The Change" (NGO)
 * 
 * IMPORTANT CONTENT RULE:
 * Official legal, financial, and contact credentials will be supplied by the NGO team.
 * Do NOT invent or fabricate any details.
 * Placeholders are clearly marked and structured for seamless updates.
 */

import { NavItem, FooterSection, FooterLink } from "@/types";

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  url: string;
  ogImage: string;
  registeredOffice: {
    city: string;
    state: string;
    country: string;
    fullAddress: string;
  };
  contact: {
    email: string;
    phone: string;
    phoneRaw: string;
    whatsapp: string;
    whatsappPrefillMessage: string;
  };
  social: {
    instagram: string;
    instagramHandle: string;
  };
  legal: {
    trustRegistrationNumber: string;
    darpanId: string;
    twelveA: string;
    eightyG: string;
    csrOne: string;
    hasValid80G: boolean;
    hasValidCsrOne: boolean;
  };
  mainNav: NavItem[];
  footerNav: {
    transparency: FooterSection;
    initiatives: FooterSection;
  };
  legalNav: FooterLink[];
  features: {
    enableDonations: boolean;
    mockDonations: boolean;
    enableVolunteerRegistration: boolean;
    enableCsrInquiries: boolean;
  };
}

export const siteConfig: SiteConfig = {
  name: "Me The Change",
  legalName: "Me The Change",
  tagline: "Eradicating Hunger & Direct Community Action",
  description:
    "Me The Change is a grassroots non-governmental organization committed to eradicating hunger and uplifting underserved communities across Pune through daily nourishment, medical aid, and crisis relief.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://methechange.org",
  ogImage: "/images/og-image.jpg",
  
  registeredOffice: {
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    fullAddress: "160, Gavthan Shivaji Nagar, Pune, Maharashtra, 411005",
  },

  contact: {
    email: "", // Official email address not provided by NGO
    phone: "+91 98810 98920",
    phoneRaw: "9881098920",
    whatsapp: "", // WhatsApp not confirmed for helpline use
    whatsappPrefillMessage:
      "Hello Me The Change team, I would like to know more about your initiatives.",
  },

  social: {
    instagram: "https://www.instagram.com/methechange",
    instagramHandle: "@methechange",
  },

  legal: {
    trustRegistrationNumber: "Pending verification",
    darpanId: "Pending verification",
    twelveA: "Pending verification",
    eightyG: "Pending verification",
    csrOne: "Pending verification",
    hasValid80G: false,
    hasValidCsrOne: false,
  },

  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About Us",
      href: "/about",
    },
    {
      title: "Initiatives",
      href: "/initiatives",
      items: [
        {
          title: "Food Relief",
          href: "/initiatives/food-relief",
          description: "Daily nutrition & hospital caregiver food drives across 3 public hospitals",
        },
        {
          title: "Medicine Aid",
          href: "/initiatives/medicine-aid",
          description: "Emergency prescription assistance and vital medical care support",
        },
        {
          title: "Crisis Relief",
          href: "/initiatives/crisis-relief",
          description: "Emergency grocery kits, migrant relief, and rapid crisis response",
        },
      ],
    },
    {
      title: "Transparency & Legal",
      href: "/transparency",
      items: [
        {
          title: "Certificates",
          href: "/transparency/certificates",
          description: "Official statutory registrations, trust deeds, and foundation credentials",
        },
        {
          title: "Audit Reports",
          href: "/transparency/audits",
          description: "Annual audited financial statements and fund utilization disclosures",
        },
      ],
    },
    {
      title: "Get Involved",
      href: "/get-involved",
    },
    {
      title: "Contact Us",
      href: "/contact",
    },
  ],

  footerNav: {
    transparency: {
      title: "Transparency & Legal",
      items: [
        { title: "Certificates & Registrations", href: "/transparency/certificates" },
        { title: "Annual Audit Reports", href: "/transparency/audits" },
        { title: "Public Governance", href: "/transparency" },
      ],
    },
    initiatives: {
      title: "Our Work",
      items: [
        { title: "Daily Food Relief & Hospital Drives", href: "/initiatives/food-relief" },
        { title: "Medical Aid & Patient Welfare", href: "/initiatives/medicine-aid" },
        { title: "COVID-19 & Crisis Relief", href: "/initiatives/crisis-relief" },
      ],
    },
  },

  legalNav: [
    { title: "Privacy Policy", href: "/privacy-policy" },
    { title: "Terms & Conditions", href: "/terms-and-conditions" },
    { title: "Refund & Cancellation Policy", href: "/refund-cancellation-policy" },
  ],

  features: {
    enableDonations: true,
    mockDonations: process.env.NEXT_PUBLIC_MOCK_PAYMENTS === "true" || !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    enableVolunteerRegistration: true,
    enableCsrInquiries: true,
  },
};

export function isWhatsAppConfigured(): boolean {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || siteConfig.contact.whatsapp;
  if (!number || number.includes("X")) return false;
  const digits = number.replace(/[^0-9]/g, "");
  return digits.length >= 10;
}


