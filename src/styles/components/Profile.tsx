// src/components/Profile.tsx

import React from "react";
import { Landmark, Briefcase, Smile } from "lucide-react";

// Komponen Hiasan Sakura
const SakuraDecoration = ({ className = "" }) => {
  return (
    <svg
      className={`absolute opacity-50 ${className}`}
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40 10C40 10 45 20 55 20C65 20 70 10 70 10C70 10 65 0 55 0C45 0 40 10 40 10Z"
        fill="#ef4444"
      />
      <path
        d="M60 30C60 30 65 40 75 40C85 40 90 30 90 30C90 30 85 20 75 20C65 20 60 30 60 30Z"
        fill="#ef4444"
        transform="translate(-20,-20)"
      />
      <path
        d="M20 40C20 40 25 50 35 50C45 50 50 40 50 40C50 40 45 30 35 30C25 30 20 40 20 40Z"
        fill="#ef4444"
      />
      <path
        d="M30 60C30 60 35 70 45 70C55 70 60 60 60 60C60 60 55 50 45 50C35 50 30 60 30 60Z"
        fill="#ef4444"
      />
    </svg>
  );
};

const Profile: React.FC = () => {
  return (
    <section id="Profile" className="relative overflow-hidden bg-white py-20">
      {/* Hiasan Sakura Floating */}
      <SakuraDecoration className="animate-float-slow top-10 left-10" />
      <SakuraDecoration className="animate-float-medium top-1/4 right-16" />
      <SakuraDecoration className="animate-float-fast bottom-20 left-1/4" />
      <SakuraDecoration className="animate-float-slow right-10 bottom-10" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header Section dengan Aksen Merah */}
        <div className="mb-16 flex flex-col items-center">
          <h2 className="text-4xl font-extrabold tracking-wider text-gray-800">
            Mengenal <span className="text-red-700">Aishiro</span>{" "}
            <span className="text-yellow-500">Gakuen</span>
          </h2>
          <p className="mt-2 text-xl text-gray-600 italic">
            Membangun Disiplin, Meraih Masa Depan
          </p>
          <div className="mt-4 h-1.5 w-32 rounded-full bg-red-700"></div>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Kolom Kiri: VIDEO YOUTUBE dan Poin Utama (Lebar 1/3) */}
          <div className="relative w-full lg:w-1/3">
            {/* START MODIFIKASI: Menggunakan Aspect Ratio 16:9 */}
            <div className="relative w-full transform overflow-hidden rounded-2xl border-4 border-red-700 pt-[56.25%] shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
              <iframe
                // iframe harus absolut agar mengisi div rasio (pt-[56.25%])
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/moYG25nBxNg"
                title="Video Profil LPK Aishiro Gakuen"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            {/* END MODIFIKASI */}

            {/* Kartu Poin Keunggulan */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start rounded-lg border-l-4 border-red-700 bg-red-50 p-4 shadow-md">
                <Landmark className="mt-1 mr-1 h-6 w-6 flex-shrink-0 text-red-700" />
                <div>
                  <p className="font-bold text-gray-800">
                    Legalitas & Kepercayaan
                  </p>
                  <p className="text-sm text-gray-600">
                    Didirikan sejak 2009, dipercaya Disnaker dan menjadi
                    pendamping LPTKS.
                  </p>
                </div>
              </div>
              <div className="flex items-start rounded-lg border-l-4 border-red-700 bg-red-50 p-4 shadow-md">
                <Briefcase className="mt-1 mr-1 h-6 w-6 flex-shrink-0 text-red-700" />
                <div>
                  <p className="font-bold text-gray-800">
                    Fokus Penempatan Kerja
                  </p>
                  <p className="text-sm text-gray-600">
                    Spesialisasi di Jepang (Magang Teknik).
                  </p>
                </div>
              </div>
              <div className="flex items-start rounded-lg border-l-4 border-red-700 bg-red-50 p-4 shadow-md">
                <Smile className="mt-1 mr-1 h-6 w-6 flex-shrink-0 text-red-700" />
                <div>
                  <p className="font-bold text-gray-800">
                    Mental Disiplin (Kibishii)
                  </p>
                  <p className="text-sm text-gray-600">
                    Menyiapkan siswa dengan etos kerja, kedisiplinan, dan
                    kemandirian tinggi.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Konten Pendahuluan (Teks Utama) (Lebar 2/3) */}
          <div className="w-full space-y-6 text-gray-700 lg:w-2/3">
            {/* Paragraf 1 */}
            <div className="rounded-lg border-t-4 border-red-700 bg-gray-50 p-6 shadow-inner">
              <p className="text-lg leading-relaxed">
                <span className="font-bold text-red-700">
                  LPK Aishiro Gakuen
                </span>
                , berdiri sejak tahun 2009 di Semarang, Jawa Tengah, berdedikasi
                dalam pendidikan dan pelatihan kerja. Dengan izin resmi dari
                Dinas Tenaga Kerja dan Dinas Pendidikan, misi utama kami adalah
                meningkatkan kualitas dan keterampilan usia kerja, bertujuan
                untuk mengurangi kemiskinan dan pengangguran. Kami mempersiapkan
                Anda untuk bersaing di pasar kerja lokal maupun internasional.
              </p>
              <p className="mt-4 text-lg leading-relaxed">
                Kepercayaan dari pemerintah tercermin melalui penetapan kami
                sebagai penyelenggara kegiatan subsidi program gratis dan
                sebagai pendamping Lembaga Penempatan Kerja Swasta (LPTKS) oleh
                Dinas Tenaga Kerja Provinsi Jawa Tengah.{" "}
                <span className="font-semibold italic">
                  Ini adalah tolak ukur kualitas pelatihan yang kami jamin.
                </span>
              </p>
            </div>

            {/* Paragraf 3: Kedisiplinan & Mindset */}
            <div className="rounded-lg bg-red-50 p-6 shadow-lg">
              <h3 className="mb-3 flex items-center text-2xl font-semibold text-red-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 0012 21a12.001 12.001 0 008.618-4.016z"
                  />
                </svg>
                Tujuan Kami: Kokoro Gamae (Mental Kuat)
              </h3>
              <p className="text-lg leading-relaxed">
                Tujuan utama lembaga adalah menyiapkan generasi muda yang siap
                kerja dengan mengedepankan peraturan kedisiplinan (Kokoro Gamae
                - Mentalitas). Siswa dilatih sejak dini untuk hidup mandiri,
                disiplin, dan peduli (care) terhadap lingkungan. Dengan sistem
                pendidikan yang ketat ini, Aishiro Gakuen menjamin lulusan akan
                memiliki mental yang kuat (tidak canggung) dan menjadi aset
                berharga bagi masa depan mereka di dunia kerja global.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS untuk animasi */}
      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-5deg);
          }
        }

        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
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
    </section>
  );
};

export default Profile;
