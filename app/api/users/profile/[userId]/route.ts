
import { fetchProfileByID } from "@/lib/data"; // ✅ Use the existing function
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.pathname.split("/").pop(); // ✅ Extract postId from URL

  if (!userId) {
    return NextResponse.json({ error: "Missing Profile" }, { status: 400 });
  }

  try {
    const profile = await fetchProfileByID(userId);
    console.log("fetchProfileByID", profile);

    if (!profile) {
      return NextResponse.json({ error: "USer not found" }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("fetchProfileByID -> Database error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
// export async function GET(req: Request, { params }: { params: { userId: string } }) {
//   const { userId } = await  params;
//   console.log("fetchProfile", userId); // ✅ Log correctly

//   try {
//     const profile = await fetchProfileByID(userId); // ✅ Fetch from lib
//     console.log("username", userId); //
//     console.log("FetchUser_by_username", profile); //
//     if (!profile) return NextResponse.json({ error: "User not found" }, { status: 404 });
//     return NextResponse.json(profile);
//   } catch (error) {
//     console.error("fetchUser_by_unsername-> Prisma error:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
