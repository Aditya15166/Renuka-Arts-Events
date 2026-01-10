"use client"

import { useState, useRef, useEffect } from "react"
import { Menu, X } from "lucide-react"
import AnimatedBrand from "@/components/animated-brand"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showPortfolioDropdown, setShowPortfolioDropdown] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
    setShowPortfolioDropdown(false)
  }

  const handleCategoryClick = (categoryValue: string) => {
    router.push(`/?category=${categoryValue}#portfolio`)
    setIsOpen(false)
    setShowPortfolioDropdown(false)
  }

  const portfolioCategories = [
    { name: "Vidhi", value: "Vidhi", icon: "🙏" },
    { name: "Sangeet", value: "Sangeet", icon: "🎶" },
    { name: "Haldi", value: "Haldi", icon: "🌼" },
    { name: "Corporate", value: "Corporate", icon: "🏢" },
    { name: "Birthday", value: "Birthday", icon: "🎂" },
    { name: "Other", value: "Other", icon: "🧩" },
  ]

  const handleMouseEnterDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setShowPortfolioDropdown(true)
  }

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setShowPortfolioDropdown(false)
    }, 200)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-lg" : "bg-black/0 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center flex-shrink-0">
            <AnimatedBrand onClick={() => scrollToSection("home")} />
          </div>

          <nav className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => scrollToSection("home")}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection("services")}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Services
            </button>

            <div className="relative" onMouseEnter={handleMouseEnterDropdown} onMouseLeave={handleMouseLeaveDropdown}>
              <button
                onClick={() => scrollToSection("portfolio")}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                Portfolio
              </button>

              {showPortfolioDropdown && (
                <div className="absolute top-full left-0 mt-2 w-80 p-4 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl animate-fade-in-down">
                  <div className="text-sm font-semibold text-white mb-3">Portfolio Categories</div>
                  <div className="grid gap-2">
                    {portfolioCategories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => handleCategoryClick(category.value)}
                        className="flex items-center gap-3 p-2.5 text-left text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                      >
                        <span className="text-lg">{category.icon}</span>
                        <span className="text-sm font-medium">{category.name}</span>
                      </button>
                    ))}
                    <div className="border-t border-white/10 mt-2 pt-2">
                      <button
                        onClick={() => handleCategoryClick("All")}
                        className="flex items-center gap-3 p-2.5 text-left text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 w-full"
                      >
                        <span className="text-lg">🔍</span>
                        <span className="text-sm font-semibold">View All Categories</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection("about")}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              About
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Contact
            </button>
          </nav>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-white hover:text-gray-300">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10">
            <div className="flex flex-col gap-2 p-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-left text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-all duration-200"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-left text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-all duration-200"
              >
                Services
              </button>
              <button
                onClick={() => handleCategoryClick("All")}
                className="text-left text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-all duration-200"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-left text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-all duration-200"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-all duration-200"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
