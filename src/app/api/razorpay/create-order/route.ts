import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { message: "Payment integration coming soon" },
    { status: 200 }
  );
}
