import type { FeaturedProject, CompactProject } from "@/lib/types"

/**
 * Centralized placeholder projects data
 * Used for preview mode when no real project data is configured
 */

export const FEATURED_PLACEHOLDER_PROJECTS: FeaturedProject[] = [
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

export const COMPACT_PLACEHOLDER_PROJECTS: CompactProject[] = [
  { id: "1", title: "SCENERY AND SENTIMENT | GENSHIN IMPACT", date: "2023", role: "Executive Producer", client: "HOYOVERSE", productionCompany: "SUN CREATURE", thumbnailUrl: "", videoUrl: "" },
  { id: "2", title: "IT'S ON!", date: "2018", role: "Executive Producer, Editor", client: "RIOT GAMES", productionCompany: "SUN CREATURE", thumbnailUrl: "", videoUrl: "" },
  { id: "3", title: "MARVEL MIDNIGHT SUN", date: "2022", role: "Executive Producer", client: "2K GAMES", productionCompany: "SUN CREATURE", thumbnailUrl: "", videoUrl: "" },
  { id: "4", title: "NINJAGO LEGACY", date: "2021", role: "Executive Producer", client: "LEGO", productionCompany: "SUN CREATURE", thumbnailUrl: "", videoUrl: "" },
  { id: "5", title: "THE GOBLIN QUEEN", date: "2024", role: "Executive Producer", client: "SUPERCELL", productionCompany: "SUN CREATURE", thumbnailUrl: "", videoUrl: "" },
  { id: "6", title: "THE PATH, AN IONIAN MYTH", date: "2020", role: "Executive Producer, Editor", client: "RIOT GAMES", productionCompany: "SUN CREATURE", thumbnailUrl: "", videoUrl: "" },
  { id: "7", title: "ONLY SLIGHTLY EXAGGERATED", date: "2019", role: "Executive Producer", client: "TRAVEL OREGON", productionCompany: "SUN CREATURE", thumbnailUrl: "", videoUrl: "" },
  { id: "8", title: "SCENERY AND SENTIMENT | GENSHIN IMPACT", date: "2023", role: "Executive Producer", client: "HOYOVERSE", productionCompany: "SUN CREATURE", thumbnailUrl: "/images/other-projects/genshin-impact-thumbnail.webp", videoUrl: "/videos/other-projects/genshin-impact-hover.webm", fullLengthVideoUrl: "/videos/other-projects/genshin-impact-full-length.webm" },
  { id: "9", title: "IT'S ON!", date: "2018", role: "Executive Producer, Editor", client: "RIOT GAMES", productionCompany: "SUN CREATURE", thumbnailUrl: "/images/other-projects/its-on-thumbnail.webp", videoUrl: "/videos/other-projects/its-on-hover.webm", fullLengthVideoUrl: "/videos/other-projects/its-on-full-length.webm" },
]
