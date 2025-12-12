"use client"

import { createPortal } from "react-dom"
import { useMounted, useTouchDevice } from "@/lib/hooks"
import { DIMENSIONS, ANIMATION_DURATIONS } from "@/lib/constants/animations"

interface CursorLabelProps {
  /** Label text to display near cursor */
  label: string
  /** Whether the label should be visible */
  isVisible: boolean
  /** Current mouse position */
  mousePos: { x: number; y: number }
}

/**
 * CursorLabel - Displays a label that follows the cursor
 * Automatically hides on touch devices and handles SSR safely via portal
 */
export function CursorLabel({ label, isVisible, mousePos }: CursorLabelProps) {
  const mounted = useMounted()
  const isTouchDevice = useTouchDevice()

  if (!mounted || isTouchDevice) {
    return null
  }

  return createPortal(
    <div
      className="fixed pointer-events-none z-50 text-[10px] font-medium whitespace-nowrap uppercase tracking-wide"
      style={{
        left: 0,
        top: 0,
        transform: `translate(${mousePos.x + DIMENSIONS.CURSOR_LABEL_OFFSET.x}px, ${mousePos.y + DIMENSIONS.CURSOR_LABEL_OFFSET.y}px)`,
        transition: `opacity ${ANIMATION_DURATIONS.CURSOR_LABEL}s ease-out`,
        color: "var(--interaction)",
        opacity: isVisible ? 1 : 0,
      }}
    >
      {label}
    </div>,
    document.body
  )
}
