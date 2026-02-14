import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import consulting1 from "@/assets/showcase-1.jpg";
import consulting2 from "@/assets/showcase-3.jpg";
import consulting3 from "@/assets/showcase-4.jpg";

export function WelcomeSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax offsets for the images
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={containerRef} className="relative bg-[#080808] py-32 md:py-48 overflow-hidden">
      
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '100px 100px' }} 
      />
      
      {/* Dynamic Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

        {/* LEFT CONTENT - Occupies 7 columns */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-8 text-[10px] tracking-[0.5em] uppercase text-white/30 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-white/20" />
              Introduction
            </p>

            <h2 className="text-[3.5rem] md:text-[5rem] lg:text-[6.2rem] font-extralight leading-[0.9] tracking-tighter text-white mb-12">
              Architecting <br />
              <span className="italic font-normal text-white/40 italic">Intelligence.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              <p className="text-lg leading-relaxed text-white/60">
                Attra.ai is a global collective of strategists and engineers. 
                We don't just advise on the future; we build the infrastructure 
                that makes it possible. From AI roadmaps to production-grade 
                deployments, we move the needle for the world’s most ambitious 
                enterprises.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1 }}
              className="flex flex-col justify-between"
            >
              <p className="text-lg leading-relaxed text-white/40">
                Complexity is the barrier to scale. We simplify the path to 
                transformation by integrating strategy, ethical governance, 
                and high-performance execution into a single, seamless 
                partnership model.
              </p>
              
              {/* Refined "About" Link */}
              <a href="#about" className="group mt-8 inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-white">
                Learn more 
                <span className="w-10 h-[1px] bg-white/20 group-hover:w-16 group-hover:bg-white transition-all duration-500" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* RIGHT VISUAL STACK - Occupies 5 columns */}
        <div className="lg:col-span-5 relative h-[600px] flex items-center justify-center">
          
          {/* Main Background Image - Asymmetric */}
          <motion.div
            style={{ y: y1 }}
            className="absolute top-0 right-0 w-[280px] aspect-[3/4] overflow-hidden rounded-[2px] grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl z-20"
          >
            <img src={consulting1} alt="Advisory" className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>

          {/* Floating Accent Image */}
          <motion.div
            style={{ y: y2 }}
            className="absolute bottom-10 left-0 w-[220px] aspect-square overflow-hidden rounded-[2px] z-30 shadow-2xl border-[12px] border-[#080808]"
          >
            <img src={consulting2} alt="Strategy" className="w-full h-full object-cover" />
          </motion.div>

          {/* Deep Background Image */}
          <motion.div
            style={{ y: y3 }}
            className="absolute top-20 left-10 w-[200px] aspect-[4/5] overflow-hidden rounded-[2px] opacity-30 blur-[1px] z-10"
          >
            <img src={consulting3} alt="Data" className="w-full h-full object-cover" />
          </motion.div>

          {/* Abstract Geometric Element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-[-45deg] pointer-events-none" />
        </div>

      </div>
    </section>
  );
}