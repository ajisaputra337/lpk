import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // 'as const' penting supaya TS tahu isinya cuma boleh id, jp, atau en
  locales: ['id', 'jp', 'en'] as const,
  defaultLocale: 'id',
  // Opsi ini mencegah error jika user akses path tanpa locale
  localePrefix: 'always' 
});

// Ini harus ada supaya Link dan useRouter kamu nggak merah di file lain
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);