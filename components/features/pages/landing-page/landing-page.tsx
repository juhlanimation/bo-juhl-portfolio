import { cacheLife } from "next/cache";
import { Suspense } from "react";
import type { LandingPageSettings } from "./index";
import { PageLayout } from "../../layouts/page-layout/page-layout";
import { HeroSection } from "../../sections/hero-section/hero-section";
import { AboutSection } from "../../sections/about-section/about-section";
import { ProjectsSection } from "../../sections/projects-section/projects-section";
import { MoreProjectsSection } from "../../sections/more-projects-section/more-projects-section";
import { FooterSection } from "../../sections/footer-section/footer-section";
import { projects, bioText } from "@/lib/projects-data";

interface Props {
  settings: LandingPageSettings;
  isSelected?: boolean;
}

// Default settings for child components
const defaultPageLayoutSettings = {
  showNavbar: true,
  navbarPosition: "fixed" as const,
  maxWidth: "none",
  backgroundColor: "transparent",
};

const defaultHeroSettings = {
  name: "I'm Bo Juhl",
  titles: "EXECUTIVE PRODUCER\nPRODUCER\nEDITOR",
  videoUrl: "/videos/frontpage/frontpage.webm",
  posterImage: "/placeholderImage.webp",
  overlayOpacity: 0.4,
  minHeight: "100dvh",
  backgroundColor: "#000000",
};

const defaultAboutSettings = {
  backgroundColor: "#000000",
  textColor: "#ffffff",
  paddingY: "xl",
  title: "ABOUT ME",
  imageUrl: "/images/profile-highres.webp",
  paragraph: bioText,
  logos: `/clients/netflix-alpha.png
/clients/AMZN_STUDIOS - alpha.png
/clients/cartoon-network-logo-alpha.png
/clients/riot-games-logo.png
/clients/EA Games - alpha.png
/clients/ubisoft-black-and-white-alpha.png
/clients/2K - Games.png
/clients/Supercell-logo-alpha.png
/clients/respawn-entertainment.png
/clients/azuki-alpha.png`,
  marqueeSpeed: 30,
};

// Transform centralized project data to component format
const featuredProjects = projects
  .filter((p) => p.category === "featured")
  .map((p) => ({
    id: p.id,
    title: p.title,
    description: `${p.description}\n\n${p.year}\n${p.role}`,
    thumbnailUrl: p.thumbnail,
    videoUrl: p.hoverVideo || p.fullLengthVideo,
    fullLengthVideoUrl: p.fullLengthVideo,
    client: p.client,
    studio: p.studio,
  }));

const otherProjects = projects
  .filter((p) => p.category === "other")
  .map((p) => ({
    id: p.id,
    title: p.title,
    date: p.year,
    role: p.role,
    client: p.client,
    productionCompany: p.studio,
    thumbnailUrl: p.thumbnail,
    videoUrl: p.hoverVideo || p.fullLengthVideo,
    fullLengthVideoUrl: p.fullLengthVideo,
  }));

const defaultProjectsSettings = {
  backgroundColor: "#ffffff",
  textColor: "#000000",
  paddingY: "xl",
  gap: "16rem",
  projectsJson: JSON.stringify(featuredProjects),
};

const defaultMoreProjectsSettings = {
  title: "OTHER SELECTED PROJECTS",
  dateRange: "2018-2024",
  projectsJson: JSON.stringify(otherProjects),
  backgroundColor: "#ffffff",
  textColor: "#000000",
  paddingY: "xl",
  expandScale: 2,
  transitionDuration: 400,
};

const defaultFooterSettings = {
  copyrightText: "Copyright © Bo Juhl / All rights reserved",
  contactEmail: "hello@bojuhl.com",
  contactLinkedIn: "https://linkedin.com",
  studioName: "Crossroad Studio",
  studioUrl: "https://crossroad.studio",
  studioEmail: "bo@crossroad.studio",
  studioLinkedIn: "https://linkedin.com",
  studioInstagram: "https://instagram.com",
  backgroundColor: "#000000",
  textColor: "#ffffff",
  paddingY: "lg",
};

export async function LandingPage({ settings, isSelected }: Props) {
  "use cache";
  cacheLife("days");

  return (
    <PageLayout
      settings={{
        ...defaultPageLayoutSettings,
        showNavbar: settings.showNavbar,
      }}
      isSelected={isSelected}
    >
      <HeroSection settings={defaultHeroSettings} />
      <AboutSection
        settings={{
          ...defaultAboutSettings,
          heroName: defaultHeroSettings.name,
        }}
      />
      <ProjectsSection settings={defaultProjectsSettings} />
      {/* MoreProjectsSection stays client-side due to complex GSAP/ScrollSmoother interactions */}
      <Suspense fallback={<div className="h-[600px] bg-white" />}>
        <MoreProjectsSection settings={defaultMoreProjectsSettings} />
      </Suspense>
      <FooterSection settings={defaultFooterSettings} />
    </PageLayout>
  );
}
