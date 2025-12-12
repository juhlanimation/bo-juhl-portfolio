"use client"

import { useState, useCallback } from "react"
import { useMousePosition } from "./use-mouse-position"

interface UseCursorLabelReturn {
  /** Current mouse position */
  mousePos: { x: number; y: number }
  /** Whether element is currently hovered */
  isHovered: boolean
  /** Props to spread on the interactive element */
  cursorProps: {
    onMouseEnter: () => void
    onMouseLeave: () => void
    onMouseMove: (e: React.MouseEvent) => void
  }
}

/**
 * Hook that combines hover state and mouse position tracking for cursor labels
 * DRY: Composes useMousePosition + hover state management
 * Used by: ProjectCard, ExpandableThumbnail, CrossroadLink, VideoBackground
 */
export function useCursorLabel(): UseCursorLabelReturn {
  const { mousePos, handleMouseMove } = useMousePosition()
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  return {
    mousePos,
    isHovered,
    cursorProps: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onMouseMove: handleMouseMove,
    },
  }
}
