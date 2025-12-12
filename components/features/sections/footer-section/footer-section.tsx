import { cacheLife } from "next/cache"
import type { FooterSectionSettings } from "./index"
import { getPadding, compactPaddingMap } from "@/lib/utils"

interface Props {
  settings: FooterSectionSettings
  isSelected?: boolean
}

export async function FooterSection({ settings, isSelected }: Props) {
  "use cache"
  cacheLife("days")

  const copyrightText =
    settings.copyrightText || "Copyright © Bo Juhl / All rights reserved"
  const contactEmail = settings.contactEmail || "hello@bojuhl.com"
  const contactLinkedIn = settings.contactLinkedIn || "https://linkedin.com"
  const studioUrl = settings.studioUrl || "https://crossroad.studio"
  const studioEmail = settings.studioEmail || "bo@crossroad.studio"
  const studioLinkedIn = settings.studioLinkedIn || "https://linkedin.com"
  const studioInstagram = settings.studioInstagram || "https://instagram.com"

  return (
    <footer
      style={{
        backgroundColor: settings.backgroundColor,
        color: settings.textColor,
        paddingTop: getPadding(settings.paddingY, compactPaddingMap, "6rem"),
        paddingBottom: "3rem",
      }}
      className={`relative ${isSelected ? "ring-2 ring-primary" : ""}`}
    >
      <div className="content-container relative">
        <div className="px-8 md:px-32 lg:px-48 pb-6">
          <div className="w-full md:w-auto flex flex-col md:flex-row gap-8 md:gap-16">
            {/* Column 1 - Navigation */}
            <div className="font-title flex flex-col gap-2 text-sm md:text-base font-light md:mr-24">
              <a
                href="#hero"
                className="hover:opacity-70 transition-opacity cursor-pointer"
              >
                HOME
              </a>
              <a
                href="#about"
                className="hover:opacity-70 transition-opacity cursor-pointer"
              >
                ABOUT
              </a>
              <a
                href="#projects"
                className="hover:opacity-70 transition-opacity cursor-pointer"
              >
                PROJECTS
              </a>
            </div>

            {/* Column 2 - Get in Touch */}
            <div className="flex flex-col gap-2 text-sm md:text-base">
              <span className="font-title font-black">GET IN TOUCH</span>
              <a
                href={`mailto:${contactEmail}`}
                className="font-paragraph hover:opacity-70 transition-opacity cursor-pointer"
              >
                {contactEmail}
              </a>
              <a
                href={contactLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="font-paragraph hover:opacity-70 transition-opacity cursor-pointer"
              >
                linkedin
              </a>
            </div>

            {/* Column 3 - Find My Studio */}
            <div className="flex flex-col gap-2 text-sm md:text-base">
              <span className="font-title font-black">FIND MY STUDIO</span>
              <a
                href={studioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-paragraph hover:opacity-70 transition-opacity cursor-pointer"
              >
                {studioUrl}
              </a>
              <a
                href={`mailto:${studioEmail}`}
                className="font-paragraph hover:opacity-70 transition-opacity cursor-pointer"
              >
                {studioEmail}
              </a>
              <a
                href={studioLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="font-paragraph hover:opacity-70 transition-opacity cursor-pointer"
              >
                linkedin
              </a>
              <a
                href={studioInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-paragraph hover:opacity-70 transition-opacity cursor-pointer"
              >
                instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="font-paragraph text-xs opacity-50 px-8 mt-8 md:mt-0 md:px-0 md:absolute md:bottom-2 md:left-10">
        {copyrightText}
      </div>
    </footer>
  )
}
