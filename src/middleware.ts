import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// 1. Inisialisasi Middleware Bahasa
const handleI18nRouting = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // --- BAGIAN A: SETUP SUPABASE (AUTH) ---
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

  // Ambil user untuk proteksi admin
  const { data: { user } } = await supabase.auth.getUser();

  // --- BAGIAN B: PROTEKSI ROUTE ADMIN ---
  // Sesuaikan '/admin-lpkaishiro' dengan folder admin lu
  if (pathname.startsWith('/admin-lpkaishiro') && !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Jika sudah login, dilarang ke halaman login lagi
  if (pathname === '/login' && user) {
    return NextResponse.redirect(new URL('/admin-lpkaishiro', request.url));
  }

  // --- BAGIAN C: LOGIKA i18n (BAHASA) ---
  // Abaikan redirect bahasa jika sedang di path Admin, Login, atau API
  const isInternalPath = 
    pathname.startsWith('/admin-lpkaishiro') || 
    pathname.startsWith('/login') || 
    pathname.startsWith('/api') ||
    pathname.includes('.'); // Abaikan file statis (favicon, images)

  if (isInternalPath) {
    return response;
  }

  // Jalankan i18n untuk halaman publik (Home, Profil, dll)
  return handleI18nRouting(request);
}

export const config = {
  // Matcher untuk menangkap semua route yang perlu diproses
  matcher: [
    // Jalankan i18n di root dan folder bahasa
    '/', 
    '/(id|en|jp)/:path*', 
    
    // Jalankan proteksi di path admin & login
    '/admin-lpkaishiro/:path*', 
    '/login'
  ],
};