import type { Metadata } from "next";
import { ArrowDown, ArrowRight, Check, Cloud, Sparkles, Workflow, type LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { FaqList } from "@/components/faq-list";
import { FlowRun } from "@/components/flow-run";
import { SectionHeader } from "@/components/section";
import { ServiceCard } from "@/components/service-card";
import { ToolTag } from "@/components/tool-tag";
import { faqs, principles, processSteps, workflows } from "@/content/home";
import { services } from "@/content/services";
import { site } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const assurances = ["Written scope before work starts", "Documented handover", "You own every workflow"];

const systemNodes: { icon: LucideIcon; title: string; text: string; tile: string }[] = [
  { icon: Cloud, title: "Salesforce", text: "holds one trusted record of every customer", tile: "bg-sf-soft text-sf" },
  { icon: Workflow, title: "n8n flows", text: "move data between Salesforce and every other tool", tile: "bg-ai-soft text-ai" },
  { icon: Sparkles, title: "AI", text: "reads, drafts and decides alongside your team", tile: "bg-ai-soft text-ai" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  description: site.description,
  makesOffer: services.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.name,
      description: service.summary,
      url: `${site.url}/services/${service.slug}`,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10" />
        <div className="container-page grid grid-cols-1 items-center gap-14 pt-14 pb-20 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:pt-24 lg:pb-28">
          <div className="lg:col-span-6">
            <p className="inline-flex items-center gap-3 rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-xs text-ink-2">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-sf" aria-hidden="true" />
                Salesforce
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-ai" aria-hidden="true" />
                n8n
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-ai" aria-hidden="true" />
                AI
              </span>
            </p>
            <h1
              id="hero-title"
              className="mt-6 text-[2.625rem] leading-[1.02] font-semibold tracking-[-0.04em] text-ink sm:text-6xl lg:text-[4.25rem]"
            >
              Make your CRM <span className="text-gradient">do the work.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2 sm:text-xl">
              We implement Salesforce, connect it to the rest of your stack with n8n flows, and put AI to work on your
              data — scoped clearly, documented properly and handed over to your team.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={site.cta.href} external={site.cta.external}>
                {site.cta.label}
                {site.cta.external ? null : <ArrowRight className="size-4" aria-hidden="true" />}
              </ButtonLink>
              <ButtonLink href="#services" variant="secondary">
                Explore the two services
              </ButtonLink>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-ink-2">
              {assurances.map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <Check className="size-4 text-ok" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:pl-6">
            <FlowRun />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" aria-labelledby="services-title" className="border-t border-line py-20 lg:py-28">
        <div className="container-page">
          <SectionHeader
            id="services-title"
            eyebrow="What we do"
            title="Two services. One connected system."
            intro="Salesforce is where your customer data lives. n8n flows and AI are how it moves and works for you. Start with either — they're built to fit together."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-dashed border-line-strong p-6 sm:p-8">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted">Better together</p>
            <ol className="mt-6 grid gap-8 md:grid-cols-3 md:gap-12">
              {systemNodes.map((node, index) => {
                const Icon = node.icon;
                return (
                  <li key={node.title} className="relative flex items-center gap-4">
                    {index > 0 ? (
                      <ArrowDown
                        aria-hidden="true"
                        className="absolute -top-6 left-3.5 size-4 text-muted md:top-1/2 md:-left-8 md:-translate-y-1/2 md:-rotate-90"
                      />
                    ) : null}
                    <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${node.tile}`}>
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <p className="text-sm leading-snug text-ink-2">
                      <span className="block font-semibold text-ink">{node.title}</span>
                      {node.text}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* Example workflows */}
      <section id="workflows" aria-labelledby="workflows-title" className="border-t border-line bg-surface py-20 lg:py-28">
        <div className="container-page">
          <SectionHeader
            id="workflows-title"
            eyebrow="Example workflows"
            title="What this looks like in practice."
            intro="A few of the flows teams ask for most. The tags show which service does the work."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {workflows.map((workflow) => (
              <li key={workflow.title} className="flex flex-col rounded-2xl border border-line bg-bg p-6">
                <div className="flex flex-wrap gap-2">
                  {workflow.tools.map((tool) => (
                    <ToolTag key={tool} tool={tool} />
                  ))}
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em] text-ink">{workflow.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{workflow.description}</p>
                <div className="mt-auto pt-6">
                  <p className="border-t border-dashed border-line-strong pt-4 font-mono text-xs text-muted">
                    {workflow.path}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section id="process" aria-labelledby="process-title" className="border-t border-line py-20 lg:py-28">
        <div className="container-page">
          <SectionHeader
            id="process-title"
            eyebrow="How we work"
            title="A clear path from first call to handover."
            intro="The same four stages for both services, so you always know what's happening, what comes next and what you'll get."
          />
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {processSteps.map((step, index) => (
              <li key={step.title} className="relative flex flex-col items-start">
                {index < processSteps.length - 1 ? (
                  <span aria-hidden="true" className="absolute top-5 left-14 -right-4 hidden h-px bg-line-strong lg:block" />
                ) : null}
                <span className="relative flex size-10 items-center justify-center rounded-full border border-line-strong bg-surface font-mono text-sm text-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.015em] text-ink">{step.title}</h3>
                <p className="mt-2 mb-5 leading-relaxed text-ink-2">{step.description}</p>
                <p className="mt-auto inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink">
                  <Check className="size-3.5 text-ok" aria-hidden="true" />
                  <span className="sr-only">You get: </span>
                  {step.outcome}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Principles */}
      <section aria-labelledby="principles-title" className="border-t border-line bg-surface py-20 lg:py-28">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeader id="principles-title" eyebrow="What you can count on" title="Built to keep working after we leave." />
          </div>
          <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8">
            {principles.map((principle) => {
              const Icon = principle.icon;
              return (
                <li key={principle.title}>
                  <span className="flex size-10 items-center justify-center rounded-xl border border-line bg-bg text-ink">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em] text-ink">{principle.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-2">{principle.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="border-t border-line py-20 lg:py-28">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeader id="faq-title" eyebrow="FAQ" title="Questions we hear a lot." />
            <p className="mt-5 leading-relaxed text-ink-2">
              Something else on your mind?{" "}
              <a href="#contact" className="font-medium text-ink underline underline-offset-4">
                Ask us directly
              </a>
              .
            </p>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
