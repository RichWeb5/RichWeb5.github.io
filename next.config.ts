import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // GitHub Pages serves plain files, so the site is prerendered to /out.
  output: "export",
  // The image optimizer needs a Node server, which Pages does not provide.
  images: { unoptimized: true },
  // Pages serves /path/ rather than /path, so emit directory-style URLs.
  trailingSlash: true,
};

export default nextConfig;
