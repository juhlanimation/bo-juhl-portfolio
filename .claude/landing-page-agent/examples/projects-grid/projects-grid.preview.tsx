'use client'

import type { ReactNode } from 'react'
import type { ProjectsGridSettings } from './index'

interface Props {
  settings: ProjectsGridSettings
  isSelected?: boolean
  children?: ReactNode
}

// Gap value mapping
const gapMap: Record<string, string> = {
  none: '0',
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
}

// Max width mapping
const maxWidthMap: Record<string, string> = {
  none: 'none',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

export function ProjectsGridPreview({ settings, isSelected, children }: Props) {
  const gap = gapMap[settings.gap] || '1.5rem'
  const maxWidth = maxWidthMap[settings.maxWidth] || 'none'

  return (
    <div
      style={{
        maxWidth,
        margin: settings.centerContent ? '0 auto' : undefined,
      }}
      className={isSelected ? 'ring-2 ring-primary ring-offset-4' : ''}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${settings.columns}, 1fr)`,
          gap,
        }}
        // For responsive, you'd add CSS classes or media queries
        // This inline style is desktop-first
      >
        {children}
      </div>
    </div>
  )
}

// ============================================================================
// CSS for Responsive (add to your globals.css)
// ============================================================================

/*
// If you need responsive columns, add this CSS and use className:

.projects-grid {
  display: grid;
  gap: var(--grid-gap, 1.5rem);
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(var(--columns-mobile, 1), 1fr) !important;
  }
}

@media (min-width: 769px) {
  .projects-grid {
    grid-template-columns: repeat(var(--columns-desktop, 3), 1fr);
  }
}

// Then in preview:
<div
  className="projects-grid"
  style={{
    '--grid-gap': gap,
    '--columns-mobile': settings.columnsMobile,
    '--columns-desktop': settings.columns,
  } as React.CSSProperties}
>
  {children}
</div>
*/
