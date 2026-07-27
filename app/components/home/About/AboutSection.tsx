"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
// import process from "process";

// ─────────────────────────────────────────────────────────────
// DATA SCHEMAS
// ─────────────────────────────────────────────────────────────

const METRICS = [
  { label: "ACTIVE_NODES", value: "60+", sub: "Developers Growing Together" },
  { label: "PROJECTS_BUILT", value: "5+", sub: "Cyber Portfolios" },
  { label: "Events", value: "10+", sub: "Workshops & Coding Sessions" },
  { label: "Coontributors", value: "5+", sub: "Global Dev Network" },
];

const PILLARS = [
  {
    id: "01",
    title: "CAREER & LEADERSHIP",
    category: "NEXT GENERATION",
    description:
      "Develop technical expertise, communication, and leadership skills while preparing for internships, research, startups, and global opportunities.",
    tech: ["Leadership", "Career Development", "Research", "Portfolio"],
    icon: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "COMMUNITY COLLABORATION",
    category: "Open source",
    description:
      "Learn by contributing to open-source projects, participating in hackathons, and collaborating with developers worldwide.",
    tech: ["Open Source", "Hackathons", "Code Jams", "Design Systems"],
    icon: (
      <svg className="w-6 h-6 text-[#c6f806]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "COLLABORATE & GROW",
    category: "COMMUNITY",
    description:
      "Connect with passionate developers through hackathons, open-source projects, mentorship, peer learning, and technical communities that encourage continuous growth.",
    tech: ["Discord", "Live Review", "Peer Network", "Mentorship"],
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "IOT & ROBOTICS ECOSYSTEM",
    category: "MAKER LABS",
    description:
      "Design intelligent systems with embedded hardware, automation, robotics, computer vision, and AI-driven innovation.",
    tech: ["IoT", "ESP32", "Arduino", "Computer Vision"],
    icon: (
      <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
];

const TECH_STACK = [
  { name: "Next.js 16", category: "Core", level: "98%", desc: "App Router & React Server Components" },
  { name: "React 19", category: "Core", level: "95%", desc: "Concurrent rendering & Actions" },
  { name: "Three.js", category: "Graphics", level: "92%", desc: "WebGL scene graph & custom shaders" },
  { name: "React Three Fiber", category: "Graphics", level: "94%", desc: "Declarative 3D component architecture" },
  { name: "GSAP", category: "Motion", level: "96%", desc: "Timeline animations & ScrollTrigger" },
  { name: "Framer Motion", category: "Motion", level: "95%", desc: "Layout animations & physics gestures" },
  { name: "Tailwind CSS v4", category: "Styling", level: "99%", desc: "Utility-first modern styling tokens" },
  { name: "Lenis", category: "Motion", level: "90%", desc: "Smooth momentum scroll engine" },
];

const TIMELINE = [
  {
    phase: "PHASE_01",
    date: "Q1 2024",
    title: "KUTUMBX // COMMUNITY LAUNCH",
    details: "Established KutumbX with the vision of creating a collaborative ecosystem for developers, innovators, and technology enthusiasts. Started organizing technical sessions and building an active learning community.",
    status: "COMPLETED",
  },
  {
    phase: "PHASE_02",
    date: "Q3 2024",
    title: "Workshop // Skill Development",
    details: "Conducted hands-on workshops covering Web Development, Git & GitHub, JavaScript, React, IoT fundamentals, Robotics, RAG Systems, and Open Source, helping members gain practical industry skills.",
    status: "IN_PROGRESS",
  },
  {
    phase: "PHASE_03",
    date: "Q1 2025",
    title: "PROJECTS // OPEN SOURCE INITIATIVES",
    details: "Launched collaborative development projects, encouraged open-source contributions, organized hackathons, and promoted teamwork through real-world engineering challenges.",
    status: "IN_PROGRESS",
  },
  {
    phase: "PHASE_04",
    date: "Q4 2025",
    title: "IOT & ROBOTICS // MAKER ECOSYSTEM",
    details: "Expand hands-on learning through IoT prototypes, robotics workshops, embedded systems, Arduino, Raspberry Pi, ESP32 projects, and AI-powered automation experiments.",
    status: "UPCOMING",
  },
  {
    phase: "PHASE_05",
    date: "Q4 2025",
    title: "CAREER & INDUSTRY // GLOBAL NETWORK",
    details: "Build mentorship programs, industry collaborations, internship opportunities, research initiatives, startup incubation, and a nationwide network connecting developers and innovators.",
    status: "UPCOMING",
  },
];

const TEAM = [
  {
    name: "Dev Sahu",
    role: "Founder",
    handle: "@devv.not.found",
    skills: ["Three.js", "WebGL", "Next.js"],
    bio: "Pioneering spatial web experiences and high-performance WebGL rendering pipelines.",
    status: "Active",
    color: "cyan",
  },
  {
    name: "Nandani Sahu",
    role: "Co-Founder",
    handle: "@nandinisahu446",
    skills: ["UI/UX", "GSAP", "Cyber Aesthetics"],
    bio: "Crafting visual identities, dark glassmorphism interfaces, and motion design systems.",
    status: "ACTIVE",
    color: "lime",
  },
  {
    name: "Mohit Kumar",
    role: "Operational Manager",
    handle: "@web.relax.in",
    skills: ["Fullstack", "React 19", "System Design"],
    bio: "Building open tools for developers to showcase their creative engineering talents.",
    status: "Active",
    color: "purple",
  },
  {
    name: "Krish Pipariya",
    role: "Ecosystem Architect",
    handle: "@krish_pipariya9793",
    skills: ["Community", "DevRel", "Rust/Node"],
    bio: "Managing developer relations, open-source contributors, and global hackathon events.",
    status: "Active",
    color: "emerald",
  },
];

const FAQS = [
  {
    question: "WHAT IS KutumbX & HOW DOES IT WORK?",
    answer:
      "KutumbX is a developer community where members learn, build projects, explore IoT & robotics, collaborate on open source, attend workshops and hackathons, and grow together through hands-on learning and mentorship.",
  },
  {
    question: "IS BUILD_FOLIO FREE AND OPEN SOURCE?",
    answer:
      "Yes! Build_Folio core templates, components, and community labs are 100% free and open-source under the MIT license. Anyone can clone, customize, and deploy their portfolio.",
  },
  {
    question: "HOW DO I FEATURE MY PORTFOLIO IN THE COMMUNITY SHOWCASE?",
    answer:
      "You can submit your live site URL or GitHub repository through our Community section. Our core reviewers evaluate submissions based on performance, design execution, and technical creativity.",
  },
  {
    question: "WHAT TECH STACK DO I NEED TO KNOW TO CUSTOMIZE THIS?",
    answer:
      "Basic knowledge of React, Next.js, and Tailwind CSS is enough to get started. For advanced 3D visual tweaks, working knowledge of Three.js or React Three Fiber is helpful.",
  },
  {
    question: "HOW CAN I GET INVOLVED IN HACKATHONS AND CYBER LABS?",
    answer:
      "Join our developer Discord community and check out the Upcoming Events section on our homepage to register for live hackathons, workshops, and code jams.",
  },
];

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<"manifesto" | "stack" | "timeline" | "team" | "faq">("manifesto");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedTechCat, setSelectedTechCat] = useState<string>("All");
  const [copiedManifesto, setCopiedManifesto] = useState(false);

  const handleCopyManifesto = () => {
    const manifestoText = `BUILD_FOLIO // SYS_MANIFESTO\nWe believe developer portfolios shouldn't be boring static resumes. Build_Folio exists to merge high-performance WebGL, cyber aesthetics, and modern React 19 engineering to give creators the platform they deserve.`;
    navigator.clipboard.writeText(manifestoText);
    setCopiedManifesto(true);
    setTimeout(() => setCopiedManifesto(false), 2500);
  };

  const filteredTech =
    selectedTechCat === "All"
      ? TECH_STACK
      : TECH_STACK.filter((item) => item.category === selectedTechCat);

  return (
    <section id="about" className="relative w-full bg-[#04070C] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden font-mono border-t border-b border-cyan-500/20 select-none">
      
      {/* BACKGROUND ACCENTS & GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a15_1px,transparent_1px),linear-gradient(to_bottom,#0f172a15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#c6f806]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col items-start mb-12">
          <div className="flex items-center space-x-3 text-xs tracking-widest text-[#c6f806] mb-3">
            <span className="inline-block w-2 h-2 bg-[#c6f806] animate-ping rounded-full" />
            <span>// SYS_MANIFESTO & ECOSYSTEM ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white flex flex-wrap items-center gap-3">
            <span>ABOUT</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c6f806] via-cyan-400 to-blue-500">
              BUILD_FOLIO
            </span>
            <span className="text-xs px-2.5 py-1 border border-cyan-500/40 bg-cyan-950/40 text-cyan-400 font-normal tracking-widest self-center ">
               v1.0.0_STABLE
            </span>
          </h2>

          <p className="mt-4 text-zinc-400 max-w-3xl text-sm sm:text-base leading-relaxed font-sans">
            We are building a collaborative developer ecosystem where students, developers, and innovators learn, create, and grow together. Through hands-on sessions in Web Development, App Development, IoT, Robotics, AI, and Open Source, we transform ideas into real-world solutions while fostering innovation, collaboration, and technical excellence.
          </p>
        </div>

        {/* METRICS / HUD CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {METRICS.map((m, idx) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-4 sm:p-5 bg-zinc-950/80 border border-zinc-800/80 hover:border-cyan-500/50 backdrop-blur-md relative group transition-all duration-300 shadow-lg"
            >
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#c6f806]" />
              
              <div className="text-[10px] text-zinc-500 tracking-widest uppercase mb-1">{m.label}</div>
              <div className="text-2xl sm:text-4xl font-black text-[#c6f806] tracking-tight group-hover:text-cyan-400 transition-colors">
                {m.value}
              </div>
              <div className="text-[11px] text-zinc-400 mt-1 font-sans font-light">{m.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* INTERACTIVE NAVIGATION TABS */}
        <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-4 mb-12">
          {[
            { id: "manifesto", label: "01_PILLARS" },
            { id: "stack", label: "02_TECH_STACK" },
            { id: "timeline", label: "03_EVOLUTION" },
            { id: "team", label: "04_ARCHITECTS" },
            { id: "faq", label: "05_PROTOCOL_FAQ" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs tracking-widest uppercase transition-all duration-200 cursor-pointer border ${
                activeTab === tab.id
                  ? "bg-[#c6f806] text-black font-black border-[#c6f806] shadow-[0_0_15px_rgba(198,248,6,0.4)]"
                  : "bg-zinc-950/80 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
              }`}
            >
              {tab.label}
            </button>
          ))}

          <div className="ml-auto hidden md:flex items-center space-x-2 text-[10px] text-zinc-500">
            <span>MODE: INTERACTIVE</span>
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          </div>
        </div>

        {/* TAB CONTENTS */}
        <AnimatePresence mode="wait">
          
          {/* 01. MANIFESTO & PILLARS */}
          {activeTab === "manifesto" && (
            <motion.div
              key="manifesto"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Pillars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PILLARS.map((pillar) => (
                  <div
                    key={pillar.id}
                    className="p-6 bg-zinc-950/90 border border-zinc-800/90 hover:border-cyan-500/50 backdrop-blur-md relative group transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-zinc-900 border border-zinc-800 rounded group-hover:border-cyan-500/40 transition-colors">
                        {pillar.icon}
                      </div>
                      <span className="text-xs font-mono text-[#c6f806] bg-[#c6f806]/10 px-2.5 py-1 border border-[#c6f806]/30">
                        {pillar.id} // {pillar.category.toUpperCase()}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold tracking-wider text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {pillar.title.toUpperCase()}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed mb-6">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-900">
                      {pillar.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] bg-zinc-900 text-zinc-300 px-2 py-0.5 border border-zinc-800"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Manifesto Copy Block */}
              <div className="p-6 sm:p-8 bg-gradient-to-r from-blue-950/30 via-zinc-950 to-zinc-950 border border-blue-500/30 relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="text-xs text-cyan-400 tracking-widest">// THE CYBERPUNK MANIFESTO</div>
                  <h4 className="text-xl font-bold text-white">"Code is art. Your portfolio should be proof."</h4>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    Build_Folio was created to bridge the gap between creative visual code and modern software engineering. We believe every developer's online presence should reflect their dedication to craft.
                  </p>
                </div>

                <button
                  onClick={handleCopyManifesto}
                  className="px-5 py-3 bg-[#c6f806] text-black font-black text-xs uppercase tracking-widest border border-[#c6f806] hover:bg-transparent hover:text-[#c6f806] shadow-[0_0_15px_rgba(198,248,6,0.3)] transition-all cursor-pointer whitespace-nowrap"
                >
                  {copiedManifesto ? "MANIFESTO COPIED! ✓" : "COPY SYS_MANIFESTO ↗"}
                </button>
              </div>
            </motion.div>
          )}

          {/* 02. TECH STACK MATRIX */}
          {activeTab === "stack" && (
            <motion.div
              key="stack"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Category Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-zinc-500 mr-2">FILTER_STACK:</span>
                {["All", "Core", "Graphics", "Motion", "Styling"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedTechCat(cat)}
                    className={`px-3 py-1 text-xs border transition-all cursor-pointer ${
                      selectedTechCat === cat
                        ? "bg-cyan-500/20 text-cyan-400 border-cyan-500"
                        : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Stack Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredTech.map((item) => (
                  <div
                    key={item.name}
                    className="p-5 bg-zinc-950/90 border border-zinc-800/80 hover:border-cyan-500/40 transition-all group relative"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white group-hover:text-[#c6f806] transition-colors">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400 border border-cyan-500/30 px-1.5 py-0.5">
                        {item.category}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 font-sans mb-4 min-h-[32px]">
                      {item.desc}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-zinc-500">
                        <span>INTEGRATION_LEVEL</span>
                        <span className="text-[#c6f806]">{item.level}</span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-900 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-[#c6f806]"
                          style={{ width: item.level }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 03. EVOLUTION TIMELINE */}
          {activeTab === "timeline" && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="relative border-l border-cyan-500/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
                {TIMELINE.map((item, idx) => (
                  <div key={item.phase} className="relative group">
                    {/* Node Dot */}
                    <div
                      className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 transition-all ${
                        item.status === "COMPLETED"
                          ? "bg-[#c6f806] border-[#c6f806] shadow-[0_0_10px_rgba(198,248,6,0.8)]"
                          : item.status === "IN_PROGRESS"
                          ? "bg-cyan-500 border-cyan-500 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                          : "bg-zinc-950 border-zinc-700"
                      }`}
                    />

                    <div className="p-6 bg-zinc-950/90 border border-zinc-800 hover:border-cyan-500/40 transition-all max-w-3xl">
                      <div className="flex items-center justify-between gap-4 mb-2 flex-wrap">
                        <div className="flex items-center space-x-3">
                          <span className="text-xs text-[#c6f806] font-bold">{item.phase}</span>
                          <span className="text-xs text-zinc-500">// {item.date}</span>
                        </div>
                        <span
                          className={`text-[10px] px-2 py-0.5 border ${
                            item.status === "COMPLETED"
                              ? "text-emerald-400 border-emerald-500/40 bg-emerald-950/30"
                              : item.status === "IN_PROGRESS"
                              ? "text-cyan-400 border-cyan-500/40 bg-cyan-950/30"
                              : "text-zinc-500 border-zinc-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <h4 className="text-base sm:text-lg font-bold text-white mb-2">{item.title.toUpperCase()}</h4>
                      <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                        {item.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 04. CORE ARCHITECTS / TEAM */}
          {activeTab === "team" && (
            <motion.div
              key="team"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {TEAM.map((member) => (
                <div
                  key={member.name}
                  className="p-6 bg-zinc-950/90 border border-zinc-800/90 hover:border-cyan-500/50 transition-all group relative flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Avatar Placeholder */}
                    <div className="w-full h-36 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 flex flex-col items-center justify-center relative overflow-hidden group-hover:border-cyan-500/40 transition-colors">
                      <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:12px_12px] opacity-20" />
                      
                      <div className="w-16 h-16 rounded-full bg-cyan-950/50 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold text-xl shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </div>

                      <div className="mt-2 text-[10px] text-zinc-500 tracking-widest">{member.handle}</div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-base font-bold text-white group-hover:text-[#c6f806] transition-colors">
                          {member.name.toUpperCase()}
                        </h4>
                        <span className="text-[9px] text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5">
                          ● {member.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-[11px] text-cyan-400 font-mono mb-3">{member.role.toUpperCase()}</div>
                      <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4">
                        {member.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-900">
                    {member.skills.map((s) => (
                      <span key={s} className="text-[9px] bg-zinc-900 text-zinc-400 px-2 py-0.5 border border-zinc-800">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* 05. PROTOCOL FAQ */}
          {activeTab === "faq" && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 max-w-4xl"
            >
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.question}
                    className="border border-zinc-800 bg-zinc-950/90 hover:border-cyan-500/40 transition-all overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer font-bold text-xs sm:text-sm tracking-wider text-white hover:text-[#c6f806] transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-cyan-500 text-xs">0{idx + 1}.</span>
                        {faq.question}
                      </span>
                      <span className="text-lg font-mono text-[#c6f806]">{isOpen ? "−" : "+"}</span>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-0 border-t border-zinc-900 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          )}

        </AnimatePresence>

        {/* BOTTOM CALL TO ACTION BANNER */}
        <div className="mt-20 p-8 bg-gradient-to-r from-zinc-950 via-cyan-950/20 to-zinc-950 border border-cyan-500/30 relative flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
              READY TO BUILD YOUR DIGITAL LEGACY?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-xl">
              Join thousands of developers crafting ultra-modern 3D portfolios and WebGL experiences with Build_Folio.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link
              href="#community"
              className="px-6 py-3 bg-[#c6f806] text-black font-black text-xs uppercase tracking-widest border border-[#c6f806] hover:bg-transparent hover:text-[#c6f806] shadow-[0_0_15px_rgba(198,248,6,0.3)] transition-all cursor-pointer"
            >
              JOIN THE COMMUNITY ↗
            </Link>
            <Link
              href="#upcoming-events"
              className="px-6 py-3 bg-zinc-900 text-white font-bold text-xs uppercase tracking-widest border border-zinc-700 hover:border-cyan-400 hover:text-cyan-400 transition-all cursor-pointer"
            >
              EXPLORE LABS & EVENTS
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
