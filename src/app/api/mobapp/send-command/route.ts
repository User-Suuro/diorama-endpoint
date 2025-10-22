import { db } from "@/db/drizzle";
import { deviceStatus } from "@/db/schema/device_status";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { switch_01, switch_02, switch_03, switch_04 } = body;

    // 🧭 Validate switch data
    if (
      typeof switch_01 !== "boolean" ||
      typeof switch_02 !== "boolean" ||
      typeof switch_03 !== "boolean" ||
      typeof switch_04 !== "boolean"
    ) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    // Fetch latest device status (most recent entry)
    const [lastRecord] = await db
      .select()
      .from(deviceStatus)
      .orderBy(desc(deviceStatus.createdAt))
      .limit(1);

    // Use previous values if they exist, else 0
    const visitors_val = lastRecord?.visitors_val ?? 0;
    const claps_val = lastRecord?.claps_val ?? 0;
    const lums_val = lastRecord?.lums_val ?? 0;
    const is_arduino = false;

    // Insert new record
    const [inserted] = await db
      .insert(deviceStatus)
      .values({
        switch_01,
        switch_02,
        switch_03,
        switch_04,
        visitors_val,
        claps_val,
        lums_val,
        is_arduino,
      })
      .$returningId();

    return NextResponse.json(
      { success: true, id: inserted.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /device-status error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
