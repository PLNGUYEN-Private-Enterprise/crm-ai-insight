const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || undefined;

export const site = {
  name: "CRM AI Insight",
  legalName: "PLNGUYEN Private Enterprise",
  description:
    "Salesforce implementation, n8n workflow automation and AI services — designed around how your team works and handed over properly.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000",
  /** Optional public inbox shown next to the contact form and in the footer. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || undefined,
  /** Optional scheduling link (Cal.com, Calendly, …). Without it, CTAs scroll to the contact form. */
  bookingUrl,
  cta: {
    label: "Book a discovery call",
    // Every page renders the contact section (see the root layout), so the fragment always resolves.
    href: bookingUrl ?? "#contact",
    external: Boolean(bookingUrl),
  },
} as const;

export const navigation = [
  { label: "Salesforce", href: "/services/salesforce-implementation" },
  { label: "n8n & AI", href: "/services/n8n-and-ai" },
  { label: "Process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
] as const;
