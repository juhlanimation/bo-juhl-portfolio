"use client"

import { useState, useEffect } from "react"
import { TIMING } from "@/lib/constants/animations"

/**
 * Hook to detect if the user is currently using touch input
 * Toggles based on actual interaction:
 * - Touch event → touch mode (hide cursor labels)
 * - Mouse move → mouse mode (show cursor labels)
 */
export function useTouchDevice(): boolean {
  const [isTouchMode, setIsTouchMode] = useState(false)

  useEffect(() => {
    let lastTouchTime = 0

    const handleTouchStart = () => {
      lastTouchTime = Date.now()
      setIsTouchMode(true)
    }

    const handleMouseMove = () => {
      // Ignore mouse events that fire immediately after touch (ghost events)
      if (Date.now() - lastTouchTime < TIMING.TOUCH_GHOST_EVENT_TIMEOUT) return
      setIsTouchMode(false)
    }

    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return isTouchMode
}
