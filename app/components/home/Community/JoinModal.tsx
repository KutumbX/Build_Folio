"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinModal({ isOpen, onClose }: JoinModalProps) {
  const [mounted, setMounted] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [logsComplete, setLogsComplete] = useState(false);

  // Avoid SSR issues with createPortal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Boot terminal sequence animation
  useEffect(() => {
    if (!isOpen) {
      setTerminalLogs([]);
      setLogsComplete(false);
      return;
    }

    const logLines = [
      "INITIALIZING SECURE HANDSHAKE...",
      "RESOLVING GATEWAY ROUTERS...",
      "ENCRYPTING NEURAL COMMS_PORT...",
      "GATEWAY COMMS PROTOCOL: SECURED."
    ];

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < logLines.length) {
        setTerminalLogs((prev) => [...prev, logLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setLogsComplete(true);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="relative w-full max-w-[640px] bg-[#070B14] border border-[#00F5FF]/30 rounded-lg p-6 sm:p-8 font-mono select-none overflow-hidden shadow-[0_0_50px_rgba(0,245,255,0.15)] z-50"
          >
            {/* Cyber Scanline overlay */}
            <div 
              className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, #00F5FF 3px, #00F5FF 6px)",
              }}
            />

            {/* Corner Decorative Tech Brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#39FF14] rounded-tl-sm pointer-events-none" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#39FF14] rounded-tr-sm pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#39FF14] rounded-bl-sm pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#39FF14] rounded-br-sm pointer-events-none" />

            {/* Header readouts */}
            <div className="relative z-10 flex items-center justify-between border-b border-blue-500/20 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#39FF14] animate-ping" />
                <h3 className="text-sm font-bold text-white tracking-widest uppercase">
                  GATEWAY_LINK: RESOLVED
                </h3>
              </div>
              <span className="text-[10px] text-zinc-500 font-semibold hidden sm:inline">
                SYS_AUTH: ANONYMOUS
              </span>
            </div>

            {/* Live Terminal Output Console */}
            <div className="relative z-10 bg-zinc-950/80 border border-zinc-800/80 p-4 rounded mb-6 min-h-[110px] flex flex-col justify-start text-[11px] leading-relaxed text-zinc-400">
              <div className="flex items-center justify-between text-[10px] border-b border-zinc-900 pb-2 mb-2 font-bold text-zinc-500">
                <span>TERMINAL_FEED: AUTH_GATEWAY</span>
                <span className="text-cyan-400">ONLINE</span>
              </div>
              <div className="flex-grow space-y-1.5 font-mono">
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-[#39FF14] font-black">&gt;</span>
                    <span className={idx === terminalLogs.length - 1 && !logsComplete ? "border-r-2 border-cyan-400 pr-1 animate-pulse" : ""}>
                      {log}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selection Grid for Gateways (Fades in after handshake logs start) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: terminalLogs.length >= 2 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {/* DISCORD CARD */}
              <a
                href="https://discord.gg/DxargfJxX"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col justify-between p-5 bg-[#09101E] border border-cyan-500/20 rounded hover:border-[#5865F2] hover:shadow-[0_0_20px_rgba(88,101,242,0.3)] transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Tech stats background */}
                <div className="absolute top-2 right-3 text-[8px] text-zinc-700 select-none group-hover:text-[#5865F2]/40 transition-colors duration-300">
                  NODE_ID: DSC_01
                </div>

                <div className="flex items-start justify-between mb-4">
                  <div className="text-cyan-400 group-hover:text-[#5865F2] transition-colors duration-300">
                    {/* Discord Logo SVG */}
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 127.14 96.36" xmlns="http://www.w3.org/2000/svg">
                      <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.88-.65,1.72-1.34,2.51-2.07a75.76,75.76,0,0,0,73,0c.8.73,1.63,1.42,2.51,2.07a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129,54.65,122.58,31.58,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/>
                    </svg>
                  </div>
                  <span className="text-[9px] bg-[#5865F2]/10 text-[#5865F2] border border-[#5865F2]/20 px-1.5 py-0.5 rounded font-black tracking-widest">
                    DISCORD
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-black text-white group-hover:text-[#5865F2] transition-colors duration-300 mb-1 tracking-widest">
                    DISCORD GATEWAY
                  </h4>
                  <p className="text-[10px] text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300 mb-4 font-semibold leading-normal">
                    Global communications stack. Announcements, forums, and developer sandbox.
                  </p>
                  
                  <div className="flex items-center justify-between text-[9px] font-bold border-t border-zinc-900 pt-3 text-zinc-500">
                    <span>ONLINE: 9.8K+</span>
                    <span className="text-[#5865F2] group-hover:translate-x-0.5 transition-transform duration-300">
                      ESTABLISH // ↗
                    </span>
                  </div>
                </div>
              </a>

              {/* WHATSAPP CARD */}
              <a
                href="https://chat.whatsapp.com/JY6r4sTMz9AHVy6n9lVPjS"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col justify-between p-5 bg-[#09101E] border border-cyan-500/20 rounded hover:border-[#25D366] hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Tech stats background */}
                <div className="absolute top-2 right-3 text-[8px] text-zinc-700 select-none group-hover:text-[#25D366]/40 transition-colors duration-300">
                  NODE_ID: WA_01
                </div>

                <div className="flex items-start justify-between mb-4">
                  <div className="text-[#39FF14] group-hover:text-[#25D366] transition-colors duration-300">
                    {/* WhatsApp Logo SVG */}
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <span className="text-[9px] bg-green-500/10 text-green-400 border border-green-500/20 px-1.5 py-0.5 rounded font-black tracking-widest">
                    WHATSAPP
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-black text-white group-hover:text-[#25D366] transition-colors duration-300 mb-1 tracking-widest">
                    WHATSAPP GROUP
                  </h4>
                  <p className="text-[10px] text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300 mb-4 font-semibold leading-normal">
                    Instant alerts, community announcements, and regional group channels.
                  </p>
                  
                  <div className="flex items-center justify-between text-[9px] font-bold border-t border-zinc-900 pt-3 text-zinc-500">
                    <span>ACTIVE: 2.4K+</span>
                    <span className="text-[#39FF14] group-hover:translate-x-0.5 transition-transform duration-300">
                      ESTABLISH // ↗
                    </span>
                  </div>
                </div>
              </a>
            </motion.div>

            {/* Bottom Actions Area */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between mt-8 pt-4 border-t border-blue-500/15 gap-4">
              <span className="text-[9px] text-zinc-600 font-semibold max-w-[280px] text-center sm:text-left leading-normal">
                WARNING: LINK DECRYPTION EXPIRES UPON LEAVING THIS TERMINAL INTERFACE.
              </span>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 border border-zinc-800 hover:border-red-500/50 hover:bg-red-500/5 hover:text-red-400 text-zinc-400 text-[10px] font-black uppercase tracking-widest transition-all duration-200 cursor-pointer"
              >
                [ESC // DISCONNECT]
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
