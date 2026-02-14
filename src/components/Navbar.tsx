import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import HamburgerIcon from "./navbar/HamburgerIcon";
import DesktopMegaMenu from "./navbar/DesktopMegaMenu";
import MobileMenu from "./navbar/MobileMenu";
import { megaMenus, navLinks } from "./navbar/MegaMenuData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Throttled scroll listener for performance
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 20) {
        if (!scrolled) setScrolled(true);
      } else {
        if (scrolled) setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrolled]);

  // Handle Body Scroll Lock
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const showSolidBg = scrolled || activeMenu || mobileOpen;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out ${
          showSolidBg 
            ? "bg-black shadow-[0_1px_0_rgba(255,255,255,0.05)] py-0" 
            : "bg-transparent py-2"
        }`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 flex items-center justify-between h-[80px]">
          
          {/* Logo - Precise Tracking */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-light tracking-tighter text-white z-[110]">
              Attra<span className="font-bold">.ai</span>
            </a>
          </div>

          {/* Desktop Navigation - Improved Centering & Spacing */}
          <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 h-full">
            <div className="flex items-center gap-10">
              {navLinks.map((link) => (
                <div
                  key={link}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveMenu(link)}
                >
                  <button
                    className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                      activeMenu === link ? "text-white" : "text-white/90 hover:text-white"
                    }`}
                  >
                    {link}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-500 ease-in-out ${
                      activeMenu === link ? "rotate-180 opacity-100" : "opacity-40"
                    }`} />
                  </button>
                  
                  {/* Subtle Underline Indicator */}
                  <AnimatePresence>
                    {activeMenu === link && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Action Group - Scaled for Enterprise UI */}
          <div className="hidden lg:flex items-center gap-8">
            <a
              href="#login"
              className="text-[11px] font-bold text-white/80 hover:text-white transition-colors uppercase tracking-[0.2em]"
            >
              Log In
            </a>
            <a
              href="#contact"
              className="relative inline-flex items-center px-8 py-3 bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em] rounded-[1px] group overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gray-200 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden z-[110] p-1 text-white"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>

        {/* Mega Menu - Integrated Entrance */}
        <AnimatePresence mode="wait">
          {activeMenu && megaMenus[activeMenu] && (
            <DesktopMegaMenu
              key={activeMenu}
              config={megaMenus[activeMenu]}
            />
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>

      {/* Backdrop Blur Overlay - Premium Glassmorphism */}
      <AnimatePresence>
        {activeMenu && !mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[40] hidden lg:block"
            onClick={() => setActiveMenu(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}