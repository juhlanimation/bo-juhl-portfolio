/**
 * Projects Grid Layout
 *
 * A responsive grid layout for displaying project cards.
 * Handles column count and gap at different breakpoints.
 */

// ============================================================================
// Settings Interface
// ============================================================================

export interface ProjectsGridSettings {
  [key: string]: unknown
  // Layout
  columns: number
  columnsMobile: number
  gap: string
  // Style
  maxWidth: string
  centerContent: boolean
}

// ============================================================================
// Schema
// ============================================================================

export const projectsGridSchema = {
  // ─────────────────────────────────────────────────────────────────────────
  // Layout Group
  // ─────────────────────────────────────────────────────────────────────────
  columns: {
    type: 'slider',
    label: 'Columns (Desktop)',
    defaultValue: 3,
    min: 1,
    max: 6,
    step: 1,
    group: 'Layout',
    width: 'half',
  },
  columnsMobile: {
    type: 'slider',
    label: 'Columns (Mobile)',
    defaultValue: 1,
    min: 1,
    max: 3,
    step: 1,
    group: 'Layout',
    width: 'half',
  },
  gap: {
    type: 'select',
    label: 'Gap',
    defaultValue: 'md',
    options: [
      { value: 'none', label: 'None' },
      { value: 'xs', label: 'Extra Small (8px)' },
      { value: 'sm', label: 'Small (16px)' },
      { value: 'md', label: 'Medium (24px)' },
      { value: 'lg', label: 'Large (32px)' },
      { value: 'xl', label: 'Extra Large (48px)' },
    ],
    group: 'Layout',
    width: 'half',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Style Group
  // ─────────────────────────────────────────────────────────────────────────
  maxWidth: {
    type: 'select',
    label: 'Max Width',
    defaultValue: 'none',
    options: [
      { value: 'none', label: 'None (Full Width)' },
      { value: 'sm', label: 'Small (640px)' },
      { value: 'md', label: 'Medium (768px)' },
      { value: 'lg', label: 'Large (1024px)' },
      { value: 'xl', label: 'Extra Large (1280px)' },
      { value: '2xl', label: '2XL (1536px)' },
    ],
    group: 'Style',
    width: 'half',
  },
  centerContent: {
    type: 'switch',
    label: 'Center Content',
    defaultValue: true,
    group: 'Style',
    width: 'half',
  },
} as const

// ============================================================================
// Config
// ============================================================================

export const projectsGridConfig = {
  id: 'projects-grid',
  type: 'layout',
  name: 'Projects Grid',
  description: 'Responsive grid for project cards',
  category: 'Grids',
  keywords: ['grid', 'projects', 'portfolio', 'gallery', 'cards'],
  schema: projectsGridSchema,
}
