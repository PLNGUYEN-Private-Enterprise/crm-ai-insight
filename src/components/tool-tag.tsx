import { Cloud, Sparkles, Workflow } from "lucide-react";
import type { Tool } from "@/content/home";

const tags = {
  salesforce: { label: "Salesforce", icon: Cloud, className: "border-sf-line bg-sf-soft text-sf" },
  n8n: { label: "n8n", icon: Workflow, className: "border-ai-line bg-ai-soft text-ai" },
  ai: { label: "AI", icon: Sparkles, className: "border-ai-line bg-ai-soft text-ai" },
} as const;

export function ToolTag({ tool }: { tool: Tool }) {
  const { label, icon: Icon, className } = tags[tool];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${className}`}>
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}
