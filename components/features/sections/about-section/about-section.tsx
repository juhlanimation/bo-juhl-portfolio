import { cacheLife } from "next/cache"
import Image from "next/image"
import { ScrollFade } from "@/components/ui/scroll-fade"
import { ProgressiveImage } from "./progressive-image"
import { LogoMarquee } from "./logo-marquee"
import type { AboutSectionSettings } from "./index"
import { parseNewlineSeparated } from "@/lib/utils"

interface Props {
  settings: AboutSectionSettings
  isSelected?: boolean
}

export async function AboutSection({ settings, isSelected }: Props) {
  "use cache"
  cacheLife("days")

  const logos = parseNewlineSeparated(settings.logos)

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

      <ScrollFade className="content-container h-full min-h-screen flex relative">
        <div className="w-full md:w-1/2 flex items-start px-8 md:px-16 lg:px-24 pt-32 md:pt-40">
          <div className="max-w-[500px]">
            <h2
              className="font-title text-base md:text-lg font-bold mb-6"
              style={{ color: settings.textColor }}
            >
              MY PATH
            </h2>

            <p
              className="font-paragraph text-sm md:text-sm leading-relaxed text-justify m-0"
              style={{ whiteSpace: "pre-line" }}
            >
              {settings.paragraph || "About text goes here..."}
            </p>
          </div>
        </div>

        <div className="hidden md:block w-1/2 h-screen overflow-hidden">
          <ProgressiveImage imageUrl={settings.imageUrl} alt="About" />
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
          <LogoMarquee logos={logos} marqueeSpeed={settings.marqueeSpeed} />
        </div>
      </div>
    </section>
  )
}
