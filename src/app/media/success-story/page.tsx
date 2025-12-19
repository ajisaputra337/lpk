"use client";

import { useState, useEffect } from "react";
import { alumni } from "../../../data/alumni";
import SuccessStoryCard from "../../../styles/components/SuccessStoryCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SuccessStoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(32);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(8);
      } else {
        setItemsPerPage(32);
      }
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(alumni.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = alumni.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-white px-6 py-20 font-sans">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-block rounded-full bg-red-100 px-4 py-1 text-xs font-bold tracking-widest text-red-600 uppercase">
            Hall of Fame
          </div>
          <h1 className="mb-6 text-4xl font-black text-slate-900 md:text-5xl">
            Kisah Sukses Alumni
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-500">
            Mereka yang berani bermimpi dan bekerja keras. Kini mereka telah
            bekerja di berbagai prefektur di Jepang.
          </p>
        </div>

        {/* Cards Grid (8 Columns) */}
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-all hover:border-red-600 hover:text-red-600 disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:text-slate-400"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-700">
                Page {currentPage} of {totalPages}
              </span>
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-all hover:border-red-600 hover:text-red-600 disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:text-slate-400"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* CTA Button */}
        <div className="mt-20 text-center">
          <button className="rounded-full bg-red-600 px-8 py-4 font-bold text-white shadow-lg shadow-red-600/30 transition-colors hover:bg-red-700">
            Gabung Bersama Mereka →
          </button>
        </div>
      </div>
    </main>
  );
}
