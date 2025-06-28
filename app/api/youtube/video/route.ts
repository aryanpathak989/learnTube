import { type NextRequest, NextResponse } from "next/server"
import { getVideoInfo } from "@/lib/youtube-parser"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const videoId = searchParams.get("videoId")

  if (!videoId) {
    return NextResponse.json({ error: "Video ID is required" }, { status: 400 })
  }

  try {
    const videoData = await getVideoInfo(videoId)
    return NextResponse.json(videoData)
  } catch (error) {
    console.error("Video fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch video data" }, { status: 500 })
  }
}