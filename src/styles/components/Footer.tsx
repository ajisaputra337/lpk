// components/Footer.tsx
import Link from "next/link";
import React from "react";
import Image from "next/image";
// Jika kamu pakai lucide-react untuk ikon lain:
import { FaTiktok } from "react-icons/fa6";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 pt-12 pb-8 text-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Grid Footer: 1 kolom (mobile) → 3 kolom (md ke atas) */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-16">
          {/* Kolom 1: Logo & Deskripsi + Navigasi */}
          <div>
            <Link href="/" className="mb-4 flex items-center">
              {/* <div className="h-8 w-8 bg-red-700 rounded-full flex items-center justify-center text-white font-bold text-sm">あ</div> */}
              <span className="ml-2 text-xl font-bold text-white">
                AISHIRO GAKUEN
              </span>
            </Link>
            <p className="mt-2 text-sm text-gray-400">
              Jalur sukses menuju karir impian di Jepang dengan pelatihan bahasa
              dan fisik terbaik.
            </p>

            {/* Navigasi di bawah deskripsi */}
            <div className="mt-6">
              <h3 className="mb-4 text-lg font-semibold text-white">Navigation</h3>
              <ul className="space-y-2">
                {/* <li>
                  <Link
                    href="https://jisannihon.vercel.app"
                    className="text-sm text-gray-400 transition-colors hover:text-red-400"
                  >
                    Blog & Berita
                  </Link>
                </li> */}
                <li>
                  <Link
                    href="/profil/company-profile"
                    className="text-sm text-gray-400 transition-colors hover:text-red-400"
                  >
                    Company Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/media/galeri"
                    className="text-sm text-gray-400 transition-colors hover:text-red-400"
                  >
                    Gallery
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Kolom 2: Kontak */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Contact Us
            </h3>

            <ul className="space-y-3">
              <li className="flex items-start text-sm text-gray-400">
                <Mail className="mt-1 mr-2 h-4 w-4 flex-shrink-0 text-red-400" />
                <a
                  href="mailto:aishiro426@gmail.com"
                  className="hover:underline"
                >
                  aishiro426@gmail.com
                </a>
              </li>

              <li className="flex items-start text-sm text-gray-400">
                <Phone className="mt-1 mr-2 h-4 w-4 flex-shrink-0 text-red-400" />

                <span>
                  <a
                    href="https://wa.me/6288215751500"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 text-gray-400 hover:underline"
                  >
                    +62 882-1575-1500 (WhatsApp)
                  </a>
                </span>
              </li>

              {/* LINE contact */}
              {/* LINE QR Code */}
              <li className="flex items-start text-sm text-gray-400">
                <Phone className="mt-1 mr-2 h-4 w-4 flex-shrink-0 text-red-400" />
                <div>
                  <a
                    href="https://line.me/ti/p/~aishiro426"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-gray-400 hover:underline"
                  >
                    +62 882-1575-1500 (LINE)
                  </a>
                </div>
              </li>
              <li className="flex items-start text-sm text-gray-400">
                <MapPin className="mt-1 mr-2 h-4 w-4 flex-shrink-0 text-red-400" />
                <span>
                  Jl. Palebon VI No.5, Palebon, Kec. Pedurungan, Kota Semarang,
                  Jawa Tengah 50199
                </span>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Media Sosial */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Follow Us
            </h3>
            <div className="flex space-x-2">
              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@lpk_aishirogakuen"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block"
              >
                <Image
                  src="/Images/qr-tiktok-aishiro.png"
                  alt="QR Code TikTok Aishiro Gakuen"
                  width={100}
                  height={100}
                  className="rounded-md border border-gray-600 transition-transform hover:scale-105"
                />
                <p className="mt-2 text-xs text-gray-400">
                  Scan to follow us on TikTok
                </p>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/lpk_aishiro/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block"
              >
                <Image
                  src="/Images/qr-insta-aishiro.png"
                  alt="QR Code Instagram Aishiro Gakuen"
                  width={100}
                  height={100}
                  className="rounded-md border border-gray-600 transition-transform hover:scale-105"
                />
                <p className="mt-2 text-xs text-gray-400">
                  Scan to follow us on Instagram
                </p>
                {/* <Instagram className="h-6 w-6" /> */}
              </a>
              <a
                href="https://line.me/R/ti/p/~aishiro426"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block"
              >
                <Image
                  src="/Images/qr-line-aishiro.png"
                  alt="QR Code LINE Aishiro Gakuen"
                  width={100}
                  height={100}
                  className="rounded-md border border-gray-600 transition-transform hover:scale-105"
                />
                <p className="mt-2 text-xs text-gray-400">
                  Scan for chat via LINE
                </p>
              </a>
              {/* Tambahkan ikon media sosial lain jika perlu */}
            </div>
          </div>
        </div>

        {/* Garis pemisah & copyright */}
        <div className="mt-12 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} LPK Aishiro Gakuen Semarang. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
