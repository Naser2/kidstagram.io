// app/api/saved-posts/[username]/route.ts
import { fetchSavedPostsByUserId} from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.pathname.split("/").pop(); // ✅ Extract postId from URL

  if (!userId) {
    return NextResponse.json({ error: "Missing postId" }, { status: 400 });
  }

  try {
    const savedPosts = await fetchSavedPostsByUserId(userId);
    console.log("savedPosts", savedPosts);

    if (!savedPosts) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(savedPosts);
  } catch (error) {
    console.error("fetchSavedPostsByUserId -> Database error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// export async function GET(req: Request, { params }: { params: { userId: string } }) {
//     const { userId } = await  params;
//   try {
//     const savedPosts = await fetchSavedPostsByUserId(userId);
//     return NextResponse.json({ savedPosts });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch saved posts" }, { status: 500 });
//   }
// }
