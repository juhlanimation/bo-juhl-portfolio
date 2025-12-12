"use client"

import { useEffect, RefObject } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface UseScrollFadeOptions {
  /** Viewport position where fade starts (% from top). Default 70 */
  start?: number
  /** Viewport position where fade ends (% from top). Default 30 */
  end?: number
  /** Delay before initializing (ms). Default 100 for ScrollSmoother init */
  delay?: number
}

/**
 * Custom hook for scroll-triggered fade-in animations
 * DIP: Abstracts GSAP dependency, making components easier to test
 * SRP: Single responsibility - manages scroll-based opacity animation
 *
 * @param ref - Reference to the element to animate
 * @param options - Animation configuration options
 */
export function useScrollFade(
  ref: RefObject<HTMLElement | null>,
  options: UseScrollFadeOptions = {}
): void {
  const { start = 70, end = 30, delay = 100 } = options

  useEffect(() => {
    if (!ref.current) return

    let ctx: gsap.Context | null = null

    // Small delay to ensure ScrollSmoother is initialized
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        gsap.fromTo(
          ref.current,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: `top ${start}%`,
              end: `top ${end}%`,
              scrub: 0.5,
            },
          }
        )
      })

      ScrollTrigger.refresh()
    }, delay)

    return () => {
      clearTimeout(timer)
      ctx?.revert()
    }
  }, [ref, start, end, delay])
}
