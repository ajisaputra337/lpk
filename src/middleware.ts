import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // 1. Inisialisasi respon awal
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  // 2. Konfigurasi Supabase Client untuk Middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // 3. Ambil session user saat ini
  const { data: { session } } = await supabase.auth.getSession()

  const pathname = request.nextUrl.pathname;
  const isAdminPage = pathname.startsWith('/admin-lpkaishiro');
  const isLoginPage = pathname === '/login';

  // --- LOGIKA PROTEKSI ---

  // A. Jika akses halaman ADMIN tapi BELUM LOGIN -> Tendang balik ke /login
  if (isAdminPage && !session) {
    const url = new URL('/login', request.url);
    // Kita tambahkan 'next' parameter supaya setelah login bisa balik ke halaman yg tadi dituju
    url.searchParams.set('next', pathname); 
    return NextResponse.redirect(url);
  }

  // B. Jika sudah LOGIN tapi iseng mau akses /login lagi -> Lempar ke dashboard ADMIN
  if (isLoginPage && session) {
    const url = new URL('/admin-lpkaishiro', request.url);
    return NextResponse.redirect(url);
  }

  return response
}

// 4. Tentukan path mana saja yang harus melewati filter ini
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/admin-lpkaishiro/:path*', 
    '/login'
  ],
}