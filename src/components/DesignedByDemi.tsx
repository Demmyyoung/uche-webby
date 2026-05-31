import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STYLES = [
  // 0: Dark Wave (Subtle, darker liquid ocean)
  {
    id: "dark-wave",
    container: {
      backgroundColor: "#020617",
      borderColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: 12,
      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
    },
    text: {
      designed: { color: "rgba(255,255,255,0.9)", fontFamily: "'Brush Script MT', 'Dancing Script', 'Pacifico', cursive", letterSpacing: "normal" },
      by: { color: "rgba(255,255,255,0.5)" },
      demmy: { color: "#ffffff", textShadow: "0 0 10px rgba(255,255,255,0.2)" }
    }
  },
  // 1: Dark Brutalism
  {
    id: "brutalism",
    container: {
      backgroundColor: "#000000",
      borderColor: "#ffffff",
      borderWidth: 3,
      borderRadius: 0,
      boxShadow: "6px 6px 0px #ffffff",
    },
    text: {
      designed: { color: "#ffffff", fontFamily: "'Courier New', Courier, monospace", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em" },
      by: { color: "#ffffff" },
      demmy: { color: "#ff3366", textShadow: "none" }
    }
  },
  // 2: Cyberpunk Neon
  {
    id: "cyberpunk",
    container: {
      backgroundColor: "#09090b",
      borderColor: "#0ff",
      borderWidth: 1,
      borderRadius: 4,
      boxShadow: "0 0 15px rgba(0, 255, 255, 0.3), inset 0 0 10px rgba(0, 255, 255, 0.2)",
    },
    text: {
      designed: { color: "#f0f", fontFamily: "'Courier New', Courier, monospace", textTransform: "lowercase", letterSpacing: "normal" },
      by: { color: "#0ff" },
      demmy: { color: "#0ff", textShadow: "0 0 8px #0ff" }
    }
  },
  // 3: Minimal Light
  {
    id: "minimal",
    container: {
      backgroundColor: "#ffffff",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      borderRadius: 24,
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    },
    text: {
      designed: { color: "#111827", fontFamily: "'Brush Script MT', 'Dancing Script', 'Pacifico', cursive", textTransform: "none", letterSpacing: "normal" },
      by: { color: "#6b7280" },
      demmy: { color: "#000000", textShadow: "none" }
    }
  },
  // 4: Golden Aura
  {
    id: "golden",
    container: {
      backgroundColor: "#ffedd5",
      borderColor: "#fdba74",
      borderWidth: 1,
      borderRadius: 16,
      boxShadow: "0 15px 35px rgba(251, 146, 60, 0.3)",
    },
    text: {
      designed: { color: "#c2410c", fontFamily: "'Brush Script MT', 'Dancing Script', 'Pacifico', cursive", textTransform: "none", letterSpacing: "normal" },
      by: { color: "#ea580c" },
      demmy: { color: "#9a3412", textShadow: "none" }
    }
  }
];

export default function DesignedByDemi() {
  const [isHovered, setIsHovered] = useState(false);
  // Start at the last index so the very first hover triggers index 0 (Dark Wave)
  const [styleIndex, setStyleIndex] = useState(STYLES.length - 1);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setStyleIndex((prev) => (prev + 1) % STYLES.length);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const activeStyle = STYLES[styleIndex];

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex items-end justify-end">
      <a
        href="https://oowport.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="relative overflow-hidden cursor-pointer flex flex-col justify-center items-center"
          style={{
            transformOrigin: "bottom right",
            borderStyle: "solid",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
          initial={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            borderColor: "rgba(255, 255, 255, 0.08)",
            borderWidth: 1,
            boxShadow: "0 0 0 rgba(0,0,0,0)",
          }}
          animate={
            isHovered
              ? {
                  width: 180,
                  height: 110,
                  backgroundColor: activeStyle.container.backgroundColor,
                  borderColor: activeStyle.container.borderColor,
                  borderRadius: activeStyle.container.borderRadius,
                  borderWidth: activeStyle.container.borderWidth ?? 1,
                  boxShadow: activeStyle.container.boxShadow,
                }
              : {
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  borderColor: "rgba(255, 255, 255, 0.08)",
                  borderWidth: 1,
                  boxShadow: "0 0 0 rgba(0,0,0,0)",
                }
          }
          transition={{
            width: { type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] },
            height: { type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] },
            borderRadius: { duration: 0.35, ease: "easeOut" },
            backgroundColor: { duration: 0.3 },
            borderColor: { duration: 0.3 },
            boxShadow: { duration: 0.3 },
          }}
        >
          {/* Default tiny 'O' state */}
          <AnimatePresence>
            {!isHovered && (
              <motion.div
                key="tiny-o"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="absolute inset-0 z-20 flex items-center justify-center"
              >
                <span className="text-white/40 font-bold text-sm leading-none">O</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Special Backgrounds */}
          <AnimatePresence>
            {isHovered && activeStyle.id === "dark-wave" && (
              <motion.div
                key="dark-wave-bg"
                className="absolute inset-0 z-0 overflow-hidden"
                style={{ borderRadius: "inherit" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="absolute w-[200px] h-[200px] opacity-40 mix-blend-screen"
                  style={{
                    left: "-20px", top: "-50px", borderRadius: "43%",
                    background: "linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute w-[220px] h-[220px] opacity-30 mix-blend-screen"
                  style={{
                    right: "-50px", bottom: "-80px", borderRadius: "40%",
                    background: "linear-gradient(180deg, #312e81 0%, #172554 100%)",
                  }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            )}
            
            {isHovered && activeStyle.id === "golden" && (
              <motion.div
                key="golden-bg"
                className="absolute inset-0 z-0 overflow-hidden"
                style={{ borderRadius: "inherit" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-50"
                  style={{ background: "radial-gradient(circle, #fcd34d 0%, transparent 70%)" }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Business Card Text Content */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                key="card-content"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4, transition: { duration: 0.15 } }}
                transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 }}
                className="flex flex-col items-center justify-center w-full h-full p-2 z-10"
              >
                <span
                  className="drop-shadow-sm text-[1.4rem] leading-tight transition-colors duration-300"
                  style={{ 
                    color: activeStyle.text.designed.color,
                    fontFamily: activeStyle.text.designed.fontFamily,
                    fontWeight: activeStyle.text.designed.fontWeight || "normal",
                    textTransform: activeStyle.text.designed.textTransform as any || "none",
                    letterSpacing: activeStyle.text.designed.letterSpacing || "normal",
                  }}
                >
                  Designed
                </span>
                <span 
                  className="font-semibold text-[10px] leading-none uppercase tracking-widest my-1 drop-shadow-sm transition-colors duration-300"
                  style={{ color: activeStyle.text.by.color }}
                >
                  by
                </span>
                <span 
                  className="font-black text-2xl tracking-[0.15em] leading-tight transition-colors duration-300"
                  style={{ 
                    color: activeStyle.text.demmy.color,
                    textShadow: activeStyle.text.demmy.textShadow 
                  }}
                >
                  DEMMY
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </a>
    </div>
  );
}
