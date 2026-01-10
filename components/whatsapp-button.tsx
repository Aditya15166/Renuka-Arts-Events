"use client"

import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
  const directorPhone = "919021470650" // WhatsApp format: country code without +
  const whatsappMessage = "Hello! I'm interested in your event planning services."
  const whatsappURL = `https://wa.me/${directorPhone}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute right-16 bg-black/80 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Chat with us
      </span>
    </a>
  )
}
