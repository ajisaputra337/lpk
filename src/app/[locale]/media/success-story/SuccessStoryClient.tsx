"use client";

import { useState, useEffect, useRef } from "react";
import SuccessStoryCard from "../../profil/ssc/SuccessStoryCard";
import { supabase } from "../../../../lib/supabase";
import { Loader2, Filter, ChevronDown, Check } from "lucide-react";
import { useTranslations } from "next-intl";

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

type SortOption = "batch-desc" | "batch-asc" | "name-az" | "name-za";

const ITEMS_PER_PAGE = 24;

export default function SuccessStoryClient() {
    const t = useTranslations("SuccessStoryPage");

    const [alumniData, setAlumniData] = useState<Alumni[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState<SortOption>("batch-desc");
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const sortOptions: { value: SortOption; label: string }[] = [
        { value: "batch-desc", label: t('filter.batchDesc') },
        { value: "batch-asc", label: t('filter.batchAsc') },
        { value: "name-az", label: t('filter.nameAZ') },
        { value: "name-za", label: t('filter.nameZA') },
    ];

    const currentLabel = sortOptions.find(opt => opt.value === sortBy)?.label;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("success_story")
                .select("*")
                .order("angkatan", { ascending: false });

            if (error) {
                console.error("Error fetching data:", error.message);
            } else if (data) {
                setAlumniData(
                    data.map((item: any) => ({
                        ...item,
                        tanggalBerangkat: item.tanggalBerangkat || item.tanggalLahir,
                    }))
                );
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const getSortedData = () => {
        const sorted = [...alumniData];
        switch (sortBy) {
            case "batch-desc": return sorted.sort((a, b) => b.angkatan - a.angkatan);
            case "batch-asc": return sorted.sort((a, b) => a.angkatan - b.angkatan);
            case "name-az": return sorted.sort((a, b) => (a.nama || "").localeCompare(b.nama || ""));
            case "name-za": return sorted.sort((a, b) => (b.nama || "").localeCompare(a.nama || ""));
            default: return sorted;
        }
    };

    const sortedData = getSortedData();
    const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
    const currentData = sortedData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSortChange = (value: SortOption) => {
        setSortBy(value);
        setCurrentPage(1); // reset ke halaman 1 saat sort berubah
        setIsOpen(false);
    };

    // Generate nomor halaman dengan ellipsis
    const getPageNumbers = () => {
        const pages: (number | "...")[] = [];
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        pages.push(1);
        if (currentPage > 4) pages.push("...");
        for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
            pages.push(i);
        }
        if (currentPage < totalPages - 3) pages.push("...");
        pages.push(totalPages);
        return pages;
    };

    if (loading) {
        return (
            <div className="flex h-screen flex-col items-center justify-center gap-4 bg-white">
                <Loader2 className="h-10 w-10 animate-spin text-red-600" />
                <p className="font-bold tracking-widest text-slate-400 uppercase">
                    {t('loading')}
                </p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white px-4 py-24 font-sans">
            <div className="mx-auto max-w-[1600px]">
                {/* Header */}
                <div className="mb-12 pt-10 text-center">
                    <h1 className="mb-4 text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
                        {t('header.title')} <span className="text-red-600">{t('header.subtitle')}</span>
                    </h1>
                    <p className="font-medium italic text-slate-500">
                        {t('header.totalDesc', { count: alumniData.length })}
                    </p>
                </div>

                {/* Sort Controls */}
                <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`group flex items-center gap-3 rounded-2xl border-2 bg-white px-5 py-2.5 text-slate-600 shadow-sm transition-all hover:shadow-md ${isOpen ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-100 hover:border-red-200'}`}
                        >
                            <Filter size={18} className={`transition-colors ${isOpen ? 'text-red-600' : 'text-red-500 group-hover:text-red-600'}`} />
                            <div className="h-4 w-px bg-slate-200"></div>
                            <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                {t('filter.label')}
                            </span>
                            <span className="min-w-[140px] text-left text-sm font-bold text-slate-800">
                                {currentLabel}
                            </span>
                            <ChevronDown
                                size={16}
                                className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                            />
                        </button>
                        {isOpen && (
                            <div className="absolute right-0 top-full z-50 mt-2 w-full min-w-[240px] origin-top-right rounded-2xl border border-slate-100 bg-white p-2 shadow-xl ring-1 ring-slate-900/5 animate-in fade-in zoom-in-95 duration-200">
                                <div className="flex flex-col gap-1">
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => handleSortChange(option.value)}
                                            className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-all ${sortBy === option.value ? 'bg-red-50 text-red-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                                        >
                                            {option.label}
                                            {sortBy === option.value && <Check size={16} className="text-red-600" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Cards Grid */}
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

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-16 flex items-center justify-center gap-2 flex-wrap">
                        {/* Prev */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="flex items-center gap-1 rounded-2xl border-2 border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-all hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            ‹ Prev
                        </button>

                        {/* Page Numbers */}
                        {getPageNumbers().map((page, idx) =>
                            page === "..." ? (
                                <span key={`ellipsis-${idx}`} className="px-1 text-slate-400 select-none">
                                    …
                                </span>
                            ) : (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page as number)}
                                    className={`min-w-[40px] rounded-2xl border-2 py-2 text-sm font-semibold transition-all ${currentPage === page
                                            ? "border-red-600 bg-red-600 text-white"
                                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                                        }`}
                                >
                                    {page}
                                </button>
                            )
                        )}

                        {/* Next */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="flex items-center gap-1 rounded-2xl border-2 border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-all hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Next ›
                        </button>
                    </div>
                )}

                {/* Info halaman */}
                <p className="mt-4 text-center text-xs text-slate-400">
                    Halaman {currentPage} dari {totalPages} • {alumniData.length} alumni
                </p>
            </div>
        </main>
    );
}