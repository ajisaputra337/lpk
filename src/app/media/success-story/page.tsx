"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import SuccessStoryCard from "../../../styles/components/SuccessStoryCard";
import { Loader2, Plus, Filter } from "lucide-react";

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

type SortOption = "default" | "batch-desc" | "batch-asc" | "name-az" | "name-za";

export default function SuccessStoryPage() {
  const [alumniData, setAlumniData] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("default");

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

  const getSortedData = () => {
    const sorted = [...alumniData];
    switch (sortBy) {
      case "default":
        return sorted; // Original fetch order (angkatan DESC)
      case "batch-desc":
        return sorted.sort((a, b) => b.angkatan - a.angkatan);
      case "batch-asc":
        return sorted.sort((a, b) => a.angkatan - b.angkatan);
      case "name-az":
        return sorted.sort((a, b) => (a.nama || "").localeCompare(b.nama || ""));
      case "name-za":
        return sorted.sort((a, b) => (b.nama || "").localeCompare(a.nama || ""));
      default:
        return sorted;
    }
  };

  const currentData = getSortedData().slice(0, visibleCount);

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-red-600" />
        <p className="font-bold tracking-widest text-slate-400 uppercase">
          Memuat Kisah Sukses...
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 py-20 font-sans">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-block rounded-full bg-red-100 px-4 py-1 text-[10px] font-black tracking-[0.2em] text-red-600 uppercase">
            Hall of Fame
          </div>
          <h1 className="mb-4 text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
            Kisah Sukses <span className="text-red-600">Alumni</span>
          </h1>
          <p className="font-medium italic text-slate-500">
            Total {alumniData.length} siswa telah sukses berkarir di Jepang
          </p>
        </div>

        {/* Sort Controls */}
        <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="group flex items-center gap-3 rounded-2xl border-2 border-slate-100 bg-white px-5 py-2.5 text-slate-600 shadow-sm transition-all hover:border-red-200 hover:shadow-md">
            <Filter size={18} className="text-red-500 transition-colors group-hover:text-red-600" />
            <div className="h-4 w-px bg-slate-200"></div>
            <label htmlFor="sort" className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
              Urutkan
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="cursor-pointer bg-transparent text-sm font-bold text-slate-800 outline-none"
            >
              <option value="default">Default</option>
              <option value="batch-desc">Angkatan (Terbaru)</option>
              <option value="batch-asc">Angkatan (Terkecil)</option>
              <option value="name-az">Nama (A - Z)</option>
              <option value="name-za">Nama (Z - A)</option>
            </select>
          </div>
        </div>

        {/* Cards Grid - Responsif banget */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
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
              className="group flex items-center gap-3 rounded-2xl bg-slate-900 px-8 py-4 text-sm font-black text-white shadow-xl transition-all active:scale-95 hover:bg-red-600 disabled:opacity-50"
            >
              {loadingMore ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
                  LIHAT ALUMNI LAINNYA
                </>
              )}
            </button>
          ) : (
            <div className="text-center">
              <div className="mx-auto mb-4 h-px w-20 bg-slate-200"></div>
              <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                Semua alumni telah ditampilkan
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
