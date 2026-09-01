import { Routes, Route } from "react-router-dom";
import StudioPage from "./admin/StudioPage";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Work from "./components/Work";
import About from "./components/About";
import Contact from "./components/Contact";
import "./index.css";

function App() {
  return (
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
  );
}

export default App;
