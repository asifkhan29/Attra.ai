import { useRef, useEffect, useCallback, useState } from "react";
import { motion } from "framer-motion";

const PARTICLE_COUNT = 1200;

// Pre-generate sphere points
const generateParticles = () => {
  const particles: { x: number; y: number; z: number; size: number }[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Fibonacci sphere for even distribution
    const phi = Math.acos(1 - (2 * (i + 0.5)) / PARTICLE_COUNT);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const x = Math.sin(phi) * Math.cos(theta);
    const y = Math.sin(phi) * Math.sin(theta);
    const z = Math.cos(phi);
    const size = 0.8 + Math.random() * 1.2;
    particles.push({ x, y, z, size });
  }
  return particles;
};

const particles = generateParticles();

const ParticleHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const angleRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [radius, setRadius] = useState(350);

  const updateRadius = useCallback(() => {
    const w = window.innerWidth;
    if (w < 640) setRadius(210);
    else if (w < 1024) setRadius(275);
    else setRadius(350);
  }, []);

  useEffect(() => {
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, [updateRadius]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 0.08,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 0.08,
      };
    };
    window.addEventListener("mousemove", handleMouse);

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      angleRef.current += (Math.PI * 2) / (60 * 60); // 60s full rotation
      const angle = angleRef.current;
      const tiltX = mouseRef.current.y;
      const tiltY = mouseRef.current.x;
      const cx = w / 2;
      const cy = h / 2;
      const r = radius;

      // Sort by z for depth
      const projected = particles.map((p) => {
        // Rotate Y axis (main spin)
        const x1 = p.x * Math.cos(angle) + p.z * Math.sin(angle);
        const z1 = -p.x * Math.sin(angle) + p.z * Math.cos(angle);
        const y1 = p.y;

        // Mouse tilt X
        const y2 = y1 * Math.cos(tiltX) - z1 * Math.sin(tiltX);
        const z2 = y1 * Math.sin(tiltX) + z1 * Math.cos(tiltX);

        // Mouse tilt Y
        const x2 = x1 * Math.cos(tiltY) + z2 * Math.sin(tiltY);
        const z3 = -x1 * Math.sin(tiltY) + z2 * Math.cos(tiltY);

        const scale = (z3 + 1.5) / 2.5; // depth factor
        return {
          sx: cx + x2 * r,
          sy: cy + y2 * r,
          z: z3,
          size: p.size * (0.5 + scale * 0.7),
          alpha: 0.15 + scale * 0.7,
        };
      });

      projected.sort((a, b) => a.z - b.z);

      for (const pt of projected) {
        ctx.beginPath();
        ctx.arc(pt.sx, pt.sy, pt.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${pt.alpha})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [radius]);

  return (
  <section className="particle-hero">
    {/* Canvas */}
    <canvas ref={canvasRef} className="particle-canvas" />

    {/* Radial Fade */}
    <div className="particle-fade" />

    {/* Content */}
    <div className="particle-content">
     <motion.h2
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="particle-heading text-white"
>
  Schedule a strategy call
  <br />
  and unlock scalable growth
</motion.h2>

<motion.p
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.15 }}
  className="particle-subtext text-white/70"
>
  Speak directly with our consulting team to explore AI, automation, and
  performance systems tailored to your organization.
</motion.p>

      <motion.a
        href="#"
        whileHover={{ scale: 1.04 }}
        className="particle-button"
      >
        GET STARTED
      </motion.a>
    </div>
  </section>
);

};

export default ParticleHero;
