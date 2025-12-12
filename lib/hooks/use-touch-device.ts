"use client"

import { useState, useEffect } from "react"

/**
 * Hook to detect if the current device is a touch device
 * Returns true if touch is detected or screen is mobile-sized
 */
export function useTouchDevice(): boolean {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    const checkTouchDevice = () => {
      const hasTouch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0

      const isMobile = window.matchMedia("(max-width: 768px)").matches

      setIsTouchDevice(hasTouch || isMobile)
    }

    checkTouchDevice()

    const mediaQuery = window.matchMedia("(max-width: 768px)")
    mediaQuery.addEventListener("change", checkTouchDevice)

    return () => {
      mediaQuery.removeEventListener("change", checkTouchDevice)
    }
  }, [])

  return isTouchDevice
}
