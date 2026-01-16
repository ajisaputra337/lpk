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
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    metadataBase: new URL("https://www.lpk-aishiro.com"),
    title: {
      template: `%s | LPK Aishiro Gakuen`,
      default: t('title'),
    },
    description: t('description'),
    openGraph: {
      title: "LPK Aishiro Gakuen",
      description: t('description'),
      url: `https://www.lpk-aishiro.com/${locale}`,
      siteName: "LPK Aishiro Gakuen",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
      locale: locale === 'jp' ? 'ja_JP' : locale === 'en' ? 'en_US' : 'id_ID',
      type: "website",
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

  return (
    <html lang={locale}>
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