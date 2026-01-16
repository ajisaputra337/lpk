import Link from 'next/link';
import Image from 'next/image';
import { Heart, Briefcase, FileText, Zap, DollarSign, MapPin } from 'lucide-react';
import Header from '../../../../styles/components/Header';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

// 1. METADATA DINAMIS
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'TokuteiPage.metadata' });
    return {
        title: t('title'),
        description: t('description'),
    };
}

const TokuteiGinou = () => {
    const t = useTranslations('TokuteiPage');
    
    const whatsappLink = 'https://wa.me/6288215751500?text=Halo%2C%20saya%20tertarik%20dengan%20Program%20Tokutei%20Ginou%20(SSW).%20Mohon%20info%20lebih%20lanjut.';

    // Mapping Icons
    const stageIcons = [
        <FileText className="h-6 w-6 text-white" />,
        <Zap className="h-6 w-6 text-white" />,
        <Briefcase className="h-6 w-6 text-white" />,
        <Heart className="h-6 w-6 text-white" />
    ];

    return (
        <>
            <Header />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative h-[400px] md:h-[500px] overflow-hidden">
                    <Image
                        src="/Images/breadcrumbtokuteiginou.jpeg"
                        alt="Program Tokutei Ginou Jepang"
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                        className="filter brightness-[65%]"
                        priority
                    />
                    <div className="absolute inset-0 bg-red-800/20"></div>

                    <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-12">
                        <div className="w-full max-w-2xl text-left">
                            <p className="mb-2 flex items-center font-bold text-red-300">
                                <Heart className="mr-2 h-5 w-5" /> {t('hero.badge')}
                            </p>
                            <h1 className="mb-4 text-4xl font-extrabold leading-tight text-white md:text-5xl">
                                {t('hero.title')}
                            </h1>
                            <p className="text-lg text-gray-200">
                                {t('hero.subheading')}
                            </p>
                            <Link
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-block rounded-md bg-white px-8 py-3 text-lg font-bold text-red-700 shadow-xl transition-colors hover:bg-gray-100"
                            >
                                {t('hero.cta')}
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Detail Program */}
                <section className="bg-white py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:flex lg:gap-12">
                        <div className="lg:w-2/3">
                            <h2 className="mb-6 border-b-2 border-red-700 pb-2 text-3xl font-bold text-gray-800">
                                {t('about.title')}
                            </h2>
                            <p className="mb-8 text-lg leading-relaxed text-gray-700">
                                {t('about.desc')}
                            </p>

                            <h3 className="mb-4 text-2xl font-semibold text-gray-800">
                                {t('about.advantageTitle')}
                            </h3>
                            <ul className="mb-8 space-y-3">
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <li key={i} className="flex items-start text-gray-700">
                                        <svg className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-lg">{t(`about.advantages.${i}`)}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="rounded-xl border-l-4 border-red-700 bg-red-50 p-6">
                                <p className="font-semibold text-red-800">{t('about.noteTitle')}</p>
                                <p className="mt-2 text-red-700">{t('about.noteDesc')}</p>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="mt-10 lg:mt-0 lg:w-1/3">
                            <div className="sticky top-24 rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-lg">
                                <h3 className="mb-4 flex items-center border-b pb-2 text-xl font-bold text-gray-800">
                                    <MapPin className="mr-2 h-5 w-5 text-red-700" /> {t('sidebar.title')}
                                </h3>
                                <div className="space-y-3 text-gray-700">
                                    <div className="flex justify-between">
                                        <span className="font-medium">{t('sidebar.visaLabel')}</span>
                                        <span className="font-semibold text-red-700">{t('sidebar.visaValue')}</span>
                                    </div>
                                    <div className="flex justify-between border-t pt-2">
                                        <span className="font-medium">{t('sidebar.sectorLabel')}</span>
                                        <span>{t('sidebar.sectorValue')}</span>
                                    </div>
                                    <div className="flex justify-between border-t pt-2">
                                        <span className="font-medium">{t('sidebar.salaryLabel')}</span>
                                        <span className="flex items-center">
                                            <DollarSign className="mr-1 h-4 w-4" /> {t('sidebar.salaryValue')}
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-t pt-2">
                                        <span className="font-medium">{t('sidebar.langLabel')}</span>
                                        <span>{t('sidebar.langValue')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tahapan */}
                <section className="bg-gray-50 py-20">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-12 text-center">
                            <span className="text-sm font-semibold uppercase text-red-700">{t('stages.badge')}</span>
                            <h2 className="mt-2 text-3xl font-extrabold text-gray-800 md:text-4xl">
                                {t('stages.title')}
                            </h2>
                        </div>

                        <div className="relative">
                            <div className="absolute left-1/2 hidden h-full w-0.5 -translate-x-1/2 bg-red-300 lg:block"></div>

                            {[0, 1, 2, 3].map((i) => (
                                <div key={i} className={`mb-8 flex flex-col items-center lg:flex-row ${i % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                                    <div className="relative w-full rounded-xl border border-gray-200 bg-white p-6 shadow-lg lg:w-5/12">
                                        <h3 className="mb-2 text-xl font-bold text-red-700">
                                            {t('stages.step')} {i + 1}: {t(`stages.list.${i}.title`)}
                                        </h3>
                                        <p className="text-gray-600">{t(`stages.list.${i}.desc`)}</p>
                                    </div>

                                    <div className="relative my-4 flex w-full justify-center lg:my-0 lg:w-2/12">
                                        <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-red-700 p-2 shadow-xl">
                                            {stageIcons[i]}
                                        </div>
                                    </div>
                                    <div className="hidden lg:block lg:w-5/12"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-red-700 py-16">
                    <div className="mx-auto max-w-4xl px-6 text-center">
                        <h2 className="mb-4 text-3xl font-extrabold text-white">{t('cta.title')}</h2>
                        <p className="mb-8 text-lg text-red-100">{t('cta.desc')}</p>
                        <Link
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block transform rounded-md bg-white px-10 py-4 text-xl font-bold text-red-700 shadow-2xl transition hover:scale-105 hover:bg-gray-100"
                        >
                            {t('cta.button')}
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
};

export default TokuteiGinou;