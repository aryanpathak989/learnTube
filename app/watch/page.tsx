"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useState, useEffect } from "react"
import { EnhancedVideoPlayer } from "@/components/enhanced-video-player"
import { AIChatbot } from "@/components/ai-chatbot"
import { PlaylistPanel } from "@/components/playlist-panel"
import { YouTubeHeader } from "@/components/youtube-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bot, List } from "lucide-react"

function WatchPageContent() {
  const searchParams = useSearchParams()
  const videoId = searchParams.get("v")
  const playlistId = searchParams.get("list")
  const [activeTab, setActiveTab] = useState("ai")

  useEffect(() => {
    if (playlistId) {
      setActiveTab("playlist")
    }
  }, [playlistId])

  if (!videoId && !playlistId) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">No video specified</h1>
          <p className="text-slate-600">Please provide a valid YouTube video or playlist URL.</p>
        </div>
      </div>
    )
  }

  const showTabs = !!playlistId

  return (
    <div className="min-h-screen bg-white">
      <YouTubeHeader />

      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Main Content */}
        <div className="flex-1 bg-white">
          <EnhancedVideoPlayer videoId={videoId || ""} playlistId={playlistId} />
        </div>

        {/* Sidebar */}
        <div className="w-96 border-l border-slate-200 bg-slate-50">
          {showTabs ? (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <TabsList className="grid w-full grid-cols-2 bg-white border-b border-slate-200 rounded-none">
                <TabsTrigger value="playlist" className="flex items-center space-x-2">
                  <List className="w-4 h-4" />
                  <span>Playlist</span>
                </TabsTrigger>
                <TabsTrigger value="ai" className="flex items-center space-x-2">
                  <Bot className="w-4 h-4" />
                  <span>AI Assistant</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="playlist" className="h-[calc(100vh-64px-48px)] m-0">
                <PlaylistPanel playlistId={playlistId || ""} currentVideoId={videoId || ""} />
              </TabsContent>
              <TabsContent value="ai" className="h-[calc(100vh-64px-48px)] m-0">
                <AIChatbot videoId={videoId || ""} />
              </TabsContent>
            </Tabs>
          ) : (
            <AIChatbot videoId={videoId || ""} />
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <EnhancedVideoPlayer videoId={videoId || ""} playlistId={playlistId} />
        <div className="border-t border-slate-200">
          {showTabs ? (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 bg-white border-b border-slate-200 rounded-none">
                <TabsTrigger value="playlist" className="flex items-center space-x-2">
                  <List className="w-4 h-4" />
                  <span>Playlist</span>
                </TabsTrigger>
                <TabsTrigger value="ai" className="flex items-center space-x-2">
                  <Bot className="w-4 h-4" />
                  <span>AI Assistant</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="playlist" className="min-h-[400px]">
                <PlaylistPanel playlistId={playlistId || ""} currentVideoId={videoId || ""} />
              </TabsContent>
              <TabsContent value="ai" className="min-h-[400px]">
                <AIChatbot videoId={videoId || ""} />
              </TabsContent>
            </Tabs>
          ) : (
            <AIChatbot videoId={videoId || ""} />
          )}
        </div>
      </div>
    </div>
  )
}

export default function WatchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        </div>
      }
    >
      <WatchPageContent />
    </Suspense>
  )
}
