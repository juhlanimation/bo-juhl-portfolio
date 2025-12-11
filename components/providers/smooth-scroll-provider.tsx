'use client'

import { useEffect, useRef, createContext, useContext } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

interface Props {
  children: React.ReactNode
  navbar?: React.ReactNode
}

interface LenisContextValue {
  lenis: Lenis | null
  stop: () => void
  start: () => void
}

const LenisContext = createContext<LenisContextValue | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

export function SmoothScrollProvider({ children, navbar }: Props) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Ensure we're at the top
    window.scrollTo(0, 0)

    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
      autoResize: true,
    })

    lenisRef.current = lenis

    // Connect Lenis to ScrollTrigger immediately
    lenis.on('scroll', ScrollTrigger.update)

    // Add Lenis to GSAP ticker for smooth animation sync
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(rafCallback)

    // Disable GSAP's default lag smoothing for better Lenis sync
    gsap.ticker.lagSmoothing(0)

    // Pre-warm ScrollTrigger during the ~1 second before user can interact
    // This runs all expensive calculations BEFORE the first scroll
    const preWarmTimeout = setTimeout(() => {
      ScrollTrigger.refresh() // Calculate all trigger positions
      ScrollTrigger.update()  // Run one update cycle to initialize caches
    }, 200) // After React components have mounted their ScrollTriggers

    // Handle anchor link clicks for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')
      if (anchor) {
        const href = anchor.getAttribute('href')
        if (href && href.startsWith('#')) {
          e.preventDefault()
          const targetElement = document.querySelector(href) as HTMLElement | null
          if (targetElement) {
            lenis.scrollTo(targetElement, {
              offset: 0,
              duration: 1.5,
            })
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    // Cleanup on unmount
    return () => {
      clearTimeout(preWarmTimeout)
      document.removeEventListener('click', handleAnchorClick)
      lenis.destroy()
      gsap.ticker.remove(rafCallback)
    }
  }, [])

  const contextValue: LenisContextValue = {
    lenis: lenisRef.current,
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
  }

  return (
    <LenisContext.Provider value={contextValue}>
      <div id="smooth-scroll-content">
        {navbar}
        {children}
      </div>
    </LenisContext.Provider>
  )
}
