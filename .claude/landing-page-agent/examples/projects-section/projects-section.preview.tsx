'use client'

import type { ReactNode } from 'react'
import type { ProjectsSectionSettings } from './index'

interface Props {
  settings: ProjectsSectionSettings
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

const containerWidthMap: Record<string, string> = {
  full: '100%',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

export function ProjectsSectionPreview({ settings, isSelected, children }: Props) {
  const paddingY = paddingMap[settings.paddingY] || '8rem'
  const maxWidth = containerWidthMap[settings.containerWidth] || '1280px'

  return (
    <section
      style={{
        backgroundColor: settings.backgroundColor,
        color: settings.textColor,
        minHeight: settings.minHeight,
        paddingTop: paddingY,
        paddingBottom: paddingY,
      }}
      className={isSelected ? 'ring-2 ring-primary ring-inset' : ''}
    >
      <div
        style={{
          maxWidth: maxWidth === '100%' ? undefined : maxWidth,
          margin: '0 auto',
          padding: '0 1.5rem',
        }}
      >
        {/* Section Header */}
        {settings.showTitle && (
          <header
            style={{ textAlign: settings.contentAlignment as 'left' | 'center' | 'right' }}
            className="mb-12"
          >
            {settings.title && (
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {settings.title}
              </h2>
            )}
            {settings.subtitle && (
              <p className="text-lg opacity-70 max-w-2xl mx-auto">
                {settings.subtitle}
              </p>
            )}
          </header>
        )}

        {/* Section Content (children = grid with cards) */}
        {children}
      </div>
    </section>
  )
}
