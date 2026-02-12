import { motion } from "framer-motion";

export default function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="w-7 h-5 relative flex flex-col justify-between cursor-pointer">
      <motion.span
        className="block h-[1.5px] w-full bg-primary-foreground origin-center"
        animate={open ? { rotate: 45, y: 8.75 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      <motion.span
        className="block h-[1.5px] w-full bg-primary-foreground origin-center"
        animate={open ? { rotate: -45, y: -8.75 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </div>
  );
}
