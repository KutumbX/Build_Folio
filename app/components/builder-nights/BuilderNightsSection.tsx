"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const WHATSAPP_LINK = "https://chat.whatsapp.com/JIsHbVzNkjlAO46KetTJxy";

const SESSIONS = [
  {
    id: "01",
    tag: "BUILDER NIGHT /01",
    title: "Building a RAG Engine",
    subtitle: "Retrieval-Augmented Generation Architecture",
    date: "18th July, Saturday",
    time: "9:30 PM Onwards",
    mode: "Online (Hop in from anywhere)",
    status: "COMPLETED",
    vibe: "No slides. No pressure. Just builders. All are welcome.",
    highlights: [
      "Vector DB setup & embeddings pipeline",
      "Retrieval-Augmented Generation architecture",
      "Context window augmentation for LLMs",
      "Live interactive code-along & Q&A",
    ],
    tech: ["Python", "LangChain / LlamaIndex", "VectorDB", "OpenAI / Ollama"],
    color: "from-[#c6f806]/20 to-[#c6f806]/5",
    accentColor: "#c6f806",
  },
  {
    id: "02",
    tag: "BUILDER NIGHT /02",
    title: "JavaScript Session & Web Development",
    subtitle: "Core JS, Async Pipelines & Practical Projects",
    date: "Every Saturday Night",
    time: "9:00 PM Onwards",
    mode: "Online (KutumbX Community)",
    status: "COMPLETED",
    vibe: "Real builders don't wait. They build.",
    highlights: [
      "Core JS concepts & ES6+ modern syntax",
      "DOM manipulation & Event loop mechanics",
      "Async JavaScript, Promises & Fetch API",
      "Practical full-stack web project build",
    ],
    tech: ["JavaScript ES6+", "Async/Await", "DOM API", "Web Architecture"],
    color: "from-cyan-500/20 to-cyan-500/5",
    accentColor: "#06b6d4",
  },
];

export default function BuilderNightsSection() {
  const [selectedSession, setSelectedSession] = useState<typeof SESSIONS[0] | null>(null);

  return (
    <section className="relative w-full min-h-screen bg-[#04070C] text-white py-20 px-4 sm:px-6 lg:px-8 font-mono select-none overflow-hidden">
      
      {/* BACKGROUND GRID & ACCENTS */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a15_1px,transparent_1px),linear-gradient(to_bottom,#0f172a15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#c6f806]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col items-start mb-12">
          <div className="flex items-center space-x-3 text-xs tracking-widest text-[#c6f806] mb-3">
            <span className="inline-block w-2 h-2 bg-[#c6f806] animate-ping rounded-full" />
            <span>// KUTUMBX_COMMUNITY // WEEKLY_DEVELOPER_SESSIONS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase flex flex-wrap items-center gap-3">
            <span>BUILDER</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c6f806] via-cyan-400 to-blue-500">
              NIGHTS
            </span>
            <span className="text-xs px-3 py-1 border border-[#c6f806]/40 bg-[#c6f806]/10 text-[#c6f806] font-normal tracking-widest self-center">
              2 SESSIONS SHIPPED
            </span>
          </h1>

          <p className="mt-4 text-zinc-400 max-w-3xl text-sm sm:text-base leading-relaxed font-sans">
            A weekly developer session for builders, dreamers & problem solvers. No slides. No pressure. Just real builders getting together to code, collaborate, and ship projects live.
          </p>
        </div>

        {/* WHATSAPP COMMUNITY HERO BANNER */}
        <div className="mb-16 p-6 sm:p-8 bg-gradient-to-r from-emerald-950/40 via-zinc-950 to-zinc-950 border border-emerald-500/40 relative flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
          <div className="space-y-3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE COMMUNITY WHATSAPP HUB</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
              JOIN THE KUTUMBX BUILDERS NETWORK
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-sans max-w-xl leading-relaxed">
              Get instant updates on upcoming Saturday Builder Nights, meet session hosts, get live code assistance, and collaborate with 250+ active builders.
            </p>
          </div>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 bg-emerald-500 text-black font-black text-xs uppercase tracking-widest border border-emerald-400 hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] transition-all cursor-pointer flex items-center space-x-3 shrink-0"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
            <span>JOIN WHATSAPP COMMUNITY ↗</span>
          </a>
        </div>

        {/* SECTION SUBTITLE */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-900">
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">// PERFORMED SESSIONS INDEX</h3>
          <span className="text-xs text-zinc-500 font-mono">TOTAL: 02 SESSIONS</span>
        </div>

        {/* SESSIONS CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {SESSIONS.map((session) => (
            <div
              key={session.id}
              className="p-6 sm:p-8 bg-zinc-950/90 border border-zinc-800 hover:border-cyan-500/50 transition-all duration-300 relative group flex flex-col justify-between shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#c6f806]" />

              <div>
                {/* Session Badge Header */}
                <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
                  <span className="text-xs font-mono text-[#c6f806] bg-[#c6f806]/10 px-3 py-1 border border-[#c6f806]/30">
                    {session.tag}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono border border-emerald-500/30 px-2 py-0.5 bg-emerald-950/30">
                    ● {session.status}
                  </span>
                </div>

                {/* Session Titles */}
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-wider mb-1 group-hover:text-cyan-400 transition-colors">
                  {session.title}
                </h3>
                <p className="text-xs text-cyan-400 font-mono mb-4">{session.subtitle}</p>

                {/* Info Pills */}
                <div className="grid grid-cols-2 gap-3 mb-6 p-3 bg-zinc-900/60 border border-zinc-800/80 text-xs">
                  <div>
                    <span className="text-[9px] text-zinc-500 block">DATE & TIME</span>
                    <span className="text-white font-bold">{session.date}</span>
                    <span className="text-zinc-400 block text-[10px]">{session.time}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-500 block">MODE</span>
                    <span className="text-[#c6f806] font-bold">{session.mode}</span>
                  </div>
                </div>

                {/* Vibe Quote */}
                <div className="p-3 bg-zinc-900/40 border-l-2 border-[#c6f806] text-xs text-zinc-300 font-sans italic mb-6">
                  "{session.vibe}"
                </div>

                {/* Highlights */}
                <div className="space-y-2 mb-6">
                  <div className="text-[10px] text-zinc-500 tracking-widest font-mono">// SESSION_HIGHLIGHTS</div>
                  {session.highlights.map((h, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-zinc-300 font-sans">
                      <span className="text-[#c6f806] font-mono">✦</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Tags & CTA */}
              <div className="pt-4 border-t border-zinc-900 flex flex-col gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {session.tech.map((t) => (
                    <span key={t} className="text-[9px] bg-zinc-900 text-zinc-400 px-2.5 py-0.5 border border-zinc-800">
                      #{t}
                    </span>
                  ))}
                </div>

                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-zinc-900 text-center text-xs font-mono text-cyan-400 hover:text-black hover:bg-[#c6f806] border border-zinc-800 hover:border-[#c6f806] transition-all cursor-pointer font-bold tracking-wider"
                >
                  DISCUSS SESSION IN COMMUNITY ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CALL TO ACTION */}
        <div className="p-8 bg-zinc-950/90 border border-cyan-500/30 relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">WANT TO HOST OR SUGGEST A BUILDER NIGHT?</h3>
            <p className="text-xs text-zinc-400 font-sans max-w-xl">
              Builder Nights are community-driven. Hop into our WhatsApp group or reach out to Dev & Nandini to propose topics or co-host a session!
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#c6f806] text-black font-black text-xs uppercase tracking-widest border border-[#c6f806] hover:bg-transparent hover:text-[#c6f806] shadow-[0_0_15px_rgba(198,248,6,0.3)] transition-all cursor-pointer"
            >
              JOIN WHATSAPP GROUP ↗
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 bg-zinc-900 text-white font-bold text-xs uppercase tracking-widest border border-zinc-700 hover:border-cyan-400 hover:text-cyan-400 transition-all cursor-pointer"
            >
              CONTACT ORGANIZERS
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
