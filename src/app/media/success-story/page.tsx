"use client";

import { useState, useEffect } from "react";
// import { alumni } from "../../../data/alumni"; // 1. Matikan import ini nanti kalau sudah fix
import { supabase } from "../../../lib/supabase"; // 2. Import jembatan supabase
import SuccessStoryCard from "../../../styles/components/SuccessStoryCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Definisikan tipe data sesuai database
interface Alumni {
  id: number;
  nama: string;
  angkatan: string;
  tanggalLahir: string;
  alamat: string;
  job: string;
  perusahaan: string;
  img?: string;
}

export default function SuccessStoryPage() {
  const [alumniData, setAlumniData] = useState<Alumni[]>([]); // Simpan data dari DB
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(32);

  // FUNGSI AMBIL DATA DARI SUPABASE
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("success_story") // Nama tabel kamu
        .select("*")
        .order("id", { ascending: false }); // Biar yang terbaru di atas

      if (error) {
        console.error("Gagal ambil data:", error.message);
      } else {
        setAlumniData(data || []);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Handle Resize tetap sama
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(8);
      } else {
        setItemsPerPage(32);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3. Ubah kalkulasi pagination dari 'alumni' ke 'alumniData'
  const totalPages = Math.ceil(alumniData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = alumniData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) return <div className="py-20 text-center">Memuat kisah sukses...</div>;

  return (
    <main className="min-h-screen bg-white px-6 py-20 font-sans">
      <div className="mx-auto max-w-[1400px]">
        {/* Header Tetap Sama */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-block rounded-full bg-red-100 px-4 py-1 text-xs font-bold tracking-widest text-red-600 uppercase">
            Hall of Fame
          </div>
          <h1 className="mb-6 text-4xl font-black text-slate-900 md:text-5xl">
            Kisah Sukses Alumni
          </h1>
        </div>

        {/* Cards Grid - Data diambil dari currentData (hasil fetch) */}
        <div className="mx-auto grid grid-cols-4 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
          {currentData.map((person) => (
            <SuccessStoryCard
              key={person.id}
              name={person.nama}
              angkatan={person.angkatan}
              tanggalLahir={person.tanggalLahir}
              alamat={person.alamat}
              job={person.job}
              perusahaan={person.perusahaan}
              img={person.img}
            />
          ))}
        </div>

        {/* Pagination & CTA Tetap Sama */}
        {/* ... (kode pagination kamu di bawahnya) ... */}
      </div>
    </main>
  );
}