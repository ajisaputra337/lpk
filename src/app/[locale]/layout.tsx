import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { GoogleAnalytics } from '@next/third-parties/google'; // Import GA
import LayoutContent from "../LayoutContent";
import FloatingChat from "../../styles/components/FloatingChat";
import LanguageSwitcher from "../../styles/components/LanguageSwitcher";
import { env } from '~/env';
import "../globals.css";
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const inter = Inter({ subsets: ["latin"] });

// METADATA DINAMIS
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  const baseUrl = env.NEXT_PUBLIC_BASE_URL;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: `%s | LPK Aishiro Gakuen`,
      default: t('title'),
    },
    description: t('description'),
    keywords: [
      'magang jepang', 'kerja di jepang', 'lpk semarang', 'tokutei ginou',
      'sekolah jepang', 'pelatihan bahasa jepang', 'lpk aishiro gakuen',
      '日本語研修', '技能実習', '特定技能'
    ],
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'id': `${baseUrl}/id`,
        'en': `${baseUrl}/en`,
        'ja': `${baseUrl}/jp`,
        'x-default': `${baseUrl}/id`,
      },
    },
    openGraph: {
      title: "LPK Aishiro Gakuen",
      description: t('description'),
      url: `${baseUrl}/${locale}`,
      siteName: "LPK Aishiro Gakuen",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "LPK Aishiro Gakuen - Pelatihan Magang Jepang" }],
      locale: locale === 'jp' ? 'ja_JP' : locale === 'en' ? 'en_US' : 'id_ID',
      type: "website",
    },
    twitter: {
      card: 'summary_large_image',
      title: "LPK Aishiro Gakuen",
      description: t('description'),
      images: ['/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    category: 'education',
    verification: {
      google: 'KODE-DARI-GOOGLE-SEARCH-CONSOLE', // Ganti dengan kode asli
    },
  };
}


export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  // STRUCTURED DATA (JSON-LD)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "LPK Aishiro Gakuen",
    "alternateName": "愛城学園",
    "url": env.NEXT_PUBLIC_BASE_URL,
    "logo": `${env.NEXT_PUBLIC_BASE_URL}/Images/logo_aishiro.png`,
    "description": "Lembaga pelatihan bahasa Jepang dan penempatan magang ke Jepang yang berdiri sejak 2009 di Semarang.",
    "foundingDate": "2009",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Palebon VI No.5, Palebon",
      "addressLocality": "Semarang",
      "addressRegion": "Jawa Tengah",
      "postalCode": "50199",
      "addressCountry": "ID"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-882-1575-1500",
      "contactType": "customer service",
      "availableLanguage": ["Indonesian", "Japanese", "English"]
    },
    "sameAs": [
      "https://www.instagram.com/lpk_aishiro/",
      "https://www.tiktok.com/@lpk_aishirogakuen",
      "https://line.me/R/ti/p/~aishiro426"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Indonesia"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LPK Aishiro Gakuen",
    "image": `${env.NEXT_PUBLIC_BASE_URL}/og-image.jpg`,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Palebon VI No.5, Palebon",
      "addressLocality": "Semarang",
      "addressRegion": "Jawa Tengah",
      "postalCode": "50199",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -7.005259984878899,
      "longitude": 110.46683188372741
    },
    "telephone": "+62-882-1575-1500",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "17:00"
    }
  };

  return (
    <html lang={locale}>
      <body className={`${inter.className} flex min-h-screen flex-col antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <LayoutContent>
            {children}
          </LayoutContent>
          <FloatingChat />
          <LanguageSwitcher />
        </NextIntlClientProvider>

        {/* Google Analytics - Dipasang di luar provider agar tidak mengganggu rendering */}
        <GoogleAnalytics gaId="G-575YSE1LMK" />
      </body>
    </html>
  );
}