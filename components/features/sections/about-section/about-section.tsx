"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { AboutSectionSettings } from "./index";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  settings: AboutSectionSettings;
  isSelected?: boolean;
}

const paddingMap: Record<string, string> = {
  md: "4rem",
  lg: "6rem",
  xl: "8rem",
};

export function AboutSection({ settings, isSelected }: Props) {
  // Parse logos from newline-separated string
  const logosString = settings.logos || '';
  const logos = logosString.split('\n').filter(url => url.trim());
  const imageRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isHighResLoaded, setIsHighResLoaded] = useState(false);

  // Progressive image loading: determine if we need low-res fallback
  const lowResImage = settings.imageUrl?.replace('profile-highres', 'profile-lowres');
  const highResImage = settings.imageUrl;
  const shouldUseProgressive = settings.imageUrl?.includes('profile-highres');

  // Track if we're on client (for effects that need window)
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Scroll-linked animation for "I'm Bo Juhl" text
  useEffect(() => {
    if (!nameRef.current || !sectionRef.current || !isClient) return;

    const section = sectionRef.current;
    const name = nameRef.current;
    const translateDistance = window.innerHeight * 0.50;

    // Use fromTo with immediateRender to guarantee initial state
    const tween = gsap.fromTo(
      name,
      { y: -translateDistance, force3D: true },
      {
        y: 0,
        ease: "none",
        force3D: true,
        immediateRender: true,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: `top+=${translateDistance}px bottom`,
          scrub: 0,
          invalidateOnRefresh: true,
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, [isClient]);

  // Fade-in effect for content elements (paragraph, image, marquee)
  useEffect(() => {
    if (!sectionRef.current || !isClient) return;

    const elements = [paragraphRef.current, imageRef.current, marqueeRef.current].filter(Boolean);
    if (elements.length === 0) return;

    const vh = window.innerHeight;

    const tweens = elements.map(element =>
      gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          immediateRender: true,
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: `+=${vh}px`,
            scrub: 0,
          },
        }
      )
    );

    return () => {
      tweens.forEach(t => t.kill());
    };
  }, [isClient]);

  // Parallax effect for image
  useEffect(() => {
    if (!imageRef.current || !sectionRef.current || !isClient) return;

    const imgElement = imageRef.current.querySelector('img');
    if (!imgElement) return;

    const section = sectionRef.current;

    const tween = gsap.fromTo(
      imgElement,
      { yPercent: -5, force3D: true },
      {
        yPercent: 5,
        ease: "none",
        force3D: true,
        immediateRender: true,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0,
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, [isClient]);

  // Preload high-res image in the background
  useEffect(() => {
    if (!shouldUseProgressive || !highResImage) return;

    const img = new Image();
    img.src = highResImage;
    img.onload = () => {
      setIsHighResLoaded(true);
    };
  }, [shouldUseProgressive, highResImage]);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        backgroundColor: settings.backgroundColor,
        color: settings.textColor,
        minHeight: "100vh",
      }}
      className={`relative ${
        isSelected ? "ring-2 ring-primary" : ""
      }`}
    >
      {/* Main Content - Split Layout, full height */}
      <div className="content-container h-full min-h-screen flex relative">
        {/* Left - Text (positioned from top, left aligned) */}
        <div className="w-full md:w-1/2 flex items-start px-8 md:px-16 lg:px-24 pt-32 md:pt-40">
          <div className="max-w-[500px]">
            {/* Name text - animated to appear in hero section */}
            <div
              ref={nameRef}
              className="mb-8 relative z-100"
              style={{
                mixBlendMode: "difference",
                // GSAP will set the transform - use visibility to prevent flash before JS runs
                visibility: isClient ? "visible" : "hidden",
                willChange: "transform",
              }}
            >
              <p
                className="font-paragraph text-base md:text-lg font-medium tracking-wide"
                style={{
                  color: "#ffffff",
                }}
              >
                {settings.heroName || "I'm Bo Juhl"}
              </p>
            </div>

            <p ref={paragraphRef} className="font-paragraph text-base md:text-lg leading-relaxed text-justify m-0" style={{ whiteSpace: 'pre-line', opacity: 0 }}>
              {settings.paragraph || "About text goes here..."}
            </p>
          </div>
        </div>

        {/* Right - Image (full height) with subtle parallax and progressive loading */}
        <div ref={imageRef} className="hidden md:block w-1/2 h-screen overflow-hidden" style={{ opacity: 0 }}>
          {settings.imageUrl ? (
            <div className="relative w-full h-full">
              {/* Low-res image (shown first) */}
              {shouldUseProgressive && lowResImage && (
                <img
                  src={lowResImage}
                  alt="About"
                  className="absolute inset-0 w-full h-[110%] object-cover transition-opacity duration-500"
                  style={{ opacity: isHighResLoaded ? 0 : 1 }}
                />
              )}
              {/* High-res image (fades in when loaded) */}
              <img
                src={shouldUseProgressive ? highResImage : settings.imageUrl}
                alt="About"
                className="w-full h-[110%] object-cover transition-opacity duration-500"
                style={{ opacity: shouldUseProgressive && !isHighResLoaded ? 0 : 1 }}
              />
            </div>
          ) : (
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500">
              No image
            </div>
          )}
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[30vh] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Logo Marquee - Constrained to content-container */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center">
        <div className="content-container w-full">
          {logos.length > 0 && (
            <div ref={marqueeRef} className="py-12 overflow-hidden" style={{ opacity: 0 }}>
              <div
                className="flex gap-24 animate-marquee"
                style={{
                  animationDuration: `${settings.marqueeSpeed}s`,
                }}
              >
                {/* Duplicate logos for seamless loop */}
                {[...logos, ...logos].map((logo, index) => (
                  <img
                    key={index}
                    src={logo}
                    alt={`Logo ${index}`}
                    className="h-12 w-auto opacity-50"
                    style={{
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Placeholder marquee when no logos */}
          {logos.length === 0 && (
            <div className="py-12 overflow-hidden opacity-30">
              <div
                className="flex gap-24 whitespace-nowrap animate-marquee"
                style={{
                  animationDuration: `${settings.marqueeSpeed}s`,
                }}
              >
                {Array.from({ length: 10 }).map((_, index) => (
                  <div key={index} className="h-12 w-32 bg-zinc-700 rounded" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
