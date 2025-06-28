import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export const runtime = "edge"

export async function POST(req: Request) {
  const { messages } = await req.json()

  // your logic...
  return new Response("Hello from POST", { status: 200 });

}
