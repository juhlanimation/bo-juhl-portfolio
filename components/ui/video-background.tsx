"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";

interface VideoBackgroundProps {
  videoUrl?: string;
  posterImage?: string;
  backgroundColor?: string;
}

export function VideoBackground({
  videoUrl,
  posterImage,
  backgroundColor = "#000000",
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInViewRef = useRef(true);
  const smoothScroll = useSmoothScroll();

  // Pause/resume video based on scroll position (50vh threshold)
  useEffect(() => {
    if (!smoothScroll) return;

    const handleTick = () => {
      const threshold = window.innerHeight * 0.5;
      const video = videoRef.current;
      if (!video) return;

      const wasInView = isInViewRef.current;
      // Use ScrollSmoother's scroll position instead of window.scrollY
      // (ScrollSmoother uses transforms, so window.scrollY is always 0)
      const scrollY = smoothScroll.getScroll();
      const isNowInView = scrollY <= threshold;

      if (wasInView && !isNowInView) {
        video.pause();
      } else if (!wasInView && isNowInView) {
        video.play().catch(() => {});
      }

      isInViewRef.current = isNowInView;
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
    } catch (error) {
      console.warn("Autoplay prevented:", error);
      setTimeout(async () => {
        try {
          if (isInViewRef.current) await video.play();
        } catch (retryError) {
          console.error("Video autoplay failed after retry:", retryError);
        }
      }, 500);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    const handleCanPlay = () => {
      attemptPlay();
    };

    if (video.readyState >= 3) {
      attemptPlay();
    }

    video.addEventListener("canplay", handleCanPlay, { once: true });
    video.addEventListener("loadeddata", handleCanPlay, { once: true });

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleCanPlay);
    };
  }, [videoUrl, attemptPlay]);

  if (videoUrl) {
    return (
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
