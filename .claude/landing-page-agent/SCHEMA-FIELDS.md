# Schema Field Reference

Complete reference for all schema field types and their properties.

---

## Field Types

### text

Single-line text input.

```typescript
fieldName: {
  type: 'text',
  label: 'Display Label',
  defaultValue: 'Default text',
  placeholder: 'Placeholder text...',  // optional
  group: 'Content',                     // optional
  width: 'full',                        // 'full' | 'half' | 'third'
}
```

---

### textarea

Multi-line text input.

```typescript
description: {
  type: 'textarea',
  label: 'Description',
  defaultValue: '',
  placeholder: 'Enter description...',
  group: 'Content',
}
```

---

### number

Numeric input with optional constraints.

```typescript
count: {
  type: 'number',
  label: 'Item Count',
  defaultValue: 5,
  min: 1,           // optional
  max: 20,          // optional
  step: 1,          // optional
  group: 'Settings',
  width: 'half',
}
```

---

### slider

Range slider with visual feedback.

```typescript
opacity: {
  type: 'slider',
  label: 'Opacity',
  defaultValue: 1,
  min: 0,
  max: 1,
  step: 0.1,
  group: 'Style',
  width: 'full',
}
```

---

### select

Dropdown with predefined options.

```typescript
alignment: {
  type: 'select',
  label: 'Alignment',
  defaultValue: 'center',
  options: [
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' },
  ],
  group: 'Style',
  width: 'half',
}
```

---

### switch

Boolean toggle.

```typescript
showTitle: {
  type: 'switch',
  label: 'Show Title',
  defaultValue: true,
  group: 'Content',
  width: 'half',
}
```

---

### color

Color picker input.

```typescript
backgroundColor: {
  type: 'color',
  label: 'Background Color',
  defaultValue: '#ffffff',  // or 'transparent', 'inherit'
  group: 'Style',
  width: 'half',
}
```

---

### image

Image upload/URL input.

```typescript
thumbnail: {
  type: 'image',
  label: 'Thumbnail Image',
  defaultValue: '',
  group: 'Media',
}
```

---

### url

URL input with validation.

```typescript
link: {
  type: 'url',
  label: 'Link URL',
  defaultValue: '',
  placeholder: 'https://example.com',
  group: 'Content',
}
```

---

## Field Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | FieldType | Yes | Field input type |
| `label` | string | Yes | Display label |
| `defaultValue` | T | Yes | Default value when created |
| `description` | string | No | Help text below field |
| `placeholder` | string | No | Placeholder for text inputs |
| `options` | SelectOption[] | For select | Dropdown options |
| `min` | number | No | Min for number/slider |
| `max` | number | No | Max for number/slider |
| `step` | number | No | Step for number/slider |
| `group` | string | No | Groups fields in inspector |
| `width` | 'full' \| 'half' \| 'third' | No | Field width (default: 'full') |
| `showWhen` | (settings) => boolean | No | Conditional visibility |

---

## Conditional Fields

Show fields only when a condition is met:

```typescript
export const schema = {
  hasOverlay: {
    type: 'switch',
    label: 'Show Overlay',
    defaultValue: false,
    group: 'Style',
  },
  overlayColor: {
    type: 'color',
    label: 'Overlay Color',
    defaultValue: 'rgba(0,0,0,0.5)',
    group: 'Style',
    showWhen: (settings) => settings.hasOverlay === true,
  },
  overlayOpacity: {
    type: 'slider',
    label: 'Overlay Opacity',
    defaultValue: 0.5,
    min: 0,
    max: 1,
    step: 0.1,
    group: 'Style',
    showWhen: (settings) => settings.hasOverlay === true,
  },
}
```

---

## Common Option Sets

### Alignment Options

```typescript
const ALIGNMENT_OPTIONS = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
]

const VERTICAL_ALIGNMENT_OPTIONS = [
  { value: 'start', label: 'Top' },
  { value: 'center', label: 'Center' },
  { value: 'end', label: 'Bottom' },
]

const JUSTIFY_OPTIONS = [
  { value: 'start', label: 'Start' },
  { value: 'center', label: 'Center' },
  { value: 'end', label: 'End' },
  { value: 'between', label: 'Space Between' },
  { value: 'around', label: 'Space Around' },
]
```

### Size Options

```typescript
const SIZE_OPTIONS = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' },
]

const GAP_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'xs', label: 'Extra Small' },
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' },
]
```

### Easing Options

```typescript
const EASING_OPTIONS = [
  { value: 'linear', label: 'Linear' },
  { value: 'ease', label: 'Ease' },
  { value: 'ease-in', label: 'Ease In' },
  { value: 'ease-out', label: 'Ease Out' },
  { value: 'ease-in-out', label: 'Ease In Out' },
  { value: 'cubic-bezier(0.4, 0, 0.2, 1)', label: 'Smooth' },
  { value: 'cubic-bezier(0.16, 1, 0.3, 1)', label: 'Expo Out' },
]
```

### Aspect Ratio Options

```typescript
const ASPECT_RATIO_OPTIONS = [
  { value: 'auto', label: 'Auto' },
  { value: '1/1', label: 'Square (1:1)' },
  { value: '16/9', label: 'Widescreen (16:9)' },
  { value: '4/3', label: 'Standard (4:3)' },
  { value: '3/2', label: 'Photo (3:2)' },
  { value: '21/9', label: 'Ultrawide (21:9)' },
  { value: '9/16', label: 'Vertical (9:16)' },
]
```

---

## Group Naming Conventions

Use consistent group names across components:

| Group | Contains |
|-------|----------|
| `Content` | Text, titles, descriptions, data |
| `Media` | Images, videos, URLs |
| `Style` | Colors, visual appearance |
| `Layout` | Spacing, alignment, positioning |
| `Animation` | Transitions, hover effects, motion |
| `Behavior` | Interactivity, events |
| `Advanced` | Technical settings |
