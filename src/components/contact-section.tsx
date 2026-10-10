import { site } from "@/content/site";
import { ContactForm } from "./contact-form";

const nextSteps = [
  { title: "We read your message", description: "and reply by email to set up a call." },
  { title: "A 30-minute discovery call", description: "to understand your goals, systems and constraints." },
  { title: "A written proposal", description: "with scope, timeline and price — before any work begins." },
];

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-panel text-panel-ink">
      <div className="container-page grid grid-cols-1 gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <div className="lg:col-span-5">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-panel-muted">Contact</p>
          <h2
            id="contact-title"
            className="mt-4 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl lg:text-[2.75rem]"
          >
            Tell us what you&apos;d like to automate.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-panel-muted">
            Share a little about your team and goals. We&apos;ll reply with a few questions and suggested next steps —
            no obligation.
          </p>

          <h3 className="mt-10 font-mono text-xs font-medium uppercase tracking-[0.14em] text-panel-muted">
            What happens next
          </h3>
          <ol className="mt-5 space-y-5">
            {nextSteps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-panel-line font-mono text-xs">
                  {index + 1}
                </span>
                <p className="pt-0.5 leading-relaxed">
                  <span className="font-medium">{step.title}</span>{" "}
                  <span className="text-panel-muted">{step.description}</span>
                </p>
              </li>
            ))}
          </ol>

          {site.bookingUrl || site.contactEmail ? (
            <div className="mt-10 space-y-2 border-t border-panel-line pt-6 text-sm text-panel-muted">
              {site.bookingUrl ? (
                <p>
                  Prefer to pick a time?{" "}
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-panel-ink underline underline-offset-4"
                  >
                    Book a call<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
              ) : null}
              {site.contactEmail ? (
                <p>
                  Or email{" "}
                  <a
                    href={`mailto:${site.contactEmail}`}
                    className="font-medium break-all text-panel-ink underline underline-offset-4"
                  >
                    {site.contactEmail}
                  </a>
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-panel-line bg-surface p-6 text-ink shadow-float sm:p-8 lg:p-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
