"use client";
import Link from "next/link";
import { Camera } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase"; 

// --- INTERFACE (DITAMBAH DESCRIPTION) ---
interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  description: string; // Tambahin ini biar gak merah
  created_at: string;
}

const GalleryCard: React.FC<{ item: GalleryItem }> = ({ item }) => {
  return (
    // BUNGKUS DENGAN LINK KE DYNAMIC ROUTE [id]
    <Link href={`/gallery/${item.id}`}>
      <div className="group relative cursor-pointer transform overflow-hidden rounded-lg border-2 border-red-100 bg-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
        <div className="relative h-64 w-full bg-gray-200 overflow-hidden">
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-red-900 opacity-10 transition-opacity group-hover:opacity-0"></div>
        </div>
        
        <div className="p-5 bg-white">
          <div className="mb-2 flex items-center">
            <span className="mr-2 rounded-full bg-red-700 p-1.5 shrink-0">
              <Camera className="h-4 w-4 text-white" />
            </span>
            <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{item.title}</h3>
          </div>
          
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-3">
            {item.description || "Dokumentasi kegiatan pelatihan LPK Aishiro Gakuen."}
          </p>

          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
              {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded">DETAIL</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const GalleryPage: React.FC = () => {
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
    <main className="pt-20">
      <section className="relative overflow-hidden bg-gray-900 py-16 text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 0 L50 25 L75 0 L100 25 L50 75 L0 25 L25 0 z' fill='none' stroke='%23ff0000' stroke-width='1.5' /%3E%3C/svg%3E")`,
            backgroundSize: "150px 150px",
          }}
        ></div>

        <div className="relative z-20 mx-auto max-w-7xl px-6 text-center">
          <h1 className="mb-4 inline-block border-b-4 border-red-700/50 px-4 pb-2 text-4xl font-extrabold md:text-5xl">
            Galeri Aishiro Gakuen
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Klik foto untuk melihat detail kegiatan dan cerita lengkapnya.
          </p>
        </div>
      </section>

      <section className="relative min-h-[400px] bg-gray-50 py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-700 border-t-transparent"></div>
            </div>
          ) : galleryItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {galleryItems.map((item) => (
                <GalleryCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400">Belum ada foto kegiatan.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default GalleryPage;