"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "../../i18n/routing";
import { supabase } from "../../lib/supabase";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

interface GalleryItem {
    id: string;
    image_url: string;
    title: string;
    title_id?: string;
    title_en?: string;
    title_jp?: string;
    created_at?: string;
}

export default function HomeGallery() {
    const t = useTranslations("HomePage");
    const params = useParams();
    const locale = params.locale as string;
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const { data, error } = await supabase
                    .from("media_gallery")
                    .select("*")
                    .order("created_at", { ascending: false })
                    .limit(4);

                if (error) {
                    console.error("Supabase error:", error.message);
                } else if (data) {
                    setItems(data);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20 bg-white">
                <div className="flex flex-col items-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-700 border-t-transparent mb-4"></div>
                </div>
            </div>
        );
    }

    if (items.length === 0 && !loading) return null;

    return (
        <section className="relative overflow-hidden bg-white py-20">
            <div className="relative mx-auto max-w-7xl px-6">
                {/* Header Section */}
                <div className="mb-12 flex flex-col items-center">
                    <h2 className="mb-2 text-center text-3xl font-bold text-gray-800">
                        {t("galleryTitle")}
                    </h2>
                    <p className="mb-6 text-center text-lg text-gray-600">
                        {t.rich("gallerySubtitle", {
                            red: (c) => <span className="text-red-600">{c}</span>
                        })}
                    </p>
                    <div className="h-1 w-20 rounded-full bg-red-700"></div>
                </div>

                {/* Gallery Grid - Card Layout */}
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {items.map((item) => {
                        const title = locale === "jp"
                            ? (item.title_jp || item.title)
                            : locale === "en"
                                ? (item.title_en || item.title)
                                : (item.title_id || item.title);

                        return (
                            <Link
                                key={item.id}
                                href={`/media/galeri/${item.id}`}
                                className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                                    <Image
                                        src={item.image_url}
                                        alt={title || "Gallery"}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-red-900 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                                </div>

                                <div className="flex flex-1 flex-col p-4">
                                    <h3 className="text-sm font-bold text-slate-800 line-clamp-2 min-h-[40px] leading-tight group-hover:text-red-700 transition-colors">
                                        {title}
                                    </h3>
                                    <div className="mt-3 flex items-center justify-between border-t border-slate-50 pt-3">
                                        <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                            {new Date(item.created_at || "").toLocaleDateString(locale === 'jp' ? 'ja-JP' : 'id-ID', {
                                                day: 'numeric',
                                                month: 'short'
                                            })}
                                        </span>
                                        <div className="h-1.5 w-1.5 rounded-full bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Action Button */}
                <div className="mt-12 text-center">
                    <Link
                        href="/media/galeri"
                        className="inline-flex items-center rounded-full bg-red-600 px-8 py-3 text-sm font-black text-white shadow-xl transition-all active:scale-95 hover:bg-red-700 hover:shadow-red-200"
                    >
                        {t("seeMore")}
                    </Link>
                </div>
            </div>
        </section>
    );
}
