import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse("API_CONNECTED", {
    headers: { "Content-Type": "text/plain" },
  });
}
