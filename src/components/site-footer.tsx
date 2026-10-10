import Link from "next/link";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { Logo } from "./logo";

const linkClass = "text-sm text-ink-2 transition-colors hover:text-ink";

function FooterHeading({ children }: { children: string }) {
  return <h2 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted">{children}</h2>;
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-12 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{site.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
          <div>
            <FooterHeading>Services</FooterHeading>
            <ul className="mt-4 space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className={linkClass}>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <FooterHeading>Company</FooterHeading>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/#process" className={linkClass}>
                  How we work
                </Link>
              </li>
              <li>
                <Link href="/#workflows" className={linkClass}>
                  Example workflows
                </Link>
              </li>
              <li>
                <Link href="/#faq" className={linkClass}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <FooterHeading>Get in touch</FooterHeading>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#contact" className={linkClass}>
                  Send a message
                </a>
              </li>
              {site.bookingUrl ? (
                <li>
                  <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Book a call<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ) : null}
              {site.contactEmail ? (
                <li>
                  <a href={`mailto:${site.contactEmail}`} className={`${linkClass} break-all`}>
                    {site.contactEmail}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>Salesforce, Agentforce and n8n are trademarks of their respective owners.</p>
        </div>
      </div>
    </footer>
  );
}
