/**
 * Unified project type definitions
 * LSP: All project types extend BaseProject, ensuring substitutability
 * ISP: Separated into focused interfaces that can be composed
 */

/**
 * Base project properties shared by all project types
 */
export interface BaseProject {
  id: string
  title: string
  thumbnailUrl: string
  videoUrl: string // Hover video
  fullLengthVideoUrl?: string // Full-length video for player
}

/**
 * Extended project for featured projects section
 * Includes description and attribution info
 */
export interface FeaturedProject extends BaseProject {
  description: string
  client?: string
  studio?: string
}

/**
 * Extended project for "more projects" section
 * Includes date/role info and production company
 */
export interface CompactProject extends BaseProject {
  date?: string
  role?: string
  client?: string
  productionCompany?: string
}

// Legacy type aliases for backwards compatibility during migration
export type ProjectItem = FeaturedProject
export type MoreProjectItem = CompactProject
