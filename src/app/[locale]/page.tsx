import { getTranslations } from 'next-intl/server';
import { env } from '~/env';
import HomePageClient from './HomePageClient';

// METADATA untuk SEO - Homepage
// Karena ini adalah halaman utama, kita tidak perlu menambahkan suffix | LPK Aishiro Gakuen
// karena sudah ada di template layout
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage.metadata' });

  // Jika key metadata belum ada di JSON, gunakan default ini
  const title = t.has('title') ? t('title') : "LPK Aishiro Gakuen - Pelatihan Magang Jepang & Sekolah Bahasa";
  const description = t.has('description') ? t('description') : "LPK Aishiro Gakuen adalah lembaga pelatihan terpercaya untuk program magang ke Jepang, sekolah bahasa (Gakkou), dan Tokutei Ginou. Berizin resmi dan berpengalaman sejak 2009.";

  const baseUrl = env.NEXT_PUBLIC_BASE_URL;

  return {
    title: {
      absolute: title, // Override template dari layout
    },
    description: description,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'id': `${baseUrl}/id`,
        'en': `${baseUrl}/en`,
        'ja': `${baseUrl}/jp`,
      },
    },
    openGraph: {
      title: title,
      description: description,
      url: `${baseUrl}/${locale}`,
      type: 'website',
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "LPK Aishiro Gakuen" }],
    },
  };
}

// Page sebagai Server Component yang merender Client Component
export default function HomePage() {
  return <HomePageClient />;
}