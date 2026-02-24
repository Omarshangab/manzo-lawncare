"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../translations";

const navLinks = [
  { key: "services" as const,     href: "#services" },
  { key: "ourWork" as const,      href: "#our-work" },
  { key: "howItWorks" as const,   href: "#how-it-works" },
  { key: "testimonials" as const, href: "#testimonials" },
  { key: "contact" as const,      href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const TogglePill = () => (
    <button
      onClick={toggleLanguage}
      aria-label="Toggle language EN ES"
      className="flex items-center gap-1 rounded-full border border-white/30 px-3 py-1.5 text-xs font-semibold transition-all hover:border-white/60"
      style={{ fontFamily: "var(--font-raleway), sans-serif" }}
    >
      <span className={language === "en" ? "text-white" : "text-white/40"}>EN</span>
      <span className="text-white/30">|</span>
      <span className={language === "es" ? "text-white" : "text-white/40"}>ES</span>
    </button>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#1C1C1C]/80 backdrop-blur-xl shadow-lg"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1360px] items-center justify-between px-8 py-4 md:px-16 md:py-5">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <Image
              src="/icon.svg"
              alt="Manzo's Lawn Care Logo"
              width={40}
              height={40}
              className="h-10 w-10 shrink-0"
            />
            <span
              className="text-lg font-semibold text-white"
              style={{ fontFamily: "var(--font-raleway), sans-serif" }}
            >
              Manzo&apos;s Lawn Care
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                style={{ fontFamily: "var(--font-raleway), sans-serif" }}
              >
                {t.nav[link.key][language]}
              </a>
            ))}
            <TogglePill />
            <a
              href="tel:8037438679"
              className="cta-button rounded-full bg-green-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-green-dark"
              style={{ fontFamily: "var(--font-raleway), sans-serif" }}
            >
              {t.nav.cta[language]}
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
            aria-label="Toggle menu"
          >
            <div className="flex w-6 flex-col gap-1.5">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-full rounded-full bg-white"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-0.5 w-full rounded-full bg-white"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-full rounded-full bg-white"
                transition={{ duration: 0.2 }}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-60 flex flex-col bg-[#1C1C1C] md:hidden"
          >
            <div className="flex justify-end px-8 py-4 md:px-16 md:py-5">
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-10 items-center justify-center"
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 80, damping: 20, delay: i * 0.05 + 0.1 }}
                  className="text-2xl font-semibold text-white transition-colors hover:text-green-primary"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  {t.nav[link.key][language]}
                </motion.a>
              ))}
              <motion.a
                href="tel:8037438679"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.4 }}
                className="mt-4 rounded-full bg-green-primary px-8 py-3.5 text-lg font-semibold text-white transition-all hover:bg-green-dark"
                style={{ fontFamily: "var(--font-raleway), sans-serif" }}
              >
                {language === "en" ? "Call " : "Llama al "}{t.nav.cta[language]}
              </motion.a>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                <TogglePill />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-2 flex items-center gap-2 text-sm text-white/50"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {t.footer.location[language]}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
