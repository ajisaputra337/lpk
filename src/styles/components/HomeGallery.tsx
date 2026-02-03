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
    title_jp?: string;
    created_at?: string;
}

export default function HomeGallery() {
    const t = useTranslations("HomePage");
    const tg = useTranslations("Gallery.card");
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
                    console.error("Supabase error (expanded):", JSON.stringify(error, null, 2));
                    console.error("Supabase error message:", error.message);
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
                    <p className="text-gray-500 font-bold">Memuat Galeri...</p>
                </div>
            </div>
        );
    }

    // Silent hide if no items and not loading
    if (items.length === 0 && !loading) return null;

    return (
        <section className="relative overflow-hidden bg-white py-20">
            <div className="relative mx-auto max-w-7xl px-6">
                {/* Header Section - Matching Success Story Style */}
                <div className="mb-12 flex flex-col items-center">
                    <h2 className="mb-2 text-center text-3xl font-bold text-gray-800">
                        {locale === "jp" ? "私たちのギャラリー" : locale === "en" ? "Our Gallery" : "Galeri Kami"}
                    </h2>
                    <p className="mb-6 text-center text-lg text-gray-600">
                        {t.rich("gallerySubtitle", {
                            red: (c) => <span className="text-red-500">{c}</span>
                        })}
                    </p>
                    <div className="h-1 w-20 rounded-full bg-red-700"></div>
                </div>

                {/* Gallery Grid - Landscape Layout */}
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {items.map((item) => {
                        const title = locale === "jp"
                            ? (item.title_jp || item.title)
                            : (item.title_id || item.title);

                        return (
                            <Link
                                key={item.id}
                                href={`/media/galeri/${item.id}`}
                                className="group relative cursor-pointer overflow-hidden rounded-xl border-2 border-transparent bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-xl"
                            >
                                <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                                    <Image
                                        src={item.image_url}
                                        alt={title || "Gallery"}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                    {/* Badge mimicking Success Story */}
                                    <div className="absolute bottom-2 left-2 rounded-full bg-red-600 px-2 py-0.5 text-[0.6rem] font-bold text-white shadow-md sm:px-3 sm:py-1 sm:text-xs">
                                        {title}
                                    </div>

                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Action Button - Matching Success Story Style */}
                <div className="mt-12 text-center">
                    <Link
                        href="/media/galeri"
                        className="inline-flex items-center rounded-full bg-red-600 px-8 py-3 text-sm font-bold text-white shadow-lg hover:bg-red-700 transition-colors"
                    >
                        {t("seeMore")}
                    </Link>
                </div>
            </div>
        </section>
    );
}
