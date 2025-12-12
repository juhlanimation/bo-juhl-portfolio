'use client'

import { useRef, createContext, useContext, useLayoutEffect, useMemo, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Register plugins (only on client)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin)
}

interface Props {
  children: React.ReactNode
  navbar?: React.ReactNode
}

interface SmoothScrollContextValue {
  getSmoother: () => ScrollSmoother | null
  stop: () => void
  start: () => void
  scrollTo: (target: string | HTMLElement, smooth?: boolean) => void
  getScroll: () => number
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null)

export function useSmoothScroll() {
  return useContext(SmoothScrollContext)
}

export function SmoothScrollProvider({ children, navbar }: Props) {
  const smootherRef = useRef<ScrollSmoother | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)

    // Prevent mobile URL bar from causing layout recalculations
    ScrollTrigger.normalizeScroll(true)

    // Ignore resize events from mobile URL bar (only recalc on significant changes)
    ScrollTrigger.config({
      ignoreMobileResize: true,
    })

    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current!,
      content: contentRef.current!,
      smooth: 1.2,
      effects: true,
      smoothTouch: 0.1,
    })

    smootherRef.current = smoother
    setIsReady(true)

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')
      if (anchor) {
        const href = anchor.getAttribute('href')
        if (href && href.startsWith('#')) {
          e.preventDefault()
          const targetElement = document.querySelector(href) as HTMLElement | null
          if (targetElement) {
            smoother.scrollTo(targetElement, true, 'top top')
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      ScrollTrigger.normalizeScroll(false)
      smoother.kill()
      smootherRef.current = null
    }
  }, [])

  // Memoize context value - all ref access deferred to callbacks to avoid accessing during render
  const contextValue = useMemo<SmoothScrollContextValue>(() => ({
    getSmoother: () => smootherRef.current,
    stop: () => smootherRef.current?.paused(true),
    start: () => smootherRef.current?.paused(false),
    scrollTo: (target, smooth = true) => {
      smootherRef.current?.scrollTo(target, smooth)
    },
    getScroll: () => smootherRef.current?.scrollTop() || 0
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [isReady])

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      <div id="smooth-wrapper" ref={wrapperRef}>
        <div id="smooth-content" ref={contentRef} style={{ isolation: 'isolate' }}>
          {children}
          {navbar}
        </div>
      </div>
    </SmoothScrollContext.Provider>
  )
}
