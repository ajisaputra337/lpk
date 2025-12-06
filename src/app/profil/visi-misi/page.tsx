// src/app/profil/visi-misi/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const VisiMisiPage = () => {
    // Data Visi Misi berdasarkan contoh yang Anda berikan
    const visi = "Menjadikan lembaga pendidikan dan pelatihan yang profesional, mandiri dan berkarakter.";
    const misi = [
        "Menyelenggarakan program pendidikan dan pelatihan bahasa Jepang secara profesional.",
        "Mendidik generasi muda agar memiliki semangat kerja yang tinggi, disiplin, dan mandiri.",
        "Meningkatkan hubungan kerjasama bidang tenaga kerja antara Indonesia dan Jepang.",
    ];
    const tujuan = [
        "Menyiapkan peserta didik menjadi anggota masyarakat yang mampu menerapkan dan mengembangkan wawasan dunia kerja.",
        "Menghasilkan lulusan yang berkarakter dan memiliki komitmen yang tinggi terhadap masyarakat.",
    ];

    // Asumsi: Foto Shinkansen (atau foto lain yang relevan) disimpan di public/images/shinkansen.jpg
    const heroImage = {
        src: "/images/shinkansen.jpg", 
        alt: "Kereta Cepat Shinkansen, melambangkan masa depan dan profesionalisme",
        width: 300,
        height: 200,
    };
    
    return (
        // pt-24 untuk mengimbangi fixed header
        <main className="pt-24 pb-16 bg-white">
            <div className="mx-auto max-w-5xl px-6">
    
                {/* Breadcrumb */}
                <div className="text-sm text-gray-500 mb-6">
                    <Link href="/" className="hover:text-red-700">Home</Link>
                    <span className="mx-1 text-gray-400">/</span> 
                    <span className="font-semibold text-gray-700">Visi Misi Lembaga</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 text-center">
                    Visi, Misi, dan Tujuan Lembaga
                </h1>

                {/* Bagian Visi */}
                <section className="mb-12 border-b pb-8">
                    <h2 className="text-3xl font-bold text-red-700 mb-6 flex items-center">
                        Visi
                    </h2>
                    <div className="md:flex md:space-x-8 items-center">
                        {/* Foto Visi */}
                        <div className="flex-shrink-0 w-full md:w-1/3 mb-4 md:mb-0 relative h-48 rounded-lg overflow-hidden shadow-lg">
                            {/* Menggunakan Image dari Next.js */}
                            <Image
                                src={heroImage.src}
                                alt={heroImage.alt}
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 768px) 100vw, 33vw"
                                priority
                            />
                        </div>
                        {/* Teks Visi */}
                        <div className="md:w-2/3">
                            <p className="text-xl text-gray-800 font-medium leading-relaxed italic">
                                "{visi}"
                            </p>
                        </div>
                    </div>
                </section>

                {/* Bagian Misi */}
                <section className="mb-12 border-b pb-8">
                    <h2 className="text-3xl font-bold text-red-700 mb-6">
                        Misi
                    </h2>
                    <ul className="space-y-4 text-lg text-gray-700">
                        {misi.map((item, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-red-700 font-bold mr-3 mt-1 flex-shrink-0">{index + 1}.</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Bagian Tujuan */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-red-700 mb-6">
                        Tujuan
                    </h2>
                    <ul className="space-y-4 text-lg text-gray-700">
                        {tujuan.map((item, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-red-700 font-bold mr-3 mt-1 flex-shrink-0">{index + 1}.</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>
                
            </div>
        </main>
    );
};

export default VisiMisiPage;