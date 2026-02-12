import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { megaMenus, navLinks } from "./MegaMenuData";

interface Props {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: Props) {
  const [accordion, setAccordion] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed inset-0 z-40 bg-foreground lg:hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="pt-[var(--navbar-height)] px-6 pb-10 h-full overflow-y-auto"
      >
        <div className="flex flex-col gap-0 mt-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="border-b border-primary-foreground/10"
            >
              <button
                className="w-full flex items-center justify-between py-5 text-2xl font-semibold tracking-tight-custom text-primary-foreground"
                onClick={() => setAccordion(accordion === link ? null : link)}
              >
                {link}
                <ChevronDown
                  className={`w-5 h-5 text-primary-foreground/60 transition-transform duration-300 ${accordion === link ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {accordion === link && megaMenus[link] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 flex flex-col gap-6">
                      {megaMenus[link].categories.map((cat) => (
                        <div key={cat.heading}>
                          <h4 className="text-xs font-semibold text-primary-foreground/40 uppercase tracking-widest mb-3">
                            {cat.heading}
                          </h4>
                          <div className="flex flex-col gap-2">
                            {cat.links.map((item) => (
                              <a
                                key={item.title}
                                href={item.href}
                                className="text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors py-1"
                                onClick={onClose}
                              >
                                {item.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-10 flex flex-col gap-4"
          >
            <a
              href="#login"
              onClick={onClose}
              className="text-center text-primary-foreground text-base font-semibold py-3"
            >
              Log In
            </a>
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center justify-center w-full px-8 py-4 rounded-pill border border-primary-foreground text-primary-foreground text-base font-semibold hover:bg-primary-foreground hover:text-foreground transition-all"
            >
              Get Started
            </a>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
