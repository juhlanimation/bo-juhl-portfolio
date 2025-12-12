"use client"

import { useState } from "react"
import type { FeaturedProject } from "@/lib/types"
import { useCursorLabel } from "@/lib/hooks"
import { CursorLabel } from "@/components/ui/cursor-label"
import { HoverVideoContainer } from "@/components/ui/hover-video-container"
import { VideoPlayer } from "../../blocks/video-player"

interface ProjectCardProps {
  project: FeaturedProject
  alignment: "left" | "right"
  textColor: string
}

/**
 * ProjectCard - Displays a featured project with hover video and click-to-play
 * SRP: Handles presentation of a single project card
 * Uses HoverVideoContainer for DRY video/image display
 * Uses useCursorLabel for DRY cursor tracking
 */
export function ProjectCard({ project, alignment, textColor }: ProjectCardProps) {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)
  const { mousePos, isHovered, cursorProps } = useCursorLabel()

  const handleClick = () => {
    if (project.fullLengthVideoUrl || project.videoUrl) {
      setIsPlayerOpen(true)
    }
  }

  const imageContent = (
    <div className="flex flex-col w-full md:w-[55vw] shrink-0 min-w-0">
      <div
        className="relative w-full aspect-video overflow-hidden cursor-pointer"
        {...cursorProps}
        onClick={handleClick}
      >
        <HoverVideoContainer
          thumbnailUrl={project.thumbnailUrl}
          videoUrl={project.videoUrl}
          alt={project.title}
          isActive={isHovered}
          fallback={
            <div className="absolute inset-0 bg-zinc-200 flex items-center justify-center text-zinc-400">
              No image
            </div>
          }
        />
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

      <CursorLabel label="watch" isVisible={isHovered} mousePos={mousePos} />

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
