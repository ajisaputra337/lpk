// src/app/program/sekolah-jepang/page.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Globe, GraduationCap, MapPin, Zap } from 'lucide-react';
import Header from '../../../styles/components/Header'; // Sesuaikan path jika perlu

// Data spesifik program
const programData = {
    title: 'Program Sekolah Bahasa dan Studi di Jepang',
    subheading: 'Gerbang Anda Menuju Pendidikan Tinggi dan Karir Global',
    // Gunakan gambar eksternal (pastikan images.unsplash.com sudah dikonfigurasi di next.config.js)
    heroImage: 'https://images.unsplash.com/photo-1549419163-f2737604391e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    whatsappLink: "https://wa.me/6288215751500?text=Halo%2C%20saya%20tertarik%20dengan%20Program%20Sekolah%20di%20Jepang.%20Mohon%20info%20lebih%20lanjut.",
    description: "Program ini dirancang untuk siswa yang ingin melanjutkan studi bahasa Jepang di sekolah bahasa (Gakkou) sebelum melanjutkan ke universitas, Vokasi, atau mencari pekerjaan di Jepang. Ini adalah jalur terstruktur untuk menguasai bahasa, memahami budaya, dan beradaptasi dengan sistem pendidikan Jepang.",
};

// Tahapan Program
const stages = [
    {
        icon: <BookOpen className="h-6 w-6 text-white" />,
        title: "Konsultasi & Pendaftaran",
        details: "Diskusi mendalam mengenai tujuan studi, pemilihan sekolah bahasa yang sesuai, dan pengumpulan dokumen awal.",
    },
    {
        icon: <GraduationCap className="h-6 w-6 text-white" />,
        title: "Persiapan Dokumen & Visa",
        details: "Bantuan penuh dalam mempersiapkan semua dokumen yang diperlukan (Ijazah, Bank Statement, COE - Certificate of Eligibility), dan aplikasi visa pelajar.",
    },
    {
        icon: <Globe className="h-6 w-6 text-white" />,
        title: "Pelatihan Intensif Bahasa",
        details: "Pelatihan bahasa Jepang dan persiapan JLPT/J-Test di LPK Aishiro Gakuen hingga mencapai level N5/N4 sebelum keberangkatan.",
    },
    {
        icon: <Zap className="h-6 w-6 text-white" />,
        title: "Keberangkatan & Orientasi",
        details: "Pengurusan tiket, penjemputan di bandara Jepang, dan orientasi awal mengenai kehidupan, sekolah, dan part-time job di Jepang.",
    },
];

// Keunggulan Program
const advantages = [
    "Jalur resmi menuju pendidikan tinggi (Universitas/Vokasi) di Jepang.",
    "Bisa sambil bekerja paruh waktu (Part-time job) untuk menutupi biaya hidup.",
    "Mendapatkan kemampuan Bahasa Jepang tingkat tinggi (N2/N1).",
    "Dukungan penuh adaptasi dan pencarian akomodasi di Jepang.",
];

const SekolahJepangPage = () => {
    return (
        <>
            <Header />

            <main className="pt-20">
                {/* 1. Hero Section Program Detail */}
                <section className="relative h-[400px] md:h-[500px] overflow-hidden">
                    <Image
                        src="/Images/tokyo-university.jpg"
                        alt="Pemandangan Sekolah di Jepang"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="filter brightness-[65%]"
                        priority
                    />
                    <div className="absolute inset-0 bg-red-800/20"></div>

                    <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
                        <div className="text-left w-full max-w-2xl">
                            <p className="text-red-300 font-bold mb-2 flex items-center">
                                <GraduationCap className="h-5 w-5 mr-2" /> Program Studi
                            </p>
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white mb-4">
                                {programData.title}
                            </h1>
                            <p className="text-lg text-gray-200">
                                {programData.subheading}
                            </p>
                            <Link
                                href={programData.whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-block rounded-md bg-white px-8 py-3 text-lg font-bold text-red-700 shadow-xl hover:bg-gray-100 transition-colors"
                            >
                                Daftar & Konsultasi Sekarang
                            </Link>
                        </div>
                    </div>
                </section>
                
                {/* --- */}

                {/* 2. Detail & Deskripsi Program */}
                <section className="py-20 bg-white">
                    <div className="mx-auto max-w-7xl px-6 lg:flex lg:gap-12">
                        {/* Deskripsi */}
                        <div className="lg:w-2/3">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-red-700 pb-2">
                                Mengenai Program
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                {programData.description}
                            </p>

                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                                Keunggulan Program Sekolah di Jepang
                            </h3>
                            <ul className="space-y-3 mb-8">
                                {advantages.map((advantage, index) => (
                                    <li key={index} className="flex items-start text-gray-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-700 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-lg">{advantage}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-700">
                                <p className="font-semibold text-red-800">
                                    Catatan Penting:
                                </p>
                                <p className="text-red-700 mt-2">
                                    Calon siswa harus mempersiapkan dana biaya hidup dan sekolah yang mencukupi sesuai persyaratan Imigrasi Jepang. Kami akan membantu dalam proses administrasi ini.
                                </p>
                            </div>
                        </div>

                        {/* Ringkasan Program Samping */}
                        <div className="lg:w-1/3 mt-10 lg:mt-0">
                            <div className="p-6 bg-gray-50 rounded-xl shadow-lg sticky top-24 border border-gray-200">
                                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center border-b pb-2">
                                    <MapPin className="h-5 w-5 mr-2 text-red-700" /> Fakta Singkat
                                </h3>
                                <div className="space-y-3 text-gray-700">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Durasi Studi:</span>
                                        <span className="text-red-700 font-semibold">1 - 2 Tahun</span>
                                    </div>
                                    <div className="flex justify-between items-center border-t pt-2">
                                        <span className="font-medium">Tujuan Akhir:</span>
                                        <span>Universitas/Vokasi/Kerja</span>
                                    </div>
                                    <div className="flex justify-between items-center border-t pt-2">
                                        <span className="font-medium">Level Bahasa Awal:</span>
                                        <span>Tidak wajib (akan dilatih)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- */}

                {/* 3. Tahapan Proses */}
                <section className="py-20 bg-gray-50">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center mb-12">
                            <span className="text-sm font-semibold uppercase text-red-700">Jalur Resmi</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-2">
                                Tahapan Menjadi Siswa di Jepang
                            </h2>
                        </div>

                        <div className="relative">
                            {/* Garis vertikal (Timeline) */}
                            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-red-300"></div>

                            {stages.map((stage, index) => (
                                <div 
                                    key={index} 
                                    className={`mb-8 flex flex-col items-center lg:flex-row lg:items-start ${index % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
                                >
                                    {/* Content Card */}
                                    <div className={`lg:w-5/12 w-full p-6 bg-white rounded-xl shadow-lg border border-gray-200 relative`}>
                                        <h3 className="text-xl font-bold text-red-700 mb-2">
                                            Langkah {index + 1}: {stage.title}
                                        </h3>
                                        <p className="text-gray-600">{stage.details}</p>
                                    </div>

                                    {/* Icon Circle (Di tengah) */}
                                    <div className="relative my-4 lg:my-0 lg:w-2/12 flex justify-center items-center">
                                        <div className="w-12 h-12 rounded-full bg-red-700 shadow-xl flex items-center justify-center p-2 z-10">
                                            {stage.icon}
                                        </div>
                                    </div>

                                    {/* Space kosong di sisi yang berlawanan */}
                                    <div className="lg:w-5/12 hidden lg:block"></div>
                                </div>
                            ))}
                        </div>
                        
                    </div>
                </section>

                {/* --- */}

                {/* 4. CTA Akhir */}
                <section className="py-16 bg-red-700">
                    <div className="mx-auto max-w-4xl px-6 text-center">
                        <h2 className="text-3xl font-extrabold text-white mb-4">
                            Siap Wujudkan Mimpi Sekolah di Jepang?
                        </h2>
                        <p className="text-lg text-red-100 mb-8">
                            Jangan tunda lagi! Konsultasikan rencana studi Anda bersama tim profesional kami hari ini.
                        </p>
                        <Link
                            href={programData.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block rounded-md bg-white px-10 py-4 text-xl font-bold text-red-700 shadow-2xl hover:bg-gray-100 transition-colors transform hover:scale-105"
                        >
                            Hubungi Kami via WhatsApp
                        </Link>
                    </div>
                </section>

            </main>
        </>
    );
};

export default SekolahJepangPage;