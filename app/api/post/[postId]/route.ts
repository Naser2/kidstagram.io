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


// import { NextResponse } from "next/server";
// import { fetchPostById } from "@/lib/data"; // ✅ Use the existing function
// import type { NextApiRequest, NextApiResponse } from 'next'
 
// export default async function GET(req: NextApiRequest, res: NextApiResponse) {
//   const { postId } = req.query

//   try {
//     if (typeof postId !== 'string') {
//       return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
//     }
//     const post = await fetchPostById(postId); // ✅ Fetch from lib
//     console.log("PostPage_postId_Post", post); //
//     if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
//     return NextResponse.json(post);
//   } catch (error) {
//     console.error("fetchPostById -> Prisma error:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// WORKING LOCALY
// import { NextResponse } from "next/server";
// import { fetchPostById } from "@/lib/data"; // ✅ Use the existing function

// export async function GET(req: Request, { params }: { params: { postId: string } }) {
//   const { postId } = await  params; // ❌ DO NOT `await` params
//   console.log("PostPage_postId", postId); // ✅ Log correctly

//   try {
//     const post = await fetchPostById(postId); // ✅ Fetch from lib
//     console.log("PostPage_postId_Post", post); //
//     if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
//     return NextResponse.json(post);
//   } catch (error) {
//     console.error("fetchPostById -> Prisma error:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
