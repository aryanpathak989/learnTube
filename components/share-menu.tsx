"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Facebook, Twitter, Mail, MessageCircle, Check } from "lucide-react"

interface ShareMenuProps {
  videoId: string
  videoTitle: string
  onClose: () => void
}

export function ShareMenu({ videoId, videoTitle, onClose }: ShareMenuProps) {
  const [copied, setCopied] = useState(false)
  const videoUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/watch?v=${videoId}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(videoUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  const shareOptions = [
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`,
      color: "text-blue-600",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(videoUrl)}&text=${encodeURIComponent(videoTitle)}`,
      color: "text-sky-500",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodeURIComponent(`${videoTitle} ${videoUrl}`)}`,
      color: "text-green-600",
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(videoTitle)}&body=${encodeURIComponent(`Check out this educational video: ${videoUrl}`)}`,
      color: "text-slate-600",
    },
  ]

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-slate-200 z-50">
      <div className="p-4">
        <h3 className="font-semibold text-slate-800 mb-4">Share this video</h3>

        {/* Copy Link */}
        <div className="mb-4">
          <div className="flex space-x-2">
            <Input value={videoUrl} readOnly className="flex-1 text-sm" />
            <Button onClick={handleCopyLink} variant="outline" className="px-3 bg-transparent">
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
          {copied && <p className="text-sm text-green-600 mt-1">Link copied to clipboard!</p>}
        </div>

        {/* Social Share Options */}
        <div className="grid grid-cols-2 gap-2">
          {shareOptions.map((option) => (
            <Button
              key={option.name}
              variant="outline"
              className="flex items-center space-x-2 justify-start h-12 bg-transparent"
              onClick={() => {
                window.open(option.url, "_blank", "width=600,height=400")
                onClose()
              }}
            >
              <option.icon className={`w-5 h-5 ${option.color}`} />
              <span>{option.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Close overlay */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
    </div>
  )
}
