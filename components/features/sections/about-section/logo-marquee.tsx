"use client";

import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";

interface LogoMarqueeProps {
  logos: string[];
  marqueeSpeed?: number;
}

export function LogoMarquee({ logos, marqueeSpeed = 30 }: LogoMarqueeProps) {
  if (logos.length > 0) {
    return (
      <FadeIn delay={200} className="py-12 overflow-hidden">
        <div
          className="flex gap-24 animate-marquee"
          style={{
            animationDuration: `${marqueeSpeed}s`,
          }}
        >
          {/* Duplicate logos for seamless loop */}
          {[0, 1].map((setIndex) =>
            logos.map((logo, logoIndex) => (
              <Image
                key={`${setIndex}-${logoIndex}`}
                src={logo}
                alt={`Client logo ${logoIndex + 1}`}
                width={120}
                height={48}
                className="h-12 w-auto opacity-50"
                style={{
                  filter: "brightness(0) invert(1)",
                }}
              />
            ))
          )}
        </div>
      </FadeIn>
    );
  }

  // Placeholder marquee when no logos
  return (
    <div className="py-12 overflow-hidden opacity-30">
      <div
        className="flex gap-24 whitespace-nowrap animate-marquee"
        style={{
          animationDuration: `${marqueeSpeed}s`,
        }}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={`placeholder-${index}`} className="h-12 w-32 bg-zinc-700 rounded" />
        ))}
      </div>
    </div>
  );
}
