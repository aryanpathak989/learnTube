"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Video, Music, FileText, Loader2 } from "lucide-react"

interface DownloadMenuProps {
  videoId: string
  videoTitle: string
  onClose: () => void
}

interface DownloadOption {
  quality: string
  format: string
  size: string
  icon:  React.ComponentType<React.SVGProps<SVGSVGElement>>
  type: "video" | "audio" | "subtitle"
}

export function DownloadMenu({ videoId, videoTitle, onClose }: DownloadMenuProps) {
  const [downloading, setDownloading] = useState<string | null>(null)

  const downloadOptions: DownloadOption[] = [
    { quality: "1080p", format: "MP4", size: "~150MB", icon: Video, type: "video" },
    { quality: "720p", format: "MP4", size: "~85MB", icon: Video, type: "video" },
    { quality: "480p", format: "MP4", size: "~45MB", icon: Video, type: "video" },
    { quality: "360p", format: "MP4", size: "~25MB", icon: Video, type: "video" },
    { quality: "Audio", format: "MP3", size: "~5MB", icon: Music, type: "audio" },
    { quality: "Subtitles", format: "SRT", size: "~5KB", icon: FileText, type: "subtitle" },
  ]

  const handleDownload = async (option: DownloadOption) => {
    const downloadKey = `${option.quality}-${option.format}`
    setDownloading(downloadKey)

    try {
      // Simulate download process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real implementation, you would:
      // 1. Call a backend API that uses youtube-dl or similar
      // 2. Get the actual download URL
      // 3. Trigger the download

      // For demo purposes, we'll create a mock download
      const mockDownloadUrl = `https://example.com/download/${videoId}/${option.quality}.${option.format.toLowerCase()}`

      // Create a temporary link and trigger download
      const link = document.createElement("a")
      link.href = mockDownloadUrl
      link.download = `${videoTitle.replace(/[^a-zA-Z0-9]/g, "_")}_${option.quality}.${option.format.toLowerCase()}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      onClose()
    } catch (error) {
      console.error("Download failed:", error)
      alert("Download failed. Please try again.")
    } finally {
      setDownloading(null)
    }
  }

  const getQualityColor = (type: string) => {
    switch (type) {
      case "video":
        return "text-blue-600"
      case "audio":
        return "text-green-600"
      case "subtitle":
        return "text-purple-600"
      default:
        return "text-slate-600"
    }
  }

  return (
    <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-slate-200 z-50">
      <div className="p-4">
        <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Download Options
        </h3>

        <div className="space-y-2">
          {downloadOptions.map((option) => {
            const downloadKey = `${option.quality}-${option.format}`
            const isDownloading = downloading === downloadKey
            const IconComponent = option.icon

            return (
              <Button
                key={downloadKey}
                variant="outline"
                className="w-full flex items-center justify-between h-12 px-3 bg-transparent"
                onClick={() => handleDownload(option)}
                disabled={isDownloading}
              >
                <div className="flex items-center space-x-3">
                  <IconComponent className={`w-4 h-4 ${getQualityColor(option.type)}`} />
                  <div className="text-left">
                    <div className="font-medium text-sm">{option.quality}</div>
                    <div className="text-xs text-slate-500">{option.format}</div>
                  </div>
                </div>
                <div className="text-right">
                  {isDownloading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                  ) : (
                    <span className="text-xs text-slate-500">{option.size}</span>
                  )}
                </div>
              </Button>
            )
          })}
        </div>

        <div className="mt-4 p-3 bg-slate-50 rounded-lg">
          <p className="text-xs text-slate-600">
            <strong>Note:</strong> Downloads are for educational purposes only. Please respect copyright and YouTube&apos;s
            terms of service.
          </p>
        </div>
      </div>

      {/* Close overlay */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
    </div>
  )
}
