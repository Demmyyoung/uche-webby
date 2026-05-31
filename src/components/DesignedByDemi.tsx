import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DesignedByDemi() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex items-end justify-end">
      <a
        href="https://oowport.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="relative overflow-hidden shadow-2xl cursor-pointer flex flex-col justify-center items-center"
          style={{
            transformOrigin: "bottom right",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
          initial={{ width: 36, height: 36, borderRadius: 18 }}
          animate={{
            width: isHovered ? 180 : 36,
            height: isHovered ? 110 : 36,
            borderRadius: isHovered ? 12 : 18,
            borderColor: isHovered ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.08)"
          }}
          transition={{
            width: { type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] },
            height: { type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] },
            borderRadius: { duration: 0.35, ease: "easeOut" },
            borderColor: { duration: 0.3 }
          }}
        >
          {/* Animated Gradient Background */}
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              background: "linear-gradient(45deg, #ff007a, #7a00ff, #00e1ff, #7a00ff, #ff007a)",
              backgroundSize: "400% 400%",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              backgroundPosition: isHovered ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%",
            }}
            transition={{
              opacity: { duration: 0.3, ease: "easeInOut" },
              backgroundPosition: { duration: 6, repeat: Infinity, ease: "linear" }
            }}
          />

          {/* Default tiny 'O' state */}
          <AnimatePresence>
            {!isHovered && (
              <motion.div
                key="tiny-o"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="absolute inset-0 z-10 flex items-center justify-center"
              >
                <span className="text-white/40 font-bold text-sm leading-none">O</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Business Card State */}
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
                  className="text-white drop-shadow-md text-[1.4rem] leading-tight"
                  style={{ fontFamily: "'Brush Script MT', 'Dancing Script', 'Pacifico', cursive" }}
                >
                  Designed
                </span>
                <span className="text-white/90 font-semibold text-[10px] leading-none uppercase tracking-widest my-1 drop-shadow-sm">
                  by
                </span>
                <span className="text-white font-black text-2xl tracking-[0.15em] drop-shadow-lg leading-tight">
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
