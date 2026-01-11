"use client"

import { Instagram, Phone, Mail, Facebook } from "lucide-react"

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const services = [
    "Photography",
    "Decoration",
    "Event Planning",
    "Weddings & Destination Weddings",
    "Birthdays",
    "Engagements",
    "Anniversaries",
    "Corporate Events",
    "Baby Showers",
    "Haldi & Mehendi Ceremonies",
  ]

  const quickLinks = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Portfolio", id: "portfolio" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
  ]

  return (
    <footer className="bg-black border-t border-yellow-500/20">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Renuka Arts & Events</h3>
              <p className="text-yellow-400 italic font-semibold">Creating Unforgettable Moments</p>
            </div>

            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/renuka_arts_events?igsh=N3h5bmwxcWhiMnoy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-yellow-500/20 hover:scale-110 transition-all duration-300"
              >
                <Instagram className="w-5 h-5 text-yellow-500" />
              </a>
              <a
                href="tel:+919021470650"
                className="p-2 bg-white/10 rounded-full hover:bg-yellow-500/20 hover:scale-110 transition-all duration-300"
              >
                <Phone className="w-5 h-5 text-yellow-500" />
              </a>
              <a
                href="mailto:renukaevents2017@gmail.com"
                className="p-2 bg-white/10 rounded-full hover:bg-yellow-500/20 hover:scale-110 transition-all duration-300"
              >
                <Mail className="w-5 h-5 text-yellow-500" />
              </a>
              <a
                href="https://www.facebook.com/share/1CAesVWX99/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-yellow-500/20 hover:scale-110 transition-all duration-300"
              >
                <Facebook className="w-5 h-5 text-yellow-500" />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-400">Our Services</h4>
            <div className="space-y-2">
              {services.map((service) => (
                <button
                  key={service}
                  onClick={() => scrollToSection("services")}
                  className="block text-gray-400 hover:text-yellow-400 hover:underline transition-colors text-left"
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-400">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className="block text-gray-400 hover:text-yellow-400 hover:underline transition-colors text-left"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-yellow-500/20 pt-6 text-center">
          <p className="text-gray-400">
            Website is created and managed by{" "}
            <a
              href="https://techmeets.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 font-semibold hover:underline transition-colors"
            >
              TechMeet Solution
            </a>
          </p>
          {/* <p className="text-gray-500 text-sm mt-2">All rights reserved.</p> */}
        </div>
      </div>
    </footer>
  )
}
