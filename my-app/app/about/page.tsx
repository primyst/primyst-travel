"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart, Star, Users, Globe, Shield, Plane, MapPin, Briefcase, Hotel } from "lucide-react";
import Link from "next/link";

// Business Constants
const BUSINESS_NAME = "QDS Travels";
const WHATSAPP = "2347035612652";
const ADDRESS = "Random Address, Ogbomoso, Oyo State, Nigeria";

const wa = (msg: string) =>
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");

// ── LOGO COMPONENT ──────────────────────────────────────────────────────────

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 select-none ${className}`}>
      <div className="w-6 h-6 rounded-md flex items-center justify-center text-white font-black text-sm" style={{ background: "#C8102E" }}>
        Q
      </div>
      <span className="font-display font-black text-xl tracking-tight" style={{ color: "#1B3A6B" }}>
        QDS <span style={{ color: "#C8102E" }}>Travels</span>
      </span>
    </div>
  );
}

const values = [
  { 
    icon: Heart, 
    title: "Client-Centric", 
    desc: "Every itinerary is crafted with your specific needs in mind. Your comfort and safety are our North Star." 
  },
  { 
    icon: Shield, 
    title: "Absolute Integrity", 
    desc: "We believe in transparent pricing and honest timelines. No hidden charges, just straightforward travel solutions." 
  },
  { 
    icon: Star, 
    title: "Premium Excellence", 
    desc: "From the first consultation to your return flight, we maintain a gold standard of service and professional care." 
  },
  { 
    icon: Globe, 
    title: "Global Connectivity", 
    desc: "Our vast network of international partners ensures you get the best access to destinations across all seven continents." 
  },
];

const milestones = [
  { year: "2021", title: "The Beginning", desc: "QDS Travels was established to simplify international travel for Nigerians through expertise and dedication." },
  { year: "2023", title: "Service Expansion", desc: "Launched full-scale visa processing and curated international tour packages for groups and individuals." },
  { year: "2024", title: "Regional Growth", desc: "Recognized as a leading travel agency in the Ogbomoso region, serving hundreds of students and professionals." },
  { year: "2026", title: "Digital First", desc: "Launched our modern, mobile-first travel platform to provide seamless booking experiences worldwide." },
];

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap'); 
        .font-display { font-family: 'Playfair Display', serif; }
      `}</style>

      {/* Header/Nav Spacer */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/"><Logo /></Link>
          <button onClick={() => wa("Hello QDS Travels...")} 
            className="text-xs font-bold px-5 py-2.5 rounded-full text-white transition-transform hover:scale-105"
            style={{ background: "#C8102E" }}>
            Contact Us
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-red-50/30">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1B3A6B" strokeWidth="1" /></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" /></svg>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-3xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#C8102E" }}>Expert Travel Concierge</p>
          <h1 className="font-display font-black mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "#1B3A6B" }}>
            The Story Behind <br />
            <span className="italic" style={{ color: "#C8102E" }}>QDS Travels</span>
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto">
            We are a modern, mobile-first travel agency dedicated to bridging the gap between your travel dreams and reality with professional, end-to-end assistance.
          </p>
        </motion.div>
      </section>

      {/* Mission & Impact */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="font-display font-black text-4xl md:text-5xl mb-8" style={{ color: "#1B3A6B" }}>
              Our Mission: <br />
              <span className="italic" style={{ color: "#C8102E" }}>Stress-Free Journeys.</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6 text-lg">
              QDS Travels was founded with a clear purpose: to eliminate the headaches associated with international travel. We understand that whether you're traveling for business, education, or leisure, the logistics can be overwhelming.
            </p>
            <p className="text-gray-500 leading-relaxed mb-10">
              By offering comprehensive services including flight booking, visa processing, and travel insurance, we ensure our clients can focus on the destination while we master the details.
            </p>
            
            <div className="grid grid-cols-2 gap-8 py-8 border-t border-gray-100">
              {[["5+", "Years Combined Experience"], ["Hundreds", "of Successful Visas"], ["24/7", "WhatsApp Support"], ["100%", "Service Transparency"]].map(([num, label]) => (
                <div key={label}>
                  <div className="font-display font-black text-3xl mb-1" style={{ color: "#C8102E" }}>{num}</div>
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual Showcase */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="relative p-8 rounded-[2rem] bg-[#1B3A6B] shadow-2xl overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[80px] rounded-full -mr-20 -mt-20" />
            
            <div className="relative z-10 grid grid-cols-2 gap-4">
              {[
                { icon: Briefcase, label: "Professional", sub: "Visa Expertise" },
                { icon: Plane, label: "Global", sub: "Flight Network" },
                { icon: Hotel, label: "Premium", sub: "Reservations" },
                { icon: Shield, label: "Secure", sub: "Travel Insurance" },
              ].map((item) => (
                <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm transition-colors hover:bg-white/10">
                  <item.icon size={24} className="text-red-500 mb-4" />
                  <p className="font-bold text-white text-base">{item.label}</p>
                  <p className="text-white/40 text-xs">{item.sub}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-6 bg-white/5 border border-white/10 rounded-2xl text-center backdrop-blur-sm">
              <p className="text-white/60 text-xs mb-2 uppercase tracking-widest font-bold">Comprehensive Assistance</p>
              <p className="text-white font-display text-xl">Tours · Packages · Cruises</p>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#C8102E" }}>Our Core Values</p>
          <h2 className="font-display font-black text-4xl md:text-5xl" style={{ color: "#1B3A6B" }}>What Defines Us</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm bg-white"
                  style={{ color: "#C8102E" }}>
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-lg mb-3" style={{ color: "#1B3A6B" }}>{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-display font-black text-4xl md:text-5xl" style={{ color: "#1B3A6B" }}>Our Evolution</h2>
          </div>
          
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-slate-200" />
            
            <div className="space-y-16">
              {milestones.map((m, i) => (
                <motion.div key={m.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex md:items-center gap-10 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  
                  {/* Content Area */}
                  <div className="md:w-1/2 flex items-start pl-16 md:pl-0">
                    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full border-[3px] bg-white z-10"
                      style={{ borderColor: "#C8102E" }} />
                      
                    <div className={`${i % 2 === 0 ? "md:text-right" : "md:text-left"} w-full`}>
                      <span className="font-display font-black text-3xl block mb-2" style={{ color: "#C8102E" }}>{m.year}</span>
                      <h3 className="font-bold text-xl mb-2" style={{ color: "#1B3A6B" }}>{m.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modern CTA */}
      <section className="py-24 px-6 text-center text-white relative overflow-hidden" style={{ background: "#1B3A6B" }}>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-display font-black text-4xl md:text-6xl mb-6 italic">Let's Create Your Story.</h2>
          <p className="text-white/60 text-lg mb-12">Whether it's a family vacation or a career move abroad, we're ready to guide you.</p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => wa("Hi QDS Travels, let's start my travel planning.")}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-black text-lg transition-transform hover:scale-105 shadow-2xl shadow-black/20"
              style={{ background: "#C8102E" }}>
              Talk to an Expert <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <Logo />
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
            <Link href="/packages" className="hover:text-red-600 transition-colors">Packages</Link>
            <a href={`tel:${WHATSAPP}`} className="hover:text-red-600 transition-colors">Support</a>
          </div>
          <p className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">
            © 2026 {BUSINESS_NAME} · Built by Primyst
          </p>
        </div>
      </footer>
    </div>
  );
}
