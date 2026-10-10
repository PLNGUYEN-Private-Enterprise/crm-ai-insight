import { Plus } from "lucide-react";

export function FaqList({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-left text-base font-medium text-ink sm:text-lg [&::-webkit-details-marker]:hidden">
            {item.question}
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink-2 transition-transform duration-200 group-open:rotate-45">
              <Plus className="size-4" aria-hidden="true" />
            </span>
          </summary>
          <p className="pr-4 pb-6 leading-relaxed text-ink-2 sm:pr-14">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
