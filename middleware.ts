// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // ✅ Хамгаалах маршрут
  const protectedRoutes = ["/dashboard", "/profile", "/articles/new"];

  const isProtected = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !token) {
    // 👮 redirect to login
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

// 🔍 Enable middleware on these paths
export const config = {
  matcher: ["/dashboard/:path*", "/articles/:path*", "/profile/:path*"],
};
