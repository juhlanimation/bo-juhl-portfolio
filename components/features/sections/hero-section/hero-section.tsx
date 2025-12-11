"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import type { HeroSectionSettings } from "./index";

interface Props {
  settings: HeroSectionSettings;
  isSelected?: boolean;
}

export function HeroSection({ settings, isSelected }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const isInViewRef = useRef(true);

  // Pause/resume video based on scroll position (50vh threshold)
  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.5;
      const video = videoRef.current;
      if (!video) return;

      const wasInView = isInViewRef.current;
      const isNowInView = window.scrollY <= threshold;

      if (wasInView && !isNowInView) {
        // Scrolled past 50vh - pause
        video.pause();
      } else if (!wasInView && isNowInView) {
        // Scrolled back within 50vh - resume
        video.play().catch(() => {});
      }

      isInViewRef.current = isNowInView;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const attemptPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !isInViewRef.current) return;

    try {
      video.muted = true;
      await video.play();
    } catch (error) {
      console.warn('Autoplay prevented:', error);
      setTimeout(async () => {
        try {
          if (isInViewRef.current) await video.play();
        } catch (retryError) {
          console.error('Video autoplay failed after retry:', retryError);
        }
      }, 500);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !settings.videoUrl) return;

    const handleCanPlay = () => {
      attemptPlay();
    };

    if (video.readyState >= 3) {
      attemptPlay();
    }

    video.addEventListener('canplay', handleCanPlay, { once: true });
    video.addEventListener('loadeddata', handleCanPlay, { once: true });

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleCanPlay);
    };
  }, [settings.videoUrl, attemptPlay]);

  // Trigger content fade-in on mount
  useEffect(() => {
    // Small delay to ensure smooth animation
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Parse titles from newline-separated string
  const titlesString = settings.titles || 'EXECUTIVE PRODUCER\nPRODUCER\nEDITOR';
  const titles = titlesString.split('\n').filter(t => t.trim());

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
      {/* Max-width container for all content including video */}
      <div className="content-container relative min-h-screen mx-auto">
        {/* Video Background - always visible for autoplay */}
        {settings.videoUrl ? (
          <video
            ref={videoRef}
            src={settings.videoUrl}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            poster={settings.posterImage}
            onLoadedData={() => setIsVideoLoaded(true)}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{
              backgroundColor: settings.backgroundColor,
              opacity: isVideoLoaded ? 1 : 0,
            }}
          />
        ) : settings.posterImage ? (
          <img
            src={settings.posterImage}
            alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 from-zinc-900 to-black" />
        )}

        {/* Overlay - behind content */}
        <div
          style={{ opacity: settings.overlayOpacity }}
          className="absolute inset-0 bg-black pointer-events-none"
        />

        {/* Content wrapper - fades in on mount, then stays visible */}
        <div
          className="relative min-h-screen flex flex-col px-8 md:px-16 lg:px-24"
          style={{
            opacity: showContent ? 1 : 0,
            transition: "opacity 1s ease-out",
          }}
        >
          {/* Spacer to push content to bottom area */}
          <div className="flex-grow" style={{ minHeight: "55vh" }} />

          {/* Name and Titles */}
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
  );
}
