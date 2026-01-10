"use client"

import type React from "react"
import { useState } from "react"
import StarRating from "./star-rating"
import { Check, X, AlertCircle } from "lucide-react"

interface ReviewFormProps {
  onSubmitSuccess: () => void
}

export default function ReviewForm({ onSubmitSuccess }: ReviewFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    review: "", // Changed from reviewText to review
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState({
    name: "",
    rating: "",
  })
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setFormErrors((prev) => ({ ...prev, [name]: "" }))
    setSubmitStatus(null)
  }

  const handleRatingChange = (newRating: number) => {
    setFormData({ ...formData, rating: newRating })
    setFormErrors((prev) => ({ ...prev, rating: "" }))
    setSubmitStatus(null)
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { name: "", rating: "" }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required."
      valid = false
    }
    if (formData.rating === 0) {
      newErrors.rating = "Please select a star rating."
      valid = false
    }

    setFormErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzlp9nOdcwMhCq2Mb87iOCjf7onSRsv1mHtiQQU7S3E9YCP_Ib2ARhUphdllg51iszSXQ/exec",
        {
          method: "POST",
          mode: "no-cors", // Important for Google Apps Script
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            rating: formData.rating,
            review: formData.review.trim(), // Changed from reviewText to review
          }),
        },
      )

      // Since mode is 'no-cors', we can't read response.
      // Assume success if no network error, and rely on re-fetching.
      setSubmitStatus("success")
      setFormData({ name: "", rating: 0, review: "" }) // Changed from reviewText to review
      onSubmitSuccess() // Trigger parent to re-fetch reviews
    } catch (error) {
      console.error("Error submitting review:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-6">
      <h3 className="text-2xl font-bold text-white mb-4">Leave a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-white block text-sm font-medium">
            Your Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder:text-gray-400 focus:outline-none transition-colors ${
              formErrors.name ? "border-red-500" : "border-white/20 focus:border-white"
            }`}
            placeholder="Enter your name"
            required
          />
          {formErrors.name && (
            <p className="text-red-400 text-sm flex items-center gap-1">
              <AlertCircle size={16} />
              {formErrors.name}
            </p>
          )}
        </div>

        {/* Rating Input */}
        <div className="space-y-2">
          <label className="text-white block text-sm font-medium">Your Rating *</label>
          <StarRating rating={formData.rating} onRatingChange={handleRatingChange} size={28} />
          {formErrors.rating && (
            <p className="text-red-400 text-sm flex items-center gap-1">
              <AlertCircle size={16} />
              {formErrors.rating}
            </p>
          )}
        </div>

        {/* Review Textarea */}
        <div className="space-y-2">
          <label htmlFor="review" className="text-white block text-sm font-medium">
            Your Review (Optional)
          </label>
          <textarea
            id="review"
            name="review"
            value={formData.review}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:border-white focus:outline-none resize-none"
            placeholder="Share your experience..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-white text-black hover:bg-gray-200 disabled:bg-gray-300 disabled:cursor-not-allowed py-3 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>

        {/* Submission Status */}
        {submitStatus === "success" && (
          <div className="mt-4 p-3 bg-green-500/20 text-green-400 rounded-lg flex items-center gap-2">
            <Check size={20} />
            <span>Review submitted successfully!</span>
          </div>
        )}
        {submitStatus === "error" && (
          <div className="mt-4 p-3 bg-red-500/20 text-red-400 rounded-lg flex items-center gap-2">
            <X size={20} />
            <span>Failed to submit review. Please try again.</span>
          </div>
        )}
      </form>
    </div>
  )
}
