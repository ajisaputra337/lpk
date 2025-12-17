import React from "react";
import Image from "next/image";

interface SuccessStoryCardProps {
  quote: string;
  name: string;
  role?: string;
  perusahaan?: string;
  img?: string;
}

const SuccessStoryCard: React.FC<SuccessStoryCardProps> = ({
  quote,
  name,
  role,
  perusahaan,
  img,
}) => {
  return (
    <div className="relative rounded-3xl border border-slate-100 bg-slate-50 p-8 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
      {/* Kutipan */}
      <div className="mb-6">
        <span className="absolute top-4 right-6 font-serif text-6xl text-red-200">
          &ldquo;
        </span>
        <p className="relative z-10 leading-relaxed text-slate-600 italic">
          {quote}
        </p>
      </div>

      {/* Profil */}
      <div className="mt-8 flex items-center gap-4 border-t border-slate-200 pt-6">
        <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-md">
          {img ? (
            <Image src={img} alt={name} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-red-100 font-bold text-red-700">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900">{name}</h4>
          {role && <p className="text-xs font-bold text-red-600">{role}</p>}
          {perusahaan && <p className="text-xs text-slate-400">{perusahaan}</p>}
        </div>
      </div>
    </div>
  );
};

export default SuccessStoryCard;
