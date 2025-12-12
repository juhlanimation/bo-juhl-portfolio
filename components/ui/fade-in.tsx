"use client";

import { useRef, useEffect, ReactNode } from "react";
import { ANIMATION_DURATIONS } from "@/lib/constants/animations";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className = "", delay = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Use ref for delay to avoid recreating observer when delay changes
  const delayRef = useRef(delay);

  // Keep delay ref in sync
  useEffect(() => {
    delayRef.current = delay;
  }, [delay]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = "1";
            // Remove GPU hints after animation completes to free resources
            setTimeout(() => {
              el.style.willChange = "auto";
              el.style.transform = "none";
            }, ANIMATION_DURATIONS.FADE_IN * 1000); // Convert seconds to ms
          }, delayRef.current);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []); // No dependencies - observer created once on mount

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transition: `opacity ${ANIMATION_DURATIONS.FADE_IN}s ease-out`,
        willChange: "opacity",
        transform: "translateZ(0)",
      }}
    >
      {children}
    </div>
  );
}
