"use client"; // Wajib ada karena ada fungsi klik (logout)

import Link from "next/link";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/login");
      router.refresh(); // Biar middleware nge-lock lagi
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 shrink-0 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-8 text-red-500">Admin LPK</h2>
          <nav className="space-y-4">
            <Link href="/admin-lpkaishiro" className="block hover:text-red-400 transition">
              🏠 Overview
            </Link>
            <Link href="/admin-lpkaishiro/success-story" className="block hover:text-red-400 transition">
              🎓 Alumni Card
            </Link>
            <Link href="/admin-lpkaishiro/media" className="block hover:text-red-400 transition">
              📸 Media/Galeri
            </Link>
          </nav>
        </div>

        {/* Bagian Bawah Sidebar */}
        <div className="space-y-4 border-t border-slate-700 pt-6">
          <Link href="/" className="block text-gray-400 text-sm hover:text-white transition">
            ← Balik ke Web
          </Link>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white py-2 px-4 rounded-lg text-sm font-bold transition text-left"
          >
            🚪 Keluar (Logout)
          </button>
        </div>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 p-10 overflow-y-auto">{children}</main>
    </div>
  );
}