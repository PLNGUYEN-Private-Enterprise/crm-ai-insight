declare namespace NodeJS {
  interface ProcessEnv {
    /** Public origin, e.g. https://example.com — used for canonical, Open Graph and sitemap URLs. */
    NEXT_PUBLIC_SITE_URL?: string;
    /** Optional scheduling link for "Book a discovery call". */
    NEXT_PUBLIC_BOOKING_URL?: string;
    /** Optional public contact address. */
    NEXT_PUBLIC_CONTACT_EMAIL?: string;
    /** Webhook (e.g. an n8n Webhook node) that receives contact form submissions. Server-only. */
    CONTACT_WEBHOOK_URL?: string;
    /** Optional shared secret sent as the X-Webhook-Secret header. Server-only. */
    CONTACT_WEBHOOK_SECRET?: string;
  }
}
