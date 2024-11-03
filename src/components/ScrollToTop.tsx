"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowUp } from 'lucide-react'

export function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      setShowScrollTop(scrollY > windowHeight * 0.2)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!showScrollTop) return null

  return (
    <Button
      className="fixed bottom-8 right-8 rounded-full p-3"
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-6 w-6" />
    </Button>
  )
}