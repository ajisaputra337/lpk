// src/app/program/magang-jepang/page.tsx
import React from "react";
import { CheckCircle, Clock, BookOpen, Briefcase, Plane } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next"; // Import type Metadata

// 1. DEFINISI METADATA
export const metadata: Metadata = {
  title: "Alur Program Magang Jepang 5 Tahap | LPK Aishiro Gakuen",
  description:
    "Pahami 5 Tahap lengkap Program Magang Jepang, mulai dari seleksi awal, pelatihan intensif, tes kemampuan, pengurusan visa (CoE), hingga keberangkatan dan penempatan kerja di Jepang.",
  keywords: [
    "Alur Magang Jepang",
    "Tahapan Magang Jepang",
    "Proses Pendaftaran Magang",
    "Seleksi Magang Jepang",
    "Visa CoE Jepang",
  ],
  openGraph: {
    title: "5 Tahap Alur Program Magang ke Jepang",
    description:
      "Pelajari setiap tahapan secara detail, mulai dari persiapan awal di Indonesia hingga penempatan kerja Anda di Jepang.",
    url: "https://aishiro-gakuen.com/program/magang-jepang", // Ganti dengan URL domain Anda
    siteName: "LPK Aishiro Gakuen",
    type: "website",
    images: [
      {
        url: "/Images/alur_penerimaan_magang.jpeg", // Gambar yang relevan (misalnya diagram alur)
        width: 1200,
        height: 630,
        alt: "Diagram Alur Program Magang Jepang",
      },
    ],
  },
};

// Data Tahapan Program
const programSteps = [
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Tahap 1: Seleksi & Orientasi Awal",
    description:
      "Pendaftaran, wawancara, dan tes fisik awal. Penjelasan detail mengenai komitmen, biaya, dan kontrak kerja di Jepang. Ini adalah gerbang masuk pertama.",
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Tahap 2: Pelatihan Bahasa & Budaya Intensif",
    description:
      "Fokus utama pada penguasaan bahasa Jepang (Level N5), pelatihan fisik sore yang disiplin, dan pengenalan etos kerja serta budaya Jepang (Horenso, dll.).",
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "Tahap 3: Tes Kemampuan (Skill Test)",
    description:
      "Ujian kemampuan fisik dan bahasa Jepang formal. Dilanjutkan dengan wawancara kerja teknis dengan perusahaan Jepang (Shoukai) yang dipilih berdasarkan hasil seleksi.",
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: "Tahap 4: Pengurusan Dokumen & Visa",
    description:
      "Setelah mendapatkan kepastian kerja, fokus pada persiapan dokumen keberangkatan, pengurusan Certificate of Eligibility (CoE), dan aplikasi visa kerja.",
  },
  {
    icon: <Plane className="h-6 w-6" />,
    title: "Tahap 5: Keberangkatan & Penempatan Kerja",
    description:
      "Keberangkatan ke Jepang, penjemputan oleh pihak perusahaan/serikat kerja (Kumiai), dan penempatan di lokasi kerja. Mulai menjalankan kontrak magang 3 tahun.",
  },
];

// Komponen Reusable untuk setiap Langkah Timeline
interface TimelineStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const TimelineStep: React.FC<TimelineStepProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="relative flex pb-12">
    {/* Garis Vertikal (Timeline Connector) - Dihilangkan untuk desain ini */}
    {/* {!isLast && (
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-full w-0.5 bg-gray-200 pointer-events-none"></div>
            </div>
        )} */}

    {/* Icon/Step Number */}
    <div className="z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-700 text-white">
      {icon}
    </div>

    {/* Konten Langkah */}
    <div className="flex-grow pl-6">
      <div className="mb-1 flex items-center">
        <h3 className="mr-2 text-xl font-bold text-gray-800">{title}</h3>
      </div>
      <p className="leading-relaxed text-gray-600">{description}</p>
    </div>
  </div>
);

const AlurMagangPage = () => {
  return (
    // Menggunakan pt-24 untuk mengimbangi fixed header
    <main className="bg-white pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Breadcrumb / Navigasi */}
        <div className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-red-700">
            Home
          </Link>
          <span className="mx-1 text-gray-400">/</span> {/* PEMISAH 1 */}
          <span className="font-semibold text-gray-700">
            Alur Magang Jepang
          </span>
        </div>

        {/* Hero Section Halaman Internal */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl">
            Alur Program Magang Jepang
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Pelajari setiap tahapan secara detail, mulai dari persiapan awal di
            Indonesia hingga penempatan kerja Anda di Jepang.
          </p>
        </div>

        {/* Bagian Timeline (Alur Program) */}
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800 md:text-left">
            5 Tahap Menuju Karir di Jepang
          </h2>

          <div className="rounded-xl border bg-gray-50 p-6 shadow-lg md:p-10">
            {programSteps.map((step, index) => (
              <TimelineStep
                key={index}
                icon={step.icon}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>

        {/*Foto diagram alur*/}
        <div className="mx-auto mt-16 max-w-6xl space-y-8">
          <h2 className="text-center text-3xl font-bold text-gray-800">
            Visualisasi Diagram Alur
          </h2>

          {/* Diagram Alur 1: Program Pemerintah (JM Japan) */}
          <div className="text-center">
            <h3 className="mb-4 text-xl font-semibold text-gray-700">
              Alur Pendidikan dan Pelatihan Aishiro Gakuen
            </h3>
            <div className="relative h-auto w-full" style={{ height: "500px" }}>
              {" "}
              {/* Pakai tinggi relatif untuk layout */}
              <Image
                src="/Images/alur_penerimaan_magang.jpeg"
                alt="Diagram Alur Program Magang Pemerintah JM Japan"
                fill // Mengisi div parent dan responsif
                style={{ objectFit: "contain" }} // Memastikan gambar tidak terpotong
                priority // Karena ini konten utama
              />
            </div>
          </div>

          {/* Diagram Alur 2: Alur Pendidikan LPK */}
          <div className="text-center">
            <h3 className="mb-4 text-xl font-semibold text-gray-700">
              Alur Pendidikan dan Pelatihan IM JAPAN
            </h3>
            <div className="relative h-auto w-full" style={{ height: "500px" }}>
              {" "}
              {/* Gunakan tinggi relatif untuk layout */}
              <Image
                src="/Images/alur_im_japan.jpeg"
                alt="Diagram Alur Pendidikan dan Pelatihan LPK Aishiro"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AlurMagangPage;
