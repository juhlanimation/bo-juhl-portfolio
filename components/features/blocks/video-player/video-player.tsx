'use client'

import { useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useMounted, useVideoControls } from '@/lib/hooks'
import { useVideoPlayerAnimation, clearPlaybackPosition } from '@/lib/hooks/use-video-player-animation'
import { useVideoPlayerKeyboard } from '@/lib/hooks/use-video-player-keyboard'
import { TIMING } from '@/lib/constants/animations'
import { VideoPlayerProgress } from './video-player-progress'
import { VideoPlayerVolume } from './video-player-volume'
import type { VideoPlayerProps } from './index'

export function VideoPlayer({
  videoUrl,
  thumbnailUrl,
  isOpen,
  onClose,
  animationType,
  sourceRect,
}: VideoPlayerProps) {
  const isMounted = useMounted()

  // Use consolidated video controls hook
  const {
    state,
    progressBarRef,
    togglePlayPause,
    handleVolumeChange,
    toggleMute,
    handleSeekStart,
    updateCurrentTime,
    setDuration,
    handleControlsVisibility,
    setIsPlaying,
    formatTime,
  } = useVideoControls()

  const { isPlaying, volume, currentTime, duration, isSeeking, showControls } = state

  // Use extracted animation hook
  const {
    overlayRef,
    videoContainerRef,
    videoRef,
    showVideo,
    handleClose: animationClose,
  } = useVideoPlayerAnimation({
    isOpen,
    isMounted,
    animationType,
    sourceRect,
    videoUrl,
    onAnimationComplete: () => {},
  })

  // Handle close
  const handleClose = useCallback(() => {
    animationClose(onClose)
  }, [animationClose, onClose])

  // Handle center click for play/pause
  const handleCenterClick = useCallback(() => {
    togglePlayPause(videoRef.current)
  }, [togglePlayPause, videoRef])

  // Use extracted keyboard hook
  useVideoPlayerKeyboard({
    isOpen,
    onClose: handleClose,
    onTogglePlayPause: handleCenterClick,
  })

  if (!isMounted) return null

  const playerContent = (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] items-center justify-center"
      style={{ display: 'none' }}
      onMouseMove={handleControlsVisibility}
    >
      {/* Video container with clip-path animation */}
      <div
        ref={videoContainerRef}
        className="absolute inset-0 flex items-center justify-center bg-black"
      >
        {/* Video element */}
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
              updateCurrentTime(e.currentTarget.currentTime)
            }
          }}
          onLoadedMetadata={(e) => {
            setDuration(e.currentTarget.duration)
          }}
          onEnded={() => {
            setIsPlaying(false)
            clearPlaybackPosition(videoUrl)
            setTimeout(() => {
              handleClose()
            }, TIMING.VIDEO_AUTOCLOSE_DELAY)
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
          {/* Close button */}
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

          {/* Progress bar */}
          <VideoPlayerProgress
            progressBarRef={progressBarRef}
            currentTime={currentTime}
            duration={duration}
            formatTime={formatTime}
            onSeekStart={(e) => handleSeekStart(e, videoRef.current)}
          />

          {/* Volume control */}
          <VideoPlayerVolume
            volume={volume}
            onVolumeChange={(e) => handleVolumeChange(videoRef.current, parseFloat(e.target.value))}
            onToggleMute={() => toggleMute(videoRef.current)}
          />
        </div>
      </div>
    </div>
  )

  return createPortal(playerContent, document.body)
}
