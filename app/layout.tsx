import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import WhatsAppButton from "@/components/whatsapp-button"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Renuka Arts & Events | Premium Event Planning & Coordination",
  description:
    "Renuka Arts & Events - Expert event planning and coordination services for weddings, corporate events, and celebrations. Led by Yash Bawaria. Create unforgettable moments with our professional team.",
  keywords: [
    "Renuka Arts & Events",
    "event planning",
    "wedding coordinator",
    "event management",
    "Yash Bawaria",
    "professional events",
    "corporate events",
    "celebration planning",
    "best event planner in India",
  ],
  generator: "TechMeet Solutions",
  openGraph: {
    title: "Renuka Arts & Events | Premium Event Planning",
    description:
      "Create unforgettable moments with Renuka Arts & Events. Expert planning for weddings, corporate events, and celebrations.",
    url: "https://techmeets.in",
    siteName: "Renuka Arts & Events",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Renuka Arts & Events Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Renuka Arts & Events | Event Planning",
    description:
      "Premium event planning & coordination. Weddings, corporate events, and celebrations designed to perfection.",
    images: ["/images/logo.png"],
  },
  metadataBase: new URL("https://techmeets.in"),
  icons: {
    icon: "/favicon.ico",
  },
  authors: [
    {
      name: "Yash Bawaria",
      url: "https://www.instagram.com/renuka_arts_events",
    },
  ],
  creator: "Yash Bawaria - Renuka Arts & Events",
  publisher: "TechMeet Solutions",
  alternates: {
    canonical: "https://techmeets.in",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="font-sans">
        <WhatsAppButton />
        {children}
      </body>
    </html>
  )
}
