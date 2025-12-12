/**
 * More Projects Section
 *
 * Horizontal row of 7 expandable project thumbnails.
 * Only one can be expanded at a time.
 * White background, black text.
 */

// Re-export from shared types for backwards compatibility
export type { CompactProject as MoreProjectItem } from "@/lib/types"

// ============================================================================
// Settings Interface
// ============================================================================

export interface MoreProjectsSectionSettings {
  [key: string]: unknown
  // Content
  title: string
  dateRange: string
  projectsJson: string
  // Style
  backgroundColor: string
  textColor: string
  paddingY: string
  // Animation
  expandScale: number
  transitionDuration: number
}

// ============================================================================
// Schema
// ============================================================================

export const moreProjectsSectionSchema = {
  // Content Group
  title: {
    type: 'text',
    label: 'Section Title',
    defaultValue: 'OTHER SELECTED PROJECTS',
    group: 'Content',
  },
  dateRange: {
    type: 'text',
    label: 'Date Range',
    defaultValue: '2018-2024',
    placeholder: '2018-2024',
    group: 'Content',
  },
  projectsJson: {
    type: 'textarea',
    label: 'Projects (JSON)',
    defaultValue: '[]',
    placeholder: '[{"id": "1", "title": "Project", "date": "2024", "client": "Client Name", "productionCompany": "Studio Name", "thumbnailUrl": "", "videoUrl": ""}]',
    group: 'Content',
    description: 'JSON array of projects. Each project: {id, title, date?, client?, productionCompany?, thumbnailUrl, videoUrl, fullLengthVideoUrl?}',
  },

  // Style Group
  backgroundColor: {
    type: 'color',
    label: 'Background Color',
    defaultValue: '#ffffff',
    group: 'Style',
    width: 'half',
  },
  textColor: {
    type: 'color',
    label: 'Text Color',
    defaultValue: '#000000',
    group: 'Style',
    width: 'half',
  },
  paddingY: {
    type: 'select',
    label: 'Vertical Padding',
    defaultValue: 'xl',
    options: [
      { value: 'md', label: 'Medium' },
      { value: 'lg', label: 'Large' },
      { value: 'xl', label: 'Extra Large' },
    ],
    group: 'Style',
  },

  // Animation Group
  expandScale: {
    type: 'slider',
    label: 'Expand Scale',
    defaultValue: 2,
    min: 1.5,
    max: 4,
    step: 0.5,
    group: 'Animation',
  },
  transitionDuration: {
    type: 'slider',
    label: 'Transition Duration (ms)',
    defaultValue: 400,
    min: 200,
    max: 800,
    step: 50,
    group: 'Animation',
  },
} as const

// ============================================================================
// Config
// ============================================================================

export const moreProjectsSectionConfig = {
  id: 'more-projects-section',
  type: 'section',
  name: 'More Projects Section',
  description: 'Horizontal expandable project thumbnails',
  category: 'Sections',
  keywords: ['projects', 'thumbnails', 'expand', 'horizontal', 'gallery'],
  schema: moreProjectsSectionSchema,
}
