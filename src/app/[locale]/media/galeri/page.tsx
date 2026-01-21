import { getTranslations } from 'next-intl/server';
import GalleryPageClient from './GalleryClient';

// METADATA untuk SEO - Halaman Galeri
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Gallery' });

  const baseUrl = "https://www.lpk-aishiro.com";

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
export default function GalleryPage() {
  return <GalleryPageClient />;
}