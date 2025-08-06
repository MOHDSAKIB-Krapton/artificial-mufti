import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function middleware(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Define the paths that are publicly accessible without authentication.
    // The homepage ("/") should be a public path.
    const publicPaths = [
      "/",
      "/coming-soon",
      "/contact",
      "/marketplace",
      "/pricing",
      "/product",
      "/terms",
      "/auth/signin",
      "/auth/signup",
      "/auth/callback",
      "/error",
    ];

    // Check if the current path is in our list of public paths.
    const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

    // Condition 1: User is authenticated and tries to access a public auth page.
    // Redirect them to their profile.
    if (user && isPublicPath) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }

    // Condition 2: User is NOT authenticated and tries to access a protected page.
    // A protected page is any page that is NOT a public path.
    if (!user && !isPublicPath) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    // Otherwise, let the request proceed.
    return NextResponse.next();
  } catch (error) {
    console.log("Allowing request to proceed.");
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
}

// The matcher configuration remains the same.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
