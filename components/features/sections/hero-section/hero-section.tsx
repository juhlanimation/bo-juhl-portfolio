import { cacheLife } from "next/cache"
import type { HeroSectionSettings } from "./index"
import { VideoBackground } from "@/components/ui/video-background"
import { parseNewlineSeparated } from "@/lib/utils"

interface Props {
  settings: HeroSectionSettings
  isSelected?: boolean
}

export async function HeroSection({ settings, isSelected }: Props) {
  "use cache"
  cacheLife("days")

  const titles = parseNewlineSeparated(
    settings.titles,
    "EXECUTIVE PRODUCER\nPRODUCER\nEDITOR"
  )

  return (
    <section
      id="hero"
      style={{
        minHeight: settings.minHeight,
        backgroundColor: settings.backgroundColor,
        isolation: "isolate",
      }}
      className={`relative ${isSelected ? "ring-2 ring-primary" : ""}`}
    >
      <div className="content-container relative min-h-screen mx-auto">
        <VideoBackground
          videoUrl={settings.videoUrl}
          posterImage={settings.posterImage}
          backgroundColor={settings.backgroundColor}
        />

        <div className="relative min-h-screen flex flex-col px-8 md:px-16 lg:px-24">
          <div className="grow" style={{ minHeight: "55dvh" }} />

          <div className="flex flex-col gap-4 md:gap-6 mt-6 pb-24">
            <p
              className="font-paragraph text-sm md:text-base font-medium tracking-wide mb-2"
              style={{
                color: "#ffffff",
                mixBlendMode: "difference",
              }}
            >
              I'm Bo Juhl
            </p>
            {titles.map((title, index) => (
              <h1
                key={index}
                className="font-title text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-wide"
                style={{
                  color: "#ffffff",
                  mixBlendMode: "difference",
                }}
              >
                {title}
              </h1>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
