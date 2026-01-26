"use client"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import PortfolioSection from "@/components/portfolio-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import ReviewsSection from "@/components/reviews-section" // Import the new section
import Footer from "@/components/footer"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function HomePage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || "All"

  useEffect(() => {
    if (searchParams.get("category")) {
      const element = document.getElementById("portfolio")
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [searchParams])

  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{
        backgroundImage: "url(/images/website-bg-image.jpeg)",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Navbar />
      <main>
        <HeroSection />
        <PortfolioSection initialCategory={initialCategory} />
        <ContactSection />
        <ServicesSection />
        <ReviewsSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}
