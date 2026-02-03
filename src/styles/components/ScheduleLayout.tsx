"use client";

import { useTranslations } from "next-intl";

const ScheduleLayout = () => {
    const t = useTranslations("SchedulePage");
    const b = useTranslations("Navbar");

    const scheduleRows = t.raw("tableSchedule.rows") as string[][];
    const fmdMorningRows = t.raw("fmdMateri.morningRows") as string[][];
    const fmdAfternoonRows = t.raw("fmdMateri.afternoonRows") as string[][];

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="mx-auto max-w-4xl px-4">

                <div className="mt-8 bg-white p-8 shadow-lg border-[12px] border-double border-gray-300 min-h-[800px] flex flex-col items-center">
                    {/* Main Title */}
                    <h1 className="text-center text-3xl font-bold uppercase tracking-widest text-gray-900">
                        {t("title")}
                    </h1>
                    <h2 className="mt-2 text-center text-xl font-bold text-red-600">
                        {t("lpkaishiro")}
                    </h2>

                    {/* Schedule Table */}
                    <div className="mt-12 w-full overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-800 text-sm md:text-base">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-800 px-4 py-2 text-center font-bold w-1/3">
                                        {t("tableSchedule.thTime")}
                                    </th>
                                    <th className="border border-gray-800 px-4 py-2 text-center font-bold">
                                        {t("tableSchedule.thActivity")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {scheduleRows.map((row, idx) => (
                                    <tr key={idx} className={row[1].includes("ISOMA") ? "text-red-600 font-semibold" : ""}>
                                        <td className="border border-gray-800 px-4 py-2 text-center">{row[0]}</td>
                                        <td className="border border-gray-800 px-4 py-2 text-center uppercase">{row[1]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* FMD Title */}
                    <div className="mt-16 text-center">
                        <h3 className="text-2xl font-bold uppercase tracking-widest text-gray-900">
                            {t("fmdMateri.title")}
                        </h3>
                        <p className="mt-1 text-red-600 font-bold italic">
                            {t("fmdMateri.subtitle")}
                        </p>
                    </div>

                    {/* FMD Table */}
                    <div className="mt-8 w-full overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-800 text-sm md:text-base">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-800 px-4 py-2 text-center font-bold">
                                        {t("fmdMateri.morning")}/{t("fmdMateri.afternoon")}
                                    </th>
                                    <th className="border border-gray-800 px-4 py-2 text-center font-bold">
                                        {t("fmdMateri.thActivity")}
                                    </th>
                                    <th className="border border-gray-800 px-4 py-2 text-center font-bold">
                                        {t("fmdMateri.thAmount")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Morning Rows */}
                                {fmdMorningRows.map((row, idx) => (
                                    <tr key={`morning-${idx}`}>
                                        <td className="border border-gray-800 px-4 py-2 text-center font-semibold">{row[0]}</td>
                                        <td className="border border-gray-800 px-4 py-2 text-center uppercase">{row[1]}</td>
                                        <td className="border border-gray-800 px-4 py-2 text-center uppercase">{row[2]}</td>
                                    </tr>
                                ))}
                                {/* Afternoon Rows */}
                                {fmdAfternoonRows.map((row, idx) => (
                                    <tr key={`afternoon-${idx}`}>
                                        <td className="border border-gray-800 px-4 py-2 text-center font-semibold">{row[0]}</td>
                                        <td className="border border-gray-800 px-4 py-2 text-center uppercase">{row[1]}</td>
                                        <td className="border border-gray-800 px-4 py-2 text-center uppercase">{row[2]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-auto pt-12 self-end text-sm text-gray-500 italic">
                        * {t("lpkaishiro")}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleLayout;
