// src/app/page.tsx

'use client';
import Link from 'next/link';
// Import Image (tetap dipertahankan karena digunakan di komponen ProgramCard)
import Image from 'next/image'; 
import Header from '../styles/components/Header';
import Profile from '../styles/components/Profile'
import ProgramCard from '../styles/components/ProgramCard';
import SuccessStoryCard from '../styles/components/SuccessStoryCard'
import { BookOpen, Zap, Users } from 'lucide-react';

// =================================================================================
// ✅ TIDAK ADA IMPORT GAMBAR LOKAL (Diganti dengan path string di array programs)
// =================================================================================

// Data nomor wa
const whatsappLink = "https://wa.me/6288215751500?text=Halo%2C%20saya%20tertarik%20dengan%20program%20LPK%20Aishiro%20Gakuen%20dan%20ingin%20mendaftar.%20Mohon%20info%20lebih%20lanjut.";

// Data Testimoni (Tidak Diubah)
const stories = [
    {
        quote: "Pelatihan di Aishiro sangat disiplin dan mempersiapkan mental kerja di Jepang. Saya berhasil mendapatkan Job Tobi dalam 3 bulan!",
        name: 'Dani kusuma',
        job: 'Tobi',
        country: 'Tokyo, Jepang',
    },
    {
        quote: "Kurikulum bahasa dan fisik yang ketat membuat saya tidak canggung menghadapi lingkungan kerja. Ini lebih dari sekadar kursus.",
        name: 'Budi Kusuma',
        job: 'Technical Intern Trainee (Scaffolding)',
        country: 'Osaka, Jepang',
    },
    {
        quote: "Sukses bukan hanya soal skill, tapi juga attitude. Aishiro menanamkan etos kerja Jepang yang saya bawa hingga kini.",
        name: 'Citra Dewi',
        job: 'Technical Intern Trainee (Pengelasan)',
        country: 'Fukuoka, Jepang',
    },
];

// Program Card
// ✅ UBAH: imageUrl sekarang menggunakan string path publik yang dimulai dengan /images/
const programs = [
  {
    title: 'Magang Jepang',
    description: 'Panduan lengkap tahapan magang kerja di Jepang mulai dari seleksi, pelatihan, hingga penempatan.',
    icon: <BookOpen className="h-6 w-6" />,
    imageUrl: '/Images/magang.jpg', // Path ke public/images/program-magang.jpg
  },
  {
    title: 'Program sekolah di jepang',
    description: 'Panduan lengkap tahapan sekolah di jepang hingga pemberangkatan.',
    icon: <Zap className="h-6 w-6" />,
    imageUrl: '/Images/sekolah-jepang.webp', // Path ke public/images/program-sekolah.jpg
  },
  {
    title: 'Program Care Giver (Kaigo)',
    description: 'Persiapan intensif untuk kerja bagi job-job spesifik seperti Kaigo.',
    icon: <Users className="h-6 w-6" />,
    imageUrl: '/Images/kaigo.webp', // Path ke public/images/program-kaigo.jpg
  },
];

// Komponen Hiasan Jepang (Tidak Diubah)
const JapaneseDecoration = ({ type = "sakura", className = "" }) => {
    switch(type) {
        case "sakura":
            return (
                <svg className={`absolute opacity-10 ${className}`} width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40 10C40 10 45 20 55 20C65 20 70 10 70 10C70 10 65 0 55 0C45 0 40 10 40 10Z" fill="#ef4444"/>
                    <path d="M60 30C60 30 65 40 75 40C85 40 90 30 90 30C90 30 85 20 75 20C65 20 60 30 60 30Z" fill="#ef4444" transform="translate(-20,-20)"/>
                    <path d="M20 40C20 40 25 50 35 50C45 50 50 40 50 40C50 40 45 30 35 30C25 30 20 40 20 40Z" fill="#ef4444"/>
                    <path d="M30 60C30 60 35 70 45 70C55 70 60 60 60 60C60 60 55 50 45 50C35 50 30 60 30 60Z" fill="#ef4444"/>
                </svg>
            );
        case "wave":
            return (
                <svg className={`absolute opacity-5 ${className}`} width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,20 C15,0 35,40 55,20 C75,0 95,40 115,20 L115,40 L0,40 Z" fill="#dc2626"/>
                    <path d="M0,30 C10,15 25,35 40,25 C55,15 70,35 85,25 C100,15 115,35 120,30 L120,40 L0,40 Z" fill="#ef4444" opacity="0.7"/>
                </svg>
            );
        case "shippo":
            return (
                <svg className={`absolute opacity-5 ${className}`} width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="30" cy="30" r="25" stroke="#dc2626" strokeWidth="1"/>
                    <circle cx="30" cy="30" r="15" stroke="#ef4444" strokeWidth="1"/>
                    <line x1="5" y1="30" x2="55" y2="30" stroke="#dc2626" strokeWidth="0.5"/>
                    <line x1="30" y1="5" x2="30" y2="55" stroke="#dc2626" strokeWidth="0.5"/>
                    <line x1="10" y1="10" x2="50" y2="50" stroke="#ef4444" strokeWidth="0.5"/>
                    <line x1="50" y1="10" x2="10" y2="50" stroke="#ef44f4" strokeWidth="0.5"/>
                </svg>
            );
        default:
            return null;
    }
};

const Page = () => {
    return (
        <>
            <Header />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative h-[600px] bg-gray-50 overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <div className="w-full h-full bg-cover bg-center" style={{ 
                            backgroundImage: `url('https://www.lot.com/content/dam/lot/lot-com/destination-photos/japonia/Tokyo-5%20.coreimg.jpg/1723628368208/Tokyo-5%20.jpg')`,
                            filter: 'brightness(60%)'
                        }}></div>
                    </div>

                    {/* Hiasan Sakura Floating */}
                    <JapaneseDecoration type="sakura" className="top-10 left-10 animate-float-slow" />
                    <JapaneseDecoration type="sakura" className="top-1/4 right-16 animate-float-medium" />
                    <JapaneseDecoration type="sakura" className="bottom-20 left-1/4 animate-float-fast" />
                    <JapaneseDecoration type="sakura" className="bottom-10 right-10 animate-float-slow" />

                    <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
                        <div className="w-full max-w-xl text-left">
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white mb-4">
                                Wujudkan Mimpimu <br /> Belajar & Berkarir di Jepang
                            </h1>
                            <p className="text-lg text-gray-200 mb-8">
                                Bersama Aishiro Gakuen, Gapailah Masa Depan Gemilang.
                            </p>
                            <Link 
                                href={whatsappLink} // Menggunakan variabel WhatsApp
                                target="_blank" // Membuka di tab baru
                                rel="noopener noreferrer" // Praktik keamanan
                                className="inline-block rounded-md bg-red-700 px-8 py-3 text-lg font-bold text-white shadow-xl hover:bg-red-800 transition-colors"
                            >
                                DAFTAR SEKARANG
                            </Link>
                        </div>
                    </div>
                </section>

                {/*Tentang Kami*/}
                <section id='Profile'>
                    <Profile />
                </section>
                
                {/* --- */}

                {/* Section Program Unggulan */}
                <section className="relative py-20 bg-white overflow-hidden">
                    {/* Background Pattern Jepang (Subtle) */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 left-0 w-full h-full" 
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23dc2626' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                                backgroundSize: '300px'
                            }}>
                        </div>
                    </div>
                    
                    <div className="relative z-10">
                        <div className="mx-auto max-w-7xl px-6">
                            {/* Header dengan garis merah Jepang */}
                            <div className="flex flex-col items-center mb-12">
                                <div className="w-24 h-1 bg-red-700 mb-4 rounded-full"></div>
                                <h2 className="text-3xl font-bold text-center text-gray-800">
                                    Program Unggulan Kami
                                </h2>
                                <div className="w-24 h-1 bg-red-700 mt-4 rounded-full"></div>
                            </div>
                            
                            {/* Grid untuk Kartu Program */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {programs.map((program) => (
                                    <ProgramCard
                                        key={program.title}
                                        title={program.title}
                                        description={program.description}
                                        icon={program.icon}
                                        // ✅ Meneruskan path string sebagai imageUrl
                                        imageUrl={program.imageUrl} 
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- */}

                {/* BAGIAN SUCCESS STORY */}
                <section className="relative py-20 bg-gray-50 overflow-hidden">
                    {/* Gelombang Jepang Dekoratif */}
                    <JapaneseDecoration type="wave" className="top-0 left-0 w-full rotate-180" />
                    <JapaneseDecoration type="wave" className="bottom-0 left-0 w-full" />
                    
                    {/* Hiasan Shippo Pattern */}
                    <JapaneseDecoration type="shippo" className="top-20 left-10" />
                    <JapaneseDecoration type="shippo" className="bottom-20 right-10" />

                    <div className="relative z-10 mx-auto max-w-7xl px-6">
                        <div className="flex flex-col items-center mb-12">
                            <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
                                成功ストーリー
                            </h2>
                            <p className="text-lg text-gray-600 text-center mb-6">
                                Mereka yang Sukses di Jepang
                            </p>
                            <div className="w-20 h-1 bg-red-700 rounded-full"></div>
                        </div>
                        
                        {/* Grid untuk Testimoni */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {stories.map((story, index) => (
                                <div key={index} className="relative group">
                                    {/* Garis merah vertikal di sisi kiri */}
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-700 rounded-r-lg group-hover:h-full transition-all duration-300"></div>
                                    <div className="ml-4">
                                        <SuccessStoryCard
                                            quote={story.quote}
                                            name={story.name}
                                            job={story.job}
                                            country={story.country}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- */}

                {/* 5. LOKASI GOOGLE MAPS */}
                <section className="relative py-20 bg-white overflow-hidden">
                    {/* Background dengan motif asanoha (pattern tradisional Jepang) */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="w-full h-full"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0 L100,0 L100,100 L0,100 Z' fill='none' stroke='%23dc2626' stroke-width='2'/%3E%3Cpath d='M50,0 L50,100 M0,50 L100,50' stroke='%23dc2626' stroke-width='1' stroke-dasharray='5,5'/%3E%3C/svg%3E")`,
                                backgroundSize: '200px'
                            }}>
                        </div>
                    </div>

                    <div className="relative z-10 mx-auto max-w-7xl px-6">
                        <div className="flex flex-col items-center mb-12">
                            <div className="flex items-center mb-6">
                                <div className="w-8 h-8 border-2 border-red-700 rounded-full mr-4"></div>
                                <h2 className="text-3xl font-bold text-center text-gray-800">
                                    所在地
                                </h2>
                                <div className="w-8 h-8 border-2 border-red-700 rounded-full ml-4"></div>
                            </div>
                            <p className="text-lg text-gray-600 text-center mb-2">
                                Temukan Lokasi Kami
                            </p>
                            <div className="w-32 h-1 bg-gradient-to-r from-red-700 to-transparent rounded-full"></div>
                        </div>
                        
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Informasi Kontak Ringkas dengan desain Jepang */}
                            <div className="lg:w-1/3 w-full p-6 bg-white rounded-xl shadow-lg border border-gray-200 relative overflow-hidden">
                                {/* Corner Decoration */}
                                <div className="absolute top-0 right-0 w-12 h-12">
                                    <div className="w-full h-full border-t-2 border-r-2 border-red-700 rounded-bl-lg"></div>
                                </div>
                                
                                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Informasi Alamat
                                </h3>
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    Anda dapat mengunjungi kami di lokasi berikut untuk konsultasi atau pendaftaran langsung.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-start p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-700 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657A8 8 0 1117.657 16.657z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <div>
                                            <p className="font-semibold text-gray-800">LPK Aishiro Gakuen</p>
                                            <p className="text-gray-700">Jl. Pendidikan No. 12 Semarang, Jawa Tengah</p>
                                        </div>
                                    </div>
                                    <div className="p-3 border-l-4 border-red-700 bg-gray-50 rounded-r-lg">
                                        <p className="text-sm text-gray-600 italic">"Kualitas pendidikan adalah prioritas utama kami dalam membangun masa depan Anda."</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Peta Google Maps dengan border gaya Jepang */}
                            <div className="lg:w-2/3 w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl border-2 border-red-700 relative">
                                {/* Corner Accents */}
                                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-700 z-20"></div>
                                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-red-700 z-20"></div>
                                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-red-700 z-20"></div>
                                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-red-700 z-20"></div>
                                
                                <iframe
                                    title="Google Maps Lokasi LPK Aishiro Gakuen" 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d643.6745228607759!2d110.46683188372741!3d-7.005259984878899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708cfc821d6ea7%3A0xad77b41447d11d3c!2sLPK.%20AISHIRO%20GAKUEN!5e0!3m2!1sid!2sid!4v1765081785824!5m2!1sid!2sid" 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="relative z-10"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- */}

                {/* Tambahkan CSS untuk animasi */}
                <style jsx>{`
                    @keyframes float-slow {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        50% { transform: translateY(-20px) rotate(5deg); }
                    }
                    
                    @keyframes float-medium {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        50% { transform: translateY(-15px) rotate(-5deg); }
                    }
                    
                    @keyframes float-fast {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                    }
                    
                    .animate-float-slow {
                        animation: float-slow 8s ease-in-out infinite;
                    }
                    
                    .animate-float-medium {
                        animation: float-medium 6s ease-in-out infinite;
                    }
                    
                    .animate-float-fast {
                        animation: float-fast 4s ease-in-out infinite;
                    }
                `}</style>
            </main>
        </>
    );
};

export default Page;