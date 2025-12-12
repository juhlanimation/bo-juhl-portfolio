/**
 * Centralized animation and dimension constants
 * Prevents magic numbers scattered throughout the codebase
 */

// Animation durations in seconds (for GSAP and CSS transitions)
export const ANIMATION_DURATIONS = {
  /** Wipe animation for video player open/close */
  WIPE: 0.8,
  /** Fade animation for overlays and video */
  FADE: 0.3,
  /** Cursor label opacity transition */
  CURSOR_LABEL: 0.15,
  /** FadeIn component opacity transition */
  FADE_IN: 0.7,
} as const

// Timing constants in milliseconds
export const TIMING = {
  /** Auto-hide controls after inactivity */
  CONTROLS_TIMEOUT: 3000,
  /** Delay before auto-closing video after playback ends */
  VIDEO_AUTOCLOSE_DELAY: 1000,
  /** Ghost event threshold for touch detection */
  TOUCH_GHOST_EVENT_TIMEOUT: 500,
  /** Autoplay retry delay */
  AUTOPLAY_RETRY_DELAY: 500,
} as const

// Layout dimensions
export const DIMENSIONS = {
  /** Expanded thumbnail width in more-projects section */
  EXPANDED_THUMBNAIL_WIDTH: "32rem",
  /** Cursor label offset from cursor position */
  CURSOR_LABEL_OFFSET: { x: 24, y: 8 },
} as const

// Transition durations in milliseconds (for CSS transitions)
export const TRANSITION_DURATIONS = {
  /** Standard opacity transitions */
  OPACITY: 300,
  /** Hover state transitions */
  HOVER: 150,
} as const
