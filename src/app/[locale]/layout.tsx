import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import LayoutContent from "../LayoutContent";
import FloatingChat from "../../styles/components/FloatingChat";
import LanguageSwitcher from "../../styles/components/LanguageSwitcher";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

// METADATA DINAMIS (Mengambil dari JSON Metadata)
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  const baseUrl = "https://www.lpk-aishiro.com";

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

    // HREFLANG & CANONICAL - Penting untuk SEO multi-bahasa
    // Memberitahu Google bahwa halaman ini tersedia dalam bahasa lain
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'id': `${baseUrl}/id`,
        'en': `${baseUrl}/en`,
        'ja': `${baseUrl}/jp`,
        'x-default': `${baseUrl}/id`, // Default untuk user yang tidak match bahasa apapun
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

    // Twitter Card untuk sharing di Twitter/X
    twitter: {
      card: 'summary_large_image',
      title: "LPK Aishiro Gakuen",
      description: t('description'),
      images: ['/og-image.jpg'],
    },

    robots: { index: true, follow: true },
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

  // Mengambil pesan kamus sesuai bahasa yang aktif
  const messages = await getMessages();

  // STRUCTURED DATA (JSON-LD) - Membantu Google memahami bisnis
  // Berpotensi menampilkan Knowledge Panel di hasil pencarian
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "LPK Aishiro Gakuen",
    "alternateName": "愛城学園",
    "url": "https://www.lpk-aishiro.com",
    "logo": "https://www.lpk-aishiro.com/Images/logo_aishiro.png",
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
      "https://www.instagram.com/lpk_aishiro_gakuen",
      "https://www.tiktok.com/@lpk_aishiro_gakuen"
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
    "image": "https://www.lpk-aishiro.com/og-image.jpg",
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
      <head>
        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${inter.className} flex min-h-screen flex-col antialiased`}>
        {/* NextIntlClientProvider membungkus semua agar komponen client bisa pakai translate */}
        <NextIntlClientProvider messages={messages} locale={locale}>
          <LayoutContent>
            {children}
          </LayoutContent>

          {/* Komponen Global Melayang */}
          <FloatingChat />
          <LanguageSwitcher />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}