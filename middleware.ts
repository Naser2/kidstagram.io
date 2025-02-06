// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//   callbacks: {
//     authorized({ req, token }) {
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
//   // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//   matcher: ["/((?!api|_next/static|_next/image|.png).*)"],
// };


import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const publicRoutes = ["/", "/login", "/signup"];
      const pathname = req.nextUrl.pathname;

      // Allow public routes
      if (publicRoutes.includes(pathname)) {
        return true;
      }

      // Protect private routes
      return !!token; // Allow access if user is authenticated
    },
  },
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Match all routes except static files
};


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