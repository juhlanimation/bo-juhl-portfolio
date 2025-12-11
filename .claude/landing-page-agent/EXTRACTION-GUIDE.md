# Extraction Guide

How to extract components from the landing page project into CreativeShire's builder.

---

## Prerequisites

1. Components follow the 3-file structure (index.ts, preview.tsx, settings.tsx)
2. All configurable values are in the schema
3. Settings interface has `[key: string]: unknown`

---

## Step-by-Step Extraction

### 1. Copy the Component Folder

```bash
# From landing page project
cp -r components/features/blocks/project-card \
  ../creativeshire-navigation/components/builder/features/blocks/
```

### 2. Update Imports in index.ts

**Before (landing page):**
```typescript
export const projectCardConfig = {
  id: 'project-card',
  type: 'block',
  // ...
  schema: projectCardSchema,
}
```

**After (CreativeShire):**
```typescript
import { createFeature, type SettingsSchema } from '@/components/builder/registry'
import { ProjectCardPreview } from './project-card.preview'

export const projectCardBlock = createFeature<ProjectCardSettings>({
  id: 'project-card',
  type: 'block',
  name: 'Project Card',
  description: 'Project showcase with video hover',
  icon: Film,  // Add lucide icon
  category: 'Media',
  keywords: ['project', 'film', 'video', 'portfolio'],

  schema: projectCardSchema,

  Preview: ProjectCardPreview,
  // SettingsPanel is auto-generated from schema
})

export { ProjectCardPreview }
```

### 3. Update Preview Component Imports

**Before:**
```typescript
import type { ProjectCardSettings } from './index'

interface Props {
  settings: ProjectCardSettings
  isSelected?: boolean
}
```

**After:**
```typescript
import type { PreviewProps } from '@/components/builder/registry'
import type { ProjectCardSettings } from './index'

export function ProjectCardPreview({
  settings,
  isSelected,
  elementId,  // Now available from PreviewProps
}: PreviewProps<ProjectCardSettings>) {
  // ...
}
```

### 4. Register in Parent Barrel

```typescript
// components/builder/features/blocks/index.ts

// Add import (triggers auto-registration)
import './project-card'

// Add export
export { projectCardBlock, type ProjectCardSettings } from './project-card'
```

### 5. Verify Registration

```typescript
import { featureRegistry } from '@/components/builder/registry'

// Should return the feature config
const projectCard = featureRegistry.get('block', 'project-card')
console.log(projectCard) // { id: 'project-card', ... }
```

---

## Schema Type Casting

If TypeScript complains about schema types:

```typescript
// Cast schema to SettingsSchema type
export const projectCardSchema: SettingsSchema = {
  // fields...
} as const satisfies SettingsSchema
```

---

## Common Issues

### Missing Icon

Add a lucide-react icon:

```typescript
import { Film, Play, Video } from 'lucide-react'

export const projectCardBlock = createFeature({
  // ...
  icon: Film,
})
```

### Schema Field Not Rendering

Ensure field has all required properties:

```typescript
fieldName: {
  type: 'text',       // Required
  label: 'Label',     // Required
  defaultValue: '',   // Required
}
```

### Preview Not Showing

Check that Preview component is exported and passed to createFeature:

```typescript
// index.ts
export const myBlock = createFeature({
  // ...
  Preview: MyPreview,  // Must be passed here
})

export { MyPreview }  // Must be exported
```

---

## Extraction Checklist

- [ ] Copy 3-file folder to builder/features/[type]/
- [ ] Update imports to use `@/components/builder/registry`
- [ ] Wrap config with `createFeature()`
- [ ] Add icon from lucide-react
- [ ] Update Preview props to use `PreviewProps<T>`
- [ ] Remove settings.tsx content (use SettingsRenderer)
- [ ] Add import to parent barrel index.ts
- [ ] Test feature appears in element picker
- [ ] Test preview renders correctly
- [ ] Test settings panel works

---

## Quick Diff: Landing Page vs CreativeShire

| Aspect | Landing Page | CreativeShire |
|--------|--------------|---------------|
| Config export | `const config = {}` | `const block = createFeature({})` |
| Preview props | Custom interface | `PreviewProps<T>` |
| Settings panel | Optional stub | Auto-generated |
| Registration | Manual | Auto (on import) |
| Icon | Not needed | Required (lucide-react) |
