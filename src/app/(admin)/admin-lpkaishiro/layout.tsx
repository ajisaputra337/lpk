"use client"; // Wajib ada karena ada fungsi klik (logout)

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";
import { Menu, X, Home, GraduationCap, Image as ImageIcon, LogOut, ArrowLeft } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/login");
      router.refresh(); // Biar middleware nge-lock lagi
    }
  };

  const navLinks = [
    { href: "/admin-lpkaishiro", label: "Overview", icon: Home },
    { href: "/admin-lpkaishiro/success-story", label: "Alumni Card", icon: GraduationCap },
    { href: "/admin-lpkaishiro/media", label: "Media/Galeri", icon: ImageIcon },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 text-slate-900">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 text-white flex items-center justify-between px-6 z-[100]">
        <h2 className="text-lg font-bold text-red-500">Admin LPK</h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-slate-800 rounded-lg transition"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile Only) */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-[90] backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-slate-900 text-white p-6 shrink-0 flex flex-col justify-between z-[95]
        transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          <h2 className="text-xl font-bold mb-8 text-red-500 hidden lg:block">Admin LPK</h2>

          {/* Mobile Sidebar Close Button */}
          <div className="lg:hidden flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-red-500">Admin LPK</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="text-white">
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-red-600/10 hover:text-red-400 transition"
              >
                <link.icon size={20} />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Bagian Bawah Sidebar */}
        <div className="space-y-4 border-t border-slate-700 pt-6">
          <Link
            href="/"
            className="flex items-center gap-3 text-gray-400 text-sm hover:text-white transition"
          >
            <ArrowLeft size={16} />
            Balik ke Web
          </Link>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white py-3 px-4 rounded-xl text-sm font-bold transition flex items-center gap-3"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 p-4 md:p-10 pt-20 lg:pt-10 overflow-y-auto max-w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
