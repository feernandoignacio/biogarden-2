import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { SUPABASE_KEY, SUPABASE_URL } from '@/lib/supabase/config';

const LOGIN = '/painel/login';

// Protege o painel: sem login, qualquer página do painel leva ao login.
// Também renova a sessão do dono para ele não cair do nada.
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(list) {
        for (const { name, value } of list) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of list) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  if (!user && pathname !== LOGIN) {
    return redirectKeepingCookies(request, response, LOGIN);
  }
  if (user && pathname === LOGIN) {
    return redirectKeepingCookies(request, response, '/painel');
  }
  return response;
}

function redirectKeepingCookies(
  request: NextRequest,
  response: NextResponse,
  path: string,
) {
  const redirect = NextResponse.redirect(new URL(path, request.url));
  for (const cookie of response.cookies.getAll()) redirect.cookies.set(cookie);
  return redirect;
}

export const config = {
  matcher: ['/painel', '/painel/:path*'],
};
