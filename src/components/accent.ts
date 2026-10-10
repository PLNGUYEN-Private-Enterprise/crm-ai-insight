import type { Accent } from "@/content/services";

/** Static class lists per service accent (Tailwind needs literal class names). */
export const accentClasses: Record<Accent, { text: string; soft: string; border: string; dot: string }> = {
  sf: { text: "text-sf", soft: "bg-sf-soft", border: "border-sf-line", dot: "bg-sf" },
  ai: { text: "text-ai", soft: "bg-ai-soft", border: "border-ai-line", dot: "bg-ai" },
};
