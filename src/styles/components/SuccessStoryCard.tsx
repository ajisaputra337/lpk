import React from 'react';
// import Image from 'next/image'; // Gunakan jika Anda mengimplementasikan gambar Next/Image

interface SuccessStoryCardProps {
  quote: string;
  name: string;
  job: string;
  country: string; // Misal: 'Osaka, Jepang'
  // imageUrl: string; // Jika menggunakan gambar asli
}

const SuccessStoryCard: React.FC<SuccessStoryCardProps> = ({ quote, name, job, country }) => {
  return (
    // Kartu yang bersih dengan bayangan lembut (Japanese Minimalist)
    <div className="flex flex-col rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
      
      {/* Kutipan Testimoni */}
      <blockquote className="mb-6 text-lg italic text-gray-700">
        <span className="text-3xl text-red-700 font-serif mr-1">“</span>
        {quote}
        <span className="text-3xl text-red-700 font-serif ml-1">”</span>
      </blockquote>

      {/* Garis pemisah yang halus */}
      <hr className="mb-4 border-gray-100" />

      {/* Profil Siswa */}
      <div className="flex items-center">
        {/* Placeholder Foto Profil */}
        <div className="mr-4 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold text-sm">
          {name.charAt(0)} 
        </div>

        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{job}</p>
          <p className="text-xs text-gray-400">{country}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoryCard;