import { FAQItem } from "@/types";
import { siteConfig } from "@/config/site";

/**
 * Frequently Asked Questions (FAQ) Data Registry for "Me The Change" (NGO)
 *
 * CONTENT GUIDELINES:
 * - Answers use existing verified contact/initiative channels or neutral draft guidance.
 * - Do NOT make unverified tax exemption claims (e.g. 80G validity) until certificates are supplied.
 */

export const faqs: FAQItem[] = [
  {
    id: "faq-how-to-support",
    question: "How can I support the mission of Me The Change?",
    answer:
      "You can support our work through financial donations towards food relief, medical aid, and crisis relief initiatives, or by volunteering your time on the ground in Pune.",
    category: "donations",
    status: "verified",
  },
  {
    id: "faq-how-to-volunteer",
    question: "How can I join as a volunteer?",
    answer:
      "We welcome community members, college students, and professionals to participate in our food distribution drives and on-ground relief operations. You can reach out via our contact channels to get started.",
    category: "volunteering",
    status: "draft",
  },
  {
    id: "faq-transparency",
    question: "How does Me The Change ensure transparency in fund utilization?",
    answer:
      "We are committed to full public transparency. Our trust registration details, compliance documents, and annual financial audit reports are maintained in our public Transparency section.",
    category: "transparency",
    status: "draft",
  },
  {
    id: "faq-contact-info",
    question: "How can I contact the NGO directly?",
    answer: `You can contact our official team in Pune via email at ${siteConfig.contact.email} or connect with us on our official social media channels.`,
    category: "general",
    status: "verified",
  },
];

export function getFaqsByCategory(category: FAQItem["category"]): FAQItem[] {
  return faqs.filter((faq) => faq.category === category);
}
