"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";

/**
 * Shared site nav — same visual language across every page.
 * Static/always visible, switches from a transparent bar on a dark
 * hero to a frosted ink bar once scrolled, with a mobile menu that
 * exposes the full link set (not just Contact).
 */
export default function ScrollNav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setSolid(y > 80);
  });

  const navLinks = [
    { href: "/destinations", label: "Destinations" },
    { href: "/packages", label: "Journeys" },
    { href: "/events", label: "Events" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 transition-colors duration-500 md:px-10 ${
        solid
          ? "border-b border-[#181611]/10 bg-[#f4f1e9]/90 backdrop-blur-md"
          : "bg-[#181611]/10 backdrop-blur-sm"
      }`}
    >
      <Link
        href="/"
        className={`text-[14px] font-semibold tracking-tight transition-colors ${
          solid ? "text-[#181611]" : "text-[#181611] md:text-white"
        }`}
      >
        TRAVELQ
      </Link>

      {/* Desktop menu — always visible, consistent styling regardless of scroll */}
      <div
        className={`hidden items-center gap-8 text-[11px] font-medium uppercase tracking-[0.15em] transition-colors md:flex ${
          solid ? "text-[#181611]/65" : "text-white/80"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="transition-opacity hover:opacity-70"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/contact"
          className={`hidden rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] transition sm:inline-block ${
            solid
              ? "border-[#181611]/30 text-[#181611] hover:bg-[#181611] hover:text-[#f4f1e9]"
              : "border-white/40 text-white hover:bg-white hover:text-black"
          }`}
        >
          Contact
        </Link>

        {/* Mobile menu toggle — animated hamburger that morphs into an X */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          className={`flex h-9 w-9 items-center justify-center rounded-full transition md:hidden ${
            solid ? "text-[#181611]" : "text-white"
          }`}
        >
          <div className="relative flex h-3.5 w-4 flex-col justify-between">
            <motion.span
              className="h-[1.5px] w-full origin-center bg-current"
              animate={
                menuOpen
                  ? { rotate: 45, y: 6.5 }
                  : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="h-[1.5px] w-full bg-current"
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="h-[1.5px] w-full origin-center bg-current"
              animate={
                menuOpen
                  ? { rotate: -45, y: -6.5 }
                  : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu panel */}
      <motion.div
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 right-0 top-full overflow-hidden border-b border-[#181611]/10 bg-[#f4f1e9] md:hidden"
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-[13px] font-medium uppercase tracking-[0.1em] text-[#181611]/75"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 w-fit rounded-full bg-[#181611] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#f4f1e9]"
          >
            Contact
          </Link>
        </div>
      </motion.div>
    </nav>
  );
}
