import { motion } from "framer-motion";
import { Code2, Database, Smartphone, GraduationCap, LayoutGrid, Camera, TrendingUp, Award } from "lucide-react";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, opacity: 1, 
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="w-full min-h-screen pt-24 pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
        <p className="text-white/60 text-lg max-w-2xl">
          Software Engineering student and entrepreneur. I engineer high-performance, aesthetically distinct digital interfaces for the tech and fashion sectors.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]"
      >
        {/* Bio / Ventures Bento */}
        <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2 row-span-1 rounded-3xl bg-neutral-900/60 backdrop-blur-sm border border-white/10 p-8 flex flex-col justify-between overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="text-2xl font-bold z-10">Ventures & Projects</h3>
          <p className="text-white/70 z-10 text-base font-light leading-relaxed">
            Founder of <span className="text-white font-medium">Jinni</span> — a gesture-driven job matching app for Nigerian graduates. Creator of <span className="text-white font-medium">D-MAX Studios</span>, a SaaS design engine for streetwear creators. Also built <span className="text-white font-medium">Desypher</span> and <span className="text-white font-medium">PropertyLink Nigeria</span> (live at propertylinkng.com).
          </p>
        </motion.div>

        {/* Education Bento */}
        <motion.div variants={itemVariants} className="md:col-span-1 lg:col-span-2 row-span-1 border border-white/10 p-8 rounded-3xl bg-neutral-900/60 backdrop-blur-sm flex flex-col justify-center">
          <GraduationCap className="text-white/50 mb-4" size={32} />
          <h3 className="text-xl font-bold mb-3">Education</h3>
          <p className="text-white/80 font-medium">B.Sc. Software Engineering</p>
          <p className="text-white/50 text-sm mb-3">Babcock University, Ilishan-Remo — Current</p>
          <p className="text-white/60 text-sm font-medium">Secondary School Certificate</p>
          <p className="text-white/40 text-xs">Rainbow College Maba (2018–2025)</p>
        </motion.div>

        {/* Skills: Frontend */}
        <motion.div variants={itemVariants} className="col-span-1 border border-white/10 p-6 rounded-3xl bg-neutral-950/60 backdrop-blur-sm flex flex-col items-start hover:bg-neutral-900/80 transition-colors">
          <div className="p-3 bg-white/5 rounded-2xl mb-auto">
            <LayoutGrid className="text-white/80" size={24} />
          </div>
          <h3 className="text-lg font-bold mt-4 mb-2">Front-End</h3>
          <p className="text-sm text-white/60">JavaScript, React Native, Next.js, Expo, HTML/CSS</p>
        </motion.div>

        {/* Skills: Backend */}
        <motion.div variants={itemVariants} className="col-span-1 border border-white/10 p-6 rounded-3xl bg-neutral-950/60 backdrop-blur-sm flex flex-col items-start hover:bg-neutral-900/80 transition-colors">
          <div className="p-3 bg-blue-500/10 rounded-2xl mb-auto">
            <Database className="text-blue-400" size={24} />
          </div>
          <h3 className="text-lg font-bold mt-4 mb-2">Backend</h3>
          <p className="text-sm text-white/60">Supabase, PostgreSQL, Edge Functions, REST APIs</p>
        </motion.div>

        {/* Skills: Mobile */}
        <motion.div variants={itemVariants} className="col-span-1 border border-white/10 p-6 rounded-3xl bg-neutral-950/60 backdrop-blur-sm flex flex-col items-start hover:bg-neutral-900/80 transition-colors">
          <div className="p-3 bg-green-500/10 rounded-2xl mb-auto">
            <Smartphone className="text-green-400" size={24} />
          </div>
          <h3 className="text-lg font-bold mt-4 mb-2">Mobile</h3>
          <p className="text-sm text-white/60">React Native, Expo, gesture-based UX, push notifications</p>
        </motion.div>

        {/* Skills: Design */}
        <motion.div variants={itemVariants} className="col-span-1 border border-white/10 p-6 rounded-3xl bg-neutral-950/60 backdrop-blur-sm flex flex-col items-start hover:bg-neutral-900/80 transition-colors">
          <div className="p-3 bg-purple-500/10 rounded-2xl mb-auto">
            <Code2 className="text-purple-400" size={24} />
          </div>
          <h3 className="text-lg font-bold mt-4 mb-2">UI / Design</h3>
          <p className="text-sm text-white/60">Brutalist, Tech-noir & Glassmorphism aesthetics · Figma · TypeScript</p>
        </motion.div>

        {/* Certifications */}
        <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2 border border-white/10 p-8 rounded-3xl bg-neutral-900/60 backdrop-blur-sm flex flex-col justify-between group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Award className="text-white/40 mb-2" size={28} />
          <h3 className="text-xl font-bold mb-3 z-10">Certifications & Leadership</h3>
          <div className="flex flex-col gap-1 z-10">
            <p className="text-white/70 text-sm">🏅 Claude Code 101</p>
            <p className="text-white/70 text-sm">🏅 Microsoft Word Specialist (2018)</p>
            <p className="text-white/60 text-sm mt-2">👑 DLA for Teens Leadership Training (2023)</p>
          </div>
        </motion.div>

        {/* Hobbies */}
        <motion.div variants={itemVariants} className="md:col-span-1 lg:col-span-2 border border-white/10 p-8 rounded-3xl bg-neutral-900/60 backdrop-blur-sm flex flex-col justify-center gap-3">
          <h3 className="text-xl font-bold mb-1">Beyond the Code</h3>
          <div className="flex items-center gap-3">
            <Camera className="text-orange-400 shrink-0" size={20} />
            <p className="text-white/70 text-sm">Photography</p>
          </div>
          <div className="flex items-center gap-3">
            <TrendingUp className="text-green-400 shrink-0" size={20} />
            <p className="text-white/70 text-sm">Financial Market Analysis · Nigerian Exchange equities</p>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
