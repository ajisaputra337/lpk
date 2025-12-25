import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutContent from "./LayoutContent"; 
import FloatingChat from "../styles/components/FloatingChat"; // Import cukup sekali di atas

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} flex min-h-screen flex-col antialiased`}>
        {/* LayoutContent mengatur Header/Footer */}
        <LayoutContent>
          {children}
        </LayoutContent>

        {/* FloatingChat ditaruh di sini agar muncul di semua halaman kecuali yang difilter di komponennya */}
        <FloatingChat />
      </body>
    </html>
  );
}