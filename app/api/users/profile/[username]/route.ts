import { NextResponse } from "next/server";
import { fetchProfile } from "@/lib/data"; // ✅ Use the existing function

export async function GET(req: Request, { params }: { params: { username: string } }) {
  const { username } = await  params;
  console.log("fetchProfile", username); // ✅ Log correctly

  try {
    const profile = await fetchProfile(username); // ✅ Fetch from lib
    console.log("username", username); //
    console.log("FetchUser_by_username", profile); //
    if (!profile) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json(profile);
  } catch (error) {
    console.error("fetchUser_by_unsername-> Prisma error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
