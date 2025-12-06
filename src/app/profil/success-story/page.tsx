// Data Testimoni Lengkap
const fullStories = [
    {
        quote: "Pelatihan di Aishiro sangat disiplin dan mempersiapkan mental kerja di Jepang. Saya berhasil mendapatkan Job Tobi dalam 3 bulan!",
        name: 'Gatot Herwanto',
        job: 'Technical Intern Trainee (Konstruksi)',
        country: 'sekitar Tokyo, Jepang',
    },
    {
        quote: "Kurikulum bahasa dan fisik yang ketat membuat saya tidak canggung menghadapi lingkungan kerja. Ini lebih dari sekadar kursus, ini adalah persiapan hidup.",
        name: 'Budi Kusumaning Prang',
        job: 'Technical Intern Trainee (Scaffolding)',
        country: 'Pojok Okinawa, Jepang (Opsional)',
    },
    {
        quote: "Sukses bukan hanya soal skill, tapi juga attitude. Aishiro menanamkan etos kerja Jepang yang saya bawa hingga kini.",
        name: 'Citra Dewi',
        job: 'Technical Intern Trainee (Pengelasan)',
        country: 'Fukuoka, Jepang',
    },
    {
        quote: "Dukungan penuh dari sensei dan tim administrasi benar-benar membantu saya melalui proses visa yang rumit. Sangat direkomendasikan!",
        name: 'Dian Permata',
        job: 'Specified Skilled Worker (Peternakan)',
        country: 'Hokkaido, Jepang',
    },
    {
        quote: "Persiapan fisik yang dilakukan setiap sore adalah kunci. Di Jepang, saya tidak pernah merasa kelelahan karena sudah terbiasa disiplin dari Aishiro.",
        name: 'Eko Santoso',
        job: 'Technical Intern Trainee (Pabrik)',
        country: 'Nagoya, Jepang',
    },
    // Anda bisa menambahkan data lain di sini...
];
// src/app/profil/sukses-story/page.tsx
import React from 'react';
import Link from 'next/link';
import SuccessStoryCard from '../ssc/SuccessStoryCard'; // Import komponen yang sudah ada
import { Star } from 'lucide-react';


const SuccessStoryPage = () => {
  return (
    // pt-24 untuk mengimbangi fixed header
    <main className="pt-24 pb-16 bg-white">
      <div className="mx-auto max-w-7xl px-6">

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-red-700">Home</Link>
            <span className="mx-1 text-gray-400">/</span> 
            <span className="font-semibold text-gray-700">Sukses Story</span>
        </div>
        
        {/* Hero Section Halaman Internal */}
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                Kisah Sukses Siswa Aishiro
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
                Mereka telah membuktikan bahwa disiplin dan pelatihan yang tepat adalah kunci kesuksesan di Jepang.
            </p>
            <div className="flex justify-center text-yellow-500 space-x-1">
                <Star className="h-6 w-6 fill-yellow-500" /><Star className="h-6 w-6 fill-yellow-500" /><Star className="h-6 w-6 fill-yellow-500" /><Star className="h-6 w-6 fill-yellow-500" /><Star className="h-6 w-6 fill-yellow-500" />
            </div>
        </div>

        {/* Grid Testimoni (Responsif) */}
        <section className="py-10">
            {/* Grid 1 kolom di mobile, 2 kolom di tablet, 3 kolom di desktop */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {fullStories.map((story, index) => (
                    <SuccessStoryCard
                        key={index}
                        quote={story.quote}
                        name={story.name}
                        job={story.job}
                        country={story.country}
                    />
                ))}
            </div>
        </section>

      </div>
    </main>
  );
};

export default SuccessStoryPage;