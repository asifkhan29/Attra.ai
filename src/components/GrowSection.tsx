import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import BackgroundAnimated from "./BackgroundAnimated";

/* -------------------- DATA -------------------- */

const categories = [
  "AI Strategy",
  "LLM Integration",
  "Data Engineering",
  "AI Governance",
  "Custom Models",
  "AI Training",
];

interface CardItem {
  title: string;
  description: string;
  image: string; // ✅ REQUIRED
  subtitle?: string;
  tagline?: string;
  footer?: string;
}

const categoryContent: Record<string, CardItem[]> = {
  "AI Strategy": [
  {
    title: "Enterprise AI Roadmapping",
    subtitle: "STRATEGY | ALIGNMENT | EXECUTION",
    description:
      "Design a phased AI transformation roadmap aligned with corporate objectives, risk appetite, and long-term value creation.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400",
    footer: "Ideal for: Executive Leadership · Strategy Offices · Boards",
    tagline: "STRATEGIC ADVISORY"
  },
  {
    title: "Value & ROI Architecture",
    subtitle: "KPIs | PERFORMANCE | OUTCOMES",
    description:
      "Define measurable impact frameworks that connect AI investment to financial and operational performance.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400",
    footer: "Ideal for: CFOs · Data Leaders · Transformation Teams",
    tagline: "VALUE CREATION"
  },
  {
    title: "Enterprise Scaling Frameworks",
    subtitle: "OPERATING MODELS | GOVERNANCE | MATURITY",
    description:
      "Build scalable AI operating models with governance, talent, and infrastructure aligned for sustainable growth.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400",
    footer: "Ideal for: CIOs · CTOs · Enterprise Architects",
    tagline: "SCALABLE SYSTEMS"
  }
]
,
  "LLM Integration": [
    {
      title: "Deploy LLMs at scale",
      subtitle: "PRODUCTION | RELIABILITY | SECURITY",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400",

      description: "Production-grade LLM deployments with reliability and security.",
      footer: "Great for: DevOps · ML Engineers · Security Teams",
      tagline: "LLM INFRASTRUCTURE"
    },
    {
      title: "Build intelligent agents",
      subtitle: "AUTOMATION | WORKFLOWS | DECISION SUPPORT",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400",

      description: "Autonomous agents for workflow automation and decision support.",
      footer: "Great for: Operations · Customer Service · HR",
      tagline: "AI AGENTS"
    },
    {
      title: "Optimize inference costs",
      subtitle: "COST OPTIMIZATION | EFFICIENCY | CACHING",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400",

      description: "Reduce spend with efficient serving and caching strategies.",
      footer: "Great for: Finance Teams · Startup Founders · CTOs",
      tagline: "COST MANAGEMENT"
    },
  ],
  "Data Engineering": [
    {
      title: "Build data pipelines",
      subtitle: "PIPELINES | REAL-TIME | AI-READY",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400",

      description: "Scalable pipelines feeding real-time, AI-ready data.",
      footer: "Great for: Data Engineers · Analytics Teams · ML Engineers",
      tagline: "DATA INFRASTRUCTURE"
    },
    {
      title: "Govern your data",
      subtitle: "QUALITY | LINEAGE | COMPLIANCE",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400",

      description: "Quality, lineage, and compliance baked into your stack.",
      footer: "Great for: Compliance Officers · Data Stewards · Legal",
      tagline: "DATA GOVERNANCE"
    },
    {
      title: "Unify data sources",
      subtitle: "INTEGRATION | SINGLE SOURCE | ENTERPRISE",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400",

      description: "One trusted source of truth across the enterprise.",
      footer: "Great for: Enterprise Architects · Data Teams · IT",
      tagline: "DATA UNIFICATION"
    },
  ],
  "AI Governance": [
    {
      title: "Responsible AI",
      subtitle: "BIAS DETECTION | TRANSPARENCY | ETHICS",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400",

      description: "Bias detection, transparency, and ethical AI frameworks.",
      footer: "Great for: Ethics Committees · Compliance · Legal",
      tagline: "ETHICAL AI"
    },
    {
      title: "Regulatory readiness",
      subtitle: "EU AI ACT | NIST | GLOBAL STANDARDS",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400",

      description: "Alignment with EU AI Act, NIST, and global standards.",
      footer: "Great for: Legal Teams · Regulators · Public Sector",
      tagline: "COMPLIANCE FRAMEWORKS"
    },
    {
      title: "Model risk monitoring",
      subtitle: "DRIFT | RISK | PERFORMANCE",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400",

      description: "Continuous drift, risk, and performance monitoring.",
      footer: "Great for: Risk Managers · Audit Teams · CTOs",
      tagline: "RISK MANAGEMENT"
    },
  ],
  "Custom Models": [
    {
      title: "Domain-specific models",
      subtitle: "PROPRIETARY DATA | FINE-TUNING | DOMAIN EXPERTISE",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400",

      description: "Purpose-built models trained on proprietary data.",
      footer: "Great for: Research Teams · Industry Experts · Data Scientists",
      tagline: "CUSTOM MODELS"
    },
    {
      title: "Edge AI",
      subtitle: "LOW-LATENCY | ON-DEVICE | OFFLINE",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400",

      description: "Low-latency AI for on-device and offline use cases.",
      footer: "Great for: IoT Developers · Mobile Apps · Field Operations",
      tagline: "EDGE COMPUTING"
    },
    {
      title: "Multimodal systems",
      subtitle: "TEXT | IMAGE | AUDIO | VIDEO",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400",

      description: "Text, image, audio, and video intelligence combined.",
      footer: "Great for: Media Companies · Research Labs · Innovators",
      tagline: "MULTIMODAL AI"
    },
  ],
  "AI Training": [
    {
      title: "Team enablement",
      subtitle: "WORKSHOPS | HANDS-ON | SKILLS",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400",

      description: "Hands-on workshops tailored to your AI maturity.",
      footer: "Great for: HR · Learning & Development · Team Leads",
      tagline: "AI WORKSHOPS"
    },
    {
      title: "Executive literacy",
      subtitle: "STRATEGIC BRIEFINGS | INVESTMENT DECISIONS",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400",

      description: "Strategic briefings for informed AI investment decisions.",
      footer: "Great for: Executives · Board Members · Investors",
      tagline: "EXECUTIVE TRAINING"
    },
    {
      title: "AI-first culture",
      subtitle: "CHANGE MANAGEMENT | ADOPTION | TRANSFORMATION",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400",

      description: "Change management for lasting AI adoption.",
      footer: "Great for: Change Managers · Culture Teams · Leadership",
      tagline: "CULTURE TRANSFORMATION"
    },
  ],
};
function FeatureCard({ item, isActive }: { item: CardItem; isActive: boolean }) {
  return (
    <motion.div
      animate={{ scale: isActive ? 1 : 0.96 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="
        relative flex-shrink-0
        w-full md:w-[520px]
        h-[640px] md:h-[560px]           /* slightly shorter on desktop – more Squarespace */
        bg-white
        overflow-hidden
        rounded-xl                     /* softer corners */
        shadow-[0_8px_30px_rgb(0,0,0,0.04)] /* subtle shadow, Squarespace-like */
      "
    >
      {/* Image – full bleed, but with a very light overlay for readability */}
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />

      <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between text-white">
        <div>
          {item.tagline && (
            <p className="text-xs tracking-[0.2em] uppercase mb-3 opacity-80">
              {item.tagline}
            </p>
          )}
          <h3 className="font-serif-display text-3xl md:text-4xl mb-3 leading-tight">
            {item.title}
          </h3>
          <p className="text-sm md:text-base max-w-md opacity-90">
            {item.description}
          </p>
        </div>

        {isActive && (
          <button className="
            self-start
            bg-white text-gray-900 
            px-6 py-3 rounded-full 
            text-sm font-medium 
            shadow-md hover:shadow-lg 
            transition-all duration-200
          ">
            Learn More
          </button>
        )}
      </div>
    </motion.div>
  );
}



/* -------------------- CARD -------------------- */


/* -------------------- CAROUSEL -------------------- */
function SnapCarousel({ items }: { items: CardItem[] }) {
  const [index, setIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Measure container and viewport
  useEffect(() => {
    const updateDimensions = () => {
      if (carouselRef.current) {
        setContainerWidth(carouselRef.current.clientWidth);
      }
      setIsMobile(window.innerWidth < 768);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Constants
  const CARD_WIDTH = isMobile ? containerWidth : 520;
  const GAP = isMobile ? 0 : 48;

  // Centering offset for desktop – places the active card in the middle
  const desktopOffset = !isMobile && containerWidth > 0
    ? (containerWidth - CARD_WIDTH) / 2
    : 0;

  const extended = [items[items.length - 1], ...items, items[0]];

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((prev) => prev + 1);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((prev) => prev - 1);
  };

  // Infinite loop handling
  useEffect(() => {
    if (index === extended.length - 1) {
      setTimeout(() => setIndex(1), 400);
    }
    if (index === 0) {
      setTimeout(() => setIndex(extended.length - 2), 400);
    }
    const timeout = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timeout);
  }, [index, extended.length]);

  // Mobile auto‑scroll
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(next, 3500);
    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <div ref={carouselRef} className="relative w-full overflow-hidden py-16 bg-white">
       <BackgroundAnimated/>
      <motion.div
        animate={{
          x: isMobile
            ? -(index * (CARD_WIDTH + GAP))
            : desktopOffset - index * (CARD_WIDTH + GAP),
        }}
        transition={{ type: "spring", stiffness: 90, damping: 20 }}
        className={`flex ${isMobile ? 'gap-0' : 'gap-12'} pl-0`}
      >
        {extended.map((item, i) => (
          <FeatureCard key={i} item={item} isActive={i === index} />
        ))}
      </motion.div>

      {/* Progress indicators – thin lines, Squarespace style */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, i) => (
          <div
            key={i}
            className={`h-[2px] transition-all duration-300 ${
              i === (index - 1 + items.length) % items.length
                ? "w-10 bg-gray-900"
                : "w-6 bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Optional subtle arrows (like Squarespace) – uncomment if desired
      {!isMobile && (
        <>
          <button
            onClick={prev}
            className="absolute left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow-md flex items-center justify-center hover:bg-white transition"
          >
            ←
          </button>
          <button
            onClick={next}
            className="absolute right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow-md flex items-center justify-center hover:bg-white transition"
          >
            →
          </button>
        </>
      )}
      */}
    </div>
  );
}
/* -------------------- SECTION -------------------- */

export default function GrowSection() {
  const [active, setActive] = useState("AI Strategy");

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      <BackgroundAnimated/>
      
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.03),transparent_60%)] pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px] px-6">

        {/* ---------------- HEADER ---------------- */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            
            <p className="text-xs tracking-[0.35em] uppercase text-gray-400 mb-6">
              Our Capabilities
            </p>

            <h2 className="text-[2.8rem] md:text-[3.5rem] lg:text-[4.2rem] font-light tracking-tight text-gray-900 leading-[1.1]">
              Turn strategy 
              <span className="block font-medium">
                into measurable growth
              </span>
            </h2>

            <div className="h-[2px] w-24 bg-gray-900/20 mx-auto mt-8 mb-8" />

            
          </div>
        </ScrollReveal>

        {/* ---------------- CATEGORY TABS ---------------- */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`
                  px-6 py-3 rounded-full text-sm tracking-wide transition-all duration-300
                  border
                  ${
                    active === cat
                      ? "bg-gray-900 text-white border-gray-900 shadow-md"
                      : "bg-white text-gray-700 border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* ---------------- CAROUSEL ---------------- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <SnapCarousel items={categoryContent[active]} />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
