import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight, Quote } from "lucide-react";
import { accentClasses } from "@/components/accent";
import { ButtonLink } from "@/components/button-link";
import { FaqList } from "@/components/faq-list";
import { Eyebrow, SectionHeader } from "@/components/section";
import { getService, services } from "@/content/services";
import { site } from "@/content/site";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.name,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} · ${site.name}`,
      description: service.metaDescription,
      url: `/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const accent = accentClasses[service.accent];
  const otherService = services.find((candidate) => candidate.slug !== service.slug);
  const Icon = service.icon;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.name,
        description: service.summary,
        url: `${site.url}/services/${service.slug}`,
        provider: { "@type": "ProfessionalService", name: site.name, url: site.url },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: service.name, item: `${site.url}/services/${service.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero */}
      <section aria-labelledby="service-title" className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10" />
        <div className="container-page pt-8 pb-20 sm:pt-10 lg:pb-24">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm text-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-ink">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li>
                <Link href="/#services" className="transition-colors hover:text-ink">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li aria-current="page" className="truncate text-ink">
                {service.name}
              </li>
            </ol>
          </nav>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className={`flex size-11 items-center justify-center rounded-xl ${accent.soft} ${accent.text}`}>
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <Eyebrow>Service {service.number}</Eyebrow>
              </div>
              <h1
                id="service-title"
                className="mt-6 text-[2.5rem] leading-[1.04] font-semibold tracking-[-0.04em] text-ink sm:text-6xl"
              >
                {service.name}
              </h1>
              <p className={`mt-4 text-xl font-medium tracking-[-0.01em] sm:text-2xl ${accent.text}`}>
                {service.tagline}
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">{service.summary}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={site.cta.href} external={site.cta.external}>
                  {site.cta.label}
                  {site.cta.external ? null : <ArrowRight className="size-4" aria-hidden="true" />}
                </ButtonLink>
                <ButtonLink href="#included" variant="secondary">
                  See what&apos;s included
                </ButtonLink>
              </div>
            </div>

            <div className="lg:col-span-5">
              <dl className="divide-y divide-line rounded-3xl border border-line bg-surface shadow-card">
                <div className="p-6">
                  <dt className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted">Best for</dt>
                  <dd className="mt-2 leading-relaxed text-ink">{service.bestFor}</dd>
                </div>
                <div className="p-6">
                  <dt className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted">How it runs</dt>
                  <dd className="mt-2 leading-relaxed text-ink">
                    {service.steps.map((step) => step.title).join(" → ")}
                  </dd>
                </div>
                <div className="p-6">
                  <dt className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted">Tools we use</dt>
                  <dd className="mt-3">
                    <ul className="flex flex-wrap gap-2">
                      {service.tools.map((tool) => (
                        <li
                          key={tool}
                          className={`rounded-full border px-2.5 py-1 text-xs font-medium ${accent.border} ${accent.soft} ${accent.text}`}
                        >
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section aria-labelledby="problems-title" className="border-t border-line bg-surface py-20 lg:py-24">
        <div className="container-page">
          <SectionHeader id="problems-title" eyebrow="Sound familiar?" title="The problems we're usually called in for." />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {service.problems.map((problem) => (
              <li key={problem} className="flex gap-4 rounded-2xl border border-line bg-bg p-6">
                <Quote className={`size-5 shrink-0 ${accent.text}`} aria-hidden="true" />
                <p className="leading-relaxed text-ink">{problem}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Capabilities */}
      <section id="included" aria-labelledby="included-title" className="border-t border-line py-20 lg:py-28">
        <div className="container-page">
          <SectionHeader
            id="included-title"
            eyebrow="What's included"
            title="Everything it takes, end to end."
            intro="Pick the pieces you need — every engagement is scoped to your situation, not a fixed package."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((capability) => {
              const CapabilityIcon = capability.icon;
              return (
                <li key={capability.title} className="rounded-2xl border border-line bg-surface p-6 shadow-card">
                  <span className={`flex size-10 items-center justify-center rounded-xl ${accent.soft} ${accent.text}`}>
                    <CapabilityIcon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em] text-ink">{capability.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{capability.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Engagement + deliverables */}
      <section aria-labelledby="engagement-title" className="border-t border-line bg-surface py-20 lg:py-28">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <SectionHeader id="engagement-title" eyebrow="How an engagement runs" title="Step by step, with no surprises." />
            <ol className="mt-10">
              {service.steps.map((step, index) => (
                <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0">
                  {index < service.steps.length - 1 ? (
                    <span aria-hidden="true" className="absolute top-11 bottom-1 left-5 w-px bg-line-strong" />
                  ) : null}
                  <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface font-mono text-sm text-ink">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">{step.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-ink-2">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-line bg-bg p-6 sm:p-8 lg:sticky lg:top-24">
              <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted">
                What you walk away with
              </h3>
              <ul className="mt-6 space-y-4">
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable} className="flex gap-3 text-ink">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-ok-soft text-ok">
                      <Check className="size-3.5" aria-hidden="true" />
                    </span>
                    {deliverable}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-link */}
      {otherService ? (
        <section aria-labelledby="pairs-title" className="border-t border-line py-14 lg:py-16">
          <div className="container-page">
            <div className="relative flex flex-col gap-6 rounded-3xl border border-line bg-surface p-6 shadow-card transition-shadow hover:shadow-float has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-sf sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div className="flex items-start gap-5">
                <span
                  className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${accentClasses[otherService.accent].soft} ${accentClasses[otherService.accent].text}`}
                >
                  <otherService.icon className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <Eyebrow>Pairs well with</Eyebrow>
                  <h2 id="pairs-title" className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-ink">
                    <Link
                      href={`/services/${otherService.slug}`}
                      className="outline-hidden after:absolute after:inset-0 after:rounded-3xl after:content-['']"
                    >
                      {otherService.name}
                    </Link>
                  </h2>
                  <p className="mt-1.5 text-ink-2">{otherService.tagline}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink" aria-hidden="true">
                Explore {otherService.navLabel}
                <ArrowRight className="size-4" />
              </span>
            </div>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="border-t border-line py-20 lg:py-28">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeader id="faq-title" eyebrow="FAQ" title={`${service.navLabel} questions, answered.`} />
          </div>
          <div className="lg:col-span-8">
            <FaqList items={service.faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
