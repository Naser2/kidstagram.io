
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


// export default withAuth({
//   callbacks: {
//     authorized({ req, token }) {
//       const publicRoutes = ["/", "/login", "/signup"];
//       const pathname = req.nextUrl.pathname;

//       if (publicRoutes.includes(pathname)) {
//         return true;
//       }

//       return !!token;
//     },
//   },
// });

// // Middleware to add x-current-path header
// export function middleware(request: NextRequest) {
//   const response = NextResponse.next();

//   // Add the x-current-path header
//   response.headers.set("x-current-path", request.nextUrl.pathname);

//   return response;
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

// // Extend the `withAuth` middleware
// export default withAuth({
//   callbacks: {
//     authorized({ req, token }) {
//       const publicRoutes = ["/", "/login", "/signup"];
//       const pathname = req.nextUrl.pathname;

//       if (publicRoutes.includes(pathname)) {
//         return true;
//       }

//       return !!token; // Allow access if user is authenticated
//     },
//   },
//   pages: {
//     signIn: "/login", // Redirect unauthenticated users here
//   },
// });

// // Use a separate middleware to add the `x-current-path` header
// export function middleware(req: NextRequest) {
//   const res = NextResponse.next();

//   // Add the `x-current-path` header to the response
//   res.headers.set("x-current-path", req.nextUrl.pathname);

//   return res;
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Match all routes except static files and APIs
// };


// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";


export default withAuth(
  async (req: NextRequest) => { // Add this callback
    const headers = new Headers(req.headers);
    headers.set("x-current-path", req.nextUrl.pathname);
    return NextResponse.next({ headers });
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const publicRoutes = ["/", "/login", "/signup"];
        const pathname = req.nextUrl.pathname;

        if (publicRoutes.includes(pathname)) {
          return true;
        }

        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// Wrap the `withAuth` middleware to add the x-current-path header
// export default withAuth({
//   callbacks: {
//     authorized({ req, token }) {
//       const publicRoutes = ["/", "/login", "/signup"];
//       const pathname = req.nextUrl.pathname;

//       // Allow public routes
//       if (publicRoutes.includes(pathname)) {
//         return true;
//       }

//       // Protect private routes
//       return !!token; // Allow access if user is authenticated
//     },
//   },
//   async middleware(request: NextRequest, nextResponse: NextResponse) {
//       {
//           const publicRoutes = ["/", "/login", "/signup"];
//           const pathname = request.nextUrl.pathname;

//           if (publicRoutes.includes(pathname)) {
//             return true;
//           }
//         }

//     // Add x-current-path header
//     const headers = new Headers(nextResponse.headers);
//     headers.set("x-current-path", request.nextUrl.pathname);

//     return NextResponse.next({ headers });
//   },
// });

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico).*)", // Match all routes except static files and APIs
//   ],
// };


 // Add a new header x-current-path which passes the path to downstream components


// export default withAuth({
//   callbacks: {
//     authorized({ req, token }) {
//       const publicRoutes = ["/", "/login", "/signup"];
//       const pathname = req.nextUrl.pathname;

//       // Allow public routes
//       if (publicRoutes.includes(pathname)) {
//         return true;
//       }

//       // Protect private routes
//       return !!token; // Allow access if user is authenticated
//     },
//   },
// });

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Match all routes except static files
// };


// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//   callbacks: {
//     authorized({ req, token }) {
//       if (process.env.NODE_ENV === 'development') {
//         // In development, allow all users to access protected routes
//         return true;
//       }

//       const isLoggedIn = !!token;
//       const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       }
//       return true;
//     },
//   },
// });

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|.png).*)"],
// };