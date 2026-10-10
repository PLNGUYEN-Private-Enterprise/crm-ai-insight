import type { ReactNode } from "react";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted ${className}`}>{children}</p>
  );
}

type SectionHeaderProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
};

/** Section heading block; `id` names the heading so sections can use aria-labelledby. */
export function SectionHeader({ id, eyebrow, title, intro, align = "left" }: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className="mt-4 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-ink sm:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </h2>
      {intro ? <p className="mt-5 text-lg leading-relaxed text-ink-2">{intro}</p> : null}
    </div>
  );
}
