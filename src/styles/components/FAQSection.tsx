"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
    const t = useTranslations("HomePage");
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = useMemo(() => [
        { q: t("faq1Q"), a: t("faq1A") },
        { q: t("faq2Q"), a: t("faq2A") },
        { q: t("faq3Q"), a: t("faq3A") },
        { q: t("faq4Q"), a: t("faq4A") },
        { q: t("faq5Q"), a: t("faq5A") },
    ], [t]);

    const toggle = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section className="relative overflow-hidden bg-gray-50 py-20">
            <div className="relative mx-auto max-w-3xl px-6">
                {/* Header */}
                <div className="mb-12 flex flex-col items-center">
                    <div className="mb-4 h-1 w-24 rounded-full bg-red-700"></div>
                    <h2 className="text-center text-3xl font-bold text-gray-800">
                        {t("faqTitle")}
                    </h2>
                    <div className="mt-4 h-1 w-24 rounded-full bg-red-700"></div>
                </div>

                {/* Accordion */}
                <div className="space-y-3">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200"
                        >
                            <button
                                onClick={() => toggle(idx)}
                                className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-gray-50"
                            >
                                <span className="pr-4 text-sm font-bold text-gray-800 md:text-base">
                                    {faq.q}
                                </span>
                                <ChevronDown
                                    className={`h-5 w-5 flex-shrink-0 text-red-600 transition-transform duration-300 ${openIndex === idx ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? "max-h-60" : "max-h-0"
                                    }`}
                            >
                                <div className="border-t border-gray-100 px-6 py-4">
                                    <p className="text-sm leading-relaxed text-gray-600">
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
