"use client"

import { useState, useCallback } from "react"

interface MousePosition {
  x: number
  y: number
}

interface UseMousePositionReturn {
  mousePos: MousePosition
  handleMouseMove: (e: React.MouseEvent) => void
}

/**
 * Hook to track mouse position for cursor labels and tooltips
 * Returns current mouse position and a handler to update it
 */
export function useMousePosition(): UseMousePositionReturn {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }, [])

  return { mousePos, handleMouseMove }
}
