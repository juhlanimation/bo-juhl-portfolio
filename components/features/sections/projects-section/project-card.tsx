"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import type { FeaturedProject } from "@/lib/types"
import { useVideoPlayback } from "@/lib/hooks"
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
  const [isHovered, setIsHovered] = useState(false)
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Use shared hook for video playback control
  useVideoPlayback(videoRef, isHovered, project.videoUrl)

  const handleClick = () => {
    if (project.fullLengthVideoUrl || project.videoUrl) {
      setIsPlayerOpen(true)
    }
  }

  const imageContent = (
    <div className="flex flex-col w-full md:w-[65%] shrink-0 min-w-0">
      <div
        className="relative w-full aspect-video overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
          className={`font-paragraph flex flex-wrap gap-x-8 gap-y-1 mt-3 text-xs opacity-60 overflow-hidden justify-start text-left ${
            alignment === "right" ? "md:justify-end md:text-right" : ""
          }`}
        >
          {project.client && (
            <span className="uppercase font-medium">{project.client}</span>
          )}
          {project.studio && (
            <span className="uppercase font-medium">{project.studio}</span>
          )}
        </div>
      )}
    </div>
  )

  const textContent = (
    <div
      className={`flex flex-col pt-2 w-full max-w-[350px] items-start ${
        alignment === "right" ? "md:items-end" : ""
      }`}
    >
      <h3
        className={`font-title text-xs font-bold uppercase mb-3 w-full text-left ${
          alignment === "right" ? "md:text-right" : ""
        }`}
      >
        {project.title}
      </h3>
      <p
        className="font-paragraph text-xs leading-relaxed opacity-80 whitespace-pre-line w-full text-justify"
        style={{
          textAlignLast: alignment === "right" ? "right" : "left",
        }}
      >
        {project.description}
      </p>
    </div>
  )

  return (
    <>
      <div
        className={`w-full flex flex-col md:flex-row gap-6 md:gap-8 ${
          alignment === "right"
            ? "md:flex-row-reverse md:justify-start"
            : "md:justify-start"
        }`}
        style={{ color: textColor }}
      >
        {imageContent}
        {textContent}
      </div>

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
