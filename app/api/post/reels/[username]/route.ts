// app/api/saved-posts/[username]/route.ts
import { NextResponse } from "next/server";
import { fetchSavedPostsByUsername } from "@/lib/data";

export async function GET(req: Request, { params }: { params: { username: string } }) {
    const { username } = await  params;
  try {
    const savedPosts = await fetchSavedPostsByUsername(username);
    return NextResponse.json({ savedPosts });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch saved posts" }, { status: 500 });
  }
}
