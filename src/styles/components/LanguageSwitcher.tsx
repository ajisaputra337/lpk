"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "../../i18n/routing";
import { useState } from "react";
import { Globe, ChevronUp } from "lucide-react"; // Tambah ikon biar cakep

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "id", label: "ID", name: "Indonesia" },
    { code: "en", label: "EN", name: "English" },
    { code: "jp", label: "JP", name: "日本語" },
  ];

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[999]">
      <div className="relative">
        {/* Button Utama */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-red-600 border-2 border-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-4 py-2.5 rounded-full flex items-center gap-3 transition-all duration-300 active:scale-75 font-bold text-sm text-white group"
        >
          <Globe size={18} className="text-white group-hover:scale-110 transition-transform" />
          <span className="uppercase text-white">{locale}</span>
          <ChevronUp size={16} className={`text-white transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Dropdown Menu */}
        <div
          className={`absolute bottom-full mb-3 left-0 bg-white border-2 border-red-600 shadow-2xl rounded-2xl overflow-hidden min-w-[160px] transition-all duration-500 origin-bottom-left ${isOpen
            ? "opacity-100 scale-100 translate-y-0 visible"
            : "opacity-0 scale-90 translate-y-10 invisible pointer-events-none"
            }`}
        >
          <div className="p-3 border-b border-red-600 bg-red-600">
            <p className="text-[10px] font-black text-white px-1 uppercase tracking-widest">Select Language</p>
          </div>
          <div className="p-1.5 bg-white">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left px-4 py-3 text-sm transition-all duration-300 flex items-center gap-3 rounded-xl mb-1 last:mb-0 border-2 ${locale === lang.code
                  ? "bg-red-600 text-white border-red-600 font-bold shadow-lg scale-[1.02]"
                  : "bg-white text-red-600 border-transparent hover:bg-red-50 hover:border-red-100"
                  }`}
              >
                <span className="flex-1">{lang.name}</span>
                {locale === lang.code && (
                  <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}