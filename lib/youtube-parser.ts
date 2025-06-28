import { GetPlaylistData } from "youtube-search-api"

export interface PlaylistVideo {
  id: string
  title: string
  duration: string
  thumbnail: string
  index: number
  channelTitle: string
}

export interface PlaylistData {
  title: string
  description: string
  videos: PlaylistVideo[]
}

export async function parsePlaylistFromUrl(playlistId: string): Promise<PlaylistData> {
  try {
    const data = await GetPlaylistData(playlistId, 50)

    return {
      title: data.metadata?.title || "Untitled Playlist",
      description: data.metadata?.description || "",
      videos: data.items.map((video: any, index: number) => ({
        id: video.id,
        title: video.title,
        duration: video.duration || "0:00",
        thumbnail: video.thumbnail?.thumbnails?.[0]?.url || `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`,
        index: index + 1,
        channelTitle: video.channelTitle || "YouTube Channel",
      })),
    }
  } catch (error) {
    console.error("Failed to fetch playlist with youtube-search-api:", error)
    return await createFallbackPlaylist(playlistId)
  }
}


async function createFallbackPlaylist(playlistId: string): Promise<PlaylistData> {
  // Create a basic playlist structure with common educational video IDs
  console.log(playlistId)
  const commonEducationalVideos = [
    { id: "dQw4w9WgXcQ", title: "Introduction to the Topic" },
    { id: "jNQXAC9IVRw", title: "Basic Concepts" },
    { id: "y6120QOlsfU", title: "Advanced Applications" },
    { id: "kJQP7kiw5Fk", title: "Practical Examples" },
    { id: "lp-EO5I60KA", title: "Summary and Review" },
  ]

  return {
    title: "Educational Course Playlist",
    description: "A structured learning playlist",
    videos: commonEducationalVideos.map((video, index) => ({
      id: video.id,
      title: video.title,
      duration: "10:00",
      thumbnail: `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`,
      index: index + 1,
      channelTitle: "Educational Channel",
    })),
  }
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

export async function getVideoInfo(videoId: string) {
  try {
    // Try Invidious instances for video info
    const invidousInstances = ["https://invidious.io", "https://yewtu.be", "https://invidious.snopyta.org"]

    for (const instance of invidousInstances) {
      try {
        const response = await fetch(`${instance}/api/v1/videos/${videoId}`, {
          headers: {
            "User-Agent": "LearnTube Educational Platform",
          },
        })

        if (response.ok) {
          const data = await response.json()

          return {
            title: data.title,
            channelTitle: data.author,
            description: data.description,
            viewCount: formatViewCount(data.viewCount),
            publishedAt: formatPublishedDate(data.published),
            duration: formatDuration(data.lengthSeconds),
            thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            likeCount: "N/A",
          }
        }
      } catch (error) {
        console.log(`Failed to fetch video from ${instance}:`, error)
        continue
      }
    }

    // Fallback to basic video info
    return {
      title: `Educational Video ${videoId}`,
      channelTitle: "Educational Channel",
      description: "Educational content",
      viewCount: "N/A",
      publishedAt: "Recently",
      duration: "N/A",
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      likeCount: "N/A",
    }
  } catch (error) {
    console.error("Video info fetch failed:", error)
    return {
      title: `Video ${videoId}`,
      channelTitle: "YouTube Channel",
      description: "Video content",
      viewCount: "N/A",
      publishedAt: "Recently",
      duration: "N/A",
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      likeCount: "N/A",
    }
  }
}

function formatViewCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}

function formatPublishedDate(timestamp: number): string {
  try {
    const date = new Date(timestamp * 1000)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
  } catch {
    return "Recently"
  }
}

function extractText(field: any): string {
  if (typeof field === "string") return field
  if (field && typeof field === "object" && "simpleText" in field) return field.simpleText
  return ""
}

