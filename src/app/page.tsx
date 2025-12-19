// src/app/page.tsx

"use client";
import Link from "next/link";
import Image from "next/image";
import Header from "../styles/components/Header";
import Profile from "../styles/components/Profile";
import ProgramCard from "../styles/components/ProgramCard";
import SuccessStoryCard from "../styles/components/SuccessStoryCard";
import { BookOpen, Zap, Users } from "lucide-react";
import { alumni } from "../data/alumni";

// Data nomor wa
const whatsappLink =
  "https://wa.me/6288215751500?text=Halo%2C%20saya%20tertarik%20dengan%20program%20LPK%20Aishiro%20Gakuen%20dan%20ingin%20mendaftar.%20Mohon%20info%20lebih%20lanjut.";

// Program Card
const programs = [
  {
    title: "Magang Jepang",
    description:
      "Panduan lengkap tahapan magang kerja di Jepang mulai dari seleksi, pelatihan, hingga penempatan.",
    icon: <Zap className="h-6 w-6" />,
    imageUrl: "/Images/magang.jpg",
  },
  {
    title: "Sekolah jepang",
    description:
      "Panduan lengkap tahapan sekolah di jepang hingga pemberangkatan.",
    icon: <BookOpen className="h-6 w-6" />,
    imageUrl: "/Images/sekolah-jepang.webp",
  },
  {
    title: "Tokutei Ginou",
    description: "Persiapan intensif untuk Tokutei Ginou",
    icon: <Users className="h-6 w-6" />,
    imageUrl: "/Images/kaigo.webp",
  },
];

// Komponen Hiasan Jepang (Tidak Diubah)
const JapaneseDecoration = ({ type = "sakura", className = "" }) => {
  switch (type) {
    case "sakura":
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
    case "wave":
      return (
        <svg
          className={`absolute opacity-5 ${className}`}
          width="120"
          height="40"
          viewBox="0 0 120 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,20 C15,0 35,40 55,20 C75,0 95,40 115,20 L115,40 L0,40 Z"
            fill="#dc2626"
          />
          <path
            d="M0,30 C10,15 25,35 40,25 C55,15 70,35 85,25 C100,15 115,35 120,30 L120,40 L0,40 Z"
            fill="#ef4444"
            opacity="0.7"
          />
        </svg>
      );
    case "shippo":
      return (
        <svg
          className={`absolute opacity-5 ${className}`}
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="30" cy="30" r="25" stroke="#dc2626" strokeWidth="1" />
          <circle cx="30" cy="30" r="15" stroke="#ef4444" strokeWidth="1" />
          <line
            x1="5"
            y1="30"
            x2="55"
            y2="30"
            stroke="#dc2626"
            strokeWidth="0.5"
          />
          <line
            x1="30"
            y1="5"
            x2="30"
            y2="55"
            stroke="#dc2626"
            strokeWidth="0.5"
          />
          <line
            x1="10"
            y1="10"
            x2="50"
            y2="50"
            stroke="#ef4444"
            strokeWidth="0.5"
          />
          <line
            x1="50"
            y1="10"
            x2="10"
            y2="50"
            stroke="#ef44f4"
            strokeWidth="0.5"
          />
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
        <section className="relative h-[600px] overflow-hidden bg-gray-50">
          {/* Background Image menggunakan Next Image Component */}
          <div className="absolute inset-0">
            <Image
              src="/Images/kyoto.jpg"
              alt="Background Kota Jepang"
              fill
              priority // Penting untuk LCP
              className="object-cover brightness-50" // brightness(60%) diubah ke class tailwind
            />
          </div>

          {/* Hiasan Sakura Floating */}
          <JapaneseDecoration
            type="sakura"
            className="animate-float-slow top-10 left-10"
          />
          <JapaneseDecoration
            type="sakura"
            className="animate-float-medium top-1/4 right-16"
          />
          <JapaneseDecoration
            type="sakura"
            className="animate-float-fast bottom-20 left-1/4"
          />
          <JapaneseDecoration
            type="sakura"
            className="animate-float-slow right-10 bottom-10"
          />

          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
            <div className="w-full max-w-xl text-left">
              <h1 className="mb-4 text-4xl leading-tight font-extrabold text-white md:text-5xl">
                Wujudkan <span className="text-yellow-500">Mimpimu</span> <br />{" "}
                Belajar & Berkarir di{" "}
                <span className="text-red-500">Jepang</span>
              </h1>
              <p className="mb-8 text-lg text-gray-200">
                Bersama Aishiro Gakuen, Gapailah Masa Depan Gemilang.
              </p>
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md transition-colors hover:bg-red-800"
              >
                <Image
                  src="/Images/daftarsekarang.png"
                  alt="Daftar Sekarang"
                  width={300}
                  height={42}
                  className="object-contain"
                />
              </Link>
            </div>
          </div>
        </section>

        {/*Tentang Kami*/}
        <section id="Profile">
          <Profile />
        </section>

        {/* --- */}

        {/* Section Program Unggulan */}
        <section className="relative overflow-hidden bg-white py-20">
          {/* Hiasan Sakura Floating */}
          <JapaneseDecoration
            type="sakura"
            className="animate-float-slow top-10 left-10"
          />
          <JapaneseDecoration
            type="sakura"
            className="animate-float-medium top-1/3 right-20"
          />
          <JapaneseDecoration
            type="sakura"
            className="animate-float-fast bottom-20 left-1/4"
          />
          <JapaneseDecoration
            type="sakura"
            className="animate-float-slow right-10 bottom-10"
          />

          {/* Background Pattern Jepang (Subtle) - Tidak diubah */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute top-0 left-0 h-full w-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23dc2626' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                backgroundSize: "300px",
              }}
            ></div>
          </div>

          <div className="relative z-10">
            <div className="mx-auto max-w-7xl px-6">
              {/* Header dengan garis merah Jepang - Tidak diubah */}
              <div className="mb-12 flex flex-col items-center">
                <div className="mb-4 h-1 w-24 rounded-full bg-red-700"></div>
                <h2 className="text-center text-3xl font-bold text-gray-800">
                  Program Unggulan Kami
                </h2>
                <div className="mt-4 h-1 w-24 rounded-full bg-red-700"></div>
              </div>

              {/* Grid untuk Kartu Program - Tidak diubah */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {programs.map((program) => (
                  <ProgramCard
                    key={program.title}
                    title={program.title}
                    description={program.description}
                    icon={program.icon}
                    imageUrl={program.imageUrl}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- */}

        {/* BAGIAN SUCCESS STORY */}
        <section className="relative overflow-hidden bg-white py-20">
          {/* Hiasan Sakura Floating */}
          <JapaneseDecoration
            type="sakura"
            className="animate-float-slow top-10 left-10"
          />
          <JapaneseDecoration
            type="sakura"
            className="animate-float-medium top-1/4 right-16"
          />
          <JapaneseDecoration
            type="sakura"
            className="animate-float-fast bottom-20 left-1/4"
          />
          <JapaneseDecoration
            type="sakura"
            className="animate-float-slow right-10 bottom-10"
          />

          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <div className="mb-12 flex flex-col items-center">
              <h2 className="mb-4 text-center text-3xl font-bold text-gray-800">
                成功ストーリー
              </h2>
              <p className="mb-6 text-center text-lg text-gray-600">
                Mereka yang Sukses di{" "}
                <span className="text-red-500">Jepang</span>
              </p>
              <div className="h-1 w-20 rounded-full bg-red-700"></div>
            </div>

            {/* Grid untuk Testimoni */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {alumni
                .slice(-3)
                .reverse()
                .map((person) => (
                  <SuccessStoryCard
                    key={person.id}
                    name={person.nama}
                    angkatan={person.angkatan}
                    tanggalLahir={person.tanggalLahir}
                    alamat={person.alamat}
                    job={person.job}
                    perusahaan={person.perusahaan}
                    img={person.img}
                  />
                ))}
            </div>
          </div>
        </section>

        {/* --- */}

        {/* LOKASI GOOGLE MAPS */}
        <section className="relative overflow-hidden bg-white py-20">
          {/* Background dengan motif asanoha (pattern tradisional Jepang) - Tidak diubah */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0 L100,0 L100,100 L0,100 Z' fill='none' stroke='%23dc2626' stroke-width='2'/%3E%3Cpath d='M50,0 L50,100 M0,50 L100,50' stroke='%23dc2626' stroke-width='1' stroke-dasharray='5,5'/%3E%3C/svg%3E")`,
                backgroundSize: "200px",
              }}
            ></div>
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <div className="mb-12 flex flex-col items-center">
              <div className="mb-6 flex items-center">
                <div className="mr-4 h-8 w-8 rounded-full border-2 border-red-700"></div>
                <h2 className="text-center text-3xl font-bold text-gray-800">
                  所在地
                </h2>
                <div className="ml-4 h-8 w-8 rounded-full border-2 border-red-700"></div>
              </div>
              <p className="mb-2 text-center text-lg text-gray-600">
                Temukan Lokasi Kami
              </p>
              <div className="h-1 w-32 rounded-full bg-gradient-to-r from-red-700 to-transparent"></div>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row">
              {/* Informasi Kontak Ringkas dengan desain Jepang - Tidak diubah */}
              <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-lg lg:w-1/3">
                {/* Corner Decoration */}
                <div className="absolute top-0 right-0 h-12 w-12">
                  <div className="h-full w-full rounded-bl-lg border-t-2 border-r-2 border-red-700"></div>
                </div>

                <h3 className="mb-4 flex items-center text-2xl font-bold text-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-6 w-6 text-red-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Informasi Alamat
                </h3>
                <p className="mb-6 leading-relaxed text-gray-700">
                  Anda dapat mengunjungi kami di lokasi berikut untuk konsultasi
                  atau pendaftaran langsung.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start rounded-lg bg-red-50 p-3 transition-colors hover:bg-red-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mt-1 mr-3 h-5 w-5 flex-shrink-0 text-red-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657A8 8 0 1117.657 16.657z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800">
                        LPK Aishiro Gakuen
                      </p>
                      <p className="text-gray-700">
                        Jl. Pendidikan No. 12 Semarang, Jawa Tengah
                      </p>
                    </div>
                  </div>
                  <div className="rounded-r-lg border-l-4 border-red-700 bg-gray-50 p-3">
                    <p className="text-sm text-gray-600 italic">
                      Kualitas pendidikan adalah prioritas utama kami dalam
                      membangun masa depan Anda.
                    </p>
                  </div>
                </div>
              </div>

              {/* Peta Google Maps (Ganti src dengan embed code Anda yang sebenarnya) */}
              <div className="relative h-80 w-full overflow-hidden rounded-xl border-2 border-red-700 shadow-2xl md:h-96 lg:w-2/3">
                {/* Corner Accents - Tidak diubah */}
                <div className="absolute top-0 left-0 z-20 h-6 w-6 border-t-2 border-l-2 border-red-700"></div>
                <div className="absolute top-0 right-0 z-20 h-6 w-6 border-t-2 border-r-2 border-red-700"></div>
                <div className="absolute bottom-0 left-0 z-20 h-6 w-6 border-b-2 border-l-2 border-red-700"></div>
                <div className="absolute right-0 bottom-0 z-20 h-6 w-6 border-r-2 border-b-2 border-red-700"></div>

                <iframe
                  title="Google Maps Lokasi LPK Aishiro Gakuen"
                  // GANTI URL INI DENGAN EMBED MAPS LOKASI ASLI ANDA
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

        {/* CSS untuk animasi - Tidak diubah */}
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
      </main>
    </>
  );
};

export default Page;
