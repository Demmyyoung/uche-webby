import { motion } from "framer-motion";

export default function About() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-20 pb-section-gap overflow-hidden">
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-[64px] md:text-[84px] leading-tight tracking-[-0.02em] font-bold mb-20 border-b border-outline-variant pb-8"
      >
        INFORMATION
      </motion.h1>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-24 md:gap-32"
      >
        {/* Education Section */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
          <div className="col-span-1">
            <h2 className="font-sans text-label-caps text-secondary mb-8 md:mb-0">EDUCATION</h2>
          </div>
          <div className="col-span-1 md:col-span-3 flex flex-col gap-16">
            <div className="group border-l-2 border-outline-variant/30 hover:border-primary pl-6 md:pl-8 py-4 md:py-6 pr-4 hover:bg-surface hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-500 rounded-r-xl">
              <h3 className="font-display text-headline-md font-bold text-primary mb-1">University of Houston</h3>
              <p className="font-sans text-body-md text-secondary uppercase tracking-[0.1em] font-semibold mb-6">B.B.A. in Supply Chain Management</p>
              <p className="font-sans text-body-lg text-on-surface-variant max-w-3xl mb-4 leading-relaxed">
                Expected: May 2028. Focus on logistics, operations coordination, and data analytics.
              </p>
              <p className="font-sans text-[13px] text-secondary/80 italic tracking-wide leading-relaxed max-w-3xl">
                Relevant Coursework: Operations Management, Business Statistics, Supply Chain Strategy, Managerial Economics, Data Analytics, Financial Accounting
              </p>
            </div>
            
            <div className="w-full h-px bg-outline-variant/30"></div>
            
            <div className="group border-l-2 border-outline-variant/30 hover:border-primary pl-6 md:pl-8 py-4 md:py-6 pr-4 hover:bg-surface hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-500 rounded-r-xl">
              <h3 className="font-display text-headline-md font-bold text-primary mb-1">Daystar Leadership Academy</h3>
              <p className="font-sans text-body-md text-secondary uppercase tracking-[0.1em] font-semibold mb-6">Basic Leadership Certificate</p>
              <p className="font-sans text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
                Intensive leadership and management training program emphasizing cross-functional coordination and team management.
              </p>
            </div>
          </div>
        </motion.div>


        {/* Experience Section */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
          <div className="col-span-1">
            <h2 className="font-sans text-label-caps text-secondary mb-8 md:mb-0">EXPERIENCE</h2>
          </div>
          <div className="col-span-1 md:col-span-3 flex flex-col gap-12">
            {[
              {
                company: "Daystar Christian Center",
                role: "Production Logistics & Operations Intern",
                desc: "Serves as an operations and logistics specialist, optimizing event workflows and setup processes."
              },
              {
                company: "Live Spot Lagos",
                role: "Event Operations",
                desc: "Coordinated live event logistics, managed on-site teams, and ensured seamless execution of large-scale productions."
              },
              {
                company: "Jack J. Valenti School",
                role: "Sound Engineer & Front Desk Coordinator",
                desc: "Manages daily resource allocation, client services, and technical sound engineering tasks."
              },
              {
                company: "College Hustle Collective",
                role: "Marketing Executive",
                desc: "Coordinated event marketing, logistics, and spearheaded initiatives to boost brand visibility across campus demographics, reaching over 1,500 students."
              }
            ].map((job, idx, arr) => (
              <div key={idx} className="flex flex-col">
                <div className="group flex flex-col md:flex-row md:items-start md:justify-between border-l-2 border-outline-variant/30 hover:border-primary pl-6 md:pl-8 py-4 md:py-6 pr-4 hover:bg-surface hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-500 rounded-r-xl">
                  <div className="flex-1 md:pr-8">
                    <h3 className="font-display text-headline-md font-bold text-primary mb-1">{job.company}</h3>
                    <p className="font-sans text-body-md text-secondary uppercase tracking-[0.1em] font-semibold mb-4 md:mb-0">{job.role}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed">{job.desc}</p>
                  </div>
                </div>
                {idx !== arr.length - 1 && <div className="w-full h-px bg-outline-variant/30 mt-12"></div>}
              </div>
            ))}
          </div>
        </motion.div>


        {/* Leadership Section */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
          <div className="col-span-1">
            <h2 className="font-sans text-label-caps text-secondary mb-8 md:mb-0">LEADERSHIP & PROJECTS</h2>
          </div>
          <div className="col-span-1 md:col-span-3 flex flex-col gap-12">
            <div className="group border-l-2 border-outline-variant/30 hover:border-primary pl-6 md:pl-8 py-2 transition-colors duration-500">
              <h3 className="font-display text-headline-md font-bold text-primary mb-1">SHRL Advisory Committee</h3>
              <p className="font-sans text-body-md text-secondary uppercase tracking-[0.1em] font-semibold mb-6">Vice Chairman</p>
              <p className="font-sans text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
                Representing student housing policy and operations to university leadership while directing resource allocation.
              </p>
            </div>
            
            <div className="w-full h-px bg-outline-variant/30"></div>
            
            <div className="group border-l-2 border-outline-variant/30 hover:border-primary pl-6 md:pl-8 py-2 transition-colors duration-500">
              <h3 className="font-display text-headline-md font-bold text-primary mb-1">AfCFTA Research</h3>
              <p className="font-sans text-body-md text-secondary uppercase tracking-[0.1em] font-semibold mb-6">Tech-Based Logistics Research</p>
              <p className="font-sans text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
                Conducted research on logistics solutions under the African Continental Free Trade Area framework to optimize cross-border supply chains.
              </p>
            </div>
            
            <div className="w-full h-px bg-outline-variant/30"></div>
            
            <div className="group border-l-2 border-outline-variant/30 hover:border-primary pl-6 md:pl-8 py-2 transition-colors duration-500">
              <h3 className="font-display text-headline-md font-bold text-primary mb-1">Career Essentials in Data Analysis</h3>
              <p className="font-sans text-body-md text-secondary uppercase tracking-[0.1em] font-semibold">Microsoft & LinkedIn Certification</p>
            </div>
          </div>
        </motion.div>


        {/* Skills Section */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-4 gap-gutter border-t border-outline-variant/50 pt-16">
          <div className="col-span-1">
            <h2 className="font-sans text-label-caps text-secondary mb-8 md:mb-0">EXPERTISE</h2>
          </div>
          <div className="col-span-1 md:col-span-3">
            <ul className="flex flex-wrap gap-4 font-sans text-[13px] font-bold text-primary uppercase tracking-widest">
              {[
                "Advanced Excel (Pivot Tables, Forecasting)",
                "Data Visualization & Statistics",
                "Inventory Management & Asset Tracking",
                "Operations Planning",
                "Event Logistics & Live Coordination",
                "Microsoft Power BI & Access",
                "Cross-functional Coordination"
              ].map((skill, idx) => (
                <li key={idx} className="border border-outline-variant/50 px-6 py-4 hover:border-primary hover:bg-surface hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 transition-all duration-500 cursor-default rounded-lg">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
