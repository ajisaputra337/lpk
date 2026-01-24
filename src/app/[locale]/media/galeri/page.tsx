import { getTranslations } from 'next-intl/server';
import { env } from '~/env';
import GalleryPageClient from './GalleryClient';
import Header from "../../../../styles/components/Header";

// METADATA untuk SEO - Halaman Galeri
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Gallery' });

  const baseUrl = env.NEXT_PUBLIC_BASE_URL;

  return {
    title: t('header.title'),
    description: t('header.subtitle'),
    alternates: {
      canonical: `${baseUrl}/${locale}/media/galeri`,
      languages: {
        'id': `${baseUrl}/id/media/galeri`,
        'en': `${baseUrl}/en/media/galeri`,
        'ja': `${baseUrl}/jp/media/galeri`,
      },
    },
    openGraph: {
      title: t('header.title'),
      description: t('header.subtitle'),
      url: `${baseUrl}/${locale}/media/galeri`,
      type: 'website',
    },
  };
}

// Page sebagai Server Component yang merender Client Component
export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Gallery' });

  return (
    <>
      <Header />
      <div className="pt-8 bg-gray-900">
      </div>
      <GalleryPageClient />
    </>
  );
}