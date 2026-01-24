import React from "react";
import { CheckCircle, Clock, BookOpen, Briefcase, Plane } from "lucide-react";
import Header from "../../../../styles/components/Header";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// 1. METADATA DINAMIS
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MagangPage.metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

interface TimelineStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ icon, title, description }) => (
  <div className="relative flex pb-12">
    <div className="z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-700 text-white">
      {icon}
    </div>
    <div className="flex-grow pl-6">
      <div className="mb-1 flex items-center">
        <h3 className="mr-2 text-xl font-bold text-gray-800">{title}</h3>
      </div>
      <p className="leading-relaxed text-gray-600">{description}</p>
    </div>
  </div>
);

const AlurMagangPage = () => {
  const t = useTranslations("MagangPage");

  // Data Tahapan Program yang sekarang mengambil dari JSON
  const programSteps = [
    { icon: <Clock className="h-6 w-6" />, title: t("timeline.step1.title"), description: t("timeline.step1.desc") },
    { icon: <BookOpen className="h-6 w-6" />, title: t("timeline.step2.title"), description: t("timeline.step2.desc") },
    { icon: <CheckCircle className="h-6 w-6" />, title: t("timeline.step3.title"), description: t("timeline.step3.desc") },
    { icon: <Briefcase className="h-6 w-6" />, title: t("timeline.step4.title"), description: t("timeline.step4.desc") },
    { icon: <Plane className="h-6 w-6" />, title: t("timeline.step5.title"), description: t("timeline.step5.desc") },
  ];

  return (
    <>
      <Header />
      <main className="bg-white pt-36 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl">{t("hero.title")}</h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">{t("hero.subtitle")}</p>
          </div>

          {/* Timeline Section */}
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-800 md:text-left">{t("timeline.title")}</h2>
            <div className="rounded-xl border bg-gray-50 p-6 shadow-lg md:p-10">
              {programSteps.map((step, index) => (
                <TimelineStep key={index} icon={step.icon} title={step.title} description={step.description} />
              ))}
            </div>
          </div>

          {/* Foto Diagram */}
          <div className="mx-auto mt-16 max-w-6xl space-y-8">
            <h2 className="text-center text-3xl font-bold text-gray-800">{t("visual.title")}</h2>
            <div className="text-center">
              <h3 className="mb-4 text-xl font-semibold text-gray-700">{t("visual.desc1")}</h3>
              <div className="relative h-[500px] w-full">
                <Image src="/Images/alur_penerimaan_magang.jpeg" alt="Diagram Alur Pendidikan dan Pelatihan Magang ke Jepang - LPK Aishiro Gakuen" fill style={{ objectFit: "contain" }} priority />
              </div>
            </div>
            <div className="text-center">
              <h3 className="mb-4 text-xl font-semibold text-gray-700">{t("visual.desc2")}</h3>
              <div className="relative h-[500px] w-full">
                <Image src="/Images/alur_im_japan.jpeg" alt="Diagram Alur Pendidikan dan Pelatihan IM Japan - Pelatihan Keberangkatan Siswa" fill style={{ objectFit: "contain" }} priority />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AlurMagangPage;