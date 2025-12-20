import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.lpk-aishiro.com";

  return {
    rules: {
      userAgent: "*",

      allow: "/",

      disallow: "/admin-aishro/",
    },

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
