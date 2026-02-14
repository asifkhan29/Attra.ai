import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import BackgroundAnimated from "./BackgroundAnimated";

/* -------------------- DATA -------------------- */
const categories = [
  "AI Strategy", "LLM Integration", "Data Engineering", 
  "AI Governance", "Custom Models", "AI Training"
];

interface CardItem {
  image: string;
}

const categoryContent: Record<string, CardItem[]> = {
  "AI Strategy": [
    { image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1400" },
    { image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1400" },
    { image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400" },
    { image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1400" },
  ],
  "LLM Integration": [
    { image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1400" },
    { image: "https://images.unsplash.com/photo-1620712943543-bcc4638d9985?q=80&w=1400" },
    { image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1400" },
    { image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1400" },
  ],
  "Data Engineering": [
    { image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1400" },
    { image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1400" },
    { image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1400" },
    { image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1400" },
  ],
  "AI Governance": [
    { image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1400" },
    { image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=1400" },
    { image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1400" },
    { image: "https://images.unsplash.com/photo-1521791136364-758a4d31d949?q=80&w=1400" },
  ],
  "Custom Models": [
    { image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1400" },
    { image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1400" },
    { image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1400" },
    { image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1400" },
  ],
  "AI Training": [
    { image: "https://images.unsplash.com/photo-1524178232363-1fb28071457d?q=80&w=1400" },
    { image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400" },
    { image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400" },
    { image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1400" },
  ],
};
/* -------------------- FEATURE CARD -------------------- */
function FeatureCard({ item, isActive, isMobile }: { item: CardItem; isActive: boolean; isMobile: boolean }) {
  return (
    <motion.div
      animate={{ scale: isActive ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 100, damping: 25 }}
      className={`
        relative flex-shrink-0
        ${isMobile ? 'w-screen' : 'w-[60vw]'} 
        h-[50vh] md:h-[750px]
        bg-gray-100
        overflow-hidden
        /* BORDER RADIUS ADDED HERE: 1px */
        rounded-[5px] 
        shadow-xl
      `}
    >
      <img
        src={item.image}
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </motion.div>
  );
}

/* -------------------- CAROUSEL -------------------- */
function SnapCarousel({ items }: { items: CardItem[] }) {
  const [index, setIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [winWidth, setWinWidth] = useState(0);

  useEffect(() => {
    setWinWidth(window.innerWidth);
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = winWidth < 768;
  const cardWidthPx = isMobile ? winWidth : (winWidth * 60) / 100;
  const GAP = isMobile ? 0 : 20; 
  const offset = isMobile ? 0 : (winWidth - cardWidthPx) / 2;

  const extended = [items[items.length - 1], ...items, items[0]];

  useEffect(() => {
    if (index === extended.length - 1) {
      setTimeout(() => {
        setIsAnimating(true);
        setIndex(1);
        setTimeout(() => setIsAnimating(false), 50);
      }, 400);
    }
    if (index === 0) {
      setTimeout(() => {
        setIsAnimating(true);
        setIndex(extended.length - 2);
        setTimeout(() => setIsAnimating(false), 50);
      }, 400);
    }
  }, [index, extended.length]);

  return (
    <div className="relative w-full overflow-hidden py-4">
      <motion.div
        animate={{ x: offset - index * (cardWidthPx + GAP) }}
        transition={isAnimating ? { duration: 0 } : { type: "spring", stiffness: 80, damping: 22 }}
        className="flex"
        style={{ gap: `${GAP}px` }}
      >
        {extended.map((item, i) => (
          <FeatureCard key={i} item={item} isActive={i === index} isMobile={isMobile} />
        ))}
      </motion.div>

      <div className="flex justify-center gap-3 mt-8">
        {items.map((_, i) => (
          <div
            key={i}
            className={`h-[2px] transition-all duration-500 ${
              i === (index - 1 + items.length) % items.length ? "w-8 bg-black" : "w-4 bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* -------------------- MAIN SECTION -------------------- */
export default function GrowSection() {
  const [active, setActive] = useState("AI Strategy");

  return (
    <section className="relative py-16 bg-white overflow-hidden w-full">
      <BackgroundAnimated />
      
      <div className="relative w-full">
        <ScrollReveal>
          <div className="text-center px-6 mb-10">
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-gray-900">
              Our <span className="font-medium">Portfolio</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* HORIZONTAL SCROLLABLE CATEGORIES */}
        <ScrollReveal>
          <div className="w-full mb-10 overflow-hidden">
            <div className="flex overflow-x-auto no-scrollbar px-6 md:justify-center gap-2 pb-4 scroll-smooth">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`flex-shrink-0 px-6 py-2 rounded-[5px] text-xs font-semibold uppercase tracking-widest transition-all border ${
                    active === cat
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-400 border-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SnapCarousel items={categoryContent[active] || []} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}