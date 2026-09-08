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
    fullAddress: string; // Pending NGO confirmation
  };
  contact: {
    email: string; // Pending NGO confirmation
    phone: string; // Pending NGO confirmation
    whatsapp: string; // Pending NGO confirmation (e.g. +91XXXXXXXXXX)
  };
  social: {
    instagram: string;
    instagramHandle: string;
    youtube: string;
    linkedin: string;
  };
  legal: {
    trustRegistrationNumber: string; // Pending NGO confirmation
    darpanId: string; // Pending NGO confirmation
    twelveA: string; // 12A registration details pending
    eightyG: string; // 80G tax exemption details pending
    csrOne: string; // CSR-1 registration details pending
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
  legalName: "Me The Change Foundation",
  tagline: "Creating Change, Inspiring Hope",
  description:
    "Official web platform for Me The Change NGO. Dedicated to hunger relief, medical assistance, crisis response, and grassroots community empowerment.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.methechange.org",
  ogImage: "/images/og-image.jpg",
  
  registeredOffice: {
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    fullAddress: "Pune, Maharashtra, India",
  },

  contact: {
    email: "contact@methechange.org", // Pending NGO confirmation
    phone: "+91-XXXXXXXXXX", // Pending NGO confirmation
    whatsapp: "+91-XXXXXXXXXX", // Pending NGO confirmation
  },

  social: {
    instagram: "https://www.instagram.com/methechange",
    instagramHandle: "@methechange",
    youtube: "https://www.youtube.com/@methechange", // Pending official channel handle
    linkedin: "https://www.linkedin.com/company/methechange", // Pending official page link
  },

  legal: {
    trustRegistrationNumber: "Registration in progress",
    darpanId: "Pending verification",
    twelveA: "Pending verification",
    eightyG: "Pending verification",
    csrOne: "Pending verification",
    hasValid80G: false, // Flag to toggle verified 80G badge when certificates are officially uploaded
    hasValidCsrOne: false, // Flag to toggle CSR-1 badge
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
          description: "Daily nutrition & hospital food drives for patients and vulnerable families",
        },
        {
          title: "Medicine Aid",
          href: "/initiatives/medicine-aid",
          description: "Emergency prescription assistance and critical medical care support",
        },
        {
          title: "Crisis Relief",
          href: "/initiatives/crisis-relief",
          description: "Rapid disaster response, flood assistance, and emergency relief operations",
        },
      ],
    },
    {
      title: "Transparency & Legal",
      href: "/transparency",
      items: [
        {
          title: "Certificates",
          href: "/transparency#certificates",
          description: "Official NGO registration, trust deeds, and foundation credentials",
        },
        {
          title: "Audit Reports",
          href: "/transparency#audit-reports",
          description: "Annual audited financial statements and fund utilization disclosures",
        },
        {
          title: "Licenses",
          href: "/transparency#licenses",
          description: "12A, 80G tax exemption, CSR-1, and Darpan accreditations",
        },
      ],
    },
    {
      title: "Impact Stories",
      href: "/impact-stories",
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
      title: "Transparency & Documents",
      items: [
        { title: "Registration Certificate", href: "/transparency#certificates" },
        { title: "12A / 80G Exemption", href: "/transparency#licenses" },
        { title: "CSR-1 Registration", href: "/transparency#licenses" },
        { title: "NGO Darpan ID", href: "/transparency#licenses" },
        { title: "Annual Audit Reports", href: "/transparency#audit-reports" },
      ],
    },
    initiatives: {
      title: "Our Work",
      items: [
        { title: "Sassoon Hospital Food Drive", href: "/initiatives/food-relief" },
        { title: "Medical Aid Program", href: "/initiatives/medicine-aid" },
        { title: "COVID-19 Relief Archive", href: "/initiatives/crisis-relief" },
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

