import type { NextConfig } from "next";

// Old Lovable-site URLs that moved. Everything else kept its path.
const moved: [string, string][] = [
  ["/finance", "/financing"],
  ["/rebates/financing", "/financing"],
  ["/rebates/heat-pump-cost", "/rebates"],
  ["/rebates/every-dollar", "/rebates"],
  ["/free-estimate", "/book"],
  ["/contact", "/book"],
  ["/gallery", "/about#our-work"],
  ["/privacy-policy", "/privacy-policy.html"],
  ["/terms-and-conditions", "/terms-and-conditions.html"],
  ["/sms-opt-in", "/sms-opt-in.html"],
  ["/login", "/"],
  ["/email-signature", "/"],
];

const nextConfig: NextConfig = {
  async redirects() {
    return moved.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
