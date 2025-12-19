"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MapPin, Calendar, Briefcase, Building2, X } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);

  // 🔒 Anti-crash guard
  const initial = name?.trim()?.charAt(0) ?? "?";
  const safeName = name?.trim() || "Nama Tidak Diketahui";

  return (
    <>
      {/* --- TRIGGER CARD (PHOTO ONLY) --- */}
      <div
        onClick={() => setIsOpen(true)}
        className="group relative cursor-pointer overflow-hidden rounded-xl border-2 border-transparent bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-xl"
      >
        <div className="aspect-[3/4] w-full overflow-hidden bg-gray-100">
          {img ? (
            <Image
              src={img}
              alt={safeName}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-500 to-red-600">
              <span className="text-6xl font-black text-white">{initial}</span>
            </div>
          )}

          {/* Overlay Gradient on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Badge Angkatan */}
          <div className="absolute bottom-4 left-4 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
            🎓 {angkatan}
          </div>

          {/* Name Preview on Hover */}
          <div className="absolute bottom-12 left-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="border-l-4 border-red-500 pl-3 font-bold text-white drop-shadow-md">
              {safeName}
            </p>
          </div>
        </div>
      </div>

      {/* --- MODAL POPUP --- */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsOpen(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all animate-in zoom-in-95 duration-200"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-gray-500 backdrop-blur-sm transition-colors hover:bg-red-100 hover:text-red-600"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Original Card Layout (Now Inside Modal) */}
            <div className="group relative overflow-hidden border-2 border-red-100 bg-white">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-white to-red-50/30" />

              <div className="relative flex flex-col gap-6 p-6 sm:flex-row">
                {/* Foto */}
                <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                  <div className="relative h-48 w-36 overflow-hidden rounded-lg border-4 border-white shadow-lg sm:h-56 sm:w-40">
                    {img ? (
                      <Image
                        src={img}
                        alt={safeName}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 144px, 160px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-500 to-red-600">
                        <span className="text-5xl font-black text-white sm:text-6xl">
                          {initial}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-red-600 px-4 py-1.5 text-xs font-bold whitespace-nowrap text-white shadow-md">
                    🎓 {angkatan}
                  </div>
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1 space-y-4 text-center sm:text-left pt-2">
                  <h3 className="text-2xl font-black leading-tight text-slate-900 border-b-2 border-red-100 pb-2">
                    {safeName}
                  </h3>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Info
                      label="Tanggal Lahir"
                      value={tanggalLahir}
                      icon={<Calendar className="h-4 w-4" />}
                    />
                    <Info
                      label="Alamat"
                      value={alamat}
                      icon={<MapPin className="h-4 w-4" />}
                    />
                    <Info
                      label="Pekerjaan"
                      value={job}
                      icon={<Briefcase className="h-4 w-4" />}
                    />
                    <Info
                      label="Perusahaan"
                      value={perusahaan}
                      icon={<Building2 className="h-4 w-4" />}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer/CTA (Optional - maybe 'Lihat lainnya' link?) - I will leave it clean for now as requested "layout sama persis" */}
          </div>
        </div>
      )}
    </>
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
