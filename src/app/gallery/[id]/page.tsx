"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, Calendar, Camera } from "lucide-react";

export default function GalleryDetailPage() {
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      const { data: item, error } = await supabase
        .from("media_gallery")
        .select("*")
        .eq("id", params.id)
        .single();

      if (!error) setData(item);
      setLoading(false);
    };
    fetchDetail();
  }, [params.id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!data) return <div className="min-h-screen flex items-center justify-center">Data tidak ditemukan.</div>;

  return (
    <main className="pt-32 pb-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Tombol Back */}
        <Link href="/media/galeri" className="inline-flex items-center text-red-600 font-bold mb-6 hover:gap-2 transition-all">
          <ChevronLeft className="h-5 w-5" /> Kembali ke Galeri
        </Link>

        {/* Gambar Utama */}
        <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl mb-8">
          <Image src={data.image_url} alt={data.title} fill className="object-cover" />
        </div>

        {/* Konten */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(data.created_at).toLocaleDateString('id-ID')}</span>
            <span className="flex items-center gap-1"><Camera className="h-4 w-4" /> Liputan Kegiatan</span>
          </div>
          
          <h1 className="text-4xl font-black text-slate-900 leading-tight">
            {data.title}
          </h1>

          <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
            {/* Supaya baris baru di textarea terbaca, kita pakai style white-space */}
<p style={{ whiteSpace: 'pre-line' }}>
  {data.description || "Tidak ada deskripsi tambahan untuk kegiatan ini."}
</p>          </div>
        </div>
      </div>
    </main>
  );
}