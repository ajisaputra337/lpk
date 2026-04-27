"use client";

import { useTranslations } from "next-intl";

export default function MapSection() {
    const t = useTranslations("HomePage");

    return (
        <section className="relative overflow-hidden bg-white py-20">
            <div className="absolute inset-0 opacity-10">
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0 L100,0 L100,100 L0,100 Z' fill='none' stroke='%23dc2626' stroke-width='2'/%3E%3Cpath d='M50,0 L50,100 M0,50 L100,50' stroke='%23dc2626' stroke-width='1' stroke-dasharray='5,5'/%3E%3C/svg%3E")`,
                        backgroundSize: "200px",
                    }}
                ></div>
            </div>

            <div className="relative mx-auto max-w-7xl px-6">
                <div className="mb-12 flex flex-col items-center">
                    <div className="mb-6 flex items-center">
                        <div className="mr-4 h-8 w-8 rounded-full border-2 border-red-700"></div>
                        <h2 className="text-center text-3xl font-bold text-gray-800">
                            {t("mapTitle")}
                        </h2>
                        <div className="ml-4 h-8 w-8 rounded-full border-2 border-red-700"></div>
                    </div>
                    <p className="mb-2 text-center text-lg text-gray-600">
                        {t("mapSubtitle")}
                    </p>
                    <div className="h-1 w-32 rounded-full bg-gradient-to-r from-red-700 to-transparent"></div>
                </div>

                <div className="flex flex-col gap-8 lg:flex-row">
                    <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-lg lg:w-1/3">
                        <div className="absolute top-0 right-0 h-12 w-12">
                            <div className="h-full w-full rounded-bl-lg border-t-2 border-r-2 border-red-700"></div>
                        </div>

                        <h3 className="mb-4 flex items-center text-2xl font-bold text-gray-800">
                            <span className="mr-2 text-red-700">📍</span> {t("addressTitle")}
                        </h3>

                        <p className="mb-6 leading-relaxed text-gray-700">
                            {t("addressDescription")}
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start rounded-lg bg-red-50 p-4 transition-colors hover:bg-red-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mt-1 mr-3 h-6 w-6 flex-shrink-0 text-red-700"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657A8 8 0 1117.657 16.657z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <div>
                                    <p className="font-bold text-gray-800">
                                        {t("companyName")}
                                    </p>
                                    <p className="text-gray-700">
                                        {t("addressInfo")}
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-r-lg border-l-4 border-red-700 bg-gray-50 p-3 italic text-gray-600">
                                {t("qualityQuote")}
                            </div>
                        </div>
                    </div>

                    <div className="relative h-80 w-full overflow-hidden rounded-xl border-2 border-red-700 shadow-2xl md:h-96 lg:w-2/3">
                        <div className="absolute top-0 left-0 z-20 h-6 w-6 border-t-2 border-l-2 border-red-700"></div>
                        <div className="absolute top-0 right-0 z-20 h-6 w-6 border-t-2 border-r-2 border-red-700"></div>
                        <div className="absolute bottom-0 left-0 z-20 h-6 w-6 border-b-2 border-l-2 border-red-700"></div>
                        <div className="absolute right-0 bottom-0 z-20 h-6 w-6 border-r-2 border-b-2 border-red-700"></div>

                        <iframe
                            title="Google Maps Lokasi LPK Aishiro Gakuen"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d643.6745228607759!2d110.46683188372741!3d-7.005259984878899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708cfc821d6ea7%3A0xad77b41447d11d3c!2sLPK.%20AISHIRO%20GAKUEN!5e0!3m2!1sid!2sid!4v1765081785824!5m2!1sid!2sid"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="relative z-10"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
