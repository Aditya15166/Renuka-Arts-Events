"use client"

import { useState, useEffect } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const services = [
  {
    id: 1,
    title: "Photography",
    image: "/images/photography.jpg",
    description:
      "Capture your most cherished moments with professional photographers, candid shots, and cinematic videography that turn your memories into timeless treasures.",
  },
  {
    id: 2,
    title: "Decoration",
    image: "/images/decoration.jpg",
    description:
      "Transform your venue with luxurious floral arrangements, thematic stage setups, and breathtaking décor that add elegance and style to your event.",
  },
  {
    id: 3,
    title: "Event Planning",
    image: "/images/event-planning.jpg",
    description:
      "From selecting the perfect venue to managing every detail till the end, we provide complete event planning solutions so you can enjoy stress-free celebrations.",
  },
  {
    id: 4,
    title: "Weddings & Destination Weddings",
    image: "/images/wedding-pre-wedding.jpg",
    description:
      "Crafting dream weddings with flawless execution, bespoke décor, and exotic venues across India – designed to make your special day unforgettable.",
  },
  {
    id: 5,
    title: "Birthdays",
    image: "/images/birthday.jpg",
    description:
      "Whether it's a grand celebration or an intimate gathering, we design birthday parties with fun, creativity, and luxury themes tailored to your style.",
  },
  {
    id: 6,
    title: "Engagements",
    image: "/images/engagements.jpg",
    description:
      "Celebrate love with elegant engagement ceremonies, beautiful décor, and memorable experiences for you and your loved ones.",
  },
  {
    id: 7,
    title: "Anniversaries",
    image: "/images/aniversaries.jpg",
    description:
      "Re-live your love story with romantic anniversary celebrations filled with magical moments, décor, and customized experiences.",
  },
  {
    id: 8,
    title: "Corporate Events",
    image: "/images/corporate-events.jpg",
    description:
      "From conferences to gala dinners, we organize seamless corporate events with professional planning, premium venues, and world-class arrangements.",
  },
  {
    id: 9,
    title: "Baby Showers",
    image: "/images/baby-shower.jpg",
    description:
      "Celebrate new beginnings with beautifully themed baby showers that create unforgettable moments of joy with friends and family.",
  },
  {
    id: 10,
    title: "Haldi & Mehendi Ceremonies",
    image: "/images/haldi-ceremony.jpg",
    description:
      "Bright, colorful, and festive haldi & mehendi events designed with cultural richness and fun-filled vibes for joyous celebrations.",
  },
]

export default function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation()
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const scrollToContact = () => {
    const contactElement = document.getElementById("contact")
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="services"
      className="relative section-padding container-padding bg-black/40 backdrop-blur-sm"
      ref={ref}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 pointer-events-none" />

      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white transition-all duration-1000 ${
              isVisible ? "animate-luxury-fade-in-up" : "opacity-0 translate-y-12"
            }`}
          >
            Our Services
          </h2>
          <p
            className={`text-lg md:text-xl text-gray-400 font-light italic max-w-2xl mx-auto transition-all duration-1000 ${
              isVisible ? "animate-luxury-fade-in-up" : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: isVisible ? "200ms" : "0ms" }}
          >
            Crafting unforgettable celebrations across every occasion and vision.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative transition-all duration-700 ${
                isVisible ? "animate-stagger-child" : "opacity-0"
              } animate-stagger-item-${index + 1}`}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative h-full rounded-2xl border-2 border-yellow-500/30 bg-white/5 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-yellow-500/60 hover:bg-white/10 hover:shadow-2xl hover:shadow-yellow-500/20 hover:-translate-y-2">
                {/* Service Image */}
                <div className="relative h-32 md:h-40 w-full overflow-hidden bg-gradient-to-br from-yellow-600/20 to-yellow-400/10">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500" />
                </div>

                {/* Card Content */}
                <div className="p-3 md:p-5 space-y-2 md:space-y-3 flex flex-col h-fit">
                  <h3 className="text-sm md:text-lg font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2">
                    {service.title}
                  </h3>

                  <p className="text-xs md:text-sm text-gray-300 leading-relaxed line-clamp-2 md:line-clamp-3">
                    {service.description}
                  </p>

                  <button
                    onClick={scrollToContact}
                    className={`mt-2 md:mt-4 w-full bg-yellow-500 text-black font-semibold py-2 md:py-2.5 text-xs md:text-sm rounded-lg transition-all duration-300 hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/30 ${
                      isMobile
                        ? "opacity-100 translate-y-0"
                        : hoveredCard === service.id
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4 pointer-events-none hidden md:block"
                    }`}
                  >
                    Get Enquiry
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
