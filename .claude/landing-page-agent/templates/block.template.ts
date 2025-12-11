/**
 * Block Template
 *
 * Copy this folder and rename for your block component.
 * Blocks are atomic visual elements (heading, button, card, etc.)
 */

// ============================================================================
// index.ts
// ============================================================================

// 1. Settings Interface
export interface __BLOCK_NAME__Settings {
  [key: string]: unknown
  // Add your fields here
  title: string
  // ...
}

// 2. Schema Definition
export const __blockName__Schema = {
  title: {
    type: 'text',
    label: 'Title',
    defaultValue: 'Default Title',
    placeholder: 'Enter title...',
    group: 'Content',
  },
  // Add more fields...
} as const

// 3. Config Export (for registry)
export const __blockName__Config = {
  id: '__block-name__',
  type: 'block',
  name: '__Block Name__',
  description: 'Description of what this block does',
  category: 'Category',  // Typography, Media, Interactive, etc.
  keywords: ['search', 'terms'],
  schema: __blockName__Schema,
}

// ============================================================================
// __block-name__.preview.tsx
// ============================================================================

/*
'use client'

import type { __BLOCK_NAME__Settings } from './index'

interface Props {
  settings: __BLOCK_NAME__Settings
  isSelected?: boolean
}

export function __BlockName__Preview({ settings, isSelected }: Props) {
  return (
    <div className={isSelected ? 'ring-2 ring-primary' : ''}>
      {settings.title}
    </div>
  )
}
*/

// ============================================================================
// __block-name__.settings.tsx
// ============================================================================

/*
'use client'

// Stub file - settings auto-generated from schema in main project
// Keep this file for extraction compatibility

export function __BlockName__SettingsPanel() {
  return null  // Uses SettingsRenderer in main project
}
*/
