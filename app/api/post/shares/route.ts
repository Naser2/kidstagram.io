import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { postId, userId } = await req.json();

    if (!postId || !userId) {
      return NextResponse.json({ error: "postId and userId are required" }, { status: 400 });
    }

    console.log("Creating share with:", { postId, userId });

    // ✅ Remove crypto.randomUUID() - Prisma auto-generates the ID
    const share = await prisma.shares.create({
      data: {
        postId,
        userId,
      },
    });

    console.log("Prisma share create payload:", share);

    return NextResponse.json(
      { message: "Share created successfully", share }, 
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Prisma error:", error);

    // ✅ Fix: Ensure the error object is always valid
    return NextResponse.json(
      { error: error?.message ?? "Unknown error occurred while creating share" },
      { status: 500 }
    );
  }
}
