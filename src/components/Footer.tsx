import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Footer() {
  const [open, setOpen] = useState<string | null>(null);

  const sections = [
    {
      title: "Services",
      links: [
        "AI Strategy",
        "Automation Systems",
        "Digital Transformation",
        "Growth Optimization",
        "Enterprise Advisory",
      ],
    },
    {
      title: "Industries",
      links: [
        "Financial Services",
        "Healthcare",
        "Private Equity",
        "SaaS & Technology",
      ],
    },
    {
      title: "Insights",
      links: ["Case Studies", "Research", "Webinars", "Reports"],
    },
    {
      title: "Company",
      links: ["About", "Leadership", "Careers", "Contact"],
    },
    {
      title: "Follow",
      links: ["LinkedIn", "X", "YouTube"],
    },
  ];

  return (
    <footer className="bg-black text-white pt-24 pb-16">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        
        {/* ================= DESKTOP GRID ================= */}
        <div className="hidden lg:grid grid-cols-6 gap-16">
          
          <div className="col-span-2">
            <div className="text-2xl font-medium tracking-tight mb-6">
              Attra.ai
            </div>
            <p className="text-white/60 max-w-sm leading-relaxed">
              Transform complexity into strategic advantage through AI,
              automation, and enterprise intelligence.
            </p>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold mb-6">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ================= MOBILE ACCORDION ================= */}
        <div className="lg:hidden">
          {sections.map((section) => (
            <div key={section.title} className="border-t border-white/10">
              
              <button
                onClick={() =>
                  setOpen(open === section.title ? null : section.title)
                }
                className="w-full flex items-center justify-between py-5 text-left"
              >
                <span className="text-sm font-medium">
                  {section.title}
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    open === section.title ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {open === section.title && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden pb-5 space-y-4"
                  >
                    {section.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="block text-sm text-white/60 hover:text-white transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Brand Section (Mobile Style) */}
          <div className="border-t border-white/10 pt-12 text-center">
            <div className="text-xl font-medium tracking-tight">
              Attra.ai
            </div>
            <p className="mt-4 text-white/60">
              Transform complexity into strategic advantage
            </p>
          </div>
        </div>

        {/* ================= BOTTOM LEGAL ================= */}
        <div className="mt-20 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-white/50">
            © 2026 Attra.ai Consulting. All rights reserved.
          </p>

          <div className="flex gap-8 text-xs text-white/50">
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Security
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
