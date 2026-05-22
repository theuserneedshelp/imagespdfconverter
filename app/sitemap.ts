import type { MetadataRoute } from "next";

const base = () =>
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const b = base();
  const paths = [
    "/",
    "/about",
    "/privacy-policy",
    "/terms",
    "/contact",
  ] as const;
  return paths.map((path) => ({
    url: `${b}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "/" ? 1 : 0.6,
  }));
}
