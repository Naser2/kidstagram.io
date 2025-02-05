import { config } from "@/auth";
import NextAuth from "next-auth/next";
// const  NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET // Temporary secret for development
const handler = NextAuth(config);
// console.log('NEXTAUTH_SECRET-routes:', process.env.NEXTAUTH_SECRET);

export { handler as GET, handler as POST };
