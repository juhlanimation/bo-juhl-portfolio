"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ProgressiveImageProps {
  imageUrl?: string;
  alt: string;
}

export function ProgressiveImage({ imageUrl, alt }: ProgressiveImageProps) {
  const [isHighResLoaded, setIsHighResLoaded] = useState(false);

  // Progressive image loading: determine if we need low-res fallback
  const lowResImage = imageUrl?.replace("profile-highres", "profile-lowres");
  const highResImage = imageUrl;
  const shouldUseProgressive = imageUrl?.includes("profile-highres");

  // Preload high-res image in the background
  useEffect(() => {
    if (!shouldUseProgressive || !highResImage) return;

    let isCancelled = false;
    const img = new window.Image();
    img.src = highResImage;
    img.onload = () => {
      if (!isCancelled) {
        setIsHighResLoaded(true);
      }
    };

    return () => {
      isCancelled = true;
    };
  }, [shouldUseProgressive, highResImage]);

  if (!imageUrl) {
    return (
      <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500">
        No image
      </div>
    );
  }

  return (
    <div className="relative w-full h-[110%]">
      {/* Low-res image (shown first) */}
      {shouldUseProgressive && lowResImage && (
        <Image
          src={lowResImage}
          alt={alt}
          fill
          className="object-cover transition-opacity duration-500"
          style={{ opacity: isHighResLoaded ? 0 : 1 }}
        />
      )}
      {/* High-res image (fades in when loaded) */}
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className="object-cover transition-opacity duration-500"
        style={{ opacity: shouldUseProgressive && !isHighResLoaded ? 0 : 1 }}
      />
    </div>
  );
}
