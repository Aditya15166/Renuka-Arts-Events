"use client"

import type React from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

import { useState } from "react"
import { Phone, Mail, Instagram, Facebook, Check, X, AlertCircle } from "lucide-react"

export default function ContactSection() {
  const { ref, isVisible } = useScrollAnimation()

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
  })

  const validatePhoneNumber = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, "")
    return cleanPhone.length === 10
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    let processedValue = value

    if (name === "phone") {
      processedValue = value.replace(/\D/g, "").slice(0, 10)
    }

    setFormData({
      ...formData,
      [name]: processedValue,
    })

    setErrors((prev) => ({ ...prev, [name]: "" }))

    if (name === "phone") {
      if (processedValue && !validatePhoneNumber(processedValue)) {
        setErrors((prev) => ({
          ...prev,
          phone: "Phone number must be exactly 10 digits",
        }))
      }
    } else if (name === "email") {
      if (value && !validateEmail(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address",
        }))
      }
    } else if (name === "name") {
      if (value && !validateName(value)) {
        setErrors((prev) => ({
          ...prev,
          name: "Name must be at least 2 characters long",
        }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = {
      name: "",
      phone: "",
      email: "",
    }

    if (!validateName(formData.name)) {
      newErrors.name = "Name must be at least 2 characters long"
    }

    if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits"
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    const hasErrors = Object.values(newErrors).some((error) => error !== "")

    if (hasErrors) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxqf8nXJsgxfC-IO_ZjwmJCwOXfkWTQmK1R3fVKPJlgPTOTk6PGDeUp9nKkJivT5ZvN4A/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            phone_no: formData.phone,
            email: formData.email.trim().toLowerCase(),
            message: formData.message.trim(),
          }),
        },
      )

      setShowSuccessPopup(true)

      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      })
      setErrors({
        name: "",
        phone: "",
        email: "",
      })

      setTimeout(() => {
        setShowSuccessPopup(false)
      }, 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Sorry, there was an error submitting your message. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false)
  }

  return (
    <section id="contact" className="section-padding container-padding relative" ref={ref}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-none" />

      <div className="relative z-10 container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? "animate-luxury-fade-in-left" : "opacity-0"}`}
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">Contact Us</h2>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                Let's create something amazing together
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-white block text-sm font-semibold">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all ${
                      errors.name ? "border-red-500 focus:border-red-400" : "border-white/20 focus:border-white"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-white block text-sm font-semibold">
                    Phone Number (10 digits) *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    maxLength={10}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all ${
                      errors.phone ? "border-red-500 focus:border-red-400" : "border-white/20 focus:border-white"
                    }`}
                    placeholder="Enter 10-digit phone number"
                  />
                  {errors.phone && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.phone}</span>
                    </div>
                  )}
                  {formData.phone && !errors.phone && validatePhoneNumber(formData.phone) && (
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <Check className="w-4 h-4" />
                      <span>Valid phone number</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-white block text-sm font-semibold">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all ${
                      errors.email ? "border-red-500 focus:border-red-400" : "border-white/20 focus:border-white"
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                  {formData.email && !errors.email && validateEmail(formData.email) && (
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <Check className="w-4 h-4" />
                      <span>Valid email address</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-white block text-sm font-semibold">
                    Message / Tell us about your project...
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20 resize-none transition-all"
                    placeholder="Describe your project or requirements"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black hover:bg-gray-100 disabled:bg-gray-400 disabled:cursor-not-allowed py-3 text-base md:text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:hover:scale-100 hover:shadow-lg"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>

          <div
            className={`space-y-10 transition-all duration-1000 ${isVisible ? "animate-luxury-fade-in-right" : "opacity-0"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <h3 className="text-2xl md:text-3xl font-bold">Get in Touch</h3>

            <div className="space-y-5 mt-6">
              <a
                href="tel:+919021470650"
                className="flex items-center gap-4 text-gray-300 hover:text-white transition-all duration-200 group"
              >
                <Phone className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-base md:text-lg">+91 9021470650 / +91 8805506979</span>
              </a>

              <a
                href="mailto:renukaevents2017@gmail.com"
                className="flex items-center gap-4 text-gray-300 hover:text-white transition-all duration-200 group"
              >
                <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-base md:text-lg">renukaevents2017@gmail.com</span>
              </a>

              <a
                href="https://www.instagram.com/renuka_arts_events?igsh=N3h5bmwxcWhiMnoy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-gray-300 hover:text-white transition-all duration-200 group"
              >
                <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-base md:text-lg">@renuka_arts_events</span>
              </a>

              <a
                href="https://www.facebook.com/share/1CAesVWX99/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-gray-300 hover:text-white transition-all duration-200 group"
              >
                <Facebook className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-base md:text-lg">Renuka Arts & Events</span>
              </a>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold">Why to Choose Renuka Arts & Events?</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300 leading-relaxed">Creative concepts with flawless event execution</span>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300 leading-relaxed">Personalized planning tailored to your vision</span>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300 leading-relaxed">Reliable team ensuring stress-free celebrations</span>
                </div>

                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300 leading-relaxed">Timely delivery with attention to every detail</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4 animate-scale-in">
            <button
              onClick={closeSuccessPopup}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-400" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Thank you for reaching out to us. Someone from our team will contact you within 24 hours.
              </p>

              <div className="text-sm text-gray-400">This message will close automatically in 5 seconds</div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
