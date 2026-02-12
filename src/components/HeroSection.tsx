import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
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
const CARD_GAP = 28;
const SET_WIDTH = showcaseItems.length * (CARD_WIDTH + CARD_GAP);

export default function HeroSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number>();

  function CountUp({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.4,
      ease: [0.25, 0.46, 0.45, 0.94], // Squarespace easing
    });
    return controls.stop;
  }, [value]);

  return (
    <span>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}


  useEffect(() => {
    let last: number | null = null;
    const speed = 0.03; // Squarespace-like slow glide

    const tick = (time: number) => {
      if (!last) last = time;
      const delta = time - last;
      last = time;

      offsetRef.current += delta * speed;
      if (offsetRef.current >= SET_WIDTH) {
        offsetRef.current -= SET_WIDTH;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `
          translateX(-${offsetRef.current}px)
        `;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current!);
  }, []);

  const allItems = [...showcaseItems, ...showcaseItems, ...showcaseItems];

  return (
    <section className="relative bg-foreground overflow-hidden">
      {/* HERO VIDEO */}
      <div className="relative min-h-[120vh]">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-foreground/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/20 to-foreground/80" />
        </div>

        {/* HERO COPY */}
        <div className="relative z-10 flex h-screen flex-col items-center justify-center px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-5xl text-[3.8rem] sm:text-[4.8rem] lg:text-[5.6rem] font-light leading-[1.05] tracking-tight text-primary-foreground"
          >
            Strategy that makes growth real
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="mt-12"
          >
            <a
              href="#contact"
              className="inline-flex items-center px-12 py-4 bg-primary-foreground text-foreground text-xs font-semibold uppercase tracking-[0.2em] hover:opacity-90 transition"
            >
              Get Started
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-sm text-primary-foreground/70"
          >
            Trusted by global enterprises. No commitment required.
          </motion.p>
        </div>

        {/* CAROUSEL */}
        <div
          className="absolute bottom-0 left-0 right-0 z-20 translate-y-1/2"
          style={{ perspective: "1600px" }}
        >
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[22%] bg-gradient-to-r from-foreground to-transparent z-30" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[22%] bg-gradient-to-l from-foreground to-transparent z-30" />

          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex will-change-transform"
              style={{
                gap: `${CARD_GAP}px`,
                width: `${SET_WIDTH * 3}px`,
              }}
            >
              {allItems.map((item, i) => (
                <div
                  key={i}
                  className="flex-shrink-0"
                  style={{
                    width: CARD_WIDTH,
                    transform: "rotateY(-18deg) translateZ(0)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
                    <img
                      src={item.img}
                      alt={item.label}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <div className="absolute bottom-5 left-6 text-primary-foreground text-sm font-medium tracking-wide">
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <WelcomeSection/>

      {/* SPACER */}

      <div className="bg-foreground py-10">
  <div className="mx-auto max-w-[1400px] px-6">
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-14 text-center text-lg text-primary-foreground/50 italic"
    >
      Partnering with enterprises to design, build, and scale what’s next.
    </motion.p>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            delay: i * 0.12,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-center"
        >
          <div className="text-6xl lg:text-7xl font-light tracking-tight text-primary-foreground">
            <CountUp value={stat.value} suffix={stat.suffix} />
          </div>

          <div className="mt-3 text-sm tracking-wide text-primary-foreground/50">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</div>

    </section>
  );
}
