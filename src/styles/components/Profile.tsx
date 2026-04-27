"use client";

import React from "react";
import { Landmark, Briefcase, Smile } from "lucide-react";
import { useTranslations } from "next-intl";

// Komponen Hiasan Sakura (Tetap sama)
const SakuraDecoration = ({ className = "", style = {} }) => {
  return (
    <svg
      className={`absolute opacity-50 ${className}`}
      style={style}
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M40 10C40 10 45 20 55 20C65 20 70 10 70 10C70 10 65 0 55 0C45 0 40 10 40 10Z" fill="#ef4444" />
      <path d="M60 30C60 30 65 40 75 40C85 40 90 30 90 30C90 30 85 20 75 20C65 20 60 30 60 30Z" fill="#ef4444" transform="translate(-20,-20)" />
      <path d="M20 40C20 40 25 50 35 50C45 50 50 40 50 40C50 40 45 30 35 30C25 30 20 40 20 40Z" fill="#ef4444" />
      <path d="M30 60C30 60 35 70 45 70C55 70 60 60 60 60C60 60 55 50 45 50C35 50 30 60 30 60Z" fill="#ef4444" />
    </svg>
  );
};

const Profile: React.FC = () => {
  const t = useTranslations("Profile");
  const tk = useTranslations("KokoroGamae");
  const [showFullList, setShowFullList] = React.useState(false);

  const kokoroItems = tk.raw("list") as string[];

  return (
    <section id="Profile" className="relative bg-white py-20">
      {/* Background Decorations Wrapper */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <SakuraDecoration className="animate-float-premium top-10 left-10" style={{ animationDelay: '0s' }} />
        <SakuraDecoration className="animate-float-premium top-1/4 right-16" style={{ animationDelay: '1.5s' }} />
        <SakuraDecoration className="animate-float-premium bottom-20 left-1/4" style={{ animationDelay: '3s' }} />
        <SakuraDecoration className="animate-float-premium right-10 bottom-10" style={{ animationDelay: '4.5s' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header Section */}
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="text-4xl font-extrabold tracking-wider text-gray-800">
            {t("title1")} <span className="text-red-700">Aishiro</span>{" "}
            <span className="text-yellow-600">Gakuen</span>
          </h2>
          <p className="mt-2 text-xl italic text-gray-600">
            {t("subtitle")}
          </p>
          <div className="mt-4 h-1.5 w-32 rounded-full bg-red-700"></div>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row items-start">
          {/* Kolom Kiri: VIDEO dan Poin Utama (Sticky) */}
          <div className="relative w-full lg:w-1/3 lg:sticky lg:top-32">
            <div className="relative w-full transform overflow-hidden rounded-2xl border-4 border-red-700 pt-[56.25%] shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/moYG25nBxNg"
                title={t("videoTitle")}
                loading="lazy"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-start rounded-lg border-l-4 border-red-700 bg-red-50 p-4 shadow-md">
                <Landmark className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-red-700" />
                <div>
                  <p className="font-bold text-gray-800">{t("point1Title")}</p>
                  <p className="text-sm text-gray-600">{t("point1Desc")}</p>
                </div>
              </div>
              <div className="flex items-start rounded-lg border-l-4 border-red-700 bg-red-50 p-4 shadow-md">
                <Briefcase className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-red-700" />
                <div>
                  <p className="font-bold text-gray-800">{t("point2Title")}</p>
                  <p className="text-sm text-gray-600">{t("point2Desc")}</p>
                </div>
              </div>
              <div className="flex items-start rounded-lg border-l-4 border-red-700 bg-red-50 p-4 shadow-md">
                <Smile className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-red-700" />
                <div>
                  <p className="font-bold text-gray-800">{t("point3Title")}</p>
                  <p className="text-sm text-gray-600">{t("point3Desc")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Teks Utama */}
          <div className="w-full space-y-6 text-gray-700 lg:w-2/3">
            <div className="rounded-lg border-t-4 border-red-700 bg-gray-50 p-6 shadow-inner">
              <p className="text-lg leading-relaxed">
                <span className="font-bold text-red-700">LPK Aishiro Gakuen</span>
                {t("desc1")}
              </p>
              <p className="mt-4 text-lg leading-relaxed">
                {t("desc2")}{" "}
                <span className="font-semibold italic">
                  {t("descHighlight")}
                </span>
              </p>
            </div>

            <div className="rounded-lg bg-red-50 p-6 shadow-lg border-l-4 border-red-700">
              <h3 className="mb-3 flex items-center text-2xl font-semibold text-red-700">
                <Smile className="mr-2 h-6 w-6" />
                {t("goalTitle")}
              </h3>
              <p className="text-lg leading-relaxed">
                {t("goalDesc")}
              </p>

              {/* Toggle Button for Kokoro Gamae */}
              <button
                onClick={() => setShowFullList(!showFullList)}
                className="mt-6 flex items-center gap-2 rounded-full bg-red-600 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-red-700 active:scale-95"
              >
                {showFullList ? t("showLess") : t("showMore")}
                <svg
                  className={`h-4 w-4 transition-transform duration-300 ${showFullList ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Full List Items */}
              {showFullList && (
                <div className="mt-8 grid grid-cols-1 gap-3 animate-fade-in-down">
                  {kokoroItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-lg bg-white/60 p-3 shadow-sm border border-red-100 transition-all hover:border-red-300"
                    >
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-700 text-xs font-bold text-white">
                        {index + 1}
                      </span>
                      <p className="text-[0.95rem] leading-snug text-gray-800">{item}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Cleaned up redundant animations */
      `}</style>
    </section>
  );
};

export default Profile;