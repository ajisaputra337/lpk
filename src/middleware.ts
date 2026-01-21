import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const handleI18nRouting = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // PROTEKSI ADMIN
  if (pathname.startsWith('/admin-lpkaishiro') && !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname === '/login' && user) {
    return NextResponse.redirect(new URL('/admin-lpkaishiro', request.url));
  }

  // LOGIKA BYPASS i18n
  // Tambahkan pengecekan agar file di folder /Images atau /siswa tidak kena i18n
  const isInternalPath = 
    pathname.startsWith('/admin-lpkaishiro') || 
    pathname.startsWith('/login') || 
    pathname.startsWith('/api') ||
    pathname.startsWith('/Images') || // Tambahan untuk aset
    pathname.startsWith('/siswa') ||  // Tambahan untuk aset
    pathname.includes('.');

  if (isInternalPath) {
    return response;
  }

  return handleI18nRouting(request);
}

export const config = {
  // Gunakan matcher yang lebih inklusif tapi mengecualikan yang tidak perlu
  matcher: [
    // Jalankan pada semua rute kecuali yang disebut di dalam (?!...)
    '/((?!api|_next/static|_next/image|favicon.ico|Images|siswa|.*\\..*).*)',
  ],
};