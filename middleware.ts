

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

const protectedRoutes = ["/profile"];

export default async function middleware(request: NextRequest) {
  const session = await auth();
  console.log("MIDDLEWARE_SESSION: ", session);

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (!session && isProtected) {
    console.log("MIDDLEWARE -> redirecting to home");
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

