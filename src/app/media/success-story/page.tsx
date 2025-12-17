import { alumni } from "../../../data/alumni";

import SuccessStoryCard from "../../../styles/components/SuccessStoryCard";

export default function SuccessStoryPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-20 font-sans">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="mb-4 inline-block rounded-full bg-red-100 px-4 py-1 text-xs font-bold tracking-widest text-red-600 uppercase">
            Hall of Fame
          </div>
          <h1 className="mb-6 text-4xl font-black text-slate-900 md:text-5xl">
            Kisah Sukses Alumni
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-500">
            Mereka yang berani bermimpi dan bekerja keras. Kini mereka telah
            bekerja di berbagai prefektur di Jepang.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {alumni.map((person) => (
            <SuccessStoryCard
              key={person.id}
              quote={person.quote}
              name={person.nama}
              role={person.job}
              perusahaan={person.perusahaan}
              img={person.img}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-20 text-center">
          <button className="rounded-full bg-red-600 px-8 py-4 font-bold text-white shadow-lg shadow-red-600/30 transition-colors hover:bg-red-700">
            Gabung Bersama Mereka →
          </button>
        </div>
      </div>
    </main>
  );
}
