"use client";

import Link from "next/link";
import { Camera } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabase";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

interface GalleryItem {
    id: string;
    title: string;          // Generic title (usually ID)
    title_id?: string;      // Explicit ID title
    title_jp?: string;      // Explicit JP title
    image_url: string;
    description: string;    // Generic description
    description_id?: string;// Explicit ID description
    description_jp?: string;// Explicit JP description
    created_at: string;
}

const GalleryCard: React.FC<{ item: GalleryItem; locale: string }> = ({ item, locale }) => {
    const t = useTranslations("Gallery.card");

    // FALLBACK LOGIC:
    // 1. Coba ambil text sesuai locale (title_jp / title_id)
    // 2. Jika tidak ada, ambil text generic (title)
    // 3. Jika title_id/description_id kosong, tetap fallback ke title/description biasa
    const title = locale === "jp"
        ? (item.title_jp || item.title)
        : (item.title_id || item.title);

    const description = locale === "jp"
        ? (item.description_jp || item.description)
        : (item.description_id || item.description);

    return (
        <Link href={`/${locale}/media/galeri/${item.id}`}>
            <div className="group relative cursor-pointer transform overflow-hidden rounded-lg border-2 border-red-100 bg-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                <div className="relative aspect-video w-full bg-gray-200 overflow-hidden">
                    <Image
                        src={item.image_url}
                        alt={title || "Gallery Image"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-red-900 opacity-10 transition-opacity group-hover:opacity-0"></div>
                </div>

                <div className="p-5 bg-white">
                    <div className="mb-2 flex items-center">
                        <span className="mr-2 rounded-full bg-red-700 p-1.5 shrink-0">
                            <Camera className="h-4 w-4 text-white" />
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{title}</h3>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-3">
                        {description || t('defaultDesc')}
                    </p>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                        <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                            {new Date(item.created_at).toLocaleDateString(locale === 'jp' ? 'ja-JP' : 'id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </p>
                        <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
                            {t('detailBtn')}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default function GalleryPageClient() {
    const t = useTranslations("Gallery");
    const params = useParams();
    const locale = params.locale as string;

    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            const { data, error } = await supabase
                .from("media_gallery")
                .select("*")
                .order("created_at", { ascending: false });

            if (!error && data) {
                setGalleryItems(data);
            }
            setLoading(false);
        };

        fetchGallery();
    }, []);

    return (
        <main className="">
            {/* Header Section */}
            <section className="relative overflow-hidden bg-gray-900 pt-24 md:pt-32 pb-16 text-white">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 0 L50 25 L75 0 L100 25 L50 75 L0 25 L25 0 z' fill='none' stroke='%23ff0000' stroke-width='1.5' /%3E%3C/svg%3E")`,
                        backgroundSize: "150px 150px",
                        backgroundPosition: "center",
                    }}
                ></div>

                <div className="relative z-20 mx-auto max-w-7xl px-6 text-center">
                    <h1 className="mb-4 inline-block border-b-4 border-red-700/50 px-4 pb-2 text-4xl font-extrabold md:text-5xl">
                        {t('header.title')}
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
                        {t('header.subtitle')}
                    </p>
                </div>
            </section>

            {/* Gallery Grid Section */}
            <section className="relative min-h-[400px] bg-gray-50 py-20">
                <div className="relative z-10 mx-auto max-w-7xl px-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-700 border-t-transparent"></div>
                            <p className="mt-4 text-gray-500 font-bold">{t('status.loading')}</p>
                        </div>
                    ) : galleryItems.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {galleryItems.map((item) => (
                                <GalleryCard key={item.id} item={item} locale={locale} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-400">{t('status.empty')}</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}