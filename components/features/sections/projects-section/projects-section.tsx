import { cacheLife } from "next/cache"
import type { ProjectsSectionSettings } from "./index"
import type { FeaturedProject } from "@/lib/types"
import { parseJsonWithFallback, scaleUnitValue, getPadding, sectionPaddingMap } from "@/lib/utils"
import { FEATURED_PLACEHOLDER_PROJECTS } from "@/lib/constants/placeholder-projects"
import { ProjectCard } from "./project-card"

interface Props {
  settings: ProjectsSectionSettings
  isSelected?: boolean
}

export async function ProjectsSection({ settings, isSelected }: Props) {
  "use cache"
  cacheLife("days")

  const projects = parseJsonWithFallback<FeaturedProject[]>(
    settings.projectsJson,
    FEATURED_PLACEHOLDER_PROJECTS
  )

  const gapValue = settings.gap || "3.2rem"
  const mobileGap = scaleUnitValue(gapValue, 0.5)

  return (
    <section
      id="projects"
      style={
        {
          backgroundColor: settings.backgroundColor,
          color: settings.textColor,
          paddingTop: getPadding(settings.paddingY, sectionPaddingMap),
          paddingBottom: getPadding(settings.paddingY, sectionPaddingMap),
          "--gap-mobile": mobileGap,
          "--gap-desktop": gapValue,
        } as React.CSSProperties
      }
      className={`${isSelected ? "ring-2 ring-primary" : ""}`}
    >
      <div className="content-container px-2">
        <div className="w-full flex flex-col my-2 gap-(--gap-mobile) md:gap-(--gap-desktop)">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              alignment={index % 2 === 0 ? "left" : "right"}
              textColor={settings.textColor}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
