import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import BackgroundAnimated from "./BackgroundAnimated";

const services = [
  {
    title: "Strategic Advisory",
    description:
      "Align executive vision with AI transformation roadmaps designed for sustainable competitive advantage.",
  },
  {
    title: "Enterprise AI Delivery",
    description:
      "Design, architect, and deploy production-grade AI systems embedded directly into core operations.",
  },
  {
    title: "Intelligent Automation",
    description:
      "Build scalable automation infrastructures that streamline workflows and unlock operational efficiency.",
  },
  {
    title: "Performance & Optimization",
    description:
      "Continuously refine systems through analytics, governance, and measurable performance frameworks.",
  },
];

export default function EnterpriseFeatureSection() {
  return (
  <section className="relative w-full bg-white py-28 md:py-36 overflow-hidden">
  <BackgroundAnimated />

  <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-10">

        {/* ================= HEADER ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24 items-end">
          
          <div>
            <p className="text-xs tracking-[0.35em] uppercase text-gray-400 mb-6">
              Core Services
            </p>

            <h2 className="text-[2.8rem] md:text-[3.6rem] lg:text-[4.4rem]
                           leading-[1.05] font-light text-gray-900 tracking-tight">
              Enterprise capabilities
              <span className="block font-medium">
                designed for scale
              </span>
            </h2>

            <div className="h-[2px] w-24 bg-gray-900/20" />
          </div>

          <p className="text-[18px] text-gray-600 max-w-[480px] leading-relaxed">
            Attra.ai integrates strategy, technology, and execution to help
            organizations modernize operations, deploy responsible AI, and
            achieve measurable transformation outcomes.
          </p>
        </div>


        {/* ================= CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="
                group
                bg-[#F7F7F5]
                rounded-2xl
                p-10
                flex flex-col
                justify-between
                min-h-[380px]
                transition-all
                duration-300
                hover:bg-[#F0F0ED]
              "
            >
              <div>
                <h3 className="text-[22px] font-medium text-gray-900 mb-5 tracking-tight">
                  {service.title}
                </h3>

                <p className="text-[15px] leading-relaxed text-gray-600">
                  {service.description}
                </p>
              </div>

              <div className="flex justify-end mt-12">
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="text-gray-900 opacity-70 group-hover:opacity-100 transition"
                >
                  <ArrowRight size={20} strokeWidth={1.5} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
