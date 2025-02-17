import { auth } from "@/auth";
import { NextResponse } from "next/server";

// export async function GET() {
//   const session = await auth();
// console.log("MIDDLEWARE_AUTH_SESSION: ", session);
//   if (!session) {
//     return NextResponse.json({ user: null }, { status: 200 });
//   }

//   return NextResponse.json(session, { status: 200 });
// }


export const GET = async function GET() {
    const session = await auth();
    console.log("Session:", session);
  
    if (session) return NextResponse.json(session);
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
  };
  