"use client";

import { useState, useEffect } from "react";
import { Link } from "../../i18n/routing";
import Image from "next/image";
import Header from "../../styles/components/Header";
import ProgramCard from "../../styles/components/ProgramCard";
import SuccessStoryCard from "../../styles/components/SuccessStoryCard";
import MobileCTABar from "../../styles/components/MobileCTABar";
import { BookOpen, Zap, Users, MessageCircle } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const Profile = dynamic(() => import("../../styles/components/Profile"), { ssr: true });
const HomeGallery = dynamic(() => import("../../styles/components/HomeGallery"), { ssr: true });
const FAQSection = dynamic(() => import("../../styles/components/FAQSection"), { ssr: true });
const BenefitSection = dynamic(() => import("../../styles/components/BenefitSection"), { ssr: true });
const TrustBar = dynamic(() => import("../../styles/components/TrustBar"), { ssr: true });
const MapSection = dynamic(() => import("../../styles/components/MapSection"), { ssr: true });

interface Alumni {
    id: number;
    nama: string;
    angkatan: number;
    tanggalBerangkat: string;
    alamat: string;
    job: string;
    lokasi_perusahaan: string;
    img?: string;
}

interface HomePageClientProps {
    alumniCount: number;
}

const whatsappLink = "https://wa.me/6288215751500?text=Halo%2C%20saya%20tertarik%20dengan%20program%20LPK%20Aishiro%20Gakuen%20dan%20ingin%20mendaftar.%20Mohon%20info%20lebih%20lanjut.";

export default function HomePageClient({ alumniCount }: HomePageClientProps) {
    const t = useTranslations("HomePage");
    const tp = useTranslations("Programs");
    const [alumniData, setAlumniData] = useState<Alumni[]>([]);

    const alumniLabel = useMemo(() => `${alumniCount}`, [alumniCount]);
    const programs = useMemo(() => [
        {
            title: tp("program1.title"),
            description: tp("program1.desc"),
            icon: <Zap className="h-6 w-6" />,
            imageUrl: "/Images/magang.jpg",
            href: "/program/magang-jepang",
        },
        {
            title: tp("program2.title"),
            description: tp("program2.desc"),
            icon: <BookOpen className="h-6 w-6" />,
            imageUrl: "/Images/sekolah-jepang.webp",
            href: "/program/sekolah-jepang",
        },
        {
            title: tp("program3.title"),
            description: tp("program3.desc"),
            icon: <Users className="h-6 w-6" />,
            imageUrl: "/Images/kaigo.webp",
            href: "/program/tokutei-ginou",
        },
    ], [tp]);

    useEffect(() => {
        const fetchAlumni = async () => {
            const { data } = await supabase
                .from("success_story")
                .select("id, nama, angkatan, tanggalLahir, alamat, job, lokasi_perusahaan, img")
                .order("angkatan", { ascending: false })
                .limit(6);

            if (data) {
                const mappedData = data.map((item) => ({
                    ...item,
                    tanggalBerangkat: item.tanggalLahir
                })) as Alumni[];
                setAlumniData(mappedData);
            }
        };
        fetchAlumni().catch((e) => console.error(e));
    }, []);

    return (
        <>
            <Header />
            <main className="pt-20 pb-24 md:pb-12">
                <section className="relative h-[600px] overflow-hidden bg-gray-900">
                    <div className="absolute inset-0">
                        <Image src="/Images/kyoto.jpg" alt="Pemandangan Kyoto Jepang - Pelatihan Magang LPK Aishiro Gakuen" fill priority sizes="100vw" className="object-cover brightness-50" />
                    </div>

                    <div className="relative z-0 mx-auto flex h-full max-w-7xl items-center px-6">
                        <div className="w-full max-w-xl text-left">
                            <div className="mb-4 inline-flex items-center rounded-full border border-yellow-400/30 bg-yellow-500/20 px-4 py-1.5 backdrop-blur-sm">
                                <span className="text-xs font-bold text-yellow-300 md:text-sm">
                                    {t("urgencyText")}
                                </span>
                            </div>

                            <h1 className="mb-4 text-4xl leading-tight font-extrabold text-white md:text-5xl">
                                {t.rich("heroTitle", {
                                    yellow: (chunks) => <span className="text-yellow-400">{alumniLabel} {chunks}</span>,
                                    red: (chunks) => <span className="text-red-400">{chunks}</span>,
                                    br: () => <br />
                                })}
                            </h1>
                            <p className="mb-8 text-base leading-relaxed text-gray-200 md:text-lg">{t("heroSubtitle")}</p>

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-4 text-base font-bold text-white shadow-xl transition-all duration-300 hover:bg-red-700 hover:shadow-red-500/30 active:scale-95"
                                >
                                    <MessageCircle className="h-5 w-5" />
                                    {t("ctaButton")}
                                </a>

                            <Link
                                href="/media/persyaratan"
                                className="inline-flex items-center justify-center rounded-full border-2 border-white/30 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10"
                            >
                                {t("ctaSecondary")} →
                            </Link>
                        </div>

                        <p className="mt-3 text-xs text-gray-400">
                            {t("ctaMicro")}
                        </p>
                    </div>
                </div>
            </section>

            <TrustBar alumniCount={alumniLabel} />

            <section className="relative overflow-hidden bg-white py-20">
                <div className="relative mx-auto max-w-7xl px-6">
                    <div className="mb-12 flex flex-col items-center">
                        <div className="mb-4 h-1 w-24 rounded-full bg-red-700"></div>
                        <h2 className="text-center text-3xl font-bold text-gray-800">{t("programSectionTitle")}</h2>
                        <div className="mt-4 h-1 w-24 rounded-full bg-red-700"></div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {programs.map((program, idx) => (
                            <ProgramCard key={idx} {...program} />
                        ))}
                    </div>
                </div>
            </section>

            <BenefitSection />

            <section className="relative overflow-hidden bg-white py-20">
                <div className="relative mx-auto max-w-7xl px-6">
                    <div className="mb-12 flex flex-col items-center">
                        <h2 className="mb-2 text-center text-3xl font-bold text-gray-800">{t("successTitle")}</h2>
                        <p className="mb-6 text-center text-lg text-gray-600">
                            {t.rich("successSub", { red: (c) => <span className="text-red-600">{c}</span> })}
                        </p>
                        <div className="h-1 w-20 rounded-full bg-red-700"></div>
                    </div>

                    <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                        {alumniData.map((person) => (
                            <SuccessStoryCard key={person.id} name={person.nama} {...person} />
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link href="/media/success-story" className="inline-flex items-center rounded-full bg-red-600 px-8 py-3 text-sm font-black text-white shadow-xl transition-all active:scale-95 hover:bg-red-700 hover:shadow-red-200">
                            {t("seeSuccess")}
                        </Link>
                    </div>
                </div>
            </section>

            <Profile />

            <HomeGallery />

            <FAQSection />

            <MapSection />
        </main>

            <MobileCTABar />
        </>
    );
}