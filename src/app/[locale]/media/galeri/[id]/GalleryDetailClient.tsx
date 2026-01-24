"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../../../lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, Calendar, Camera } from "lucide-react";
import { useTranslations } from "next-intl";

// Props yang diterima dari Server Component
interface GalleryDetailClientProps {
    initialData?: any; // Data awal (opsional) jika mau SSR penuh nanti
}

export default function GalleryDetailPageClient({ initialData }: GalleryDetailClientProps) {
    const params = useParams();
    const locale = params.locale as string;
    const t = useTranslations("GalleryDetail");

    const [data, setData] = useState<any>(initialData || null);
    const [loading, setLoading] = useState(!initialData);

    useEffect(() => {
        if (initialData) return; // Jika data sudah ada (dari server?), skip fetch

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
    }, [params.id, initialData]);

    if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-400">{t('loading')}</div>;
    if (!data) return <div className="min-h-screen flex items-center justify-center font-bold text-red-600">{t('notFound')}</div>;

    return (
        <main className="pt-24 md:pt-32 pb-20 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                {/* Tombol Back - Teks dari JSON, Link tetap di locale yang sama */}
                <Link href={`/${locale}/media/galeri`} className="inline-flex items-center text-red-600 font-bold mb-6 hover:gap-2 transition-all">
                    <ChevronLeft className="h-5 w-5" /> {t('back')}
                </Link>

                {/* Gambar Utama */}
                <div className="relative aspect-[3/2] md:aspect-video w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl mb-8">
                    <Image src={data.image_url} alt={data.title} fill className="object-cover object-center" priority />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-4 text-gray-400 text-sm">
                        <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {/* Format tanggal otomatis menyesuaikan negara */}
                            {new Date(data.created_at).toLocaleDateString(locale === 'jp' ? 'ja-JP' : 'id-ID')}
                        </span>
                        <span className="flex items-center gap-1">
                            <Camera className="h-4 w-4" /> {t('category')}
                        </span>
                    </div>

                    {/* Judul */}
                    <h1 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">
                        {locale === 'jp' ? (data.title_jp || data.title_id) : (data.title_id || data.title)}
                    </h1>

                    {/* Deskripsi */}
                    <div className="prose prose-base md:prose-lg max-w-none text-slate-700 leading-relaxed">
                        <p style={{ whiteSpace: 'pre-line' }}>
                            {locale === 'jp'
                                ? (data.description_jp || data.description_id || t('noDescription'))
                                : (data.description_id || data.description || t('noDescription'))
                            }
                        </p>
                    </div>                </div>
            </div>
        </main>
    );
}
