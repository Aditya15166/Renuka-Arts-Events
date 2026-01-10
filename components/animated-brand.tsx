"use client"

import { useState, useEffect } from "react"

interface AnimatedBrandProps {
  onClick: () => void
}

export default function AnimatedBrand({ onClick }: AnimatedBrandProps) {
  const [showLogo, setShowLogo] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused || isHovered) return

    const interval = setInterval(() => {
      setShowLogo((prev) => !prev)
    }, 3000)

    return () => clearInterval(interval)
  }, [isPaused, isHovered])

  const handleMouseEnter = () => {
    setIsHovered(true)
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTimeout(() => {
      setIsPaused(false)
    }, 500)
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex items-center h-12 relative min-w-[200px] md:min-w-[280px] hover:opacity-80 transition-opacity duration-300"
      aria-label="Renuka Arts & Events - Home"
    >
      {/* Logo */}
      <div
        className={`absolute inset-0 flex items-center transition-all duration-700 ease-in-out ${
          showLogo ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-95 -translate-x-4"
        }`}
      >
        <img
          src="/images/logo.png"
          alt="Renuka Arts & Events Logo"
          className="h-8 md:h-10 w-auto object-contain max-w-full"
          onError={(e) => {
            e.currentTarget.style.display = "none"
            console.log("Logo failed to load")
          }}
        />
      </div>

      <div
        className={`absolute inset-0 flex items-center transition-all duration-700 ease-in-out ${
          !showLogo ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-95 translate-x-4"
        }`}
      >
        <span className="text-xl md:text-2xl font-bold tracking-tight text-white whitespace-nowrap">
          Renuka Arts & Events
        </span>
      </div>

      <div className="opacity-0 pointer-events-none">
        <span className="text-xl md:text-2xl font-bold tracking-tight text-white whitespace-nowrap">
          Renuka Arts & Events
        </span>
      </div>

      <div
        className={`absolute bottom-0 left-0 h-0.5 bg-yellow-500 transition-all duration-300 ${
          isHovered ? "w-full" : "w-0"
        }`}
      />
    </button>
  )
}
