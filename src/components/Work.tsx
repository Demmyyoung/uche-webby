import { useState, useEffect } from "react";
import { client, urlFor } from "../sanityClient";
import { motion } from "framer-motion";

export interface Project {
  _id: string;
  title: string;
  description: string;
  year?: string;
  color?: string; 
  image?: any; 
  images?: any[]; 
  websiteUrl?: string; 
}

export const fallbackProjects: Project[] = [
  {
    _id: "1",
    title: "Leadership",
    description:
      "Served as Vice Chairman of the SHRL Advisory Committee, representing student housing policy and operations to university leadership while directing resource allocation.",
    websiteUrl: "https://www.linkedin.com/in/uchechukwu-ogbuaku-1a6145306/",
    images: [
      "/img/IMG-20260522-WA0004.jpg",
      "/img/IMG-20260522-WA0005.jpg",
      "/img/IMG-20260522-WA0015.jpg",
    ]
  },
  {
    _id: "2",
    title: "Campus Presence",
    description:
      "Coordinated event logistics and operations for student-led initiatives as Marketing Executive for the College Hustle Collective, reaching over 1,500 students.",
    websiteUrl: "https://www.linkedin.com/in/uchechukwu-ogbuaku-1a6145306/",
    images: [
      "/img/the cage ambassador.jpg",
      "/img/abpsi volunteer.jpg",
      "/img/IMG-20260522-WA0013.jpg",
    ]
  },
  {
    _id: "3",
    title: "Academic Experience",
    description:
      "Conducted research on tech-based logistics solutions under the African Continental Free Trade Area (AfCFTA) framework to optimize cross-border supply chains.",
    websiteUrl: "https://www.linkedin.com/in/uchechukwu-ogbuaku-1a6145306/",
    images: [
      "/img/IMG-20260522-WA0007.jpg",
      "/img/IMG-20260522-WA0009.jpg",
      "/img/IMG-20260522-WA0010.jpg",
    ]
  },
  {
    _id: "4",
    title: "Supply Chain & Inventory",
    description:
      "Focusing on inventory management, asset tracking, scheduling systems, and data-driven supply chain forecasting with advanced Microsoft Excel modeling.",
    websiteUrl: "https://www.linkedin.com/in/uchechukwu-ogbuaku-1a6145306/",
    images: [
      "/img/IMG-20260522-WA0003.jpg",
      "/img/IMG-20260522-WA0008.jpg"
    ]
  },
  {
    _id: "5",
    title: "Career Goals",
    description:
      "Aiming to lead global supply chain operations, optimize logistics workflows, and leverage data analytics for efficient distribution and service delivery.",
    websiteUrl: "https://www.linkedin.com/in/uchechukwu-ogbuaku-1a6145306/",
    images: [
      "/img/IMG-20260522-WA0008.jpg"
    ]
  },
  {
    _id: "6",
    title: "Personal Interests",
    description:
      "Combining interests in technical sound engineering, client services, amateur photography, and financial market analysis of equities.",
    websiteUrl: "https://www.linkedin.com/in/uchechukwu-ogbuaku-1a6145306/",
    images: [
      "/img/IMG-20260522-WA0006.jpg",
      "/img/IMG-20260522-WA0016.jpg",
      "/img/IMG-20260522-WA0018.jpg",
      "/img/IMG-20260522-WA0014.jpg",
    ]
  }
];

export default function Work() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [shuffleOffsets, setShuffleOffsets] = useState<Record<string, number>>({});

  useEffect(() => {
    client
      .fetch<Project[]>(`*[_type == "project"]`)
      .then((data) => {
        if (data && data.length > 0) setProjects(data);
      })
      .catch((e) => {
        console.error("Sanity fetch failed, using fallback projects", e);
      });
  }, []);

  const getImageUrls = (project: Project): string[] => {
    let urls: string[] = [];
    if (project.images && project.images.length > 0) {
      urls = project.images.map((img: any) => {
        if (typeof img === "string") return img;
        try { return urlFor(img).url(); } catch (e) { return ""; }
      }).filter(u => u !== "");
    } else if (project.image) {
      if (typeof project.image === "string") urls.push(project.image);
      else {
        try { urls.push(urlFor(project.image).url()); } catch (e) {}
      }
    }
    return urls;
  };

  const handleShuffle = (projectId: string) => {
    setShuffleOffsets(prev => ({
      ...prev,
      [projectId]: (prev[projectId] || 0) + 1
    }));
  };

  // Automatically shuffle the active project's cards every 3.9 seconds
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (activeImage) {
      interval = setInterval(() => {
        handleShuffle(activeImage);
      }, 3900);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeImage]);

  return (
    <section className="w-full relative px-margin-mobile md:px-margin-desktop min-h-[70vh] flex flex-col md:flex-row pb-32">
      <div className="w-full md:w-3/5 flex flex-col justify-center relative z-20">
        {projects.map((project) => {
          const isActive = activeImage === project._id;
          return (
            <div 
              key={project._id}
              className="group block py-8 md:py-12 cursor-pointer border-b border-outline-variant/30 last:border-0" 
              onMouseEnter={() => setActiveImage(project._id)}
            >
              <div className="flex items-start">
                <a 
                  href={project.websiteUrl || "#"}
                  target={project.websiteUrl ? "_blank" : "_self"}
                  className="font-display project-title font-bold text-primary hover:text-secondary transition-colors duration-300 flex-1"
                >
                  {project.title}
                </a>
                {project.year && (
                  <span className="font-sans text-label-caps text-secondary ml-4 mt-6 hidden md:block">
                    {project.year}
                  </span>
                )}
              </div>
              <motion.div
                initial={false}
                animate={{ 
                  height: isActive ? "auto" : 0, 
                  opacity: isActive ? 1 : 0 
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="font-sans text-body-lg text-on-surface-variant max-w-xl mt-8 md:mt-10 pb-4 leading-relaxed">
                  {project.description}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
      <div className="hidden md:block w-2/5 fixed top-0 right-0 h-screen z-10 pointer-events-none">
        <div className="relative w-full h-full flex items-center justify-center pr-margin-desktop">
          {projects.map((project) => {
            const imageUrls = getImageUrls(project);
            if (imageUrls.length === 0) return null;
            
            const isActive = activeImage === project._id;
            const offset = shuffleOffsets[project._id] || 0;
            const N = imageUrls.length;
            
            return (
              <div 
                key={project._id} 
                className={`absolute w-full h-[70vh] flex items-center justify-center transition-all duration-700 ease-[0.16,1,0.3,1] ${isActive ? 'opacity-100 z-20 scale-100 pointer-events-auto' : 'opacity-0 z-0 scale-95 pointer-events-none'}`}
                onClick={() => handleShuffle(project._id)}
                style={{ cursor: N > 1 ? 'pointer' : 'default' }}
              >
                 {imageUrls.map((url, i) => {
                    let relativeIndex = (i - offset) % N;
                    if (relativeIndex < 0) relativeIndex += N;

                    // Predefined stack positions (0 is top card, 1 is behind it, etc.)
                    const rotations = [0, 6, -4, 8, -6];
                    const xOffsets = [0, 30, -20, 40, -30];
                    const yOffsets = [0, -20, 10, -30, -10];
                    
                    const isSingle = N === 1;
                    const rotate = isSingle ? 0 : rotations[relativeIndex % rotations.length];
                    const x = isSingle ? 0 : xOffsets[relativeIndex % xOffsets.length];
                    const y = isSingle ? 0 : yOffsets[relativeIndex % yOffsets.length];
                    const scale = isSingle ? 1 : 1 - (relativeIndex * 0.05);
                    const zIndex = N - relativeIndex;
                    const opacity = isActive ? (isSingle ? 1 : 1 - (relativeIndex * 0.15)) : 0;

                    return (
                      <img 
                        key={i}
                        src={url}
                        alt={`${project.title} ${i}`}
                        className="absolute max-w-[80%] max-h-full object-contain rounded-xl shadow-2xl border border-outline-variant/10 transition-all duration-700 ease-[0.16,1,0.3,1]"
                        style={{
                           transform: isActive 
                             ? `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})` 
                             : `translate(0px, 0px) rotate(0deg) scale(0.9)`,
                           zIndex: zIndex,
                           opacity: opacity
                        }}
                      />
                    );
                 })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
