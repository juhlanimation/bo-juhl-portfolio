"use client"

import { useState, useMemo } from "react"
import type { MoreProjectsSectionSettings } from "./index"
import type { CompactProject } from "@/lib/types"
import { parseJsonWithFallback, getPadding, sectionPaddingMap } from "@/lib/utils"
import { COMPACT_PLACEHOLDER_PROJECTS } from "@/lib/constants/placeholder-projects"
import { ExpandableThumbnail } from "./expandable-thumbnail"
import { DIMENSIONS } from "@/lib/constants/animations"

interface Props {
  settings: MoreProjectsSectionSettings
  isSelected?: boolean
}

export function MoreProjectsSection({ settings, isSelected }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isAnyPlayerOpen, setIsAnyPlayerOpen] = useState(false)

  const projects = useMemo(
    () => parseJsonWithFallback<CompactProject[]>(settings.projectsJson, COMPACT_PLACEHOLDER_PROJECTS),
    [settings.projectsJson]
  )

  const handleMouseLeave = () => {
    if (!isAnyPlayerOpen) {
      setExpandedId(null)
    }
  }

  return (
    <section
      style={{
        backgroundColor: settings.backgroundColor,
        color: settings.textColor,
        paddingTop: getPadding(settings.paddingY, sectionPaddingMap),
        paddingBottom: getPadding(settings.paddingY, sectionPaddingMap),
      }}
      className={`hidden md:block -mt-1 ${isSelected ? "ring-2 ring-primary" : ""}`}
    >
      <div className="content-container px-2">
        <div className="w-full">
          {/* Section title */}
          <div className="flex justify-start mb-8">
            <div className="flex flex-col">
              <h2 className="font-title text-[10px] font-bold uppercase text-right">
                {settings.title || "OTHER SELECTED PROJECTS"}
              </h2>
              <span className="font-paragraph text-[10px] text-right">
                {settings.dateRange || "2018-2024"}
              </span>
            </div>
          </div>

          {/* Horizontal thumbnails container */}
          <div
            className="flex gap-1 mt-9 overflow-visible"
            style={{ height: DIMENSIONS.EXPANDED_THUMBNAIL_WIDTH }}
            onMouseLeave={handleMouseLeave}
          >
            {projects.map((project) => (
              <ExpandableThumbnail
                key={project.id}
                project={project}
                isExpanded={expandedId === project.id}
                onExpand={() => setExpandedId(project.id)}
                onPlayerOpenChange={setIsAnyPlayerOpen}
                transitionDuration={settings.transitionDuration}
              />
            ))}
          </div>

          {/* Labels row */}
          <div className="flex gap-1 mt-1 h-24" style={{ color: settings.textColor }}>
            {projects.map((project) => (
              <div
                key={project.id}
                className="min-w-0"
                style={{
                  flex: expandedId === project.id ? `0 0 ${DIMENSIONS.EXPANDED_THUMBNAIL_WIDTH}` : 1,
                  width: expandedId === project.id ? DIMENSIONS.EXPANDED_THUMBNAIL_WIDTH : undefined,
                  transition: `flex ${settings.transitionDuration}ms ease-out, width ${settings.transitionDuration}ms ease-out`,
                }}
              >
                <div
                  className={`font-paragraph flex justify-between px-2 text-[10px] py-2 transition-opacity duration-300 ${
                    expandedId === project.id && !isAnyPlayerOpen ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    pointerEvents: expandedId === project.id ? "auto" : "none",
                  }}
                >
                  <div className="flex flex-col gap-1.5 items-start flex-1 min-w-0 pr-2">
                    <span className="opacity-60 text-[10px] whitespace-nowrap overflow-hidden text-ellipsis block">
                      {project.date}
                    </span>
                    <span className="opacity-60 text-[10px] leading-tight whitespace-nowrap overflow-hidden text-ellipsis block">
                      {project.role}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5 items-end text-right flex-1 min-w-0 pl-2">
                    <span className="font-bold uppercase text-[10px] leading-tight whitespace-nowrap overflow-hidden text-ellipsis block">
                      {project.title}
                    </span>
                    <span className="opacity-60 text-[10px] leading-tight whitespace-nowrap overflow-hidden text-ellipsis block">
                      Client <span className="uppercase">{project.client}</span>
                    </span>
                    <span className="opacity-60 text-[10px] leading-tight whitespace-nowrap overflow-hidden text-ellipsis block">
                      Studio <span className="uppercase">{project.productionCompany}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
