"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFading, setIsFading] = useState(false)

  const slides = [
    {
      image: "/images/hero-slide-1.jpeg",
      text: "Luxury Wedding Elegance",
    },
    {
      image: "/images/hero-slide-2.jpeg",
      text: "Modern Event Vibrancy",
    },
    {
      image: "/images/hero-slide-3.jpeg",
      text: "Bohemian Celebration Art",
    },
    {
      image: "/images/hero-slide-4.jpeg",
      text: "Floral Sophistication Magic",
    },
    {
      image: "/images/hero-slide-5.jpeg",
      text: "Traditional Festive Grandeur",
    },
    {
      image: "/images/hero-slide-6.jpeg",
      text: "Elegant Rustic Romance",
    },
  ]

  const nextSlide = (currentSlide + 1) % slides.length

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true)
      setTimeout(() => {
        setCurrentSlide((prevIndex) => (prevIndex + 1) % slides.length)
        setIsFading(false)
      }, 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [slides.length])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={slides[nextSlide].image || "/placeholder.svg"}
          alt={slides[nextSlide].text}
          fill
          className="object-cover opacity-0"
          priority
        />

        <Image
          src={slides[currentSlide].image || "/placeholder.svg"}
          alt={slides[currentSlide].text}
          fill
          className={`object-cover transition-opacity duration-500 ease-in-out absolute inset-0 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
          priority
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance">
          <span className="block mb-2">
            <span
              key={slides[currentSlide].text}
              className={`inline-block transition-opacity duration-500 ease-in-out text-yellow-400 ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
            >
              {slides[currentSlide].text}
            </span>
          </span>
          <span className="block">Events & Celebrations.</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 font-light leading-relaxed max-w-3xl mx-auto">
          Premium Event Planning & Coordination by Renuka Arts & Events. Directed by Yash Bawaria
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <button
            onClick={() => scrollToSection("portfolio")}
            className="w-full sm:w-auto bg-yellow-500 text-black hover:bg-yellow-400 px-8 py-4 text-base sm:text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            View Our Work
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="w-full sm:w-auto border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-4 text-base sm:text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105"
          >
            Book a Consultation
          </button>
        </div>
      </div>
    </section>
  )
}
