import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { controllers } from "@/db/schema/controllers";
import { desc } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      front_switch,
      back_switch,
      left_switch,
      inside_switch,
      is_arduino,
    } = body;

    const result = await db
      .insert(controllers)
      .values({
        front_switch,
        back_switch,
        left_switch,
        inside_switch,
        is_arduino,
      })
      .$returningId();

    return NextResponse.json({ message: result[0] });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update controls" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const latest = await db
      .select()
      .from(controllers)
      .orderBy(desc(controllers.createdAt))
      .limit(1);

    if (latest.length === 0) {
      return NextResponse.json(
        { message: "No control data found" },
        { status: 404 }
      );
    }

    return NextResponse.json(latest[0]);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch controls" },
      { status: 500 }
    );
  }
}
