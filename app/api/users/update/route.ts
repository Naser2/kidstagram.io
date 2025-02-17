import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { updateProfile } from "@/lib/actions";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized: No session found." }, { status: 401 });
    }

    const userId = session.user.id; // ✅ Fetch userId once and pass it
    const values = await req.json();

    const result = await updateProfile(userId, values); // ✅ No more session calls inside updateProfile
    return NextResponse.json(result);

  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ message: "Server error: Profile update failed." }, { status: 500 });
  }
}
