/**
 * Projects Section
 *
 * A full-page section showcasing projects with:
 * - Section title and subtitle
 * - Background styling
 * - Container for project cards
 */

// ============================================================================
// Settings Interface
// ============================================================================

export interface ProjectsSectionSettings {
  [key: string]: unknown
  // Content
  title: string
  subtitle: string
  showTitle: boolean
  // Style
  backgroundColor: string
  textColor: string
  minHeight: string
  paddingY: string
  // Layout
  containerWidth: string
  contentAlignment: string
}

// ============================================================================
// Schema
// ============================================================================

export const projectsSectionSchema = {
  // ─────────────────────────────────────────────────────────────────────────
  // Content Group
  // ─────────────────────────────────────────────────────────────────────────
  showTitle: {
    type: 'switch',
    label: 'Show Title',
    defaultValue: true,
    group: 'Content',
    width: 'half',
  },
  title: {
    type: 'text',
    label: 'Section Title',
    defaultValue: 'Selected Work',
    placeholder: 'Enter section title...',
    group: 'Content',
    showWhen: (settings: Record<string, unknown>) => settings.showTitle === true,
  },
  subtitle: {
    type: 'textarea',
    label: 'Subtitle',
    defaultValue: '',
    placeholder: 'Optional section description...',
    group: 'Content',
    showWhen: (settings: Record<string, unknown>) => settings.showTitle === true,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Style Group
  // ─────────────────────────────────────────────────────────────────────────
  backgroundColor: {
    type: 'color',
    label: 'Background',
    defaultValue: '#000000',
    group: 'Style',
    width: 'half',
  },
  textColor: {
    type: 'color',
    label: 'Text Color',
    defaultValue: '#ffffff',
    group: 'Style',
    width: 'half',
  },
  minHeight: {
    type: 'select',
    label: 'Min Height',
    defaultValue: 'auto',
    options: [
      { value: 'auto', label: 'Auto' },
      { value: '50vh', label: 'Half Screen' },
      { value: '100vh', label: 'Full Screen' },
    ],
    group: 'Style',
    width: 'half',
  },
  paddingY: {
    type: 'select',
    label: 'Vertical Padding',
    defaultValue: 'xl',
    options: [
      { value: 'none', label: 'None' },
      { value: 'sm', label: 'Small (2rem)' },
      { value: 'md', label: 'Medium (4rem)' },
      { value: 'lg', label: 'Large (6rem)' },
      { value: 'xl', label: 'Extra Large (8rem)' },
    ],
    group: 'Style',
    width: 'half',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Layout Group
  // ─────────────────────────────────────────────────────────────────────────
  containerWidth: {
    type: 'select',
    label: 'Container Width',
    defaultValue: 'xl',
    options: [
      { value: 'full', label: 'Full Width' },
      { value: 'lg', label: 'Large (1024px)' },
      { value: 'xl', label: 'Extra Large (1280px)' },
      { value: '2xl', label: '2XL (1536px)' },
    ],
    group: 'Layout',
    width: 'half',
  },
  contentAlignment: {
    type: 'select',
    label: 'Title Alignment',
    defaultValue: 'center',
    options: [
      { value: 'left', label: 'Left' },
      { value: 'center', label: 'Center' },
      { value: 'right', label: 'Right' },
    ],
    group: 'Layout',
    width: 'half',
  },
} as const

// ============================================================================
// Config
// ============================================================================

export const projectsSectionConfig = {
  id: 'projects-section',
  type: 'section',
  name: 'Projects Section',
  description: 'Showcase section for featured work',
  category: 'Sections',
  keywords: ['projects', 'work', 'portfolio', 'section', 'showcase'],
  schema: projectsSectionSchema,
}
