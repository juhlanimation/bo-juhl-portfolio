// ============================================================================
// VIDEO PLAYER BLOCK
// Full-screen video player with GSAP wipe/expand animations
// ============================================================================
//
// NOTE: This component uses an IMPERATIVE API pattern, not the standard
// schema-driven settings pattern. This is intentional because:
//
// 1. VideoPlayer is a modal/overlay controlled by parent components
// 2. It uses isOpen/onClose props (like a dialog) rather than static settings
// 3. It's triggered programmatically from other components (ProjectCard, etc.)
// 4. The visual output isn't configurable in the builder - only its behavior
//
// The schema below is for potential future use if this becomes a standalone
// configurable block. Currently, it's a utility component used by sections.
// ============================================================================

export { VideoPlayer } from './video-player'

export type AnimationType = 'wipe-left' | 'wipe-right' | 'expand'

/**
 * Props for imperative VideoPlayer usage (current pattern)
 * Used when embedding VideoPlayer inside other components
 */
export interface VideoPlayerProps {
  videoUrl: string
  thumbnailUrl?: string
  isOpen: boolean
  onClose: () => void
  animationType: AnimationType
  // For expand animation - the source element's bounding rect
  sourceRect?: DOMRect | null
}

/**
 * Settings interface for potential schema-driven usage
 * Follows standard [key: string]: unknown pattern for extraction
 */
export interface VideoPlayerSettings {
  [key: string]: unknown
  animationDuration: number
  overlayColor: string
}

// ============================================================================
// SCHEMA DEFINITION
// ============================================================================

export const videoPlayerSchema = {
  animationDuration: {
    type: 'number',
    label: 'Animation Duration',
    defaultValue: 0.8,
    min: 0.2,
    max: 2,
    step: 0.1,
    group: 'Animation',
  },
  overlayColor: {
    type: 'color',
    label: 'Overlay Color',
    defaultValue: '#000000',
    group: 'Style',
  },
}

// ============================================================================
// COMPONENT CONFIG
// ============================================================================

export const videoPlayerConfig = {
  id: 'video-player',
  type: 'block',
  name: 'Video Player',
  description: 'Full-screen video player with animated transitions',
  category: 'Blocks',
  keywords: ['video', 'player', 'fullscreen', 'wipe', 'animation'],
  schema: videoPlayerSchema,
}
