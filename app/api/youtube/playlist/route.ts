import { NextResponse } from 'next/server'
import { GetPlaylistData } from 'youtube-search-api'

interface PlaylistItem {
  id: string
  title: string
  length?: string
  thumbnail?: {
    thumbnails?: {
      url: string
    }[]
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const playlistId = searchParams.get("playlistId")

  if (!playlistId) {
    return NextResponse.json({ error: "Missing playlistId" }, { status: 400 })
  }

  try {
    const data = await GetPlaylistData(playlistId, 50)
    const videos = data.items.map((item: PlaylistItem, index: number) => ({
      id: item.id,
      title: item.title,
      duration: item.length || "0:00",
      thumbnail: item.thumbnail?.thumbnails?.[0]?.url || "/placeholder.svg",
      index: index + 1,
    }))

    return NextResponse.json({
      title: data.metadata?.title || "Untitled Playlist",
      videos,
    })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
