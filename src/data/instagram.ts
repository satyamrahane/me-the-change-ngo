import { ContentStatus } from "@/types";

export interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  postUrl: string;
  publishedAt?: string;
  category?: "food-relief" | "medical-aid" | "crisis-relief" | "community";
  status: ContentStatus;
  altText: string;
}

/**
 * Curated Instagram Activity Showcase for "@methechange"
 *
 * CONTENT GUIDELINES:
 * - Links point directly to the official Instagram handle (@methechange).
 * - Status is marked as 'draft' until live posts are connected via approved embed/API.
 * - Do NOT fabricate engagement metrics or user testimonials.
 */
export const instagramPosts: InstagramPost[] = [
  {
    id: "ig-food-drive-sassoon",
    image: "/images/food-relief.jpg",
    caption:
      "Hospital food distribution drive supporting patient families outside Sassoon General Hospital, Pune.",
    postUrl: "https://www.instagram.com/methechange",
    category: "food-relief",
    status: "draft",
    altText: "Volunteers conducting food relief distribution in Pune",
  },
  {
    id: "ig-medical-assistance",
    image: "/images/medicine-aid.jpg",
    caption:
      "Essential prescription medicine support for underprivileged patients undergoing urgent care.",
    postUrl: "https://www.instagram.com/methechange",
    category: "medical-aid",
    status: "draft",
    altText: "Grassroots medical aid and prescription assistance program",
  },
  {
    id: "ig-crisis-response-training",
    image: "/images/crisis-relief.jpg",
    caption:
      "Community disaster preparedness and emergency response supplies readiness in Pune.",
    postUrl: "https://www.instagram.com/methechange",
    category: "crisis-relief",
    status: "draft",
    altText: "Emergency crisis relief supplies and logistics preparation",
  },
  {
    id: "ig-community-volunteers",
    image: "/images/hero-community.jpg",
    caption:
      "Our dedicated grassroots volunteer team mobilizing for weekend community meal distribution.",
    postUrl: "https://www.instagram.com/methechange",
    category: "community",
    status: "draft",
    altText: "Me The Change community volunteers coming together for field action",
  },
];
