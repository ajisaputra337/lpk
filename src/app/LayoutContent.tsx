"use client";

import { usePathname } from "next/navigation";
import Header from "../styles/components/Header";
import Footer from "../styles/components/Footer";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Cek apakah URL mengandung admin-lpkaishiro
  const isAdmin = pathname?.includes("admin-lpkaishiro");

  return (
    <>
      {!isAdmin && <Header />}
      <main className="flex-grow">{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
}