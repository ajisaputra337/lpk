"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Award, Users, Calendar } from "lucide-react";

interface TrustBarProps {
    alumniCount: string;
}

export default function TrustBar({ alumniCount }: TrustBarProps) {
    const t = useTranslations("HomePage");

    const stats = useMemo(() => [
        {
            icon: <Calendar className="h-7 w-7 text-red-600" />,
            value: t("trustStat1Value"),
            label: t("trustStat1Label"),
        },
        {
            icon: <Users className="h-7 w-7 text-red-600" />,
            value: alumniCount,
            label: t("trustStat2Label"),
        },
        {
            icon: <Award className="h-7 w-7 text-red-600" />,
            value: t("trustStat3Value"),
            label: t("trustStat3Label"),
        },
    ], [t, alumniCount]);

    return (
        <section className="relative border-b border-gray-100 bg-white py-6">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-4 flex justify-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-bold text-red-700">
                        <Award className="h-3.5 w-3.5" />
                        {t("trustBadge")}
                    </span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center gap-1 text-center"
                        >
                            <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                                {stat.icon}
                            </div>
                            <span className="text-2xl font-black text-gray-900 md:text-3xl">
                                {stat.value}
                            </span>
                            <span className="text-xs font-medium tracking-wide text-gray-600 uppercase">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}