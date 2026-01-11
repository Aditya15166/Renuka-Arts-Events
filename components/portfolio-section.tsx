"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { fetchPortfolioData, cloudinaryFolders, getVideoThumbnail, getMp4Url } from "@/lib/cloudinary-api"
import type { CloudinaryResource } from "@/lib/cloudinary-api"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface PortfolioData {
  vidhi: CloudinaryResource[]
  sangeet: CloudinaryResource[]
  haldi: CloudinaryResource[]
  corporate: CloudinaryResource[]
  birthday: CloudinaryResource[]
  other: CloudinaryResource[]
}

export default function PortfolioSection() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { ref, isVisible } = useScrollAnimation()
  const [activeCategory, setActiveCategory] = useState("All")
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const getDisplayItems = () => {
    if (!portfolioData) return []

    if (activeCategory === "All") {
      return [
        ...portfolioData.vidhi,
        ...portfolioData.sangeet,
        ...portfolioData.haldi,
        ...portfolioData.corporate,
        ...portfolioData.birthday,
        ...portfolioData.other,
      ].slice(0, 6)
    }

    const categoryMap: Record<string, keyof PortfolioData> = {
      Vidhi: "vidhi",
      Sangeet: "sangeet",
      Haldi: "haldi",
      Corporate: "corporate",
      Birthday: "birthday",
      Other: "other",
    }

    const key = categoryMap[activeCategory]
    const items = portfolioData[key] || []
    return items.slice(0, 6)
  }

  const displayItems = getDisplayItems()
  const selectedResource =
    selectedIndex !== null && selectedIndex < displayItems.length ? displayItems[selectedIndex] : null

  useEffect(() => {
    const loadPortfolio = async () => {
      setIsLoading(true)
      const data = await fetchPortfolioData()
      setPortfolioData(data as PortfolioData)
      setIsLoading(false)
    }

    loadPortfolio()
  }, [])

  useEffect(() => {
    const param = searchParams?.get?.("category")
    if (param) {
      setActiveCategory(param)
      setSelectedIndex(null)
      // keep portfolio visible when navigated via hash
      const el = document.getElementById("portfolio")
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [searchParams])

  useEffect(() => {
    if (selectedResource?.resource_type === "video" && videoRef.current) {
      // ensure muted to improve autoplay chance
      videoRef.current.muted = true
      const tryPlay = () => {
        videoRef.current?.play().catch(() => {
          console.log("[v0] Autoplay failed, user interaction required")
        })
      }
      // multiple attempts with small delays
      tryPlay()
      const t1 = setTimeout(tryPlay, 150)
      const t2 = setTimeout(tryPlay, 500)
      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
      }
    }
  }, [selectedResource])

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % displayItems.length)
    }
  }

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? displayItems.length - 1 : selectedIndex - 1)
    }
  }

  const openFullPortfolio = () => {
    router.push("/portfolio")
  }

  return (
    <section
      id="portfolio"
      className="section-padding container-padding bg-black border-t border-b border-yellow-500/20"
      ref={ref}
    >
      <div className="container mx-auto max-w-6xl">
        <div
          className={`text-center mb-16 space-y-4 transition-all duration-1000 ${isVisible ? "animate-luxury-fade-in-up" : "opacity-0"}`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">Our Portfolio</h2>
          <p className="text-lg md:text-xl text-gray-400 font-light italic max-w-2xl mx-auto">
            Where Vision Meets Precision – One Frame at a Time.
          </p>
        </div>

        {/* New: Completed Projects / Stats Banner */}
        <div className={`mb-10 transition-all duration-1000 ${isVisible ? "animate-luxury-fade-in-up" : "opacity-0"}`}>
          <div className="bg-black/80 border border-yellow-500/40 rounded-lg p-6 max-w-5xl mx-auto">
            <h3 className="text-center text-2xl md:text-3xl font-bold text-white mb-4">Successfully Completed 700+ Projects</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              <div className="border-dashed border-2 border-yellow-500/60 rounded-lg p-4 text-center bg-white/3">
                <div className="text-3xl font-extrabold text-yellow-400">150+</div>
                <div className="text-sm text-white/90 mt-1">Corporate Clients</div>
              </div>
              <div className="border-dashed border-2 border-yellow-500/60 rounded-lg p-4 text-center bg-white/3">
                <div className="text-3xl font-extrabold text-yellow-400">275+</div>
                <div className="text-sm text-white/90 mt-1">Corporate Events</div>
              </div>
              <div className="border-dashed border-2 border-yellow-500/60 rounded-lg p-4 text-center bg-white/3">
                <div className="text-3xl font-extrabold text-yellow-400">60+</div>
                <div className="text-sm text-white/90 mt-1">Wedding Events</div>
              </div>
              <div className="border-dashed border-2 border-yellow-500/60 rounded-lg p-4 text-center bg-white/3">
                <div className="text-3xl font-extrabold text-yellow-400">75+</div>
                <div className="text-sm text-white/90 mt-1">R&amp;R Events</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["All", ...cloudinaryFolders.map((f) => f.label)].map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category)
                setSelectedIndex(null)
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-white text-black shadow-lg scale-105"
                  : "bg-white/10 text-white hover:bg-white/20 hover:scale-105"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/5 rounded-lg h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <div
            className={`grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 mb-12 transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
          >
            {displayItems.map((item, index) => (
              <div
                key={item.public_id}
                onClick={() => setSelectedIndex(index)}
                className={`group cursor-pointer overflow-hidden rounded-lg transition-all duration-700 ${
                  isVisible ? `animate-stagger-child animate-stagger-item-${index + 1} opacity-100` : "opacity-0"
                }`}
              >
                <div className="relative bg-white/5 aspect-square">
                  {item.resource_type === "video" ? (
                    <>
                      {/* autoplaying muted video preview */}
                      <video
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        playsInline
                        muted
                        loop
                        autoPlay
                        preload="auto"
                        poster={getVideoThumbnail(item.public_id)}
                        aria-label={item.public_id}
                      >
                        <source src={getMp4Url(item)} type="video/mp4" />
                        {/* Fallback to poster image if video not playable */}
                      </video>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {/* keep subtle play indicator on hover if desired */}
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </>
                  ) : (
                    <img
                      src={item.secure_url || "/placeholder.svg"}
                      alt={item.public_id}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          className={`text-center transition-all duration-1000 ${isVisible ? "animate-luxury-fade-in-up" : "opacity-0"}`}
          style={{ transitionDelay: "600ms" }}
        >
          <button
            onClick={openFullPortfolio}
            className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-base md:text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            View Complete Portfolio
          </button>
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

            {displayItems.length > 1 && (
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

            <div
              className="max-w-4xl max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedResource.resource_type === "video" ? (
                <video
                  ref={videoRef}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full max-h-[85vh] rounded-lg"
                >
                  <source src={getMp4Url(selectedResource)} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={selectedResource.secure_url || "/placeholder.svg"}
                  alt="Full view"
                  className="max-w-full max-h-[85vh] rounded-lg object-contain"
                />
              )}
            </div>

            {displayItems.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                {selectedIndex! + 1} of {displayItems.length}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
