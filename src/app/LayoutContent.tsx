"use client";

import { usePathname } from "next/navigation";
import Header from "../styles/components/Header";
import Footer from "../styles/components/Footer";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Memastikan pathname tidak null dan mengecek rute admin
  // Menggunakan includes sudah cukup oke, tapi pastikan string-nya unik
  const isAdmin = pathname?.split('/').includes("admin-lpkaishiro");

  return (
    <>
      {/* Jika BUKAN admin, tampilkan Header */}
      {!isAdmin && <Header />}
      
      <main className="flex-grow">{children}</main>
      
      {/* Jika BUKAN admin, tampilkan Footer */}
      {!isAdmin && <Footer />}
    </>
  );
}