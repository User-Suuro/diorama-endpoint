import { db } from "@/db/drizzle";
import { deviceStatus } from "@/db/schema/device_status";
import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      switch_01,
      switch_02,
      switch_03,
      switch_04,
      visitors_val,
      claps_val,
      lums_val,
    } = body;

    // Simple validation
    if (
      typeof switch_01 !== "boolean" ||
      typeof switch_02 !== "boolean" ||
      typeof switch_03 !== "boolean" ||
      typeof switch_04 !== "boolean" ||
      typeof visitors_val !== "number" ||
      typeof claps_val !== "number" ||
      typeof lums_val !== "number"
    ) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

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

// Optimized GET
export async function GET() {
  try {
    const [record] = await db
      .select({
        s1: deviceStatus.switch_01,
        s2: deviceStatus.switch_02,
        s3: deviceStatus.switch_03,
        s4: deviceStatus.switch_04,
      })
      .from(deviceStatus)
      .orderBy(desc(deviceStatus.createdAt))
      .limit(1);

    if (!record) {
      return NextResponse.json({ msg: "no" }, { status: 404 });
    }

    // Compact JSON
    return new NextResponse(JSON.stringify(record), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GET /device-status error:", error);
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
