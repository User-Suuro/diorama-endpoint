import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /api/send-sensor-data failed:", err);
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
