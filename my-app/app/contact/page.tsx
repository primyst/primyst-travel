"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram, ArrowRight, MessageCircle, Clock, Send, Globe } from "lucide-react";
import Link from "next/link";

// Business Constants
const BUSINESS_NAME = "QDS Travels";
const WHATSAPP = "2347035612652";
const EMAIL = "hello@qdstravels.com";
const ADDRESS = "Ogbomoso, Oyo State, Nigeria";

const wa = (msg: string) =>
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");

const enquiryTypes = [
  "Flight Booking",
  "Visa Processing",
  "Educational Travel",
  "Corporate Travel",
  "Vacation Package",
  "Travel Insurance",
  "Hotel Reservation",
  "Other",
];

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

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", type: "", message: "" });
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const valid = form.name.trim() && form.phone.trim() && form.message.trim();

  const handleSubmit = () => {
    if (!valid) return;
    const msg = `Hi ${BUSINESS_NAME}!\n\n👤 Name: ${form.name}\n📞 Phone: ${form.phone}${form.type ? `\n📋 Enquiry: ${form.type}` : ""}\n\n💬 Message:\n${form.message}`;
    wa(msg);
  };

  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap'); 
        .font-display{font-family:'Playfair Display',serif;}
      `}</style>
      
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/"><Logo /></Link>
          <Link href="/about" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-red-600 transition-colors">
            About Us
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="pt-32 pb-16 px-6 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-red-50/30">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1B3A6B" strokeWidth="1" /></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" /></svg>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-3xl mx-auto text-center">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#C8102E" }}>Connect With Us</p>
          <h1 className="font-display font-black mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#1B3A6B" }}>
            Ready to Start Your<br /><span className="italic" style={{ color: "#C8102E" }}>New Adventure?</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            Reach out via the form or through our direct channels. Our experts are standing by to assist with your travel needs.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-20">

        {/* Contact info */}
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#C8102E" }}>Direct Channels</p>
          <h2 className="font-display font-black text-4xl mb-10" style={{ color: "#1B3A6B" }}>How to Reach Us</h2>

          <div className="space-y-4 mb-12">
            {[
              { icon: Phone, label: "Phone / WhatsApp", value: `+${WHATSAPP}`, href: `tel:+${WHATSAPP}`, action: () => wa(`Hi ${BUSINESS_NAME}, I'd like to ask a quick question.`), actionLabel: "Chat Now" },
              { icon: Mail, label: "Email Address", value: EMAIL, href: `mailto:${EMAIL}`, action: null, actionLabel: null },
              { icon: MapPin, label: "Main Office", value: ADDRESS, href: null, action: null, actionLabel: null },
              { icon: Globe, label: "Social Media", value: "@qdstravels", href: "#", action: null, actionLabel: null },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="group flex items-start gap-5 p-5 rounded-3xl border border-slate-100 hover:border-red-100 hover:bg-red-50/30 transition-all duration-500">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm bg-white group-hover:scale-110 transition-transform"
                    style={{ color: "#C8102E" }}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                        className="text-base font-bold hover:text-red-600 transition-colors break-all" style={{ color: "#1B3A6B" }}>
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-base font-bold" style={{ color: "#1B3A6B" }}>{item.value}</p>
                    )}
                    {item.action && (
                      <button onClick={item.action}
                        className="flex items-center gap-1.5 text-xs font-bold mt-2 px-3 py-1.5 rounded-full bg-white border border-slate-100 shadow-sm transition-all hover:bg-red-600 hover:text-white"
                        style={{ color: "#C8102E" }}>
                        <MessageCircle size={12} /> {item.actionLabel}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Business Hours Card */}
          <div className="p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100/50 bg-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-red-50">
                <Clock size={18} style={{ color: "#C8102E" }} />
              </div>
              <h3 className="font-bold text-lg" style={{ color: "#1B3A6B" }}>Business Hours</h3>
            </div>
            <div className="space-y-4">
              {[
                ["Monday – Friday", "08:00 AM – 06:00 PM"],
                ["Saturday", "09:00 AM – 04:00 PM"],
                ["Sunday", "WhatsApp Support Only"],
              ].map(([day, time]) => (
                <div key={day} className="flex justify-between items-center text-sm border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                  <span className="text-slate-400 font-medium">{day}</span>
                  <span className="font-bold" style={{ color: "#1B3A6B" }}>{time}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact form → WhatsApp */}
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-white shadow-inner">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#C8102E" }}>Quick Form</p>
            <h2 className="font-display font-black text-3xl mb-8" style={{ color: "#1B3A6B" }}>Send an Enquiry</h2>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-slate-400">Full Name *</label>
                  <input type="text" placeholder="John Doe"
                    value={form.name} onChange={(e) => set("name", e.target.value)}
                    className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 text-sm outline-none text-slate-800 placeholder:text-slate-300 focus:border-red-200 transition-all shadow-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-slate-400">Phone Number *</label>
                  <input type="tel" placeholder="080 1234 5678"
                    value={form.phone} onChange={(e) => set("phone", e.target.value)}
                    className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 text-sm outline-none text-slate-800 placeholder:text-slate-300 focus:border-red-200 transition-all shadow-sm" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-slate-400">What are you looking for?</label>
                <select value={form.type} onChange={(e) => set("type", e.target.value)}
                  className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 text-sm outline-none text-slate-700 shadow-sm appearance-none cursor-pointer">
                  <option value="">Select Service Type</option>
                  {enquiryTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-slate-400">Your Message *</label>
                <textarea placeholder="Tell us about your travel plans, budget, or any specific questions..."
                  value={form.message} onChange={(e) => set("message", e.target.value)}
                  rows={4} className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 text-sm outline-none text-slate-800 placeholder:text-slate-300 resize-none focus:border-red-200 transition-all shadow-sm" />
              </div>

              <button onClick={handleSubmit} disabled={!valid}
                className="w-full flex items-center justify-center gap-3 text-white font-black py-5 rounded-2xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-red-900/10"
                style={{ background: valid ? "#C8102E" : "#94a3b8" }}>
                <Send size={18} /> Send via WhatsApp <ArrowRight size={18} />
              </button>
              
              <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-tighter">
                Clicking send will open your WhatsApp app
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <footer className="py-12 text-center border-t border-slate-50 bg-white">
        <p className="text-slate-300 text-[10px] font-bold uppercase tracking-[0.2em]">
          © 2026 {BUSINESS_NAME} · Crafted by <span style={{ color: "#1B3A6B" }}>Primyst Solutions</span>
        </p>
      </footer>
    </div>
  );
}
