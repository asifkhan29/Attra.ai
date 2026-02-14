import { useRef, useEffect, useCallback, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const PARTICLE_COUNT = 800; // Optimized for connectivity
const CONNECT_DISTANCE = 100;

const generateParticles = () => {
  const pts = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / PARTICLE_COUNT);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    pts.push({
      x: Math.sin(phi) * Math.cos(theta),
      y: Math.sin(phi) * Math.sin(theta),
      z: Math.cos(phi),
      size: 1 + Math.random() * 2,
      brightness: 0.2 + Math.random() * 0.8,
    });
  }
  return pts;
};

const particles = generateParticles();

const ParticleHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0, activeX: 0, activeY: 0 });
  const angle = useRef(0);
  const [radius, setRadius] = useState(350);

  // Parallax Scroll Effect for the whole section
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const sphereScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const updateDimensions = useCallback(() => {
    const w = window.innerWidth;
    if (w < 640) setRadius(180);
    else if (w < 1024) setRadius(280);
    else setRadius(380);
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.activeX = (e.clientX / window.innerWidth - 0.5) * 0.15;
      mouse.current.activeY = (e.clientY / window.innerHeight - 0.5) * 0.15;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [updateDimensions]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }); // Performance boost
    if (!ctx) return;

    let raf: number;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#050505"; // Deep obsidian background
      ctx.fillRect(0, 0, w, h);

      // Smooth Momentum Interpolation for Mouse
      mouse.current.x += (mouse.current.activeX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.activeY - mouse.current.y) * 0.05;

      angle.current += 0.0015;
      const cx = w / 2;
      const cy = h / 2;
      const tX = mouse.current.y;
      const tY = mouse.current.x;

      const projected = particles.map((p) => {
        // Rotation
        const x1 = p.x * Math.cos(angle.current) + p.z * Math.sin(angle.current);
        const z1 = -p.x * Math.sin(angle.current) + p.z * Math.cos(angle.current);
        const y1 = p.y;

        // Tilt
        const y2 = y1 * Math.cos(tX) - z1 * Math.sin(tX);
        const z2 = y1 * Math.sin(tX) + z1 * Math.cos(tX);
        const x2 = x1 * Math.cos(tY) + z2 * Math.sin(tY);
        const z3 = -x1 * Math.sin(tY) + z2 * Math.cos(tY);

        const scale = (z3 + 2) / 3;
        return {
          sx: cx + x2 * radius,
          sy: cy + y2 * radius,
          z: z3,
          alpha: scale * p.brightness,
          size: p.size * scale,
        };
      });

      // Optimized Drawing
      projected.forEach((pt, i) => {
        if (pt.z < -0.2) return; // Cull back-facing particles for clarity

        ctx.beginPath();
        ctx.arc(pt.sx, pt.sy, pt.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${pt.alpha * 0.8})`;
        ctx.fill();

        // Selective Connectivity (Neural Network look)
        if (i % 12 === 0) {
           projected.slice(i + 1, i + 15).forEach(neighbor => {
              const dx = pt.sx - neighbor.sx;
              const dy = pt.sy - neighbor.sy;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < CONNECT_DISTANCE) {
                ctx.beginPath();
                ctx.moveTo(pt.sx, pt.sy);
                ctx.lineTo(neighbor.sx, neighbor.sy);
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / CONNECT_DISTANCE)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
           });
        }
      });

      raf = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(raf);
  }, [radius]);

  return (
    <section ref={containerRef} className="relative w-full h-[120vh] bg-[#050505] overflow-hidden flex items-center justify-center">
      {/* Canvas Layer */}
      <motion.div style={{ scale: sphereScale }} className="absolute inset-0 opacity-70">
        <canvas ref={canvasRef} className="w-full h-full" />
      </motion.div>

      {/* Global Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,#050505_80%)]" />

      {/* Content Layer */}
      <motion.div style={{ y: contentY }} className="relative z-10 text-center px-6 max-w-4xl">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="inline-block text-[10px] tracking-[0.5em] uppercase text-white/30 mb-10 border border-white/10 px-4 py-2 rounded-full"
        >
          Executive Strategy Call
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter text-white leading-[1.1] mb-8"
        >
          Architecting systems for <br />
          <span className="italic font-normal text-white/40">exponential scale.</span>
        </motion.h2 >

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto mb-12"
        >
          Speak directly with our technical partners to explore the neural infrastructure 
          and AI performance systems your organization requires.
        </motion.p>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative inline-flex items-center justify-center px-12 py-5 bg-white text-black text-[11px] font-bold uppercase tracking-[0.3em] rounded-[1px] group overflow-hidden"
        >
          <span className="relative z-10">Schedule Consultation</span>
          <div className="absolute inset-0 bg-gray-200 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default ParticleHero;