import { NextRequest, NextResponse } from "next/server";
import { fetchPostById } from "@/lib/data"; // ✅ Fetch function

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const postId = url.pathname.split("/").pop(); // ✅ Extract postId from URL

  if (!postId) {
    return NextResponse.json({ error: "Missing postId" }, { status: 400 });
  }

  try {
    const post = await fetchPostById(postId); // ✅ Fetch post
    console.log("PostPage_postId_Post", post);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("fetchPostById -> Database error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
