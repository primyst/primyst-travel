"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Clock, MapPin, Check, Search, ChevronDown, Phone } from "lucide-react";
import Nav from "@/components/Nav";
import BookingModal from "@/components/BookingModal";
import { packages, WA } from "@/lib/elrom-data";
import type { Package } from "@/lib/elrom-data";

const wa = (msg: string) =>
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank");

const tags = ["All", "Most Popular", "Adventure", "Culture", "Nature & Beach", "Challenge", "Weekend Escape"];

function PackageCard({ pkg, onBook }: { pkg: Package; onBook: () => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500 group"
    >
      <div className="relative h-56 overflow-hidden">
        <img src={pkg.image} alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: "#C8102E" }}>{pkg.tag}</span>
          <span className="text-lg">{pkg.flag}</span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
          <Clock size={11} style={{ color: "#1B3A6B" }} />
          <span className="text-xs font-semibold" style={{ color: "#1B3A6B" }}>{pkg.duration}</span>
        </div>
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {pkg.destinations.map((d) => (
            <div key={d} className="flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-0.5">
              <MapPin size={9} className="text-white/80" />
              <span className="text-xs text-white/90">{d}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display font-bold text-xl mb-1.5" style={{ color: "#1B3A6B" }}>{pkg.title}</h3>
        <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-4">
          <Calendar size={11} /> {pkg.dates}
        </div>

        <div className="grid grid-cols-2 gap-1.5 mb-2">
          {(expanded ? pkg.includes : pkg.includes.slice(0, 6)).map((inc) => (
            <div key={inc} className="flex items-center gap-1.5 text-xs text-gray-500">
              <Check size={10} className="shrink-0" style={{ color: "#C8102E" }} />
              <span className="truncate">{inc}</span>
            </div>
          ))}
        </div>

        {pkg.includes.length > 6 && (
          <button onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 mb-4 transition-colors">
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="inline-block">
              <ChevronDown size={13} />
            </motion.span>
            {expanded ? "Show less" : `+${pkg.includes.length - 6} more inclusions`}
          </button>
        )}

        <div className="h-px bg-gray-100 my-4" />

        <div className="flex items-end justify-between">
          <div>
            <p className="text-gray-400 text-xs">Starting from</p>
            <p className="font-display font-black text-3xl" style={{ color: "#1B3A6B" }}>{pkg.price}</p>
            <p className="text-gray-400 text-xs">per person sharing</p>
          </div>
          <button onClick={onBook}
            className="flex items-center gap-2 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all hover:scale-105"
            style={{ background: "#C8102E" }}>
            Book Now <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function PackagesPage() {
  const [activeTag, setActiveTag] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);

  const filtered = packages.filter((p) => {
    const matchTag = activeTag === "All" || p.tag === activeTag;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.destinations.some((d) => d.toLowerCase().includes(search.toLowerCase()));
    return matchTag && matchSearch;
  });

  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap'); .font-display{font-family:'Playfair Display',serif;}`}</style>
      <Nav />

      {/* Hero header */}
      <div className="pt-24 pb-14 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #ffffff 60%, #fff5f5 100%)" }}>
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1B3A6B" strokeWidth="1" /></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" /></svg>
        </div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#C8102E" }}>Upcoming Trips</p>
          <h1 className="font-display font-black mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#1B3A6B" }}>
            All <span className="italic" style={{ color: "#C8102E" }}>Packages</span>
          </h1>
          <p className="text-gray-500 text-lg">Handpicked destinations, fully handled. Choose your next adventure.</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="px-6 py-8 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
            <input type="text" placeholder="Search destination or package..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm outline-none text-gray-700 placeholder:text-gray-300 focus:border-blue-200 transition-colors" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <button key={tag} onClick={() => setActiveTag(tag)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: activeTag === tag ? "#C8102E" : "#f8faff",
                color: activeTag === tag ? "white" : "#1B3A6B",
                border: `1px solid ${activeTag === tag ? "#C8102E" : "rgba(27,58,107,0.15)"}`,
              }}>
              {tag}
            </button>
          ))}
        </div>

        <p className="text-gray-400 text-xs mb-6">{filtered.length} {filtered.length === 1 ? "package" : "packages"} found</p>

        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} onBook={() => setSelectedPkg(pkg)} />
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-24">
              <div className="text-5xl mb-4">✈️</div>
              <h3 className="font-display text-2xl font-bold mb-2" style={{ color: "#1B3A6B" }}>No packages found</h3>
              <p className="text-gray-400 text-sm mb-6">Try a different search or filter</p>
              <button onClick={() => { setActiveTag("All"); setSearch(""); }}
                className="text-white text-sm px-6 py-3 rounded-full" style={{ background: "#C8102E" }}>
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Custom CTA */}
      <div className="px-6 py-16 text-center border-t border-gray-100" style={{ background: "#f8faff" }}>
        <h3 className="font-display font-bold text-2xl mb-2" style={{ color: "#1B3A6B" }}>Need a Custom Package?</h3>
        <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">Tell us your destination, dates, and budget. We'll put together something perfect.</p>
        <button onClick={() => wa("Hi Elrom Holidays, I'd like a custom travel package.")}
          className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105"
          style={{ background: "#C8102E" }}>
          Request Custom Package <ArrowRight size={16} />
        </button>
      </div>

      <footer className="py-6 text-center border-t border-gray-100">
        <p className="text-gray-300 text-xs">© 2026 Elrom Holidays · Website by <span style={{ color: "#1B3A6B" }}>Primyst Solutions</span></p>
      </footer>

      <BookingModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />
    </div>
  );
}
