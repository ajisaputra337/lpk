import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "lpk-aishiro.com" },
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "imgs.search.brave.com" },
    ],
  },

  async redirects() {
    // Default locale untuk redirect dari URL WordPress lama
    const defaultLocale = 'id';

    // Daftar redirect dari URL WordPress lama ke URL baru
    // URL WordPress lama tidak memiliki locale prefix
    // Jadi kita redirect ke URL dengan locale default
    const wordpressRedirects = [
      // --- 1. HALAMAN PROFIL & IDENTITAS ---
      { from: "/company-profile", to: "/profil/company-profile" },
      { from: "/sample-page/company-profil-lpk-aishiro", to: "/profil/company-profile" },
      { from: "/sample-page/identitas-lembaga", to: "/profil/company-profile" },
      { from: "/identitas-lembaga", to: "/profil/company-profile" },
      { from: "/akreditasi-la-lpk-2024", to: "/profil/company-profile" },
      { from: "/sample-page", to: "/profil/company-profile" },
      { from: "/visi-misi.php", to: "/profil/visi-misi" },
      { from: "/visi-misi-dan-tujuan-lembaga", to: "/profil/visi-misi" },
      { from: "/sample-page/visi-misi-dan-tujuan-lembaga", to: "/profil/visi-misi" },
      { from: "/persyaratan", to: "/media/persyaratan" },

      // --- 2. HALAMAN PROGRAM ---
      { from: "/program-gakkou", to: "/program/sekolah-jepang" },
      { from: "/im-japan", to: "/program/magang-jepang" },
      { from: "/alur-program-lpk-aishiro", to: "/program/magang-jepang" },
      { from: "/program/jepang", to: "/program/magang-jepang" },
      { from: "/job-tersedia-di-lpk-aishiro", to: "/program/tokutei-ginou" },
      { from: "/program-ssw", to: "/program/tokutei-ginou" },
      { from: "/program-perawat", to: "/" },
      { from: "/program", to: "/program/magang-jepang" },

      // --- 3. SUCCESS STORIES (Testimoni & Keberangkatan) ---
      { from: "/2157-2", to: "/media/success-story" },
      { from: "/2325-2", to: "/media/success-story" },
      { from: "/keberangkatan-14", to: "/media/success-story" },
      { from: "/sukses-story-di-jepang", to: "/media/success-story" },
      { from: "/sukses-story-di-jepang-2", to: "/media/success-story" },
      { from: "/galeri/alumni/sukses-story-di-jepang", to: "/media/success-story" },
      { from: "/galeri/alumni", to: "/media/success-story" },
      { from: "/penandatanganan-kontrak-kerja-job-tobi-dan-tekkin", to: "/media/success-story" },

      // --- 4. MEDIA & EVENT SPESIFIK ---
      { from: "/kegiatan-fisik-sore-lpk-aishiro", to: "/media/fisik-sore" },
      { from: "/galeri/kegiatan-magang-jepang-lpk", to: "/media/galeri" },
      { from: "/foto-kegiatan", to: "/media/galeri" },
      { from: "/kunjungan-direktur-binalavogan-kementrian-tenaga-kerja-dan-kepala-bbpvp-kota-semarang", to: "/media/galeri" },
      { from: "/pelatihan-job-tobi-scaffolding-perancah-bangunan", to: "/media/galeri" },
      { from: "/kunjungan-perusahaan-jepang-dan-wawancara", to: "/media/galeri" },
      { from: "/kunjungan-dari-disnaker-kabupaten-sleman", to: "/media/galeri" },
      { from: "/kunjungan-kadin-provinsi-jateng-ke-lpk-aishiro-gakuen", to: "/media/galeri" },
      { from: "/job-matching-lpk-aishiro-gakuen-di-nagoya-jepang", to: "/media/galeri" },
      { from: "/kunjungan-dari-kumiai-jepang", to: "/media/galeri" },
      { from: "/kunjungan-dari-kumiai-dan-wawancara-job", to: "/media/galeri" },
      { from: "/semangat-baru-belajar-di-gedung-baru", to: "/media/galeri" },

      // --- 5. MAPPING TAG SPESIFIK ---
      { from: "/tag/persyaratan-magang-jepang", to: "/media/persyaratan" },
      { from: "/tag/persyaratan-kerja-dijepang", to: "/media/persyaratan" },
      { from: "/tag/sekolah-di-jepang", to: "/program/sekolah-jepang" },
      { from: "/tag/sukses-di-jepang", to: "/media/success-story" },
      { from: "/tag/sukses", to: "/media/success-story" },
      { from: "/tag/im-japan", to: "/program/magang-jepang" },

      // --- 6. CATCH-ALL (Wildcards / Penyelamat 404) ---
      { from: "/tag/:path*", to: "/media/galeri" },
      { from: "/category/:path*", to: "/media/galeri" },
      { from: "/blog/:path*", to: "/media/galeri" },
      { from: "/galeri/:path*", to: "/media/galeri" },
      { from: "/page/:path*", to: "/media/galeri" },
      { from: "/post-archive/:path*", to: "/media/galeri" },

      // --- 7. FALLBACK & CLEANUP ---
      { from: "/formulir-pendaftaran", to: "/" },
      { from: "/login.php", to: "/login" },
      { from: "/forum/:path*", to: "/" },
      { from: "/topic/:path*", to: "/" },
      { from: "/wpgform/:path*", to: "/" },
      { from: "/849", to: "/" },
      { from: "/k", to: "/" },
      { from: "/addl-sitemap.xml", to: "/sitemap.xml" },
      { from: "/post-sitemap.xml", to: "/sitemap.xml" },
      { from: "/page-sitemap.xml", to: "/sitemap.xml" },
      { from: "/category-sitemap.xml", to: "/sitemap.xml" },
      { from: "/post_tag-sitemap.xml", to: "/sitemap.xml" },
      { from: "/wp-content/uploads/2014/05/FORMULIR-PENDAFTARAN.docx", to: "/" },
    ];


    // Generate redirects dengan locale prefix di destination
    const redirectsWithLocale = wordpressRedirects.map(({ from, to }) => ({
      source: from,
      destination: to === "/" ? `/${defaultLocale}` : `/${defaultLocale}${to}`,
      permanent: true,
    }));

    // Redirects internal (admin, dll) - tidak perlu locale
    const internalRedirects = [
      { source: "/admin", destination: "/admin-lpkaishiro", permanent: true },
    ];

    return [...redirectsWithLocale, ...internalRedirects];
  },
};

export default withNextIntl(nextConfig);
