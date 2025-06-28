"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Share, Download, MoreHorizontal } from "lucide-react"

interface YouTubePlayerProps {
  videoId: string
}

export function YouTubePlayer({ videoId }: YouTubePlayerProps) {
  const [videoData] = useState({
    title: "Educational Video",
    views: "1.2M views",
    uploadDate: "2 days ago",
    channel: "Educational Channel",
    subscribers: "500K subscribers",
  })

  return (
    <div className="w-full">
      {/* Video Player */}
      <div className="relative w-full">
        <div className="aspect-video bg-black">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&disablekb=0&fs=1&playsinline=1&start=0&end=0&loop=0&controls=1&showinfo=0&autohide=1&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
            sandbox="allow-scripts allow-same-origin allow-presentation"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Video Info */}
      <div className="p-4 lg:p-6">
        {/* Title */}
        <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2 line-clamp-2">{videoData.title}</h1>

        {/* Video Stats and Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
          <div className="flex items-center text-sm text-gray-600 mb-3 lg:mb-0">
            <span>{videoData.views}</span>
            <span className="mx-2">•</span>
            <span>{videoData.uploadDate}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 overflow-x-auto">
            <Button variant="ghost" size="sm" className="flex items-center space-x-2 whitespace-nowrap">
              <ThumbsUp className="w-4 h-4" />
              <span className="hidden sm:inline">Like</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center space-x-2 whitespace-nowrap">
              <ThumbsDown className="w-4 h-4" />
              <span className="hidden sm:inline">Dislike</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center space-x-2 whitespace-nowrap">
              <Share className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center space-x-2 whitespace-nowrap">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Channel Info */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">EC</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{videoData.channel}</h3>
              <p className="text-sm text-gray-600">{videoData.subscribers}</p>
            </div>
          </div>
          <Button className="bg-red-600 hover:bg-red-700 text-white">Subscribe</Button>
        </div>

        {/* AI Learning Notice */}
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">AI Study Assistant Active</h4>
              <p className="text-sm text-gray-600">
                Ask questions about this video content in the chat panel{" "}
                {window.innerWidth >= 1024 ? "on the right" : "below"}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
