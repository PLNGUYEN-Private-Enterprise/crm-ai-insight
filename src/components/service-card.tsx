import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Service } from "@/content/services";
import { accentClasses } from "./accent";

export function ServiceCard({ service }: { service: Service }) {
  const accent = accentClasses[service.accent];
  const Icon = service.icon;

  return (
    <article className="group relative flex flex-col rounded-3xl border border-line bg-surface p-6 shadow-card transition-[box-shadow,translate] duration-300 hover:-translate-y-0.5 hover:shadow-float has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-sf sm:p-8">
      <div className="flex items-start justify-between">
        <span className={`flex size-12 items-center justify-center rounded-2xl ${accent.soft} ${accent.text}`}>
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <span className="font-mono text-xs text-muted">{service.number}</span>
      </div>

      <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-ink">
        <Link
          href={`/services/${service.slug}`}
          className="outline-hidden after:absolute after:inset-0 after:rounded-3xl after:content-['']"
        >
          {service.name}
        </Link>
      </h3>
      <p className={`mt-1.5 font-medium ${accent.text}`}>{service.tagline}</p>
      <p className="mt-4 leading-relaxed text-ink-2">{service.summary}</p>

      <ul className="mt-6 space-y-3">
        {service.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-3 text-sm text-ink">
            <Check className={`mt-0.5 size-4 shrink-0 ${accent.text}`} aria-hidden="true" />
            {highlight}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <p className="border-t border-line pt-5 text-sm text-muted">
          <span className="font-medium text-ink">Best for: </span>
          {service.bestFor}
        </p>
        <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink" aria-hidden="true">
          Explore {service.navLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </p>
      </div>
    </article>
  );
}
