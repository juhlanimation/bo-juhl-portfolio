/**
 * Project Card Block
 *
 * A card displaying a project with hover effects:
 * - Scale animation on hover
 * - Video playback on hover
 * - Thumbnail fallback
 */

// ============================================================================
// Settings Interface
// ============================================================================

export interface ProjectCardSettings {
  [key: string]: unknown
  // Content
  title: string
  description: string
  link: string
  // Media
  thumbnailUrl: string
  videoUrl: string
  aspectRatio: string
  // Animation
  hoverScale: number
  playVideoOnHover: boolean
  transitionDuration: number
  transitionEasing: string
}

// ============================================================================
// Schema
// ============================================================================

export const projectCardSchema = {
  // ─────────────────────────────────────────────────────────────────────────
  // Content Group
  // ─────────────────────────────────────────────────────────────────────────
  title: {
    type: 'text',
    label: 'Project Title',
    defaultValue: 'Project Name',
    placeholder: 'Enter project title...',
    group: 'Content',
  },
  description: {
    type: 'textarea',
    label: 'Description',
    defaultValue: '',
    placeholder: 'Brief project description...',
    group: 'Content',
  },
  link: {
    type: 'url',
    label: 'Project Link',
    defaultValue: '',
    placeholder: 'https://...',
    group: 'Content',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Media Group
  // ─────────────────────────────────────────────────────────────────────────
  thumbnailUrl: {
    type: 'image',
    label: 'Thumbnail',
    defaultValue: '',
    group: 'Media',
  },
  videoUrl: {
    type: 'url',
    label: 'Video URL',
    defaultValue: '',
    placeholder: 'https://...',
    group: 'Media',
  },
  aspectRatio: {
    type: 'select',
    label: 'Aspect Ratio',
    defaultValue: '16/9',
    options: [
      { value: '1/1', label: 'Square (1:1)' },
      { value: '16/9', label: 'Widescreen (16:9)' },
      { value: '4/3', label: 'Standard (4:3)' },
      { value: '21/9', label: 'Ultrawide (21:9)' },
    ],
    group: 'Media',
    width: 'half',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Animation Group
  // ─────────────────────────────────────────────────────────────────────────
  playVideoOnHover: {
    type: 'switch',
    label: 'Play Video on Hover',
    defaultValue: true,
    group: 'Animation',
    width: 'half',
  },
  hoverScale: {
    type: 'slider',
    label: 'Hover Scale',
    defaultValue: 1.05,
    min: 1,
    max: 1.3,
    step: 0.01,
    group: 'Animation',
    width: 'half',
  },
  transitionDuration: {
    type: 'slider',
    label: 'Duration (ms)',
    defaultValue: 300,
    min: 100,
    max: 800,
    step: 50,
    group: 'Animation',
    width: 'half',
  },
  transitionEasing: {
    type: 'select',
    label: 'Easing',
    defaultValue: 'ease-out',
    options: [
      { value: 'linear', label: 'Linear' },
      { value: 'ease', label: 'Ease' },
      { value: 'ease-in', label: 'Ease In' },
      { value: 'ease-out', label: 'Ease Out' },
      { value: 'ease-in-out', label: 'Ease In Out' },
      { value: 'cubic-bezier(0.16, 1, 0.3, 1)', label: 'Expo Out' },
    ],
    group: 'Animation',
    width: 'half',
  },
} as const

// ============================================================================
// Config
// ============================================================================

export const projectCardConfig = {
  id: 'project-card',
  type: 'block',
  name: 'Project Card',
  description: 'Project showcase with video hover',
  category: 'Media',
  keywords: ['project', 'film', 'video', 'portfolio', 'work', 'card'],
  schema: projectCardSchema,
}
