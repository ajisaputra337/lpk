import type { MetadataRoute } from "next";
import { env } from "~/env";
import { supabase } from "../lib/supabase"; // Pastikan path import benar

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = env.NEXT_PUBLIC_BASE_URL;
  const locales = ["id", "jp", "en"];

  // 1. Rute Statis Utama
  const staticPages = [
    "",
    "/program/magang-jepang",
    "/program/sekolah-jepang",
    "/program/tokutei-ginou",
    "/profil/company-profile",
    "/profil/visi-misi",
    "/media/galeri",
    "/media/persyaratan",
    "/media/success-story",
    "/media/fisik-sore",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate rute statis untuk setiap bahasa
  locales.forEach((locale) => {
    staticPages.forEach((page) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "/media/galeri" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
      });
    });
  });

  // 2. Rute Dinamis (Data dari Supabase)
  try {
    const { data: galleryItems } = await supabase
      .from("media_gallery")
      .select("id, updated_at")
      .order("created_at", { ascending: false });

    if (galleryItems) {
      galleryItems.forEach((item) => {
        locales.forEach((locale) => {
          sitemapEntries.push({
            url: `${baseUrl}/${locale}/media/galeri/${item.id}`,
            lastModified: new Date(item.updated_at || new Date()),
            changeFrequency: "monthly",
            priority: 0.6,
          });
        });
      });
    }
  } catch (error) {
    console.error("Sitemap dynamic fetch error:", error);
  }

  return sitemapEntries;
}