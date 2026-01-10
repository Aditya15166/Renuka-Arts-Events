"use client"

import type React from "react"

import { useEffect } from "react" // Import useEffect
import { X } from "lucide-react"
import type { Review } from "@/types/review"
import StarRating from "./star-rating"

interface ReviewsModalProps {
  reviews: Review[]
  isOpen: boolean
  onClose: () => void
}

export default function ReviewsModal({ reviews, isOpen, onClose }: ReviewsModalProps) {
  // Effect to control body scroll when modal is open/closed
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden" // Prevent body scroll
    } else {
      document.body.style.overflow = "" // Restore body scroll
    }
    // Cleanup function to ensure scroll is restored if component unmounts
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 pt-[80px] sm:pt-4" // Increased z-index and added more top padding for mobile
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-6xl w-full max-h-[calc(100vh-100px)] sm:max-h-[90vh] overflow-hidden bg-black/90 backdrop-blur-md border border-white/20 rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
          <h2 className="text-xl sm:text-2xl font-bold text-white">All Customer Reviews ({reviews.length})</h2>
          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Reviews Grid - Scrollable */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-100px-80px)] sm:max-h-[calc(90vh-120px)]">
          {" "}
          {/* Adjusted max-height for mobile to account for new top padding */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-4 sm:p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                {/* Name */}
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 break-words overflow-wrap-anywhere">
                  {review.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center mb-2 sm:mb-3">
                  <StarRating rating={review.rating} size={18} />

                </div>

                {/* Review Text */}
                {review.review && (
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed break-words overflow-wrap-anywhere">
                    {review.review}
                  </p>
                )}

                {/* Timestamp */}
                {review.timestamp && (
                  <p className="text-gray-500 text-xs mt-3 italic">{new Date(review.timestamp).toLocaleDateString()}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
