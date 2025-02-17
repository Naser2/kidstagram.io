import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

const protectedRoutes = ["/profile", "/content"];

export default async function middleware(request: NextRequest) {
  const session = await auth(); // ❌ Fix: auth() may not work inside middleware
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


// // export { auth as middleware } from "@/auth";

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { auth } from "@/auth";

// const protectedRoutes = ["/profile", "/content"];

// export default async function middleware(request: NextRequest) {
//   const session = await auth();
// console.log("MIDDLEWARE_SESSION: ", session);
//   const isProtected = protectedRoutes.some((route) =>
//     request.nextUrl.pathname.startsWith(route)
//   );

//   if (!session && isProtected) {
//     console.log("MIDDLEWARE_ to home");
//     const absoluteURL = new URL("/", request.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };