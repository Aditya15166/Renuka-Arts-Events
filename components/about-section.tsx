"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="about" className="section-padding container-padding relative" ref={ref}>
      <div className="absolute inset-0 bg-black pointer-events-none" />

      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div
            className={`space-y-6 transition-all duration-1000 ${isVisible ? "animate-luxury-fade-in-left" : "opacity-0"}`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">About Renuka Arts & Events</h2>

            <p className="text-lg md:text-xl text-yellow-400 font-light italic leading-relaxed">
              Transforming Visions into Unforgettable Celebrations.
            </p>

            <div className="space-y-5 text-gray-300 leading-relaxed text-base md:text-lg">
              <p>
                Renuka Arts & Events is a premier event planning and coordination service dedicated to creating
                extraordinary celebrations that reflect your unique vision and personality.
              </p>
              <p>
                Under the visionary leadership of Yash Bawaria, our team combines creativity, meticulous planning, and
                flawless execution to deliver events that exceed expectations. Whether it's an intimate wedding, a grand
                corporate gathering, or a special celebration, we handle every detail with elegance and professionalism.
              </p>
              <p>
                We believe that every event tells a story. From concept development to post-event management, we're
                committed to bringing your dreams to life with precision, creativity, and unparalleled service.
              </p>
            </div>

            <div className="pt-8 border-t border-yellow-500/30 space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold text-white">Yash Bawaria</h3>
              <p className="text-yellow-400 text-base md:text-lg font-semibold">Founder & Creative Director</p>
              <p className="text-gray-400 text-sm">Bringing excellence to every event since day one.</p>
            </div>
          </div>

          <div
            className={`flex justify-center lg:justify-end transition-all duration-1000 ${isVisible ? "animate-luxury-fade-in-right" : "opacity-0"}`}
          >
            <div className="relative group max-w-md w-full">
              <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 transition-all duration-500 hover:scale-102 hover:bg-white/8 hover:shadow-2xl hover:border-yellow-500/30">
                <div className="aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br from-yellow-600/20 to-yellow-400/10 flex items-center justify-center">
                  {/* Director image from public/ directory */}
                  <img
                    src="/director1.jpeg"
                    alt="Yash Bawaria — Founder & Creative Director"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="absolute bottom-8 left-8 right-8 bg-black/80 backdrop-blur-md rounded-xl p-4 transition-all duration-300 group-hover:bg-black/90 border border-yellow-500/20">
                  <h4 className="text-xl font-bold text-white mb-1">Yash Bawaria</h4>
                  <p className="text-yellow-400 text-sm font-semibold">Founder & Creative Director</p>
                </div>

                <div className="absolute top-8 right-8 w-12 h-12 border-2 border-yellow-500/30 rounded-full flex items-center justify-center group-hover:border-yellow-500/60 transition-all duration-300">
                  <div className="w-6 h-6 bg-yellow-500/20 rounded-full group-hover:bg-yellow-500/40 transition-all duration-300"></div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-yellow-400/5 to-transparent rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
