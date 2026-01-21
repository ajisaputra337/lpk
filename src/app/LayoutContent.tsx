"use client";

import { usePathname } from "next/navigation";
import Header from "../styles/components/Header";
import Footer from "../styles/components/Footer";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 1. Cek apakah ini halaman admin
  const isAdmin = pathname?.split('/').includes("admin-lpkaishiro");
  
  // 2. Cek apakah ini halaman login
  const isLoginPage = pathname === "/login";

  // Gabungkan: Jika admin ATAU login, maka kita anggap sebagai "Clean Page" (Tanpa Header/Footer)
  const isCleanPage = isAdmin || isLoginPage;

  return (
    <>
      {/* Jika BUKAN clean page, tampilkan Header */}
      {!isCleanPage && <Header />}
      
      <main className="flex-grow">{children}</main>
      
      {/* Jika BUKAN clean page, tampilkan Footer */}
      {!isCleanPage && <Footer />}
    </>
  );
}