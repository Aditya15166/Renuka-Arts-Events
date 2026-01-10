"use client"

import { useState } from "react"
import type { PortfolioItem } from "@/lib/portfolio-data"

interface PortfolioMediaProps {
  item: PortfolioItem
  onClick: () => void
  className?: string
}

export default function PortfolioMedia({ item, onClick, className = "" }: PortfolioMediaProps) {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const getYouTubeThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }

  return (
    <div className={`group cursor-pointer ${className}`} onClick={onClick}>
      <div className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-500 hover:scale-105">
        {/* YouTube Video Content */}
        {item.youtubeId ? (
          <div className="relative">
            <img
              src={getYouTubeThumbnail(item.youtubeId) || "/placeholder.svg"}
              alt={item.title}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              onError={handleImageError}
            />
            {/* Video Play Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600/80 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        ) : item.video ? (
          /* Regular Video Content */
          <div className="relative">
            {item.thumbnail && !imageError ? (
              <img
                src={item.thumbnail || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
                <span className="text-gray-400">Video Thumbnail</span>
              </div>
            )}
            {/* Video Play Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        ) : item.image && !imageError ? (
          /* Image Content */
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            onError={handleImageError}
          />
        ) : (
          /* Fallback Content */
          <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
            <span className="text-gray-400">{item.title}</span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center text-white">
            <span className="text-lg font-medium block">Click to View</span>
            <span className="text-sm text-gray-300 mt-1">{item.category}</span>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-white text-xs font-medium">{item.category}</span>
        </div>
      </div>
    </div>
  )
}
