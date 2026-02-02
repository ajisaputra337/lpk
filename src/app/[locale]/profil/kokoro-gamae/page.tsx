"use client";

import { useTranslations } from "next-intl";
import Header from "../../../../styles/components/Header";
import Breadcrumbs from "../../../../styles/components/Breadcrumbs";
import SakuraBackground from "../../../../styles/components/SakuraBackground";
import Image from "next/image";

export default function KokoroGamaePage() {
    const t = useTranslations("KokoroGamae");
    const listItems = t.raw("list") as string[];

    const breadcrumbItems = [
        { label: t("breadcrumb.profil"), href: "/profil" },
        { label: t("breadcrumb.current"), href: "/profil/kokoro-gamae" },
    ];

    // Correct Japanese Kanji numbers (1-30)
    const kanjiNumbers = [
        "一", "二", "三", "四", "五", "六", "七", "八", "九", "十",
        "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
        "二十一", "二十二", "二十三", "二十四", "二十五", "二十六", "二十七", "二十八", "二十九", "三十"
    ];

    return (
        <>
            <Header />
            <SakuraBackground />

            <main className="min-h-screen bg-neutral-50 pb-20">
                {/* HERO SECTION */}
                <section className="relative h-[400px] w-full overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src="/Images/kyoto.jpg"
                            alt="Background"
                            fill
                            className="object-cover brightness-50 saturate-[0.8]"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-neutral-50"></div>
                    </div>

                    <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
                            {t("title")}
                        </h1>
                        <p className="mt-4 max-w-2xl text-lg font-medium text-white md:text-xl">
                            {t("subtitle")}
                        </p>
                        <div className="mt-8 flex items-center justify-center space-x-4">
                            <div className="h-px w-12 bg-white/30"></div>
                            <span className="text-2xl font-japanese text-white/50 tracking-widest">心構え</span>
                            <div className="h-px w-12 bg-white/30"></div>
                        </div>
                    </div>
                </section>

                <div className="relative z-20 -mt-10 mx-auto max-w-4xl px-6">
                    <div className="rounded-xl bg-white/70 p-2 shadow-sm backdrop-blur-lg border border-white/50 inline-block mb-8">
                        <Breadcrumbs items={breadcrumbItems} />
                    </div>

                    {/* LIST SECTION */}
                    <div className="space-y-6">
                        {listItems.map((item, index) => (
                            <div
                                key={index}
                                className="group relative flex items-center overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-red-300 hover:shadow-xl hover:-translate-y-1"
                            >
                                {/* Decorative Kanji Index - Lightened slightly for subtleness */}
                                <div className="absolute -right-4 -top-6 select-none text-8xl font-bold text-neutral-100/40 transition-colors group-hover:text-red-50/60">
                                    {kanjiNumbers[index] || index + 1}
                                </div>

                                {/* Number indicator - Now darker by default for better visibility on mobile */}
                                <div className="relative mr-8 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-red-50 text-2xl font-black text-red-700 transition-all group-hover:bg-red-600 group-hover:text-white group-hover:rotate-6">
                                    {String(index + 1).padStart(2, '0')}
                                </div>

                                <div className="relative z-10 flex-grow">
                                    <p className="text-xl font-bold text-neutral-900 transition-colors group-hover:text-red-700">
                                        {item}
                                    </p>
                                    <div className="mt-2 h-0.5 w-full bg-red-600 opacity-10 group-hover:opacity-40 transition-all duration-500"></div>
                                </div>

                                {/* Aesthetic Right Arrow indicator (now always visible but subtle) */}
                                <div className="relative z-10 ml-4 lg:transform lg:translate-x-4 opacity-30 lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 transition-all">
                                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </main>
        </>
    );
}
