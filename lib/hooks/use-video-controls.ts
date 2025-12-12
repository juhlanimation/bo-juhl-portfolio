"use client"

import { useState, useCallback, useRef, useEffect, RefObject } from "react"
import { TIMING } from "@/lib/constants/animations"

interface VideoControlsState {
  isPlaying: boolean
  volume: number
  currentTime: number
  duration: number
  isSeeking: boolean
  showControls: boolean
}

interface UseVideoControlsReturn {
  state: VideoControlsState
  progressBarRef: RefObject<HTMLDivElement | null>
  /** Toggle play/pause */
  togglePlayPause: (video: HTMLVideoElement | null) => void
  /** Handle volume change from slider */
  handleVolumeChange: (video: HTMLVideoElement | null, newVolume: number) => void
  /** Toggle mute/unmute */
  toggleMute: (video: HTMLVideoElement | null) => void
  /** Handle seeking via progress bar click */
  handleSeek: (e: React.MouseEvent<HTMLDivElement>, video: HTMLVideoElement | null) => void
  /** Start drag seeking */
  handleSeekStart: (e: React.MouseEvent<HTMLDivElement>, video: HTMLVideoElement | null) => void
  /** Update current time (for video onTimeUpdate) */
  updateCurrentTime: (time: number) => void
  /** Set duration (for video onLoadedMetadata) */
  setDuration: (duration: number) => void
  /** Handle mouse movement to show/hide controls */
  handleControlsVisibility: () => void
  /** Set playing state externally */
  setIsPlaying: (playing: boolean) => void
  /** Format time as mm:ss */
  formatTime: (time: number) => string
}

/**
 * Hook to manage video player controls state and handlers
 * DRY: Consolidates all video control logic from VideoPlayer
 * SRP: Single responsibility for video playback control state
 */
export function useVideoControls(): UseVideoControlsReturn {
  const [state, setState] = useState<VideoControlsState>({
    isPlaying: true,
    volume: 0.5,
    currentTime: 0,
    duration: 0,
    isSeeking: false,
    showControls: true,
  })

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const dragCleanupRef = useRef<(() => void) | null>(null)

  // Cleanup drag listeners on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      dragCleanupRef.current?.()
    }
  }, [])

  const togglePlayPause = useCallback((video: HTMLVideoElement | null) => {
    if (!video) return

    if (video.paused) {
      video.play().catch(() => {})
      setState((prev) => ({ ...prev, isPlaying: true }))
    } else {
      video.pause()
      setState((prev) => ({ ...prev, isPlaying: false }))
    }
  }, [])

  const handleVolumeChange = useCallback((video: HTMLVideoElement | null, newVolume: number) => {
    setState((prev) => ({ ...prev, volume: newVolume }))
    if (video) {
      video.volume = newVolume
      video.muted = newVolume === 0
    }
  }, [])

  const toggleMute = useCallback((video: HTMLVideoElement | null) => {
    setState((prev) => {
      const newVolume = prev.volume === 0 ? 0.5 : 0
      if (video) {
        video.volume = newVolume
        video.muted = newVolume === 0
      }
      return { ...prev, volume: newVolume }
    })
  }, [])

  const calculateSeekPosition = useCallback(
    (clientX: number, video: HTMLVideoElement | null): number | null => {
      const progressBar = progressBarRef.current
      if (!progressBar || !video || !state.duration) return null

      const rect = progressBar.getBoundingClientRect()
      const clickX = clientX - rect.left
      const percentage = Math.max(0, Math.min(1, clickX / rect.width))
      return percentage * state.duration
    },
    [state.duration]
  )

  const handleSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, video: HTMLVideoElement | null) => {
      const newTime = calculateSeekPosition(e.clientX, video)
      if (newTime !== null && video) {
        video.currentTime = newTime
        setState((prev) => ({ ...prev, currentTime: newTime }))
      }
    },
    [calculateSeekPosition]
  )

  const handleSeekStart = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, video: HTMLVideoElement | null) => {
      // Clean up any existing drag listeners first
      dragCleanupRef.current?.()

      setState((prev) => ({ ...prev, isSeeking: true }))
      handleSeek(e, video)

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const newTime = calculateSeekPosition(moveEvent.clientX, video)
        if (newTime !== null && video) {
          video.currentTime = newTime
          setState((prev) => ({ ...prev, currentTime: newTime }))
        }
      }

      const handleMouseUp = () => {
        setState((prev) => ({ ...prev, isSeeking: false }))
        cleanup()
      }

      const cleanup = () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        dragCleanupRef.current = null
      }

      // Store cleanup function for unmount safety
      dragCleanupRef.current = cleanup

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    },
    [calculateSeekPosition, handleSeek]
  )

  const updateCurrentTime = useCallback((time: number) => {
    setState((prev) => (prev.isSeeking ? prev : { ...prev, currentTime: time }))
  }, [])

  const setDuration = useCallback((duration: number) => {
    setState((prev) => ({ ...prev, duration }))
  }, [])

  const setIsPlaying = useCallback((playing: boolean) => {
    setState((prev) => ({ ...prev, isPlaying: playing }))
  }, [])

  const handleControlsVisibility = useCallback(() => {
    setState((prev) => ({ ...prev, showControls: true }))

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }

    controlsTimeoutRef.current = setTimeout(() => {
      setState((prev) => (prev.isPlaying ? { ...prev, showControls: false } : prev))
    }, TIMING.CONTROLS_TIMEOUT)
  }, [])

  const formatTime = useCallback((time: number): string => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }, [])

  return {
    state,
    progressBarRef,
    togglePlayPause,
    handleVolumeChange,
    toggleMute,
    handleSeek,
    handleSeekStart,
    updateCurrentTime,
    setDuration,
    handleControlsVisibility,
    setIsPlaying,
    formatTime,
  }
}
