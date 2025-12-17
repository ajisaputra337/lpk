import React from "react";
// import Image from 'next/image'; // Gunakan jika Anda mengimplementasikan gambar Next/Image

interface SuccessStoryCardProps {
  quote: string;
  name: string;
  role: string;
  country: string; // Misal: 'Osaka, Jepang'
  // imageUrl: string; // Jika menggunakan gambar asli
}

const SuccessStoryCard: React.FC<SuccessStoryCardProps> = ({
  quote,
  name,
  role,
  country,
}) => {
  return (
    // Kartu yang bersih dengan bayangan lembut (Japanese Minimalist)
    <div className="flex flex-col rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
      {/* Kutipan Testimoni */}
      <blockquote className="mb-6 text-lg text-gray-700 italic">
        <span className="mr-1 font-serif text-3xl text-red-700">“</span>
        {quote}
        <span className="ml-1 font-serif text-3xl text-red-700">”</span>
      </blockquote>

      {/* Garis pemisah yang halus */}
      <hr className="mb-4 border-gray-100" />

      {/* Profil Siswa */}
      <div className="flex items-center">
        {/* Placeholder Foto Profil */}
        <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700">
          {name.charAt(0)}
        </div>

        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
          <p className="text-xs text-gray-400">{country}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoryCard;
