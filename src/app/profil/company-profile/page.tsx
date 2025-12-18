// src/app/profil/company-profile/page.tsx
import React from "react";

export const metadata = {
  title: "Profil Perusahaan - LPK Aishiro Gakuen",
  description:
    "Profil LPK Aishiro Gakuen — legalitas, misi, fasilitas, dan layanan Magang Jepang.",
};

export default function CompanyProfilePage() {
  return (
    <main className="bg-white pt-24 pb-16 md:pt-28">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-6 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
            Profil Perusahaan
          </h1>
          <h2 className="mt-2 text-lg font-semibold text-red-700 md:text-xl">
            LPK Aishiro Gakuen
          </h2>
          <p className="mt-4 max-w-2xl text-gray-600">
            LPK AISHIRO GAKUEN adalah lembaga pelatihan bahasa Jepang yang
            bergerak di bidang pemagangan ke Jepang, berdiri sejak 2009 dan pada
            2018 mendapatkan izin sebagai Sending Organization. Terakreditasi
            LA-LPK Nomor: 224/LALPK/XI/2024.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Main content (2/3) */}
          <div className="space-y-6 md:col-span-2">
            <section className="rounded-lg border border-gray-100 bg-gray-50 p-6 shadow-sm">
              <p className="text-lg leading-relaxed text-gray-700">
                Atas kepercayaan masyarakat, LPK AISHIRO GAKUEN telah meluluskan
                banyak peserta magang yang berangkat ke Jepang. Setelah kembali
                ke Indonesia, banyak alumni yang memanfaatkan keterampilan dan
                pengalaman untuk membuka usaha mandiri di berbagai sektor.
              </p>
            </section>

            <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-2xl font-semibold text-gray-800">
                  Visi <span className="text-red-700">目標</span>
                </h3>
                <p className="text-lg">
                  Menjadi lembaga pendidikan dan pelatihan yang profesional,
                  mandiri, dan berkarakter.
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
                    Menyelenggarakan program pendidikan dan pelatihan bahasa
                    Jepang secara profesional.
                  </li>
                  <li>
                    Mendidik generasi muda agar memiliki semangat kerja tinggi,
                    disiplin, dan mandiri.
                  </li>
                  <li>
                    Meningkatkan hubungan kerjasama bidang tenaga kerja antara
                    Indonesia dan Jepang.
                  </li>
                </ul>
              </div>
            </section>

            <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-2xl font-semibold text-gray-800">
                Tujuan <span className="text-red-700">目的</span>
              </h3>
              <ul className="list-disc space-y-3 pl-5 text-lg text-gray-700">
                <li>
                  Menyiapkan peserta didik menjadi anggota masyarakat yang mampu
                  menerapkan dan mengembangkan wawasan dunia kerja.
                </li>
                <li>
                  Menghasilkan lulusan yang berkarakter dan memiliki komitmen
                  tinggi terhadap masyarakat.
                </li>
              </ul>
            </section>

            {/* New sections representing pages 2–6 */}
            <section id="struktur" className="rounded-lg bg-gray-50 p-6">
              <h3 className="mb-3 text-2xl font-semibold text-gray-800">
                Struktur Organisasi
              </h3>
              <p className="text-gray-700">
                Struktur organisasi LPK terdiri dari Direksi, Tim Pendidikan
                &amp; Pelatihan, Tim Administrasi, dan Tim Hubungan
                Internasional. (Bagan organisasi dapat ditambahkan di sini.)
              </p>
            </section>

            <section
              id="fasilitas"
              className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm"
            >
              <h3 className="mb-3 text-2xl font-semibold text-gray-800">
                Fasilitas
              </h3>
              <ul className="list-disc pl-5 text-lg text-gray-700">
                <li>Ruang kelas ber-AC dan fasilitas audio visual</li>
                <li>
                  Laboratorium bahasa &amp; materi pembelajaran interaktif
                </li>
                <li>Ruang konsultasi karir dan persiapan dokumen</li>
              </ul>
            </section>

            <section id="statistik" className="rounded-lg bg-red-50 p-6">
              <h3 className="mb-3 text-2xl font-semibold text-red-700">
                Statistik
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded border bg-white p-4 text-center">
                  <p className="text-2xl font-bold">200+</p>
                  <p className="text-sm text-gray-600">Alumni</p>
                </div>
                <div className="rounded border bg-white p-4 text-center">
                  <p className="text-2xl font-bold">2018</p>
                  <p className="text-sm text-gray-600">Izin Sending Org</p>
                </div>
              </div>
            </section>

            <section
              id="layanan"
              className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm"
            >
              <h3 className="mb-3 text-2xl font-semibold text-gray-800">
                Layanan
              </h3>
              <ul className="list-disc pl-5 text-lg text-gray-700">
                <li>Pelatihan Bahasa Jepang intensif</li>
                <li>Pendampingan proses aplikasi magang</li>
                <li>Persiapan dokumen dan pengurusan izin</li>
              </ul>
            </section>

            <section id="legalitas" className="rounded-lg bg-gray-50 p-6">
              <h3 className="mb-3 text-2xl font-semibold text-gray-800">
                Legalitas &amp; Akreditasi
              </h3>
              <ul className="list-disc pl-5 text-lg text-gray-700">
                <li>Didirikan: 2009</li>
                <li>Terakreditasi: LA-LPK Nomor 224/LALPK/XI/2024</li>
                <li>Izin: Sending Organization (Sejak 2018)</li>
              </ul>
            </section>
          </div>

          {/* Sidebar (1/3) */}
          <aside className="md:col-span-1">
            <div className="sticky top-28 space-y-4">
              <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                <h4 className="mb-3 text-lg font-semibold text-gray-800">
                  Informasi Perusahaan
                </h4>
                <table className="w-full text-sm">
                  <tbody>
                    <tr>
                      <td className="py-2 font-medium text-gray-700">Nama</td>
                      <td className="py-2 text-gray-600">LPK Aishiro Gakuen</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-gray-700">Alamat</td>
                      <td className="py-2 text-gray-600">
                        Semarang, Indonesia
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-gray-700">
                        Telepon
                      </td>
                      <td className="py-2 text-gray-600">+62 882-1575-1500</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-gray-700">Email</td>
                      <td className="py-2 text-gray-600">
                        info@aishiro.example
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-gray-700">
                        Tahun berdiri
                      </td>
                      <td className="py-2 text-gray-600">2009</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-gray-700">
                        Akreditasi
                      </td>
                      <td className="py-2 text-gray-600">
                        LA-LPK 224/LALPK/XI/2024
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-gray-700">Alumni</td>
                      <td className="py-2 text-gray-600">200+</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                <h4 className="mb-3 text-lg font-semibold text-gray-800">
                  Tautan Cepat
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    <a
                      href="#struktur"
                      className="text-red-700 hover:underline"
                    >
                      Struktur Organisasi
                    </a>
                  </li>
                  <li>
                    <a
                      href="#fasilitas"
                      className="text-red-700 hover:underline"
                    >
                      Fasilitas
                    </a>
                  </li>
                  <li>
                    <a
                      href="#statistik"
                      className="text-red-700 hover:underline"
                    >
                      Statistik
                    </a>
                  </li>
                  <li>
                    <a href="#layanan" className="text-red-700 hover:underline">
                      Layanan
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
