'use client'

import type { FooterSectionSettings } from './index'

interface Props {
  settings: FooterSectionSettings
  isSelected?: boolean
}

const paddingMap: Record<string, string> = {
  sm: '1.5rem',
  md: '3rem',
  lg: '5rem',
}

export function FooterSection({ settings, isSelected }: Props) {
  const copyrightText = settings.copyrightText || 'Copyright © Bo Juhl / All rights reserved'
  const contactEmail = settings.contactEmail || 'hello@bojuhl.com'
  const contactLinkedIn = settings.contactLinkedIn || 'https://linkedin.com'
  const studioUrl = settings.studioUrl || 'https://crossroad.studio'
  const studioEmail = settings.studioEmail || 'bo@crossroad.studio'
  const studioLinkedIn = settings.studioLinkedIn || 'https://linkedin.com'
  const studioInstagram = settings.studioInstagram || 'https://instagram.com'

  return (
    <footer
      style={{
        backgroundColor: settings.backgroundColor,
        color: settings.textColor,
        paddingTop: paddingMap[settings.paddingY] || '6rem',
        paddingBottom: '3rem',
      }}
      className={`relative ${isSelected ? 'ring-2 ring-primary' : ''}`}
    >
      {/* Copyright - absolute bottom left, positioned relative to footer */}
      <div className="font-paragraph absolute bottom-2 left-10 text-xs opacity-50">
        {copyrightText}
      </div>

      <div className="content-container relative">
        {/* Main footer content */}
        <div className="px-16 md:px-32 lg:px-48 pb-6">
        <div className="w-full md:w-1/2 flex gap-8 md:gap-16">
          {/* Column 1 - Navigation (further away) */}
          <div className="font-title flex flex-col gap-2 text-sm md:text-base font-light mr-16 md:mr-24">
            <a href="#hero" className="hover:opacity-70 transition-opacity cursor-pointer">
              HOME
            </a>
            <a href="#about" className="hover:opacity-70 transition-opacity cursor-pointer">
              ABOUT
            </a>
            <a href="#projects" className="hover:opacity-70 transition-opacity cursor-pointer">
              PROJECTS
            </a>
          </div>

          {/* Column 2 - Get in Touch */}
          <div className="flex flex-col gap-2 text-sm md:text-base">
            <span className="font-title font-black">GET IN TOUCH</span>
            <a href={`mailto:${contactEmail}`} className="font-paragraph hover:opacity-70 transition-opacity cursor-pointer">
              {contactEmail}
            </a>
            <a href={contactLinkedIn} target="_blank" rel="noopener noreferrer" className="font-paragraph hover:opacity-70 transition-opacity cursor-pointer">
              linkedin
            </a>
          </div>

          {/* Column 3 - Find My Studio */}
          <div className="flex flex-col gap-2 text-sm md:text-base">
            <span className="font-title font-black">FIND MY STUDIO</span>
            <a href={studioUrl} target="_blank" rel="noopener noreferrer" className="font-paragraph hover:opacity-70 transition-opacity cursor-pointer">
              {studioUrl}
            </a>
            <a href={`mailto:${studioEmail}`} className="font-paragraph hover:opacity-70 transition-opacity cursor-pointer">
              {studioEmail}
            </a>
            <a href={studioLinkedIn} target="_blank" rel="noopener noreferrer" className="font-paragraph hover:opacity-70 transition-opacity cursor-pointer">
              linkedin
            </a>
            <a href={studioInstagram} target="_blank" rel="noopener noreferrer" className="font-paragraph hover:opacity-70 transition-opacity cursor-pointer">
              instagram
            </a>
          </div>
        </div>
        </div>
      </div>
    </footer>
  )
}
