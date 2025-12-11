/**
 * About Section
 *
 * Split layout section with image and text, plus logo marquee.
 * Black background, white text.
 */

// ============================================================================
// Settings Interface
// ============================================================================

export interface AboutSectionSettings {
  [key: string]: unknown
  // Style
  backgroundColor: string
  textColor: string
  paddingY: string
  // Content
  title: string
  imageUrl: string
  paragraph: string
  // Marquee
  logos: string
  marqueeSpeed: number
  // Navigation (from hero)
  heroName?: string
}

// ============================================================================
// Schema
// ============================================================================

export const aboutSectionSchema = {
  // Style Group
  backgroundColor: {
    type: 'color',
    label: 'Background Color',
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

  // Content Group
  title: {
    type: 'text',
    label: 'Title',
    defaultValue: 'ABOUT ME',
    group: 'Content',
  },
  imageUrl: {
    type: 'image',
    label: 'About Image',
    defaultValue: '',
    group: 'Content',
  },
  paragraph: {
    type: 'textarea',
    label: 'About Text',
    defaultValue: '',
    placeholder: 'Enter about text...',
    group: 'Content',
  },

  // Marquee Group
  logos: {
    type: 'textarea',
    label: 'Logo URLs (one per line)',
    defaultValue: '',
    placeholder: '/clients/logo1.png\n/clients/logo2.png',
    group: 'Marquee',
    description: 'Enter image URLs for client logos, one per line',
  },
  marqueeSpeed: {
    type: 'slider',
    label: 'Marquee Speed (seconds)',
    defaultValue: 30,
    min: 10,
    max: 60,
    step: 5,
    group: 'Marquee',
  },
} as const

// ============================================================================
// Config
// ============================================================================

export const aboutSectionConfig = {
  id: 'about-section',
  type: 'section',
  name: 'About Section',
  description: 'Split layout with image, text, and logo marquee',
  category: 'Sections',
  keywords: ['about', 'bio', 'image', 'text', 'marquee', 'logos'],
  schema: aboutSectionSchema,
}
