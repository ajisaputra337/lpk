// src/app/layout.tsx
import "~/styles/globals.css";

// 1. IMPORT KOMPONEN HEADER DAN FOOTER
import Header from '../styles/components/Header';
import Footer from '../styles/components/Footer';

import { type Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "LPK Aishiro Gakuen | Sukses di Jepang", // Perbarui Judul Metadata
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${geist.variable}`}>
      {/* 2. Tambahkan class di body untuk layout (flex-col, min-h-screen) */}
      <body className="flex min-h-screen flex-col font-sans antialiased">

        {/* 3. Masukkan Header */}
        <Header />

        {/* 4. Bungkus Konten Halaman (children) dalam tag main dan pastikan mengisi ruang kosong */}
        <main className="flex-grow">
          {children}
        </main>

        {/* 5. Masukkan Footer */}
        <Footer />

      </body>
    </html>
  );
}