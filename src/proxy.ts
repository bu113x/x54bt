import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { createServerClient } from "@supabase/ssr";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

const PROTECTED_SEGMENTS = [
  "overview",
  "explore",
  "portfolio",
  "ledger",
  "support",
  "account",
];

const AUTH_SEGMENTS = [
  "sign-in",
  "sign-up",
  "forgot-password",
  "reset-password",
  "verify-email",
];

const getLocalePrefix = (pathname: string) => {
  const first = pathname.split("/").filter(Boolean)[0];
  return routing.locales.includes(first as (typeof routing.locales)[number])
    ? `/${first}`
    : "";
};

const getFirstSegmentAfterLocale = (pathname: string, localePrefix: string) => {
  const rest = localePrefix ? pathname.slice(localePrefix.length) : pathname;
  return rest.split("/").filter(Boolean)[0] ?? "";
};

export default async function middleware(request: NextRequest) {
  // Next-intl first — it handles locale detection/redirects and
  // returns the response object we'll attach Supabase's session cookies to.
  const response = intlMiddleware(request);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Refreshes the session if the access token is expired — required so
  // Server Components downstream see a valid user.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const localePrefix = getLocalePrefix(pathname);
  const segment = getFirstSegmentAfterLocale(pathname, localePrefix);

  const isProtectedRoute = PROTECTED_SEGMENTS.includes(segment);
  const isAuthRoute = AUTH_SEGMENTS.includes(segment);

  if (isProtectedRoute && !user) {
    const redirectUrl = new URL(`${localePrefix}/sign-in`, request.url);
    redirectUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthRoute && user) {
    return NextResponse.redirect(
      new URL(`${localePrefix}/overview`, request.url),
    );
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
