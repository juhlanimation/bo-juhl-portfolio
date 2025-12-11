'use client'

import { useState, useRef } from 'react'
import type { ProjectCardSettings } from './index'

interface Props {
  settings: ProjectCardSettings
  isSelected?: boolean
}

export function ProjectCardPreview({ settings, isSelected }: Props) {
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (settings.playVideoOnHover && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Ignore autoplay errors
      })
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const showVideo = isHovered && settings.playVideoOnHover && settings.videoUrl

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered ? `scale(${settings.hoverScale})` : 'scale(1)',
        transition: `transform ${settings.transitionDuration}ms ${settings.transitionEasing}`,
      }}
      className={`
        relative overflow-hidden rounded-lg cursor-pointer
        ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}
      `}
    >
      {/* Media Container */}
      <div
        style={{ aspectRatio: settings.aspectRatio }}
        className="relative bg-muted"
      >
        {/* Thumbnail (always rendered, hidden when video plays) */}
        {settings.thumbnailUrl && (
          <img
            src={settings.thumbnailUrl}
            alt={settings.title}
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-opacity duration-300
              ${showVideo ? 'opacity-0' : 'opacity-100'}
            `}
          />
        )}

        {/* Video (preloaded, shown on hover) */}
        {settings.videoUrl && (
          <video
            ref={videoRef}
            src={settings.videoUrl}
            muted
            loop
            playsInline
            preload="metadata"
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-opacity duration-300
              ${showVideo ? 'opacity-100' : 'opacity-0'}
            `}
          />
        )}

        {/* Placeholder when no media */}
        {!settings.thumbnailUrl && !settings.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            No media
          </div>
        )}
      </div>

      {/* Title Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-white font-semibold">
          {settings.title || 'Untitled Project'}
        </h3>
        {settings.description && (
          <p className="text-white/70 text-sm mt-1 line-clamp-2">
            {settings.description}
          </p>
        )}
      </div>
    </div>
  )
}
