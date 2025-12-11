/**
 * Hero Section
 *
 * Full-screen section with video background and title overlay.
 * Contains: video-background block + hero-content-layout with hero-title blocks
 */

// ============================================================================
// Settings Interface
// ============================================================================

export interface HeroSectionSettings {
  [key: string]: unknown
  // Content
  name: string
  titles: string
  // Media
  videoUrl: string
  posterImage: string
  overlayOpacity: number
  // Style
  minHeight: string
  backgroundColor: string
}

// ============================================================================
// Schema
// ============================================================================

export const heroSectionSchema = {
  // Content Group
  name: {
    type: 'text',
    label: 'Name',
    defaultValue: "I'm Bo Juhl",
    placeholder: "I'm Your Name",
    group: 'Content',
  },
  titles: {
    type: 'textarea',
    label: 'Titles (one per line)',
    defaultValue: 'EXECUTIVE PRODUCER\nPRODUCER\nEDITOR',
    placeholder: 'TITLE ONE\nTITLE TWO\nTITLE THREE',
    group: 'Content',
    description: 'Enter each title on a new line',
  },

  // Media Group
  videoUrl: {
    type: 'url',
    label: 'Video URL',
    defaultValue: '',
    placeholder: 'https://...',
    group: 'Media',
  },
  posterImage: {
    type: 'image',
    label: 'Poster Image',
    defaultValue: '',
    group: 'Media',
  },
  overlayOpacity: {
    type: 'slider',
    label: 'Overlay Opacity',
    defaultValue: 0.3,
    min: 0,
    max: 1,
    step: 0.1,
    group: 'Media',
  },

  // Style Group
  minHeight: {
    type: 'select',
    label: 'Min Height',
    defaultValue: '100vh',
    options: [
      { value: '100vh', label: 'Full Screen' },
      { value: '80vh', label: '80% Screen' },
      { value: '60vh', label: '60% Screen' },
    ],
    group: 'Style',
  },
  backgroundColor: {
    type: 'color',
    label: 'Background Color',
    defaultValue: '#000000',
    group: 'Style',
  },
} as const

// ============================================================================
// Config
// ============================================================================

export const heroSectionConfig = {
  id: 'hero-section',
  type: 'section',
  name: 'Hero Section',
  description: 'Full-screen hero with video background and titles',
  category: 'Sections',
  keywords: ['hero', 'video', 'background', 'title', 'intro'],
  schema: heroSectionSchema,
}
