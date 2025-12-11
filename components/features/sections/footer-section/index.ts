/**
 * Footer Section
 *
 * Page footer with contact info and links.
 * Black background, white text.
 */

// ============================================================================
// Settings Interface
// ============================================================================

export interface FooterSectionSettings {
  [key: string]: unknown
  // Style
  backgroundColor: string
  textColor: string
  paddingY: string
  // Content
  copyrightText: string
  // Contact
  contactEmail: string
  contactLinkedIn: string
  // Studio
  studioName: string
  studioUrl: string
  studioEmail: string
  studioLinkedIn: string
  studioInstagram: string
}

// ============================================================================
// Schema
// ============================================================================

export const footerSectionSchema = {
  // Content Group
  copyrightText: {
    type: 'text',
    label: 'Copyright Text',
    defaultValue: 'Copyright © Bo Juhl / All rights reserved',
    group: 'Content',
  },

  // Contact Group
  contactEmail: {
    type: 'text',
    label: 'Contact Email',
    defaultValue: 'hello@bojuhl.com',
    group: 'Contact',
  },
  contactLinkedIn: {
    type: 'url',
    label: 'LinkedIn URL',
    defaultValue: 'https://linkedin.com',
    placeholder: 'https://linkedin.com/in/yourprofile',
    group: 'Contact',
  },

  // Studio Group
  studioName: {
    type: 'text',
    label: 'Studio Name',
    defaultValue: 'Crossroad Studio',
    group: 'Studio',
  },
  studioUrl: {
    type: 'url',
    label: 'Studio Website',
    defaultValue: 'https://crossroad.studio',
    group: 'Studio',
  },
  studioEmail: {
    type: 'text',
    label: 'Studio Email',
    defaultValue: 'bo@crossroad.studio',
    group: 'Studio',
  },
  studioLinkedIn: {
    type: 'url',
    label: 'Studio LinkedIn',
    defaultValue: 'https://linkedin.com',
    group: 'Studio',
  },
  studioInstagram: {
    type: 'url',
    label: 'Studio Instagram',
    defaultValue: 'https://instagram.com',
    group: 'Studio',
  },

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
    defaultValue: 'lg',
    options: [
      { value: 'sm', label: 'Small' },
      { value: 'md', label: 'Medium' },
      { value: 'lg', label: 'Large' },
    ],
    group: 'Style',
  },
} as const

// ============================================================================
// Config
// ============================================================================

export const footerSectionConfig = {
  id: 'footer-section',
  type: 'section',
  name: 'Footer Section',
  description: 'Page footer with contact info and links',
  category: 'Sections',
  keywords: ['footer', 'contact', 'links', 'bottom'],
  schema: footerSectionSchema,
}
