import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import BackgroundAnimated from "./BackgroundAnimated";

/* -------------------- DATA (Unchanged) -------------------- */
const categories = ["AI Strategy", "LLM Integration", "Data Engineering", "AI Governance", "Custom Models", "AI Training"];

const categoryContent = {
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

/* -------------------- FEATURE CARD (Upgraded) -------------------- */
function FeatureCard({ item, isActive, isMobile }: { item: any; isActive: boolean; isMobile: boolean }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: cardRef });
  
  // Parallax: Image moves slightly opposite to scroll
  const yRange = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={cardRef}
      animate={{ 
        scale: isActive ? 1 : 0.96,
        filter: isActive ? "grayscale(0%)" : "grayscale(40%)" 
      }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
      className={`
        relative flex-shrink-0
        ${isMobile ? 'w-screen' : 'w-[60vw]'} 
        h-[55vh] md:h-[750px]
        bg-black
        overflow-hidden
        rounded-[1px] 
        group
      `}
    >
      {/* Parallax Image Container */}
      <motion.div style={{ y: yRange }} className="absolute inset-0 h-[120%] w-full">
        <img
          src={item.image}
          alt="Banner"
          className="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-105"
        />
      </motion.div>

      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
      
      {/* Decorative Border Glow on Active */}
      <AnimatePresence>
        {isActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 border border-white/10 pointer-events-none" 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* -------------------- CAROUSEL (Upgraded Auto-Play) -------------------- */
function SnapCarousel({ items }: { items: any[] }) {
  const [index, setIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [winWidth, setWinWidth] = useState(0);

  useEffect(() => {
    setWinWidth(window.innerWidth);
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smoother Auto-Play (5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) setIndex((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [items, isAnimating]);

  const isMobile = winWidth < 768;
  const cardWidthPx = isMobile ? winWidth : (winWidth * 60) / 100;
  const GAP = isMobile ? 0 : 24; 
  const offset = isMobile ? 0 : (winWidth - cardWidthPx) / 2;

  const extended = [items[items.length - 1], ...items, items[0]];

  useEffect(() => {
    if (index === extended.length - 1) {
      setTimeout(() => {
        setIsAnimating(true);
        setIndex(1);
        setTimeout(() => setIsAnimating(false), 50);
      }, 600);
    }
    if (index === 0) {
      setTimeout(() => {
        setIsAnimating(true);
        setIndex(extended.length - 2);
        setTimeout(() => setIsAnimating(false), 50);
      }, 600);
    }
  }, [index, extended.length]);

  return (
    <div className="relative w-full overflow-hidden py-4">
      <motion.div
        animate={{ x: offset - index * (cardWidthPx + GAP) }}
        transition={isAnimating ? { duration: 0 } : { type: "spring", stiffness: 40, damping: 14 }}
        className="flex"
        style={{ gap: `${GAP}px` }}
      >
        {extended.map((item, i) => (
          <FeatureCard key={i} item={item} isActive={i === index} isMobile={isMobile} />
        ))}
      </motion.div>

      {/* Technical Progress Indicators */}
      <div className="flex justify-center items-center gap-6 mt-12">
        <span className="text-[10px] font-mono text-gray-400">0{ (index - 1 + items.length) % items.length + 1 }</span>
        <div className="flex gap-3">
          {items.map((_, i) => (
            <motion.div
              key={i}
              onClick={() => setIndex(i + 1)}
              className="cursor-pointer relative h-1 w-12 bg-gray-100 overflow-hidden"
            >
              {i === (index - 1 + items.length) % items.length && (
                <motion.div 
                  layoutId="progress-bar"
                  className="absolute inset-0 bg-black origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 5, ease: "linear" }}
                />
              )}
            </motion.div>
          ))}
        </div>
        <span className="text-[10px] font-mono text-gray-400">0{items.length}</span>
      </div>
    </div>
  );
}

/* -------------------- MAIN SECTION (Upgraded Header) -------------------- */
export default function GrowSection() {
  const [active, setActive] = useState("AI Strategy");

  return (
    <section className="relative py-24 bg-white overflow-hidden w-full">
      <BackgroundAnimated />
      
      <div className="relative z-10 w-full">
        <ScrollReveal>
          <div className="max-w-[1400px] mx-auto px-6 mb-20 flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="max-w-2xl">
              <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-6 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-gray-200" /> Attra.ai / Capabilities
              </p>
              <h2 className="text-[3rem] md:text-[5rem] font-light tracking-tighter text-gray-900 leading-[0.95]">
                Turn vision into <br />
                <span className="italic font-normal text-gray-400 italic">measurable scale.</span>
              </h2>
            </div>
            <div className="h-[1px] flex-1 bg-gray-100 hidden md:block mb-4 mx-10" />
            <button className="disable text-[10px] tracking-[0.2em] uppercase font-bold border-b border-black pb-1 hover:text-gray-400 hover:border-gray-200 transition-all">
              Attra.ai
            </button>
          </div>
        </ScrollReveal>

        {/* REFINED HORIZONTAL CATEGORIES */}
        <ScrollReveal>
          <div className="w-full mb-12 overflow-hidden">
            <div className="flex overflow-x-auto no-scrollbar px-6 md:justify-center gap-3 pb-4 scroll-smooth">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`flex-shrink-0 px-8 py-3 rounded-[1px] text-[10px] font-bold uppercase tracking-[0.2em] transition-all border ${
                    active === cat
                      ? "bg-black text-white border-black shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
                      : "bg-white text-gray-400 border-gray-100 hover:border-gray-900 hover:text-gray-900"
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <SnapCarousel items={categoryContent[active as keyof typeof categoryContent] || []} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}