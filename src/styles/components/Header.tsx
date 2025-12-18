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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center"
          onClick={() => {
            setOpenDropdown(null);
            closeMobileMenu();
          }}
        >
          <div className="relative h-20 w-20">
            <Image
              src={LOGO_PATH}
              alt={LOGO_ALT}
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
          <div className="ml-2 flex flex-col">
            <span className="text-lg leading-none font-semibold text-gray-900">
              AISHIRO GAKUEN
            </span>
            <span className="text-lg leading-none text-red-600">
              Magang Jepang
            </span>
          </div>
          <div className="ml-2 flex flex-col justify-center rounded-md bg-yellow-300 px-3 py-1">
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
                  <li key={item.label} className="relative">
                    {item.subMenu ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleDropdown(item.label);
                        }}
                        // Warna Kuning (yellow-700) saat normal & merah saat diklik
                        className={`font-bold transition-colors ${isOpen ? "text-red-700" : "text-red-700 hover:text-yellow-500"}`}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        // Warna Kuning (yellow-700)
                        className="font-bold text-red-700 transition-colors hover:text-yellow-500"
                      >
                        {item.label}
                      </Link>
                    )}

                    {item.subMenu && (
                      <ul
                        className={`absolute top-full left-1/2 mt-2 w-56 -translate-x-1/2 rounded-md border-t-4 border-red-700 bg-white shadow-xl transition ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
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
            {/* Tombol Contact Tetap Pakai Kotak */}
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
        <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(true)}>
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
    </header>
  );
};

export default Header;
