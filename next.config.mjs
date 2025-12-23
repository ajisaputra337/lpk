/** @type {import('next').NextConfig} */
const nextConfig = {
  // --- TAMBAHKAN INI (MULAI) ---
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // --- TAMBAHKAN INI (SELESAI) ---

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "lpk-aishiro.com" },
      { protocol: "https", hostname: "**.supabase.co" }, 
      { protocol: "https", hostname: "imgs.search.brave.com" },
    ],
  },

  async redirects() {
    return [
      { source: "/program", destination: "/#program", permanent: true },
      { source: "/admin", destination: "/admin-lpkaishiro", permanent: true },
      { source: "/persyaratan", destination: "/media/persyaratan", permanent: true },
      { source: "/sample-page", destination: "/profil/company-profile", permanent: true },
      { source: "/program-gakkou", destination: "/program/sekolah-jepang", permanent: true },
      { source: "/alur-program-lpk-aishiro", destination: "/program/magang-jepang", permanent: true },
      { source: "/visi-misi.php", destination: "/company-profile", permanent: true },
      { source: "/program/jepang", destination: "/", permanent: true },
      { source: "/2023/08", destination: "/", permanent: true },
      { source: "/2157-2", destination: "/media/success-story", permanent: true },
      { source: "/im-japan", destination: "/program/magang-jepang", permanent: true },
      { source: "/sample-page/identitas-lembaga", destination: "/profil/company-profile", permanent: true },
      { source: "/kumiai-組合", destination: "/", permanent: true },
      { source: "/page/3", destination: "/media/galeri", permanent: true },
      { source: "/semangat-baru-belajar-di-gedung-baru", destination: "/", permanent: true },
      { source: "/kunjungan-dari-kumiai-jepang", destination: "/", permanent: true },
      { source: "/program-pelatihan-bahasa-dan-budaya-jepang-siswa-smk", destination: "/", permanent: true },
      { source: "/penandatanganan-kontrak-kerja-job-tobi-dan-tekkin", destination: "/", permanent: true },
      { source: "/849", destination: "/", permanent: true },
      { source: "/visi-misi-dan-tujuan-lembaga", destination: "/profil/visi-misi", permanent: true },
      { source: "/tag/magang-jepang-2022", destination: "/", permanent: true },
      { source: "/formulir-pendaftaran", destination: "/", permanent: true },
      { source: "/business-trip-to-japan", destination: "/", permanent: true },
      { source: "/program-perawat", destination: "/", permanent: true },
      { source: "/pelatihan-job-tobi-scaffolding-perancah-bangunan", destination: "/", permanent: true },
      { source: "/kerja-di-jepang-kenapa-tidak", destination: "/", permanent: true },
      { source: "/tips-untuk-belajar-bahasa-jepang-yang-efektif", destination: "/", permanent: true },
      { source: "/rahasia-sukses-orang-jepang", destination: "/", permanent: true },
      { source: "/shikenujian-kerja-tahun-pertama-job-tobi-scaffolding", destination: "/", permanent: true },
      { source: "/kebudayaan-dan-tradisi-jepang", destination: "/", permanent: true },
      { source: "/sample-page/visi-misi-dan-tujuan-lembaga", destination: "/", permanent: true },
      { source: "/tag/seiketsu", destination: "/", permanent: true },
      { source: "/forums/forum/tentang-lpk-dan-magang-jepang", destination: "/", permanent: true },
      { source: "/cgi-sys/suspendedpage.cgi", destination: "/", permanent: true },
      { source: "/wp-content/uploads/2014/05/FORMULIR-PENDAFTARAN.docx", destination: "/", permanent: true },
      { source: "/login.php", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;