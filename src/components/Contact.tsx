import { motion } from "framer-motion";

export default function Contact() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-20 min-h-[70vh] flex flex-col justify-center py-24">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mb-24"
      >
        <h1 className="font-display text-[64px] md:text-[100px] leading-[0.9] tracking-[-0.03em] font-bold mb-8">
          LET'S CONNECT
        </h1>
        <p className="font-sans text-body-lg text-secondary max-w-2xl leading-relaxed">
          Open to supply chain, logistics operations, and business analytics roles. Based in Houston, TX — available for local opportunities and remote projects.
        </p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-8 md:gap-16 w-full"
      >
        {[
          { label: "EMAIL", value: "ucogbuak@cougarnet.uh.edu", link: "mailto:ucogbuak@cougarnet.uh.edu" },
          { label: "PHONE", value: "(832) 881-0803", link: "tel:+18328810803" },
          { label: "LINKEDIN", value: "Uchechukwu Ogbuaku", link: "https://linkedin.com/in/uchechukwu-ogbuaku-1a6145306/" }
        ].map((contact, idx) => (
          <motion.a 
            variants={item}
            key={idx}
            href={contact.link}
            target={contact.label === "LINKEDIN" ? "_blank" : "_self"}
            rel="noreferrer"
            className="group flex flex-col md:flex-row md:items-end justify-between border-b border-outline-variant pb-8 md:pb-12 hover:border-primary transition-colors duration-500 w-full overflow-hidden"
          >
            <h2 className="font-sans text-label-caps text-secondary mb-4 md:mb-0 md:mr-12 shrink-0 group-hover:text-primary transition-colors duration-300">
              {contact.label}
            </h2>
            <div className="relative">
              <p className="font-display text-[40px] md:text-[64px] leading-none text-primary group-hover:-translate-y-full group-hover:opacity-0 transition-all duration-500 ease-[0.16,1,0.3,1]">
                {contact.value}
              </p>
              <p className="font-display text-[40px] md:text-[64px] leading-none text-primary absolute top-full left-0 opacity-0 group-hover:-translate-y-full group-hover:opacity-100 transition-all duration-500 ease-[0.16,1,0.3,1] italic">
                {contact.value}
              </p>
            </div>
            
            <div className="hidden md:flex ml-8 w-12 h-12 rounded-full border border-outline-variant items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500 shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary group-hover:text-white transition-colors duration-500">
                <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
