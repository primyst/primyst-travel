"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Search, FileText, Clock, Shield } from "lucide-react";
import Nav from "@/components/Nav";
import { visas, WA } from "@/lib/elrom-data";

const wa = (msg: string) =>
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank");

const steps = [
  { icon: FileText, title: "Send Enquiry", desc: "Contact us on WhatsApp with your destination and travel date." },
  { icon: Check, title: "Document Checklist", desc: "We send you a precise checklist of what you need to gather." },
  { icon: Clock, title: "We Handle Submission", desc: "Our team prepares and submits your application on your behalf." },
  { icon: Shield, title: "Track & Collect", desc: "We follow up with the embassy and notify you when ready." },
];

export default function VisaPage() {
  const [search, setSearch] = useState("");

  const filtered = visas.filter((v) =>
    v.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap'); .font-display{font-family:'Playfair Display',serif;}`}</style>
      <Nav />

      {/* Hero */}
      <div className="pt-24 pb-14 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #ffffff 60%, #fff5f5 100%)" }}>
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1B3A6B" strokeWidth="1" /></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" /></svg>
        </div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#C8102E" }}>Visa Processing</p>
          <h1 className="font-display font-black mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#1B3A6B" }}>
            Your Passport.<br /><span className="italic" style={{ color: "#C8102E" }}>Our Expertise.</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">We handle documentation, submissions, and follow-ups for 20+ countries. Click any country below to get started on WhatsApp.</p>
        </motion.div>
      </div>

      {/* How it works */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#C8102E" }}>How It Works</p>
          <h2 className="font-display font-black text-3xl" style={{ color: "#1B3A6B" }}>Simple. Fast. Handled.</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(200,16,46,0.08)" }}>
                    <Icon size={18} style={{ color: "#C8102E" }} />
                  </div>
                  <span className="font-display font-black text-3xl" style={{ color: "rgba(27,58,107,0.08)" }}>0{i + 1}</span>
                </div>
                <h3 className="font-bold text-sm mb-2" style={{ color: "#1B3A6B" }}>{step.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight size={16} className="text-gray-200" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#C8102E" }}>Visa Fees</p>
            <h2 className="font-display font-black text-2xl" style={{ color: "#1B3A6B" }}>20+ Countries Covered</h2>
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
            <input type="text" placeholder="Search country..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none text-gray-700 placeholder:text-gray-300 w-48 focus:border-blue-200 transition-colors" />
          </div>
        </div>

        <p className="text-gray-400 text-xs mb-4 italic">* Rates are subject to change. Click any country to enquire on WhatsApp for current pricing.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map((v, i) => (
            <motion.button key={v.country}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.03 }}
              whileHover={{ scale: 1.04, boxShadow: "0 8px 24px rgba(27,58,107,0.1)" }}
              onClick={() => wa(`Hi Elrom Holidays, I'd like to process a visa to ${v.country}. Please guide me on the requirements and current fees.`)}
              className="p-4 rounded-xl border border-gray-100 bg-white text-left group transition-all duration-200">
              <div className="text-2xl mb-2">{v.flag}</div>
              <div className="font-semibold text-xs mb-1 group-hover:text-red-600 transition-colors" style={{ color: "#1B3A6B" }}>{v.country}</div>
              <div className="font-display font-black text-sm" style={{ color: "#C8102E" }}>{v.fee}</div>
            </motion.button>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-400 text-sm">
              No results for "{search}"
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 px-6 text-center" style={{ background: "#1B3A6B" }}>
        <h2 className="font-display font-black text-white text-4xl mb-4">Ready to Apply?</h2>
        <p className="text-white/60 mb-8 max-w-md mx-auto">Don't stress over paperwork. Let our visa team handle your application from start to finish.</p>
        <button onClick={() => wa("Hi Elrom Holidays, I need visa processing assistance. Please guide me.")}
          className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105"
          style={{ background: "#C8102E" }}>
          Start My Visa Application <ArrowRight size={16} />
        </button>
      </div>

      <footer className="py-6 text-center border-t border-gray-100 bg-white">
        <p className="text-gray-300 text-xs">© 2026 Elrom Holidays · Website by <span style={{ color: "#1B3A6B" }}>Primyst Solutions</span></p>
      </footer>
    </div>
  );
}
