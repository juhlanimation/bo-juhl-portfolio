"use client"

import { useEffect, RefObject } from "react"

/**
 * Custom hook for controlling video playback based on a condition
 * DRY: Extracted from ProjectCard and ExpandableThumbnail which had duplicate logic
 * SRP: Single responsibility - manages video play/pause state
 *
 * @param videoRef - Reference to the video element
 * @param shouldPlay - Whether the video should be playing
 * @param videoUrl - Optional video URL (playback only happens if URL exists)
 */
export function useVideoPlayback(
  videoRef: RefObject<HTMLVideoElement | null>,
  shouldPlay: boolean,
  videoUrl?: string
): void {
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (shouldPlay && videoUrl) {
      video.play().catch(() => {
        // Autoplay may be blocked by browser - silent fail is expected
      })
    } else {
      video.pause()
      video.currentTime = 0
    }
  }, [videoRef, shouldPlay, videoUrl])
}
