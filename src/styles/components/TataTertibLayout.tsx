"use client";

import { useTranslations } from "next-intl";

interface TataTertibLayoutProps {
    category: "instruktur" | "asrama" | "asramaPutri" | "siswa";
}

const TataTertibLayout = ({ category }: TataTertibLayoutProps) => {
    const t = useTranslations("TataTertibPage");
    const b = useTranslations("Navbar");

    const rules = t.raw(`${category}.rules`) as string[];
    const title = t(`${category}.title`);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="mx-auto max-w-4xl px-4">

                <div className="mt-8 bg-white p-8 shadow-lg border-[12px] border-double border-gray-300 min-h-[800px] flex flex-col items-center">
                    <h1 className="text-center text-3xl font-bold uppercase tracking-widest text-gray-900">
                        {title}
                    </h1>
                    <h2 className="mt-2 text-center text-xl font-bold text-red-600">
                        {t("lpkaishiro")}
                    </h2>

                    <div className="mt-12 w-full max-w-2xl text-gray-800 leading-relaxed">
                        <ol className="list-decimal space-y-3 pl-6">
                            {rules.map((rule, index) => (
                                <li key={index} className="pl-2 whitespace-pre-line">
                                    {rule}
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="mt-auto pt-12 self-end text-sm text-gray-500 italic">
                        * {t("lpkaishiro")}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TataTertibLayout;
