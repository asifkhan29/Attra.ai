import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import HamburgerIcon from "./navbar/HamburgerIcon";
import DesktopMegaMenu from "./navbar/DesktopMegaMenu";
import MobileMenu from "./navbar/MobileMenu";
import { megaMenus, navLinks } from "./navbar/MegaMenuData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const showSolidBg = scrolled || activeMenu || mobileOpen;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showSolidBg ? "bg-foreground shadow-sm" : "bg-transparent"
        }`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 flex items-center justify-between h-[var(--navbar-height)]">
          {/* Logo */}
          <a href="/" className="text-xl font-bold tracking-tighter-custom z-50 text-primary-foreground">
            Attra.ai
          </a>

          {/* Desktop center links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link}
                className="flex items-center gap-1 text-sm font-semibold text-primary-foreground/80 hover:text-primary-foreground transition-colors uppercase tracking-wide"
                onMouseEnter={() => setActiveMenu(link)}
              >
                {link}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === link ? "rotate-180" : ""}`} />
              </button>
            ))}
          </div>

          {/* Desktop right: LOG IN + GET STARTED */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="#login"
              className="text-sm font-semibold text-primary-foreground/80 hover:text-primary-foreground transition-colors uppercase tracking-wide"
            >
              Log In
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-2.5 rounded-pill border border-primary-foreground text-primary-foreground text-sm font-semibold hover:bg-primary-foreground hover:text-foreground transition-all"
            >
              Get Started
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden z-50 p-1"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>

        {/* Desktop Mega Menu */}
        <AnimatePresence>
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

      {/* Desktop overlay */}
      <AnimatePresence>
        {activeMenu && !mobileOpen && (
          <div
            className="fixed inset-0 bg-foreground/5 z-40 hidden lg:block"
            onClick={() => setActiveMenu(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
