import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
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

  // Si la ruta es /administrator y no hay usuario, redirigir a login
  if (request.nextUrl.pathname.startsWith('/administrator') && !user) {
    // Permitir acceso a /administrator/login
    if (request.nextUrl.pathname === '/administrator/login') {
      return response;
    }
    return NextResponse.redirect(new URL('/administrator/login', request.url));
  }

  // Si hay usuario y está en /administrator/login, redirigir al dashboard
  if (request.nextUrl.pathname === '/administrator/login' && user) {
    return NextResponse.redirect(new URL('/administrator', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/administrator/:path*'],
};


