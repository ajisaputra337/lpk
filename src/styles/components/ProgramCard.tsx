// src/styles/components/ProgramCard.tsx

import Link from 'next/link';
import Image from 'next/image';

interface ProgramCardProps {
    title: string;
    description: string;
    icon: React.ReactNode; // Digunakan sebagai ikon
    imageUrl: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ title, description, icon, imageUrl }) => {
    // Fungsi untuk mengkonversi title menjadi slug URL yang bersih
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    return (
        // Menggunakan slug yang lebih bersih
        <Link href={`/program/${slug}`} className="group block h-full">
            <div className="flex flex-col rounded-lg border border-gray-100 bg-white p-0 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-red-700 h-full">
                
                {/* Area Foto / Gambar */}
                <div className="relative w-full h-40 overflow-hidden rounded-t-lg bg-gray-100">
                    <Image
                        src={imageUrl}
                        alt={`Gambar Program ${title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                {/* Konten Card (p-6) */}
                <div className="p-6 flex flex-col flex-grow">
                    {/* Header: Icon dan Title */}
                    <div className="flex items-center mb-3">
                        {/* Area Icon (Menggunakan properti icon) */}
                        <div className="text-red-700 mr-3 flex-shrink-0">
                            {icon}
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-red-700 transition-colors">
                            {title}
                        </h3>
                    </div>
                    
                    {/* Deskripsi */}
                    <p className="text-gray-600 flex-grow mb-4 text-sm">{description}</p>

                    {/* Footer / Call to Action */}
                    <span className="mt-auto text-red-600 font-medium inline-flex items-center">
                        Lihat Detail Program →
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ProgramCard;