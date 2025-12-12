"use client"

import { useRef, ReactNode } from "react"
import { useScrollFade } from "@/lib/hooks/use-scroll-fade"

interface ScrollFadeProps {
  children: ReactNode
  className?: string
  /** Viewport position where fade starts (% from top). Default 70 = starts when element top hits 70% of viewport */
  start?: number
  /** Viewport position where fade ends (% from top). Default 30 = ends when element top hits 30% of viewport */
  end?: number
}

/**
 * ScrollFade component - wraps children with scroll-triggered fade-in
 * SRP: Only responsible for rendering the wrapper, animation logic delegated to hook
 */
export function ScrollFade({
  children,
  className = "",
  start = 70,
  end = 30,
}: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null)

  useScrollFade(ref, { start, end })

  return (
    <div ref={ref} className={className} style={{ visibility: "hidden" }}>
      {children}
    </div>
  )
}
