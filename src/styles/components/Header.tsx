'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react'; // 👈 Import useRef dan useEffect
import Image from 'next/image'; // 👈 Import Image dari Next.js
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'; // Ikon untuk Mobile

// Tipe link dropdown (Tidak Berubah)
interface NavItem {
  label: string;
  href: string;
  subMenu?: NavItem[];
}

// Data Struktur Navigasi (Tidak Berubah)
const navItems: NavItem[] = [
  // ... (Data Navigasi Anda)
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
      { label: 'Sukses Story', href: '/profil/success-story' },
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
  // State untuk melacak menu desktop
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  
  // Tambahan State untuk Mobile (Diperlukan untuk Responsif Penuh)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState<string | null>(null);


  // Handler untuk toggle dropdown (Desktop)
  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };
  
  // Handler untuk menutup menu Mobile
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileSubMenu(null);
  };
  
  
  /* ------------------------------------------------------------
     1. LOGIKA KLIK DI LUAR (CLICK OUTSIDE LISTENER)
     ------------------------------------------------------------ */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Jika dropdown terbuka DAN klik tidak terjadi di dalam header, tutup dropdown
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    // Tambahkan listener saat komponen di-mount
    document.addEventListener('mousedown', handleClickOutside);
    
    // Bersihkan listener saat komponen di-unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]); // Dependency: hanya berjalan jika openDropdown berubah


  return (
    <header ref={headerRef} className="fixed top-0 z-50 w-full bg-white shadow-md"> {/* 👈 Pasang ref di sini */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Area Logo */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center" onClick={() => { setOpenDropdown(null); closeMobileMenu(); }}>
            {/* 2. Menggunakan komponen Image untuk Logo */}
            {/* Ganti dengan URL Logo Anda yang sebenarnya, pastikan file ada di /public/ */}
            <div className="h-10 w-10 bg-red-700 rounded-full flex items-center justify-center text-white font-bold">あ</div>
            <span className="ml-2 text-lg font-semibold text-gray-800">AISHIRO GAKUEN</span>
          </Link>
        </div>

        {/* Navigasi Minimalis (Desktop) */}
        <nav className="hidden lg:flex">
          <ul className="flex items-center space-x-6">
            {navItems.map((item) => {
              const isOpen = openDropdown === item.label;
              
              return (
                <li key={item.label} className="relative"> 
                  {item.subMenu ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleDropdown(item.label);
                      }}
                      className={`text-gray-700 font-medium transition-colors focus:outline-none ${isOpen ? 'text-red-700' : 'hover:text-red-700'}`}
                      aria-expanded={isOpen}
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
                      className={`absolute left-1/2 top-full mt-2 w-56 -translate-x-1/2 rounded-md bg-white py-2 shadow-xl transition-all duration-300 border-t-4 border-red-700 ${
                        isOpen ? 'visible opacity-100' : 'invisible opacity-0'
                      }`}
                    >
                      {item.subMenu.map((subItem) => (
                        <li key={subItem.label}>
                          <Link 
                            href={subItem.href} 
                            target="_blank" 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700 transition-colors"
                            onClick={() => setOpenDropdown(null)} // Tutup setelah klik sub item
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Tombol CTA Desktop */}
        <Link 
          href="/daftar" 
          className="rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-red-800 transition-colors hidden lg:block"
          onClick={() => setOpenDropdown(null)}
        >
          DAFTAR SEKARANG
        </Link>
        
        {/* Tombol Hamburger (Mobile) */}
        <button 
            className="lg:hidden text-gray-600 hover:text-red-700"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
        >
            <Menu className="h-6 w-6" />
        </button>
      </div>
      
      {/* 3. Area Menu Mobile (Diintegrasikan dari langkah sebelumnya) */}
      <div
          className={`
            fixed inset-0 z-50 transform bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-100 px-6">
            <span className="text-lg font-bold text-gray-800">NAVIGASI</span>
            <button 
                onClick={closeMobileMenu}
                className="text-gray-600 hover:text-red-700"
                aria-label="Close Menu"
            >
                <X className="h-6 w-6" />
            </button>
        </div>

        {/* Daftar Link Mobile */}
        <nav className="p-6">
            <ul className="space-y-1">
                {navItems.map((item) => (
                    <li key={item.label}>
                        <div className="flex items-center justify-between rounded-md p-3 hover:bg-gray-50">
                            <Link
                                href={item.href}
                                className="text-lg font-medium text-gray-700"
                                onClick={() => { 
                                    if (!item.subMenu) closeMobileMenu(); 
                                }}
                            >
                                {item.label}
                            </Link>
                            
                            {item.subMenu && (
                                <button
                                    onClick={() => setOpenMobileSubMenu(openMobileSubMenu === item.label ? null : item.label)}
                                    className="text-gray-500 hover:text-red-700"
                                    aria-expanded={openMobileSubMenu === item.label}
                                >
                                    {openMobileSubMenu === item.label ? (
                                        <ChevronDown className="h-5 w-5" />
                                    ) : (
                                        <ChevronRight className="h-5 w-5" />
                                    )}
                                </button>
                            )}
                        </div>

                        {/* SubMenu Mobile */}
                        {item.subMenu && openMobileSubMenu === item.label && (
                            <ul className="mt-2 space-y-1 border-l-2 border-red-100 pl-4">
                                {item.subMenu.map((subItem) => (
                                    <li key={subItem.label}>
                                        <Link 
                                            href={subItem.href}
                                            target="_blank"
                                            className="block rounded-md p-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-700"
                                            onClick={closeMobileMenu}
                                        >
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

        {/* Tombol CTA Mobile */}
        <div className="p-6">
            <Link 
                href="/daftar" 
                className="block w-full rounded-md bg-red-700 px-4 py-3 text-center text-lg font-semibold text-white shadow-lg hover:bg-red-800 transition-colors"
                onClick={closeMobileMenu}
            >
                DAFTAR SEKARANG
            </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;