"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, Clock, List } from "lucide-react"
import { useRouter } from "next/navigation"

interface PlaylistItem {
  id: string
  title: string
  duration: string
  thumbnail: string
  index: number
}

interface PlaylistPanelProps {
  playlistId: string
  currentVideoId: string
}

interface RawVideoItem {
  id: string
  title: string
  duration?: string
  thumbnail?: string
}

export function PlaylistPanel({ playlistId, currentVideoId }: PlaylistPanelProps) {
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([])
  const [playlistTitle, setPlaylistTitle] = useState("Loading...")
  const [totalVideos, setTotalVideos] = useState(0)
  const router = useRouter()

useEffect(() => {
  const fetchPlaylistData = async () => {
    if (!playlistId) return

    try {
      setPlaylistTitle("Loading playlist...")

      const response = await fetch(`/api/youtube/playlist?playlistId=${playlistId}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setPlaylistTitle(data.title)

      const formattedVideos: PlaylistItem[] = data.videos.map((item: RawVideoItem, index: number) => ({
        id: item.id,
        title: item.title,
        duration: item.duration || "0:00",
        thumbnail: item.thumbnail || "/placeholder.svg",
        index: index + 1,
      }))

      setPlaylist(formattedVideos)
      setTotalVideos(formattedVideos.length)
    } catch (error) {
      console.error("Error fetching playlist:", error)

      const fallbackPlaylist: PlaylistItem[] = [
        {
          id: currentVideoId || "dQw4w9WgXcQ",
          title: "Current Video (Playlist unavailable)",
          duration: "0:00",
          thumbnail: "/placeholder.svg?height=90&width=160",
          index: 1,
        },
      ]

      setPlaylist(fallbackPlaylist)
      setPlaylistTitle("Playlist (Unable to load)")
      setTotalVideos(1)
    }
  }

  fetchPlaylistData()
}, [playlistId, currentVideoId])

  const handleVideoSelect = (videoId: string) => {
    router.push(`/watch?v=${videoId}&list=${playlistId}`)
  }

  const getCurrentVideoIndex = () => {
    return playlist.findIndex((item) => item.id === currentVideoId) + 1
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-blue-50">
        <div className="flex items-center space-x-2 mb-2">
          <List className="w-5 h-5 text-emerald-600" />
          <h3 className="font-semibold text-slate-800">Course Playlist</h3>
        </div>
        <h2 className="font-bold text-lg text-slate-800 mb-2 line-clamp-2">{playlistTitle}</h2>
        <div className="flex items-center space-x-4 text-sm text-slate-600">
          <span>
            {getCurrentVideoIndex()} / {totalVideos}
          </span>
          <span>•</span>
          <span>{totalVideos} videos</span>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {playlist.map((item) => (
            <div
              key={item.id}
              className={`flex items-start space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 mb-2 ${
                item.id === currentVideoId
                  ? "bg-gradient-to-r from-emerald-100 to-blue-100 border border-emerald-200"
                  : "hover:bg-slate-50"
              }`}
              onClick={() => handleVideoSelect(item.id)}
            >
              <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                {item.id === currentVideoId ? (
                  <div className="w-4 h-4 bg-emerald-600 rounded-full flex items-center justify-center">
                    <Play className="w-2 h-2 text-white fill-white" />
                  </div>
                ) : (
                  <span className="text-sm font-medium text-slate-500">{item.index}</span>
                )}
              </div>

              <div className="flex-shrink-0 relative">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-20 h-12 object-cover rounded bg-slate-200"
                />
                <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                  {item.duration}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h4
                  className={`font-medium text-sm line-clamp-2 mb-1 ${
                    item.id === currentVideoId ? "text-emerald-800" : "text-slate-800"
                  }`}
                >
                  {item.title}
                </h4>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>{item.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <Button
          className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
          onClick={() => {
            const nextVideo = playlist.find((item) => item.index === getCurrentVideoIndex() + 1)
            if (nextVideo) {
              handleVideoSelect(nextVideo.id)
            }
          }}
          disabled={getCurrentVideoIndex() >= totalVideos}
        >
          <Play className="w-4 h-4 mr-2" />
          {getCurrentVideoIndex() >= totalVideos ? "Course Complete" : "Next Video"}
        </Button>
      </div>
    </div>
  )
}
