"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import { useCursorLabel } from "@/lib/hooks";
import { CursorLabel } from "@/components/ui/cursor-label";
import { TIMING } from "@/lib/constants/animations";

interface VideoBackgroundProps {
  videoUrl?: string;
  posterImage?: string;
  backgroundColor?: string;
}

/**
 * VideoBackground - Hero section video background with scroll-based play/pause
 * Uses useCursorLabel for DRY cursor tracking
 */
export function VideoBackground({
  videoUrl,
  posterImage,
  backgroundColor = "#000000",
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInViewRef = useRef(true);
  const smoothScroll = useSmoothScroll();
  const { mousePos, isHovered, cursorProps } = useCursorLabel();

  // Pause/resume video based on scroll position (50vh threshold)
  useEffect(() => {
    if (!smoothScroll) return;

    const handleTick = () => {
      const video = videoRef.current;
      if (!video) return;

      const threshold = window.innerHeight * 0.5;
      // Use ScrollSmoother's scroll position instead of window.scrollY
      // (ScrollSmoother uses transforms, so window.scrollY is always 0)
      const scrollY = smoothScroll.getScroll();
      const isNowInView = scrollY <= threshold;

      // Early return if view state hasn't changed (optimization)
      const wasInView = isInViewRef.current;
      if (wasInView === isNowInView) return;

      isInViewRef.current = isNowInView;

      if (!isNowInView) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    // Use GSAP's ticker which runs on every animation frame
    gsap.ticker.add(handleTick);
    return () => gsap.ticker.remove(handleTick);
  }, [smoothScroll]);

  const attemptPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !isInViewRef.current) return;

    try {
      video.muted = true;
      await video.play();
    } catch {
      setTimeout(async () => {
        try {
          if (isInViewRef.current) await video.play();
        } catch {
          // Autoplay blocked - user interaction required
        }
      }, TIMING.AUTOPLAY_RETRY_DELAY);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    if (video.readyState >= 3) {
      attemptPlay();
    }

    // Use only loadeddata event (canplay is redundant when both have same handler)
    video.addEventListener("loadeddata", attemptPlay, { once: true });

    return () => {
      video.removeEventListener("loadeddata", attemptPlay);
    };
  }, [videoUrl, attemptPlay]);

  if (videoUrl) {
    return (
      <>
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ backgroundColor }}
        />
        {/* Invisible overlay to capture hover events across entire section */}
        <div
          className="absolute inset-0 z-10"
          {...cursorProps}
        />
        <CursorLabel
          label="scroll to explore"
          isVisible={isHovered}
          mousePos={mousePos}
        />
      </>
    );
  }

  if (posterImage) {
    return (
      <Image
        src={posterImage}
        alt="Hero background"
        fill
        className="object-cover"
      />
    );
  }

  return <div className="absolute inset-0 bg-zinc-900" />;
}
