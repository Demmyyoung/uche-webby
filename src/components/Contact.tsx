import type { SVGProps } from "react";
import { motion } from "framer-motion";
import { Mail, ExternalLink, Phone } from "lucide-react";

// Custom LinkedIn icon since the local Lucide version does not export it
const Linkedin = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const contacts = [
  {
    href: "mailto:ucogbuak@cougarnet.uh.edu",
    icon: Mail,
    label: "Email",
    display: "ucogbuak@cougarnet.uh.edu",
    external: true,
  },
  {
    href: "tel:+18328810803",
    icon: Phone,
    label: "Phone",
    display: "(832) 881-0803",
    external: false,
  },
  {
    href: "https://www.linkedin.com/in/uchechukwu-ogbuaku-1a6145306?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    icon: Linkedin,
    label: "LinkedIn",
    display: "linkedin.com/in/uchechukwu-ogbuaku-1a6145306",
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
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">Let's connect.</h2>
          <p className="text-xl text-white/60 font-light mb-12 max-w-xl mx-auto">
            Open to supply chain, logistics operations, and business analytics roles. Based in Houston, TX — available for local opportunities and remote projects.
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
