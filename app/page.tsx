import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"
import { WaitlistForm } from "@/components/waitlist-form"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-semibold">W</span>
            </div>
            <span className="font-semibold">Wira</span>
          </div>

          <nav className="hidden md:block">
            <Link
              href="#"
              className="text-sm font-medium text-gray-900 hover:text-gray-600 border-b-2 border-indigo-600 pb-1"
            >
              Home
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-sm font-medium">
              Sign Up
            </Button>
            <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">Connect with Talent</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover and match with top professionals globally
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
            Join us now
          </Button>
          <Button variant="outline" size="lg">
            Request demo
          </Button>
        </div>
      </section>

      {/* Image Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iScreen%20Shoter%20-%20Safari%20-%20250304113949.jpg-Yh4zV4xbUgunUm3ZIaFlkoAKj7Cw0B.jpeg"
            alt="Office meeting with professionals"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              aria-label="Play video"
            >
              <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-indigo-600 border-b-8 border-b-transparent ml-1"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="container mx-auto px-4 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">App Highlights</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover top talent and career opportunities with ease, tailored to your preferences.
            </p>
          </div>

          <WaitlistForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Wira. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

