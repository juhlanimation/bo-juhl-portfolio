"use client"

import { useRef } from "react"
import Image from "next/image"
import { useVideoPlayback } from "@/lib/hooks"

interface HoverVideoContainerProps {
  /** URL for the thumbnail image */
  thumbnailUrl?: string
  /** URL for the hover video */
  videoUrl?: string
  /** Alt text for the image */
  alt: string
  /** Whether video should be playing (e.g., on hover) */
  isActive: boolean
  /** Additional className for the container */
  className?: string
  /** Fallback content when no thumbnail */
  fallback?: React.ReactNode
}

/**
 * HoverVideoContainer - Reusable image + video overlay with hover transitions
 * DRY: Extracted from ProjectCard and ExpandableThumbnail
 * SRP: Handles only the image/video display with opacity transitions
 */
export function HoverVideoContainer({
  thumbnailUrl,
  videoUrl,
  alt,
  isActive,
  className = "",
  fallback,
}: HoverVideoContainerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Use shared hook for video playback control
  useVideoPlayback(videoRef, isActive, videoUrl)

  return (
    <>
      {thumbnailUrl ? (
        <Image
          src={thumbnailUrl}
          alt={alt}
          fill
          className={`object-cover transition-opacity duration-300 ${
            isActive && videoUrl ? "opacity-0" : "opacity-100"
          } ${className}`}
        />
      ) : (
        fallback || (
          <div className="absolute inset-0 bg-zinc-200 flex items-center justify-center text-zinc-400">
            No image
          </div>
        )
      )}
      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          loop
          playsInline
          preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </>
  )
}
