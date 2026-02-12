import { motion } from "framer-motion";

export default function BackgroundAnimated() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">

      {/* Very subtle radial depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.03),transparent_70%)]" />

      {/* Horizontal animated lines */}
      {[20, 40, 60, 80].map((top, i) => (
        <motion.div
          key={`h-${i}`}
          initial={{ x: "-40%" }}
          animate={{ x: "40%" }}
          transition={{
            duration: 26 + i * 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-0 h-px w-[180%] 
                     bg-gradient-to-r 
                     from-transparent 
                     via-gray-300/60 
                     to-transparent"
          style={{ top: `${top}%` }}
        />
      ))}

      {/* Vertical animated lines */}
      {[25, 50, 75].map((left, i) => (
        <motion.div
          key={`v-${i}`}
          initial={{ y: "-40%" }}
          animate={{ y: "40%" }}
          transition={{
            duration: 30 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 w-px h-[180%] 
                     bg-gradient-to-b 
                     from-transparent 
                     via-gray-300/60 
                     to-transparent"
          style={{ left: `${left}%` }}
        />
      ))}
    </div>
  );
}
