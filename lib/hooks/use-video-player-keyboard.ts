"use client"

import { useEffect } from "react"

interface UseVideoPlayerKeyboardProps {
  isOpen: boolean
  onClose: () => void
  onTogglePlayPause: () => void
}

/**
 * Hook that manages VideoPlayer keyboard interactions (Escape, Space)
 * Extracted from VideoPlayer to improve SRP
 */
export function useVideoPlayerKeyboard({
  isOpen,
  onClose,
  onTogglePlayPause,
}: UseVideoPlayerKeyboardProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      } else if (e.key === " " && isOpen) {
        e.preventDefault()
        onTogglePlayPause()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, onTogglePlayPause])
}
