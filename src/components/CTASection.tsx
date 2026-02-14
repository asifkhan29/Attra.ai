import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function CTASection() {
  return (
    <section id="contact" className="relative w-full bg-primary py-32 lg:py-48 overflow-hidden text-primary-foreground">
      
      {/* Structural Background Accent - Signals Engineering Depth */}
      <div className="absolute top-0 right-0 w-1/3 h-full border-l border-white/5 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-20">
          
          <div className="max-w-3xl">
            <ScrollReveal>
              {/* Refined Label - Technical Style */}
              <div className="flex items-center gap-4 mb-10">
                <span className="w-12 h-[1px] bg-white/20" />
                <p className="text-[10px] tracking-[0.5em] uppercase opacity-60">
                  Ready to start?
                </p>
              </div>

              {/* The Heading - Same text, cinematic spacing */}
              <h2 className="text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] font-light leading-[0.9] tracking-tighter">
                Let's build your AI <br />
                <span className="italic font-normal opacity-40">future, together.</span>
              </h2>
            </ScrollReveal>
          </div>

          <div className="lg:mb-4">
            <ScrollReveal>
              <div className="max-w-md">
                {/* Description - Same text, optimized line-height */}
                <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 mb-12">
                  Schedule a consultation with our team of AI architects and strategists.
                </p>

                {/* THE BUTTON - Ultra-sharp 1px border radius */}
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="
                    relative inline-flex items-center justify-center
                    px-12 py-5
                    bg-primary-foreground text-primary
                    text-[11px] font-bold uppercase tracking-[0.3em]
                    rounded-[1px]
                    overflow-hidden
                    group
                    transition-all duration-500
                    hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]
                  "
                >
                  {/* Subtle Technical Shimmer */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                  
                  <span className="relative z-10">Schedule a Call</span>
                </motion.a>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Technical Footer Detail - Signals Corporate Scale */}
        <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <span className="text-[9px] font-mono opacity-20 tracking-[0.4em] uppercase">
                Attra.ai / Infrastructure & Strategy
            </span>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] font-mono opacity-20 tracking-widest uppercase">Nodes Active</span>
                </div>
                <span className="text-[9px] font-mono opacity-20 tracking-widest uppercase">Est. 2026</span>
            </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </section>
  );
}