import { cacheLife } from "next/cache"
import type { ProjectsSectionSettings } from "./index"
import type { FeaturedProject } from "@/lib/types"
import { parseJsonWithFallback, scaleUnitValue, getPadding, sectionPaddingMap } from "@/lib/utils"
import { ProjectCard } from "./project-card"

interface Props {
  settings: ProjectsSectionSettings
  isSelected?: boolean
}

// Placeholder projects for preview
const placeholderProjects: FeaturedProject[] = [
  {
    id: "1",
    title: "Project One",
    description: "Description for project one goes here. This is a brief overview of the work.",
    thumbnailUrl: "",
    videoUrl: "",
  },
  {
    id: "2",
    title: "Project Two",
    description: "Description for project two goes here. This is a brief overview of the work.",
    thumbnailUrl: "",
    videoUrl: "",
  },
  {
    id: "3",
    title: "Project Three",
    description: "Description for project three goes here. This is a brief overview of the work.",
    thumbnailUrl: "",
    videoUrl: "",
  },
  {
    id: "4",
    title: "Project Four",
    description: "Description for project four goes here. This is a brief overview of the work.",
    thumbnailUrl: "",
    videoUrl: "",
  },
  {
    id: "5",
    title: "Project Five",
    description: "Description for project five goes here. This is a brief overview of the work.",
    thumbnailUrl: "",
    videoUrl: "",
  },
  {
    id: "6",
    title: "Project Six",
    description: "Description for project six goes here. This is a brief overview of the work.",
    thumbnailUrl: "",
    videoUrl: "",
  },
]

export async function ProjectsSection({ settings, isSelected }: Props) {
  "use cache"
  cacheLife("days")

  const projects = parseJsonWithFallback<FeaturedProject[]>(
    settings.projectsJson,
    placeholderProjects
  )

  const gapValue = settings.gap || "4rem"
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
