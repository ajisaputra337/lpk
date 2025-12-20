import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100 text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 shrink-0">
        <h2 className="text-xl font-bold mb-8 text-red-500">Admin LPK</h2>
        <nav className="space-y-4">
          <Link href="/admin-lpkaishiro" className="block hover:text-red-400">🏠 Overview</Link>
          <Link href="/admin-lpkaishiro/success-story" className="block hover:text-red-400">🎓 Alumni Card</Link>
          <Link href="/admin-lpkaishiro/media" className="block hover:text-red-400">📸 Media/Galeri</Link>
          <Link href="/" className="block pt-10 text-gray-400 text-sm">← Balik ke Web</Link>
        </nav>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 p-10 overflow-y-auto">{children}</main>
    </div>
  );
}