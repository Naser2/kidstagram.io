// app/api/saved-posts/[username]/route.ts
import { NextResponse } from "next/server";
import { fetchSavedPostsByUserId, fetchSavedPostsByUsername } from "@/lib/data";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
    const { userId } = await  params;
  try {
    const savedPosts = await fetchSavedPostsByUserId(userId);
    return NextResponse.json({ savedPosts });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch saved posts" }, { status: 500 });
  }
}
