import { getTranslations } from 'next-intl/server';
import SuccessStoryClient from './SuccessStoryClient';

// METADATA untuk SEO - Halaman Success Story
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SuccessStoryPage' });

  const baseUrl = "https://www.lpk-aishiro.com";
  const title = `${t('header.title')} ${t('header.subtitle')} | LPK Aishiro Gakuen`;
  const description = "Kisah sukses alumni LPK Aishiro Gakuen yang berhasil berkarir di Jepang melalui program magang dan tokutei ginou.";

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `${baseUrl}/${locale}/media/success-story`,
      languages: {
        'id': `${baseUrl}/id/media/success-story`,
        'en': `${baseUrl}/en/media/success-story`,
        'ja': `${baseUrl}/jp/media/success-story`,
      },
    },
    openGraph: {
      title: title,
      description: description,
      url: `${baseUrl}/${locale}/media/success-story`,
      type: 'website',
    },
  };
}

// Page sebagai Server Component yang merender Client Component
export default function SuccessStoryPage() {
  return <SuccessStoryClient />;
}