// src/components/Profile.tsx

import React from "react";
import { Landmark, Briefcase, Smile } from "lucide-react";

const Profile: React.FC = () => {
  return (
    <section id="Profile" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header Section dengan Aksen Merah */}
        <div className="mb-16 flex flex-col items-center">
          <h2 className="text-4xl font-extrabold tracking-wider text-gray-800">
            Mengenal <span className="text-red-700">Aishiro Gakuen</span>
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
    </section>
  );
};

export default Profile;
