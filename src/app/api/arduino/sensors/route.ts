import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { sensors } from "@/db/schema/sensors";
import { desc } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { visitors_val, claps_val, lums_val } = body;

    const result = await db
      .insert(sensors)
      .values({
        visitors_val,
        claps_val,
        lums_val,
      })
      .$returningId();

    return NextResponse.json({ message: result[0] });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to post sensor data" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const latest = await db
      .select()
      .from(sensors)
      .orderBy(desc(sensors.createdAt))
      .limit(1);

    if (latest.length === 0) {
      return NextResponse.json(
        { message: "No sensor data found" },
        { status: 404 }
      );
    }

    return NextResponse.json(latest[0]);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch sensor data" },
      { status: 500 }
    );
  }
}
