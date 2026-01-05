"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import SuccessStoryCard from "../../../styles/components/SuccessStoryCard";
import { Loader2, Plus } from "lucide-react";

interface Alumni {
  id: number;
  nama: string;
  angkatan: number;
  tanggalBerangkat: string;
  alamat: string;
  job: string;
  lokasi_perusahaan: string;
  img?: string;
}

export default function SuccessStoryPage() {
  const [alumniData, setAlumniData] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Kita mulai dengan nampilin 24 data (3 baris di grid 8)
  const [visibleCount, setVisibleCount] = useState(24);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("success_story")
        .select("*")
        .order("angkatan", { ascending: false });

      if (error) {
        console.error("Gagal ambil data:", error.message);
      } else {
        if (data) {
          setAlumniData(
            data.map((item: any) => ({
              ...item,
              tanggalBerangkat: item.tanggalLahir,
            }))
          );
        } else {
          setAlumniData([]);
        }
      }
      setLoading(false);
    };

    fetchData().catch((e) => console.error(e));
  }, []);

  const handleLoadMore = () => {
    setLoadingMore(true);
    // Simulasi delay dikit biar smooth pas loading
    setTimeout(() => {
      setVisibleCount((prev) => prev + 24); // Tambah 24 data lagi
      setLoadingMore(false);
    }, 500);
  };

  const currentData = alumniData.slice(0, visibleCount);

  if (loading) {
    return (
      <div className="py-40 text-center flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-red-600 w-10 h-10" />
        <p className="font-bold text-slate-400 uppercase tracking-widest">Memuat Kisah Sukses...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 py-20 font-sans">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-red-100 px-4 py-1 text-[10px] font-black tracking-[0.2em] text-red-600 uppercase">
            Hall of Fame
          </div>
          <h1 className="mb-4 text-4xl font-black text-slate-900 md:text-6xl tracking-tight">
            Kisah Sukses <span className="text-red-600">Alumni</span>
          </h1>
          <p className="text-slate-500 font-medium italic">
            Total {alumniData.length} siswa telah sukses berkarir di Jepang
          </p>
        </div>

        {/* Cards Grid - Responsif banget */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
          {currentData.map((person) => (
            <SuccessStoryCard
              key={person.id}
              name={person.nama}
              angkatan={person.angkatan}
              tanggalBerangkat={person.tanggalBerangkat}
              alamat={person.alamat}
              job={person.job}
              lokasi_perusahaan={person.lokasi_perusahaan}
              img={person.img}
            />
          ))}
        </div>

        {/* Tombol Load More / Status */}
        <div className="mt-20 flex flex-col items-center">
          {visibleCount < alumniData.length ? (
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="group flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-red-600 transition-all shadow-xl active:scale-95 disabled:opacity-50"
            >
              {loadingMore ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <>
                  <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform" />
                  LIHAT ALUMNI LAINNYA
                </>
              )}
            </button>
          ) : (
            <div className="text-center">
              <div className="h-px w-20 bg-slate-200 mx-auto mb-4"></div>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                Semua alumni telah ditampilkan
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}