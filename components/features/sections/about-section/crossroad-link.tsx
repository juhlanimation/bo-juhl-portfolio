"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"

interface CrossroadLinkProps {
  children: React.ReactNode
  href: string
}

export function CrossroadLink({ children, href }: CrossroadLinkProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)

  // Intentional SSR safety pattern for portal
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional SSR hydration
    setMounted(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "var(--interaction)" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {children}
      </a>
      {mounted &&
        createPortal(
          <div
            className="fixed pointer-events-none z-50 text-[10px] font-medium whitespace-nowrap uppercase tracking-wide"
            style={{
              left: 0,
              top: 0,
              transform: `translate(${mousePos.x + 24}px, ${mousePos.y + 8}px)`,
              transition: "opacity 0.15s ease-out",
              color: "var(--interaction)",
              opacity: isHovered ? 1 : 0,
            }}
          >
            enter
          </div>,
          document.body
        )}
    </>
  )
}
