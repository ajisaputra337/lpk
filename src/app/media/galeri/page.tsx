import Link from 'next/link';
import { Camera, Video, ArrowRight } from 'lucide-react';
import React from 'react';

// --- INTERFACE (Tipe Data) untuk item galeri ---
interface GalleryItem {
    type: 'image' | 'video';
    title: string;
    src: string; // ID YouTube atau URL Gambar
    description: string;
    icon: React.ReactNode;
}

// --- Data Placeholder Galeri (Menggunakan tipe GalleryItem) ---
const galleryItems: GalleryItem[] = [
    { 
        type: 'image', 
        title: 'Sesi Pelatihan Fisik Pagi', 
        src: 'uploaded:image_c1dec0.jpg-fe5f2d27-5915-4cbd-aaa1-df613748ad91', 
        description: 'Membangun mental dan fisik yang kuat adalah prioritas utama.',
        icon: <Camera className="h-5 w-5 text-white" />
    },
    { 
        type: 'video', 
        title: 'Review Kehidupan Siswa Asrama', 
        src: 'dQw4w9WgXcQ', // Placeholder ID YouTube
        description: 'Lihat kegiatan sehari-hari siswa di asrama Aishiro Gakuen.',
        icon: <Video className="h-5 w-5 text-white" />
    },
    { 
        type: 'image', 
        title: 'Kelas Bahasa Jepang Intensif', 
        src: 'https://images.unsplash.com/photo-1549487928-8b7a66129596?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', // Contoh placeholder image
        description: 'Fokus pada N3/N4 untuk persiapan kerja langsung.',
        icon: <Camera className="h-5 w-5 text-white" />
    },
    { 
        type: 'image', 
        title: 'Upacara Pelepasan ke Jepang', 
        src: 'https://images.unsplash.com/photo-1563207185-3e284a141d08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', // Contoh placeholder image
        description: 'Momen haru keberangkatan siswa menuju masa depan di Jepang.',
        icon: <Camera className="h-5 w-5 text-white" />
    },
    { 
        type: 'video', 
        title: 'Wawancara dengan Lulusan Sukses', 
        src: 'qS2PjN6x7y8', // Placeholder ID YouTube
        description: 'Kisah inspiratif dari alumni yang telah bekerja di Osaka.',
        icon: <Video className="h-5 w-5 text-white" />
    },
    { 
        type: 'image', 
        title: 'Fasilitas Kelas & Belajar', 
        src: 'https://images.unsplash.com/photo-1561732501-f2f281e01869?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', // Contoh placeholder image
        description: 'Lingkungan belajar yang kondusif dan modern.',
        icon: <Camera className="h-5 w-5 text-white" />
    },
];

// --- Komponen Kartu Galeri ---
const GalleryCard: React.FC<{ item: GalleryItem }> = ({ item }) => {
    
    const mediaContent = item.type === 'video' ? (
        <iframe
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={`https://www.youtube.com/embed/${item.src}?autoplay=0&controls=1`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
        ></iframe>
    ) : (
        <div className="relative w-full h-full overflow-hidden">
            <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-red-700 opacity-20 group-hover:opacity-0 transition-opacity"></div>
        </div>
    );

    return (
        <div className="group relative bg-white rounded-lg overflow-hidden shadow-xl border-2 border-red-100 transform hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
            <div className="w-full h-56 bg-gray-200">
                {mediaContent}
            </div>
            <div className="p-4">
                <div className="flex items-center mb-2">
                    <span className={`p-1 mr-3 rounded-full ${item.type === 'video' ? 'bg-blue-600' : 'bg-red-700'}`}>
                        {item.icon}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800">
                        {item.title}
                    </h3>
                </div>
                <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
        </div>
    );
}

// --- Halaman Utama Galeri ---
const GalleryPage: React.FC = () => {
  return (
    <>
      {/* <Header /> (Silakan tambahkan komponen Header di sini) */} 
      <main className="pt-20"> 
        
        {/* HERO GALERI DENGAN POLA ASANOHA */}
        <section className="py-24 relative overflow-hidden text-white bg-gray-900">
            
            {/* 1. Pola Asanoha (Pola Geometris Daun Hemp) */}
            <div className="absolute inset-0 opacity-10"
                 style={{
                     // Pola Asanoha (Pola heksagonal khas Jepang)
                     backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 0 L50 25 L75 0 L100 25 L50 75 L0 25 L25 0 z M50 25 L75 50 L50 75 L25 50 L50 25 z' fill='none' stroke='%23ff0000' stroke-width='1.5' /%3E%3C/svg%3E")`,
                     backgroundSize: '150px 150px'
                 }}
            ></div>
            
            {/* 2. Dekorasi Garis Kiri & Kanan (Merah) */}
            <div className="absolute top-0 left-0 h-full w-2 bg-red-700/70 z-10"></div>
            <div className="absolute top-0 right-0 h-full w-2 bg-red-700/70 z-10"></div>
            
            {/* Konten Teks */}
            <div className="mx-auto max-w-7xl px-6 relative z-20 text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 border-b-4 border-red-700/50 inline-block px-4 pb-2">
                Galeri Aishiro Gakuen
              </h1>
              <p className="text-lg text-gray-300 mb-2 max-w-2xl mx-auto mt-4">
                Saksikan langsung dedikasi dan perjalanan para siswa melalui foto dan video eksklusif. 
                Inilah bukti nyata dari pelatihan disiplin dan keberangkatan ke Jepang.
              </p>              
            </div>
        </section>
        
        {/* BAGIAN GRID GALERI (Tidak Berubah) */}
        <section className="py-20 bg-gray-50 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05]" 
                 style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 100 100'%3E%3Cpath fill='none' stroke='%23dc2626' stroke-width='1.5' d='M 0 50 C 50 100, 50 100, 100 50 C 50 0, 50 0, 0 50'/%3E%3C/svg%3E")`, 
                    backgroundSize: '300px 300px'
                 }}
            ></div>

            <div className="mx-auto max-w-7xl px-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {galleryItems.map((item, index) => (
                        <GalleryCard key={index} item={item} />
                    ))}
                </div>
            </div>
        </section>

        {/* Placeholder untuk Footer */}
      </main>
    </>
  );
};

export default GalleryPage;