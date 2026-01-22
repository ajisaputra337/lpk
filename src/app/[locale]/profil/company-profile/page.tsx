import React from "react";
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Header from "../../../../styles/components/Header";
import Breadcrumbs from "../../../../styles/components/Breadcrumbs";

// Metadata Dinamis
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'CompanyProfile.metadata' });
    return {
        title: t('title'),
        description: t('description'),
    };
}

export default function CompanyProfilePage() {
    const t = useTranslations('CompanyProfile');

    return (
        <main className="bg-white pt-24 pb-16">
            <Header />
            <Breadcrumbs items={[{ label: t('header.title'), href: '/profil/company-profile' }]} />
            <div className="mx-auto max-w-6xl px-6">
                <header className="mb-6 text-center md:text-left">
                    <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
                        {t('header.title')}
                    </h1>
                    <h2 className="mt-2 text-lg font-semibold text-red-700 md:text-xl">
                        {t('header.subtitle')}
                    </h2>
                    <p className="mt-4 max-w-2xl text-gray-600">
                        {t('header.intro')}
                    </p>
                </header>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Main content (2/3) */}
                    <div className="space-y-6 md:col-span-2">
                        <section className="rounded-lg border border-gray-100 bg-gray-50 p-6 shadow-sm">
                            <p className="text-lg leading-relaxed text-gray-700">
                                {t('philosophy.trust')}
                            </p>
                        </section>

                        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                                <h3 className="mb-3 text-2xl font-semibold text-gray-800">
                                    {t('philosophy.vision.title')}
                                </h3>
                                <p className="text-lg">
                                    {t('philosophy.vision.desc')}
                                </p>
                            </div>

                            <div className="rounded-lg bg-red-50 p-6 shadow-lg">
                                <h3 className="mb-3 text-2xl font-semibold text-red-700">
                                    {t('philosophy.mission.title')}
                                </h3>
                                <ul className="list-disc space-y-3 pl-5 text-lg text-gray-700">
                                    {[0, 1, 2].map((i) => (
                                        <li key={i}>{t(`philosophy.mission.list.${i}`)}</li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="mb-3 text-2xl font-semibold text-gray-800">
                                {t('philosophy.goals.title')}
                            </h3>
                            <ul className="list-disc space-y-3 pl-5 text-lg text-gray-700">
                                {[0, 1].map((i) => (
                                    <li key={i}>{t(`philosophy.goals.list.${i}`)}</li>
                                ))}
                            </ul>
                        </section>

                        <section id="struktur" className="rounded-lg bg-gray-50 p-6">
                            <h3 className="mb-3 text-2xl font-semibold text-gray-800">
                                {t('sections.structure.title')}
                            </h3>
                            <p className="text-gray-700">
                                {t('sections.structure.desc')}
                            </p>
                        </section>

                        <section id="fasilitas" className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="mb-3 text-2xl font-semibold text-gray-800">
                                {t('sections.facilities.title')}
                            </h3>
                            <ul className="list-disc pl-5 text-lg text-gray-700">
                                {[0, 1, 2].map((i) => (
                                    <li key={i}>{t(`sections.facilities.list.${i}`)}</li>
                                ))}
                            </ul>
                        </section>

                        <section id="statistik" className="rounded-lg bg-red-50 p-6">
                            <h3 className="mb-3 text-2xl font-semibold text-red-700">
                                {t('sections.stats.title')}
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded border bg-white p-4 text-center">
                                    <p className="text-2xl font-bold">200+</p>
                                    <p className="text-sm text-gray-600">{t('sections.stats.alumni')}</p>
                                </div>
                                <div className="rounded border bg-white p-4 text-center">
                                    <p className="text-2xl font-bold">2018</p>
                                    <p className="text-sm text-gray-600">{t('sections.stats.permit')}</p>
                                </div>
                            </div>
                        </section>

                        <section id="layanan" className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="mb-3 text-2xl font-semibold text-gray-800">
                                {t('sections.services.title')}
                            </h3>
                            <ul className="list-disc pl-5 text-lg text-gray-700">
                                {[0, 1, 2].map((i) => (
                                    <li key={i}>{t(`sections.services.list.${i}`)}</li>
                                ))}
                            </ul>
                        </section>

                        <section id="legalitas" className="rounded-lg bg-gray-50 p-6">
                            <h3 className="mb-3 text-2xl font-semibold text-gray-800">
                                {t('sections.legality.title')}
                            </h3>
                            <ul className="list-disc pl-5 text-lg text-gray-700">
                                {[0, 1, 2].map((i) => (
                                    <li key={i}>{t(`sections.legality.list.${i}`)}</li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    {/* Sidebar (1/3) */}
                    <aside className="md:col-span-1">
                        <div className="sticky top-28 space-y-4">
                            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                                <h4 className="mb-3 text-lg font-semibold text-gray-800">
                                    {t('sidebar.infoTitle')}
                                </h4>
                                <table className="w-full text-sm">
                                    <tbody>
                                        <tr>
                                            <td className="py-2 font-medium text-gray-700">{t('sidebar.table.name')}</td>
                                            <td className="py-2 text-gray-600">LPK Aishiro Gakuen</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 font-medium text-gray-700">{t('sidebar.table.address')}</td>
                                            <td className="py-2 text-gray-600">Semarang, Indonesia</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 font-medium text-gray-700">{t('sidebar.table.phone')}</td>
                                            <td className="py-2 text-gray-600">+62 882-1575-1500</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 font-medium text-gray-700">{t('sidebar.table.email')}</td>
                                            <td className="py-2 text-gray-600">aishiro426@gmail.com</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 font-medium text-gray-700">{t('sidebar.table.year')}</td>
                                            <td className="py-2 text-gray-600">2009</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 font-medium text-gray-700">{t('sidebar.table.accreditation')}</td>
                                            <td className="py-2 text-gray-600">LA-LPK 224/LALPK/XI/2024</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 font-medium text-gray-700">{t('sidebar.table.alumni')}</td>
                                            <td className="py-2 text-gray-600">200+</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                                <h4 className="mb-3 text-lg font-semibold text-gray-800">
                                    {t('sidebar.quickLinks')}
                                </h4>
                                <ul className="space-y-2 text-gray-700">
                                    <li><a href="#struktur" className="text-red-700 hover:underline">{t('sections.structure.title')}</a></li>
                                    <li><a href="#fasilitas" className="text-red-700 hover:underline">{t('sections.facilities.title')}</a></li>
                                    <li><a href="#statistik" className="text-red-700 hover:underline">{t('sections.stats.title')}</a></li>
                                    <li><a href="#layanan" className="text-red-700 hover:underline">{t('sections.services.title')}</a></li>
                                </ul>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}