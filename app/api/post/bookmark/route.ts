import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { bookmarkPost } from "@/lib/actions";

export async function POST(req: Request) {
  try {
    const { postId, userId } = await req.json();

    // Check if the user already liked the post
     const bookmarkresponse =  await bookmarkPost(postId);
    // ✅ Fetch the updated likes count after action
   
    // ✅ Return likes in the response
    console.log("bookmark_API_response", bookmarkresponse);
    console.log("bookmark_API_response_MESSAGE", bookmarkresponse.message);
    return NextResponse.json({
      message: bookmarkresponse.message,
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { message: "API error", error: error },
      { status: 500 }
    );
  }
}
