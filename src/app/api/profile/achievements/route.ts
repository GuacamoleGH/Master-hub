import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    achievements: [],
    totalUnlocked: 0,
    totalAvailable: 0,
    completionRate: 0,
    totalXpEarned: 0,
  });
}
