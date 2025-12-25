// src/app/program/TokuteiGinou/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Briefcase, FileText, Zap, DollarSign, MapPin } from 'lucide-react';
import Header from '../../../styles/components/Header';

// Data spesifik program
const programData = {
    title: 'Program Tokutei Ginou (SSW) Jepang',
    subheading: 'Jalur Resmi Kerja Profesional di Jepang dengan Skill Spesifik',
    heroImage: '/images/breadcrumbtokuteiginou.jpeg',
    whatsappLink:
        'https://wa.me/6288215751500?text=Halo%2C%20saya%20tertarik%20dengan%20Program%20Tokutei%20Ginou%20(SSW).%20Mohon%20info%20lebih%20lanjut.',
    description:
        'Program Tokutei Ginou (Specified Skilled Worker/SSW) adalah skema resmi pemerintah Jepang bagi tenaga kerja asing yang memiliki keterampilan khusus. Program ini membuka peluang kerja legal di berbagai sektor industri dengan gaji kompetitif, kontrak jelas, dan perlindungan hukum. LPK Aishiro Gakuen mempersiapkan peserta melalui pelatihan bahasa Jepang dan keahlian teknis sesuai bidang kerja.',
};

// Tahapan Program Tokutei Ginou
const stages = [
    {
        icon: <FileText className="h-6 w-6 text-white" />,
        title: 'Seleksi & Administrasi',
        details:
            'Pendaftaran, seleksi awal, wawancara, serta pengurusan dokumen dan kontrak pelatihan sesuai standar Tokutei Ginou.',
    },
    {
        icon: <Zap className="h-6 w-6 text-white" />,
        title: 'Pelatihan Bahasa & Skill',
        details:
            'Pelatihan Bahasa Jepang hingga level minimal N4 serta pelatihan keterampilan teknis sesuai sektor Tokutei Ginou yang dipilih.',
    },
    {
        icon: <Briefcase className="h-6 w-6 text-white" />,
        title: 'Ujian Skill & Bahasa',
        details:
            'Mengikuti ujian keterampilan Tokutei Ginou dan ujian bahasa Jepang (JLPT/JFT-Basic) sebagai syarat kerja di Jepang.',
    },
    {
        icon: <Heart className="h-6 w-6 text-white" />,
        title: 'Penempatan & Pemberangkatan',
        details:
            'Pengurusan visa Tokutei Ginou (SSW) dan penempatan kerja resmi di perusahaan Jepang sesuai bidang.',
    },
];

// Keunggulan Program
const advantages = [
    'Visa Kerja Resmi Tokutei Ginou (SSW) dari Pemerintah Jepang.',
    'Pilihan sektor luas: manufaktur, makanan, konstruksi, perhotelan, kaigo, dan lainnya.',
    'Gaji kompetitif setara tenaga kerja Jepang.',
    'Kontrak kerja jelas dengan perlindungan hukum.',
    'Peluang kerja jangka panjang dan perpanjangan visa.',
];

const TokuteiGinou = () => {
    return (
        <>
            <Header />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative h-[400px] md:h-[500px] overflow-hidden">
                    <Image
                        src={programData.heroImage}
                        alt="Program Tokutei Ginou Jepang"
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                        className="filter brightness-[65%]"
                        priority
                    />
                    <div className="absolute inset-0 bg-red-800/20"></div>

                    <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-12">
                        <div className="w-full max-w-2xl text-left">
                            <p className="mb-2 flex items-center font-bold text-red-300">
                                <Heart className="mr-2 h-5 w-5" /> Program Kerja Jepang
                            </p>
                            <h1 className="mb-4 text-4xl font-extrabold leading-tight text-white md:text-5xl">
                                {programData.title}
                            </h1>
                            <p className="text-lg text-gray-200">
                                {programData.subheading}
                            </p>
                            <Link
                                href={programData.whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-block rounded-md bg-white px-8 py-3 text-lg font-bold text-red-700 shadow-xl transition-colors hover:bg-gray-100"
                            >
                                Konsultasi Tokutei Ginou
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Detail Program */}
                <section className="bg-white py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:flex lg:gap-12">
                        <div className="lg:w-2/3">
                            <h2 className="mb-6 border-b-2 border-red-700 pb-2 text-3xl font-bold text-gray-800">
                                Apa itu Tokutei Ginou?
                            </h2>
                            <p className="mb-8 text-lg leading-relaxed text-gray-700">
                                {programData.description}
                            </p>

                            <h3 className="mb-4 text-2xl font-semibold text-gray-800">
                                Mengapa Memilih Tokutei Ginou?
                            </h3>
                            <ul className="mb-8 space-y-3">
                                {advantages.map((adv, i) => (
                                    <li key={i} className="flex items-start text-gray-700">
                                        <svg
                                            className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-red-700"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span className="text-lg">{adv}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="rounded-xl border-l-4 border-red-700 bg-red-50 p-6">
                                <p className="font-semibold text-red-800">
                                    Persyaratan Umum:
                                </p>
                                <p className="mt-2 text-red-700">
                                    Peserta wajib lulus ujian bahasa Jepang dan ujian
                                    keterampilan sesuai bidang Tokutei Ginou serta siap
                                    beradaptasi dengan budaya kerja Jepang.
                                </p>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="mt-10 lg:mt-0 lg:w-1/3">
                            <div className="sticky top-24 rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-lg">
                                <h3 className="mb-4 flex items-center border-b pb-2 text-xl font-bold text-gray-800">
                                    <MapPin className="mr-2 h-5 w-5 text-red-700" />
                                    Detail Karir
                                </h3>
                                <div className="space-y-3 text-gray-700">
                                    <div className="flex justify-between">
                                        <span className="font-medium">Jenis Visa:</span>
                                        <span className="font-semibold text-red-700">
                                            Tokutei Ginou (SSW)
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-t pt-2">
                                        <span className="font-medium">Sektor:</span>
                                        <span>Multi Sektor</span>
                                    </div>
                                    <div className="flex justify-between border-t pt-2">
                                        <span className="font-medium">Estimasi Gaji:</span>
                                        <span className="flex items-center">
                                            <DollarSign className="mr-1 h-4 w-4" />
                                            ¥180K - ¥250K / bulan
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-t pt-2">
                                        <span className="font-medium">Level Bahasa:</span>
                                        <span>N4</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tahapan */}
                <section className="bg-gray-50 py-20">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-12 text-center">
                            <span className="text-sm font-semibold uppercase text-red-700">
                                Jalur Kerja Legal
                            </span>
                            <h2 className="mt-2 text-3xl font-extrabold text-gray-800 md:text-4xl">
                                Proses Menjadi Pekerja Tokutei Ginou
                            </h2>
                        </div>

                        <div className="relative">
                            <div className="absolute left-1/2 hidden h-full w-0.5 -translate-x-1/2 bg-red-300 lg:block"></div>

                            {stages.map((stage, i) => (
                                <div
                                    key={i}
                                    className={`mb-8 flex flex-col items-center lg:flex-row ${i % 2 === 0
                                        ? 'lg:flex-row-reverse'
                                        : 'lg:flex-row'
                                        }`}
                                >
                                    <div className="relative w-full rounded-xl border border-gray-200 bg-white p-6 shadow-lg lg:w-5/12">
                                        <h3 className="mb-2 text-xl font-bold text-red-700">
                                            Langkah {i + 1}: {stage.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {stage.details}
                                        </p>
                                    </div>

                                    <div className="relative my-4 flex w-full justify-center lg:my-0 lg:w-2/12">
                                        <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-red-700 p-2 shadow-xl">
                                            {stage.icon}
                                        </div>
                                    </div>

                                    <div className="hidden lg:block lg:w-5/12"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-red-700 py-16">
                    <div className="mx-auto max-w-4xl px-6 text-center">
                        <h2 className="mb-4 text-3xl font-extrabold text-white">
                            Kerja Resmi di Jepang lewat Tokutei Ginou
                        </h2>
                        <p className="mb-8 text-lg text-red-100">
                            Pelatihan terarah, jalur legal, dan peluang kerja nyata di
                            berbagai sektor industri Jepang.
                        </p>
                        <Link
                            href={programData.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block transform rounded-md bg-white px-10 py-4 text-xl font-bold text-red-700 shadow-2xl transition hover:scale-105 hover:bg-gray-100"
                        >
                            Daftar Tokutei Ginou Sekarang
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
};

export default TokuteiGinou;
