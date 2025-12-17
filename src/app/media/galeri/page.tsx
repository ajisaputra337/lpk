import { Camera, Video } from "lucide-react";
import Image from "next/image"; // Menggunakan Image Next.js
import React from "react";

// --- INTERFACE ---
interface GalleryItem {
  type: "image" | "video";
  title: string;
  src: string;
  description: string;
  icon: React.ReactNode;
}

// --- Data Placeholder ---
const galleryItems: GalleryItem[] = [
  {
    type: "image",
    title: "Sesi Pelatihan Fisik Pagi",
    src: "/", // Ganti dummy sementara agar valid url
    description: "Membangun mental dan fisik yang kuat adalah prioritas utama.",
    icon: <Camera className="h-5 w-5 text-white" />,
  },
  {
    type: "video",
    title: "Review Kehidupan Siswa Asrama",
    src: "dQw4w9WgXcQ",
    description: "Lihat kegiatan sehari-hari siswa di asrama Aishiro Gakuen.",
    icon: <Video className="h-5 w-5 text-white" />,
  },
  {
    type: "image",
    title: "Kelas Bahasa Jepang Intensif",
    src: "/",
    description: "Fokus pada N3/N4 untuk persiapan kerja langsung.",
    icon: <Camera className="h-5 w-5 text-white" />,
  },
  {
    type: "image",
    title: "Upacara Pelepasan ke Jepang",
    src: "/",
    description: "Momen haru keberangkatan siswa menuju masa depan di Jepang.",
    icon: <Camera className="h-5 w-5 text-white" />,
  },
  {
    type: "video",
    title: "Wawancara dengan Lulusan Sukses",
    src: "dQw4w9WgXcQ",
    description: "Kisah inspiratif dari alumni yang telah bekerja di Osaka.",
    icon: <Video className="h-5 w-5 text-white" />,
  },
  {
    type: "image",
    title: "Fasilitas Kelas & Belajar",
    src: "/",
    description: "Lingkungan belajar yang kondusif dan modern.",
    icon: <Camera className="h-5 w-5 text-white" />,
  },
];

// --- Komponen Kartu Galeri ---
const GalleryCard: React.FC<{ item: GalleryItem }> = ({ item }) => {
  const mediaContent =
    item.type === "video" ? (
      <iframe
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        src={`https://www.youtube.com/embed/${item.src}?autoplay=0&controls=1`}
        title={item.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      ></iframe>
    ) : (
      <div className="relative h-full w-full overflow-hidden">
        {/* Menggunakan Next Image */}
        <Image
          src={item.src}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-red-700 opacity-20 transition-opacity group-hover:opacity-0"></div>
      </div>
    );

  return (
    <div className="group relative transform overflow-hidden rounded-lg border-2 border-red-100 bg-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
      <div className="relative h-56 w-full bg-gray-200">{mediaContent}</div>
      <div className="p-4">
        <div className="mb-2 flex items-center">
          <span
            className={`mr-3 rounded-full p-1 ${item.type === "video" ? "bg-blue-600" : "bg-red-700"}`}
          >
            {item.icon}
          </span>
          <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
        </div>
        <p className="text-sm text-gray-600">{item.description}</p>
      </div>
    </div>
  );
};

// --- Halaman Utama Galeri ---
const GalleryPage: React.FC = () => {
  return (
    <main className="pt-20">
      {/* HERO GALERI */}
      <section className="relative overflow-hidden bg-gray-900 py-24 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 0 L50 25 L75 0 L100 25 L50 75 L0 25 L25 0 z M50 25 L75 50 L50 75 L25 50 L50 25 z' fill='none' stroke='%23ff0000' stroke-width='1.5' /%3E%3C/svg%3E")`,
            backgroundSize: "150px 150px",
          }}
        ></div>

        <div className="absolute top-0 left-0 z-10 h-full w-2 bg-red-700/70"></div>
        <div className="absolute top-0 right-0 z-10 h-full w-2 bg-red-700/70"></div>

        <div className="relative z-20 mx-auto max-w-7xl px-6 text-center">
          <h1 className="mb-4 inline-block border-b-4 border-red-700/50 px-4 pb-2 text-4xl font-extrabold md:text-5xl">
            Galeri Aishiro Gakuen
          </h1>
          <p className="mx-auto mt-4 mb-2 max-w-2xl text-lg text-gray-300">
            Saksikan langsung dedikasi dan perjalanan para siswa melalui foto
            dan video eksklusif. Inilah bukti nyata dari pelatihan disiplin dan
            keberangkatan ke Jepang.
          </p>
        </div>
      </section>

      {/* BAGIAN GRID GALERI */}
      <section className="relative overflow-hidden bg-gray-50 py-20">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 100 100'%3E%3Cpath fill='none' stroke='%23dc2626' stroke-width='1.5' d='M 0 50 C 50 100, 50 100, 100 50 C 50 0, 50 0, 0 50'/%3E%3C/svg%3E")`,
            backgroundSize: "300px 300px",
          }}
        ></div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item, index) => (
              <GalleryCard key={index} item={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default GalleryPage;
