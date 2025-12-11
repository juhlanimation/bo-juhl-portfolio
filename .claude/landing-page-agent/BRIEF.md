# AI Agent Brief: Extractable Landing Page Components

## Goal

Build landing page components that can be **directly extracted** into a registry-based page builder. Every component you create should be:

1. **Schema-driven** - All configurable values defined declaratively
2. **Self-contained** - 3 colocated files per component
3. **Props-driven** - Preview reads from settings, no hardcoded values

---

## Core Architecture

```
components/features/[type]/[name]/
├── index.ts              ← Schema + Config + Settings Interface
├── [name].preview.tsx    ← Visual render component
└── [name].settings.tsx   ← Settings panel (can be minimal stub)
```

### Why This Structure?

- **index.ts** exports everything needed for registry registration
- **preview.tsx** is the actual visual component (used in canvas AND production)
- **settings.tsx** renders the inspector panel (auto-generated from schema)

---

## Rules

### 1. Every Visual Component = 3 Files

No exceptions. Even simple components get all 3 files.

### 2. All Configurable Values in Schema

```typescript
// BAD - hardcoded values
<div style={{ transform: 'scale(1.05)' }}>

// GOOD - schema-driven
<div style={{ transform: `scale(${settings.hoverScale})` }}>
```

### 3. Settings Interface Pattern

Always include the index signature for type safety:

```typescript
export interface MyComponentSettings {
  [key: string]: unknown  // REQUIRED
  title: string
  // ... other fields
}
```

### 4. Schema Field Groups

Organize fields into logical groups:

- `Content` - Text, titles, descriptions
- `Media` - Images, videos, URLs
- `Style` - Colors, sizes, visual appearance
- `Animation` - Transitions, hover effects, motion
- `Layout` - Spacing, alignment, positioning

### 5. Preview Component Rules

- Receives `settings` prop with all values
- No data fetching (pure render)
- No hardcoded magic numbers
- Optional `isSelected` prop for builder state
- Optional `children` prop for container types

### 6. Export Config Object

Every index.ts exports a config for later registry registration:

```typescript
export const myComponentConfig = {
  id: 'my-component',
  type: 'block',  // or 'layout', 'section', 'page'
  name: 'My Component',
  category: 'Category Name',
  keywords: ['search', 'terms'],
  schema: myComponentSchema,
}
```

---

## Folder Organization

```
components/features/
├── blocks/           ← Atomic elements
│   ├── heading/
│   ├── text/
│   ├── button/
│   ├── image/
│   ├── video/
│   └── project-card/
│
├── layouts/          ← Content arrangement
│   ├── stack/
│   ├── grid/
│   ├── overlay/
│   └── projects-grid/
│
├── sections/         ← Page sections
│   ├── hero/
│   ├── projects/
│   ├── about/
│   └── contact/
│
└── pages/            ← Root containers
    └── landing/
```

---

## Animation Pattern

Put ALL animation parameters in the schema:

```typescript
// Animation fields pattern
hoverScale: {
  type: 'slider',
  label: 'Hover Scale',
  defaultValue: 1.05,
  min: 1, max: 1.5, step: 0.01,
  group: 'Animation',
},
transitionDuration: {
  type: 'slider',
  label: 'Duration (ms)',
  defaultValue: 300,
  min: 0, max: 1000, step: 50,
  group: 'Animation',
},
transitionEasing: {
  type: 'select',
  label: 'Easing',
  defaultValue: 'ease-out',
  options: [
    { value: 'linear', label: 'Linear' },
    { value: 'ease', label: 'Ease' },
    { value: 'ease-in', label: 'Ease In' },
    { value: 'ease-out', label: 'Ease Out' },
    { value: 'ease-in-out', label: 'Ease In Out' },
    { value: 'cubic-bezier(0.4, 0, 0.2, 1)', label: 'Smooth' },
  ],
  group: 'Animation',
},
```

Then in preview:

```typescript
style={{
  transform: isHovered ? `scale(${settings.hoverScale})` : 'scale(1)',
  transition: `transform ${settings.transitionDuration}ms ${settings.transitionEasing}`,
}}
```

---

## Extraction Workflow

When ready to extract into CreativeShire:

1. Copy the 3-file folder to `components/builder/features/[type]/[name]/`
2. Update imports:
   - `import { createFeature, type SettingsSchema } from '@/components/builder/registry'`
3. Wrap config with `createFeature()`:
   ```typescript
   export const myBlock = createFeature<MySettings>({
     ...myComponentConfig,
     Preview: MyPreview,
     SettingsPanel: MySettingsPanel,
   })
   ```
4. Add import to parent barrel: `import './my-component'`

**No refactoring needed** - the schema-driven approach makes extraction seamless.

---

## Quick Reference

### Component Type Decision

- **Block**: Renders content directly (text, image, video, card)
- **Layout**: Arranges children (grid, stack, flexbox container)
- **Section**: Page-level grouping with background/padding
- **Page**: Root container with global settings

### Schema Field Cheat Sheet

| Need | Field Type |
|------|------------|
| Short text | `text` |
| Long text | `textarea` |
| Number | `number` or `slider` |
| On/Off | `switch` |
| Choices | `select` |
| Color | `color` |
| Image | `image` |
| Link | `url` |
