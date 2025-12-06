import Link from 'next/link';
import Header from '../styles/components/Header';
import ProgramCard from '../styles/components/ProgramCard';
import SuccessStoryCard from '../styles/components/SuccessStoryCard'
// import Image from 'next/image'; // Gunakan jika Anda mengimplementasikan gambar
import { BookOpen, Zap, Users } from 'lucide-react';

{/*Data Testimoni*/}
const stories = [
    {
        quote: "Pelatihan di Aishiro sangat disiplin dan mempersiapkan mental kerja di Jepang. Saya berhasil mendapatkan Job Tobi dalam 3 bulan!",
        name: 'Mas Amba',
        job: 'Teknik Sipil Jomokerto',
        country: 'Pinggiran Tokyo, Jepang',
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

{/*Program Card*/}
const programs = [
  {
    title: 'Alur Magang Jepang',
    description: 'Panduan lengkap tahapan magang kerja di Jepang mulai dari seleksi, pelatihan, hingga penempatan.',
    // linkHref: '/program/alur-magang',
    icon: <BookOpen className="h-6 w-6" />,
  },
  {
    title: 'Kegiatan Fisik Sore',
    description: 'Pelatihan fisik wajib untuk membentuk mental dan stamina yang kuat sesuai standar kerja Jepang.',
    // linkHref: '/program/fisik-sore',
    icon: <Zap className="h-6 w-6" />,
  },
  {
    title: 'Shiken (Ujian Kerja)',
    description: 'Persiapan intensif untuk ujian kerja tahun pertama (Shiken) bagi job-job spesifik seperti Tobi.',
    // linkHref: '/program/shiken',
    icon: <Users className="h-6 w-6" />,
  },
];

const Page = () => {
  return (
    <>
      {/* Header (Komponen yang baru dibuat) */}
      <Header />

      {/* Hero Section - Menggunakan padding atas untuk menghindari tumpang tindih dengan fixed header */}
      <main className="pt-20"> 
        <section className="relative h-[600px] bg-gray-50 overflow-hidden">
          {/* Background Image / Placeholder */}
          <div className="absolute inset-0">
            {/* Ganti dengan Image Next/Image Anda untuk performa */}
            <div className="w-full h-full bg-cover bg-center" style={{ 
                backgroundImage: `url('data:image/jpeg;base64,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')`, // Ganti dengan gambar Anda
                filter: 'brightness(60%)' // Sedikit redup agar teks lebih menonjol
            }}></div>
          </div>

          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
            <div className="w-full max-w-xl text-left">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white mb-4">
                Wujudkan Mimpimu <br /> **Belajar & Berkarir di Jepang**
              </h1>
              <p className="text-lg text-gray-200 mb-8">
                Bersama Aishiro Gakuen, Gapailah Masa Depan Gemilang.
              </p>
              <Link 
                href="/daftar"
                className="inline-block rounded-md bg-red-700 px-8 py-3 text-lg font-bold text-white shadow-xl hover:bg-red-800 transition-colors"
              >
                DAFTAR SEKARANG
              </Link>
            </div>
          </div>
        </section>

        {/* 2. BAGIAN PROGRAM UNGGULAN - Implementasi ProgramCard */}
        <section className="py-20 bg-white">
            <div className="mx-auto max-w-7xl px-6">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                    Program Unggulan Kami
                </h2>
                
                {/* Grid untuk Kartu Program (Minimalis, Rapi) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {programs.map((program) => (
                        <ProgramCard
                            key={program.title}
                            title={program.title}
                            description={program.description}
                            // linkHref={program.linkHref}
                            icon={program.icon}
                        />
                    ))}
                </div>
                

            </div>
        </section>

        {/* 3. BAGIAN SUCCESS STORY - BARU */}
        <section className="py-20 bg-gray-50"> {/* Warna latar belakang berbeda untuk pemisah visual */}
            <div className="mx-auto max-w-7xl px-6">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                    Mereka yang Sukses di Jepang
                </h2>
                
                {/* Grid untuk Testimoni */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stories.map((story, index) => (
                        <SuccessStoryCard
                            key={index}
                            quote={story.quote}
                            name={story.name}
                            job={story.job}
                            country={story.country}
                        />
                    ))}
                </div>
                
            </div>
        </section>
        
        {/* Placeholder untuk Footer */}
      </main>
    </>
  );
};

export default Page;