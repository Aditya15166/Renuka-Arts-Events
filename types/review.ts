export interface Review {
  id: string // Unique ID from Google Sheet row number or similar
  name: string
  rating: number // 1-5 stars
  reviewText?: string
  timestamp?: string // Optional: to show when the review was submitted
}
