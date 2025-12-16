import Image from "next/image";

// Data Dummy Alumni (Updated dengan Data Real Faisol)
const alumni = [
  {
    id: 1,
    nama: "FAISOL RODHIFI",
    role: "Program: JAPANSE SWASTA",
    perusahaan: "Berangkat: AGUSTUS 2015",
    quote:
      "Asal Jepara, lahir 29 Februari 1992. Terima kasih LPK Aishiro telah menjembatani saya bekerja di Jepang.",
    img: "https://lpk-aishiro.com/wp-content/gallery/sukses-story-di-jepang/thumbs/thumbs_faisol-1.jpg",
  },
  {
    id: 2,
    nama: "Siti Nurhaliza",
    role: "Kaigo (Caregiver)",
    perusahaan: "Panti Lansia Osaka",
    quote:
      "Kerja di Jepang sangat disiplin. Terima kasih sensei yang sudah melatih mental saya sebelum berangkat.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    nama: "Ahmad Fauzi",
    role: "Food Processing",
    perusahaan: "Hokkaido Dairy Farm",
    quote:
      "Prosesnya cepat dan transparan. Tidak ada biaya tersembunyi. Sukses terus LPK Aishiro!",
    img: "https://randomuser.me/api/portraits/men/86.jpg",
  },
];

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
            <div
              key={person.id}
              className="relative rounded-3xl border border-slate-100 bg-slate-50 p-8 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              {/* Kutipan */}
              <div className="mb-6">
                <span className="absolute top-4 right-6 font-serif text-6xl text-red-200">
                  &ldquo;
                </span>
                <p className="relative z-10 leading-relaxed text-slate-600 italic">
                  &ldquo;{person.quote}&rdquo;
                </p>
              </div>

              {/* Profil */}
              <div className="mt-8 flex items-center gap-4 border-t border-slate-200 pt-6">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-md">
                  <Image
                    src={person.img}
                    alt={person.nama}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {person.nama}
                  </h4>
                  <p className="text-xs font-bold text-red-600">
                    {person.role}
                  </p>
                  <p className="text-xs text-slate-400">{person.perusahaan}</p>
                </div>
              </div>
            </div>
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
