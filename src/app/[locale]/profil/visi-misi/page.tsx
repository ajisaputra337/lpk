import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Header from '../../../../styles/components/Header';
import { env } from '~/env';
import { getTranslations } from 'next-intl/server';

// 1. METADATA DINAMIS (SEO Multibahasa)
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'VisiMisi.metadata' });

    const baseUrl = env.NEXT_PUBLIC_BASE_URL;
    const path = "profil/visi-misi";

    return {
        title: t('title'),
        description: t('description'),
        keywords: ['Visi Misi LPK', 'Tujuan LPK Aishiro', 'Lembaga Pelatihan Jepang', 'Visi Lembaga Profesional'],
        alternates: {
            canonical: `${baseUrl}/${locale}/${path}`,
            languages: {
                'id': `${baseUrl}/id/${path}`,
                'en': `${baseUrl}/en/${path}`,
                'ja': `${baseUrl}/jp/${path}`,
            },
        },
        openGraph: {
            title: t('ogTitle'),
            description: t('ogDesc'),
            url: `${baseUrl}/${locale}/${path}`,
            siteName: 'LPK Aishiro Gakuen',
            type: 'website',
            images: [
                {
                    url: '/Images/shinkansen.jpg',
                    width: 800,
                    height: 600,
                    alt: t('title'),
                },
            ],
            locale: locale === 'jp' ? 'ja_JP' : locale === 'en' ? 'en_US' : 'id_ID',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('ogTitle'),
            description: t('ogDesc'),
            images: ['/Images/shinkansen.jpg'],
        },
    };
}

const VisiMisiPage = () => {
    const t = useTranslations('VisiMisi');

    return (
        <main className="pt-36 pb-16 bg-white min-h-screen">
            <Header />
            <div className="mx-auto max-w-5xl px-6">

                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 text-center">
                    {t('title')}
                </h1>

                {/* Bagian Visi */}
                <section className="mb-12 border-b pb-8">
                    <h2 className="text-3xl font-bold text-red-700 mb-6 flex items-center">
                        {t('visi.label')}
                    </h2>
                    <div className="md:flex md:space-x-8 items-center">
                        <div className="flex-shrink-0 w-full md:w-1/3 mb-4 md:mb-0 relative h-48 rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src="/Images/shinkansen.jpg"
                                alt={t('visi.imgAlt')}
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 768px) 100vw, 33vw"
                                priority
                            />
                        </div>
                        <div className="md:w-2/3">
                            <p className="text-xl text-gray-800 font-medium leading-relaxed italic">
                                &quot;{t('visi.text')}&quot;
                            </p>
                        </div>
                    </div>
                </section>

                {/* Bagian Misi */}
                <section className="mb-12 border-b pb-8">
                    <h2 className="text-3xl font-bold text-red-700 mb-6">
                        {t('misi.label')}
                    </h2>
                    <ul className="space-y-4 text-lg text-gray-700">
                        {[0, 1, 2].map((i) => (
                            <li key={i} className="flex items-start">
                                <span className="text-red-700 font-bold mr-3 mt-1 flex-shrink-0">{i + 1}.</span>
                                <span>{t(`misi.list.${i}`)}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Bagian Tujuan */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-red-700 mb-6">
                        {t('tujuan.label')}
                    </h2>
                    <ul className="space-y-4 text-lg text-gray-700">
                        {[0, 1].map((i) => (
                            <li key={i} className="flex items-start">
                                <span className="text-red-700 font-bold mr-3 mt-1 flex-shrink-0">{i + 1}.</span>
                                <span>{t(`tujuan.list.${i}`)}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </main>
    );
};

export default VisiMisiPage;