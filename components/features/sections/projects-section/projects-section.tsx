"use client";

import { useState, useRef } from "react";
import type { ProjectsSectionSettings, ProjectItem } from "./index";
import { VideoPlayer } from "../../blocks/video-player";

interface Props {
  settings: ProjectsSectionSettings;
  isSelected?: boolean;
}

const paddingMap: Record<string, string> = {
  md: "4rem",
  lg: "6rem",
  xl: "8rem",
};

// Placeholder projects for preview
const placeholderProjects: ProjectItem[] = [
  {
    id: "1",
    title: "Project One",
    description:
      "Description for project one goes here. This is a brief overview of the work.",
    thumbnailUrl: "",
    videoUrl: "",
  },
  {
    id: "2",
    title: "Project Two",
    description:
      "Description for project two goes here. This is a brief overview of the work.",
    thumbnailUrl: "",
    videoUrl: "",
  },
  {
    id: "3",
    title: "Project Three",
    description:
      "Description for project three goes here. This is a brief overview of the work.",
    thumbnailUrl: "",
    videoUrl: "",
  },
  {
    id: "4",
    title: "Project Four",
    description:
      "Description for project four goes here. This is a brief overview of the work.",
    thumbnailUrl: "",
    videoUrl: "",
  },
  {
    id: "5",
    title: "Project Five",
    description:
      "Description for project five goes here. This is a brief overview of the work.",
    thumbnailUrl: "",
    videoUrl: "",
  },
  {
    id: "6",
    title: "Project Six",
    description:
      "Description for project six goes here. This is a brief overview of the work.",
    thumbnailUrl: "",
    videoUrl: "",
  },
];

function ProjectCard({
  project,
  alignment,
  textColor,
}: {
  project: ProjectItem;
  alignment: "left" | "right";
  textColor: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && project.videoUrl) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleClick = () => {
    if (project.fullLengthVideoUrl || project.videoUrl) {
      setIsPlayerOpen(true);
    }
  };

  const imageContent = (
    <div className="flex flex-col w-full md:w-[65%] flex-shrink-0 min-w-0">
      <div
        className="relative w-full aspect-video overflow-hidden cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {project.thumbnailUrl ? (
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isHovered && project.videoUrl ? "opacity-0" : "opacity-100"
            }`}
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-200 flex items-center justify-center text-zinc-400">
            No image
          </div>
        )}
        {project.videoUrl && (
          <video
            ref={videoRef}
            src={project.videoUrl}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>
      {/* Client and Studio info */}
      {(project.client || project.studio) && (
        <div
          className={`font-paragraph flex flex-wrap gap-x-8 gap-y-1 mt-3 text-xs opacity-60 overflow-hidden justify-start text-left ${
            alignment === "right" ? "md:justify-end md:text-right" : ""
          }`}
        >
          {project.client && (
            <span className="uppercase font-medium">{project.client}</span>
          )}
          {project.studio && (
            <span className="uppercase font-medium">{project.studio}</span>
          )}
        </div>
      )}
    </div>
  );

  const textContent = (
    <div
      className={`flex flex-col pt-2 w-full max-w-[350px] items-start ${
        alignment === "right" ? "md:items-end" : ""
      }`}
    >
      <h3
        className={`font-title text-xs font-bold uppercase mb-3 w-full text-left ${
          alignment === "right" ? "md:text-right" : ""
        }`}
      >
        {project.title}
      </h3>
      <p
        className={`font-paragraph text-xs leading-relaxed opacity-80 whitespace-pre-line w-full text-justify`}
        style={{
          textAlignLast: alignment === "right" ? "right" : "left"
        }}
      >
        {project.description}
      </p>
    </div>
  );

  return (
    <>
      <div
        className={`w-full flex flex-col md:flex-row gap-6 md:gap-8 ${
          alignment === "right"
            ? "md:flex-row-reverse md:justify-start"
            : "md:justify-start"
        }`}
        style={{ color: textColor }}
      >
        {imageContent}
        {textContent}
      </div>

      {/* Full-screen video player */}
      <VideoPlayer
        videoUrl={project.fullLengthVideoUrl || project.videoUrl}
        thumbnailUrl={project.thumbnailUrl}
        isOpen={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
        animationType={alignment === "left" ? "wipe-left" : "wipe-right"}
      />
    </>
  );
}

export function ProjectsSection({ settings, isSelected }: Props) {
  // Parse projects from JSON string
  let projects: ProjectItem[] = placeholderProjects;
  try {
    const parsed = JSON.parse(settings.projectsJson || '[]');
    if (Array.isArray(parsed) && parsed.length > 0) {
      projects = parsed;
    }
  } catch {
    // Use placeholder if JSON is invalid
  }

  return (
    <section
      id="projects"
      style={{
        backgroundColor: settings.backgroundColor,
        color: settings.textColor,
        paddingTop: paddingMap[settings.paddingY] || "8rem",
        paddingBottom: paddingMap[settings.paddingY] || "8rem",
      }}
      className={`${isSelected ? "ring-2 ring-primary" : ""}`}
    >
      <div className="content-container px-2">
        <div className="w-full flex flex-col my-2" style={{ gap: settings.gap }}>
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
  );
}
