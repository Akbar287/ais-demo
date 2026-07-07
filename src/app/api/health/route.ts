import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    service: "siakad-frontend-bff",
    status: "ok",
  });
}
