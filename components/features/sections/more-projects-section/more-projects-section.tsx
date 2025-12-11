'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { gsap } from 'gsap'
import type { MoreProjectsSectionSettings, MoreProjectItem } from './index'
import { VideoPlayer } from '../../blocks/video-player'
import { useLenis } from '@/components/providers/smooth-scroll-provider'

interface Props {
  settings: MoreProjectsSectionSettings
  isSelected?: boolean
}

const paddingMap: Record<string, string> = {
  md: '4rem',
  lg: '6rem',
  xl: '8rem',
}

// Placeholder projects for preview - from "OTHER PROJECTS" section
const placeholderProjects: MoreProjectItem[] = [
  { id: '1', title: 'SCENERY AND SENTIMENT | GENSHIN IMPACT', date: '2023', role: 'Executive Producer', client: 'HOYOVERSE', productionCompany: 'SUN CREATURE', thumbnailUrl: '', videoUrl: '' },
  { id: '2', title: "IT'S ON!", date: '2018', role: 'Executive Producer, Editor', client: 'RIOT GAMES', productionCompany: 'SUN CREATURE', thumbnailUrl: '', videoUrl: '' },
  { id: '3', title: 'MARVEL MIDNIGHT SUN', date: '2022', role: 'Executive Producer', client: '2K GAMES', productionCompany: 'SUN CREATURE', thumbnailUrl: '', videoUrl: '' },
  { id: '4', title: 'NINJAGO LEGACY', date: '2021', role: 'Executive Producer', client: 'LEGO', productionCompany: 'SUN CREATURE', thumbnailUrl: '', videoUrl: '' },
  { id: '5', title: 'THE GOBLIN QUEEN', date: '2024', role: 'Executive Producer', client: 'SUPERCELL', productionCompany: 'SUN CREATURE', thumbnailUrl: '', videoUrl: '' },
  { id: '6', title: 'THE PATH, AN IONIAN MYTH', date: '2020', role: 'Executive Producer, Editor', client: 'RIOT GAMES', productionCompany: 'SUN CREATURE', thumbnailUrl: '', videoUrl: '' },
  { id: '7', title: 'ONLY SLIGHTLY EXAGGERATED', date: '2019', role: 'Executive Producer', client: 'TRAVEL OREGON', productionCompany: 'SUN CREATURE', thumbnailUrl: '', videoUrl: '' },
]

function ExpandableThumbnail({
  project,
  isExpanded,
  onExpand,
  onPlayerOpenChange,
  expandScale,
  transitionDuration,
  lenis,
}: {
  project: MoreProjectItem
  isExpanded: boolean
  onExpand: () => void
  onPlayerOpenChange: (isOpen: boolean) => void
  expandScale: number
  transitionDuration: number
  lenis: any
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const blackOverlayRef = useRef<HTMLDivElement>(null)
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null)

  // Keep video playing when expanded OR when player is open (for seamless transition)
  const showVideo = isExpanded || isPlayerOpen

  useEffect(() => {
    if (showVideo && videoRef.current && project.videoUrl) {
      videoRef.current.play().catch(() => {})
    } else if (!showVideo && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [showVideo, project.videoUrl])

  const handleClick = useCallback(() => {
    if (project.videoUrl && containerRef.current && blackOverlayRef.current) {
      // Store the bounding rect for the expand animation
      const rect = containerRef.current.getBoundingClientRect()

      // Adjust for Lenis smooth scroll offset
      // Lenis uses transforms which don't affect getBoundingClientRect,
      // so we need to add the scroll value to get the true viewport position
      const scrollY = lenis?.lenis?.scroll || 0

      // Calculate scrollbar width (the gutter shift when scrollbar disappears)
      // scrollbar-gutter: stable reserves space, so when overflow:hidden is applied,
      // the scrollbar disappears but gutter remains, shifting content right
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

      const adjustedRect = new DOMRect(
        rect.x + scrollbarWidth,
        rect.y + scrollY,
        rect.width,
        rect.height
      )

      setSourceRect(adjustedRect)

      // Fade thumbnail to black first, then open player
      gsap.to(blackOverlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.inOut',
        onComplete: () => {
          setIsPlayerOpen(true)
          onPlayerOpenChange(true)
        }
      })
    }
  }, [project.videoUrl, onPlayerOpenChange, lenis])

  const handleClose = useCallback(() => {
    setIsPlayerOpen(false)
    onPlayerOpenChange(false)

    // Fade the black overlay back out - player animation is already complete when onClose fires
    if (blackOverlayRef.current) {
      gsap.to(blackOverlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      })
    }
  }, [onPlayerOpenChange])

  return (
    <>
    {/* Video container - only this expands */}
    <div
      ref={containerRef}
      className="relative overflow-hidden cursor-pointer"
      style={{
        // Stay expanded while player is open
        flex: (isExpanded || isPlayerOpen) ? expandScale : 1,
        transition: `flex ${transitionDuration}ms ease-out`,
        minWidth: 0,
        height: '100%',
      }}
      onMouseEnter={onExpand}
      onClick={handleClick}
    >
      {project.thumbnailUrl ? (
        <img
          src={project.thumbnailUrl}
          alt={project.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            showVideo && project.videoUrl ? 'opacity-0' : 'opacity-100'
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
            showVideo ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Black overlay for fade transition */}
      <div
        ref={blackOverlayRef}
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ opacity: 0 }}
      />
    </div>

    {/* Full-screen video player with expand animation */}
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

export function MoreProjectsSection({ settings, isSelected }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isAnyPlayerOpen, setIsAnyPlayerOpen] = useState(false)
  const lenis = useLenis()

  // Parse projects from JSON string
  let projects: MoreProjectItem[] = placeholderProjects
  try {
    const parsed = JSON.parse(settings.projectsJson || '[]')
    if (Array.isArray(parsed) && parsed.length > 0) {
      projects = parsed
    }
  } catch {
    // Use placeholder if JSON is invalid
  }

  // Handle mouse leave - only collapse if no player is open
  const handleMouseLeave = () => {
    if (!isAnyPlayerOpen) {
      setExpandedId(null)
    }
  }

  return (
    <section
      style={{
        backgroundColor: settings.backgroundColor,
        color: settings.textColor,
        paddingTop: paddingMap[settings.paddingY] || '8rem',
        paddingBottom: paddingMap[settings.paddingY] || '8rem',
      }}
      className={`hidden md:block ${isSelected ? 'ring-2 ring-primary' : ''}`}
    >
      <div className="content-container px-10">
        <div className="w-full">
        {/* Section title */}
        <div className="flex justify-start mb-8">
          <div className="flex flex-col">
            <h2 className="font-title text-xs font-bold uppercase text-right">
              {settings.title || 'OTHER SELECTED PROJECTS'}
            </h2>
            <span className="font-paragraph text-xs text-right">
              {settings.dateRange || '2018-2024'}
            </span>
          </div>
        </div>

        {/* Horizontal thumbnails container - only videos */}
        <div
          className="flex gap-1 mt-9 overflow-visible"
          style={{
            height: '32rem',
          }}
          onMouseLeave={handleMouseLeave}
        >
          {projects.map((project) => (
            <ExpandableThumbnail
              key={project.id}
              project={project}
              isExpanded={expandedId === project.id}
              onExpand={() => setExpandedId(project.id)}
              onPlayerOpenChange={setIsAnyPlayerOpen}
              expandScale={settings.expandScale}
              transitionDuration={settings.transitionDuration}
              lenis={lenis}
            />
          ))}
        </div>

        {/* Labels row - matches video flex values to stay aligned */}
        <div className="flex gap-1 mt-1 h-24" style={{ color: settings.textColor }}>
          {projects.map((project) => (
            <div
              key={project.id}
              className="min-w-0"
              style={{
                flex: expandedId === project.id ? settings.expandScale : 1,
                transition: `flex ${settings.transitionDuration}ms ease-out`,
              }}
            >
              <div
                className={`font-paragraph flex justify-between px-3 text-xs py-2 transition-opacity duration-300 ${
                  expandedId === project.id && !isAnyPlayerOpen ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  pointerEvents: expandedId === project.id ? 'auto' : 'none',
                }}
              >
                {/* Left column: Date, Role */}
                <div className="flex flex-col gap-1.5 items-start flex-1 min-w-0 pr-2">
                  <span className="opacity-60 text-xs whitespace-nowrap overflow-hidden text-ellipsis block">{project.date}</span>
                  <span className="opacity-60 uppercase text-xs leading-tight whitespace-nowrap overflow-hidden text-ellipsis block">{project.role}</span>
                </div>

                {/* Right column: Title, Client, Studio */}
                <div className="flex flex-col gap-1.5 items-end text-right flex-1 min-w-0 pl-2">
                  <span className="font-bold uppercase text-xs leading-tight whitespace-nowrap overflow-hidden text-ellipsis block">{project.title}</span>
                  <span className="opacity-60 text-xs leading-tight uppercase whitespace-nowrap overflow-hidden text-ellipsis block">{project.client}</span>
                  <span className="opacity-60 text-xs leading-tight uppercase whitespace-nowrap overflow-hidden text-ellipsis block">{project.productionCompany}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}
