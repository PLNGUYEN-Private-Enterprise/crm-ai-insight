import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="container-page py-28 text-center sm:py-36">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted">Error 404</p>
      <h1
        id="not-found-title"
        className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl"
      >
        This page took a wrong turn.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-ink-2">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/#services" variant="secondary">
          See our services
        </ButtonLink>
      </div>
    </section>
  );
}
