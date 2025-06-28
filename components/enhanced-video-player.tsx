"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Share, Download, MoreHorizontal, Shield } from "lucide-react"
import { ShareMenu } from "@/components/share-menu"
import { DownloadMenu } from "@/components/download-menu"

interface EnhancedVideoPlayerProps {
  videoId: string
  playlistId?: string | null
}

interface VideoData {
  title: string
  channelTitle: string
  viewCount: string
  publishedAt: string
  description: string
  thumbnailUrl: string
  likeCount?: string
  duration?: string
}

export function EnhancedVideoPlayer({ videoId, playlistId }: EnhancedVideoPlayerProps) {
  const [videoData, setVideoData] = useState<VideoData>({
    title: "Loading...",
    channelTitle: "Loading...",
    viewCount: "0",
    publishedAt: "Loading...",
    description: "",
    thumbnailUrl: "",
  })
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [showDownloadMenu, setShowDownloadMenu] = useState(false)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  useEffect(() => {
    const fetchVideoData = async () => {
      if (!videoId) return

      try {
        const response = await fetch(`/api/youtube/video?videoId=${videoId}`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        setVideoData({
          title: data.title,
          channelTitle: data.channelTitle,
          viewCount: data.viewCount,
          publishedAt: data.publishedAt,
          description: data.description,
          thumbnailUrl: data.thumbnailUrl,
          likeCount: data.likeCount,
          duration: data.duration,
        })
      } catch (error) {
        console.error("Error fetching video data:", error)

        // Keep fallback data
        setVideoData({
          title: `Educational Video - ${videoId}`,
          channelTitle: "Educational Channel",
          viewCount: "Loading...",
          publishedAt: "Loading...",
          description: "Unable to load video details",
          thumbnailUrl: "/placeholder.svg?height=180&width=320",
        })
      }
    }

    fetchVideoData()
  }, [videoId])

  const getAdFreeUrl = (videoId: string) => {
    const baseUrl = "https://www.youtube.com/embed/"
    const params = new URLSearchParams({
      autoplay: "0",
      rel: "0",
      modestbranding: "1",
      iv_load_policy: "3",
      cc_load_policy: "0",
      disablekb: "0",
      fs: "1",
      playsinline: "1",
      showinfo: "0",
      autohide: "1",
      controls: "1",
      enablejsapi: "1",
      origin: typeof window !== "undefined" ? window.location.origin : "",
      privacy_mode: "1",
    })

    if (playlistId) {
      params.append("list", playlistId)
    }

    return `${baseUrl}${videoId}?${params.toString()}`
  }

  const formatViewCount = (count: string) => {
    const num = Number.parseInt(count.replace(/,/g, ""))
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M views`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K views`
    }
    return `${count} views`
  }

  const handleLike = () => {
    setLiked(!liked)
    if (disliked) setDisliked(false)
  }

  const handleDislike = () => {
    setDisliked(!disliked)
    if (liked) setLiked(false)
  }

  return (
    <div className="w-full">
      {/* Ad-Free Status Indicator */}
      <div className="mb-2 px-4 lg:px-6">
        <div className="flex items-center space-x-2 text-sm">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span className="text-emerald-600 font-medium">Ad-Free Learning Mode</span>
          <span className="text-slate-500">• Optimized for Education</span>
        </div>
      </div>

      {/* Video Player */}
      <div className="relative w-full">
        <div className="aspect-video bg-black">
          <iframe
            width="100%"
            height="100%"
            src={getAdFreeUrl(videoId)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
            referrerPolicy="no-referrer"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Video Info */}
      <div className="p-4 lg:p-6">
        {/* Title */}
        <h1 className="text-xl lg:text-2xl font-semibold text-slate-800 mb-3 line-clamp-2">{videoData.title}</h1>

        {/* Video Stats and Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
          <div className="flex items-center text-sm text-slate-600 mb-3 lg:mb-0">
            <span>{formatViewCount(videoData.viewCount)}</span>
            <span className="mx-2">•</span>
            <span>{videoData.publishedAt}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 overflow-x-auto">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center space-x-2 whitespace-nowrap ${liked ? "bg-emerald-50 text-emerald-700" : ""}`}
              onClick={handleLike}
            >
              <ThumbsUp className={`w-4 h-4 ${liked ? "fill-emerald-600" : ""}`} />
              <span className="hidden sm:inline">{videoData.likeCount || "Like"}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center space-x-2 whitespace-nowrap ${disliked ? "bg-red-50 text-red-700" : ""}`}
              onClick={handleDislike}
            >
              <ThumbsDown className={`w-4 h-4 ${disliked ? "fill-red-600" : ""}`} />
              <span className="hidden sm:inline">Dislike</span>
            </Button>
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 whitespace-nowrap"
                onClick={() => setShowShareMenu(!showShareMenu)}
              >
                <Share className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
              {showShareMenu && (
                <ShareMenu videoId={videoId} videoTitle={videoData.title} onClose={() => setShowShareMenu(false)} />
              )}
            </div>
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 whitespace-nowrap"
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
              </Button>
              {showDownloadMenu && (
                <DownloadMenu
                  videoId={videoId}
                  videoTitle={videoData.title}
                  onClose={() => setShowDownloadMenu(false)}
                />
              )}
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Channel Info */}
        <div className="flex items-center space-x-3 border-t border-slate-200 pt-4">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">{videoData.channelTitle.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800">{videoData.channelTitle}</h3>
            <p className="text-sm text-slate-600">Educational Content Creator</p>
          </div>
        </div>

        {/* Enhanced Learning Features */}
        <div className="mt-4 space-y-3">
          {/* Ad-Free Notice */}
          <div className="p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-200">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              <div>
                <h4 className="font-semibold text-emerald-900">Distraction-Free Learning</h4>
                <p className="text-sm text-emerald-700">
                  All advertisements and distractions removed for optimal focus and learning.
                </p>
              </div>
            </div>
          </div>

          {/* AI Learning Notice */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">AI</span>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">Smart Learning Assistant</h4>
                <p className="text-sm text-slate-600">
                  Get instant help and explanations {playlistId ? "in the AI tab" : "in the chat panel"}
                  {typeof window !== "undefined" && window.innerWidth >= 1024 && !playlistId ? " on the right" : ""}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
