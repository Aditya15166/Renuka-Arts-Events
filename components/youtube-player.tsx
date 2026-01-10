"use client"

import { useRef } from "react"

interface YouTubePlayerProps {
  videoId: string
  autoplay?: boolean
  muted?: boolean
  className?: string
}

export default function YouTubePlayer({ videoId, autoplay = true, muted = true, className = "" }: YouTubePlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const getYouTubeEmbedUrl = (id: string) => {
    const params = new URLSearchParams({
      autoplay: autoplay ? "1" : "0",
      mute: muted ? "1" : "0",
      controls: "1",
      rel: "0",
      modestbranding: "1",
      fs: "1",
      cc_load_policy: "0",
      iv_load_policy: "3",
    })

    return `https://www.youtube.com/embed/${id}?${params.toString()}`
  }

  return (
    <div className={`relative w-full ${className}`}>
      <iframe
        ref={iframeRef}
        src={getYouTubeEmbedUrl(videoId)}
        title="YouTube video player"
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ border: "none" }}
      />
    </div>
  )
}
