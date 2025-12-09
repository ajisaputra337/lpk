// src/app/program/care-giver-kaigo/page.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Briefcase, FileText, Zap, DollarSign, MapPin } from 'lucide-react'; 
import Header from '../../../styles/components/Header'; // Sesuaikan path jika perlu

// Data spesifik program
const programData = {
    title: 'Program Care Giver (Kaigo) Jepang',
    subheading: 'Peluang Karir Mulia di Sektor Kesehatan dan Kesejahteraan Jepang',
    heroImage: '/images/kaigo.webp', // Ganti sesuai path aset lokal Anda
    whatsappLink: "https://wa.me/6288215751500?text=Halo%2C%20saya%20tertarik%20dengan%20Program%20Care%20Giver%20(Kaigo).%20Mohon%20info%20lebih%20lanjut.",
    description: "Program Care Giver (Kaigo) adalah jalur resmi untuk bekerja di Jepang dalam bidang perawatan lansia. Ini adalah sektor dengan permintaan tinggi yang menawarkan stabilitas kerja, gaji kompetitif, dan kesempatan untuk mendapatkan visa kerja permanen. LPK Aishiro Gakuen memberikan pelatihan intensif bahasa dan keahlian Kaigo yang dibutuhkan.",
};

// Tahapan Program Kaigo
const stages = [
    {
        icon: <FileText className="h-6 w-6 text-white" />,
        title: "Seleksi Awal & Kontrak",
        details: "Pendaftaran, wawancara, dan penandatanganan kontrak pelatihan. Dilanjutkan dengan pengumpulan dokumen visa dan perjanjian kerja.",
    },
    {
        icon: <Zap className="h-6 w-6 text-white" />,
        title: "Pelatihan Bahasa & Kaigo",
        details: "Pelatihan intensif Bahasa Jepang hingga level N4/N3, ditambah pelatihan teknis dasar Kaigo (perawatan lansia) di LPK.",
    },
    {
        icon: <Briefcase className="h-6 w-6 text-white" />,
        title: "Ujian Kompetensi & Wawancara Kerja",
        details: "Mempersiapkan dan mengikuti ujian JLPT/J-TEST, serta wawancara dengan calon perusahaan Kaigo (Fasilitas Panti Jompo/Rumah Sakit) di Jepang.",
    },
    {
        icon: <Heart className="h-6 w-6 text-white" />,
        title: "Pemberangkatan & Penempatan",
        details: "Pengurusan visa kerja spesifik (Tokutei Ginou), tiket, dan penempatan langsung di fasilitas Kaigo di Jepang.",
    },
];

// Keunggulan Program
const advantages = [
    "Jalur Kerja Profesional dengan Visa Tokutei Ginou (SSW/Specified Skilled Worker).",
    "Gaji Awal Kompetitif (Rata-rata di atas ¥180.000/bulan).",
    "Permintaan Tenaga Kerja yang Sangat Tinggi dan Stabilitas Karir Jangka Panjang.",
    "Kesempatan untuk mendapatkan visa permanen setelah beberapa tahun bekerja.",
    "Lingkungan kerja yang mengajarkan kesabaran, empati, dan budaya pelayanan Jepang.",
];

const Kaigo = () => {
    return (
        <>
            <Header />

            <main className="pt-20">
                {/* 1. Hero Section Program Detail */}
                <section className="relative h-[400px] md:h-[500px] overflow-hidden">
                    <Image
                        src={programData.heroImage}
                        alt="Perawat Care Giver di Jepang"
                        fill
                        // ✅ DI SINI: Gambar akan terfokus ke bagian atas
                        style={{ objectFit: 'cover', objectPosition: 'top' }} 
                        className="filter brightness-[65%]"
                        priority
                    />
                    <div className="absolute inset-0 bg-red-800/20"></div>

                    {/* Konten teks tetap di bawah (items-end) */}
                    <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-12">
                        <div className="text-left w-full max-w-2xl">
                            <p className="text-red-300 font-bold mb-2 flex items-center">
                                <Heart className="h-5 w-5 mr-2" /> Program Karir
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
                                Konsultasi Kaigo Sekarang
                            </Link>
                        </div>
                    </div>
                </section>
                
                ---

                {/* 2. Detail & Deskripsi Program */}
                <section className="py-20 bg-white">
                    <div className="mx-auto max-w-7xl px-6 lg:flex lg:gap-12">
                        {/* Deskripsi */}
                        <div className="lg:w-2/3">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-red-700 pb-2">
                                Apa itu Kaigo?
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                {programData.description}
                            </p>

                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                                Mengapa Memilih Karir Kaigo?
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
                                    Persyaratan Khusus:
                                </p>
                                <p className="text-red-700 mt-2">
                                    Pelamar Kaigo biasanya memerlukan kemampuan empati tinggi, kesiapan fisik, dan komitmen untuk mendapatkan sertifikasi bahasa dan keahlian Kaigo.
                                </p>
                            </div>
                        </div>

                        {/* Ringkasan Program Samping */}
                        <div className="lg:w-1/3 mt-10 lg:mt-0">
                            <div className="p-6 bg-gray-50 rounded-xl shadow-lg sticky top-24 border border-gray-200">
                                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center border-b pb-2">
                                    <MapPin className="h-5 w-5 mr-2 text-red-700" /> Detail Karir
                                </h3>
                                <div className="space-y-3 text-gray-700">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Jenis Visa:</span>
                                        <span className="text-red-700 font-semibold">Tokutei Ginou (SSW)</span>
                                    </div>
                                    <div className="flex justify-between items-center border-t pt-2">
                                        <span className="font-medium">Sektor:</span>
                                        <span>Perawatan Lansia</span>
                                    </div>
                                    <div className="flex justify-between items-center border-t pt-2">
                                        <span className="font-medium">Estimasi Gaji:</span>
                                        <span className="flex items-center"><DollarSign className="h-4 w-4 mr-1"/> ¥180K - ¥220K / bulan</span>
                                    </div>
                                    <div className="flex justify-between items-center border-t pt-2">
                                        <span className="font-medium">Level Bahasa Minimal:</span>
                                        <span>N4</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                ---

                {/* 3. Tahapan Proses Kaigo */}
                <section className="py-20 bg-gray-50">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center mb-12">
                            <span className="text-sm font-semibold uppercase text-red-700">Jalur Karir Pasti</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-2">
                                Proses Menjadi Care Giver Profesional
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

                ---

                {/* 4. CTA Akhir */}
                <section className="py-16 bg-red-700">
                    <div className="mx-auto max-w-4xl px-6 text-center">
                        <h2 className="text-3xl font-extrabold text-white mb-4">
                            Wujudkan Karir Mulia Sebagai Care Giver di Jepang
                        </h2>
                        <p className="text-lg text-red-100 mb-8">
                            Dapatkan pelatihan terbaik dan penempatan kerja resmi di fasilitas perawatan lansia terbaik di Jepang.
                        </p>
                        <Link
                            href={programData.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block rounded-md bg-white px-10 py-4 text-xl font-bold text-red-700 shadow-2xl hover:bg-gray-100 transition-colors transform hover:scale-105"
                        >
                            Daftar Kaigo Sekarang
                        </Link>
                    </div>
                </section>

            </main>
        </>
    );
};

export default Kaigo;