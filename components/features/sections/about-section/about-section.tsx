import { cacheLife } from "next/cache"
import Image from "next/image"
import { ScrollFade } from "@/components/ui/scroll-fade"
import { ProgressiveImage } from "./progressive-image"
import { LogoMarquee } from "./logo-marquee"
import { CrossroadLink } from "./crossroad-link"
import type { AboutSectionSettings } from "./index"
import { logoConfig } from "@/lib/logo-config"

interface Props {
  settings: AboutSectionSettings
  isSelected?: boolean
}

// Helper function to render paragraph with "Crossroad" as a link
function renderParagraphWithLinks(text: string) {
  const parts = text.split(/(\bCrossroad\b)/g)

  return parts.map((part, index) => {
    if (part === "Crossroad") {
      return (
        <CrossroadLink key={index} href="https://crossroad.studio">
          {part}
        </CrossroadLink>
      )
    }
    return part
  })
}

export async function AboutSection({ settings, isSelected }: Props) {
  "use cache"
  cacheLife("days")

  // Use the centralized logo config instead of parsing from settings
  const logos = logoConfig

  return (
    <section
      id="about"
      style={{
        backgroundColor: settings.backgroundColor,
        color: settings.textColor,
        minHeight: "100dvh",
      }}
      className={`relative ${isSelected ? "ring-2 ring-primary" : ""}`}
    >
      {settings.imageUrl && (
        <div className="md:hidden absolute inset-0 overflow-hidden">
          <Image
            src={settings.imageUrl}
            alt=""
            fill
            className="object-cover opacity-30"
          />
        </div>
      )}

      <ScrollFade className="content-container h-full flex relative" style={{ minHeight: '100dvh' }}>
        <div className="w-full md:w-1/2 flex items-start px-8 md:px-16 lg:px-24 pt-32 md:pt-40">
          <div className="max-w-[500px]">
            <p
              className="font-paragraph text-sm md:text-sm leading-relaxed text-justify m-0"
              style={{ whiteSpace: "pre-line" }}
            >
              {renderParagraphWithLinks(settings.paragraph || "About text goes here...")}
            </p>
            <p className="font-paragraph text-sm md:text-sm text-right mt-4 italic">
              Bo Juhl
            </p>
          </div>
        </div>

        <div className="hidden md:block w-1/2 overflow-hidden" style={{ height: '100dvh' }}>
          <ProgressiveImage
            highResUrl={settings.imageUrl}
            lowResUrl={settings.imageUrl?.replace("profile-highres", "profile-lowres")}
            alt="About"
          />
        </div>
      </ScrollFade>

      <div
        className="absolute bottom-0 left-0 right-0 h-[30dvh] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="hidden md:flex absolute bottom-8 left-0 right-0 z-10 justify-center">
        <div className="content-container w-full">
          <LogoMarquee logos={logos} speed={settings.marqueeSpeed} />
        </div>
      </div>
    </section>
  )
}
