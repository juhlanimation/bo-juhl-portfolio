"use client"

import { RefObject } from "react"

interface VideoPlayerProgressProps {
  progressBarRef: RefObject<HTMLDivElement | null>
  currentTime: number
  duration: number
  formatTime: (time: number) => string
  onSeekStart: (e: React.MouseEvent<HTMLDivElement>) => void
}

/**
 * VideoPlayerProgress - Progress bar with seeking functionality
 * SRP: Single responsibility for progress display and seeking
 */
export function VideoPlayerProgress({
  progressBarRef,
  currentTime,
  duration,
  formatTime,
  onSeekStart,
}: VideoPlayerProgressProps) {
  const progressPercent = duration ? (currentTime / duration) * 100 : 0

  return (
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
          onMouseDown={onSeekStart}
        >
          {/* Buffered indicator (optional visual) */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            {/* Progress fill */}
            <div
              className="h-full bg-white rounded-full transition-all duration-75"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Scrubber handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{ left: `calc(${progressPercent}% - 8px)` }}
          />
        </div>

        {/* Duration */}
        <span className="text-white/80 text-sm font-medium min-w-[45px] tabular-nums text-right">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  )
}
