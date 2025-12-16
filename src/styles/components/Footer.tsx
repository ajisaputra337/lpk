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
        {/* Grid Footer: 1 kolom (mobile) → 4 kolom (md ke atas) */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-16">
          {/* Kolom 1: Logo & Deskripsi */}
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
          </div>

          {/* Kolom 2: Navigasi */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Navigasi</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#Profile"
                  className="text-sm text-gray-400 transition-colors hover:text-red-400"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="https://jisannihon.vercel.app"
                  className="text-sm text-gray-400 transition-colors hover:text-red-400"
                >
                  Blog & Berita
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Hubungi Kami
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

          {/* Kolom 4: Media Sosial */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Ikuti Kami
            </h3>
            <div className="flex space-x-4">
              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@lpk_aishirogakuen"
                aria-label="FaTiktok"
                className="text-gray-400 transition-colors hover:text-red-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok className="h-6 w-6" />
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/lpk_aishiro/"
                aria-label="Instagram"
                className="text-gray-400 transition-colors hover:text-red-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://line.me/ti/p/~aishiro426"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block"
              >
                <Image
                  src="/Images/line-qrcode.jpeg"
                  alt="QR Code LINE Aishiro Gakuen"
                  width={120}
                  height={120}
                  className="rounded-md border border-gray-600 transition-transform hover:scale-105"
                />
                <p className="mt-2 text-center text-xs text-gray-400">
                  Scan untuk chat via LINE
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
