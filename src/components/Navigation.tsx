import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, Briefcase, User, Mail } from "lucide-react";

export type PageId = "home" | "work" | "about" | "contact";

interface NavigationProps {
  activePage: PageId;
  setActivePage: (id: PageId) => void;
}

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "work", label: "Work", icon: Briefcase },
  { id: "about", label: "About", icon: User },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function Navigation({ activePage, setActivePage }: NavigationProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <motion.nav
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.5 }}
        className="flex items-center gap-2 md:gap-4 p-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
      >
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id as PageId)}
              className="relative px-3 md:px-5 py-2 md:py-3 rounded-full flex items-center justify-center transition-colors group focus:outline-none"
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-white rounded-full z-0"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              
              <span className={`relative z-10 flex items-center gap-2 ${isActive ? "text-black" : "text-white/70 group-hover:text-white"}`}>
                <Icon size={isMobile ? 18 : 20} />
                {(!isMobile || isActive) && (
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
