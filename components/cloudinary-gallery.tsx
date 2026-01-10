"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import type { CloudinaryResource } from "@/lib/cloudinary-api"

interface CloudinaryGalleryProps {
  resources: CloudinaryResource[]
  folderLabel: string
  isLoading: boolean
}

export default function CloudinaryGallery({ resources, folderLabel, isLoading }: CloudinaryGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % resources.length)
    }
  }

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? resources.length - 1 : selectedIndex - 1)
    }
  }

  const selectedResource = selectedIndex !== null ? resources[selectedIndex] : null

  return (
    <>
      {/* Gallery Grid */}
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-6 capitalize text-white">{folderLabel}</h2>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white/5 rounded-lg h-64 animate-pulse" />
              ))}
            </div>
          ) : resources.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No items found in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {resources.map((resource, index) => (
                <div
                  key={resource.public_id}
                  onClick={() => setSelectedIndex(index)}
                  className="group cursor-pointer overflow-hidden rounded-lg"
                >
                  <div className="relative bg-white/5 aspect-square">
                    {resource.resource_type === "video" ? (
                      <>
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        >
                          <source src={resource.secure_url} type="video/mp4" />
                        </video>
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                            <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </>
                    ) : (
                      <img
                        src={resource.secure_url || "/placeholder.svg"}
                        alt={resource.public_id}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                    )}
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedResource && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {resources.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrev()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleNext()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="max-w-4xl max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {selectedResource.resource_type === "video" ? (
              <div className="w-full">
                <video
                  controls
                  controlsList="nodownload"
                  className="w-full max-h-[85vh] rounded-lg"
                  onError={(e) => {
                    console.log("[v0] Video error:", e)
                    console.log("[v0] Video URL:", selectedResource.secure_url)
                  }}
                  onLoadedMetadata={() => {
                    console.log("[v0] Video loaded successfully:", selectedResource.secure_url)
                  }}
                >
                  <source src={selectedResource.secure_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <img
                src={selectedResource.secure_url || "/placeholder.svg"}
                alt="Full view"
                className="max-w-full max-h-[85vh] rounded-lg object-contain"
              />
            )}
          </div>

          {/* Counter */}
          {resources.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
              {selectedIndex! + 1} of {resources.length}
            </div>
          )}
        </div>
      )}
    </>
  )
}
