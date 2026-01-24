import type { MetadataRoute } from 'next';
import { env } from '~/env';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = env.NEXT_PUBLIC_BASE_URL;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin-lpkaishiro/', // Area Admin
          '/login',             // Halaman Login
          '/api/',              // API Internal
          '/*/_next/',          // Resource internal Next.js
          '/*/admin-lpkaishiro/', // Versi bahasa dari halaman admin
          '/*/login',             // Versi bahasa dari halaman login
        ],
      },
      {
        userAgent: 'GPTBot', // Opsional: Melarang AI men-scraping kontenmu jika diinginkan
        disallow: '/',
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}