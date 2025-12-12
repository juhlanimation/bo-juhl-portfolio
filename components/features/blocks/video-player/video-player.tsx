'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { useSmoothScroll } from '@/components/providers/smooth-scroll-provider'
import type { VideoPlayerProps } from './index'

// Store video playback positions globally (persists across component lifecycles)
const videoPlaybackPositions = new Map<string, number>()

export function VideoPlayer({
  videoUrl,
  thumbnailUrl,
  isOpen,
  onClose,
  animationType,
  sourceRect,
}: VideoPlayerProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(0.5)
  const [isMounted, setIsMounted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [showVideo, setShowVideo] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isSeeking, setIsSeeking] = useState(false)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const smoothScroll = useSmoothScroll()

  // Handle mounting for portal (intentional SSR safety pattern)
  useEffect(() => {
     
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Handle open/close animations
  useEffect(() => {
    if (!isMounted || !overlayRef.current || !videoContainerRef.current || !videoRef.current) return

    const overlay = overlayRef.current
    const container = videoContainerRef.current
    const video = videoRef.current

    if (isOpen) {
      // Kill any existing animation
      timelineRef.current?.kill()

      // Reset state - video hidden during wipe (intentional synchronization with GSAP animation)
       
      setShowVideo(false)
      gsap.set(video, { opacity: 0 })

      // Set initial state
      gsap.set(overlay, { display: 'flex' })

      // Create new timeline for the wipe/expand animation
      timelineRef.current = gsap.timeline({
        onComplete: () => {
          // After wipe completes, fade in the video from black
          setShowVideo(true)

          // Restore saved playback position or start from beginning
          const savedPosition = videoPlaybackPositions.get(videoUrl)
          video.currentTime = savedPosition || 0

          video.play().catch(() => {})

          gsap.to(video, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.inOut',
          })
        },
      })

      if (animationType === 'wipe-left') {
        // Wipe from left to right
        gsap.set(container, { clipPath: 'inset(0 100% 0 0)' })
        timelineRef.current.to(container, {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.8,
          ease: 'power3.inOut',
        })
      } else if (animationType === 'wipe-right') {
        // Wipe from right to left
        gsap.set(container, { clipPath: 'inset(0 0 0 100%)' })
        timelineRef.current.to(container, {
          clipPath: 'inset(0 0 0 0%)',
          duration: 0.8,
          ease: 'power3.inOut',
        })
      } else if (animationType === 'expand' && sourceRect) {
        // Expand from source element
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        // Calculate initial position as percentage
        const initialTop = (sourceRect.top / viewportHeight) * 100
        const initialBottom = ((viewportHeight - sourceRect.bottom) / viewportHeight) * 100
        const initialLeft = (sourceRect.left / viewportWidth) * 100
        const initialRight = ((viewportWidth - sourceRect.right) / viewportWidth) * 100

        gsap.set(container, {
          clipPath: `inset(${initialTop}% ${initialRight}% ${initialBottom}% ${initialLeft}%)`,
        })

        timelineRef.current.to(container, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.8,
          ease: 'power3.inOut',
        })
      }

      // Prevent body scroll and stop smooth scroll
      document.body.style.overflow = 'hidden'
      smoothScroll?.stop()
    }

    return () => {
      document.body.style.overflow = ''
      smoothScroll?.start()
    }
    // videoUrl is accessed inside callbacks, not as a reactive dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isMounted, animationType, sourceRect, smoothScroll])

  // Handle close with reverse animation
  const handleClose = useCallback(() => {
    if (!timelineRef.current || !overlayRef.current || !videoContainerRef.current || !videoRef.current) {
      onClose()
      return
    }

    const video = videoRef.current

    // Save current playback position for resume on reopen
    if (video.currentTime > 0 && video.currentTime < video.duration) {
      videoPlaybackPositions.set(videoUrl, video.currentTime)
    }

    // Fade video out to black, then reverse the wipe
    gsap.to(video, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        // Pause video
        video.pause()
        setShowVideo(false)

        // Now reverse the wipe animation
        timelineRef.current?.reverse()

        // Wait for animation to complete, then close
        timelineRef.current?.eventCallback('onReverseComplete', () => {
          gsap.set(overlayRef.current, { display: 'none' })
          document.body.style.overflow = ''
          smoothScroll?.start()
          onClose()
        })
      }
    })
  }, [onClose, videoUrl, smoothScroll])

  // Handle play/pause on center click
  const handleCenterClick = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play().catch(() => {})
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }, [])

  // Handle volume change
  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      videoRef.current.muted = newVolume === 0
    }
  }, [])

  // Format time as mm:ss
  const formatTime = useCallback((time: number) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }, [])

  // Handle seeking via progress bar
  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = progressBarRef.current
    const video = videoRef.current
    if (!progressBar || !video || !duration) return

    const rect = progressBar.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(1, clickX / rect.width))
    const newTime = percentage * duration

    video.currentTime = newTime
    setCurrentTime(newTime)
  }, [duration])

  // Handle drag seeking
  const handleSeekStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsSeeking(true)
    handleSeek(e)

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const progressBar = progressBarRef.current
      const video = videoRef.current
      if (!progressBar || !video || !duration) return

      const rect = progressBar.getBoundingClientRect()
      const clickX = moveEvent.clientX - rect.left
      const percentage = Math.max(0, Math.min(1, clickX / rect.width))
      const newTime = percentage * duration

      video.currentTime = newTime
      setCurrentTime(newTime)
    }

    const handleMouseUp = () => {
      setIsSeeking(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [duration, handleSeek])

  // Show/hide controls on mouse move
  const handleMouseMove = useCallback(() => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }, [isPlaying])

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      } else if (e.key === ' ' && isOpen) {
        e.preventDefault()
        handleCenterClick()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleClose, handleCenterClick])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [])

  if (!isMounted) return null

  const playerContent = (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] items-center justify-center"
      style={{ display: 'none' }}
      onMouseMove={handleMouseMove}
    >
      {/* Video container with clip-path animation - black background during wipe */}
      <div
        ref={videoContainerRef}
        className="absolute inset-0 flex items-center justify-center bg-black"
      >
        {/* Video - fades in after wipe completes */}
        <video
          ref={videoRef}
          src={videoUrl}
          poster={thumbnailUrl}
          className="absolute inset-0 w-full h-full object-contain"
          style={{ opacity: 0 }}
          playsInline
          preload="auto"
          onClick={handleCenterClick}
          onTimeUpdate={(e) => {
            if (!isSeeking) {
              setCurrentTime(e.currentTarget.currentTime)
            }
          }}
          onLoadedMetadata={(e) => {
            setDuration(e.currentTarget.duration)
          }}
          onEnded={() => {
            setIsPlaying(false)
            // Clear saved position when video completes
            videoPlaybackPositions.delete(videoUrl)
            // Auto-close after video ends (with a small delay for UX)
            setTimeout(() => {
              handleClose()
            }, 1000)
          }}
        />

        {/* Play/Pause indicator overlay */}
        {!isPlaying && showVideo && (
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={handleCenterClick}
          >
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {/* Controls overlay */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
            showControls && showVideo ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Close button - top left */}
          <button
            onClick={handleClose}
            className="absolute top-6 left-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors pointer-events-auto cursor-pointer"
            aria-label="Close video"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Progress bar - bottom */}
          <div className="absolute bottom-24 left-8 right-8 pointer-events-auto">
            <div className="flex items-center gap-3">
              {/* Current time */}
              <span className="text-white/80 text-sm font-medium min-w-[45px] tabular-nums">
                {formatTime(currentTime)}
              </span>

              {/* Progress bar track */}
              <div
                ref={progressBarRef}
                className="flex-1 h-1.5 bg-white/20 rounded-full cursor-pointer group relative"
                onMouseDown={handleSeekStart}
              >
                {/* Buffered indicator (optional visual) */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  {/* Progress fill */}
                  <div
                    className="h-full bg-white rounded-full transition-all duration-75"
                    style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
                  />
                </div>

                {/* Scrubber handle */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ left: duration ? `calc(${(currentTime / duration) * 100}% - 8px)` : '-8px' }}
                />
              </div>

              {/* Duration */}
              <span className="text-white/80 text-sm font-medium min-w-[45px] tabular-nums text-right">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume control - bottom center */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-3 rounded-full bg-white/10 backdrop-blur-sm pointer-events-auto">
            {/* Volume icon */}
            <button
              onClick={() => {
                const newVolume = volume === 0 ? 0.5 : 0
                setVolume(newVolume)
                if (videoRef.current) {
                  videoRef.current.volume = newVolume
                  videoRef.current.muted = newVolume === 0
                }
              }}
              className="text-white hover:text-white/80 transition-colors"
              aria-label={volume === 0 ? 'Unmute' : 'Mute'}
            >
              {volume === 0 ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : volume < 0.5 ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>

            {/* Volume slider */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
              aria-label="Volume"
            />
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(playerContent, document.body)
}
