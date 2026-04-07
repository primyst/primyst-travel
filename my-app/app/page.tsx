"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane, Globe, Shield, Heart, Anchor, Users, MapPin,
  Phone, Mail, Instagram, ArrowRight, Star, Calendar,
  Check, Menu, X, MessageCircle, Send, ChevronRight,
  Clock, Map, Briefcase, Hotel
} from "lucide-react";
import Link from "next/link";
import { packages, visas, navLinks } from "@/lib/elrom-data"; // Note: Update your data file imports as well
import BookingModal from "@/components/BookingModal";
import type { Package } from "@/lib/elrom-data";

// Updated Business Constants
const BUSINESS_NAME = "QDS Travels";
const PHONE = "+2347035612652";
const EMAIL = "hello@qdstravels.com";
const ADDRESS = "Random Address, Ogbomoso, Oyo State, Nigeria";
const WHATSAPP = "2347035612652";

const wa = (msg: string) =>
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");

// ── LOGO COMPONENT ──────────────────────────────────────────────────────────

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 select-none ${className}`}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-xl" style={{ background: "#C8102E" }}>
        Q
      </div>
      <span className="font-display font-black text-2xl tracking-tight" style={{ color: "#1B3A6B" }}>
        QDS <span style={{ color: "#C8102E" }}>Travels</span>
      </span>
    </div>
  );
}

// ── 3D CAROUSEL ───────────────────────────────────────────────────────────────

function Carousel({ onBook }: { onBook: (pkg: Package) => void }) {
  const [active, setActive] = useState(0);
  const total = packages.length;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((p) => (p + 1) % total);
    }, 3200);
  };

  useEffect(() => {
    startAuto();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const getStyle = (i: number) => {
    const diff = ((i - active + total) % total);
    if (diff === 0) return { x: 0, scale: 1, rotateY: 0, z: 40, opacity: 1, zIndex: 10 };
    if (diff === 1) return { x: 160, scale: 0.82, rotateY: -22, z: 0, opacity: 0.85, zIndex: 6 };
    if (diff === total - 1) return { x: -160, scale: 0.82, rotateY: 22, z: 0, opacity: 0.85, zIndex: 6 };
    if (diff === 2) return { x: 280, scale: 0.65, rotateY: -35, z: -40, opacity: 0.4, zIndex: 2 };
    if (diff === total - 2) return { x: -280, scale: 0.65, rotateY: 35, z: -40, opacity: 0.4, zIndex: 2 };
    return { x: 0, scale: 0.5, rotateY: 0, z: -80, opacity: 0, zIndex: 0 };
  };

  return (
    <div className="relative w-full flex items-center justify-center" style={{ height: 420, perspective: 1200 }}>
      {packages.map((pkg, i) => {
        const s = getStyle(i);
        return (
          <motion.div
            key={pkg.id}
            animate={{ x: s.x, scale: s.scale, rotateY: s.rotateY, z: s.z, opacity: s.opacity }}
            transition={{ type: "spring", damping: 28, stiffness: 200 }}
            style={{ position: "absolute", zIndex: s.zIndex, transformStyle: "preserve-3d" }}
            onClick={() => {
              if (i === active) onBook(pkg);
              else { setActive(i); startAuto(); }
            }}
            className="cursor-pointer"
          >
            <div
              className="w-64 rounded-3xl overflow-hidden shadow-2xl"
              style={{
                boxShadow: i === active
                  ? "0 32px 64px rgba(27,58,107,0.22), 0 0 0 2px #C8102E"
                  : "0 12px 32px rgba(27,58,107,0.12)",
              }}
            >
              <div className="relative h-44 overflow-hidden">
                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ background: "#C8102E" }}>
                    {pkg.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-bold text-sm leading-tight">{pkg.title}</p>
                  <p className="text-white/70 text-xs mt-0.5">{pkg.flag} {pkg.destinations.join(" · ")}</p>
                </div>
              </div>
              <div className="bg-white p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-gray-400 text-xs">From</p>
                    <p className="font-black text-xl" style={{ color: "#1B3A6B", fontFamily: "'Playfair Display', serif" }}>
                      {pkg.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={11} />
                    {pkg.duration}
                  </div>
                </div>
                {i === active && (
                  <motion.button
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    onClick={(e) => { e.stopPropagation(); onBook(pkg); }}
                    className="w-full flex items-center justify-center gap-2 text-white text-xs font-bold py-2.5 rounded-xl transition-all hover:scale-105"
                    style={{ background: "#C8102E" }}
                  >
                    Book Now <ArrowRight size={12} />
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}

      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {packages.map((_, i) => (
          <button key={i} onClick={() => { setActive(i); startAuto(); }}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? 20 : 6,
              height: 6,
              background: i === active ? "#C8102E" : "#cbd5e1",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── CHAT WIDGET ───────────────────────────────────────────────────────────────

type Msg = { from: "bot" | "user"; text: string };
const QUICK = [
  "How do I book a trip?",
  "What's included in packages?",
  "How long does visa processing take?",
  "Which countries do you process visas for?",
  "How do I contact QDS Travels?",
];
const ANSWERS: Record<string, string> = {
  "How do I book a trip?": `Browse our packages, click 'Book Now', and you'll be connected to our team on WhatsApp or call us at ${PHONE}.`,
  "What's included in packages?": "Packages typically include return flights, hotel reservations, airport transfers, and travel insurance.",
  "How long does visa processing take?": "Timelines vary by country, but usually 5-15 business days. Contact us for specific destination details.",
  "Which countries do you process visas for?": "We handle UK, USA, Canada, Schengen, South Africa, and many more. Ask us about your specific destination!",
  "How do I contact QDS Travels?": `You can reach us at ${PHONE} or visit our office at ${ADDRESS}.`,
};

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: `Welcome to ${BUSINESS_NAME}. How can we help you explore the world today?` },
  ]);
  const [answered, setAnswered] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleQuick = (q: string) => {
    const next: Msg[] = [{ from: "user", text: q }, { from: "bot", text: ANSWERS[q] }];
    setMessages((p) => [...p, ...next]);
    setAnswered((p) => [...p, q]);
  };

  const available = QUICK.filter((q) => !answered.includes(q));

  return (
    <>
      <motion.button onClick={() => setOpen((p) => !p)}
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center"
        style={{ background: "#C8102E" }}>
        <AnimatePresence mode="wait">
          {open ? <X size={22} className="text-white" /> : <MessageCircle size={22} className="text-white" />}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="fixed bottom-24 right-6 z-50 w-80 max-h-[500px] flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-100"
          >
            <div className="flex items-center gap-3 px-4 py-3" style={{ background: "#1B3A6B" }}>
              <Logo className="scale-75 origin-left !text-white" />
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/80 text-[10px]">Active</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg, i) => (
                <motion.div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[82%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                    msg.from === "user" ? "text-white rounded-br-none" : "bg-white text-gray-700 rounded-bl-none shadow-sm"
                  }`} style={msg.from === "user" ? { background: "#C8102E" } : {}}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={bottomRef} />
            </div>

            <div className="p-3 border-t border-gray-100 bg-white">
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {available.map((q) => (
                  <button key={q} onClick={() => handleQuick(q)}
                    className="w-full flex items-center justify-between gap-2 text-left text-[11px] text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
                    {q} <ChevronRight size={12} className="shrink-0" style={{ color: "#C8102E" }} />
                  </button>
                ))}
                <button onClick={() => wa("Hi QDS Travels, I need assistance with travel planning.")}
                  className="w-full flex items-center justify-center gap-2 text-white text-xs font-semibold py-3 rounded-xl mt-2"
                  style={{ background: "#C8102E" }}>
                  <Send size={13} /> Chat on WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────

const serviceIcons = [Plane, Briefcase, Map, Globe, Hotel, Shield];
const serviceLabels = ["Flight Booking", "Visa Processing", "Tours", "Travel Packages", "Hotel Reservations", "Travel Insurance"];
const serviceDescs = [
  "Local and international flight reservations at competitive rates.",
  "Expert guidance through documentation and visa application workflows.",
  "Curated local and international sightseeing experiences.",
  "All-inclusive leisure and business travel bundles tailored for you.",
  "Comfortable stays in top-rated hotels across the globe.",
  "Comprehensive coverage for medical emergencies and trip disruptions."
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);

  return (
    <div className="bg-white text-gray-900 min-h-screen overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #C8102E; border-radius: 2px; }
      `}</style>

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-gray-100 shadow-sm bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href}
                className="text-sm font-medium px-4 py-2 rounded-full transition-colors hover:bg-gray-100"
                style={{ color: "#1B3A6B" }}>
                {l.label}
              </Link>
            ))}
          </nav>

          <button onClick={() => wa("Hello QDS Travels, I'd like to book a trip.")}
            className="hidden md:flex items-center gap-2 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all hover:scale-105"
            style={{ background: "#C8102E" }}>
            Get Started
          </button>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "#1B3A6B" }}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-white border-b border-gray-100 shadow-lg px-6 py-6 flex flex-col gap-2">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="text-base font-medium py-3 border-b border-gray-50 last:border-0"
                style={{ color: "#1B3A6B" }}>
                {l.label}
              </Link>
            ))}
            <button onClick={() => wa("Hi QDS Travels...")}
              className="mt-4 text-white font-bold py-4 rounded-xl text-center"
              style={{ background: "#C8102E" }}>
              Book a Consultation
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="min-h-screen pt-24 flex items-center bg-gradient-to-br from-slate-50 via-white to-red-50/30">
        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center py-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 text-[10px] uppercase tracking-widest font-bold mb-6"
              style={{ borderColor: "rgba(200,16,46,0.2)", color: "#C8102E", background: "rgba(200,16,46,0.05)" }}>
              Premium Travel Concierge
            </div>

            <h1 className="font-display font-black leading-[1.1] mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#1B3A6B" }}>
              Explore The World<br />
              <span style={{ color: "#C8102E" }}>Seamlessly.</span>
            </h1>

            <p className="text-gray-500 text-lg max-w-md mb-10 leading-relaxed">
              From visa processing to luxury hotel reservations, QDS Travels handles the complexity while you enjoy the journey.
            </p>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => wa("Hi, I want to explore travel packages.")}
                className="flex items-center gap-2 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 text-sm shadow-lg shadow-red-900/10"
                style={{ background: "#C8102E" }}>
                Explore Packages <ArrowRight size={18} />
              </button>
              <a href={`tel:${PHONE}`}
                className="flex items-center gap-2 font-bold px-8 py-4 rounded-full border-2 text-sm transition-all hover:bg-gray-50"
                style={{ borderColor: "#1B3A6B", color: "#1B3A6B" }}>
                <Phone size={16} /> Contact Us
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative">
            <Carousel onBook={(pkg) => setSelectedPkg(pkg)} />
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display font-black text-4xl md:text-5xl mb-4" style={{ color: "#1B3A6B" }}>
              Our Expert <span style={{ color: "#C8102E" }}>Services</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We offer a mobile-first, comprehensive travel platform designed for individuals and groups looking for professional assistance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceLabels.map((label, i) => {
              const Icon = serviceIcons[i];
              return (
                <motion.div key={label}
                  whileHover={{ y: -8 }}
                  className="bg-slate-50 p-8 rounded-3xl border border-slate-100 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
                    style={{ background: "white", color: "#C8102E" }}>
                    <Icon size={28} />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3" style={{ color: "#1B3A6B" }}>{label}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{serviceDescs[i]}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="py-24 px-6 text-center text-white" style={{ background: "#1B3A6B" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-black text-4xl md:text-6xl mb-6 italic">
            Where do you want to go next?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Join hundreds of satisfied travelers who trust QDS Travels for their local and international trips.
          </p>
          <button onClick={() => wa("Hi QDS Travels, I'm ready to plan my next adventure.")}
            className="px-10 py-5 rounded-full font-black text-xl transition-all hover:scale-105"
            style={{ background: "#C8102E" }}>
            Plan My Trip Now
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <Logo className="mb-6" />
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Providing modern, mobile-first travel solutions for the global citizen. Reliable, professional, and premium.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#1B3A6B] uppercase tracking-widest text-xs mb-6">Contact Details</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin size={18} className="shrink-0" style={{ color: "#C8102E" }} />
                <span>{ADDRESS}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone size={18} style={{ color: "#C8102E" }} />
                <span>{PHONE}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail size={18} style={{ color: "#C8102E" }} />
                <span>{EMAIL}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#1B3A6B] uppercase tracking-widest text-xs mb-6">Follow Us</h4>
            <a href="#" className="flex items-center gap-3 text-sm text-gray-600 hover:text-red-600 transition-colors">
              <Instagram size={18} /> @qdstravels
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          <p>© 2026 {BUSINESS_NAME}. All Rights Reserved.</p>
          <p>Built with ❤️ by Primyst Solutions</p>
        </div>
      </footer>

      <ChatWidget />
      <BookingModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />
    </div>
  );
}
