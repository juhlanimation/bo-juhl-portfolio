/**
 * Section Template
 *
 * Copy this folder and rename for your section component.
 * Sections are page-level wrappers (hero, about, projects, etc.)
 */

// ============================================================================
// index.ts
// ============================================================================

// 1. Settings Interface
export interface __SECTION_NAME__Settings {
  [key: string]: unknown
  title: string
  subtitle: string
  backgroundColor: string
  minHeight: string
  paddingY: string
  // Add your fields here
}

// 2. Schema Definition
export const __sectionName__Schema = {
  // Content
  title: {
    type: 'text',
    label: 'Section Title',
    defaultValue: 'Section Title',
    group: 'Content',
  },
  subtitle: {
    type: 'textarea',
    label: 'Subtitle',
    defaultValue: '',
    placeholder: 'Optional subtitle...',
    group: 'Content',
  },

  // Style
  backgroundColor: {
    type: 'color',
    label: 'Background',
    defaultValue: 'transparent',
    group: 'Style',
    width: 'half',
  },
  minHeight: {
    type: 'select',
    label: 'Min Height',
    defaultValue: 'auto',
    options: [
      { value: 'auto', label: 'Auto' },
      { value: '50dvh', label: 'Half Screen' },
      { value: '100dvh', label: 'Full Screen' },
    ],
    group: 'Style',
    width: 'half',
  },
  paddingY: {
    type: 'select',
    label: 'Vertical Padding',
    defaultValue: 'lg',
    options: [
      { value: 'none', label: 'None' },
      { value: 'sm', label: 'Small' },
      { value: 'md', label: 'Medium' },
      { value: 'lg', label: 'Large' },
      { value: 'xl', label: 'Extra Large' },
    ],
    group: 'Style',
    width: 'half',
  },
  // Add more fields...
} as const

// 3. Config Export
export const __sectionName__Config = {
  id: '__section-name__',
  type: 'section',
  name: '__Section Name__',
  description: 'Description of this section',
  category: 'Sections',
  keywords: ['section', 'page'],
  schema: __sectionName__Schema,
}

// ============================================================================
// __section-name__.preview.tsx
// ============================================================================

/*
'use client'

import type { ReactNode } from 'react'
import type { __SECTION_NAME__Settings } from './index'

interface Props {
  settings: __SECTION_NAME__Settings
  isSelected?: boolean
  children?: ReactNode
}

const paddingMap: Record<string, string> = {
  none: '0',
  sm: '2rem',
  md: '4rem',
  lg: '6rem',
  xl: '8rem',
}

export function __SectionName__Preview({ settings, isSelected, children }: Props) {
  return (
    <section
      style={{
        backgroundColor: settings.backgroundColor,
        minHeight: settings.minHeight,
        paddingTop: paddingMap[settings.paddingY],
        paddingBottom: paddingMap[settings.paddingY],
      }}
      className={isSelected ? 'ring-2 ring-primary' : ''}
    >
      <div className="container mx-auto px-4">
        {settings.title && (
          <h2 className="text-3xl font-bold mb-4">{settings.title}</h2>
        )}
        {settings.subtitle && (
          <p className="text-lg text-muted-foreground mb-8">{settings.subtitle}</p>
        )}
        {children}
      </div>
    </section>
  )
}
*/

// ============================================================================
// __section-name__.settings.tsx
// ============================================================================

/*
'use client'

export function __SectionName__SettingsPanel() {
  return null
}
*/
