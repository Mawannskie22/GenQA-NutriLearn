import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://localhost:8000";
const API_KEY = process.env.API_KEY || "";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (API_KEY) headers["X-API-Key"] = API_KEY;

    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
