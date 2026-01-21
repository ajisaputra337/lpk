import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

// METADATA untuk SEO - Halaman Persyaratan
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Requirements.metadata' });

    const baseUrl = "https://www.lpk-aishiro.com";

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

    // Mengambil array dari JSON untuk mapping
    const specialReqs = ["0", "1", "2", "3", "4"];
    const adminReqs = ["0", "1", "2", "3", "4", "5"];

    return (
        <div className="container mx-auto px-4 pt-28 pb-8 md:pt-36 md:pb-12 max-w-4xl">
            <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 border border-gray-50">

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 text-center mb-8 uppercase tracking-wide">
                    {t('mainTitle')} <br className="hidden md:block" /> {t('subTitle')}
                </h1>

                <div className="grid gap-8 md:gap-10">
                    {/* Section 1: Persyaratan Khusus */}
                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-red-600 mb-4 uppercase border-b-2 border-red-100 pb-2">
                            {t('sections.special.title')}
                        </h2>
                        <ol className="list-decimal list-outside text-gray-700 space-y-3 pl-5 text-base md:text-lg leading-relaxed">
                            {specialReqs.map((key) => (
                                <li key={key}>
                                    {key === "4" ? (
                                        <strong>{t(`sections.special.items.${key}`)}</strong>
                                    ) : (
                                        t(`sections.special.items.${key}`)
                                    )}
                                </li>
                            ))}
                        </ol>
                    </section>

                    {/* Section 2: Persyaratan Administrasi */}
                    <section>
                        <h2 className="text-xl md:text-2xl font-bold text-red-600 mb-4 uppercase border-b-2 border-red-100 pb-2">
                            {t('sections.admin.title')}
                        </h2>
                        <ul className="list-disc list-outside text-gray-700 space-y-3 pl-5 text-base md:text-lg leading-relaxed">
                            {adminReqs.map((key) => (
                                <li key={key}>{t(`sections.admin.items.${key}`)}</li>
                            ))}
                        </ul>
                    </section>
                </div>

                {/* Call to Action */}
                <div className="mt-10 pt-6 border-t border-gray-100 text-center">
                    <p className="text-gray-600 mb-6">
                        {t('cta.text')}
                    </p>
                    <Link
                        href="https://wa.me/6288215751500?text=Halo%2C%20saya%20tertarik%20dengan%20program%20LPK%20Aishiro%20Gakuen%20dan%20ingin%20mendaftar.%20Mohon%20info%20lebih%20lanjut."
                        className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-full transition duration-300 shadow-md transform hover:-translate-y-1 active:scale-95"
                    >
                        {t('cta.button')}
                    </Link>
                </div>

            </div>
        </div>
    );
}