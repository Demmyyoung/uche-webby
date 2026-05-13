"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { urlFor } from "./sanityClient";

// 1. Updated Interface to support Image objects from Sanity
export interface Project {
  _id: string;
  title: string;
  description: string;
  color: string;
  image?: any; // Sanity Image Object
  websiteUrl?: string; // URL to open
}

// 2. Fallback Hardcoded Array (used while Sanity is connecting/failing)
export const fallbackProjects: Project[] = [
  {
    _id: "1",
    title: "D-MAX",
    description:
      "A bespoke clothing customization software and streetwear brand.",
    color: "#A855F7", // Purple
    websiteUrl: "https://your-dmax-website.com",
  },
  {
    _id: "2",
    title: "Desypher",
    description:
      "An AI-powered mobile study application designed to help students track and predict their academic grades.",
    color: "#06B6D4", // Cyan
    websiteUrl: "https://your-desypher-website.com",
  },
  {
    _id: "3",
    title: "NGO Web Initiatives",
    description:
      "A digital impact project providing custom web design and development for Nigerian non-governmental organizations to secure international grant funding.",
    color: "#ec4899", // Magenta/Pinkish
    websiteUrl: "https://your-ngo-website.com",
  },
];

const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

// VinylStack receives pre-fetched projects from App.tsx (loaded during the splash screen)
// so by the time the user navigates here, data is already available.
interface VinylStackProps {
  projects: Project[];                                 // passed from App.tsx
  onHoverChange?: (activeColor: string | null) => void;
}

export default function VinylStack({ projects, onHoverChange }: VinylStackProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [preHoveredIndex, setPreHoveredIndex] = useState<number | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number>(0);

  // Parallax Mouse Tracking Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Inverse tracking for depth: maps normalized mouse -1 to 1 to -3% to 3% movement
  const imageX = useTransform(mouseXSpring, [-1, 1], ["-3%", "3%"]);
  const imageY = useTransform(mouseYSpring, [-1, 1], ["-3%", "3%"]);

  const handleGlobalMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    // Normalize mouse coordinates from -1 to 1 based on screen size
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  // No fetch needed here — projects are pre-loaded in App.tsx during the loading screen.

  // Check for mobile layout
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Tiny vibration when interacting on supported devices
  const triggerHaptic = () => {
    if (
      typeof window !== "undefined" &&
      window.navigator &&
      window.navigator.vibrate
    ) {
      window.navigator.vibrate(50);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (!isMobile) {
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);

      setPreHoveredIndex(index);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);

      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredIndex(index);
        if (onHoverChange) {
          onHoverChange(projects[index]?.color || null);
        }
        triggerHaptic();
      }, 150);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);

      setPreHoveredIndex(null);

      resetTimeoutRef.current = setTimeout(() => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        setHoveredIndex(null);
        if (onHoverChange) onHoverChange(null);
      }, 100);
    }
  };

  const handleViewProject = (
    e: React.MouseEvent,
    index: number,
    url?: string,
  ) => {
    e.stopPropagation(); // prevent panel hover/click interference
    setZoomedIndex(index);

    // Wait for the 'voom' animation to finish, then open the site
    setTimeout(() => {
      if (url) {
        window.open(url, "_blank");
      }
      // Reset after a delay so it's normal when they return
      setTimeout(() => setZoomedIndex(null), 500);
    }, 600);
  };

  // Standard Scroll Snap for mobile devices
  const handleScrollSnap = (e: React.UIEvent<HTMLDivElement>) => {
    if (!isMobile) return;
    const container = e.currentTarget;
    const scrollMiddle = container.scrollLeft + container.clientWidth / 2;

    // Find the panel closest to the middle to trigger the reactive background color for Mobile!
    let closestIndex = 0;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child: any, index: number) => {
      const childMiddle = child.offsetLeft + child.clientWidth / 2;
      const distance = Math.abs(scrollMiddle - childMiddle);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (onHoverChange) {
      onHoverChange(projects[closestIndex]?.color || null);
    }
    setMobileActiveIndex(closestIndex);
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center relative overflow-hidden font-sans"
      onMouseMove={handleGlobalMouseMove}
    >
      {/* Loading is handled by the app-level LoadingScreen — no spinner needed here */}

      {/* Focus Mode Overlay: dims the background heavily when a panel is pushed */}
      <motion.div
        className="absolute inset-0 bg-black z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: hoveredIndex !== null && !isMobile ? 0.7 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* The Wrapper */}
      <div
        className="relative z-10 w-full h-screen flex items-center md:justify-center overflow-x-auto md:overflow-visible snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-[7.5vw] md:px-8 scroll-smooth"
        onScroll={handleScrollSnap}
      >
        {projects.map((project, index) => {
          const isActive = hoveredIndex === index;
          const isPreActive = preHoveredIndex === index;

          // "Part Ways" Logic (Negative Margins)
          let marginLeft = index === 0 ? "0px" : "-4vw";

          if (!isMobile && hoveredIndex !== null) {
            // Squeeze inactive cards slightly so the active card fits on-screen
            marginLeft = index === 0 ? "0px" : "-5vw";

            // Give the active card's immediate neighbors breathing room
            if (index === hoveredIndex && index !== 0) {
              marginLeft = "-2vw";
            }
            if (index === hoveredIndex + 1) {
              marginLeft = "1vw";
            }
          }

          if (isMobile) {
            marginLeft = index === 0 ? "0px" : "4vw";
          }

          // Generate Image URL if it exists
          const imageUrl = project.image ? urlFor(project.image).url() : null;

          return (
            <motion.div
              key={project._id}
              className="relative flex-shrink-0 cursor-pointer overflow-hidden transform-gpu snap-center snap-always touch-pan-x"
              style={{
                backgroundColor: project.color,
                borderRadius: "48px",
                zIndex: isActive ? 50 : index,
              }}
              initial={false}
              animate={
                zoomedIndex === index
                  ? {
                      scale: 25, // The 'voom' to fill screen
                      opacity: 0, // Fade out as it passes camera
                      zIndex: 100,
                      transition: { duration: 0.6, ease: "circIn" },
                    }
                  : isMobile
                    ? {
                        width: "85vw",
                        height: "85vh",
                        marginLeft: marginLeft,
                        scale: mobileActiveIndex === index ? 1 : 0.9,
                        opacity: mobileActiveIndex === index ? 1 : 0.6,
                        y: 0,
                        x: 0,
                      }
                    : {
                        width: isActive ? "55vw" : "10vw",
                        height: isActive ? "85vh" : "75vh",
                        marginLeft: marginLeft,
                        scale: isActive ? 1.02 : isPreActive ? 1.05 : 1,
                        y: isPreActive && !isActive ? -15 : 0,
                        x: 0,
                      }
              }
              transition={springTransition}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Image Render if Available */}
              {imageUrl && (
                <motion.img
                  src={imageUrl}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                  style={{
                    x: isActive ? imageX : 0,
                    y: isActive ? imageY : 0,
                    scale: 1.05, // Prevent edges showing during panning parallax
                  }}
                />
              )}

              {/* Internal Content Container */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8 z-10">
                {/* Expanded State Content */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isMobile || isActive ? 1 : 0,
                    y: isMobile || isActive ? 0 : 20,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: isActive && !isMobile ? 0.1 : 0,
                  }}
                  className={`w-full ${isActive ? "max-w-xl" : "max-w-0"} md:max-w-lg lg:max-w-2xl pointer-events-auto`}
                  style={{
                    pointerEvents: isActive || isMobile ? "auto" : "none",
                  }}
                >
                  <h3 className="text-white text-3xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-lg leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-white/90 text-sm md:text-lg font-medium mb-8 leading-relaxed line-clamp-3 md:line-clamp-none drop-shadow-md max-w-[85%]">
                    {project.description}
                  </p>

                  <motion.button
                    onClick={(e) =>
                      handleViewProject(e, index, project.websiteUrl)
                    }
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "#ffffff",
                      color: "#000000",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold text-sm transition-colors duration-200 uppercase tracking-widest shadow-xl pointer-events-auto w-max"
                  >
                    View Project
                  </motion.button>
                </motion.div>

                {/* "Vinyl Edge / Spine" Text */}
                {!isMobile && (
                  <motion.div
                    className="absolute top-0 left-0 w-[80px] h-full flex items-center justify-center pointer-events-none"
                    initial={false}
                    animate={{ opacity: isActive ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3
                      className="text-white text-2xl font-bold tracking-[0.2em] uppercase opacity-90 drop-shadow-md"
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                      }}
                    >
                      {project.title}
                    </h3>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
