import { NextResponse } from "next/server";
import { createUser } from "@/lib/user";

export const POST = async (req: Request) => {
  try {
    const body = await req.json(); // Extract JSON from the request body
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
    }

    const result = await createUser({ name, email, password });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
};
