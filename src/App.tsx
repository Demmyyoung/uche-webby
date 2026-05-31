import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VinylStack, { fallbackProjects, Project } from "./VinylStack";
import Navigation, { PageId } from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import MeshBackground from "./components/MeshBackground";
import LoadingScreen from "./components/LoadingScreen";
import DesignedByDemi from "./components/DesignedByDemi";
import { client } from "./sanityClient";
import { Routes, Route } from "react-router-dom";
import StudioPage from "./admin/StudioPage";
import "./index.css";

// Minimum time (ms) the loading screen stays visible.
// This lets us guarantee the Sanity fetch has had time to complete.
const MIN_LOAD_MS = 2500;

function App() {
  const [activePage, setActivePage] = useState<PageId>("home");
  const [isPanelHovered, setIsPanelHovered] = useState(false);

  // ─── Pre-fetch: data & timing ──────────────────────────────────────────────
  // projects starts as the local fallback so VinylStack always has something.
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const start = Date.now();

    // Fetch from Sanity immediately — in parallel with the loading animation
    client
      .fetch<Project[]>(`*[_type == "project"]`)
      .then((data) => {
        if (data && data.length > 0) setProjects(data);
      })
      .catch(() => {
        // Sanity unreachable — fallback data is already in state, nothing to do
      })
      .finally(() => {
        // Wait for whatever is left of the minimum display window before hiding
        const elapsed = Date.now() - start;
        const remaining = Math.max(0, MIN_LOAD_MS - elapsed);
        setTimeout(() => setAppReady(true), remaining);
      });
  }, []);
  // ───────────────────────────────────────────────────────────────────────────

  const pageVariants = {
    initial: { opacity: 0, y: 10, filter: "blur(5px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -10, filter: "blur(5px)", transition: { duration: 0.3 } }
  };

  return (
    <Routes>
      <Route path="/admin/*" element={<StudioPage />} />
      <Route path="*" element={
        <>
          {/* ── Main application (always mounted, visible once loading screen exits) ── */}
          <div className="relative w-full text-white bg-black h-screen overflow-hidden font-sans selection:bg-orange-500/30 selection:text-white">
            <MeshBackground />
            <Navigation activePage={activePage} setActivePage={setActivePage} isHidden={activePage === "work" && isPanelHovered} />

            {/* Reactive Background for VinylStack */}
            <AnimatePresence>
              {activePage === "work" && isPanelHovered && (
                <motion.div
                  key="work-hover-bg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.2, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.8 } }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 z-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 60%)`,
                    filter: "blur(80px)",
                  }}
                />
              )}
            </AnimatePresence>

            <main className="relative z-10 w-full h-full">
              <AnimatePresence mode="wait">
                {activePage === "home" && (
                  <motion.div key="home" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 overflow-y-auto">
                    <Hero onWorkClick={() => setActivePage("work")} />
                  </motion.div>
                )}

                {activePage === "work" && (
                  <motion.div key="work" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0">
                    {/* projects prop is pre-fetched — no loading needed inside VinylStack */}
                    <VinylStack projects={projects} onHoverStateChange={setIsPanelHovered} />
                  </motion.div>
                )}

                {activePage === "about" && (
                  <motion.div key="about" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 overflow-y-auto">
                    <About />
                  </motion.div>
                )}

                {activePage === "contact" && (
                  <motion.div key="contact" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 overflow-y-auto">
                    <Contact />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
            <DesignedByDemi />
          </div>

          {/* ── Loading screen sits on top; slides away when appReady = true ── */}
          <AnimatePresence>
            {!appReady && <LoadingScreen key="loader" />}
          </AnimatePresence>
        </>
      } />
    </Routes>
  );
}

export default App;

