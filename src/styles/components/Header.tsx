'use client';
import Link from 'next/link';
import { useState } from 'react'; //Import useState

// tipe link dropdown
interface NavItem {
  label: string;
  href: string;
  subMenu?: NavItem[];
}

// Data Struktur Navigasi
const navItems: NavItem[] = [
  { label: 'HOME', href: '/' },
  {
    label: 'PROGRAM',
    href: '#',
    subMenu: [
      { label: 'Alur Magang Jepang', href: '/program/alur-magang' },
      { label: 'Kegiatan Fisik Sore', href: '/program/fisik-sore' }
    ],
  },
  {
    label: 'PROFIL',
    href: '#',
    subMenu: [
      { label: 'Visi Misi', href: '/profil/visi-misi' },
      { label: 'Sukses Story', href: '/profil/sukses-story' },
    ],
  },
  {
    label: 'MEDIA & INFO',
    href: '#',
    subMenu: [
      { label: 'Belajar Online', href: '/media/belajar-online' },
      { label: 'BLOG', href: 'https://jisannihon.vercel.app'},
      { label: 'Galeri', href: '/media/galeri' },
    ],
  },
];

const Header = () => {
  // State untuk melacak menu mana yang sedang terbuka
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Handler untuk toggle dropdown
  const toggleDropdown = (label: string) => {
    // Jika dropdown yang sama diklik lagi, tutup; jika tidak, buka dropdown baru.
    setOpenDropdown(openDropdown === label ? null : label);
  };
  
  // Handler untuk menutup dropdown saat klik di luar
  
  return (
    <header className="fixed top-0 z-50 w-full bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Area Logo (Tidak Berubah) */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center">
            <div className="h-10 w-10 bg-red-700 rounded-full flex items-center justify-center text-white font-bold">あ</div>
            <span className="ml-2 text-lg font-semibold text-gray-800">AIKURO GAKUEN</span>
          </Link>
        </div>

        {/* Navigasi Minimalis (Desktop) */}
        <nav className="hidden lg:flex">
          <ul className="flex items-center space-x-6">
            {navItems.map((item) => (
              // Hapus className="group" karena kita tidak menggunakan group-hover lagi
              <li key={item.label} className="relative"> 
                {/* 1. Tambahkan onClick handler untuk menu utama yang memiliki subMenu.
                  2. Jika menu utama tidak memiliki subMenu, biarkan Link normal.
                  3. Tambahkan 'aria-expanded' untuk aksesibilitas.
                */}
                {item.subMenu ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Mencegah navigasi ke '#'
                      toggleDropdown(item.label);
                    }}
                    className="text-gray-700 hover:text-red-700 font-medium transition-colors focus:outline-none"
                    aria-expanded={openDropdown === item.label}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link href={item.href} className="text-gray-700 hover:text-red-700 font-medium transition-colors">
                    {item.label}
                  </Link>
                )}

                {/* Dropdown Content */}
                {item.subMenu && (
                  <ul 
                    // Tentukan apakah dropdown terbuka berdasarkan state openDropdown
                    className={`absolute left-1/2 top-full mt-2 w-56 -translate-x-1/2 rounded-md bg-white py-2 shadow-xl transition-all duration-300 border-t-4 border-red-700 ${
                      openDropdown === item.label // 👈 Kelas Kondisional di sini
                        ? 'visible opacity-100' // Terbuka
                        : 'invisible opacity-0' // Tertutup
                    }`}
                  >
                    {item.subMenu.map((subItem) => (
                      <li key={subItem.label}>
                        <Link href={subItem.href}  target="_blank" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700 transition-colors">
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Tombol CTA & Placeholder Menu Mobile (Tidak Berubah) */}
        <Link 
          href="/daftar" 
          className="rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-red-800 transition-colors hidden sm:block"
        >
          DAFTAR SEKARANG
        </Link>
        
        <button className="lg:hidden text-gray-600 hover:text-red-700">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </div>
    </header>
  );
};

export default Header;