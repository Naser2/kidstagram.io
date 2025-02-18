


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
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        // const id = credentials.id as string;
        const email = credentials.email as string;
        const hash = saltAndHashPassword(credentials.password);

        let user: any = await db.user.findUnique({
          where: { email },
          select: { id: true, username: true, image: true },
        });

        if (!user) {
          user = await db.user.create({
            data: {
              id: user.id,
              email,
              username: user.username,
              image: `https://api.dicebear.com/v2/identicon/svg?seed=${email}`,
              hashedPassword: hash,

              // username: email.split("@")[0],
            },
          });
        } else {
          const isMatch = bcrypt.compareSync(
            credentials.password as string,
            user.hashedPassword
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
    if (user) {
      token.id = user.id;
      token.username = user.username || (user?.email ? user.email.split("@")[0] : ""); // Ensure username exists
      token.picture = user?.image; // If available, set the profile image
    }
    return token;
  },
  async session({ session, token }) {
    session.user.id = token.id as string ||  token.sub as string;
    session.user.username = token.username as string || (token?.email ? token.email.split("@")[0] : "");
    // console.log("SESSION_TOKEN_CALLBACK: " , token)
    return session;
  },

}

  
});


// export const {
//   handlers: { GET, POST },
//   signIn,
//   signOut,
//   auth,
// } = NextAuth({
//   adapter: PrismaAdapter(db),
//   session: { strategy: "jwt" },
//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "email@example.com",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       authorize: async (credentials) => {
//         if (!credentials || !credentials.email || !credentials.password) {
//           return null;
//         }

//         const email = credentials.email as string;
//         const hash = saltAndHashPassword(credentials.password);

//         let user: any = await db.user.findUnique({
//           where: {
//             email,
//           },   
//           select: { id: true, username: true, image: true },
//         });

//         if (!user) {
//           user = await db.user.create({
//             data: {
//               id: user.id,
//               email,
//               hashedPassword: hash,
//             },
//           });
//         } else {
//           const isMatch = bcrypt.compareSync(
//             credentials.password as string,
//             user.hashedPassword
//           );
//           if (!isMatch) {
//             throw new Error("Incorrect password.");
//           }
//         }

//         return user;
//       },
//     }),
    
//   ],
  
// });


// export const runtimes = ["nodejs", "deno", "browser"];

// export const runtime = "nodejs"; // ✅ Force Node.js runtime


// import NextAuth from "next-auth";

// import Github from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import Credentials from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import { db } from "./db";
// import { saltAndHashPassword } from "@/lib/helpers";

// export const {
//   handlers: { GET, POST },
//   signIn,
//   signOut,
//   auth,
// } = NextAuth({
//   adapter: PrismaAdapter(db),
//   session: { strategy: "jwt" },
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "email@example.com",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       authorize: async (credentials) => {
//         if (!credentials || !credentials.email || !credentials.password) {
//           return null;
//         }

//         const email = credentials.email as string;
//         const hash = saltAndHashPassword(credentials.password);
      
//         let user: any = await db.user.findUnique({
//           where: { email: email },
//           select: { id: true, username: true, image: true },
//         });

//         if (!user) {
//           user = await db.user.create({
//             data: {
//               id: user.id,
//               email,
//               hashedPassword: hash,
//             },
//           });
//           console.log("User created", user);
//         } else {
//           const isMatch = bcrypt.compareSync(
//             credentials.password as string,
//             user.hashedPassword
//           );
//           if (!isMatch) {
//             throw new Error("Incorrect password.");
//           }
//         }

//         return user;
//       },
//     })
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id as string;
//         session.user.username = token.username as string;
//         session.user.image = token.picture as string;
//       }
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.username = user.username;
//         token.picture = user.image;
//         return token;
//       }

//       const prismaUser = await prisma.user.findFirst({
//         where: { email: token.email },
//         select: { id: true, username: true, image: true },
//       });

//       if (prismaUser) {
//         token.id = prismaUser.id;
//         token.username = prismaUser.username;
//         token.picture = prismaUser.image;
//       }

//       return token;
//     },
//   },

  
// });
// export default NextAuth({
//   adapter: PrismaAdapter(db),
//   session: { strategy: "jwt" },
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "your-email@example.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const user = await prisma.user.findUnique({
//           where: {
//             email: credentials?.email,
//           },
//         });
//         if (user){
//           const isMatch = bcrypt.compareSync(
//             credentials.password as string,
//             user.hashedPassword
//           );
//           if (!isMatch) {
//             throw new Error("Incorrect password.");
//           }
//         }
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }: { session: any, token: any }) {
//       if (token) {
//         session.user.id = token.id as string;
//         session.user.name = token.name as string;
//         session.user.email = token.email as string;
//         session.user.image = token.picture as string;
//         session.user.username = token.username as string;
//       }
//       return session;
//     },
//     async jwt({ token, user }: { token: any, user?: any }) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.email = user.email;
//         token.username = user.username;
//         token.picture = user.image || user.picture;
//         return token;
//       }
//       const prismaUser = await prisma.user.findFirst({
//         where: { email: token.email },
//         select: { id: true, name: true, email: true, username: true, image: true },
//       });
//       if (!prismaUser) {
//         return token;
//       }
//       return {
//         id: prismaUser.id,
//         name: prismaUser.name,
//         email: prismaUser.email,
//         username: prismaUser.username,
//         picture: prismaUser.image || token.picture,
//       };
//     },
//   },
// });
// const auth = NextAuth({
//   adapter: PrismaAdapter(db),
//   session: { strategy: "jwt" },
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "your-email@example.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const user = await prisma.user.findUnique({
//           where: {
//             email: credentials?.email,
//           },
//         });
//         if (user){
//           const isMatch = bcrypt.compareSync(
//             credentials.password as string,
//             user.hashedPassword
//           );
//           if (!isMatch) {
//             throw new Error("Incorrect password.");
//           }
//         }
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }: { session: any, token: any }) {
//       if (token) {
//         session.user.id = token.id as string;
//         session.user.name = token.name as string;
//         session.user.email = token.email as string;
//         session.user.image = token.picture as string;
//         session.user.username = token.username as string;
//       }
//       return session;
//     },
//     async jwt({ token, user }: { token: any, user?: any }) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.email = user.email;
//         token.username = user.username;
//         token.picture = user.image || user.picture;
//         return token;
//       }
//       const prismaUser = await prisma.user.findFirst({
//         where: { email: token.email },
//         select: { id: true, name: true, email: true, username: true, image: true },
//       });
//       if (!prismaUser) {
//         return token;
//       }
//       return {
//         id: prismaUser.id,
//         name: prismaUser.name,
//         email: prismaUser.email,
//         username: prismaUser.username,
//         picture: prismaUser.image || token.picture,
//       };
//     },
//   },
// });

// export const { handlers, signIn, signOut } = auth;
