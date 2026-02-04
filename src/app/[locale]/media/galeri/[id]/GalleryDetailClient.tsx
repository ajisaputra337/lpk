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

    // Fungsi untuk decode HTML Entities (biar gak muncul tag mentah kalo kena escape)
    const decodeHtml = (html: string) => {
        if (!html) return "";
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };

    let content = locale === 'jp'
        ? (data.description_jp || data.description)
        : locale === 'en'
            ? (data.description_en || data.description)
            : (data.description || "");

    // Jika konten mengandung &lt; (artinya kena escape), kita decode
    if (content.includes("&lt;") || content.includes("&gt;")) {
        content = decodeHtml(content);
    }

    const title = locale === 'jp'
        ? (data.title_jp || data.title)
        : locale === 'en'
            ? (data.title_en || data.title)
            : (data.title || "");

    return (
        <main className="pt-24 md:pt-32 pb-20 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                {/* Tombol Back */}
                <Link href={`/${locale}/media/galeri`} className="inline-flex items-center text-red-600 font-bold mb-6 hover:gap-2 transition-all">
                    <ChevronLeft className="h-5 w-5" /> {t('back')}
                </Link>

                {/* Gambar Utama */}
                <div className="relative aspect-[3/2] md:aspect-video w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl mb-8">
                    <Image src={data.image_url} alt={data.title} fill className="object-cover object-center" priority />
                </div>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
                        <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(data.created_at).toLocaleDateString(locale === 'jp' ? 'ja-JP' : 'id-ID')}
                        </span>

                        {/* Tag Badges */}
                        {data.tags && data.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {data.tags.map((tag: string, idx: number) => (
                                    <span
                                        key={idx}
                                        className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-black rounded-full uppercase tracking-widest border border-red-100"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Judul */}
                    <h1 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">
                        {title}
                    </h1>

                    {/* Deskripsi (Konten Rich Text) */}
                    <div className="prose prose-base md:prose-lg max-w-none text-slate-700 leading-relaxed quill-content mt-8">
                        <div
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .quill-content img {
                    max-width: 100%;
                    height: auto !important;
                    border-radius: 1.5rem;
                    margin: 2rem auto;
                    display: block;
                    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
                }
                .quill-content p {
                    margin-bottom: 1.5rem;
                }
                .quill-content h1, .quill-content h2, .quill-content h3 {
                    font-weight: 800;
                    color: #0f172a;
                    margin-top: 2.5rem;
                    margin-bottom: 1rem;
                }
                .quill-content ul, .quill-content ol {
                    margin-bottom: 1.5rem;
                    padding-left: 1.5rem;
                }
                .quill-content li {
                    margin-bottom: 0.5rem;
                }
                .quill-content a {
                    color: #dc2626;
                    text-decoration: underline;
                    font-weight: 700;
                    transition: all 0.2s;
                }
                .quill-content a:hover {
                    color: #991b1b;
                    text-decoration: none;
                }
            `}</style>
        </main>
    );
}
