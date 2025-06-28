"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Bot, BookOpen, Users, GraduationCap, Brain, Target } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const [url, setUrl] = useState("")
  const router = useRouter()

  const extractVideoInfo = (url: string) => {
    // Single video patterns
    const videoPatterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ]

    // Playlist patterns
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

  const handleStartLearning = () => {
    if (!url.trim()) return

    const { videoId, playlistId } = extractVideoInfo(url)

    if (videoId || playlistId) {
      let watchUrl = "/watch?"
      if (videoId) watchUrl += `v=${videoId}`
      if (playlistId) watchUrl += `${videoId ? "&" : ""}list=${playlistId}`
      router.push(watchUrl)
    } else {
      alert("Please enter a valid YouTube URL")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  LearnTube
                </h1>
                <p className="text-xs text-slate-600">Smart Learning Platform</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="hidden sm:flex border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-2xl">
              <Brain className="w-12 h-12 text-emerald-600" />
            </div>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-slate-800 mb-6">
            Transform YouTube Videos into{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Interactive Learning
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Experience focused, distraction-free learning with AI-powered assistance. Turn any educational video into an
            interactive study session.
          </p>

          {/* URL Input */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl shadow-xl border border-emerald-200">
              <Input
                type="url"
                placeholder="Paste YouTube video or playlist URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 border-0 text-lg h-14 focus-visible:ring-0 focus-visible:ring-emerald-500"
              />
              <Button
                onClick={handleStartLearning}
                disabled={!url.trim()}
                className="h-14 px-8 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold rounded-xl"
              >
                <Play className="w-5 h-5 mr-2 fill-white" />
                Start Learning
              </Button>
            </div>
            <p className="text-sm text-slate-500 mt-3">
              Works with individual videos and complete playlists for structured learning
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-emerald-50">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">AI Study Assistant</h3>
              <p className="text-slate-600">
                Get instant explanations, ask questions, and dive deeper into any topic with intelligent tutoring.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Playlist Learning</h3>
              <p className="text-slate-600">
                Learn from complete courses and playlists with organized, sequential content delivery.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-indigo-50">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Focused Experience</h3>
              <p className="text-slate-600">
                Ad-free, distraction-free environment designed specifically for effective learning.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Learning Benefits */}
        <div className="text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-800 mb-8">Perfect for Every Learner</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="w-6 h-6 text-emerald-600" />
                </div>
                <p className="font-medium text-slate-700">Students</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium text-slate-700">Professionals</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-indigo-600" />
                </div>
                <p className="font-medium text-slate-700">Researchers</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <p className="font-medium text-slate-700">Lifelong Learners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">LearnTube</span>
            </div>
            <p className="text-slate-400 mb-4">Empowering learners worldwide with intelligent video education</p>
            <p className="text-sm text-slate-500">© 2024 LearnTube. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
