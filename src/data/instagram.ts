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
    image: "/images/real/food-volunteer.jpg",
    caption:
      "Hospital food distribution drive supporting patient families outside public hospitals in Pune.",
    postUrl: "https://www.instagram.com/methechange",
    category: "food-relief",
    status: "draft",
    altText: "Volunteer distributing packed meal box during daily hunger relief drive",
  },
  {
    id: "ig-medical-assistance",
    image: "/images/real/medical-camp.jpg",
    caption:
      "Essential prescription medicine support and health checkup camps for underserved families.",
    postUrl: "https://www.instagram.com/methechange",
    category: "medical-aid",
    status: "draft",
    altText: "Free health screening and doctor consultation camp organized in Pune",
  },
  {
    id: "ig-crisis-response-training",
    image: "/images/real/crisis-blankets.jpg",
    caption:
      "Distributing warm blankets and essential emergency kits to families during cold weather drives.",
    postUrl: "https://www.instagram.com/methechange",
    category: "crisis-relief",
    status: "draft",
    altText: "Volunteers handing over blankets and essential grocery relief packages",
  },
  {
    id: "ig-community-volunteers",
    image: "/images/real/community-rally.jpg",
    caption:
      "Our dedicated grassroots volunteer team mobilizing for community outreach and awareness.",
    postUrl: "https://www.instagram.com/methechange",
    category: "community",
    status: "draft",
    altText: "Me The Change community volunteers coming together during an on-ground awareness march",
  },
];
