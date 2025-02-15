import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"; // Import credentials provider
import NextAuth, { getServerSession, type NextAuthOptions } from "next-auth";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

// console.log("AUTH_1_GOOGLE_CLIENT_ID", process.env.GOOGLE_CLIENT_ID);
// console.log("AUTH_2_GOOGLE_CLIENT_ID", process.env.GOOGLE_CLIENT_SECRET);
export const config = {
  pages: {
    signIn: "/", // Custom login page
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password" },
      },
    
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        // console.log("AUTH_3_credentials", credentials)
        // console.log("AUTH_4_PRISMA_AWAITED_RES", credentials)
        // --------- To ensure `user.password` is a string before calling `bcrypt.compare()`
        if (user && typeof user.password === "string" && credentials?.password) {
          const isValid = await bcrypt.compare(credentials.password, user.password);
          // console.log("AUTH_4_isValid", isValid)
          if (isValid) {
            return user;
          }
        }

        // --------- Add "string" && credentials?.password for bCruypt to Compare Password in case not null is passed above
        if (user && typeof user.password === "string" && credentials?.password) {
          const isValid = await bcrypt.compare(credentials.password, user.password);
          // console.log("AUTH_5_isValid", isValid)
          if (isValid) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  
  callbacks: {
     async session({ session, token }) {
    //   console.log("AUTH_6_session", session);
    //   console.log("AUTH_7_session", token);
    
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string;
        session.user.username = token.username as string;
      }
    
      // console.log("Final session:", session);
      return session;
    },
    async jwt({ token, user }: { token: any, user?: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.username = user.username;
        token.picture = user.image || user.picture; // Ensure it gets set
        return token;
      }
    
      // console.log("jwt token before DB lookup:", token);
    
      // Fetch user from DB
      const prismaUser = await prisma.user.findFirst({
        where: { email: token.email },
        select: { id: true, name: true, email: true, username: true, image: true }, // Ensure `image` is selected
      });
    
      // console.log("prismaUser from DB:", prismaUser);
    
      if (!prismaUser) {
        return token;
      }
    
      return {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email,
        username: prismaUser.username,
        picture: prismaUser.image || token.picture, // Keep stored image or use OAuth-provided picture
      };
    }
    
  },
} satisfies NextAuthOptions;

export default NextAuth(config);

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
