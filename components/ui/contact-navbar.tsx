"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";

interface Props {
  email: string;
  contactPrompt: string;
}

export function ContactNavbar({ email, contactPrompt }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const smoothScroll = useSmoothScroll();

  // Keep navbar visually fixed by counteracting the smooth-content transform
  useEffect(() => {
    const smoother = smoothScroll?.getSmoother();
    if (!smoother || !navRef.current) return;

    let rafId: number;
    const updatePosition = () => {
      if (navRef.current) {
        navRef.current.style.transform = `translateY(${smoother.scrollTop()}px)`;
      }
      rafId = requestAnimationFrame(updatePosition);
    };

    rafId = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(rafId);
  }, [smoothScroll]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleClick = useCallback(async () => {
    if (!isHovered) return;

    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [email, isHovered]);

  // When copied, revert to difference blend mode with white text
  const showPurple = isHovered && !isCopied;

  const navbarContent = (
    <div
      ref={navRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 0,
        zIndex: 9999,
        pointerEvents: "none",
        mixBlendMode: showPurple ? "normal" : "difference",
      }}
    >
      <nav
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div
          className="content-container"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              padding: "1.5rem",
              pointerEvents: "auto",
            }}
          >
            <div
              className="relative overflow-hidden cursor-pointer h-6 flex items-center"
              style={{
                color: showPurple ? "var(--interaction)" : "white",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            >
              <div className="relative">
                <div
                  className="font-paragraph text-base md:text-lg font-medium tracking-wide whitespace-nowrap transition-transform duration-400 ease-in-out"
                  style={{
                    transform: isHovered
                      ? "translateY(-100%)"
                      : "translateY(0)",
                  }}
                >
                  {contactPrompt}
                </div>
                <div
                  className="font-paragraph text-base md:text-lg font-medium tracking-wide whitespace-nowrap absolute top-full left-0 flex items-center gap-2 transition-transform duration-400 ease-in-out"
                  style={{
                    transform: isHovered
                      ? "translateY(-100%)"
                      : "translateY(0)",
                  }}
                >
                  {email}
                </div>
              </div>

              <div
                className="ml-2 transition-opacity duration-300 ease-in-out"
                style={{
                  opacity: isHovered ? 1 : 0,
                }}
              >
                <div className="relative overflow-hidden h-4 w-4">
                  <div className="relative">
                    <svg
                      className="h-4 w-4 transition-transform duration-300 ease-in-out"
                      style={{
                        transform: isCopied
                          ? "translateY(-100%)"
                          : "translateY(0)",
                      }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                    <svg
                      className="h-4 w-4 absolute top-full left-0 transition-transform duration-300 ease-in-out"
                      style={{
                        transform: isCopied
                          ? "translateY(-100%)"
                          : "translateY(0)",
                        color: "white",
                      }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );

  return navbarContent;
}
