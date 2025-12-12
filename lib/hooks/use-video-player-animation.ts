"use client"

import { useRef, useEffect, useCallback, useState } from "react"
import { gsap } from "gsap"
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider"
import { ANIMATION_DURATIONS } from "@/lib/constants/animations"

interface UseVideoPlayerAnimationProps {
  isOpen: boolean
  isMounted: boolean
  animationType: "wipe-left" | "wipe-right" | "expand"
  sourceRect?: DOMRect | null
  videoUrl: string
  onAnimationComplete: () => void
}

interface UseVideoPlayerAnimationReturn {
  overlayRef: React.RefObject<HTMLDivElement | null>
  videoContainerRef: React.RefObject<HTMLDivElement | null>
  videoRef: React.RefObject<HTMLVideoElement | null>
  showVideo: boolean
  handleClose: (onComplete: () => void) => void
}

// Store video playback positions globally (persists across component lifecycles)
const MAX_STORED_POSITIONS = 20
const videoPlaybackPositions = new Map<string, number>()

export function storePlaybackPosition(url: string, time: number) {
  if (videoPlaybackPositions.size >= MAX_STORED_POSITIONS) {
    const firstKey = videoPlaybackPositions.keys().next().value
    if (firstKey) videoPlaybackPositions.delete(firstKey)
  }
  videoPlaybackPositions.set(url, time)
}

export function getPlaybackPosition(url: string): number {
  return videoPlaybackPositions.get(url) || 0
}

export function clearPlaybackPosition(url: string) {
  videoPlaybackPositions.delete(url)
}

/**
 * Hook that manages VideoPlayer animations (open/close wipe/expand transitions)
 * Extracted from VideoPlayer to improve SRP
 */
export function useVideoPlayerAnimation({
  isOpen,
  isMounted,
  animationType,
  sourceRect,
  videoUrl,
  onAnimationComplete,
}: UseVideoPlayerAnimationProps): UseVideoPlayerAnimationReturn {
  const overlayRef = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const smoothScroll = useSmoothScroll()
  const [showVideo, setShowVideo] = useState(false)

  // Handle open/close animations
  useEffect(() => {
    if (!isMounted || !overlayRef.current || !videoContainerRef.current || !videoRef.current) return

    const overlay = overlayRef.current
    const container = videoContainerRef.current
    const video = videoRef.current

    if (isOpen) {
      // Kill any existing animation
      timelineRef.current?.kill()

      // Reset state - video hidden during wipe
      setShowVideo(false)
      gsap.set(video, { opacity: 0 })

      // Set initial state
      gsap.set(overlay, { display: "flex" })

      // Create new timeline for the wipe/expand animation
      timelineRef.current = gsap.timeline({
        onComplete: () => {
          // After wipe completes, fade in the video from black
          setShowVideo(true)

          // Restore saved playback position or start from beginning
          video.currentTime = getPlaybackPosition(videoUrl)

          video.play().catch(() => {})

          gsap.to(video, {
            opacity: 1,
            duration: ANIMATION_DURATIONS.FADE,
            ease: "power2.inOut",
          })

          onAnimationComplete()
        },
      })

      if (animationType === "wipe-left") {
        gsap.set(container, { clipPath: "inset(0 100% 0 0)" })
        timelineRef.current.to(container, {
          clipPath: "inset(0 0% 0 0)",
          duration: ANIMATION_DURATIONS.WIPE,
          ease: "power3.inOut",
        })
      } else if (animationType === "wipe-right") {
        gsap.set(container, { clipPath: "inset(0 0 0 100%)" })
        timelineRef.current.to(container, {
          clipPath: "inset(0 0 0 0%)",
          duration: ANIMATION_DURATIONS.WIPE,
          ease: "power3.inOut",
        })
      } else if (animationType === "expand" && sourceRect) {
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        const initialTop = (sourceRect.top / viewportHeight) * 100
        const initialBottom = ((viewportHeight - sourceRect.bottom) / viewportHeight) * 100
        const initialLeft = (sourceRect.left / viewportWidth) * 100
        const initialRight = ((viewportWidth - sourceRect.right) / viewportWidth) * 100

        gsap.set(container, {
          clipPath: `inset(${initialTop}% ${initialRight}% ${initialBottom}% ${initialLeft}%)`,
        })

        timelineRef.current.to(container, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: ANIMATION_DURATIONS.WIPE,
          ease: "power3.inOut",
        })
      }

      // Prevent body scroll and stop smooth scroll
      document.body.style.overflow = "hidden"
      smoothScroll?.stop()
    }

    return () => {
      document.body.style.overflow = ""
      smoothScroll?.start()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isMounted, animationType, sourceRect, smoothScroll])

  // Handle close with reverse animation
  const handleClose = useCallback(
    (onComplete: () => void) => {
      if (!timelineRef.current || !overlayRef.current || !videoContainerRef.current || !videoRef.current) {
        onComplete()
        return
      }

      const video = videoRef.current

      // Save current playback position for resume on reopen
      if (video.currentTime > 0 && video.currentTime < video.duration) {
        storePlaybackPosition(videoUrl, video.currentTime)
      }

      // Fade video out to black, then reverse the wipe
      gsap.to(video, {
        opacity: 0,
        duration: ANIMATION_DURATIONS.FADE,
        ease: "power2.inOut",
        onComplete: () => {
          video.pause()
          setShowVideo(false)

          timelineRef.current?.reverse()

          timelineRef.current?.eventCallback("onReverseComplete", () => {
            gsap.set(overlayRef.current, { display: "none" })
            document.body.style.overflow = ""
            smoothScroll?.start()
            onComplete()
          })
        },
      })
    },
    [videoUrl, smoothScroll]
  )

  return {
    overlayRef,
    videoContainerRef,
    videoRef,
    showVideo,
    handleClose,
  }
}
