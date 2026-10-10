import Link from "next/link";
import { site } from "@/content/site";

/** Two connected nodes: Salesforce (blue) linked to n8n & AI (coral). */
export function LogoMark({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true" className={className}>
      <rect x="2" y="14" width="11" height="11" rx="3.5" fill="var(--sf)" />
      <rect x="15" y="3" width="11" height="11" rx="3.5" fill="var(--ai)" />
      <path
        d="M13 19.5c3 0 1.5-11 2-11"
        stroke="var(--ink)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 rounded-lg" aria-label={`${site.name} home`}>
      <LogoMark />
      <span className="text-[1.05rem] font-semibold tracking-[-0.02em] text-ink">
        CRM AI <span className="font-medium text-muted">Insight</span>
      </span>
    </Link>
  );
}
