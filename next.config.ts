import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  poweredByHeader: false,
};

export default function config(phase: string): NextConfig {
  if (phase === PHASE_PRODUCTION_BUILD && !process.env.NEXT_PUBLIC_SITE_URL) {
    console.warn(
      "\n⚠ NEXT_PUBLIC_SITE_URL is not set: canonical, Open Graph and sitemap URLs will point to http://localhost:3000.\n",
    );
  }
  return nextConfig;
}

// Exposes Cloudflare bindings to `next dev`.
initOpenNextCloudflareForDev();
