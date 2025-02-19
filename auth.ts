


import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { saltAndHashPassword } from "@/lib/helpers";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your-email@example.com" },
        // email: {
        //   label: "Email",
        //   type: "email",
        //   placeholder: "email@example.com",
        // },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        console.log("USER_authorize", credentials);
        // const id = credentials.id as string;
        const email = credentials.email as string;
        const password = credentials.password as string; // Get the password
        // const hash = saltAndHashPassword(credentials.password);
        const hashedPassword = await saltAndHashPassword(password); // Hash password
   
        let user: any = await db.user.findUnique({
          where: { email },
          select: { id: true, password: true , username: true, image: true },
        });
        if (!user) {
          console.error("User not found in database.");
          throw new Error("No user found with this email.");
        }
        console.log("USER_HASH_PASSWORD", hashedPassword);
        console.log("USER_DB_PASSWORD", user.password);
        const isValid = await bcrypt.compare(password, user.password);
        console.log("IS_VALID_PASSWORD: ", isValid);
        if (!isValid) {
          throw new Error("Incorrect password.");
        }
        console.log("USER_FIND_UNIQUE", user);

          if (!isValid) {
            throw new Error("Incorrect password.");
          }
        if (!user) {
          user = await db.user.create({
            data: {
              id: user.id,
              email,
              username: user.username,
              image: `https://api.dicebear.com/v2/identicon/svg?seed=${email}`,
              password: hashedPassword,
            },
          });

          console.log("NEW_USER_CREATED: ", user);
        } else {
          const isMatch = bcrypt.compareSync(
            credentials.password as string,
            user.password
          );
          if (!isMatch) {
            throw new Error("Incorrect password.");
          }
        }

        return user;
      },
    }),
  ],

callbacks: {
  async jwt({ token, user }) {
    console.log("JWT_TOKEN_CALLBACK: ", token);
    if (user) {
      token.id = user.id || "";
      token.username = user.username || "";
      token.email = user.email || "";
      token.picture = user.image || "";
    }
    console.log("JWT_TOKEN_CALLBACK: ", token);
    return token;
  },
  async session({ session, token }) {
    session.user.id = token.id as string;
    session.user.username = token.username as string;
    session.user.email = token.email ?? "";
    return session;
  }

}
  
});


// Working AUTH with callback