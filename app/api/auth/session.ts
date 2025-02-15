import { auth } from "@/auth";
import NodeCache from "node-cache";
import { NextRequest, NextResponse } from "next/server";

// Cache session for 1 minute (60s)
const sessionCache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

export async function GET(req: NextRequest) {
  // Check cache
  const cachedSession = sessionCache.get("session");
  if (cachedSession) {
    return NextResponse.json(cachedSession);
  }

  // Fetch session
  const session = await auth();
  if (session) {
    sessionCache.set("session", session);
  }

  return NextResponse.json(session || null);
}
