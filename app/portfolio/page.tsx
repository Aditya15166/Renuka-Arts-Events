"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import {
  cloudinaryFolders,
  fetchPortfolioData,
  type PortfolioData,
  type CloudinaryResource,
} from "@/lib/cloudinary-api"
import CloudinaryGallery from "@/components/cloudinary-gallery"
import PortfolioFooter from "@/components/portfolio-footer"

export default function PortfolioPage() {
  const [selectedFolder, setSelectedFolder] = useState("vidhi")
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPortfolioData = async () => {
      setIsLoading(true)
      const data = await fetchPortfolioData()
      setPortfolioData(data)
      setIsLoading(false)
    }

    loadPortfolioData()
  }, [])

  const selectedFolderLabel = cloudinaryFolders.find((f) => f.id === selectedFolder)?.label || ""

  const currentResources: CloudinaryResource[] = portfolioData?.[selectedFolder as keyof PortfolioData] || []

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Portfolio Header Section */}
      <section className="relative h-[35vh] flex items-center justify-center overflow-hidden text-center px-4">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/images/hero-section-bg-image.jpeg)",
          }}
        />
        {/* Dark Glass Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center h-full">
          {/* keep original button for mobile/tablet */}
          <Link href="/" className="absolute top-4 left-4 sm:left-8 lg:hidden">
            <button className="flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-black px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              Back to Home
            </button>
          </Link>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight mt-16 sm:mt-0">
            Our <span className="text-gray-300">Portfolio</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light">
            Transforming Visions into Unforgettable Celebrations.
          </p>
        </div>

        {/* desktop-only left-aligned button (positioned relative to the section) */}
        <Link href="/" className="absolute top-4 left-6 hidden lg:block z-20">
          <button className="flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-black px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Back to Home
          </button>
        </Link>
      </section>

      {/* Main Content */}
      <div className="relative py-12 px-4 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/images/website-bg-image.jpeg)",
            backgroundAttachment: "fixed",
          }}
        />
        {/* Blur Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        <div className="relative z-10 container mx-auto max-w-6xl">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {cloudinaryFolders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedFolder === folder.id ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {folder.label}
              </button>
            ))}
          </div>

          {/* Gallery for Selected Folder */}
          <CloudinaryGallery resources={currentResources} folderLabel={selectedFolderLabel} isLoading={isLoading} />
        </div>
      </div>

      <PortfolioFooter />
    </div>
  )
}
