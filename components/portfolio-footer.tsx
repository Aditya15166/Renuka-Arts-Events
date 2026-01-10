"use client"

import Link from "next/link"
import { Instagram, Mail } from "lucide-react"
import { useRouter } from "next/navigation" // Import useRouter

export default function PortfolioFooter() {
  const router = useRouter() // Initialize useRouter

  const handleGetInTouchClick = () => {
    // Navigate to the homepage and then scroll to the contact section
    router.push("/#contact")
  }

  return (
    <footer className="bg-black py-16 px-4 text-white text-center border-t border-white/10">
      <div className="container mx-auto max-w-4xl">
        {/* Call to Action */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Create Your <span className="text-gray-400">Story?</span>
          </h2>
          <p className="text-lg text-gray-300 mb-8">Let's discuss your vision and bring it to life through our lens</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={handleGetInTouchClick} // Use the new handler
              className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105"
            >
              Get In Touch
            </button>
            <Link href="/">
              <button className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105">
                Back to Home
              </button>
            </Link>
          </div>
        </div>

        {/* Brand and Socials */}
        <div className="border-t border-white/10 pt-12">
          <h3 className="text-2xl font-bold mb-4">Renuka Arts & Events</h3>
          <div className="flex justify-center space-x-6 mb-6">
            <a
              href="https://www.instagram.com/renuka_arts_events?igsh=N3h5bmwxcWhiMnoy"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 rounded-full hover:bg-white/20 hover:scale-110 transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="mailto:renukaevents2017@gmail.com"
              className="p-3 bg-white/10 rounded-full hover:bg-white/20 hover:scale-110 transition-all duration-300"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            Website created and managed by{" "}
            <a
              href="https://techmeets.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-400 hover:underline transition-colors"
            >
              TechMeet Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
