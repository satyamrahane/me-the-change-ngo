/**
 * Centralized Site Configuration for "Me The Change" (NGO)
 * 
 * IMPORTANT CONTENT RULE:
 * Official legal, financial, and contact credentials will be supplied by the NGO team.
 * Do NOT invent or fabricate any details.
 * Placeholders are clearly marked and structured for seamless updates.
 */

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
    fullAddress: "Pune, Maharashtra, India (Official registered address pending NGO confirmation)",
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
    trustRegistrationNumber: "PENDING_OFFICIAL_REGISTRATION_NUMBER",
    darpanId: "PENDING_DARPAN_ID",
    twelveA: "PENDING_12A_DETAILS",
    eightyG: "PENDING_80G_DETAILS",
    csrOne: "PENDING_CSR1_DETAILS",
    hasValid80G: false, // Flag to toggle verified 80G badge when certificates are officially uploaded
    hasValidCsrOne: false, // Flag to toggle CSR-1 badge
  },

  features: {
    enableDonations: true,
    mockDonations: process.env.NEXT_PUBLIC_MOCK_PAYMENTS === "true" || !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    enableVolunteerRegistration: true,
    enableCsrInquiries: true,
  },
};
