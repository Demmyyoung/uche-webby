
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center overflow-hidden"
      exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* Subtle background accent blobs — lightweight, CSS only */}
      <div className="loading-blob loading-blob--1" />
      <div className="loading-blob loading-blob--2" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-10 select-none">

        {/* Monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Large faded "OW" in the background */}
          <span
            className="block text-[22vw] md:text-[18rem] font-extrabold tracking-tighter leading-none select-none pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            OW
          </span>

          {/* Orange accent line */}
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
            className="absolute -bottom-2 left-0 w-full h-[3px] bg-orange-500 origin-left"
          />
        </motion.div>

        {/* Name + subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
          className="text-center flex flex-col gap-2"
        >
          <p className="text-white/90 text-sm md:text-base font-semibold tracking-[0.35em] uppercase">
            Oluwademilade Williams
          </p>
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase">
            Front-End Engineer &amp; Entrepreneur
          </p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-56 h-[1px] bg-white/10 relative overflow-hidden rounded-full"
        >
          <div className="loading-progress-bar absolute left-0 top-0 h-full bg-orange-500 rounded-full" />
        </motion.div>
      </div>

      {/* Bottom label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 text-white/30 text-xs tracking-widest uppercase"
      >
        Loading experience
      </motion.p>
    </motion.div>
  );
}
