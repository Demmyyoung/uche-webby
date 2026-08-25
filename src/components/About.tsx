import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.1 } }
};

export default function About() {
  return (
    <section className="relative z-20 pb-section-gap overflow-hidden">

      {/* ── PAGE HEADER ─────────────────────────────────────────── */}
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="font-sans text-label-caps text-secondary tracking-widest uppercase mb-6 mt-2"
        >
          About
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[56px] md:text-[96px] leading-[1] tracking-[-0.03em] font-bold mb-0"
        >
          UCHECHUKWU<br />
          <span className="text-secondary">OGBUAKU</span>
        </motion.h1>
      </div>

      {/* ── HERO DIVIDER with photo ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left" }}
        className="w-full h-px bg-outline-variant/50 my-12"
      />

      {/* ── TWO-COLUMN INTRO ────────────────────────────────────── */}
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-gutter items-start"
        >
          {/* Photo column */}
          <motion.div variants={fadeUp} className="md:col-span-4 md:sticky md:top-32">
            <div className="relative overflow-hidden bg-surface-variant">
              <img
                src="/img/uche_cutout.png"
                alt="Uchechukwu Ogbuaku"
                className="w-full object-cover object-top"
                style={{ maxHeight: "560px", objectPosition: "top center" }}
              />
              {/* Subtle label overlay */}
              <div className="absolute bottom-0 left-0 w-full px-6 py-4 bg-gradient-to-t from-black/30 to-transparent">
                <p className="font-sans text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase">
                  Houston, Texas
                </p>
              </div>
            </div>
            {/* Quick facts */}
            <div className="mt-8 flex flex-col gap-4 border-t border-outline-variant/40 pt-8">
              {[
                { label: "Degree", value: "B.B.A. Supply Chain Management" },
                { label: "University", value: "University of Houston" },
                { label: "Expected", value: "May 2028" },
                { label: "Focus", value: "Logistics & Data Analytics" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-baseline gap-4">
                  <span className="font-sans text-[11px] tracking-widest text-secondary uppercase font-semibold flex-shrink-0">{label}</span>
                  <span className="font-sans text-[13px] text-primary font-medium text-right">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Narrative column */}
          <motion.div variants={fadeUp} className="md:col-span-8 flex flex-col gap-16">

            {/* Opening statement */}
            <div>
              <p className="font-display text-[26px] md:text-[34px] leading-[1.25] tracking-[-0.01em] font-bold text-primary mb-8">
                "I work at the intersection of operations, logistics, and people — finding the systems that keep things moving."
              </p>
              <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed max-w-2xl">
                Uchechukwu Ogbuaku is a Supply Chain Management student at the University of Houston with a
                proven track record spanning event production, student governance, academic research, and
                technical operations. His work is defined by one constant: making complex systems run with
                precision — whether that's a live production for thousands, a cross-border trade framework,
                or a student housing policy.
              </p>
            </div>

            <div className="w-full h-px bg-outline-variant/30" />

            {/* ── EDUCATION / MAJOR ── */}
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <div className="flex items-center gap-4 mb-2">
                <span className="font-sans text-[10px] tracking-[0.2em] text-secondary uppercase font-bold">Education</span>
                <div className="flex-1 h-px bg-outline-variant/30" />
              </div>
              <h2 className="font-display text-[28px] md:text-[38px] leading-tight tracking-tight font-bold text-primary">
                B.B.A. in Supply Chain Management — University of Houston
              </h2>
              <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed max-w-2xl">
                Uchechukwu is currently pursuing a Bachelor of Business Administration in Supply Chain
                Management at the C. T. Bauer College of Business, University of Houston — one of the
                leading business schools in the United States. Expected to graduate in May 2028, his
                academic programme centres on the full lifecycle of goods and services: how they are
                planned, procured, produced, and delivered efficiently at scale.
              </p>
              <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed max-w-2xl">
                His coursework spans Operations Management, Supply Chain Strategy, Business Statistics,
                Managerial Economics, Data Analytics, and Financial Accounting — a rigorous mix of
                quantitative and strategic disciplines designed to produce graduates who can manage
                complexity across global operations. Alongside formal study, Uchechukwu has earned a
                Microsoft & LinkedIn Career Essentials in Data Analysis certification, reinforcing his
                ability to translate raw data into operational decisions using tools like Microsoft
                Power BI, Excel (pivot tables, forecasting models), and Access.
              </p>
              <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed max-w-2xl">
                He also holds a Basic Leadership Certificate from the Daystar Leadership Academy — an
                intensive programme focused on cross-functional team management and strategic
                coordination, which underpins the leadership approach he brings to every role he takes on.
              </p>
            </motion.div>

            <div className="w-full h-px bg-outline-variant/30" />

            {/* ── ROLE 1: SHRL Advisory Committee ── */}
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <div className="flex items-center gap-4 mb-2">
                <span className="font-sans text-[10px] tracking-[0.2em] text-secondary uppercase font-bold">Leadership</span>
                <div className="flex-1 h-px bg-outline-variant/30" />
              </div>
              <h2 className="font-display text-[28px] md:text-[38px] leading-tight tracking-tight font-bold text-primary">
                Vice Chairman — SHRL Advisory Committee
              </h2>
              <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed max-w-2xl">
                At the University of Houston, Uchechukwu holds the position of Vice Chairman on the Student
                Housing and Residential Life (SHRL) Advisory Committee. In this role, he bridges the gap
                between the student body and university administration — translating lived residential
                experiences into actionable policy. He directs resource allocation, represents student interests
                at the institutional level, and coordinates committee operations to ensure decisions
                reflect the genuine needs of the campus community. It's governance work that demands both
                diplomacy and decisiveness.
              </p>
            </motion.div>

            <div className="w-full h-px bg-outline-variant/30" />

            {/* ── ROLE 2: Daystar Christian Center ── */}
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <div className="flex items-center gap-4 mb-2">
                <span className="font-sans text-[10px] tracking-[0.2em] text-secondary uppercase font-bold">Operations</span>
                <div className="flex-1 h-px bg-outline-variant/30" />
              </div>
              <h2 className="font-display text-[28px] md:text-[38px] leading-tight tracking-tight font-bold text-primary">
                Production Logistics Intern — Daystar Christian Center
              </h2>
              <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed max-w-2xl">
                As a Production Logistics & Operations Intern at Daystar Christian Center — one of Nigeria's
                largest megachurches — Uchechukwu operates at the nerve center of large-scale event execution.
                His responsibilities include optimising event workflows from pre-production through breakdown,
                coordinating logistics across departments, and ensuring that setups are executed flawlessly
                under tight time constraints. Working in this environment has sharpened his ability to manage
                resources, teams, and timelines simultaneously — a skill set that translates directly to
                enterprise-level supply chain operations.
              </p>
            </motion.div>

            <div className="w-full h-px bg-outline-variant/30" />

            {/* ── ROLE 3: Live Spot Lagos ── */}
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <div className="flex items-center gap-4 mb-2">
                <span className="font-sans text-[10px] tracking-[0.2em] text-secondary uppercase font-bold">Event Operations</span>
                <div className="flex-1 h-px bg-outline-variant/30" />
              </div>
              <h2 className="font-display text-[28px] md:text-[38px] leading-tight tracking-tight font-bold text-primary">
                Event Operations — Live Spot Lagos
              </h2>
              <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed max-w-2xl">
                At Live Spot Lagos — a premier entertainment and events brand — Uchechukwu coordinated
                live event logistics for large-scale productions, managing on-site teams and serving as
                a key operational contact during execution. His role required real-time problem-solving,
                vendor coordination, and the ability to keep multiple moving pieces aligned under pressure.
                The experience gave him a frontline understanding of how supply chains work in live
                environments: where timing is everything and there is no room for error.
              </p>
            </motion.div>

            <div className="w-full h-px bg-outline-variant/30" />

            {/* ── ROLE 4: Jack J. Valenti School ── */}
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <div className="flex items-center gap-4 mb-2">
                <span className="font-sans text-[10px] tracking-[0.2em] text-secondary uppercase font-bold">Technical & Client Services</span>
                <div className="flex-1 h-px bg-outline-variant/30" />
              </div>
              <h2 className="font-display text-[28px] md:text-[38px] leading-tight tracking-tight font-bold text-primary">
                Sound Engineer & Front Desk Coordinator — Jack J. Valenti School
              </h2>
              <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed max-w-2xl">
                At the University of Houston's Jack J. Valenti School of Communication, Uchechukwu manages
                a dual role that balances technical precision with client-facing service. As a Sound Engineer,
                he handles complex audio setups and live sound management for productions and events within
                the school's facilities. As Front Desk Coordinator, he manages daily resource allocation,
                handles client inquiries and scheduling, and maintains operational continuity across the
                department. This combination of technical and administrative responsibility reflects his
                versatility as an operator.
              </p>
            </motion.div>

            <div className="w-full h-px bg-outline-variant/30" />

            {/* ── ROLE 5: College Hustle Collective ── */}
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <div className="flex items-center gap-4 mb-2">
                <span className="font-sans text-[10px] tracking-[0.2em] text-secondary uppercase font-bold">Marketing & Campus Presence</span>
                <div className="flex-1 h-px bg-outline-variant/30" />
              </div>
              <h2 className="font-display text-[28px] md:text-[38px] leading-tight tracking-tight font-bold text-primary">
                Marketing Executive — College Hustle Collective
              </h2>
              <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed max-w-2xl">
                As Marketing Executive for the College Hustle Collective, Uchechukwu drove brand visibility
                and event engagement across the University of Houston campus, directly reaching over
                1,500 students. He coordinated event marketing campaigns, managed logistics for
                student-led initiatives, and built strategic partnerships to expand the organisation's
                footprint. This role sharpened his understanding of how communication and logistics
                intersect — and how effective messaging, when backed by strong operational execution,
                creates genuine impact.
              </p>
            </motion.div>

            <div className="w-full h-px bg-outline-variant/30" />

            {/* ── ACADEMIC RESEARCH ── */}
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <div className="flex items-center gap-4 mb-2">
                <span className="font-sans text-[10px] tracking-[0.2em] text-secondary uppercase font-bold">Research</span>
                <div className="flex-1 h-px bg-outline-variant/30" />
              </div>
              <h2 className="font-display text-[28px] md:text-[38px] leading-tight tracking-tight font-bold text-primary">
                AfCFTA Logistics Research
              </h2>
              <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed max-w-2xl">
                Academically, Uchechukwu has conducted research on technology-driven logistics solutions
                within the African Continental Free Trade Area (AfCFTA) framework. The research focused
                on how digital infrastructure and data systems can be deployed to reduce friction in
                cross-border supply chains across the continent. It reflects a broader intellectual
                interest: understanding how global trade systems can be made more efficient, equitable,
                and resilient through strategic data use.
              </p>
            </motion.div>

            <div className="w-full h-px bg-outline-variant/30" />

            {/* ── VOLUNTEER: ABPSI ── */}
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <div className="flex items-center gap-4 mb-2">
                <span className="font-sans text-[10px] tracking-[0.2em] text-secondary uppercase font-bold">Volunteer Work</span>
                <div className="flex-1 h-px bg-outline-variant/30" />
              </div>
              <h2 className="font-display text-[28px] md:text-[38px] leading-tight tracking-tight font-bold text-primary">
                Volunteer — Association of Black Psychologists (ABPSI)
              </h2>
              <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed max-w-2xl">
                Uchechukwu has volunteered with the Association of Black Psychologists (ABPSI) University
                of Houston chapter, contributing his time and energy to community-centred programming and
                campus outreach. ABPSI's work focuses on the mental health and cultural wellbeing of Black
                communities — and his involvement reflects a commitment that extends well beyond his
                professional ambitions. Showing up, contributing, and being present in spaces that matter
                to the community around him is a core part of how he operates.
              </p>
            </motion.div>

            <div className="w-full h-px bg-outline-variant/30" />

            {/* ── PULL QUOTE / CLOSING ── */}
            <motion.div
              variants={fadeUp}
              className="py-8 border-l-4 border-primary pl-8"
            >
              <p className="font-display text-[22px] md:text-[28px] leading-snug tracking-tight text-primary font-bold mb-4">
                Beyond the roles, Uchechukwu is driven by a singular ambition: to lead global supply
                chain operations that are faster, smarter, and more human.
              </p>
              <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed max-w-xl">
                Outside of work, he explores technical sound engineering as a craft, amateur photography
                as a creative outlet, and closely follows equities and financial markets — always looking
                for patterns in how systems, capital, and people move.
              </p>
            </motion.div>

            {/* ── SKILLS STRIP ── */}
            <motion.div variants={fadeUp} className="pt-4">
              <p className="font-sans text-[10px] tracking-[0.2em] text-secondary uppercase font-bold mb-6">Core Expertise</p>
              <div className="flex flex-wrap gap-3">
                {[
                  "Advanced Excel & Forecasting",
                  "Data Visualization",
                  "Inventory Management",
                  "Operations Planning",
                  "Event Logistics",
                  "Microsoft Power BI",
                  "Cross-functional Coordination",
                  "Supply Chain Strategy",
                  "Client Services",
                  "Sound Engineering",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="font-sans text-[11px] font-bold tracking-widest uppercase px-4 py-2 border border-outline-variant/60 hover:border-primary hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
