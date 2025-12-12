"use client";

import { useRef, useEffect, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className = "", delay = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

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
            }, 700); // Match transition duration
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transition: "opacity 0.7s ease-out",
        willChange: "opacity",
        transform: "translateZ(0)",
      }}
    >
      {children}
    </div>
  );
}
