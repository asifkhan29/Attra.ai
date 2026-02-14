import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import BackgroundAnimated from "./BackgroundAnimated";

const services = [
  {
    number: "01",
    title: "Strategic Advisory",
    description: "Align executive vision with AI transformation roadmaps designed for sustainable competitive advantage and long-term value.",
  },
  {
    number: "02",
    title: "Enterprise AI Delivery",
    description: "Design, architect, and deploy production-grade AI systems embedded directly into your core business operations.",
  },
  {
    number: "03",
    title: "Intelligent Automation",
    description: "Build scalable automation infrastructures that streamline complex workflows and unlock hidden operational efficiency.",
  },
  {
    number: "04",
    title: "Performance & Governance",
    description: "Continuously refine systems through advanced analytics, ethical governance, and measurable performance frameworks.",
  },
];

export default function EnterpriseFeatureSection() {
  return (
    <section className="relative w-full bg-white py-24 md:py-40 overflow-hidden text-gray-900">
      <BackgroundAnimated />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* ================= HEADER (Asymmetric Layout) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-32 items-end">
          <div className="lg:col-span-8">
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[10px] tracking-[0.5em] uppercase text-gray-400 mb-8 flex items-center gap-4"
            >
              <span className="w-8 h-[1px] bg-gray-200" /> Attra.ai / Core Capabilities
            </motion.p>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] leading-[0.9] font-light tracking-tighter text-gray-900"
            >
              Enterprise systems <br />
              <span className="text-gray-300 italic font-normal italic">at scale.</span>
            </motion.h2>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-4 border-l border-gray-100 pl-8 pb-4"
          >
            <p className="text-lg text-gray-500 leading-relaxed font-light max-w-sm">
              We integrate strategy and execution to help organizations modernize, 
              deploy responsible AI, and achieve measurable outcomes.
            </p>
          </motion.div>
        </div>

        {/* ================= SERVICE GRID (Blueprint Style) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-gray-200">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="
                group
                relative
                pt-16 pb-24 px-10
                border-b md:border-r border-gray-200
                last:border-r-0
                transition-all
                duration-700
                hover:bg-gray-50/30
              "
            >
              {/* Top Accent Line - Animates on Hover */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-16">
                    <span className="text-[11px] font-mono text-gray-400 group-hover:text-black transition-colors">
                      [{service.number}]
                    </span>
                    <div className="w-2 h-2 rounded-full border border-gray-200 group-hover:bg-black group-hover:border-black transition-all duration-500" />
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-light mb-6 tracking-tight text-gray-900 group-hover:translate-x-1 transition-transform duration-500">
                    {service.title}
                  </h3>

                  <p className="text-[15px] leading-relaxed text-gray-500 group-hover:text-gray-800 transition-colors">
                    {service.description}
                  </p>
                </div>

                <div className="mt-16 flex items-center justify-between">
                    <div className="overflow-hidden h-5 relative flex-1">
                        <motion.div 
                          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-black transition-all duration-500 transform translate-y-6 group-hover:translate-y-0"
                        >
                          System Roadmap <ArrowUpRight size={14} />
                        </motion.div>
                        <div className="absolute inset-0 flex items-center group-hover:opacity-0 transition-opacity duration-500">
                            <div className="w-12 h-[1px] bg-gray-200" />
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}