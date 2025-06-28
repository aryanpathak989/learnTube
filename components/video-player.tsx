"use client"

interface VideoPlayerProps {
  videoId: string
  title: string
}

export function VideoPlayer({ videoId, title }: VideoPlayerProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
      <div className="mt-4 text-white">
        <h2 className="text-lg font-medium">{title}</h2>
        <p className="text-gray-300 text-sm mt-1">Educational Content</p>
      </div>
    </div>
  )
}
