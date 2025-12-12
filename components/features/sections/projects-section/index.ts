/**
 * Projects Section
 *
 * Section displaying 6 projects in alternating left/right layout.
 * White background, black text.
 */

// Re-export from shared types for backwards compatibility
export type { FeaturedProject as ProjectItem } from "@/lib/types"

// ============================================================================
// Settings Interface
// ============================================================================

export interface ProjectsSectionSettings {
  [key: string]: unknown
  // Style
  backgroundColor: string
  textColor: string
  paddingY: string
  gap: string
  // Content
  projectsJson: string
}

// ============================================================================
// Schema
// ============================================================================

export const projectsSectionSchema = {
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
  gap: {
    type: 'select',
    label: 'Gap Between Projects',
    defaultValue: '8rem',
    options: [
      { value: '4rem', label: 'Medium' },
      { value: '6rem', label: 'Large' },
      { value: '8rem', label: 'Extra Large' },
      { value: '12rem', label: 'Huge' },
    ],
    group: 'Style',
  },

  // Content Group
  projectsJson: {
    type: 'textarea',
    label: 'Projects (JSON)',
    defaultValue: '[]',
    placeholder: '[{"id": "1", "title": "Project", "description": "...", "thumbnailUrl": "", "videoUrl": ""}]',
    group: 'Content',
    description: 'JSON array of projects. Each project: {id, title, description, thumbnailUrl, videoUrl, client?, studio?}',
  },
} as const

// ============================================================================
// Config
// ============================================================================

export const projectsSectionConfig = {
  id: 'projects-section',
  type: 'section',
  name: 'Projects Section',
  description: 'Alternating left/right project layout with hover video',
  category: 'Sections',
  keywords: ['projects', 'portfolio', 'work', 'video', 'alternating'],
  schema: projectsSectionSchema,
}
