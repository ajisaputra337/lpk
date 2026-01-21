import { supabase } from "../../../../../lib/supabase";
import GalleryDetailPageClient from "./GalleryDetailClient";

// 1. METADATA DINAMIS untuk detail galeri
// Next.js akan memanggil ini di server sebelum render halaman
export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params;

  // Fetch data galeri langsung dari Supabase di server side
  const { data: item } = await supabase
    .from("media_gallery")
    .select("title_id, title_jp, description_id, description_jp, image_url")
    .eq("id", id)
    .single();

  if (!item) {
    return {
      title: "Galeri Tidak Ditemukan",
    };
  }

  // Pilih judul/deskripsi sesuai bahasa
  const title = locale === 'jp' && item.title_jp ? item.title_jp : item.title_id;
  const description = locale === 'jp' && item.description_jp ? item.description_jp : item.description_id;

  const baseUrl = "https://www.lpk-aishiro.com";

  return {
    title: title,
    description: description?.substring(0, 160), // Limit description length
    openGraph: {
      title: title,
      description: description,
      images: [item.image_url],
      url: `${baseUrl}/${locale}/gallery/${id}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [item.image_url],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/gallery/${id}`,
      languages: {
        'id': `${baseUrl}/id/gallery/${id}`,
        'en': `${baseUrl}/en/gallery/${id}`,
        'ja': `${baseUrl}/jp/gallery/${id}`,
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