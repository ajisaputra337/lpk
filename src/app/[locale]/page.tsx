import { getTranslations } from 'next-intl/server';
import { env } from '~/env';
import HomePageClient from './HomePageClient';
import { createClient } from '@supabase/supabase-js';

const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage.metadata' });

  const title = t.has('title') ? t('title') : "LPK Aishiro Gakuen - Pelatihan Magang Jepang & Sekolah Bahasa";
  const description = t.has('description') ? t('description') : "LPK Aishiro Gakuen adalah lembaga pelatihan terpercaya untuk program magang ke Jepang, sekolah bahasa (Gakkou), dan Tokutei Ginou. Berizin resmi dan berpengalaman sejak 2009.";

  const baseUrl = env.NEXT_PUBLIC_BASE_URL;

  return {
    title: { absolute: title },
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

export default async function HomePage() {
  const { count } = await supabaseServer
    .from("success_story")
    .select("*", { count: "exact", head: true });

  const alumniCount = count ?? 0;

  return <HomePageClient alumniCount={alumniCount} />;
}