import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. IMPORT KOMPONEN (Pastikan file ini sudah lu buat di folder components)
// Kalau foldernya beda, sesuaikan path-nya ya, Bro.
import Header from "../styles/components/Header";
import Footer from "../styles/components/Footer";

const inter = Inter({ subsets: ["latin"] });

// --- BAGIAN METADATA (IDENTITAS WEB - Kita pertahankan versi SEO Tinggi) ---
export const metadata: Metadata = {
  metadataBase: new URL("https://www.lpk-aishiro.com"),
  title: {
    template: "%s | LPK Aishiro Gakuen",
    default: "LPK Aishiro Gakuen - Pelatihan Magang & Kerja ke Jepang Resmi",
  },
  description:
    "Lembaga Pelatihan Kerja (LPK) terpercaya di Semarang untuk program magang Jepang (Kenshusei) dan Tokutei Ginou. Resmi, aman, dan berpengalaman sejak 2014.",
  keywords: [
    "LPK Jepang",
    "LPK Jepang Semarang",
    "Magang Jepang Resmi",
    "Tokutei Ginou",
    "Kerja ke Jepang",
    "Aishiro Gakuen",
    "Pelatihan Bahasa Jepang",
  ],
  openGraph: {
    title: "LPK Aishiro Gakuen - Wujudkan Mimpi ke Jepang",
    description:
      "Program pelatihan bahasa dan skill untuk berkarir di Jepang secara resmi.",
    url: "https://www.lpk-aishiro.com",
    siteName: "LPK Aishiro Gakuen",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Siswa LPK Aishiro Gakuen",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      {/* 2. Gabungkan styling body agar Footer tetap di bawah (sticky footer) */}
      <body
        className={`${inter.className} flex min-h-screen flex-col antialiased`}
      >
        {/* 3. Header Global */}
        <Header />

        {/* 4. Main content yang fleksibel (flex-grow) agar mendorong footer ke bawah */}
        <main className="flex-grow">{children}</main>

        {/* 5. Footer Global */}
        <Footer />
      </body>
    </html>
  );
}
