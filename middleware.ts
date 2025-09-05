import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;
  const url = req.nextUrl;

  // 需要登录的路径（示例：/dashboard 下全部）
  const needsAuth = url.pathname.startsWith("/dashboard");

  if (needsAuth && !session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("return_to", url.pathname + url.search);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // 受保护的路径
};
