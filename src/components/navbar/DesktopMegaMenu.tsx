import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MegaMenuConfig } from "./MegaMenuData";
import exploreStrategy from "@/assets/explore-strategy.jpg";
import exploreEnterprise from "@/assets/explore-enterprise.jpg";
import exploreHealthcare from "@/assets/explore-healthcare.jpg";
import exploreInsights from "@/assets/explore-insights.jpg";

const imageMap: Record<string, string> = {
  "explore-strategy": exploreStrategy,
  "explore-enterprise": exploreEnterprise,
  "explore-healthcare": exploreHealthcare,
  "explore-insights": exploreInsights,
};

interface Props {
  config: MegaMenuConfig;
}

export default function DesktopMegaMenu({ config }: Props) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Get featured cards based on hovered link
  const featured = hoveredLink && config.linkFeatured?.[hoveredLink]
    ? { heading: config.featured.heading, cards: config.linkFeatured[hoveredLink].cards }
    : config.featured;

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="absolute top-full left-0 right-0 bg-foreground text-primary-foreground shadow-2xl z-50"
    >
      {/* Arrow notch */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 relative">
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-foreground rotate-45" />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-12 grid grid-cols-[1fr_1fr_1fr_320px] gap-10">
        {/* Category columns */}
        {config.categories.map((cat) => (
          <div key={cat.heading}>
            <h4 className="text-xs font-semibold tracking-widest text-primary-foreground/50 mb-5">
              {cat.heading}
            </h4>
            <ul className="space-y-3">
              {cat.links.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className={`text-sm transition-colors ${
                      hoveredLink === link.title
                        ? "text-primary-foreground"
                        : "text-primary-foreground/70 hover:text-primary-foreground"
                    }`}
                    onMouseEnter={() => setHoveredLink(link.title)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Featured / Explore panel */}
        <div>
          <h4 className="text-xs font-semibold tracking-widest text-primary-foreground/50 mb-5">
            {featured.heading}
          </h4>
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {featured.cards.map((card) => (
                <motion.a
                  key={card.title}
                  href="#"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="block bg-primary-foreground/10 rounded-lg overflow-hidden hover:bg-primary-foreground/15 transition-colors"
                >
                  {card.image && imageMap[card.image] && (
                    <div className="w-full h-28 overflow-hidden">
                      <img
                        src={imageMap[card.image]}
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="text-sm font-semibold">{card.title}</div>
                    <p className="text-xs text-primary-foreground/60 mt-1.5 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
