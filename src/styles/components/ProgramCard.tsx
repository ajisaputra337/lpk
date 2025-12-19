// src/styles/components/ProgramCard.tsx

import Link from "next/link";
import Image from "next/image";

interface ProgramCardProps {
  title: string;
  description: string;
  icon: React.ReactNode; // Digunakan sebagai ikon
  imageUrl: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  title,
  description,
  icon,
  imageUrl,
}) => {
  // Fungsi untuk mengkonversi title menjadi slug URL yang bersih
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return (
    // Menggunakan slug yang lebih bersih
    <Link href={`/program/${slug}`} className="group block h-full">
      <div className="flex h-full flex-col rounded-lg border border-gray-100 bg-white p-0 shadow-sm transition-all duration-300 hover:border-red-700 hover:shadow-xl">
        {/* Area Foto / Gambar */}
        <div className="relative h-40 w-full overflow-hidden rounded-t-lg bg-gray-100">
          <Image
            src={imageUrl}
            alt={`Gambar Program ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
            className="transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Konten Card (p-6) */}
        <div className="flex flex-grow flex-col p-6">
          {/* Header: Icon dan Title */}
          <div className="mb-3 flex items-center">
            {/* Area Icon (Menggunakan properti icon) */}
            <div className="mr-3 flex-shrink-0 text-red-700">{icon}</div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-800 transition-colors group-hover:text-red-700">
              {title}
            </h3>
          </div>

          {/* Deskripsi */}
          <p className="mb-4 flex-grow text-sm text-gray-600">{description}</p>

          {/* Footer / Call to Action */}
          <span className="mt-auto inline-flex items-center font-medium text-red-600">
            Lihat Detail Program →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProgramCard;
