"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";
import type { LogoConfig } from "@/lib/logo-config";

interface LogoMarqueeProps {
  logos: LogoConfig[];
  /** Speed in pixels per second */
  speed?: number;
  /** Gap between logos in pixels */
  gap?: number;
}

const LOGO_WIDTH = 120;

export function LogoMarquee({ logos, speed = 50, gap = 96 }: LogoMarqueeProps) {
  const [repeatCount, setRepeatCount] = useState(2);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const singleSetWidthRef = useRef(0);
  // Use ref for speed to avoid recreating animate function on speed changes
  const speedRef = useRef(speed);

  // Keep speed ref in sync with prop
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const maxHeight = Math.max(...logos.map((l) => l.height), 48);

  // Memoized calculation to avoid unnecessary state updates
  const calculateRepeatCount = useCallback(() => {
    const viewportWidth = window.innerWidth;
    const singleSetWidth = logos.length * (LOGO_WIDTH + gap);
    singleSetWidthRef.current = singleSetWidth;

    // Need enough copies to fill viewport + one extra for seamless loop
    const copiesNeeded = Math.ceil(viewportWidth / singleSetWidth) + 2;
    const newCount = Math.max(2, copiesNeeded);

    // Only update state if value actually changed
    setRepeatCount((prev) => (prev === newCount ? prev : newCount));
  }, [logos.length, gap]);

  // Calculate repeat count on mount and resize
  useEffect(() => {
    // Intentional: Need to calculate initial value and respond to resize events
    // eslint-disable-next-line react-hooks/set-state-in-effect
    calculateRepeatCount();
    window.addEventListener("resize", calculateRepeatCount);
    return () => window.removeEventListener("resize", calculateRepeatCount);
  }, [calculateRepeatCount]);

  // Start animation on mount - stable function that reads speed from ref
  useEffect(() => {
    if (logos.length === 0) return;

    const animate = (timestamp: number) => {
      if (!trackRef.current) return;

      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }

      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // Move position based on speed (read from ref for latest value)
      positionRef.current -= (speedRef.current * delta) / 1000;

      // Width of one complete set
      const singleSetWidth = singleSetWidthRef.current;

      // Reset position when we've scrolled one full set (seamless loop)
      if (singleSetWidth > 0 && Math.abs(positionRef.current) >= singleSetWidth) {
        positionRef.current += singleSetWidth;
      }

      trackRef.current.style.transform = `translateX(${positionRef.current}px)`;

      animationRef.current = requestAnimationFrame(animate);
    };

    // Small delay to ensure layout is calculated
    const timer = setTimeout(() => {
      singleSetWidthRef.current = logos.length * (LOGO_WIDTH + gap);
      animationRef.current = requestAnimationFrame(animate);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [logos.length, gap]);

  if (logos.length === 0) {
    return (
      <div className="py-12 overflow-hidden opacity-30">
        <div className="flex gap-24">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={`placeholder-${index}`}
              className="h-12 w-32 bg-zinc-700 rounded shrink-0"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <FadeIn delay={200} className="py-12 overflow-hidden">
      <div style={{ minHeight: `${maxHeight}px` }}>
        <div ref={trackRef} className="flex will-change-transform">
          {/* Repeat logo set enough times to fill screen + seamless loop */}
          {Array.from({ length: repeatCount }).map((_, setIndex) =>
            logos.map((logo, logoIndex) => (
              <div
                key={`${setIndex}-${logoIndex}`}
                className="shrink-0 flex items-center justify-center"
                style={{
                  width: `${LOGO_WIDTH}px`,
                  height: `${maxHeight}px`,
                  marginRight: `${gap}px`,
                }}
              >
                <Image
                  src={logo.url}
                  alt={logo.name || `Client logo ${logoIndex + 1}`}
                  width={LOGO_WIDTH}
                  height={logo.height}
                  className="opacity-50 object-contain"
                  style={{
                    filter: "brightness(0) invert(1)",
                    width: "auto",
                    height: `${logo.height}px`,
                    maxWidth: `${LOGO_WIDTH}px`,
                  }}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </FadeIn>
  );
}
