import { motion } from "framer-motion";
import { Database, Settings, Workflow, Users, GraduationCap, Award, Volume2, Home, Megaphone, Package } from "lucide-react";

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
          Supply Chain Management and Operations professional. I specialize in event logistics, inventory management, data analysis, and cross-functional team coordination.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto md:auto-rows-[250px]"
      >
        {/* Bio / Experience Bento */}
        <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2 row-span-1 rounded-3xl bg-neutral-900/60 backdrop-blur-sm border border-white/10 p-8 flex flex-col justify-between overflow-hidden relative group min-h-[180px] md:min-h-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="text-2xl font-bold z-10">Experience & Roles</h3>
          <p className="text-white/70 z-10 text-base font-light leading-relaxed">
            Operations and logistics specialist. Serves as a <span className="text-white font-medium">Production Logistics & Operations Intern</span> at Daystar Christian Center, coordinates <span className="text-white font-medium">Event Operations</span> at Live Spot Lagos, and manages daily resource allocation as a <span className="text-white font-medium">Sound Engineer & Front Desk Coordinator</span> at the Jack J. Valenti School.
          </p>
        </motion.div>

        {/* Education Bento */}
        <motion.div variants={itemVariants} className="md:col-span-1 lg:col-span-2 row-span-1 border border-white/10 p-8 rounded-3xl bg-neutral-900/60 backdrop-blur-sm flex flex-col justify-center min-h-[180px] md:min-h-0">
          <GraduationCap className="text-white/50 mb-4" size={32} />
          <h3 className="text-xl font-bold mb-3">Education</h3>
          <p className="text-white/80 font-medium">B.B.A. in Supply Chain Management</p>
          <p className="text-white/50 text-sm mb-3">University of Houston (Expected: May 2028)</p>
          <p className="text-white/60 text-sm font-medium">Relevant Coursework</p>
          <p className="text-white/40 text-xs">Operations Management, Business Statistics, Supply Chain Strategy, Managerial Economics, Data Analytics, Financial Accounting</p>
        </motion.div>

        {/* Skills: Data & Analytics */}
        <motion.div variants={itemVariants} className="col-span-1 border border-white/10 p-6 rounded-3xl bg-neutral-950/60 backdrop-blur-sm flex flex-col items-start hover:bg-neutral-900/80 transition-colors min-h-[180px] md:min-h-0">
          <div className="p-3 bg-blue-500/10 rounded-2xl mb-auto">
            <Database className="text-blue-400" size={24} />
          </div>
          <h3 className="text-lg font-bold mt-4 mb-2">Data & Analytics</h3>
          <p className="text-sm text-white/60">Advanced Excel (Pivot Tables, Forecasting), Data Visualization, Business Statistics</p>
        </motion.div>

        {/* Skills: Supply Chain */}
        <motion.div variants={itemVariants} className="col-span-1 border border-white/10 p-6 rounded-3xl bg-neutral-950/60 backdrop-blur-sm flex flex-col items-start hover:bg-neutral-900/80 transition-colors min-h-[180px] md:min-h-0">
          <div className="p-3 bg-green-500/10 rounded-2xl mb-auto">
            <Package className="text-green-400" size={24} />
          </div>
          <h3 className="text-lg font-bold mt-4 mb-2">Supply Chain & Inventory</h3>
          <p className="text-sm text-white/60">Inventory Management, Asset Tracking, Scheduling Systems, Resource Allocation, Operations Planning</p>
        </motion.div>

        {/* Skills: Operations */}
        <motion.div variants={itemVariants} className="col-span-1 border border-white/10 p-6 rounded-3xl bg-neutral-950/60 backdrop-blur-sm flex flex-col items-start hover:bg-neutral-900/80 transition-colors min-h-[180px] md:min-h-0">
          <div className="p-3 bg-purple-500/10 rounded-2xl mb-auto">
            <Workflow className="text-purple-400" size={24} />
          </div>
          <h3 className="text-lg font-bold mt-4 mb-2">Operations</h3>
          <p className="text-sm text-white/60">Event Logistics, Setup Workflows, Live Event Coordination, Process Optimization</p>
        </motion.div>

        {/* Skills: Leadership */}
        <motion.div variants={itemVariants} className="col-span-1 border border-white/10 p-6 rounded-3xl bg-neutral-950/60 backdrop-blur-sm flex flex-col items-start hover:bg-neutral-900/80 transition-colors min-h-[180px] md:min-h-0">
          <div className="p-3 bg-orange-500/10 rounded-2xl mb-auto">
            <Users className="text-orange-400" size={24} />
          </div>
          <h3 className="text-lg font-bold mt-4 mb-2">Leadership</h3>
          <p className="text-sm text-white/60">Cross-functional Coordination, Housing Policy Advisory, Team Management</p>
        </motion.div>

        {/* Projects / Leadership Bento */}
        <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2 border border-white/10 p-8 rounded-3xl bg-neutral-900/60 backdrop-blur-sm flex flex-col justify-between group overflow-hidden relative min-h-[180px] md:min-h-0">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Award className="text-white/40 mb-2" size={28} />
          <h3 className="text-xl font-bold mb-3 z-10">Projects & Leadership</h3>
          <div className="flex flex-col gap-1 z-10">
            <p className="text-white/70 text-sm">🔬 AfCFTA Tech-Based Logistics Research</p>
            <p className="text-white/70 text-sm">🏅 Career Essentials in Data Analysis (Microsoft & LinkedIn)</p>
            <p className="text-white/60 text-sm mt-2">👑 Vice Chairman, SHRL Advisory Committee</p>
          </div>
        </motion.div>

        {/* Extracurriculars */}
        <motion.div variants={itemVariants} className="md:col-span-1 lg:col-span-2 border border-white/10 p-8 rounded-3xl bg-neutral-900/60 backdrop-blur-sm flex flex-col justify-center gap-4 min-h-[180px] md:min-h-0">
          <h3 className="text-xl font-bold mb-1">Beyond the Classroom</h3>
          <div className="flex items-start gap-3">
            <Volume2 className="text-orange-400 shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-white font-medium text-sm">Sound Engineering</p>
              <p className="text-white/50 text-xs">Jack J. Valenti School of Communication</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Home className="text-green-400 shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-white font-medium text-sm">Student Housing Advisory</p>
              <p className="text-white/50 text-xs">SHRL Advisory Committee Representative</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Megaphone className="text-blue-400 shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-white font-medium text-sm">Event Marketing &amp; Logistics</p>
              <p className="text-white/50 text-xs">Marketing Executive, College Hustle Collective</p>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
