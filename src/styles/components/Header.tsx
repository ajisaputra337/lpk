"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

// Data nomor wa
const whatsappLink =
  "https://wa.me/6288215751500?text=Halo%2C%20saya%20tertarik%20dengan%20program%20LPK%20Aishiro%20Gakuen%20dan%20ingin%20mendaftar.%20Mohon%20info%20lebih%20lanjut.";

// Tipe link dropdown
interface NavItem {
  label: string;
  href: string;
  subMenu?: NavItem[];
}

// Data Navigasi
const navItems: NavItem[] = [
  { label: "HOME", href: "/" },
  {
    label: "PROGRAM",
    href: "#",
    subMenu: [
      { label: "Magang Jepang", href: "/program/magang-jepang" },
      { label: "Sekolah di Jepang", href: "/program/sekolah-jepang" },
      { label: "Tokutei Ginou", href: "/program/TokuteiGinou" },
    ],
  },
  {
    label: "PROFIL",
    href: "#",
    subMenu: [
      { label: "Company Profile", href: "/profil/company-profile" },
      { label: "Visi Misi", href: "/profil/visi-misi" },
    ],
  },
  {
    label: "MEDIA & INFO",
    href: "#",
    subMenu: [
      { label: "Galeri", href: "/media/galeri" },
      { label: "Persyaratan", href: "/media/persyaratan" },
      { label: "Sukses Story", href: "/media/success-story" },
      { label: "Kegiatan Fisik Sore", href: "/media/fisik-sore" },
    ],
  },
];

const LOGO_PATH = "/Images/logo_aishiro.png";
const LOGO_ALT = "Logo LPK Aishiro Gakuen";

// --- KOMPONEN DEKORASI SAKURA (VERSI 2D TEBAL & KIRI-KANAN) ---
const SakuraDecor = () => (
  <div className="pointer-events-none absolute inset-0 z-[-1] overflow-hidden">
    {/* Ornamen Bunga 2D di Pojok Kanan Atas (Tebal) */}
    <div className="absolute -top-6 -right-6 scale-110 opacity-100">
      <svg width="140" height="140" viewBox="0 0 100 100" fill="#FFB7C5">
        <circle cx="50" cy="50" r="8" fill="#F472B6" />
        <path
          d="M50 50 L50 20 A15 15 0 1 1 70 35 L50 50"
          fill="#FFB7C5"
          stroke="#F472B6"
          strokeWidth="1"
        />
        <path
          d="M50 50 L80 50 A15 15 0 1 1 65 70 L50 50"
          fill="#FFB7C5"
          stroke="#F472B6"
          strokeWidth="1"
        />
        <path
          d="M50 50 L50 80 A15 15 0 1 1 30 65 L50 50"
          fill="#FFB7C5"
          stroke="#F472B6"
          strokeWidth="1"
        />
        <path
          d="M50 50 L20 50 A15 15 0 1 1 35 30 L50 50"
          fill="#FFB7C5"
          stroke="#F472B6"
          strokeWidth="1"
        />
      </svg>
    </div>

    {/* Ornamen Bunga 2D di Pojok Kiri Atas (Tebal) */}
    <div className="absolute -top-6 -left-6 scale-110 rotate-45 opacity-90">
      <svg width="140" height="140" viewBox="0 0 100 100" fill="#FFB7C5">
        <circle cx="50" cy="50" r="8" fill="#F472B6" />
        <path
          d="M50 50 L50 20 A15 15 0 1 1 70 35 L50 50"
          fill="#FFB7C5"
          stroke="#F472B6"
          strokeWidth="1"
        />
        <path
          d="M50 50 L80 50 A15 15 0 1 1 65 70 L50 50"
          fill="#FFB7C5"
          stroke="#F472B6"
          strokeWidth="1"
        />
        <path
          d="M50 50 L50 80 A15 15 0 1 1 30 65 L50 50"
          fill="#FFB7C5"
          stroke="#F472B6"
          strokeWidth="1"
        />
        <path
          d="M50 50 L20 50 A15 15 0 1 1 35 30 L50 50"
          fill="#FFB7C5"
          stroke="#F472B6"
          strokeWidth="1"
        />
      </svg>
    </div>

    {/* Kelopak Bunga 2D Melayang - Opasitas Tebal (80%) */}
    <div className="animate-petal-fall absolute top-0 left-[10%] opacity-80">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="#FFB7C5"
        stroke="#F472B6"
        strokeWidth="0.5"
      >
        <path d="M12,21.5C12,21.5 15,18 15,15C15,12 12,10.5 12,10.5C12,10.5 9,12 9,15C9,18 12,21.5 12,21.5Z" />
      </svg>
    </div>
    <div className="animate-petal-fall-delayed absolute top-0 left-[40%] opacity-80">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="#FFB7C5"
        stroke="#F472B6"
        strokeWidth="0.5"
      >
        <path d="M12,21.5C12,21.5 15,18 15,15C15,12 12,10.5 12,10.5C12,10.5 9,12 9,15C9,18 12,21.5 12,21.5Z" />
      </svg>
    </div>
    <div className="animate-petal-fall absolute top-0 right-[35%] opacity-80">
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="#FDA4AF"
        stroke="#F43F5E"
        strokeWidth="0.5"
      >
        <path d="M12,21.5C12,21.5 15,18 15,15C15,12 12,10.5 12,10.5C12,10.5 9,12 9,15C9,18 12,21.5 12,21.5Z" />
      </svg>
    </div>
  </div>
);

const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState<string | null>(
    null,
  );

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileSubMenu(null);
  };

  const scrollToBottom = () => {
    setOpenDropdown(null);
    closeMobileMenu();
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 z-50 w-full bg-white shadow-md"
    >
      {/* Background Sakura - Ditambahkan di sini */}
      <SakuraDecor />

      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center"
          onClick={() => {
            setOpenDropdown(null);
            closeMobileMenu();
          }}
        >
          <div className="relative mr-2 h-12 w-12 lg:h-20 lg:w-20">
            <Image
              src={LOGO_PATH}
              alt={LOGO_ALT}
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
          <div className="ml-2 flex flex-col">
            <span className="text-sm font-semibold text-gray-900 lg:text-lg lg:leading-none">
              AISHIRO GAKUEN
            </span>
            <span className="text-sm text-red-600 lg:text-lg lg:leading-none">
              Magang Jepang
            </span>
          </div>
          <div className="ml-2 hidden flex-col justify-center rounded-md bg-yellow-300 px-3 py-1 lg:flex">
            <span className="text-lg leading-none font-semibold text-gray-900">
              インドネシア送り出し機関
            </span>
            <span className="text-lg leading-none text-gray-800">
              Sending Organization
            </span>
          </div>
        </Link>

        {/* NAV + CTA DESKTOP */}
        <div className="ml-auto hidden items-center gap-6 lg:flex">
          <nav>
            <ul className="flex items-center space-x-6">
              {navItems.map((item) => {
                const isOpen = openDropdown === item.label;
                return (
                  <li key={item.label} className="relative overflow-visible">
                    {item.subMenu ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleDropdown(item.label);
                        }}
                        className={`font-bold transition-colors ${isOpen ? "text-red-700" : "text-red-700 hover:text-yellow-500"}`}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className="font-bold text-red-700 transition-colors hover:text-yellow-500"
                      >
                        {item.label}
                      </Link>
                    )}

                    {item.subMenu && (
                      <ul
                        className={`absolute top-full left-1/2 z-50 mt-2 w-56 -translate-x-1/2 overflow-visible rounded-md border-t-4 border-red-700 bg-white shadow-xl transition-all duration-200 ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
                      >
                        {item.subMenu.map((sub) => (
                          <li key={sub.label}>
                            <Link
                              href={sub.href}
                              onClick={() => setOpenDropdown(null)}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-700"
                            >
                              {sub.label}
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

          <div className="flex items-center gap-3">
            <button
              onClick={scrollToBottom}
              className="rounded-md border-2 border-yellow-700 px-4 py-2 text-sm font-bold text-yellow-500 transition-all hover:bg-yellow-50"
            >
              CONTACT
            </button>

            <Link
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-red-700 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-red-800"
            >
              DAFTAR SEKARANG
            </Link>
          </div>
        </div>

        {/* HAMBURGER */}
        <button
          className="relative z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-50 bg-white transition-transform lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-16 items-center justify-between border-b px-6">
          <span className="font-bold">NAVIGASI</span>
          <button onClick={closeMobileMenu}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-6">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className="text-lg font-bold text-yellow-700"
                    onClick={() => !item.subMenu && closeMobileMenu()}
                  >
                    {item.label}
                  </Link>
                  {item.subMenu && (
                    <button
                      onClick={() =>
                        setOpenMobileSubMenu(
                          openMobileSubMenu === item.label ? null : item.label,
                        )
                      }
                    >
                      {openMobileSubMenu === item.label ? (
                        <ChevronDown />
                      ) : (
                        <ChevronRight />
                      )}
                    </button>
                  )}
                </div>

                {item.subMenu && openMobileSubMenu === item.label && (
                  <ul className="mt-2 space-y-2 border-l-2 border-red-600 pl-4">
                    {item.subMenu.map((sub) => (
                      <li key={sub.label}>
                        <Link
                          href={sub.href}
                          onClick={closeMobileMenu}
                          className="block p-1 font-medium text-gray-700"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 p-6">
          <button
            onClick={scrollToBottom}
            className="w-full rounded-md border-2 border-yellow-700 px-4 py-3 font-bold text-yellow-700"
          >
            CONTACT
          </button>

          <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-md bg-red-700 px-4 py-3 text-center font-bold text-white"
            onClick={closeMobileMenu}
          >
            DAFTAR SEKARANG
          </Link>
        </div>
      </div>

      {/* CSS Animasi Sakura */}
      <style jsx>{`
        @keyframes petal-fall {
          0% {
            transform: translateY(-20%) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-petal-fall {
          animation: petal-fall 8s linear infinite;
        }
        .animate-petal-fall-delayed {
          animation: petal-fall 11s linear infinite;
          animation-delay: 3s;
        }
      `}</style>
    </header>
  );
};

export default Header;
