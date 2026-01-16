import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Globe, GraduationCap, MapPin, Zap } from 'lucide-react';
import Header from '../../../../styles/components/Header'; 
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

// 1. METADATA DINAMIS
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'SekolahPage.metadata' });
    return {
        title: t('title'),
        description: t('description'),
    };
}

const SekolahJepangPage = () => {
    const t = useTranslations('SekolahPage');
    
    const whatsappLink = "https://wa.me/6288215751500?text=Halo%2C%20saya%20tertarik%20dengan%20Program%20Sekolah%20di%20Jepang.%20Mohon%20info%20lebih%20lanjut.";

    // Mapping Icon untuk Tahapan
    const stageIcons = [
        <BookOpen className="h-6 w-6 text-white" />,
        <GraduationCap className="h-6 w-6 text-white" />,
        <Globe className="h-6 w-6 text-white" />,
        <Zap className="h-6 w-6 text-white" />
    ];

    return (
        <>
            <Header />

            <main className="pt-20">
                {/* 1. Hero Section */}
                <section className="relative h-[400px] md:h-[500px] overflow-hidden">
                    <Image
                        src="/Images/tokyo-university.jpg"
                        alt="Pemandangan Sekolah di Jepang"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="filter brightness-[65%]"
                        priority
                    />
                    <div className="absolute inset-0 bg-red-800/20"></div>

                    <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
                        <div className="text-left w-full max-w-2xl">
                            <p className="text-red-300 font-bold mb-2 flex items-center">
                                <GraduationCap className="h-5 w-5 mr-2" /> {t('hero.badge')}
                            </p>
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white mb-4">
                                {t('hero.title')}
                            </h1>
                            <p className="text-lg text-gray-200">
                                {t('hero.subheading')}
                            </p>
                            <Link
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-block rounded-md bg-white px-8 py-3 text-lg font-bold text-red-700 shadow-xl hover:bg-gray-100 transition-colors"
                            >
                                {t('hero.cta')}
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 2. Detail & Deskripsi Program */}
                <section className="py-20 bg-white">
                    <div className="mx-auto max-w-7xl px-6 lg:flex lg:gap-12">
                        <div className="lg:w-2/3">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-red-700 pb-2">
                                {t('about.title')}
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                {t('about.desc')}
                            </p>

                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                                {t('about.advantageTitle')}
                            </h3>
                            <ul className="space-y-3 mb-8">
                                {[0, 1, 2, 3].map((i) => (
                                    <li key={i} className="flex items-start text-gray-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-700 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-lg">{t(`about.advantages.${i}`)}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-700">
                                <p className="font-semibold text-red-800">{t('about.noteTitle')}</p>
                                <p className="text-red-700 mt-2">{t('about.noteDesc')}</p>
                            </div>
                        </div>

                        {/* Fakta Singkat */}
                        <div className="lg:w-1/3 mt-10 lg:mt-0">
                            <div className="p-6 bg-gray-50 rounded-xl shadow-lg sticky top-24 border border-gray-200">
                                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center border-b pb-2">
                                    <MapPin className="h-5 w-5 mr-2 text-red-700" /> {t('facts.title')}
                                </h3>
                                <div className="space-y-3 text-gray-700">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">{t('facts.durationLabel')}</span>
                                        <span className="text-red-700 font-semibold">{t('facts.durationValue')}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-t pt-2">
                                        <span className="font-medium">{t('facts.goalLabel')}</span>
                                        <span>{t('facts.goalValue')}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-t pt-2">
                                        <span className="font-medium">{t('facts.langLabel')}</span>
                                        <span>{t('facts.langValue')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Tahapan Proses */}
                <section className="py-20 bg-gray-50">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center mb-12">
                            <span className="text-sm font-semibold uppercase text-red-700">{t('stages.badge')}</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-2">
                                {t('stages.title')}
                            </h2>
                        </div>

                        <div className="relative">
                            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-red-300"></div>

                            {[0, 1, 2, 3].map((index) => (
                                <div key={index} className={`mb-8 flex flex-col items-center lg:flex-row lg:items-start ${index % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                                    <div className={`lg:w-5/12 w-full p-6 bg-white rounded-xl shadow-lg border border-gray-200 relative`}>
                                        <h3 className="text-xl font-bold text-red-700 mb-2">
                                            {t('stages.step')} {index + 1}: {t(`stages.list.${index}.title`)}
                                        </h3>
                                        <p className="text-gray-600">{t(`stages.list.${index}.desc`)}</p>
                                    </div>
                                    <div className="relative my-4 lg:my-0 lg:w-2/12 flex justify-center items-center">
                                        <div className="w-12 h-12 rounded-full bg-red-700 shadow-xl flex items-center justify-center p-2 z-10">
                                            {stageIcons[index]}
                                        </div>
                                    </div>
                                    <div className="lg:w-5/12 hidden lg:block"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. CTA Akhir */}
                <section className="py-16 bg-red-700">
                    <div className="mx-auto max-w-4xl px-6 text-center">
                        <h2 className="text-3xl font-extrabold text-white mb-4">{t('cta.title')}</h2>
                        <p className="text-lg text-red-100 mb-8">{t('cta.desc')}</p>
                        <Link
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block rounded-md bg-white px-10 py-4 text-xl font-bold text-red-700 shadow-2xl hover:bg-gray-100 transition-colors transform hover:scale-105"
                        >
                            {t('cta.button')}
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
};

export default SekolahJepangPage;