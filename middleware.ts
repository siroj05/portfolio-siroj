import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("session")?.value;

  // Kalau user belum login dan mau masuk halaman login -> biarkan
  if (pathname.startsWith("/login") && !token) {
    return NextResponse.next();
  }

  // Kalau belum login dan bukan di /login -> redirect ke /login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Kalau sudah login dan masih buka /login -> redirect ke /admin
  if (pathname.startsWith("/login") && token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/experiences/:path*",
    "/messages/:path*",
    "/projects/:path*",
    "/skills/:path*",
    "/login",
  ],
};
