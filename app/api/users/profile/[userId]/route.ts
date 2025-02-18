import { NextResponse } from "next/server";
import { fetchProfileByID } from "@/lib/data"; // ✅ Use the existing function

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  const { userId } = await  params;
  console.log("fetchProfile", userId); // ✅ Log correctly

  try {
    const profile = await fetchProfileByID(userId); // ✅ Fetch from lib
    console.log("username", userId); //
    console.log("FetchUser_by_username", profile); //
    if (!profile) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json(profile);
  } catch (error) {
    console.error("fetchUser_by_unsername-> Prisma error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
