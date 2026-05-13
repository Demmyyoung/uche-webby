import React from "react";
import { motion } from "framer-motion";
import { Mail, ExternalLink, Phone } from "lucide-react";

// Custom Github icon since Lucide removed brand icons
const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const contacts = [
  {
    href: "mailto:demiladepc1@gmail.com",
    icon: Mail,
    label: "Email",
    display: "demiladepc1@gmail.com",
    external: false,
  },
  {
    href: "tel:07086169974",
    icon: Phone,
    label: "Phone",
    display: "07086169974",
    external: false,
  },
  {
    href: "https://github.com/Demmyyoung",
    icon: Github,
    label: "GitHub",
    display: "github.com/Demmyyoung",
    external: true,
  },
  
];

export default function Contact() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center px-6 pt-20 pb-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl w-full flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">Let's build.</h2>
          <p className="text-xl text-white/60 font-light mb-12 max-w-xl mx-auto">
            Open to front-end, mobile, and startup engineering roles. Based in Lagos, Nigeria — available for remote work globally.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4 w-full">
          {contacts.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-between gap-4 px-8 py-5 rounded-3xl bg-neutral-900/60 backdrop-blur-sm border border-white/10 hover:border-white/30 hover:bg-neutral-800/70 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                    <Icon className="text-white/60 group-hover:text-white transition-colors" size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-white/40 mb-0.5 uppercase tracking-widest">{item.label}</p>
                    <p className="font-medium text-white/90">{item.display}</p>
                  </div>
                </div>
                <ExternalLink size={16} className="text-white/20 group-hover:text-white/60 transition-colors shrink-0" />
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
