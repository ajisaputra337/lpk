import React from "react";
import Link from "next/link";
import Image from "next/image";

// Data Video YouTube (ID video)
const youtubeVideos = [
  {
    title: "Kegiatan Fisik Sore Calon Magang LPK Aishiro",
    videoId: "eFWoYZvto6A", // ID video YouTube
  },
  {
    title: "PMD Belajar Sore (Fisik Lari)",
    videoId: "w4UUzPjPYTs", // ID video YouTube
  },
];

// Komponen Iframe YouTube yang Responsif
const ResponsiveYouTubeEmbed: React.FC<{ videoId: string; title: string }> = ({
  videoId,
  title,
}) => (
  <div className="w-full">
    <h3 className="mb-2 text-lg font-semibold text-gray-700">{title}</h3>
    {/* Aspect Ratio 16:9 (padding-top: 56.25%) */}
    <div className="relative pt-[56.25%]">
      <iframe
        className="absolute inset-0 h-full w-full rounded-lg shadow-xl"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  </div>
);

const KegiatanFisikSorePage = () => {
  // Asumsi: Anda menyimpan foto grup di public/images/fisik-sore-grup.jpg
  const heroImage = {
    src: "/Images/kegiatan_fisik1.jpg",
    alt: "Foto kegiatan fisik sore LPK Aishiro Gakuen",
    width: 1200, // Tentukan lebar dan tinggi agar Next/Image bekerja
    height: 600,
  };

  return (
    // pt-24 untuk mengimbangi fixed header
    <main className="bg-white pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-red-700">
            Home
          </Link>
          <span className="mx-1 text-gray-400">/</span>
          <span className="font-semibold text-gray-700">
            Kegiatan Fisik Sore
          </span>
        </div>

        {/* Hero Visual dan Deskripsi */}
        <div className="mb-12">
          <h1 className="mb-4 text-center text-4xl font-extrabold text-gray-900 md:text-5xl">
            Kegiatan Fisik Sore
          </h1>
          <p className="mx-auto mb-8 max-w-4xl text-center text-xl text-gray-600">
            Persiapan fisik adalah fondasi utama etos kerja Jepang. Program
            fisik sore kami dirancang untuk membentuk mental baja, daya tahan
            prima, dan disiplin tinggi sebelum keberangkatan.
          </p>

          {/* Foto Besar di Atas */}
          <div className="relative h-96 w-full overflow-hidden rounded-xl shadow-2xl">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>

        {/* Bagian Video YouTube (Bersampingan) */}
        <div className="mt-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
            Video Kegiatan dan Latihan
          </h2>

          {/* Grid 2-Kolom Responsif */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {youtubeVideos.map((video) => (
              <ResponsiveYouTubeEmbed
                key={video.videoId}
                videoId={video.videoId}
                title={video.title}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default KegiatanFisikSorePage;
