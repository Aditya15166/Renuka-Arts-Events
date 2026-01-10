"use client"

import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: number
  className?: string
  onRatingChange?: (rating: number) => void // For interactive rating
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 20,
  className = "",
  onRatingChange,
}: StarRatingProps) {
  const stars = Array.from({ length: maxRating }, (_, index) => {
    const starValue = index + 1
    const isFilled = starValue <= rating

    // Determine fill and stroke based on whether the star is "filled"
    const starFill = isFilled ? "currentColor" : "none" // Solid fill for filled stars, no fill for unfilled
    const starStroke = isFilled ? "none" : "currentColor" // No stroke for filled stars, stroke for unfilled

    // Determine the color class for both fill and stroke
    const starColorClass = isFilled ? "text-yellow-500" : "text-gray-400"

    return (
      <Star
        key={index}
        size={size}
        className={`${starColorClass} ${className} ${onRatingChange ? "cursor-pointer" : ""}`}
        fill={starFill} // Explicitly set fill property
        stroke={starStroke} // Explicitly set stroke property
        strokeWidth={1.5} // Maintain default Lucide stroke width for outlined stars
        onClick={() => onRatingChange && onRatingChange(starValue)}
      />
    )
  })

  return <div className="flex gap-1">{stars}</div>
}
