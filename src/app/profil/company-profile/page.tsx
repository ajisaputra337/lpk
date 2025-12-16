// src/app/profil/company-profile/page.tsx
import React from "react";
import Image from "next/image";

export const metadata = {
  title: "Company Profile - Aishiro Gakuen",
  description:
    "Profil LPK Aishiro Gakuen — legalitas, misi, dan program Magang Jepang.",
};

export default function CompanyProfilePage() {
  return (
    <main className="bg-white pt-24 pb-16 md:pt-28">
      <div className="mx-auto max-w-4xl px-6">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Company Profile
          </h1>
          <h2 className="mt-2 text-xl font-semibold text-red-700">
            LPK Aishiro Gakuen
          </h2>
          <p className="mt-4 text-gray-600">
            LPK. AISHIRO GAKUEN adalah lembaga pelatihan bahasa Jepang, yang
            bergerak di bidang pemagangan ke Jepang, berdiri sejak 2009. Pada
            2018 mendapatkan izin Sending Organisasi ke Jepang hingga saat ini.
            Terakreditasi LA-LPK Nomor: 224/LALPK/XI/2024.
          </p>
        </header>

        <section className="mb-8 rounded-lg border border-gray-100 bg-gray-50 p-6 shadow-sm">
          <p className="text-lg leading-relaxed text-gray-700">
            Dan atas kepercayaan masyarakat, LPK AISHIRO GAKUEN telah meluluskan
            banyak siswa untuk berangkat magang kerja ke Jepang. Dengan berbekal
            keterampilan yang didapat di Jepang, para alumni peserta magang
            kerja rata-rata setelah kembali ke Indonesia membuat usaha mandiri,
            seperti peternakan sapi, peternakan ayam, pertanian sayur, dan usaha
            mandiri lainnya.
          </p>
        </section>

        <section className="mb-8 grid grid-cols-1 gap-6">
          <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-2xl font-semibold text-gray-800">
              Visi <span className="text-red-700">目標</span>
            </h3>
            <p className="text-lg">
              • Menjadikan Lembaga Pendidikan Dan Pelatihan Yang Profesional,
              Mandiri, dan Berkarakter.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              専門的、独立的、そして性格的に優秀な教育訓練機関になり
            </p>
          </div>

          <div className="rounded-lg bg-red-50 p-6 shadow-lg">
            <h3 className="mb-3 text-2xl font-semibold text-red-700">
              Misi <span className="text-gray-700">使命</span>
            </h3>
            <ul className="list-disc space-y-3 pl-5 text-lg text-gray-700">
              <li>
                Menyelenggarakan Program Pendidikan Dan Pelatihan Bahasa Jepang
                Secara Profesional
                <p className="mt-1 text-sm text-gray-600">
                  専門的の日本語訓練および教育プログラムを実施する
                </p>
              </li>
              <li>
                Mendidik Generasi Muda Agar Memiliki Semangat Kerja Yang Tinggi,
                Disiplin, dan Mandiri
                <p className="mt-1 text-sm text-gray-600">
                  仕事に対する高い意欲性、規律性、と自立性を持つ若い世代を教育する
                </p>
              </li>
              <li>
                Meningkatkan Hubungan Kerjasama Bidang Tenaga Kerja Antara
                Indonesia Dengan Jepang
                <p className="mt-1 text-sm text-gray-600">
                  インドネシアと日本の労働分野の協力関係の改善
                </p>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8 rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="mb-3 text-2xl font-semibold text-gray-800">
            Tujuan <span className="text-red-700">目的</span>
          </h3>
          <ul className="list-disc space-y-3 pl-5 text-lg text-gray-700">
            <li>
              Menyiapkan peserta didik menjadi anggota masyarakat yang mampu
              menerapkan dan mengembangkan wawasan dunia kerja.
              <p className="mt-1 text-sm text-gray-600">
                仕事の世界についての洞察を適用し、それに開発することができる社会の一員になる実習生を備える
              </p>
            </li>
            <li>
              Menghasilkan lulusan yang berkarakter dan memiliki komitmen yang
              tinggi terhadap masyarakat.
              <p className="mt-1 text-sm text-gray-600">
                社会に対する高い本気度と徳性を持ち卒業生を育てる
              </p>
            </li>
          </ul>
        </section>

        <section className="rounded-lg bg-gray-50 p-6">
          <p className="text-lg leading-relaxed">
            Dengan Visi dan Misi yang telah kami canangkan itu, berkomitmen
            membantu masyarakat dalam meningkatkan ekonomi keluarga.
          </p>

          <div className="mt-6 flex items-center gap-6">
            <Image
              src="/Images/Direktur.jpeg"
              alt="Foto Direktur"
              width={96}
              height={96}
              className="rounded-full object-cover shadow-md"
            />
            <div>
              <p className="font-bold">YASMIN MASAMI, S.Pd</p>
              <p className="text-sm text-gray-600">DIREKTUR</p>
            </div>
          </div>

          {/* Foto Gedung LPK (diletakkan di bawah profil direktur) */}
          <div className="mt-6">
            <div className="relative h-56 w-full overflow-hidden rounded-lg md:h-96">
              <Image
                src="/Images/gedunglpk.jpeg"
                alt="Gedung LPK Aishiro"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
