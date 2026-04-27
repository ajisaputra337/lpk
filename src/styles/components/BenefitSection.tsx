"use client";

import { useTranslations } from "next-intl";
import { BadgeCheck, Banknote, HeartHandshake } from "lucide-react";

export default function BenefitSection() {
    const t = useTranslations("HomePage");

    const benefits = [
        {
            icon: <BadgeCheck className="h-8 w-8" />,
            title: t("benefit1Title"),
            desc: t("benefit1Desc"),
            accent: "from-red-500 to-red-600",
        },
        {
            icon: <Banknote className="h-8 w-8" />,
            title: t("benefit2Title"),
            desc: t("benefit2Desc"),
            accent: "from-yellow-500 to-amber-500",
        },
        {
            icon: <HeartHandshake className="h-8 w-8" />,
            title: t("benefit3Title"),
            desc: t("benefit3Desc"),
            accent: "from-red-600 to-red-700",
        },
    ];

    return (
        <section className="relative overflow-hidden bg-gray-50 py-20">
            <div className="relative mx-auto max-w-7xl px-6">
                {/* Header */}
                <div className="mb-12 flex flex-col items-center">
                    <div className="mb-4 h-1 w-24 rounded-full bg-red-700"></div>
                    <h2 className="text-center text-3xl font-bold text-gray-800">
                        {t("benefitTitle")}
                    </h2>
                    <div className="mt-4 h-1 w-24 rounded-full bg-red-700"></div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {benefits.map((b, idx) => (
                        <div
                            key={idx}
                            className="group relative flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            {/* Icon */}
                            <div
                                className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${b.accent} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                            >
                                {b.icon}
                            </div>

                            <h3 className="mb-3 text-xl font-bold text-gray-800">
                                {b.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-gray-600">{b.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
