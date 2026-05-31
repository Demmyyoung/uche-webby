"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { urlFor } from "./sanityClient";

// 1. Updated Interface to support Image objects from Sanity
export interface Project {
  _id: string;
  title: string;
  description: string;
  color?: string; // Optional color from Sanity (no longer used for card backgrounds)
  image?: any; // Sanity Image Object
  images?: any[]; // Sanity Image Objects
  websiteUrl?: string; // URL to open
}

// 2. Fallback Hardcoded Array (used while Sanity is connecting/failing)
export const fallbackProjects: Project[] = [
  {
    _id: "1",
    title: "Leadership",
    description:
      "Served as Vice Chairman of the SHRL Advisory Committee, representing student housing policy and operations to university leadership while directing resource allocation.",
    websiteUrl: "https://www.linkedin.com/in/uchechukwu-ogbuaku-1a6145306/",
    images: [
      "/img/IMG-20260522-WA0004.jpg",
      "/img/IMG-20260522-WA0005.jpg",
      "/img/IMG-20260522-WA0015.jpg"
    ]
  },
  {
    _id: "2",
    title: "Campus Presence",
    description:
      "Coordinated event logistics and operations for student-led initiatives as Marketing Executive for the College Hustle Collective, reaching over 1,500 students.",
    websiteUrl: "https://www.linkedin.com/in/uchechukwu-ogbuaku-1a6145306/",
    images: [
      "/img/the cage ambassador.jpg",
      "/img/abpsi volunteer.jpg",
      "/img/IMG-20260522-WA0013.jpg",
      "/img/IMG-20260522-WA0017.jpg",
      "/img/IMG-20260522-WA0011.jpg",
      "/img/IMG-20260522-WA0012.jpg"
    ]
  },
  {
    _id: "3",
    title: "Academic Experience",
    description:
      "Conducted research on tech-based logistics solutions under the African Continental Free Trade Area (AfCFTA) framework to optimize cross-border supply chains.",
    websiteUrl: "https://www.linkedin.com/in/uchechukwu-ogbuaku-1a6145306/",
    images: [
      "/img/IMG-20260522-WA0007.jpg",
      "/img/IMG-20260522-WA0009.jpg",
      "/img/IMG-20260522-WA0010.jpg"
    ]
  },
  {
    _id: "4",
    title: "Career Interests",
    description:
      "Focusing on inventory management, asset tracking, scheduling systems, and data-driven supply chain forecasting with advanced Microsoft Excel modeling.",
    websiteUrl: "https://www.linkedin.com/in/uchechukwu-ogbuaku-1a6145306/",
    images: [
      "/img/IMG-20260522-WA0003.jpg",
      "/img/IMG-20260522-WA0008.jpg"
    ]
  },
  {
    _id: "5",
    title: "Career Goals",
    description:
      "Aiming to lead global supply chain operations, optimize logistics workflows, and leverage data analytics for efficient distribution and service delivery.",
    websiteUrl: "https://www.linkedin.com/in/uchechukwu-ogbuaku-1a6145306/",
    images: [
      "/img/IMG-20260522-WA0008.jpg"
    ]
  },
  {
    _id: "6",
    title: "Personal Interests",
    description:
      "Combining interests in technical sound engineering, client services, amateur photography, and financial market analysis of equities.",
    websiteUrl: "https://www.linkedin.com/in/uchechukwu-ogbuaku-1a6145306/",
    images: [
      "/img/IMG-20260522-WA0006.jpg",
      "/img/IMG-20260522-WA0016.jpg",
      "/img/IMG-20260522-WA0018.jpg",
      "/img/IMG-20260522-WA0014.jpg"
    ]
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
  onHoverStateChange?: (isHovered: boolean) => void;
}

export default function VinylStack({ projects, onHoverStateChange }: VinylStackProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number>(0);
  const [slideIndex, setSlideIndex] = useState<number>(0);

  const currentTransition = isMobile
    ? {
        type: "spring",
        stiffness: 150,
        damping: 22,
      }
    : springTransition;

  // Parallax tracking logic removed to prevent zooming and mouse-following effect

  // Touch Elastic Pull Logic for Mobile overscroll
  const touchStartXRef = useRef<number | null>(null);
  const isAtStartRef = useRef<boolean>(false);
  const isAtEndRef = useRef<boolean>(false);
  const pullX = useMotionValue(0);
  const pullXSpring = useSpring(pullX, { damping: 30, stiffness: 200 });

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMobile) return;
    const container = e.currentTarget;
    touchStartXRef.current = e.touches[0].clientX;
    isAtStartRef.current = container.scrollLeft <= 1;
    isAtEndRef.current = container.scrollLeft >= container.scrollWidth - container.clientWidth - 1;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMobile || touchStartXRef.current === null) return;
    const container = e.currentTarget;
    const deltaX = e.touches[0].clientX - touchStartXRef.current;

    const isAtStart = container.scrollLeft <= 1;
    const isAtEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth - 1;

    if (isAtStart && deltaX > 0) {
      if (!isAtStartRef.current) {
        touchStartXRef.current = e.touches[0].clientX;
        isAtStartRef.current = true;
        pullX.set(0);
      } else {
        const dampened = Math.pow(deltaX, 0.75);
        pullX.set(dampened);
      }
    } else if (isAtEnd && deltaX < 0) {
      if (!isAtEndRef.current) {
        touchStartXRef.current = e.touches[0].clientX;
        isAtEndRef.current = true;
        pullX.set(0);
      } else {
        const dampened = -Math.pow(-deltaX, 0.75);
        pullX.set(dampened);
      }
    } else {
      pullX.set(0);
      isAtStartRef.current = false;
      isAtEndRef.current = false;
    }
  };

  const handleTouchEnd = () => {
    touchStartXRef.current = null;
    pullX.set(0);
  };

  // handleGlobalMouseMove removed

  // No fetch needed here — projects are pre-loaded in App.tsx during the loading screen.

  // Check for mobile layout
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Slideshow timer runs only when a panel is hovered (or active on mobile)
  useEffect(() => {
    const activeIdx = isMobile ? mobileActiveIndex : hoveredIndex;
    if (activeIdx === null) {
      setSlideIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setSlideIndex((prev) => prev + 1);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [hoveredIndex, mobileActiveIndex, isMobile]);

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

      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);

      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredIndex(index);
        if (onHoverStateChange) {
          onHoverStateChange(true);
        }
        triggerHaptic();
      }, 150);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);

      resetTimeoutRef.current = setTimeout(() => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        setHoveredIndex(null);
        if (onHoverStateChange) {
          onHoverStateChange(false);
        }
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

    if (closestIndex !== mobileActiveIndex) {
      setMobileActiveIndex(closestIndex);
    }
  };

  return (
    <div
      className={`w-full h-screen flex items-center justify-center relative overflow-hidden font-sans transition-all duration-500 ${zoomedIndex !== null ? "pb-0" : "pb-12 md:pb-0"}`}
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
      <motion.div
        style={{ x: pullXSpring }}
        className={`relative z-10 w-full h-full flex items-center md:justify-center overflow-x-auto md:overflow-visible snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isMobile ? "" : "scroll-smooth"} transition-all duration-500 ${zoomedIndex !== null ? "px-0" : "px-[7.5vw] md:px-8"}`}
        onScroll={handleScrollSnap}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {projects.map((project, index) => {
          const isActive = hoveredIndex === index;

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

          // Generate Image URL based on slideshow or legacy image field (supporting local files & Sanity references)
          let imageUrl: string | null = null;
          const isActiveCard = isMobile ? mobileActiveIndex === index : hoveredIndex === index;
          if (project.images && project.images.length > 0) {
            const currentImgIndex = isActiveCard ? (slideIndex % project.images.length) : 0;
            const currentImage = project.images[currentImgIndex];
            if (typeof currentImage === "string") {
              imageUrl = currentImage;
            } else if (currentImage) {
              try {
                imageUrl = urlFor(currentImage).url();
              } catch (e) {
                imageUrl = null;
              }
            }
          } else if (project.image) {
            if (typeof project.image === "string") {
              imageUrl = project.image;
            } else {
              try {
                imageUrl = urlFor(project.image).url();
              } catch (e) {
                imageUrl = null;
              }
            }
          }

          return (
            <motion.div
              key={project._id}
              className="relative flex-shrink-0 cursor-pointer overflow-hidden transform-gpu snap-center snap-always touch-pan-x border"
              style={{
                backgroundColor: isActiveCard ? "#121212" : "rgba(24, 24, 27, 0.45)",
                backdropFilter: isActiveCard ? "none" : "blur(16px)",
                borderColor: isActiveCard ? "rgba(255, 255, 255, 0.0)" : "rgba(255, 255, 255, 0.08)",
              }}
              onClick={(e) => {
                if (isActive || (isMobile && mobileActiveIndex === index)) {
                  handleViewProject(e, index, project.websiteUrl);
                } else if (!isMobile) {
                  handleMouseEnter(index);
                }
              }}
              initial={false}
              animate={
                zoomedIndex === index
                  ? {
                      width: "100vw",
                      height: "100vh",
                      scale: 1.0,
                      borderRadius: "0px",
                      zIndex: 100,
                      opacity: 1,
                      x: 0,
                      y: 0,
                      marginLeft: "0px",
                      transition: { duration: 0.6, ease: "easeInOut" },
                    }
                  : zoomedIndex !== null
                    ? {
                        x: index < zoomedIndex ? (isMobile ? "-120vw" : "-100vw") : (isMobile ? "120vw" : "100vw"),
                        opacity: 0,
                        width: "0px",
                        marginLeft: "0px",
                        borderRadius: "48px",
                        zIndex: index,
                        transition: { duration: 0.5, ease: "easeInOut" }
                      }
                    : isMobile
                      ? {
                          width: "85vw",
                          height: "85vh",
                          borderRadius: "48px",
                          marginLeft: marginLeft,
                          scale: mobileActiveIndex === index ? 1 : 0.9,
                          opacity: mobileActiveIndex === index ? 1 : 0.6,
                          y: 0,
                          x: 0,
                          zIndex: mobileActiveIndex === index ? 50 : index,
                        }
                      : {
                          width: isActive ? "55vw" : "10vw",
                          height: isActive ? "85vh" : "75vh",
                          borderRadius: "48px",
                          marginLeft: marginLeft,
                          scale: 1,
                          y: 0,
                          x: 0,
                          zIndex: isActive ? 50 : index,
                        }
              }
              transition={currentTransition}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Image Render if Available with Slideshow Crossfade */}
              <AnimatePresence>
                {imageUrl && (
                  <>
                    {/* Blurred dynamic background glow (active only) */}
                    {isActiveCard && (
                      <motion.img
                        key={`${imageUrl}-blur`}
                        src={imageUrl}
                        alt=""
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.35 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full object-cover z-0 filter blur-2xl scale-110 opacity-35 select-none pointer-events-none"
                      />
                    )}
                    {/* Sharp foreground image */}
                    <motion.img
                      key={imageUrl}
                      src={imageUrl}
                      alt={project.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className={`absolute inset-0 w-full h-full z-0 transition-all duration-300 ${
                        isActiveCard ? "object-contain p-4 md:p-8" : "object-cover"
                      }`}
                    />
                  </>
                )}
              </AnimatePresence>

              {/* Internal Content Container */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8 z-10">
                {/* Expanded State Content */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: zoomedIndex === index ? 0 : (isMobile || isActive ? 1 : 0),
                    y: zoomedIndex === index ? -20 : (isMobile || isActive ? 0 : 20),
                  }}
                  transition={{
                    duration: 0.3,
                    delay: zoomedIndex === index ? 0 : (isActive && !isMobile ? 0.1 : 0),
                  }}
                  className={`w-full ${isActive ? "max-w-xl" : "max-w-0"} md:max-w-lg lg:max-w-2xl pointer-events-auto`}
                  style={{
                    pointerEvents: isActive || isMobile ? "auto" : "none",
                  }}
                >
                  <h3 className="text-white text-3xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-lg leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-white/90 text-sm md:text-lg font-medium mb-4 leading-relaxed line-clamp-3 md:line-clamp-none drop-shadow-md max-w-[85%]">
                    {project.description}
                  </p>
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
      </motion.div>
    </div>
  );
}
