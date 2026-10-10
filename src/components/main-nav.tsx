"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation, site } from "@/content/site";

function isCurrent(pathname: string, href: string) {
  return !href.includes("#") && pathname === href;
}

export function DesktopNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="hidden md:block">
      <ul className="flex items-center gap-1">
        {navigation.map((item) => {
          const current = isCurrent(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`rounded-full px-3.5 py-2 text-sm transition-colors hover:bg-surface-2 hover:text-ink ${
                  current ? "bg-surface-2 font-medium text-ink" : "text-ink-2"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong bg-surface text-ink"
      >
        {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-bg shadow-float"
      >
        <nav aria-label="Mobile" className="container-page py-4">
          <ul className="divide-y divide-line">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                  className="flex min-h-12 items-center text-base font-medium text-ink aria-[current=page]:text-sf"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={site.cta.href}
            onClick={() => setOpen(false)}
            {...(site.cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="mt-4 flex min-h-12 items-center justify-center rounded-full bg-ink text-sm font-medium text-bg"
          >
            {site.cta.label}
          </a>
        </nav>
      </div>
    </div>
  );
}
