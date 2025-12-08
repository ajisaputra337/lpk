// src/app/program/alur-magang/page.tsx
import React from 'react';
import { CheckCircle, Clock, BookOpen, Briefcase, Plane } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';


// Data Tahapan Program
const programSteps = [
    {
        icon: <Clock className="h-6 w-6" />,
        title: 'Tahap 1: Seleksi & Orientasi Awal',
        description: 'Pendaftaran, wawancara, dan tes fisik awal. Penjelasan detail mengenai komitmen, biaya, dan kontrak kerja di Jepang. Ini adalah gerbang masuk pertama.',
    },
    {
        icon: <BookOpen className="h-6 w-6" />,
        title: 'Tahap 2: Pelatihan Bahasa & Budaya Intensif',
        description: 'Fokus utama pada penguasaan bahasa Jepang (Level N5), pelatihan fisik sore yang disiplin, dan pengenalan etos kerja serta budaya Jepang (Horenso, dll.).',
    },
    {
        icon: <CheckCircle className="h-6 w-6" />,
        title: 'Tahap 3: Tes Kemampuan (Skill Test)',
        description: 'Ujian kemampuan fisik dan bahasa Jepang formal. Dilanjutkan dengan wawancara kerja teknis dengan perusahaan Jepang (Shoukai) yang dipilih berdasarkan hasil seleksi.',
    },
    {
        icon: <Briefcase className="h-6 w-6" />,
        title: 'Tahap 4: Pengurusan Dokumen & Visa',
        description: 'Setelah mendapatkan kepastian kerja, fokus pada persiapan dokumen keberangkatan, pengurusan Certificate of Eligibility (CoE), dan aplikasi visa kerja.',
    },
    {
        icon: <Plane className="h-6 w-6" />,
        title: 'Tahap 5: Keberangkatan & Penempatan Kerja',
        description: 'Keberangkatan ke Jepang, penjemputan oleh pihak perusahaan/serikat kerja (Kumiai), dan penempatan di lokasi kerja. Mulai menjalankan kontrak magang 3 tahun.',
    },
];

// Komponen Reusable untuk setiap Langkah Timeline
interface TimelineStepProps {
    step: number;
    icon: React.ReactNode;
    title: string;
    description: string;
    isLast: boolean;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ step, icon, title, description, isLast }) => (
    <div className="flex relative pb-12">
        {/* Garis Vertikal (Timeline Connector) */}
        {/* {!isLast && (
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-full w-0.5 bg-gray-200 pointer-events-none"></div>
            </div>
        )} */}

        {/* Icon/Step Number */}
        <div className="flex-shrink-0 z-10 w-10 h-10 rounded-full inline-flex items-center justify-center text-white bg-red-700">
            {icon}
        </div>

        {/* Konten Langkah */}
        <div className="flex-grow pl-6">
            <div className="flex items-center mb-1">
                <h3 className="font-bold text-xl text-gray-800 mr-2">{title}</h3>
            </div>
            <p className="leading-relaxed text-gray-600">
                {description}
            </p>
        </div>
    </div>
);


const AlurMagangPage = () => {
  return (
    // Menggunakan pt-24 untuk mengimbangi fixed header
    <main className="pt-24 pb-16 bg-white">
      <div className="mx-auto max-w-7xl px-6">

        {/* Breadcrumb / Navigasi */}
        <div className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-red-700">Home</Link> 
            <span className="mx-1 text-gray-400">/</span> {/* PEMISAH 1 */}
            
            <span className="font-semibold text-gray-700">Alur Magang Jepang</span>
        </div>
        
        {/* Hero Section Halaman Internal */}
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                Alur Program Magang Jepang
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Pelajari setiap tahapan secara detail, mulai dari persiapan awal di Indonesia hingga penempatan kerja Anda di Jepang.
            </p>
        </div>

        {/* Bagian Timeline (Alur Program) */}
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
                5 Tahap Menuju Karir di Jepang
            </h2>
            
            <div className="p-6 md:p-10 border rounded-xl shadow-lg bg-gray-50">
                {programSteps.map((step, index) => (
                    <TimelineStep
                        key={index}
                        step={index + 1}
                        icon={step.icon}
                        title={step.title}
                        description={step.description}
                        isLast={index === programSteps.length - 1}
                    />
                ))}
            </div>
        </div>

        {/*Foto diagram alur*/}
        <div className="max-w-6xl mx-auto mt-16 space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center">
                Visualisasi Diagram Alur
            </h2>
            
            {/* Diagram Alur 1: Program Pemerintah (JM Japan) */}
            <div className="text-center">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                    Alur Pendidikan dan Pelatihan Aishiro Gakuen
                </h3>
                <div className="relative w-full h-auto" style={{ height: '500px' }}> {/* Gunakan tinggi relatif untuk layout */}
                    <Image
                        src="/Images/alur_penerimaan_magang.jpeg" // Ganti dengan path foto 1 Anda
                        alt="Diagram Alur Program Magang Pemerintah JM Japan"
                        fill // Mengisi div parent dan responsif
                        style={{ objectFit: 'contain' }} // Memastikan gambar tidak terpotong
                        priority // Karena ini konten utama
                    />
                </div>
            </div>

            {/* Diagram Alur 2: Alur Pendidikan LPK */}
            <div className="text-center">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                    Alur Pendidikan dan Pelatihan IM JAPAN
                </h3>
                 <div className="relative w-full h-auto" style={{ height: '500px' }}> {/* Gunakan tinggi relatif untuk layout */}
                    <Image
                        src="/Images/alur_im_japan.jpeg" // Ganti dengan path foto 2 Anda
                        alt="Diagram Alur Pendidikan dan Pelatihan LPK Aishiro"
                        fill
                        style={{ objectFit: 'contain' }}
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