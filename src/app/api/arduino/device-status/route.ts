import { db } from "@/db/drizzle";
import { deviceStatus } from "@/db/schema/device_status";
import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { switch_01, switch_02, switch_03, switch_04 } = body;

    // ✅ Validate input
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

    // ✅ Fetch latest record
    const [lastRecord] = await db
      .select()
      .from(deviceStatus)
      .orderBy(desc(deviceStatus.updatedAt))
      .limit(1);

    const visitors_val = lastRecord?.visitors_val ?? 0;
    const claps_val = lastRecord?.claps_val ?? 0;
    const lums_val = lastRecord?.lums_val ?? 0;

    // ✅ Update id = 1, with timestamp
    const [result] = await db
      .update(deviceStatus)
      .set({
        switch_01,
        switch_02,
        switch_03,
        switch_04,
        visitors_val,
        claps_val,
        lums_val,
        is_arduino: true,
        updatedAt: new Date(),
      })
      .where(eq(deviceStatus.id, 1))
      .execute(); // 🔥 gives you MySqlRawQueryResult

    // ✅ Check affected rows
    if (Number(result.affectedRows ?? 0) === 0) {
      return NextResponse.json(
        { error: "Record with id = 1 not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /device-status error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const records = await db
      .select()
      .from(deviceStatus)
      .orderBy(desc(deviceStatus.updatedAt))
      .limit(1);

    if (records.length === 0) {
      return NextResponse.json(
        { message: "No records found" },
        { status: 404 }
      );
    }

    return NextResponse.json(records[0]);
  } catch (error) {
    console.error("GET /device-status error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
