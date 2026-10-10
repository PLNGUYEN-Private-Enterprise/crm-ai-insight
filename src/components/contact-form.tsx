"use client";

import { useActionState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { submitContact } from "@/lib/contact";
import { initialContactState, interestOptions, limits, type Interest } from "@/lib/contact-shared";

const inputClass =
  "mt-2 block w-full rounded-xl border border-field bg-surface px-4 py-3 text-base text-ink placeholder:text-muted transition-colors focus:border-sf aria-[invalid=true]:border-ai";

function interestForPath(pathname: string): Interest | undefined {
  if (pathname.startsWith("/services/salesforce-implementation")) return "salesforce";
  if (pathname.startsWith("/services/n8n-and-ai")) return "n8n-ai";
  return undefined;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-ai">
      <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

export function ContactForm() {
  const pathname = usePathname();
  const [state, formAction, pending] = useActionState(submitContact, initialContactState);
  const statusRef = useRef<HTMLDivElement>(null);

  // The form is replaced on success; move focus to the confirmation so keyboard users aren't stranded.
  useEffect(() => {
    if (state.status === "success") statusRef.current?.focus();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="flex flex-col items-start py-6 outline-hidden">
        <span className="flex size-12 items-center justify-center rounded-full bg-ok-soft text-ok">
          <CircleCheck className="size-6" aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-ink">Thanks — message received.</h3>
        <p className="mt-3 max-w-md leading-relaxed text-ink-2">
          We&apos;ll read it properly and reply by email with a few questions and times for a discovery call.
        </p>
      </div>
    );
  }

  const values = state.values;
  const errors = state.errors ?? {};
  const pageInterest = interestForPath(pathname);
  const selected: Interest[] = values?.interests ?? (pageInterest ? [pageInterest] : []);

  return (
    // Re-key by page so the pre-selected service follows client-side navigation.
    <form key={pathname} action={formAction} className="space-y-6">
      <input type="hidden" name="page" value={pathname} />
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={limits.name}
            autoComplete="name"
            defaultValue={values?.name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={inputClass}
          />
          <FieldError id="contact-name-error" message={errors.name} />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-medium text-ink">
            Work email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={limits.email}
            autoComplete="email"
            inputMode="email"
            defaultValue={values?.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={inputClass}
          />
          <FieldError id="contact-email-error" message={errors.email} />
        </div>
      </div>

      <div>
        <label htmlFor="contact-company" className="text-sm font-medium text-ink">
          Company <span className="font-normal text-muted">(optional)</span>
        </label>
        <input
          id="contact-company"
          name="company"
          type="text"
          maxLength={limits.company}
          autoComplete="organization"
          defaultValue={values?.company}
          className={inputClass}
        />
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-ink">What can we help with?</legend>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {interestOptions.map((option) => (
            <label
              key={option.value}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border border-line-strong px-4 text-sm text-ink transition-colors hover:border-field has-checked:border-ink has-checked:bg-surface-2 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-sf"
            >
              <input
                type="checkbox"
                name="interest"
                value={option.value}
                defaultChecked={selected.includes(option.value)}
                className="size-4 accent-ink outline-hidden"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="contact-message" className="text-sm font-medium text-ink">
          What would you like to improve or automate?
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          minLength={limits.messageMin}
          maxLength={limits.message}
          placeholder="e.g. Our leads come from three forms and nobody owns follow-up…"
          defaultValue={values?.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`${inputClass} resize-y`}
        />
        <FieldError id="contact-message-error" message={errors.message} />
      </div>

      {state.status === "error" && state.message ? (
        <p role="alert" className="flex items-start gap-2 rounded-xl bg-ai-soft px-4 py-3 text-sm text-ai">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-bg transition-colors hover:bg-ink/85 disabled:cursor-progress disabled:opacity-70"
        >
          {pending ? (
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="size-4" aria-hidden="true" />
          )}
          {pending ? "Sending…" : "Send message"}
        </button>
        <p className="text-xs leading-relaxed text-muted sm:max-w-60 sm:text-right">
          We only use your details to reply to this message.
        </p>
      </div>
    </form>
  );
}
