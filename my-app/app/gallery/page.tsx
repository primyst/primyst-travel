"use client";

import { motion } from "framer-motion";
import { ArrowRight, Camera, Instagram, Info } from "lucide-react";
import Nav from "@/components/Nav";
import DemoBanner from "@/components/DemoBanner";
import { WA } from "@/lib/elrom-data";

const wa = (msg: string) =>
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank");

const destinations = [
  { label: "Bali", flag: "🇮🇩", image: "/bali.jpg" },
  { label: "Thailand", flag: "🇹🇭", image: "/thailand.jpg" },
  { label: "Senegal", flag: "🇸🇳", image: "/senegal.jpg" },
  { label: "Nairobi", flag: "🇰🇪", image: "/nairobi.jpg" },
  { label: "Kilimanjaro", flag: "🇹🇿", image: "/kilimanjaro.jpg" },
  { label: "Cotonou", flag: "🇧🇯", image: "/cotonou.jpg" },
];

export default function GalleryPage() {
  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap'); .font-display{font-family:'Playfair Display',serif;}`}</style>
      <DemoBanner />
      <Nav />

      {/* Hero */}
      <div className="pt-24 pb-14 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #ffffff 60%, #fff5f5 100%)" }}>
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1B3A6B" strokeWidth="1" /></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" /></svg>
        </div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#C8102E" }}>Moments</p>
          <h1 className="font-display font-black mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#1B3A6B" }}>
            Our <span className="italic" style={{ color: "#C8102E" }}>Gallery</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Real trips. Real travelers. Real memories.</p>
        </motion.div>
      </div>

      {/* Notice — Primyst voice, not Elrom */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex gap-4 p-5 rounded-2xl border"
          style={{ background: "rgba(27,58,107,0.04)", borderColor: "rgba(27,58,107,0.12)" }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
            style={{ background: "rgba(200,16,46,0.08)" }}>
            <Info size={18} style={{ color: "#C8102E" }} />
          </div>
          <div>
            <h3 className="font-bold text-sm mb-1" style={{ color: "#1B3A6B" }}>Gallery placeholder</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              This is a demo website built by{" "}
              <span className="font-semibold" style={{ color: "#1B3A6B" }}>Primyst Solutions</span>{" "}
              to showcase what a professional website could look like for Elrom Holidays.
              The destination images shown here are stock photographs used for design purposes only.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mt-2">
              On the live website, this section would feature real trip photos and traveler memories
              sourced directly from Elrom Holidays' team. For now, their genuine content lives on Instagram.
            </p>
            <a href="https://instagram.com/elromholidays" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold mt-3 transition-colors hover:opacity-80"
              style={{ color: "#C8102E" }}>
              <Instagram size={14} /> @elromholidays on Instagram <ArrowRight size={13} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Destination grid */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <p className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: "#C8102E" }}>Destinations</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {destinations.map((d, i) => (
            <motion.div key={d.label}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
              onClick={() => wa(`Hi Elrom Holidays, I'm interested in a trip to ${d.label}. Please send me details.`)}>
              <img src={d.image} alt={d.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ background: "rgba(200,16,46,0.15)" }}>
                <div className="bg-white rounded-full px-4 py-2 flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "#C8102E" }}>
                  <Camera size={14} /> Plan This Trip
                </div>
              </div>
              <div className="absolute bottom-3 left-4">
                <p className="text-white font-bold text-sm">{d.flag} {d.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 rounded-3xl text-center"
          style={{ background: "linear-gradient(135deg, #1B3A6B, #2a5298)" }}>
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
            <Instagram size={26} className="text-white" />
          </div>
          <h3 className="font-display font-black text-white text-2xl mb-2">See the Real Trips</h3>
          <p className="text-white/60 text-sm mb-6 max-w-sm mx-auto">
            Follow <strong className="text-white">@elromholidays</strong> on Instagram for actual traveler photos, stories, and highlights from every destination.
          </p>
          <a href="https://instagram.com/elromholidays" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 text-white font-bold px-7 py-3.5 rounded-full transition-all hover:scale-105 text-sm"
            style={{ background: "#C8102E" }}>
            Follow on Instagram <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>

      <footer className="py-6 text-center border-t border-gray-100">
        <p className="text-gray-300 text-xs">© 2026 Elrom Holidays · Website by <span style={{ color: "#1B3A6B" }}>Primyst Solutions</span></p>
      </footer>
    </div>
  );
}
