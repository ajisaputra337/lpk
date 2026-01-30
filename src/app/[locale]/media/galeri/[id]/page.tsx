import { supabase } from "../../../../../lib/supabase";
import { env } from "~/env";
import GalleryDetailPageClient from "./GalleryDetailClient";

// 1. METADATA DINAMIS untuk detail galeri
// Next.js akan memanggil ini di server sebelum render halaman
export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params;

  // Fetch data galeri langsung dari Supabase di server side
  const { data: item } = await supabase
    .from("media_gallery")
    .select("*")
    .eq("id", id)
    .single();

  if (!item) {
    return {
      title: "Galeri",
    };
  }

  // Pilih judul/deskripsi sesuai bahasa (Sama dengan logic di client)
  const title = locale === "jp"
    ? (item.title_jp || item.title_id || item.title)
    : (item.title_id || item.title);

  const description = locale === "jp"
    ? (item.description_jp || item.description_id || item.description)
    : (item.description_id || item.description);

  const baseUrl = env.NEXT_PUBLIC_BASE_URL;
  const pageUrl = `${baseUrl}/${locale}/media/galeri/${id}`;

  return {
    title: title,
    description: description?.substring(0, 160),
    openGraph: {
      title: title,
      description: description,
      images: [item.image_url],
      url: pageUrl,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [item.image_url],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'id': `${baseUrl}/id/media/galeri/${id}`,
        'en': `${baseUrl}/en/media/galeri/${id}`,
        'ja': `${baseUrl}/jp/media/galeri/${id}`,
      },
    },
  };
}

// 2. Server Component Wrapper
export default function GalleryDetailPage() {
  // Kita fetch data di client untuk render kontennya (sesuai implementasi sebelumnya)
  // Atau idealnya bisa fetch di sini dan pass sebagai prop "initialData" ke Client Component
  // Untuk sekarang kita biarkan client component melakukan fetch ulang agar konsisten dengan logic yang ada

  return <GalleryDetailPageClient />;
}