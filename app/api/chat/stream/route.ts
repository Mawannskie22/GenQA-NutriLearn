import { NextRequest } from "next/server";

const API_URL = process.env.API_URL || "http://localhost:8000";
const API_KEY = process.env.API_KEY || "";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (API_KEY) headers["X-API-Key"] = API_KEY;

  const response = await fetch(`${API_URL}/chat/stream`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  return new Response(response.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
