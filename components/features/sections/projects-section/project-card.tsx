"use client"

import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import type { FeaturedProject } from "@/lib/types"
import { useTouchDevice, useVideoPlayback } from "@/lib/hooks"
import { VideoPlayer } from "../../blocks/video-player"

interface ProjectCardProps {
  project: FeaturedProject
  alignment: "left" | "right"
  textColor: string
}

/**
 * ProjectCard - Displays a featured project with hover video and click-to-play
 * SRP: Handles presentation of a single project card
 * Uses useVideoPlayback hook for DRY video control logic
 */
export function ProjectCard({ project, alignment, textColor }: ProjectCardProps) {
  const isTouchDevice = useTouchDevice()
  const [isHovered, setIsHovered] = useState(false)
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // For portal (SSR safety - intentional pattern)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional SSR hydration
    setMounted(true)
  }, [])

  // Use shared hook for video playback control
  useVideoPlayback(videoRef, isHovered, project.videoUrl)

  // Handle mouse move for cursor label
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  const handleClick = () => {
    if (project.fullLengthVideoUrl || project.videoUrl) {
      setIsPlayerOpen(true)
    }
  }

  const imageContent = (
    <div className="flex flex-col w-full md:w-[55vw] shrink-0 min-w-0">
      <div
        className="relative w-full aspect-video overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        {project.thumbnailUrl ? (
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            className={`object-cover transition-opacity duration-300 ${
              isHovered && project.videoUrl ? "opacity-0" : "opacity-100"
            }`}
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-200 flex items-center justify-center text-zinc-400">
            No image
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
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>
      {(project.client || project.studio) && (
        <div
          className={`font-paragraph flex flex-wrap gap-x-8 gap-y-1 mt-2 text-[10px] opacity-60 overflow-hidden justify-start text-left ${
            alignment === "right" ? "md:justify-end md:text-right" : ""
          }`}
        >
          {project.client && (
            <span className="font-medium">Client <span className="uppercase">{project.client}</span></span>
          )}
          {project.studio && (
            <span className="font-medium">Studio <span className="uppercase">{project.studio}</span></span>
          )}
        </div>
      )}
    </div>
  )

  const textContent = (
    <div
      className={`flex flex-col w-full max-w-[280px] items-start ${
        alignment === "right" ? "md:items-end" : ""
      }`}
    >
      <h3
        className={`font-title text-[10px] font-bold uppercase mb-3 w-full text-left ${
          alignment === "right" ? "md:text-right" : ""
        }`}
      >
        {project.title}
      </h3>
      <p
        className={`font-paragraph text-[10px] leading-relaxed opacity-80 whitespace-pre-line w-full text-justify [text-align-last:left] ${
          alignment === "right" ? "md:[text-align-last:right]" : ""
        }`}
      >
        {project.description}
      </p>
    </div>
  )

  return (
    <>
      <div
        className={`w-full flex flex-col md:flex-row gap-4 md:gap-2 ${
          alignment === "right"
            ? "md:flex-row-reverse md:justify-start"
            : "md:justify-start"
        }`}
        style={{ color: textColor }}
      >
        {imageContent}
        {textContent}
      </div>

      {/* Cursor label for "watch" - hidden on touch devices */}
      {mounted &&
        !isTouchDevice &&
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
            watch
          </div>,
          document.body
        )}

      <VideoPlayer
        videoUrl={project.fullLengthVideoUrl || project.videoUrl}
        thumbnailUrl={project.thumbnailUrl}
        isOpen={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
        animationType={alignment === "left" ? "wipe-left" : "wipe-right"}
      />
    </>
  )
}
