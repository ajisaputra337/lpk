"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("../styles/components/Header"), { ssr: true });
const Footer = dynamic(() => import("../styles/components/Footer"), { ssr: true });
const SakuraBackground = dynamic(() => import("../styles/components/SakuraBackground"), { ssr: false }); // Disable SSR for Sakura particles for performance

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
      {/* Efek Sakura Global (Kecuali Admin/Login) */}
      {!isCleanPage && <SakuraBackground />}

      {/* Jika BUKAN clean page, tampilkan Header */}
      {!isCleanPage && <Header />}

      <main className="flex-grow">{children}</main>

      {/* Jika BUKAN clean page, tampilkan Footer */}
      {!isCleanPage && <Footer />}
    </>
  );
}