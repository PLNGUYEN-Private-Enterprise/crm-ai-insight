"use server";

import { site } from "@/content/site";
import { interestOptions, limits, type ContactState, type ContactValues, type Interest } from "./contact-shared";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isInterest(value: string): value is Interest {
  return interestOptions.some((option) => option.value === value);
}

/**
 * Validates the contact form and forwards it as JSON to an n8n (or any) webhook.
 * Configure CONTACT_WEBHOOK_URL, and optionally CONTACT_WEBHOOK_SECRET, as Worker secrets.
 */
export async function submitContact(_previous: ContactState, formData: FormData): Promise<ContactState> {
  const field = (key: string, max: number) => String(formData.get(key) ?? "").trim().slice(0, max);

  // Humans never see this field; anything in it means a bot. Pretend it worked.
  if (field("website", 200)) return { status: "success" };

  const values: ContactValues = {
    name: field("name", limits.name),
    email: field("email", limits.email),
    company: field("company", limits.company),
    message: field("message", limits.message),
    interests: formData.getAll("interest").map(String).filter(isInterest),
  };

  const errors: ContactState["errors"] = {};
  if (!values.name) errors.name = "Please tell us your name.";
  if (!EMAIL_PATTERN.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.message.length < limits.messageMin) {
    errors.message = "A sentence or two about what you need helps us prepare.";
  }
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values };
  }

  const fallback = site.contactEmail ? ` You can also email us at ${site.contactEmail}.` : "";
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("CONTACT_WEBHOOK_URL is not configured; contact form submission was not delivered.");
    return {
      status: "error",
      message: `Our contact form isn't available right now.${fallback || " Please try again later."}`,
      values,
    };
  }

  const secret = process.env.CONTACT_WEBHOOK_SECRET;
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(secret ? { "X-Webhook-Secret": secret } : {}),
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        company: values.company,
        message: values.message,
        interests: values.interests.map((value) => interestOptions.find((option) => option.value === value)?.label),
        page: field("page", 200),
        source: "website",
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);
  } catch (error) {
    console.error("Contact webhook delivery failed:", error);
    return {
      status: "error",
      message: `Something went wrong sending your message. Please try again in a moment.${fallback}`,
      values,
    };
  }

  return { status: "success" };
}
