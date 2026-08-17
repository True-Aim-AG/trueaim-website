import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // NFC contact card: clean URL -> static file in /public. Path is intentionally
      // "contact-card" (not "contact", which is the localized contact page).
      { source: "/contact-card", destination: "/contact-card.html" },
    ];
  },
  async redirects() {
    return [
      // The DPA is no longer published on the website: it is a signed annex to the MSA.
      // Its Schedule 2 (the sub-processor list) is the only part that stays public, and
      // the DPA itself points at /sub-processors as the operative list.
      { source: "/dpa", destination: "/sub-processors", permanent: true },
      {
        source: "/:locale(de|fr|it)/dpa",
        destination: "/:locale/sub-processors",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/llms.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=86400",
          },
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
        ],
      },
      {
        source: "/llms-full.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=86400",
          },
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
