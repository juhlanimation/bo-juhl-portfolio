"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";

interface ProgressiveImageProps {
  /** High-resolution image URL */
  highResUrl?: string;
  /** Low-resolution placeholder image URL (optional - enables progressive loading) */
  lowResUrl?: string;
  alt: string;
}

export function ProgressiveImage({ highResUrl, lowResUrl, alt }: ProgressiveImageProps) {
  const [isHighResLoaded, setIsHighResLoaded] = useState(false);

  // Progressive loading is enabled when both URLs are provided
  const shouldUseProgressive = useMemo(
    () => Boolean(highResUrl && lowResUrl),
    [highResUrl, lowResUrl]
  );

  // Preload high-res image in the background
  useEffect(() => {
    if (!shouldUseProgressive || !highResUrl) return;

    let isCancelled = false;
    const img = new window.Image();
    img.src = highResUrl;
    img.onload = () => {
      if (!isCancelled) {
        setIsHighResLoaded(true);
      }
    };

    return () => {
      isCancelled = true;
    };
  }, [shouldUseProgressive, highResUrl]);

  if (!highResUrl) {
    return (
      <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500">
        No image
      </div>
    );
  }

  return (
    <div className="relative w-full h-[110%]">
      {/* Low-res image (shown first) */}
      {shouldUseProgressive && lowResUrl && (
        <Image
          src={lowResUrl}
          alt={alt}
          fill
          className="object-cover transition-opacity duration-500"
          style={{ opacity: isHighResLoaded ? 0 : 1 }}
        />
      )}
      {/* High-res image (fades in when loaded) */}
      <Image
        src={highResUrl}
        alt={alt}
        fill
        className="object-cover transition-opacity duration-500"
        style={{ opacity: shouldUseProgressive && !isHighResLoaded ? 0 : 1 }}
      />
    </div>
  );
}
