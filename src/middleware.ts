import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

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
            request.cookies.set(name, value)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  const publicRoutes = [
    "/signin",
    "/auth/callback",
    "/",
    "/coming-soon",
    "/contact",
    "/error",
    "/marketplace",
    "/pricing",
    "/product",
    "/terms",

    // // TESTING ONLY
    // "/chat",
    // "/profile",
  ];
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute && user) {
    if (pathname === "/signin") {
      const url = request.nextUrl.clone();
      const next = request.nextUrl.searchParams.get("next") || "/profile";
      url.pathname = next.startsWith("/") ? next : "/profile";
      url.search = "";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }
  if (!isPublicRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
