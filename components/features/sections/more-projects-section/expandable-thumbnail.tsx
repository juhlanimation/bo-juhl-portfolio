"use client"

import { useState, useRef, useCallback } from "react"
import { gsap } from "gsap"
import type { CompactProject } from "@/lib/types"
import { useCursorLabel } from "@/lib/hooks"
import { CursorLabel } from "@/components/ui/cursor-label"
import { HoverVideoContainer } from "@/components/ui/hover-video-container"
import { VideoPlayer } from "../../blocks/video-player"
import { DIMENSIONS, ANIMATION_DURATIONS } from "@/lib/constants/animations"

interface ExpandableThumbnailProps {
  project: CompactProject
  isExpanded: boolean
  onExpand: () => void
  onPlayerOpenChange: (isOpen: boolean) => void
  transitionDuration: number
}

/**
 * ExpandableThumbnail - Single project thumbnail that expands on hover
 * SRP: Handles one thumbnail's expand/collapse and video player state
 * Uses HoverVideoContainer for DRY video/image display
 * Uses useCursorLabel for DRY cursor tracking
 */
export function ExpandableThumbnail({
  project,
  isExpanded,
  onExpand,
  onPlayerOpenChange,
  transitionDuration,
}: ExpandableThumbnailProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const blackOverlayRef = useRef<HTMLDivElement>(null)
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null)
  const { mousePos, cursorProps } = useCursorLabel()

  // Keep video playing when expanded OR when player is open
  const showVideo = isExpanded || isPlayerOpen

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
        duration: ANIMATION_DURATIONS.FADE,
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
        duration: ANIMATION_DURATIONS.FADE,
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
          flex: isExpanded || isPlayerOpen ? `0 0 ${DIMENSIONS.EXPANDED_THUMBNAIL_WIDTH}` : 1,
          transition: `flex ${transitionDuration}ms ease-out, width ${transitionDuration}ms ease-out`,
          minWidth: 0,
          height: "100%",
          width: isExpanded || isPlayerOpen ? DIMENSIONS.EXPANDED_THUMBNAIL_WIDTH : undefined,
        }}
        onMouseEnter={() => {
          onExpand()
          cursorProps.onMouseEnter()
        }}
        onMouseLeave={cursorProps.onMouseLeave}
        onMouseMove={cursorProps.onMouseMove}
        onClick={handleClick}
      >
        <HoverVideoContainer
          thumbnailUrl={project.thumbnailUrl}
          videoUrl={project.videoUrl}
          alt={project.title}
          isActive={showVideo}
          fallback={
            <div className="absolute inset-0 bg-zinc-200 flex items-center justify-center text-zinc-400 text-sm">
              {project.title}
            </div>
          }
        />

        <div
          ref={blackOverlayRef}
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: 0 }}
        />
      </div>

      <CursorLabel
        label="watch"
        isVisible={isExpanded && !isPlayerOpen}
        mousePos={mousePos}
      />

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
