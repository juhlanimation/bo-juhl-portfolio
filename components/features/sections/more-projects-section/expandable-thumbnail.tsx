"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { gsap } from "gsap"
import type { CompactProject } from "@/lib/types"
import { useVideoPlayback } from "@/lib/hooks"
import { VideoPlayer } from "../../blocks/video-player"

interface ExpandableThumbnailProps {
  project: CompactProject
  isExpanded: boolean
  onExpand: () => void
  onPlayerOpenChange: (isOpen: boolean) => void
  expandScale: number
  transitionDuration: number
}

/**
 * ExpandableThumbnail - Single project thumbnail that expands on hover
 * SRP: Handles one thumbnail's expand/collapse and video player state
 * Extracted from MoreProjectsSection for better separation of concerns
 */
export function ExpandableThumbnail({
  project,
  isExpanded,
  onExpand,
  onPlayerOpenChange,
  expandScale: _expandScale,
  transitionDuration,
}: ExpandableThumbnailProps) {
  // Note: expandScale is received but not currently used (reserved for future use)
  void _expandScale
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const blackOverlayRef = useRef<HTMLDivElement>(null)
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)

  // Keep video playing when expanded OR when player is open
  const showVideo = isExpanded || isPlayerOpen
  useVideoPlayback(videoRef, showVideo, project.videoUrl)

  // For portal (SSR safety - intentional pattern)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional SSR hydration
    setMounted(true)
  }, [])

  // Handle mouse move for cursor label
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  const handleClick = useCallback(() => {
    if (project.videoUrl && containerRef.current && blackOverlayRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

      const adjustedRect = new DOMRect(
        rect.x + scrollbarWidth,
        rect.y,
        rect.width,
        rect.height
      )

      setSourceRect(adjustedRect)

      gsap.to(blackOverlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setIsPlayerOpen(true)
          onPlayerOpenChange(true)
        },
      })
    }
  }, [project.videoUrl, onPlayerOpenChange])

  const handleClose = useCallback(() => {
    setIsPlayerOpen(false)
    onPlayerOpenChange(false)

    if (blackOverlayRef.current) {
      gsap.to(blackOverlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      })
    }
  }, [onPlayerOpenChange])

  return (
    <>
      <div
        ref={containerRef}
        className="relative overflow-hidden cursor-pointer"
        style={{
          flex: isExpanded || isPlayerOpen ? "0 0 32rem" : 1,
          transition: `flex ${transitionDuration}ms ease-out, width ${transitionDuration}ms ease-out`,
          minWidth: 0,
          height: "100%",
          width: isExpanded || isPlayerOpen ? "32rem" : undefined,
        }}
        onMouseEnter={onExpand}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        {project.thumbnailUrl ? (
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            className={`object-cover transition-opacity duration-300 ${
              showVideo && project.videoUrl ? "opacity-0" : "opacity-100"
            }`}
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-200 flex items-center justify-center text-zinc-400 text-sm">
            {project.title}
          </div>
        )}
        {project.videoUrl && (
          <video
            ref={videoRef}
            src={project.videoUrl}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              showVideo ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        <div
          ref={blackOverlayRef}
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Cursor label for "watch" - rendered via portal to escape transformed parent */}
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
              opacity: isExpanded && !isPlayerOpen ? 1 : 0,
            }}
          >
            watch
          </div>,
          document.body
        )}

      <VideoPlayer
        videoUrl={project.fullLengthVideoUrl || project.videoUrl}
        thumbnailUrl={project.thumbnailUrl}
        isOpen={isPlayerOpen}
        onClose={handleClose}
        animationType="expand"
        sourceRect={sourceRect}
      />
    </>
  )
}
