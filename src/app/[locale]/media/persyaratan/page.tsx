import { getTranslations } from 'next-intl/server';
import { env } from '~/env';
import Link from 'next/link';
import Header from "../../../../styles/components/Header";
import Breadcrumbs from "../../../../styles/components/Breadcrumbs";

// METADATA untuk SEO - Halaman Persyaratan
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Requirements.metadata' });

    const baseUrl = env.NEXT_PUBLIC_BASE_URL;

    return {
        title: t('title'),
        description: t('description'),
        alternates: {
            canonical: `${baseUrl}/${locale}/media/persyaratan`,
            languages: {
                'id': `${baseUrl}/id/media/persyaratan`,
                'en': `${baseUrl}/en/media/persyaratan`,
                'ja': `${baseUrl}/jp/media/persyaratan`,
            },
        },
        openGraph: {
            title: t('title'),
            description: t('description'),
            url: `${baseUrl}/${locale}/media/persyaratan`,
            type: 'website',
        },
    };
}

export default async function PersyaratanPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Requirements' });

    const specialReqs = ["0", "1", "2", "3", "4"];
    const adminReqs = ["0", "1", "2", "3", "4", "5"];

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50 pt-24 pb-20 font-sans">
                <Breadcrumbs items={[{ label: t("mainTitle"), href: "/media/persyaratan" }]} />

                <div className="mx-auto max-w-4xl px-6">
                    <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 border border-gray-100 transform transition-all hover:shadow-red-900/5">

                        {/* Title Section */}
                        <div className="text-center mb-12">
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                                {t('mainTitle')}
                                <span className="block text-red-600 mt-2 text-2xl md:text-3xl">
                                    {t('subTitle')}
                                </span>
                            </h1>
                            <div className="mt-6 mx-auto h-2 w-24 bg-red-600 rounded-full"></div>
                        </div>

                        <div className="grid gap-12">
                            {/* Section 1: Persyaratan Khusus */}
                            <section className="relative">
                                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                                    <span className="bg-red-600 text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">01</span>
                                    {t('sections.special.title')}
                                </h2>
                                <ol className="space-y-4">
                                    {specialReqs.map((key) => (
                                        <li key={key} className="flex items-start text-slate-600 group">
                                            <span className="w-6 h-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center mr-3 mt-1 shrink-0 font-bold text-xs group-hover:bg-red-600 group-hover:text-white transition-colors">
                                                {parseInt(key) + 1}
                                            </span>
                                            <span className="text-lg leading-relaxed">
                                                {key === "4" ? (
                                                    <strong className="text-red-700">{t(`sections.special.items.${key}`)}</strong>
                                                ) : (
                                                    t(`sections.special.items.${key}`)
                                                )}
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                            </section>

                            {/* Section 2: Persyaratan Administrasi */}
                            <section className="relative">
                                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                                    <span className="bg-red-600 text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">02</span>
                                    {t('sections.admin.title')}
                                </h2>
                                <ul className="space-y-4">
                                    {adminReqs.map((key) => (
                                        <li key={key} className="flex items-start text-slate-600 group">
                                            <div className="w-2 h-2 rounded-full bg-red-400 mr-4 mt-3 shrink-0 group-hover:bg-red-600 transition-colors"></div>
                                            <span className="text-lg leading-relaxed">
                                                {t(`sections.admin.items.${key}`)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>

                        {/* Call to Action */}
                        <div className="mt-16 pt-10 border-t border-gray-100 text-center">
                            <p className="text-slate-500 font-medium mb-8 text-lg">
                                {t('cta.text')}
                            </p>
                            <Link
                                href="https://wa.me/6288215751500?text=Halo%2C%20saya%20tertarik%20dengan%20program%20LPK%20Aishiro%20Gakuen%20dan%20ingin%20mendaftar.%20Mohon%20info%20lebih%20lanjut."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center bg-red-600 hover:bg-slate-900 text-white font-black py-4 px-12 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-red-600/20 transform hover:-translate-y-1 active:scale-95"
                            >
                                <span className="mr-2">🚀</span>
                                {t('cta.button')}
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}