/**
 * Page Layout
 *
 * Top-level layout containing navbar and main content area.
 * Wraps all sections of the landing page.
 */

// ============================================================================
// Settings Interface
// ============================================================================

export interface PageLayoutSettings {
  [key: string]: unknown
  // Navbar
  showNavbar: boolean
  navbarPosition: 'fixed' | 'sticky' | 'static'
  // Content
  maxWidth: string
  backgroundColor: string
}

// ============================================================================
// Schema
// ============================================================================

export const pageLayoutSchema = {
  // Navbar Group
  showNavbar: {
    type: 'switch',
    label: 'Show Navbar',
    defaultValue: true,
    group: 'Navbar',
  },
  navbarPosition: {
    type: 'select',
    label: 'Navbar Position',
    defaultValue: 'fixed',
    options: [
      { value: 'fixed', label: 'Fixed (stays on screen)' },
      { value: 'sticky', label: 'Sticky (sticks on scroll)' },
      { value: 'static', label: 'Static (scrolls with page)' },
    ],
    group: 'Navbar',
    showWhen: (settings: PageLayoutSettings) => settings.showNavbar,
  },

  // Style Group
  maxWidth: {
    type: 'select',
    label: 'Max Width',
    defaultValue: 'none',
    options: [
      { value: 'none', label: 'Full Width' },
      { value: '1280px', label: 'Large (1280px)' },
      { value: '1024px', label: 'Medium (1024px)' },
      { value: '768px', label: 'Small (768px)' },
    ],
    group: 'Style',
  },
  backgroundColor: {
    type: 'color',
    label: 'Background Color',
    defaultValue: 'transparent',
    group: 'Style',
  },
} as const

// ============================================================================
// Config
// ============================================================================

export const pageLayoutConfig = {
  id: 'page-layout',
  type: 'layout',
  name: 'Page Layout',
  description: 'Top-level layout with navbar and main content area',
  category: 'Page',
  keywords: ['page', 'layout', 'navbar', 'wrapper'],
  schema: pageLayoutSchema,
}
