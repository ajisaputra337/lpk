"use client";

import Image from "next/image";
import { MapPin, Calendar, Briefcase, Building2 } from "lucide-react";

interface SuccessStoryCardProps {
  name?: string;
  angkatan: string;
  tanggalLahir: string;
  alamat: string;
  job: string;
  perusahaan: string;
  img?: string;
}

export default function SuccessStoryCard({
  name,
  angkatan,
  tanggalLahir,
  alamat,
  job,
  perusahaan,
  img,
}: SuccessStoryCardProps) {
  // 🔒 Anti-crash guard
  const initial = name?.trim()?.charAt(0) ?? "?";
  const safeName = name?.trim() || "Nama Tidak Diketahui";

  return (
    <div className="group relative overflow-hidden rounded-xl border-2 border-red-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-xl">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-white to-red-50/30" />

      <div className="relative flex flex-col gap-4 p-4 sm:flex-row">
        {/* Foto */}
        <div className="relative flex-shrink-0">
          <div className="relative h-32 w-24 overflow-hidden rounded-lg border-3 border-white shadow-lg sm:h-44 sm:w-32">
            {img ? (
              <Image
                src={img}
                alt={safeName}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 96px, 128px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-500 to-red-600">
                <span className="text-4xl font-black text-white sm:text-5xl">
                  {initial}
                </span>
              </div>
            )}
          </div>

          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-red-600 px-3 py-1 text-[10px] font-bold whitespace-nowrap text-white">
            🎓 {angkatan}
          </div>
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1 space-y-2.5">
          <h3 className="line-clamp-2 text-lg leading-tight font-black text-slate-900">
            {safeName}
          </h3>

          <Info
            label="Tanggal Lahir"
            value={tanggalLahir}
            icon={<Calendar className="h-3.5 w-3.5" />}
          />
          <Info
            label="Alamat"
            value={alamat}
            icon={<MapPin className="h-3.5 w-3.5" />}
          />
          <Info
            label="Pekerjaan"
            value={job}
            icon={<Briefcase className="h-3.5 w-3.5" />}
          />
          <Info
            label="Perusahaan"
            value={perusahaan}
            icon={<Building2 className="h-3.5 w-3.5" />}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- Helper ---------- */

function Info({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2">
      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-red-600 text-white">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold tracking-wide text-red-600 uppercase">
          {label}
        </p>
        <p className="line-clamp-2 text-xs leading-tight font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}
