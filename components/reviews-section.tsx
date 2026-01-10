"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { MessageCircle, Navigation } from "lucide-react"

export default function ReviewsSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="reviews" className="relative py-20 px-4 overflow-hidden" ref={ref}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/services-bg.jpeg)",
          backgroundAttachment: "fixed",
        }}
      />
      {/* Blurred Glass Overlay for the section */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "animate-luxury-fade-in-up" : "opacity-0"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">See What Customers Say on Google Maps</h2>
          <p className="text-xl text-gray-400 font-light italic">Real customer reviews, powered by Google Maps</p>
        </div>

        {/* Responsive Google Maps Iframe */}
        <div
          className={`flex justify-center transition-all duration-1000 ${isVisible ? "animate-luxury-fade-in-up opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="w-full max-w-5xl">
            <iframe
              title="Renuka Arts & Events - Google Maps Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.5556552849006!2d73.8103887!3d18.448693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2955d06da461b:0x6fa14b4e627f8ee1!2sRenuka%20Arts%20and%20Events!5e0!3m2!1sen!2sin!4v1704067890"
              width="100%"
              height="450"
              className="w-full rounded-xl border border-white/10 shadow-lg md:h-[450px] h-[360px] hover:shadow-2xl transition-shadow duration-300"
              style={{
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div
          className={`flex justify-center gap-4 mt-8 flex-wrap transition-all duration-1000 ${isVisible ? "animate-luxury-fade-in-up opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "400ms" }}
        >
          <a
            href="https://www.google.com/maps/place/Renuka+Arts+and+Events+-wedding+planner/@18.448693,73.8103887,17z/data=!4m8!3m7!1s0x3bc2955d06da461b:0x6fa14b4e627f8ee1!8m2!3d18.448693!4d73.8103887!9m1!1b1!16s%2Fg%2F11w46rngnj!18m1!1e1?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-300 hover:scale-105"
          >
            <MessageCircle className="w-5 h-5" />
            See Reviews
          </a>
          <a
            href="https://www.google.com/maps/dir//flat+no+5,+Renuka+Arts+and+Events+-wedding+planner,+Muktai+angan,+opposite+moti+bakery,+Ganesh+Nagar,+Sitaee+Nagar,+Dhayari,+Pune,+Maharashtra+411041/@18.4869377,74.0094356,17z/data=!4m17!1m7!3m6!1s0x3bc2955d06da461b:0x6fa14b4e627f8ee1!2sRenuka+Arts+and+Events+-wedding+planner!8m2!3d18.448693!4d73.8103887!16s%2Fg%2F11w46rngnj!4m8!1m0!1m5!1m1!1s0x3bc2955d06da461b:0x6fa14b4e627f8ee1!2m2!1d73.8103887!2d18.448693!3e0!18m1!1e1?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
          >
            <Navigation className="w-5 h-5" />
            Get Directions
          </a>
        </div>
      </div>
    </section>
  )
}
