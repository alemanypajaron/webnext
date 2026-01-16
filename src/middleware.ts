import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  console.log('[Middleware] 🛣️ Ruta:', pathname);

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log('[Middleware] 👤 Usuario:', user ? user.email : 'No autenticado');

  // Si la ruta es /administrator y no hay usuario, redirigir a login
  if (pathname.startsWith('/administrator') && !user) {
    // Permitir acceso a /administrator/login y páginas de diagnóstico
    if (
      pathname === '/administrator/login' ||
      pathname === '/administrator/diagnostico-auth' ||
      pathname === '/administrator/diagnostico-push' ||
      pathname === '/administrator/instalar-pwa'
    ) {
      console.log('[Middleware] ✅ Permitiendo acceso a:', pathname);
      return response;
    }
    
    console.log('[Middleware] 🔒 Redirigiendo a login desde:', pathname);
    return NextResponse.redirect(new URL('/administrator/login', request.url));
  }

  // Si hay usuario y está en /administrator/login, redirigir al dashboard
  if (pathname === '/administrator/login' && user) {
    console.log('[Middleware] ↩️ Usuario ya autenticado, redirigiendo a dashboard');
    return NextResponse.redirect(new URL('/administrator', request.url));
  }

  console.log('[Middleware] ✅ Permitiendo acceso');
  return response;
}

export const config = {
  matcher: ['/administrator/:path*'],
};


