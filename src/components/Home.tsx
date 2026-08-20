import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fallbackProjects } from "./Work";

const slideVariants = {
  initial: { opacity: 0, y: 30, scale: 1.05 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -30, scale: 0.95, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

// Reusable squeezing box component moved OUTSIDE so it doesn't unmount on every render!
const SqueezeBox = ({ flexGrow, imageSrc, imageKey }: { flexGrow: number, imageSrc: string, imageKey: number }) => (
  <motion.div 
    layout
    animate={{ flex: flexGrow }}
    transition={{ type: "spring", stiffness: 80, damping: 20, mass: 1.2 }}
    className="relative h-[250px] md:h-[400px] w-full md:w-auto overflow-hidden border-b md:border-b-0 md:border-r border-outline-variant/50 last:border-0 bg-surface-variant group flex-shrink-0"
  >
    <AnimatePresence initial={false}>
      <motion.img 
        key={imageKey}
        src={imageSrc}
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="absolute inset-0 w-full h-full object-cover"
        alt="Portfolio showcase"
      />
    </AnimatePresence>
    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
  </motion.div>
);

export default function Home() {
  // Extract all string images from the fallback projects
  const allImages = fallbackProjects
    .flatMap((p) => p.images || [])
    .filter((img) => typeof img === "string") as string[];

  // Divide images into 6 sets for 6 dynamic boxes (2 rows of 3)
  const set1 = allImages.slice(0, 3);
  const set2 = allImages.slice(3, 6);
  const set3 = allImages.slice(6, 9);
  const set4 = allImages.slice(9, 11);
  const set5 = allImages.slice(11, 14);
  const set6 = allImages.slice(14, 16);

  // States for cycling images inside each box
  const [indices, setIndices] = useState([0, 0, 0, 0, 0, 0]);

  // States for the dynamic flex "squeeze" widths
  // Made the flex ratios less extreme so images don't get squeezed into tiny slivers
  const flexOptions = [
    [3, 4, 3],
    [4, 3, 3],
    [3, 3, 4],
    [4, 4, 3],
    [3, 5, 3],
    [5, 3, 3],
    [3, 3, 5],
  ];
  const [flexRow1, setFlexRow1] = useState(flexOptions[0]);
  const [flexRow2, setFlexRow2] = useState(flexOptions[1]);

  useEffect(() => {
    // Randomize flex squeeze layouts every 3.5 seconds
    const layoutTimer = setInterval(() => {
      setFlexRow1(flexOptions[Math.floor(Math.random() * flexOptions.length)]);
      setFlexRow2(flexOptions[Math.floor(Math.random() * flexOptions.length)]);
    }, 3500);

    // Image cyclers
    const t1 = setInterval(() => setIndices(p => [(p[0] + 1) % set1.length, p[1], p[2], p[3], p[4], p[5]]), 4800);
    const t2 = setInterval(() => setIndices(p => [p[0], (p[1] + 1) % set2.length, p[2], p[3], p[4], p[5]]), 3600);
    const t3 = setInterval(() => setIndices(p => [p[0], p[1], (p[2] + 1) % set3.length, p[3], p[4], p[5]]), 5500);
    const t4 = setInterval(() => setIndices(p => [p[0], p[1], p[2], (p[3] + 1) % set4.length, p[4], p[5]]), 6200);
    const t5 = setInterval(() => setIndices(p => [p[0], p[1], p[2], p[3], (p[4] + 1) % set5.length, p[5]]), 4100);
    const t6 = setInterval(() => setIndices(p => [p[0], p[1], p[2], p[3], p[4], (p[5] + 1) % set6.length]), 5800);

    return () => {
      clearInterval(layoutTimer);
      clearInterval(t1); clearInterval(t2); clearInterval(t3); 
      clearInterval(t4); clearInterval(t5); clearInterval(t6);
    };
  }, [set1.length, set2.length, set3.length, set4.length, set5.length, set6.length]);

  return (
    <>
      <section className="px-margin-mobile md:px-margin-desktop text-center mb-24 md:mb-32 max-w-container-max mx-auto relative z-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-display-lg-mobile md:text-[84px] md:leading-[92px] md:tracking-[-0.02em] mb-8 leading-tight font-bold drop-shadow-xl"
        >
          <span className="font-bold">UCHECHUKWU</span><br/>
          <span className="font-sans text-[12px] leading-[16px] tracking-[0.1em] font-semibold text-secondary block mt-4 uppercase drop-shadow-md">/ OGBUAKU</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto drop-shadow-sm"
        >
          Supply Chain Management student at the University of Houston, specializing in operations coordination, data analytics, and logistics strategy.
        </motion.p>
      </section>

      {/* Dynamic Squeezing Flex Collage (Full Bleed, Sharp Borders, Gapless) */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full relative z-20 pb-32"
      >
        <div className="w-full border-t border-b border-outline-variant/50 flex flex-col shadow-2xl shadow-black/5">
          
          {/* Row 1 */}
          <div className="w-full flex flex-col md:flex-row border-b border-outline-variant/50">
            <SqueezeBox flexGrow={flexRow1[0]} imageSrc={set1[indices[0]]} imageKey={indices[0]} />
            <SqueezeBox flexGrow={flexRow1[1]} imageSrc={set2[indices[1]]} imageKey={indices[1] * 10} />
            <SqueezeBox flexGrow={flexRow1[2]} imageSrc={set3[indices[2]]} imageKey={indices[2] * 100} />
          </div>

          {/* Row 2 */}
          <div className="w-full flex flex-col md:flex-row">
            <SqueezeBox flexGrow={flexRow2[0]} imageSrc={set4[indices[3]]} imageKey={indices[3] * 1000} />
            <SqueezeBox flexGrow={flexRow2[1]} imageSrc={set5[indices[4]]} imageKey={indices[4] * 10000} />
            <SqueezeBox flexGrow={flexRow2[2]} imageSrc={set6[indices[5]]} imageKey={indices[5] * 100000} />
          </div>

        </div>
      </motion.section>
    </>
  );
}
