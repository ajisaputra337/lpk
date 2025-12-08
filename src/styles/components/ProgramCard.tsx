// ProgramCard.tsx - Versi yang Sudah Diperbaiki

import Link from 'next/link';
// HANYA perlu import Image, tipe StaticImageData tidak diperlukan lagi di sini.
import Image from 'next/image'; 

// 🛠️ UBAH: Interface ProgramCardProps
interface ProgramCardProps {
  title: string;
  description: string;
  icon: React.ReactNode; 
  // ✅ UBAH TIPE DATA menjadi string (untuk URL publik)
  imageUrl: string; 
}

const ProgramCard: React.FC<ProgramCardProps> = ({ title, description, icon, imageUrl }) => {
  return (
    <Link href={`/program/${title.toLowerCase().replace(/ /g, '-')}`} className="group block h-full">
        <div className="flex flex-col rounded-lg border border-gray-100 bg-white p-0 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-red-100 h-full">
            
            {/* Area Foto / Gambar */}
            <div className="relative w-full h-40 overflow-hidden rounded-t-lg bg-gray-100">
                <Image
                    // ✅ PASTIKAN TIPE SRC ADALAH STRING (sudah benar)
                    src={imageUrl} 
                    alt={`Gambar Program ${title}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-500 group-hover:scale-105"
                    // ⚠️ CATATAN: Jika Anda mendapat error/peringatan Next.js mengenai
                    // "Image with unknown dimensions", Anda mungkin perlu menambahkan
                    // `unoptimized={true}` atau mendefinisikan `width` dan `height`
                    // (namun ini akan mengganggu 'fill' dan 'objectFit').
                    // Untuk URL publik/path statis, `fill` adalah cara terbaik.
                />
            </div>
            
            {/* Konten Card (p-6) */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Konten Teks */}
                <h3 className="mb-2 text-xl font-semibold text-gray-800 group-hover:text-red-700 transition-colors">{title}</h3>
                <p className="text-gray-600 flex-grow mb-4">{description}</p>                
            </div>
        </div>
    </Link>
  );
};

export default ProgramCard;