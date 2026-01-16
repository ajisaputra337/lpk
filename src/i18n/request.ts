import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Await the locale from the request (next-intl v4.x API)
  const locale = await requestLocale;

  // Validate locale, fallback to default if invalid
  const finalLocale = locale && routing.locales.includes(locale as typeof routing.locales[number])
    ? locale
    : routing.defaultLocale;

  return {
    locale: finalLocale,
    messages: (await import(`../messages/${finalLocale}.json`)).default
  };
});