import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Ensure this imports Prisma client
import { CreateComment } from "@/lib/schemas";
import { getUserId } from "@/lib/utils"; // Ensure you have a function to get the user ID




export async function POST(req: Request) {
  try {
    const userId = await getUserId();
    const body = await req.json();
    
    const validatedFields = CreateComment.safeParse(body);
    if (!validatedFields.success) {
      return NextResponse.json({ 
        errors: validatedFields.error.flatten().fieldErrors, 
        message: "Missing Fields. Failed to Create Comment." 
      }, { status: 400 });
    }

    const { postId, body: commentBody } = validatedFields.data;

    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const newComment = await prisma.comment.create({
      data: { body: commentBody, postId, userId },
    });

    return NextResponse.json({ 
      message: "Created Comment.", 
      comment: newComment 
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: "Database Error: Failed to Create Comment." }, { status: 500 });
  }
}

