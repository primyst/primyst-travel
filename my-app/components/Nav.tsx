"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { navLinks, WA } from "@/lib/elrom-data";

const wa = (msg: string) =>
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank");

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/">
            <img src="/logo.png" alt="Elrom Holidays" className="h-10 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href}
                className="text-sm px-4 py-2 rounded-full transition-colors"
                style={{
                  color: pathname === l.href ? "#C8102E" : "#1B3A6B",
                  background: pathname === l.href ? "rgba(200,16,46,0.07)" : "transparent",
                  fontWeight: pathname === l.href ? 600 : 400,
                }}>
                {l.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => wa("Hi Elrom Holidays, I'd like to book a trip.")}
            className="hidden md:flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:scale-105"
            style={{ background: "#C8102E" }}>
            <Phone size={14} /> Book a Trip
          </button>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "#1B3A6B" }}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            className="fixed inset-x-0 top-[65px] z-40 bg-white border-b border-gray-100 shadow-lg px-6 py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="text-sm font-medium py-3 border-b border-gray-50 last:border-0"
                style={{ color: pathname === l.href ? "#C8102E" : "#1B3A6B" }}>
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => { wa("Hi Elrom Holidays, I'd like to book a trip."); setMenuOpen(false); }}
              className="mt-3 text-white font-semibold py-3 rounded-full text-sm"
              style={{ background: "#C8102E" }}>
              Book a Trip
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
