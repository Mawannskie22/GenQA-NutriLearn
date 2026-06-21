import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });

    return Response.json({
      reply: response.text,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Gagal mendapatkan respon AI" },
      { status: 500 }
    );
  }
}