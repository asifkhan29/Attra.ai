import { motion } from "framer-motion";
import consulting1 from "@/assets/showcase-1.jpg";
import consulting2 from "@/assets/showcase-3.jpg";
import consulting3 from "@/assets/showcase-4.jpg";

export function WelcomeSection() {
  return (
    <section className="relative bg-foreground py-36 overflow-hidden">
      
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mt-10">

        {/* LEFT CONTENT */}
        <div>
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-xs tracking-[0.35em] uppercase text-primary-foreground/40"
          >
            Welcome to
          </motion.p>

          {/* Heading with Highlight */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="text-[3.2rem] sm:text-[4rem] lg:text-[4.8rem] font-light leading-[1.05] tracking-tight"
          >
            <span className="text-primary-foreground">
              Attra
            </span>
            <span className="bg-gradient-to-r from-white via-white/70 to-white/40 bg-clip-text text-transparent">
              .ai
            </span>
          </motion.h2>

          {/* Decorative underline */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-[2px] bg-primary-foreground/30 mt-8 mb-10"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg leading-relaxed text-primary-foreground/60"
          >
            Attra.ai is a global AI and strategy consulting firm empowering
            enterprises to transform complexity into scalable growth.
            We architect intelligent systems, modernize digital operations,
            and design innovation frameworks that move organizations forward.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="mt-6 text-lg leading-relaxed text-primary-foreground/50"
          >
            From AI strategy and automation to enterprise transformation and
            global delivery, Attra.ai partners with visionary leaders to
            deliver measurable outcomes across industries and continents.
          </motion.p>
        </div>

        {/* RIGHT VISUAL STACK */}
        <div className="relative h-[500px] hidden lg:block">

          {/* Image 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute top-0 left-10 w-[260px] rounded-xl overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]"
          >
            <img
              src={consulting1}
              alt="AI Consulting"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Image 2 */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.9 }}
            className="absolute top-32 right-0 w-[280px] rounded-xl overflow-hidden shadow-[0_50px_90px_-30px_rgba(0,0,0,0.8)]"
          >
            <img
              src={consulting2}
              alt="Enterprise Strategy"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Image 3 */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="absolute bottom-0 left-24 w-[240px] rounded-xl overflow-hidden shadow-[0_40px_70px_-25px_rgba(0,0,0,0.8)]"
          >
            <img
              src={consulting3}
              alt="Digital Transformation"
              className="w-full h-full object-cover"
            />
          </motion.div>

        </div>

      </div>
    </section>
  );
}
