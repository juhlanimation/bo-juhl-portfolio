"use client"

import { useCursorLabel } from "@/lib/hooks"
import { CursorLabel } from "@/components/ui/cursor-label"

interface CrossroadLinkProps {
  children: React.ReactNode
  href: string
}

/**
 * CrossroadLink - External link with cursor label
 * Uses useCursorLabel for DRY cursor tracking
 */
export function CrossroadLink({ children, href }: CrossroadLinkProps) {
  const { mousePos, isHovered, cursorProps } = useCursorLabel()

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "var(--interaction)" }}
        {...cursorProps}
      >
        {children}
      </a>
      <CursorLabel label="enter" isVisible={isHovered} mousePos={mousePos} />
    </>
  )
}
