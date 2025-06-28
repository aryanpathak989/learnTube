"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play } from "lucide-react"

interface VideoInputProps {
  onVideoSubmit: (videoId: string, title: string) => void
}

export function VideoInput({ onVideoSubmit }: VideoInputProps) {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    setIsLoading(true)
    const videoId = extractVideoId(url)

    if (videoId) {
      // Simulate fetching video title (in a real app, you'd use YouTube API)
      const title = `Video: ${videoId}`
      onVideoSubmit(videoId, title)
      setUrl("")
    } else {
      alert("Please enter a valid YouTube URL")
    }
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 max-w-2xl">
      <Input
        type="url"
        placeholder="Paste YouTube video URL here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" disabled={isLoading || !url.trim()}>
        <Play className="w-4 h-4 mr-2" />
        {isLoading ? "Loading..." : "Play Video"}
      </Button>
    </form>
  )
}
