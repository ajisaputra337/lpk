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
    { code: "id", label: "ID", name: "Indonesia", flag: "🇮🇩" },
    { code: "en", label: "EN", name: "English", flag: "🇺🇸" },
    { code: "jp", label: "JP", name: "Japan", flag: "🇯🇵" },
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
          className="bg-white border-2 border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-4 py-2.5 rounded-full flex items-center gap-3 hover:bg-gray-50 transition-all active:scale-95 font-bold text-sm text-slate-800"
        >
          <Globe size={18} className="text-red-600" />
          <span className="uppercase">{locale}</span>
          <ChevronUp size={16} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute bottom-full mb-3 left-0 bg-white border border-slate-100 shadow-2xl rounded-2xl overflow-hidden min-w-[160px] animate-in fade-in zoom-in-95 slide-in-from-bottom-2">
            <div className="p-2 border-b border-slate-50">
              <p className="text-[10px] font-bold text-slate-400 px-3 uppercase tracking-wider">Select Language</p>
            </div>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-slate-50 transition-colors flex items-center gap-3 ${
                  locale === lang.code ? "bg-red-50 text-red-600 font-bold" : "text-slate-700"
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="flex-1">{lang.name}</span>
                {locale === lang.code && <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}