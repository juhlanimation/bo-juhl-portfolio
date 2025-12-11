/**
 * Landing Page
 *
 * Root container for the portfolio landing page.
 * Assembles all sections: Hero, About, Projects, More Projects, Footer
 */

// ============================================================================
// Settings Interface
// ============================================================================

export interface LandingPageSettings {
  [key: string]: unknown
  // Meta
  pageTitle: string
  // Layout
  showNavbar: boolean
}

// ============================================================================
// Schema
// ============================================================================

export const landingPageSchema = {
  pageTitle: {
    type: 'text',
    label: 'Page Title',
    defaultValue: 'Bo Juhl Portfolio',
    placeholder: 'Enter page title...',
    group: 'Meta',
  },
  showNavbar: {
    type: 'switch',
    label: 'Show Navbar',
    defaultValue: true,
    group: 'Layout',
  },
} as const

// ============================================================================
// Config
// ============================================================================

export const landingPageConfig = {
  id: 'landing-page',
  type: 'page',
  name: 'Landing Page',
  description: 'Portfolio landing page with all sections',
  category: 'Pages',
  keywords: ['landing', 'page', 'portfolio', 'home'],
  schema: landingPageSchema,
}
