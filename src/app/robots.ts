import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.lpk-aishiro.com";

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