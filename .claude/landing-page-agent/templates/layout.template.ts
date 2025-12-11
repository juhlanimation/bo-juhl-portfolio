/**
 * Layout Template
 *
 * Copy this folder and rename for your layout component.
 * Layouts arrange children (grid, stack, flex containers, etc.)
 */

// ============================================================================
// index.ts
// ============================================================================

// 1. Settings Interface
export interface __LAYOUT_NAME__Settings {
  [key: string]: unknown
  columns: number
  gap: string
  // Add your fields here
}

// 2. Schema Definition
export const __layoutName__Schema = {
  columns: {
    type: 'slider',
    label: 'Columns',
    defaultValue: 3,
    min: 1,
    max: 6,
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
      { value: 'sm', label: 'Small' },
      { value: 'md', label: 'Medium' },
      { value: 'lg', label: 'Large' },
      { value: 'xl', label: 'Extra Large' },
    ],
    group: 'Layout',
    width: 'half',
  },
  // Add more fields...
} as const

// 3. Config Export
export const __layoutName__Config = {
  id: '__layout-name__',
  type: 'layout',
  name: '__Layout Name__',
  description: 'Description of layout arrangement',
  category: 'Grids',  // Grids, Stacks, Containers, etc.
  keywords: ['grid', 'columns'],
  schema: __layoutName__Schema,
}

// ============================================================================
// __layout-name__.preview.tsx
// ============================================================================

/*
'use client'

import type { ReactNode } from 'react'
import type { __LAYOUT_NAME__Settings } from './index'

interface Props {
  settings: __LAYOUT_NAME__Settings
  isSelected?: boolean
  children?: ReactNode  // IMPORTANT: Layouts receive children
}

// Gap value mapping
const gapMap: Record<string, string> = {
  none: '0',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
}

export function __LayoutName__Preview({ settings, isSelected, children }: Props) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${settings.columns}, 1fr)`,
        gap: gapMap[settings.gap] || '1rem',
      }}
      className={isSelected ? 'ring-2 ring-primary' : ''}
    >
      {children}
    </div>
  )
}
*/

// ============================================================================
// __layout-name__.settings.tsx
// ============================================================================

/*
'use client'

export function __LayoutName__SettingsPanel() {
  return null  // Uses SettingsRenderer in main project
}
*/
