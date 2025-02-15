import { NextResponse } from "next/server";
import { fetchPostById } from "@/lib/data"; // ✅ Use the existing function

export async function GET(req: Request, { params }: { params: { postId: string } }) {
  const { postId } = await  params; // ❌ DO NOT `await` params
  console.log("PostPage_postId", postId); // ✅ Log correctly

  try {
    const post = await fetchPostById(postId); // ✅ Fetch from lib
    console.log("PostPage_postId_Post", post); //
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch (error) {
    console.error("fetchPostById -> Prisma error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
