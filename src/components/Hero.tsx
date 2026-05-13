
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

interface HeroProps {
  onWorkClick: () => void;
}

export default function Hero({ onWorkClick }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, filter: "blur(10px)" },
    visible: { 
      y: 0, 
      opacity: 1, 
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-6 md:px-16 pt-20 pb-32">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
      >
        <div className="lg:col-span-8 flex flex-col items-start z-10">
          <motion.div variants={itemVariants} className="mb-6 flex items-center gap-4">
            <span className="w-12 h-[2px] bg-white/50" />
            <h2 className="text-white/70 uppercase tracking-[0.3em] text-sm md:text-base font-medium">
              Oluwademilade Williams
            </h2>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] mb-8 font-sans"
          >
            Front-End <span className="text-white/40 italic font-serif">Engineer</span>
            <br />
            & <span className="relative inline-block">Entrepreneur
              <motion.span 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 w-full h-2 md:h-4 bg-orange-500/50 -z-10 origin-left"
              />
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-white/70 max-w-2xl font-light mb-12 leading-relaxed"
          >
            Software Engineering student and entrepreneur based in Lagos, Nigeria. Specializing in high-performance, aesthetically distinct interfaces for the tech and fashion sectors.
          </motion.p>

          <motion.div variants={itemVariants} className="flex items-center gap-6">
            <button
              onClick={onWorkClick}
              className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-all hover:scale-105 active:scale-95"
            >
              See My Work
              <ArrowDownRight className="group-hover:rotate-[-45deg] transition-transform duration-300" size={20} />
            </button>
          </motion.div>
        </div>

        {/* Abstract shape/visual element for right side */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-4 relative flex justify-center items-center h-full w-full hidden lg:flex"
        >
          <motion.div 
            animate={{ 
              rotate: 360,
              borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "60% 40% 30% 70% / 60% 30% 70% 40%", "30% 70% 70% 30% / 30% 30% 70% 70%"] 
            }}
            transition={{ 
              rotate: { duration: 25, ease: "linear", repeat: Infinity },
              borderRadius: { duration: 10, ease: "easeInOut", repeat: Infinity }
            }}
            className="w-80 h-80 bg-gradient-to-tr from-orange-500/40 to-blue-500/40 backdrop-blur-3xl border border-white/10"
            style={{ filter: "blur(40px)" }}
          />
          <motion.div 
            animate={{ 
              y: [-20, 20, -20],
              rotate: [-5, 5, -5]
            }}
            transition={{ 
              duration: 8, ease: "easeInOut", repeat: Infinity 
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
             <div className="w-64 h-64 border border-white/20 rounded-full flex items-center justify-center p-8 backdrop-blur-sm bg-black/10">
               <div className="w-full h-full border border-white/40 rounded-full" />
             </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
