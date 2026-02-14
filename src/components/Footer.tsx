import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const [open, setOpen] = useState<string | null>(null);

  const sections = [
    { title: "Services", links: ["AI Strategy", "Automation Systems", "Digital Transformation", "Growth Optimization", "Enterprise Advisory"] },
    { title: "Industries", links: ["Financial Services", "Healthcare", "Private Equity", "SaaS & Technology"] },
    { title: "Insights", links: ["Case Studies", "Research", "Webinars", "Reports"] },
    { title: "Company", links: ["About", "Leadership", "Careers", "Contact"] },
    { title: "Follow", links: ["LinkedIn", "X", "YouTube"] },
  ];

  return (
    <footer className="relative bg-black text-white pt-32 pb-12 border-t border-white/5 overflow-hidden">
      
      {/* ================= AUTO-ANIMATING DATA STREAM ================= */}
      {/* This creates a very subtle "scanning" line that moves across the footer every 8 seconds */}
      <motion.div 
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* ================= TOP DATA BAR ================= */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-24 pb-8 border-b border-white/5">
          <div className="flex items-center gap-4">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
             <span className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-40">Network Status: Operational</span>
             <motion.span 
               animate={{ opacity: [0.2, 0.6, 0.2] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="text-[10px] font-mono text-green-500/50"
             >
               [LIVE_STREAM_ACTIVE]
             </motion.span>
          </div>
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-40">Location: Global HQ / Remote Distributed</span>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="hidden lg:grid grid-cols-12 gap-12">
          
          {/* Brand & Mission */}
          <div className="col-span-4 pr-12">
            <motion.h2 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl font-light tracking-tighter mb-8"
            >
              Attra<span className="italic font-normal opacity-50">.ai</span>
            </motion.h2>
            <p className="text-base text-white/40 max-w-xs leading-relaxed font-light mb-12">
              Architecting the next generation of enterprise intelligence through neural strategy and high-performance delivery.
            </p>
            
            {/* Newsletter Micro-Interaction */}
            <div className="relative max-w-xs group">
                <input 
                    type="text" 
                    placeholder="Join the Briefing" 
                    className="w-full bg-transparent border-b border-white/10 py-3 text-xs uppercase tracking-widest outline-none focus:border-white transition-all duration-500"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    <ArrowUpRight size={16} />
                </button>
            </div>
          </div>

          {/* Links Grid */}
          <div className="col-span-8 grid grid-cols-4 gap-8">
            {sections.slice(0, 4).map((section, sIdx) => (
              <div key={section.title}>
                <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/20 mb-10">
                  {section.title}
                </h4>
                <ul className="space-y-5">
                  {section.links.map((link, lIdx) => (
                    <motion.li 
                      key={link}
                      initial={{ opacity: 0, y: 5 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: (sIdx * 0.1) + (lIdx * 0.05) }}
                    >
                      <a
                        href="#"
                        className="text-[13px] text-white/50 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                      >
                        {link}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ================= MOBILE NAVIGATION ================= */}
        <div className="lg:hidden space-y-4">
          <div className="mb-16">
             <h2 className="text-3xl font-light tracking-tighter mb-4">Attra.ai</h2>
             <p className="text-sm text-white/40">Neural strategy at scale.</p>
          </div>
          
          {sections.map((section) => (
            <div key={section.title} className="border-b border-white/5">
              <button
                onClick={() => setOpen(open === section.title ? null : section.title)}
                className="w-full flex items-center justify-between py-6 text-left"
              >
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">
                  {section.title}
                </span>
                <ChevronDown className={`h-3 w-3 transition-transform duration-500 ${open === section.title ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {open === section.title && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pb-8 space-y-5"
                  >
                    {section.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="block text-sm text-white/60">{link}</a>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* ================= AUTO-ANIMATING WATERMARK ================= */}
        <div className="mt-32 relative overflow-hidden pointer-events-none select-none">
            <motion.h1 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[18vw] font-bold leading-none tracking-tighter opacity-[0.02] -mb-8"
            >
                ATTRA.AI
            </motion.h1>
            {/* Secondary Watermark Layer for "Glow" Effect */}
            <motion.h1 
              animate={{ opacity: [0.01, 0.03, 0.01] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 text-[18vw] font-bold leading-none tracking-tighter opacity-[0.01] -mb-8 blur-sm"
            >
                ATTRA.AI
            </motion.h1>
        </div>

        {/* ================= LEGAL & SOCIAL ================= */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-wrap gap-x-12 gap-y-4 text-[10px] font-mono tracking-widest uppercase opacity-30">
            <span>© 2026 Attra.ai</span>
            <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Security Protocol</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Sitemap</a>
          </div>

          <div className="flex gap-10">
            {["LinkedIn", "X", "YouTube"].map((social, idx) => (
              <motion.a 
                key={social} 
                href="#" 
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, delay: idx * 1, repeat: Infinity }}
                className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/20 hover:text-white transition-colors"
              >
                {social}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}