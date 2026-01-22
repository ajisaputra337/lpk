import type { MetadataRoute } from 'next';
import { env } from '~/env';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = env.NEXT_PUBLIC_BASE_URL;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin-lpkaishiro/', // Melarang Google mengindeks halaman admin
        '/login',             // Melarang Google mengindeks halaman login
        '/api/',              // Melarang akses ke folder API internal
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}