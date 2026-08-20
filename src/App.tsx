import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import StudioPage from "./admin/StudioPage";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Work from "./components/Work";
import About from "./components/About";
import Contact from "./components/Contact";
import "./index.css";

const MIN_LOAD_MS = 2500;

function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setAppReady(true);
    }, MIN_LOAD_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/admin/*" element={<StudioPage />} />
        <Route path="*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Layout>
        } />
      </Routes>
      <AnimatePresence>
        {!appReady && <LoadingScreen key="loader" />}
      </AnimatePresence>
    </>
  );
}

export default App;
