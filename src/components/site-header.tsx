import { site } from "@/content/site";
import { ButtonLink } from "./button-link";
import { Logo } from "./logo";
import { DesktopNav, MobileNav } from "./main-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="container-page relative flex h-16 items-center justify-between gap-6">
        <Logo />
        <DesktopNav />
        <div className="flex items-center gap-2">
          <div className="max-[359px]:hidden">
            <ButtonLink href={site.cta.href} external={site.cta.external}>
              Book a call
            </ButtonLink>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
