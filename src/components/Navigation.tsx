import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Home, Briefcase, User, Mail } from "lucide-react";

export type PageId = "home" | "work" | "about" | "contact";

interface NavigationProps {
  activePage: PageId;
  setActivePage: (id: PageId) => void;
  isHidden?: boolean;
}

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "work", label: "Work", icon: Briefcase },
  { id: "about", label: "About", icon: User },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function Navigation({ activePage, setActivePage, isHidden = false }: NavigationProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const touchStartXRef = useRef<number | null>(null);
  const buttonCoordsRef = useRef<{ id: string; centerX: number; width: number; left: number }[] | null>(null);
  const activeBtnCenterRef = useRef<number>(0);

  const [dragOffset, setDragOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [closestPage, setClosestPage] = useState<PageId | null>(null);
  const [navScaleX, setNavScaleX] = useState(1);
  const [navTransformOrigin, setNavTransformOrigin] = useState("center center");

  useEffect(() => {
    setHasMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startDrag = (clientX: number, container: HTMLElement) => {
    const rect = container.getBoundingClientRect();
    touchStartXRef.current = clientX;
    setIsSwiping(true);
    
    const buttons = Array.from(container.querySelectorAll("button"));
    const coords = buttons.map((btn, index) => {
      const btnRect = btn.getBoundingClientRect();
      return {
        id: navItems[index].id,
        centerX: btnRect.left + btnRect.width / 2 - rect.left,
        width: btnRect.width,
        left: btnRect.left - rect.left,
      };
    });
    buttonCoordsRef.current = coords;

    const activeCoord = coords.find(c => c.id === activePage);
    activeBtnCenterRef.current = activeCoord ? activeCoord.centerX : 0;
    setClosestPage(activePage);
  };

  const moveDrag = (clientX: number) => {
    if (!isSwiping || touchStartXRef.current === null) return;
    const deltaX = clientX - touchStartXRef.current;

    let bubbleCenter = activeBtnCenterRef.current + deltaX;
    let clampedBubbleCenter = bubbleCenter;

    let minCenterX = 0;
    let maxCenterX = 0;

    if (buttonCoordsRef.current && buttonCoordsRef.current.length > 0) {
      minCenterX = buttonCoordsRef.current[0].centerX;
      maxCenterX = buttonCoordsRef.current[buttonCoordsRef.current.length - 1].centerX;

      const pullLeft = minCenterX - bubbleCenter;
      const pullRight = bubbleCenter - maxCenterX;

      if (pullLeft > 0) {
        clampedBubbleCenter = minCenterX;
        setNavScaleX(1 + Math.min(pullLeft * 0.002, 0.15));
        setNavTransformOrigin("right center");
      } else if (pullRight > 0) {
        clampedBubbleCenter = maxCenterX;
        setNavScaleX(1 + Math.min(pullRight * 0.002, 0.15));
        setNavTransformOrigin("left center");
      } else {
        setNavScaleX(1);
        setNavTransformOrigin("center center");
      }
    }

    const finalDragOffset = clampedBubbleCenter - activeBtnCenterRef.current;
    setDragOffset(finalDragOffset);

    const currentCenter = clampedBubbleCenter;
    let closestId = activePage;
    let minDistance = Infinity;

    if (buttonCoordsRef.current) {
      buttonCoordsRef.current.forEach((coord) => {
        const distance = Math.abs(currentCenter - coord.centerX);
        if (distance < minDistance) {
          minDistance = distance;
          closestId = coord.id as PageId;
        }
      });
    }
    setClosestPage(closestId);
  };

  const endDrag = () => {
    if (!isSwiping) return;
    setIsSwiping(false);
    touchStartXRef.current = null;

    if (closestPage) {
      setActivePage(closestPage);
    }
    setDragOffset(0);
    setClosestPage(null);
    setNavScaleX(1);
  };

  return (
    <div 
      className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300"
      style={{
        pointerEvents: isHidden ? "none" : "auto"
      }}
    >
      <motion.nav
        initial={{ y: 50, opacity: 0 }}
        animate={{ 
          y: isHidden ? 120 : 0, 
          opacity: isHidden ? 0 : 1,
          scale: isHidden ? 0.95 : 1,
          scaleX: isSwiping ? navScaleX : 1,
        }}
        style={{
          transformOrigin: navTransformOrigin,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 350, 
          damping: 30, 
          delay: hasMounted ? 0 : 0.5 
        }}
        className="flex items-center gap-2 md:gap-4 p-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl select-none touch-none"
        onTouchStart={(e) => startDrag(e.touches[0].clientX, e.currentTarget)}
        onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
        onTouchEnd={endDrag}
        onMouseDown={(e) => startDrag(e.clientX, e.currentTarget)}
        onMouseMove={(e) => moveDrag(e.clientX)}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
      >
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          const isVisuallyActive = closestPage ? closestPage === item.id : isActive;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (!isSwiping) {
                  setActivePage(item.id as PageId);
                }
              }}
              className="relative px-3 md:px-5 py-2 md:py-3 rounded-full flex items-center justify-center transition-colors group focus:outline-none"
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-white rounded-full z-0"
                  style={{
                    x: dragOffset,
                    scaleX: 1 + Math.min(Math.abs(dragOffset) * 0.003, 0.45),
                    transformOrigin: dragOffset > 0 ? "left center" : "right center",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              
              <span className={`relative z-10 flex items-center gap-2 transition-colors duration-200 ${isVisuallyActive ? "text-black" : "text-white/70 group-hover:text-white"}`}>
                <Icon size={isMobile ? 18 : 20} />
                {(!isMobile || isVisuallyActive) && (
                  <span className="text-sm font-medium tracking-wide">
                    {item.label}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </motion.nav>
    </div>
  );
}
