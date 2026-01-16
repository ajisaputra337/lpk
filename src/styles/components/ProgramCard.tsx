"use client"; // Tambahkan ini karena pakai useTranslations

import { Link } from "../../i18n/routing"; // Ganti import link
import Image from "next/image";
import { useTranslations } from "next-intl"; // Tambah ini

interface ProgramCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
  href: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  title,
  description,
  icon,
  imageUrl,
  href,
}) => {
  const t = useTranslations("ProgramCard"); // Hook untuk terjemahan

  return (
    // Menggunakan slug yang lebih bersih
    <Link href={href} className="group block h-full">
      <div className="flex h-full flex-col rounded-lg border border-gray-100 bg-white p-0 shadow-sm transition-all duration-300 hover:border-red-700 hover:shadow-xl">
        {/* Area Foto / Gambar */}
        <div className="relative h-40 w-full overflow-hidden rounded-t-lg bg-gray-100">
          <Image
            src={imageUrl}
            alt={`${t("altText")} ${title}`} // Alt teks dinamis
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
            {t("button")} →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProgramCard;