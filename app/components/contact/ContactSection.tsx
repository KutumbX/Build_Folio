"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    priority: "Normal",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedDevEmail, setCopiedDevEmail] = useState(false);
  const [copiedNandiniEmail, setCopiedNandiniEmail] = useState(false);

  const handleCopyDevEmail = () => {
    navigator.clipboard.writeText("devranjeetq@gmail.com");
    setCopiedDevEmail(true);
    setTimeout(() => setCopiedDevEmail(false), 2500);
  };

  const handleCopyNandiniEmail = () => {
    navigator.clipboard.writeText("nandinisahu128@gmail.com");
    setCopiedNandiniEmail(true);
    setTimeout(() => setCopiedNandiniEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate cyber transmission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "General Inquiry", priority: "Normal", message: "" });
    }, 1500);
  };

  return (
    <section className="relative w-full min-h-screen bg-[#04070C] text-white py-20 px-4 sm:px-6 lg:px-8 font-mono select-none overflow-hidden">
      
      {/* BACKGROUND ACCENTS & GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a15_1px,transparent_1px),linear-gradient(to_bottom,#0f172a15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-[#c6f806]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col items-start mb-14">
          <div className="flex items-center space-x-3 text-xs tracking-widest text-[#c6f806] mb-3">
            <span className="inline-block w-2 h-2 bg-[#c6f806] animate-ping rounded-full" />
            <span>// COMM_LINK_v2.4 // SECURE TRANSMISSION CHANNEL</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase flex flex-wrap items-center gap-3">
            <span>GET IN</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c6f806] via-cyan-400 to-blue-500">
              TOUCH
            </span>
            <span className="text-xs px-3 py-1 border border-cyan-500/40 bg-cyan-950/40 text-cyan-400 font-normal tracking-widest self-center">
              STATUS: ONLINE
            </span>
          </h1>

          <p className="mt-4 text-zinc-400 max-w-2xl text-sm sm:text-base leading-relaxed font-sans">
            Have a project idea, feedback, collaboration opportunity, or want to contribute to KutumbX & Build_Folio? Establish a direct link with our core team below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: TEAM SPOTLIGHT CARDS (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="text-xs text-cyan-400 tracking-widest uppercase mb-2">// KUTUMBX_CORE_LEADERSHIP</div>

            {/* CARD 1: DEV SPOTLIGHT CARD */}
            <div className="p-6 bg-zinc-950/90 border border-zinc-800 hover:border-cyan-500/50 backdrop-blur-md relative group transition-all duration-300 shadow-2xl">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#c6f806]" />

              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1">
                  // FOUNDER & LEAD ARCHITECT
                </span>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  AVAILABLE
                </span>
              </div>

              {/* Dev Header */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-950 via-zinc-900 to-zinc-950 border-2 border-[#c6f806] flex items-center justify-center text-[#c6f806] font-black text-xl shadow-[0_0_15px_rgba(198,248,6,0.3)]">
                  DEV
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-white tracking-wider">DEV</h2>
                  <p className="text-xs text-[#c6f806] font-mono mt-0.5">Founder of KutumbX</p>
                  <p className="text-[11px] text-zinc-500 font-sans mt-0.5">Creator of Build_Folio Ecosystem</p>
                </div>
              </div>

              <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4 border-t border-b border-zinc-900 py-3">
                Specializing in WebGL 3D interfaces, fullstack React 19 architecture, and developer incubator tooling.
              </p>

              {/* Dev Contact Channels */}
              <div className="space-y-2.5">
                {/* Dev Email */}
                <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded flex items-center justify-between gap-3 group/email">
                  <div className="flex items-center space-x-2.5 overflow-hidden">
                    <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:devranjeetq@gmail.com" className="text-xs text-white font-mono hover:text-[#c6f806] transition-colors truncate block">
                      devranjeetq@gmail.com
                    </a>
                  </div>
                  <button
                    onClick={handleCopyDevEmail}
                    className="px-2 py-1 bg-zinc-800 hover:bg-[#c6f806] hover:text-black text-zinc-300 text-[10px] font-mono tracking-wider transition-all cursor-pointer shrink-0 border border-zinc-700 hover:border-[#c6f806]"
                  >
                    {copiedDevEmail ? "COPIED! ✓" : "COPY"}
                  </button>
                </div>

                {/* Dev Social Links Row */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://github.com/KutumbX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-zinc-900/80 border border-zinc-800 hover:border-cyan-500/50 rounded flex items-center justify-between group/link transition-all"
                  >
                    <span className="text-[11px] text-zinc-300 group-hover/link:text-cyan-400">GitHub ↗</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/dev-kutumbx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-zinc-900/80 border border-zinc-800 hover:border-cyan-500/50 rounded flex items-center justify-between group/link transition-all"
                  >
                    <span className="text-[11px] text-zinc-300 group-hover/link:text-cyan-400">LinkedIn ↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* CARD 2: NANDINI SPOTLIGHT CARD */}
            <div className="p-6 bg-zinc-950/90 border border-zinc-800 hover:border-cyan-500/50 backdrop-blur-md relative group transition-all duration-300 shadow-2xl">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#c6f806]" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-[#c6f806] bg-[#c6f806]/10 border border-[#c6f806]/30 px-2.5 py-1">
                  // CO-FOUNDER & CREATIVE LEAD
                </span>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  AVAILABLE
                </span>
              </div>

              {/* Nandini Header */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-950 via-zinc-900 to-zinc-950 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 font-black text-xl shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  NAN
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-white tracking-wider">NANDINI</h2>
                  <p className="text-xs text-cyan-400 font-mono mt-0.5">Core-Member of KutumbX</p>
                  <p className="text-[11px] text-zinc-500 font-sans mt-0.5">Design Systems & Community Lead</p>
                </div>
              </div>

              <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4 border-t border-b border-zinc-900 py-3">
                Focusing on user experience design, front-end motion systems, community engagements, and product strategy.
              </p>

              {/* Nandini Contact Channels */}
              <div className="space-y-2.5">
                {/* Nandini Email */}
                <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded flex items-center justify-between gap-3 group/email">
                  <div className="flex items-center space-x-2.5 overflow-hidden">
                    <svg className="w-4 h-4 text-[#c6f806] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:nandinisahu128@gmail.com" className="text-xs text-white font-mono hover:text-[#c6f806] transition-colors truncate block">
                      nandinisahu128@gmail.com
                    </a>
                  </div>
                  <button
                    onClick={handleCopyNandiniEmail}
                    className="px-2 py-1 bg-zinc-800 hover:bg-[#c6f806] hover:text-black text-zinc-300 text-[10px] font-mono tracking-wider transition-all cursor-pointer shrink-0 border border-zinc-700 hover:border-[#c6f806]"
                  >
                    {copiedNandiniEmail ? "COPIED! ✓" : "COPY"}
                  </button>
                </div>

                {/* Nandini Social Links Row */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://github.com/KutumbX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-zinc-900/80 border border-zinc-800 hover:border-[#c6f806]/50 rounded flex items-center justify-between group/link transition-all"
                  >
                    <span className="text-[11px] text-zinc-300 group-hover/link:text-[#c6f806]">GitHub ↗</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/nandinisahu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-zinc-900/80 border border-zinc-800 hover:border-[#c6f806]/50 rounded flex items-center justify-between group/link transition-all"
                  >
                    <span className="text-[11px] text-zinc-300 group-hover/link:text-[#c6f806]">LinkedIn ↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* QUICK STATS */}
            <div className="p-5 bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-zinc-500 block text-[9px]">TIMEZONE</span>
                <span className="text-[#c6f806] font-bold">IST (UTC+5:30)</span>
              </div>
              <div className="text-right">
                <span className="text-zinc-500 block text-[9px]">AVG_RESPONSE_TIME</span>
                <span className="text-cyan-400 font-bold">&lt; 6 HOURS</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: ENCRYPTED MESSAGE TRANSMISSION FORM (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 bg-zinc-950/90 border border-zinc-800/90 backdrop-blur-md relative shadow-2xl h-full flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-900">
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider">// SEND ENCRYPTED MESSAGE</h3>
                    <p className="text-xs text-zinc-400 font-sans mt-0.5">Fill out the parameters below to dispatch a message directly to Dev & Nandini.</p>
                  </div>
                  <div className="hidden sm:block text-[10px] text-zinc-500 font-mono">SECURE_SSL_256BIT</div>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 px-6 bg-cyan-950/30 border border-cyan-500/40 text-center space-y-4 rounded-sm"
                  >
                    <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-400 flex items-center justify-center mx-auto text-xl font-bold animate-bounce">
                      ✓
                    </div>
                    <h4 className="text-xl font-bold text-white tracking-wider uppercase">TRANSMISSION RECEIVED</h4>
                    <p className="text-xs text-zinc-300 font-sans max-w-md mx-auto leading-relaxed">
                      Your message has been encrypted and routed directly to Dev (<span className="text-[#c6f806]">devranjeetq@gmail.com</span>) and Nandini (<span className="text-cyan-400">nandinisahu128@gmail.com</span>). You will receive a response shortly.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-4 px-6 py-2.5 bg-[#c6f806] text-black font-black text-xs uppercase tracking-widest border border-[#c6f806] hover:bg-transparent hover:text-[#c6f806] transition-all cursor-pointer"
                    >
                      SEND ANOTHER MESSAGE
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 font-mono">
                    
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs text-zinc-400 tracking-wider flex items-center justify-between">
                          <span>YOUR_NAME *</span>
                          <span className="text-[9px] text-zinc-600">INPUT_STRING</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alex Vance"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 focus:border-cyan-400 text-white text-xs rounded-none outline-none transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-zinc-400 tracking-wider flex items-center justify-between">
                          <span>YOUR_EMAIL *</span>
                          <span className="text-[9px] text-zinc-600">VALID_EMAIL</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. alex@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 focus:border-cyan-400 text-white text-xs rounded-none outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Subject & Priority */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs text-zinc-400 tracking-wider flex items-center justify-between">
                          <span>SUBJECT_CATEGORY</span>
                          <span className="text-[9px] text-zinc-600">SELECT</span>
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 focus:border-cyan-400 text-white text-xs rounded-none outline-none transition-colors cursor-pointer"
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Project Collaboration">Project Collaboration</option>
                          <option value="KutumbX Ecosystem">KutumbX Ecosystem</option>
                          <option value="Portfolio Review">Portfolio Review</option>
                          <option value="Sponsorship & Hire">Sponsorship & Hire</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-zinc-400 tracking-wider flex items-center justify-between">
                          <span>PRIORITY_LEVEL</span>
                          <span className="text-[9px] text-zinc-600">SELECT</span>
                        </label>
                        <select
                          value={formData.priority}
                          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                          className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 focus:border-cyan-400 text-white text-xs rounded-none outline-none transition-colors cursor-pointer"
                        >
                          <option value="Normal">Normal Priority</option>
                          <option value="High">High Priority</option>
                          <option value="Urgent">Urgent / Contract</option>
                        </select>
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                      <label className="text-xs text-zinc-400 tracking-wider flex items-center justify-between">
                        <span>TRANSMISSION_BODY *</span>
                        <span className="text-[9px] text-zinc-600">TEXT_PAYLOAD</span>
                      </label>
                      <textarea
                        required
                        rows={6}
                        placeholder="Write your detailed message here..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 focus:border-cyan-400 text-white text-xs rounded-none outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#c6f806] text-black font-black text-xs uppercase tracking-widest border border-[#c6f806] hover:bg-black hover:text-[#c6f806] shadow-[0_0_20px_rgba(198,248,6,0.35)] transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>ENCRYPTING & TRANSMITTING...</span>
                        </>
                      ) : (
                        <>
                          <span>DISPATCH MESSAGE TO TEAM</span>
                          <span>↗</span>
                        </>
                      )}
                    </button>

                  </form>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
