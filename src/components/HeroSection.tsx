import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useTransform, useScroll, useSpring } from "framer-motion";
import heroVideo from "@/assets/hero-video.mp4";
import showcase1 from "@/assets/showcase-1.jpg";
import showcase2 from "@/assets/showcase-2.jpg";
import showcase3 from "@/assets/showcase-3.jpg";
import showcase4 from "@/assets/showcase-4.jpg";
import showcase5 from "@/assets/showcase-5.jpg";
import { WelcomeSection } from "./WelcomeSection";

const showcaseItems = [
  { img: showcase1, label: "Enterprise Consulting" },
  { img: showcase2, label: "AI Strategy & Ops" },
  { img: showcase3, label: "Digital Transformation" },
  { img: showcase4, label: "Product Advisory" },
  { img: showcase5, label: "Global Delivery" },
];

const stats = [
  { value: 180, suffix: "+", label: "Enterprise Engagements" },
  { value: 1200, suffix: "+", label: "Consulting Projects Delivered" },
  { value: 32, suffix: "", label: "Countries Served" },
];

const CARD_WIDTH = 420;
const CARD_GAP = 32; // Increased gap for breathability
const SET_WIDTH = showcaseItems.length * (CARD_WIDTH + CARD_GAP);

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1], // Custom ultra-smooth ease
    });
    return controls.stop;
  }, [value]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function HeroSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number>();

  // Parallax Scroll Effect for Video
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 1000], [0, 300]);
  const videoScale = useTransform(scrollY, [0, 1000], [1, 1.15]);

  useEffect(() => {
    let last: number | null = null;
    const speed = 0.04; // Slightly faster but still elegant

    const tick = (time: number) => {
      if (!last) last = time;
      const delta = time - last;
      last = time;

      offsetRef.current += delta * speed;
      if (offsetRef.current >= SET_WIDTH) {
        offsetRef.current -= SET_WIDTH;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current!);
  }, []);

  const allItems = [...showcaseItems, ...showcaseItems, ...showcaseItems];

  return (
    <section className="relative bg-[#0a0a0a] overflow-hidden">
      {/* HERO VIDEO SECTION */}
      <div className="relative min-h-[110vh] flex items-center justify-center">
        <motion.div 
            style={{ y: videoY, scale: videoScale }}
            className="absolute inset-0 z-0 overflow-hidden"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover opacity-70 transition-opacity duration-1000"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          {/* Multi-layered Overlays for depth */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a0a0a]" />
        </motion.div>

        {/* HERO COPY */}
        <div className="relative z-10 w-full max-w-7xl px-6 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
             <span className="inline-block text-[10px] tracking-[0.5em] uppercase text-white/40 mb-8 border-l border-white/20 pl-4">
                Attra.ai / Collective Intelligence
             </span>
            <h1 className="text-[3.5rem] sm:text-[5rem] lg:text-[7rem] font-extralight leading-[0.9] tracking-tighter text-white">
              Strategy that makes <br />
              <span className="italic font-normal text-white/80">growth real.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mt-14 flex flex-col sm:flex-row items-center gap-8 lg:justify-start"
          >
            <a
              href="#contact"
              className="group relative overflow-hidden px-14 py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] transition-all hover:px-16"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gray-200 translate-y-full transition-transform group-hover:translate-y-0" />
            </a>
            <p className="max-w-[280px] text-left text-[11px] leading-relaxed text-white/40 uppercase tracking-widest">
                Partnering with the world's most ambitious leaders.
            </p>
          </motion.div>
        </div>

        {/* 3D INFINITE CAROUSEL */}
        <div
          className="absolute bottom-[-150px] left-0 right-0 z-20"
          style={{ perspective: "2000px" }}
        >
          {/* Soft mask for the carousel */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[25%] bg-gradient-to-r from-[#0a0a0a] to-transparent z-30" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[25%] bg-gradient-to-l from-[#0a0a0a] to-transparent z-30" />

          <div className="overflow-visible">
            <div
              ref={trackRef}
              className="flex will-change-transform"
              style={{
                gap: `${CARD_GAP}px`,
                width: `${SET_WIDTH * 3}px`,
              }}
            >
              {allItems.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex-shrink-0"
                  style={{
                    width: CARD_WIDTH,
                    transform: "rotateY(-22deg) rotateX(5deg)", // Sharper angle for premium feel
                    transformStyle: "preserve-3d",
                  }}
                  whileHover={{ y: -20, rotateY: 0, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
                    <img
                      src={item.img}
                      alt={item.label}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute bottom-6 left-8 text-white text-[11px] font-semibold tracking-[0.2em] uppercase">
                      {item.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-40">
        <WelcomeSection />
      </div>

      {/* STATS SECTION REFINED */}
      <div className="bg-[#0a0a0a] pt-20 pb-40">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="h-[1px] w-full bg-white/10 mb-24" />
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-24 relative">
             {/* Invisible separator lines for desktop */}
            <div className="hidden sm:block absolute left-1/3 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            <div className="hidden sm:block absolute left-2/3 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

           {stats.map((stat, i) => (
  <motion.div
    key={stat.label}
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
    className="relative flex flex-col justify-between pt-10 pb-12 group"
  >
    {/* The Architectural Line Accent */}
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/20 via-white/5 to-transparent overflow-hidden">
        <motion.div 
            initial={{ x: "-100%" }}
            whileInView={{ x: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: i * 0.2, ease: "easeInOut" }}
            className="w-1/3 h-full bg-white/40"
        />
    </div>

    {/* Technical Metadata (The "Small Detail") */}
    <div className="flex items-center gap-3 mb-8">
        <span className="text-[9px] font-mono text-white/20 tracking-widest uppercase">
            Data_Point.0{i + 1}
        </span>
        <div className="h-[1px] w-4 bg-white/10" />
    </div>

    {/* The Main Value */}
    <div className="relative">
        <div className="text-7xl lg:text-8xl font-extralight tracking-tighter text-white flex items-baseline gap-1 group-hover:translate-x-2 transition-transform duration-700">
            <CountUp value={stat.value} suffix={stat.suffix} />
        </div>
        
        {/* Subtle Background Ghost Number - Squarespace-style depth */}
        <span className="absolute -top-4 -left-4 text-9xl font-bold text-white/[0.02] pointer-events-none select-none">
            {stat.value}
        </span>
    </div>

    {/* The Label - Shifted to be a technical description */}
    <div className="mt-8 max-w-[180px]">
        <div className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase leading-relaxed group-hover:text-white/60 transition-colors duration-500">
            {stat.label}
        </div>
    </div>

    {/* Bottom Corner Accent */}
    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="w-2 h-2 border-r border-b border-white/20" />
    </div>
  </motion.div>
))}
          </div>
        </div>
      </div>
    </section>
  );
}