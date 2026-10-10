import type { CSSProperties } from "react";
import { Check, Cloud, MessageSquare, Sparkles, Webhook, Workflow, type LucideIcon } from "lucide-react";

type Step = {
  icon: LucideIcon;
  tool: "trigger" | "n8n" | "ai" | "salesforce";
  label: string;
  title: string;
  detail: string;
  time: string;
};

const steps: Step[] = [
  { icon: Webhook, tool: "trigger", label: "Trigger", title: "New demo request", detail: "Website form", time: "0.00s" },
  { icon: Workflow, tool: "n8n", label: "n8n", title: "Enrich & de-duplicate", detail: "Company size, region, existing account", time: "0.41s" },
  { icon: Sparkles, tool: "ai", label: "AI", title: "Qualify & summarize", detail: "Fit score 82 · intent: pricing", time: "1.18s" },
  { icon: Cloud, tool: "salesforce", label: "Salesforce", title: "Create Lead & assign owner", detail: "Routed to the West region team", time: "1.62s" },
  { icon: MessageSquare, tool: "n8n", label: "n8n", title: "Notify the rep", detail: "Posted with the AI summary", time: "1.70s" },
];

const toolStyles: Record<Step["tool"], string> = {
  trigger: "bg-surface-2 text-ink-2 border-line-strong",
  n8n: "bg-ai-soft text-ai border-ai-line",
  ai: "bg-ai-soft text-ai border-ai-line",
  salesforce: "bg-sf-soft text-sf border-sf-line",
};

const STEP_DELAY = 0.35;

function delay(seconds: number) {
  return { "--delay": `${seconds}s` } as CSSProperties;
}

/** Illustrative execution log for the hero: one lead moving through n8n, AI and Salesforce. */
export function FlowRun() {
  return (
    <figure className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2.5rem] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(40% 50% at 20% 30%, var(--sf-soft), transparent 70%), radial-gradient(45% 55% at 85% 75%, var(--ai-soft), transparent 70%)",
        }}
      />
      <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-float">
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-line-strong" />
              <span className="size-2.5 rounded-full bg-line-strong" />
              <span className="size-2.5 rounded-full bg-line-strong" />
            </span>
            <span className="truncate font-mono text-xs text-muted">inbound-lead.workflow</span>
          </div>
          <span
            className="animate-pop inline-flex items-center gap-1 rounded-full bg-ok-soft px-2.5 py-1 text-xs font-medium text-ok"
            style={delay(0.3 + steps.length * STEP_DELAY)}
          >
            <Check className="size-3.5" aria-hidden="true" />
            Succeeded
          </span>
        </div>

        <ol className="px-5 pt-5 pb-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            return (
              <li
                key={step.title}
                className="animate-step relative flex gap-4 pb-5"
                style={delay(0.3 + index * STEP_DELAY)}
              >
                {!isLast ? (
                  <span
                    aria-hidden="true"
                    className="animate-grow absolute top-10 bottom-0 left-[1.1875rem] w-px bg-line-strong"
                    style={delay(0.3 + (index + 0.6) * STEP_DELAY)}
                  />
                ) : null}
                <span
                  className={`relative flex size-10 shrink-0 items-center justify-center rounded-xl border ${toolStyles[step.tool]}`}
                >
                  <Icon className="size-[1.125rem]" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="truncate text-sm font-medium text-ink">
                      <span className="sr-only">{step.label}: </span>
                      {step.title}
                    </p>
                    <span className="shrink-0 font-mono text-xs tabular-nums text-muted">{step.time}</span>
                  </div>
                  <p className="mt-0.5 truncate text-[0.8125rem] text-muted">
                    <span className="font-mono text-[0.6875rem] font-medium tracking-wide" aria-hidden="true">
                      {step.label}
                    </span>
                    <span aria-hidden="true"> · </span>
                    {step.detail}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="flex items-center justify-between gap-4 border-t border-line bg-surface-2 px-5 py-3.5 font-mono text-xs text-muted">
          <span>5 steps · 0 manual entries</span>
          <span className="tabular-nums">1.70s total</span>
        </div>
      </div>
      <figcaption className="mt-3 text-center font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
        Example run · lead capture to CRM
      </figcaption>
    </figure>
  );
}
