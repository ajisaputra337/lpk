"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";

const whatsappLink =
    "https://wa.me/6288215751500?text=Halo%2C%20saya%20tertarik%20dengan%20program%20LPK%20Aishiro%20Gakuen%20dan%20ingin%20mendaftar.%20Mohon%20info%20lebih%20lanjut.";

export default function MobileCTABar() {
    const t = useTranslations("HomePage");
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past hero (600px)
            setVisible(window.scrollY > 600);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-[9998] border-t border-red-200 bg-white/95 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] backdrop-blur-sm transition-transform duration-300 md:hidden ${visible ? "translate-y-0" : "translate-y-full"
                }`}
        >
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all active:scale-95 hover:bg-red-700"
            >
                <MessageCircle className="h-4 w-4" />
                {t("mobileCta")}
            </a>
        </div>
    );
}
