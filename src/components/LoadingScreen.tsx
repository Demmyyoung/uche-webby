import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-surface flex flex-col items-center justify-center overflow-hidden"
      exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="relative z-10 flex flex-col items-center gap-10 select-none px-6 text-center">
        
        {/* Name / Monogram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col items-center"
        >
          <span className="font-display text-4xl md:text-6xl font-bold tracking-tighter text-primary uppercase">
            U. Ogbuaku
          </span>
          <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] font-semibold text-secondary uppercase mt-4">
            Supply Chain Management & Operations
          </span>
        </motion.div>

        {/* Progress bar container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-48 md:w-64 h-[1px] bg-outline-variant/50 relative overflow-hidden"
        >
          {/* Animated loading line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-0 h-full w-full bg-primary origin-left" 
          />
        </motion.div>
      </div>

      {/* Bottom label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-8 text-secondary text-[10px] tracking-widest uppercase font-bold"
      >
        Initializing Experience
      </motion.p>
    </motion.div>
  );
}
