import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { postId, userId } = await req.json();

    // Check if the user already liked the post
    const existingLike = await prisma.like.findFirst({
      where: { postId, userId },
    });

    if (existingLike) {
      // Remove the like
      await prisma.like.delete({ where: { id: existingLike.id } });
    } else {
      // Add a new like
      await prisma.like.create({ data: { postId, userId } });
    }

    // ✅ Fetch the updated likes count after action
    const updatedLikes = await prisma.like.count({
      where: { postId },
    });

    // ✅ Return likes in the response
    return NextResponse.json({
      message: "Like updated successfully",
      likes: updatedLikes, // <-- This is what frontend needs!
    });
  } catch (error) {
    console.error("Like toggle error:", error);
    return NextResponse.json(
      { message: "Database Error: Failed to Like Post." },
      { status: 500 }
    );
  }
}
