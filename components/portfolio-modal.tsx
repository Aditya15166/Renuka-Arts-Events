"use client"

import type React from "react"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import type { PortfolioItem } from "@/lib/portfolio-data"
import YouTubePlayer from "@/components/youtube-player"

interface PortfolioModalProps {
  item: PortfolioItem | null
  onClose: () => void
  onNext?: () => void
  onPrev?: () => void
  showNavigation?: boolean
}

export default function PortfolioModal({ item, onClose, onNext, onPrev, showNavigation = false }: PortfolioModalProps) {
  const [imageError, setImageError] = useState(false)
  const [videoError, setVideoError] = useState(false)

  if (!item) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const handleVideoError = () => {
    setVideoError(true)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={handleBackdropClick}>
      <div className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation Buttons */}
        {showNavigation && onPrev && (
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {showNavigation && onNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Content */}
        <div className="bg-black/80 backdrop-blur-md rounded-lg overflow-hidden">
          {/* Media Content */}
          <div className="relative">
            {item.youtubeId ? (
              /* YouTube Video */
              <div className="w-full" style={{ aspectRatio: "16/9" }}>
                <YouTubePlayer videoId={item.youtubeId} autoplay={true} muted={true} className="h-full" />
              </div>
            ) : item.video && !videoError ? (
              /* Regular Video */
              <video controls className="w-full max-h-[70vh] object-contain" onError={handleVideoError}>
                <source src={item.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : item.image && !imageError ? (
              /* Image */
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full max-h-[70vh] object-contain"
                onError={handleImageError}
              />
            ) : (
              /* Fallback */
              <div className="w-full h-96 bg-gray-800 flex items-center justify-center">
                <span className="text-gray-400 text-lg">Media not available</span>
              </div>
            )}

            {/* Category Badge - Only show for non-YouTube content to avoid overlap */}
            {!item.youtubeId && (
              <div className="absolute bottom-4 left-4">
                <span className="inline-block bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
                  {item.category}
                </span>
              </div>
            )}
          </div>

          {/* Category info for YouTube videos */}
          {item.youtubeId && (
            <div className="p-4">
              <span className="inline-block bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
                {item.category}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
