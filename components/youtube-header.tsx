"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, GraduationCap } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function YouTubeHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const extractVideoInfo = (url: string) => {
    const videoPatterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ]

    const playlistPatterns = [/[?&]list=([^&\n?#]+)/, /youtube\.com\/playlist\?list=([^&\n?#]+)/]

    let videoId: string | null = null
    let playlistId: string | null = null

    for (const pattern of videoPatterns) {
      const match = url.match(pattern)
      if (match) videoId = match[1]
    }

    for (const pattern of playlistPatterns) {
      const match = url.match(pattern)
      if (match) playlistId = match[1]
    }

    return { videoId, playlistId }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    // Check if it's a YouTube URL
    const { videoId, playlistId } = extractVideoInfo(searchQuery)

    if (videoId || playlistId) {
      let watchUrl = "/watch?"
      if (videoId) watchUrl += `v=${videoId}`
      if (playlistId) watchUrl += `${videoId ? "&" : ""}list=${playlistId}`
      router.push(watchUrl)
      setSearchQuery("")
    } else {
      // For now, just show an alert. In a real app, you'd implement YouTube search API
      alert("Please enter a valid YouTube URL. Search functionality coming soon!")
    }
  }

  return (
    <header className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="lg:hidden">
            <Menu className="w-5 h-5" />
          </Button>
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-xl hidden sm:block text-slate-800">LearnTube</span>
          </Link>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-2xl mx-4 hidden md:block">
          <form onSubmit={handleSearch} className="flex">
            <Input
              placeholder="Search or paste YouTube URL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-emerald-500 border-slate-300"
            />
            <Button
              type="submit"
              variant="outline"
              className="rounded-l-none border-l-0 px-6 border-slate-300 hover:bg-emerald-50 bg-transparent"
            >
              <Search className="w-4 h-4" />
            </Button>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="md:hidden">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
