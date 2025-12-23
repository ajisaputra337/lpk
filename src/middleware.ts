import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

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

  // GUNAKAN getUser() - Ini wajib untuk keamanan terbaru
  const { data: { user }, error } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname;
  
  // LOG UNTUK DEBUG (Cek Terminal VS Code lu!)
  console.log(`--- MIDDLEWARE CHECK ---`);
  console.log(`Path: ${pathname}`);
  console.log(`User ID: ${user?.id || 'TIDAK ADA'}`);
  if (error) console.log(`Error: ${error.message}`);

  // Proteksi Admin
  if (pathname.startsWith('/admin-lpkaishiro') && !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Proteksi Login Page
  if (pathname === '/login' && user) {
    return NextResponse.redirect(new URL('/admin-lpkaishiro', request.url));
  }

  return response
}

export const config = {
  matcher: ['/admin-lpkaishiro/:path*', '/login'],
}