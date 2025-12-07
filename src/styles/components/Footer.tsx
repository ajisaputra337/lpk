// components/Footer.tsx
import Link from 'next/link';
import React from 'react';
// Jika kamu pakai lucide-react untuk ikon lain:
import { FaTiktok } from 'react-icons/fa6';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';

// Komponen SVG custom untuk TikTok
// const TikTokIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="currentColor"
//     stroke="none"
//     className={`h-6 w-6 ${props.className || ''}`}
//   >
//     <path d="M16.5 6.096A4.5 4.5 0 0 0 12 1.5v9a1.5 1.5 0 0 1-3 0V1.5h-3v14.453c0 3.992 3.253 7.247 7.245 7.247 4.088 0 7.355-3.414 7.355-7.618V6.096h-3z"/>
//   </svg>
// );

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        {/* Grid Footer: 1 kolom (mobile) → 4 kolom (md ke atas) */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-16">
          
          {/* Kolom 1: Logo & Deskripsi */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <div className="h-8 w-8 bg-red-700 rounded-full flex items-center justify-center text-white font-bold text-sm">あ</div>
              <span className="ml-2 text-xl font-bold text-white">AISHIRO GAKUEN</span>
            </Link>
            <p className="text-sm text-gray-400 mt-2">
              Jalur sukses menuju karir impian di Jepang dengan pelatihan bahasa dan fisik terbaik.
            </p>
          </div>

          {/* Kolom 2: Navigasi */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Navigasi</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#Profile" className="text-sm text-gray-400 hover:text-red-400 transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="https://jisannihon.vercel.app" className="text-sm text-gray-400 hover:text-red-400 transition-colors">
                  Blog & Berita
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start text-sm text-gray-400">
                <Mail className="h-4 w-4 mr-2 mt-1 text-red-400 flex-shrink-0" />
                <span>info@aishirogakuen.com</span>
              </li>
              <li className="flex items-start text-sm text-gray-400">
                <Phone className="h-4 w-4 mr-2 mt-1 text-red-400 flex-shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-start text-sm text-gray-400">
                <MapPin className="h-4 w-4 mr-2 mt-1 text-red-400 flex-shrink-0" />
                <span>Jl. Pendidikan No. 12, Semarang, Jawa Tengah</span>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Media Sosial */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Ikuti Kami</h3>
            <div className="flex space-x-4">
              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@lpk_aishirogakuen"
                aria-label="FaTiktok"
                className="text-gray-400 hover:text-red-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok className="h-6 w-6" />
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/lpk_aishiro/"
                aria-label="Instagram"
                className="text-gray-400 hover:text-red-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-6 w-6" />
              </a>
              {/* Tambahkan ikon media sosial lain jika perlu */}
            </div>
          </div>

        </div>

        {/* Garis pemisah & copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} LPK Aishiro Gakuen Semarang. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
