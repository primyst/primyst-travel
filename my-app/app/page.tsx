"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane, Globe, Shield, Heart, Anchor,MapPin,
  Phone, Mail, Instagram, ArrowRight, Star,
  Check, Menu, X, MessageCircle, Send, ChevronRight,
  Clock, FileText, Camera,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ── DATA ──────────────────────────────────────────────────────────────────────

const WA_NUMBER = "2347037767246";
const WA_NUMBER_2 = "2348058713944";
const EMAIL = "info.destinationroyale@gmail.com";
const INSTAGRAM = "https://instagram.com/destination_royale";

const wa = (msg: string) =>
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Packages", href: "#packages" },
  { label: "Visa", href: "#visa" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export type Package = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  dates: string;
  duration: string;
  tag: string;
  flag: string;
  image: string;
  highlights: string[];
  includes: string[];
};

const PACKAGES: Package[] = [
  {
    id: "egypt",
    title: "Egypt",
    subtitle: "Cairo & Sharm El Sheikh",
    price: "₦2,900,000",
    dates: "Apr 24 – 29",
    duration: "5 Nights",
    tag: "Hot Deal",
    flag: "🇪🇬",
    image: "egypt.jpg",
    // 📸 Upload: Giza Pyramids at golden hour — wide aerial shot
    highlights: ["Giza Pyramids & The Sphinx", "Quad biking & Camel ride", "Ras Mohammed snorkeling", "Bedouin Dinner experience"],
    includes: ["Return flights", "2N Cairo + 3N Sharm hotel", "Visa on arrival", "Airport transfers", "All listed tours"],
  },
  {
    id: "mombasa",
    title: "Mombasa",
    subtitle: "Kenya Beach Escape",
    price: "₦2,550,000",
    dates: "Apr 23 – 28",
    duration: "4 Nights",
    tag: "Best Value",
    flag: "🇰🇪",
    image: "mombasa.jpg",
    // 📸 Upload: Mombasa beach resort, turquoise ocean, white sand
    highlights: ["4 Nights beach resort", "Haller Park wildlife tour", "Wasini Island tour", "Dhow boat ride"],
    includes: ["Economy return ticket", "Beach resort B&D", "Airport transfers", "All listed tours"],
  },
  {
    id: "seychelles",
    title: "Seychelles",
    subtitle: "Luxury Island Retreat",
    price: "₦2,400,000",
    dates: "Nov 9 – 14",
    duration: "4 Nights",
    tag: "Most Popular",
    flag: "🇸🇨",
    image: "seychelles.jpg",
    // 📸 Upload: Seychelles granite boulders + turquoise water (Anse Source d'Argent)
    highlights: ["4 Nights beach resort", "Marine tour & boat ride", "Fish feeding experience", "Seychelles eTA included"],
    includes: ["Economy return ticket", "Beach resort B&B", "eTA", "Airport transfers"],
  },
  {
    id: "qatar",
    title: "Qatar",
    subtitle: "Super Budget 3.0",
    price: "₦2,500,000",
    dates: "Nov 20 – 26",
    duration: "5 Nights",
    tag: "Budget Pick",
    flag: "🇶🇦",
    image: "qatar.jpg",
    // 📸 Upload: Doha skyline at night OR desert safari golden dunes
    highlights: ["Villagio Mall Gondola ride", "Museum of Illusions", "Half-day Desert Safari", "Qatar Visa included"],
    includes: ["Economy return ticket", "5N hotel B&B", "Qatar Visa", "Airport transfers"],
  },
  {
    id: "zanzibar",
    title: "Zanzibar",
    subtitle: "Tanzania Beach & History",
    price: "₦2,850,000",
    dates: "Oct 24 – 29",
    duration: "4 Nights",
    tag: "New",
    flag: "🇹🇿",
    image: "zanzibar.jpg",
    // 📸 Upload: Zanzibar dhow boats on turquoise water or Stone Town alley
    highlights: ["Swimming with turtles", "Stone Town & Prison Island", "Mnemba Island", "Kayaking"],
    includes: ["Economy return ticket", "Beach resort B&D", "Tanzanian Visa", "Airport transfers"],
  },
  {
    id: "beirut",
    title: "Beirut",
    subtitle: "Lebanon Winter Edition",
    price: "₦2,600,000",
    dates: "Mar 5 – 10",
    duration: "4 Nights",
    tag: "Adventure",
    flag: "🇱🇧",
    image: "beirut.jpg",
    // 📸 Upload: Lebanese cedar mountains with snow OR Jeita Grotto
    highlights: ["Snowmobile & Paragliding", "Cable car ride", "Jeita Grotto boat ride", "Harissa visit"],
    includes: ["Economy return ticket", "4N hotel B&B", "Airport transfers", "All listed activities"],
  },
];

const TAG_COLORS: Record<string, string> = {
  "Hot Deal": "#e85d04",
  "Best Value": "#3FA9F5",
  "Most Popular": "#2d9e6b",
  "Budget Pick": "#7c3aed",
  "New": "#005B82",
  "Adventure": "#e11d48",
};

const SERVICES = [
  { icon: Plane, label: "Flight Deals", desc: "Best fares on economy & business class worldwide" },
  { icon: Globe, label: "Travel Packages", desc: "Curated group & private tours across the globe" },
  { icon: FileText, label: "Visa Processing", desc: "20+ countries, full documentation handled" },
  { icon: Anchor, label: "Excursions", desc: "Day trips, island hops & adventure activities" },
  { icon: Heart, label: "Honeymoon Packages", desc: "Romantic escapes tailored for two" },
  { icon: Camera, label: "Tours", desc: "Expert-guided cultural & sightseeing tours" },
];

// ── 3D CAROUSEL ───────────────────────────────────────────────────────────────

function Carousel({ onBook }: { onBook: (pkg: Package) => void }) {
  const [active, setActive] = useState(0);
  const total = PACKAGES.length;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setActive((p) => (p + 1) % total), 3200);
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
      {PACKAGES.map((pkg, i) => {
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
                  ? "0 32px 64px rgba(0,91,130,0.25), 0 0 0 2px #3FA9F5"
                  : "0 12px 32px rgba(0,91,130,0.12)",
              }}
            >
              <div className="relative h-44 overflow-hidden bg-slate-200">
                <Image src={pkg.image} alt={pkg.title} fill className="object-cover" sizes="256px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                    style={{ background: TAG_COLORS[pkg.tag] ?? "#005B82" }}>
                    {pkg.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-bold text-sm leading-tight">{pkg.title}</p>
                  <p className="text-white/70 text-xs mt-0.5">{pkg.flag} {pkg.subtitle}</p>
                </div>
              </div>
              <div className="bg-white p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-gray-400 text-xs">From</p>
                    <p className="font-black text-xl font-playfair" style={{ color: "#005B82" }}>{pkg.price}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={11} /> {pkg.duration}
                  </div>
                </div>
                {i === active && (
                  <motion.button
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    onClick={(e) => { e.stopPropagation(); onBook(pkg); }}
                    className="w-full flex items-center justify-center gap-2 text-white text-xs font-bold py-2.5 rounded-xl transition-all hover:scale-105"
                    style={{ background: "#3FA9F5" }}
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
        {PACKAGES.map((_, i) => (
          <button key={i} onClick={() => { setActive(i); startAuto(); }}
            className="rounded-full transition-all duration-300"
            style={{ width: i === active ? 20 : 6, height: 6, background: i === active ? "#005B82" : "#cbd5e1" }}
          />
        ))}
      </div>
    </div>
  );
}

// ── BOOKING MODAL ─────────────────────────────────────────────────────────────

function BookingModal({ pkg, onClose }: { pkg: Package | null; onClose: () => void }) {
  const [name, setName] = useState("");
  const [travelers, setTravelers] = useState("2");

  if (!pkg) return null;

  const handleSubmit = () => {
    if (!name.trim()) return;
    const msg = `Hi Destination Royale! I'd like to book the *${pkg.title}* package (${pkg.dates}).\n\nName: ${name}\nTravelers: ${travelers}\nPackage: ${pkg.price} per person\n\nPlease guide me on next steps.`;
    wa(msg);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.55)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-40 bg-slate-200">
            <Image src={pkg.image} alt={pkg.title} fill className="object-cover" sizes="448px" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <button onClick={onClose}
              className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-1.5 transition-colors">
              <X size={16} className="text-white" />
            </button>
            <div className="absolute bottom-4 left-4">
              <p className="text-white font-black text-xl font-playfair">{pkg.title}</p>
              <p className="text-white/70 text-xs">{pkg.flag} {pkg.subtitle} · {pkg.dates}</p>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
              <div>
                <p className="text-gray-400 text-xs">Price per person sharing</p>
                <p className="font-black text-2xl font-playfair" style={{ color: "#005B82" }}>{pkg.price}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-xs">{pkg.duration}</p>
                <p className="text-xs font-medium" style={{ color: "#3FA9F5" }}>{pkg.tag}</p>
              </div>
            </div>

            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-widest mb-2.5" style={{ color: "#005B82" }}>What&apos;s Included</p>
              <div className="flex flex-wrap gap-1.5">
                {pkg.includes.map((inc) => (
                  <span key={inc} className="flex items-center gap-1 text-xs bg-slate-50 text-slate-500 px-2.5 py-1 rounded-full border border-slate-100">
                    <Check size={9} style={{ color: "#3FA9F5" }} /> {inc}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Your Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Amaka Johnson"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#3FA9F5] transition-colors" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Number of Travelers</label>
                <select value={travelers} onChange={(e) => setTravelers(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#3FA9F5] transition-colors bg-white">
                  {["1", "2", "3", "4", "5", "6+"].map((n) => (
                    <option key={n} value={n}>{n} {n === "1" ? "Traveler" : "Travelers"}</option>
                  ))}
                </select>
              </div>
            </div>

            <button onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-2 text-white font-bold py-3.5 rounded-xl transition-all hover:scale-105 text-sm"
              style={{ background: "#005B82" }}>
              Continue on WhatsApp <ArrowRight size={15} />
            </button>
            <p className="text-center text-gray-400 text-xs mt-3">You&apos;ll be connected to our team instantly</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── CHAT WIDGET ───────────────────────────────────────────────────────────────

type Msg = { from: "bot" | "user"; text: string };

const QUICK_QS = [
  "How do I book a package?",
  "What's included in the price?",
  "How long does visa take?",
  "Do you offer payment plans?",
  "Which countries do you cover?",
  "How do I reach your team?",
];

const ANSWERS: Record<string, string> = {
  "How do I book a package?": "Tap 'Book Now' on any package, fill in a short form and you'll be connected to our team on WhatsApp instantly to confirm your booking.",
  "What's included in the price?": "All prices are per person sharing and include return flights, hotel accommodation, airport transfers, and listed tours. Full inclusions are on each package card.",
  "How long does visa take?": "Typically 5–15 business days depending on the country. We recommend starting at least 4 weeks before your travel date.",
  "Do you offer payment plans?": "Yes! A deposit secures your spot, with the balance spread before your travel date. Chat with us for details.",
  "Which countries do you cover?": "Egypt, Mombasa, Seychelles, Qatar, Zanzibar, Beirut — and more being added regularly.",
  "How do I reach your team?": "Call or WhatsApp 07037767246 or 08058713944, or email info.destinationroyale@gmail.com. We are based in Gbagada, Lagos.",
};

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "Hello! Welcome to Destination Royale 👋 How can we help you today?" },
  ]);
  const [answered, setAnswered] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleQuick = (q: string) => {
    const next: Msg[] = [{ from: "user", text: q }, { from: "bot", text: ANSWERS[q] }];
    if (answered.length >= 1) next.push({ from: "bot", text: "Would you like to speak directly with our travel team?" });
    setMessages((p) => [...p, ...next]);
    setAnswered((p) => [...p, q]);
  };

  const available = QUICK_QS.filter((q) => !answered.includes(q));
  const handoff = answered.length >= 2;

  return (
    <>
      <motion.button onClick={() => setOpen((p) => !p)}
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center"
        style={{ background: "#005B82" }}>
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={22} className="text-white" /></motion.div>
            : <motion.div key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><MessageCircle size={22} className="text-white" /></motion.div>
          }
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-80 max-h-[500px] flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-100"
          >
            <div className="flex items-center gap-3 px-4 py-3" style={{ background: "#005B82" }}>
              <div className="relative w-8 h-8">
                <Image src="/logo.png" alt="Destination Royale" fill className="object-contain" sizes="32px" />
              </div>
              <div>
                <p className="text-white text-xs font-semibold">Destination Royale</p>
                <p className="text-white/60 text-xs">Travel Assistant</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-white/70 text-xs">Online</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[82%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                    msg.from === "user" ? "text-white rounded-br-none" : "bg-white text-gray-700 rounded-bl-none shadow-sm"
                  }`} style={msg.from === "user" ? { background: "#005B82" } : {}}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={bottomRef} />
            </div>

            <div className="p-3 border-t border-gray-100 space-y-1.5 bg-white">
              {handoff ? (
                <button onClick={() => wa("Hi Destination Royale, I need personalised travel assistance.")}
                  className="w-full flex items-center justify-center gap-2 text-white text-xs font-semibold py-3 rounded-xl"
                  style={{ background: "#005B82" }}>
                  <Send size={13} /> Continue on WhatsApp
                </button>
              ) : (
                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {available.map((q) => (
                    <button key={q} onClick={() => handleQuick(q)}
                      className="w-full flex items-center justify-between gap-2 text-left text-xs text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
                      {q} <ChevronRight size={12} className="shrink-0" style={{ color: "#3FA9F5" }} />
                    </button>
                  ))}
                  {available.length === 0 && (
                    <button onClick={() => wa("Hi Destination Royale, I need further assistance.")}
                      className="w-full flex items-center justify-center gap-2 text-white text-xs font-semibold py-3 rounded-xl"
                      style={{ background: "#005B82" }}>
                      <Send size={13} /> Chat on WhatsApp
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── NAVBAR ────────────────────────────────────────────────────────────────────

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-9 inset-x-0 z-40 border-b border-gray-100 shadow-sm bg-white">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="#home">
            <div className="relative w-12 h-12">
              <Image src="/logo.png" alt="Destination Royale" fill className="object-contain" sizes="48px" priority />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href}
                className="text-sm px-4 py-2 rounded-full transition-colors hover:bg-gray-100"
                style={{ color: "#005B82" }}>
                {l.label}
              </Link>
            ))}
          </nav>

          <button onClick={() => wa("Hi Destination Royale, I'd like to book a trip.")}
            className="hidden md:flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:scale-105"
            style={{ background: "#005B82" }}>
            <Phone size={14} /> Book a Trip
          </button>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "#005B82" }}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            className="fixed inset-x-0 top-[101px] z-40 bg-white border-b border-gray-100 shadow-lg px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="text-sm font-medium py-3 border-b border-gray-50 last:border-0"
                style={{ color: "#005B82" }}>
                {l.label}
              </Link>
            ))}
            <button onClick={() => { wa("Hi Destination Royale, I'd like to book a trip."); setMenuOpen(false); }}
              className="mt-3 text-white font-semibold py-3 rounded-full text-sm"
              style={{ background: "#005B82" }}>
              Book a Trip
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────

function Hero({ onBook }: { onBook: (pkg: Package) => void }) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      if (bgRef.current) bgRef.current.style.transform = `translateY(${window.scrollY * 0.38}px)`;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <section id="home" className="min-h-screen pt-20 flex items-center overflow-hidden relative"
      style={{ background: "linear-gradient(135deg, #e8f4f8 0%, #ffffff 50%, #f0f8ff 100%)" }}>
      {/* Parallax blobs */}
      <div className="absolute top-24 left-0 w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,91,130,0.15), transparent)" }} />
      <div className="absolute top-32 right-0 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(63,169,245,0.15), transparent)" }} />

      {/* Parallax BG layer — subtle pattern behind carousel */}
      <div ref={bgRef}
        className="absolute right-0 top-0 w-1/2 h-full opacity-[0.04] pointer-events-none will-change-transform hidden lg:block"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')", backgroundSize: "cover" }}
        // 📸 Upload: any abstract world map or soft travel texture — fallback is invisible
      />

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center py-16">
        {/* Left */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 text-xs font-medium mb-8"
            style={{ borderColor: "rgba(0,91,130,0.2)", color: "#005B82", background: "rgba(0,91,130,0.05)" }}>
            <Star size={11} style={{ color: "#3FA9F5", fill: "#3FA9F5" }} />
            Trusted by hundreds of Nigerian travelers
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-playfair font-black leading-none mb-6"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: "#005B82" }}>
            Every Journey,<br />
            <em className="not-italic" style={{ color: "#3FA9F5" }}>Perfectly</em><br />
            Planned.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="text-gray-500 text-lg max-w-md mb-10 leading-relaxed">
            Flights, visas, tours, excursions, and honeymoon packages — handled end-to-end so you just show up and enjoy.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            className="flex flex-wrap gap-3">
            <a href="#packages"
              className="flex items-center gap-2 text-white font-semibold px-7 py-4 rounded-full transition-all hover:scale-105 text-sm"
              style={{ background: "#005B82" }}>
              Explore Packages <ArrowRight size={16} />
            </a>
            <button onClick={() => wa("Hi Destination Royale, I'd like to enquire about a trip.")}
              className="flex items-center gap-2 font-semibold px-7 py-4 rounded-full border-2 text-sm transition-all hover:scale-105"
              style={{ borderColor: "#005B82", color: "#005B82" }}>
              <Phone size={15} /> WhatsApp Us
            </button>
          </motion.div>

          {/* Trust strip */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="flex items-center gap-6 mt-10 pt-8 border-t border-gray-100">
            {[["6+", "Destinations"], ["500+", "Travelers"], ["20+", "Countries"], ["5", "Services"]].map(([num, label]) => (
              <div key={label}>
                <div className="font-playfair font-black text-2xl" style={{ color: "#005B82" }}>{num}</div>
                <div className="text-gray-400 text-xs">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — 3D Carousel */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative flex items-center justify-center">
          <Carousel onBook={onBook} />
        </motion.div>
      </div>
    </section>
  );
}

// ── SERVICES ──────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="services" className="py-24 px-6" style={{ background: "#f0f7fb" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#3FA9F5" }}>What We Offer</p>
          <h2 className="font-playfair font-black text-4xl md:text-5xl" style={{ color: "#005B82" }}>
            One Agency.<br />
            <em className="not-italic" style={{ color: "#3FA9F5" }}>Every Journey.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {SERVICES.map(({ icon: Icon, label, desc }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,91,130,0.1)" }}
              className="bg-white p-6 rounded-2xl border border-gray-100 transition-all duration-300 cursor-default">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "rgba(63,169,245,0.1)" }}>
                <Icon size={20} style={{ color: "#005B82" }} />
              </div>
              <h3 className="font-semibold text-sm mb-1" style={{ color: "#005B82" }}>{label}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PACKAGES GRID ─────────────────────────────────────────────────────────────

function PackagesSection({ onBook }: { onBook: (pkg: Package) => void }) {
  return (
    <section id="packages" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#3FA9F5" }}>Upcoming Trips</p>
            <h2 className="font-playfair font-black text-4xl md:text-5xl" style={{ color: "#005B82" }}>
              Where To<br />
              <em className="not-italic" style={{ color: "#3FA9F5" }}>Next?</em>
            </h2>
          </motion.div>
          <button onClick={() => wa("Hi Destination Royale, I'd like to see all available packages.")}
            className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full border-2 transition-all hover:scale-105"
            style={{ borderColor: "#005B82", color: "#005B82" }}>
            All Packages <ArrowRight size={15} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKAGES.map((pkg, i) => (
            <motion.div key={pkg.id}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500 bg-white">
              <div className="relative h-52 overflow-hidden bg-slate-100">
                <Image src={pkg.image} alt={pkg.title} fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                    style={{ background: TAG_COLORS[pkg.tag] ?? "#005B82" }}>{pkg.tag}</span>
                  <span className="text-base">{pkg.flag}</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5">
                  <Clock size={11} style={{ color: "#005B82" }} />
                  <span className="text-xs font-semibold" style={{ color: "#005B82" }}>{pkg.duration}</span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-playfair font-bold text-lg mb-0.5" style={{ color: "#005B82" }}>{pkg.title}</h3>
                <p className="text-gray-400 text-xs mb-3">{pkg.subtitle}</p>
                <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-4">
                  <Clock size={11} /> {pkg.dates}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {pkg.includes.slice(0, 3).map((inc) => (
                    <span key={inc} className="flex items-center gap-1 text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded-full">
                      <Check size={9} style={{ color: "#3FA9F5" }} /> {inc}
                    </span>
                  ))}
                  {pkg.includes.length > 3 && (
                    <span className="text-xs text-gray-400 px-2 py-1">+{pkg.includes.length - 3} more</span>
                  )}
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="font-playfair font-black text-2xl" style={{ color: "#005B82" }}>{pkg.price}</div>
                    <div className="text-gray-400 text-xs">per person sharing</div>
                  </div>
                  <button onClick={() => onBook(pkg)}
                    className="flex items-center gap-1.5 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all hover:scale-105"
                    style={{ background: "#005B82" }}>
                    Book Now <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── VISA SECTION ──────────────────────────────────────────────────────────────

const VISA_STEPS = [
  { step: "01", title: "Tell Us Your Destination", desc: "Share where you want to go and your travel dates via WhatsApp." },
  { step: "02", title: "We Prepare Your Documents", desc: "Our visa experts compile and verify everything required for your application." },
  { step: "03", title: "We Submit on Your Behalf", desc: "We handle all embassy submissions and follow up until approval." },
  { step: "04", title: "You Travel, Stress-Free", desc: "Collect your visa and pack your bags. We handle the rest." },
];

function VisaSection() {
  return (
    <section id="visa" className="py-24 px-6" style={{ background: "#f0f7fb" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#3FA9F5" }}>Visa Processing</p>
            <h2 className="font-playfair font-black text-4xl md:text-5xl mb-6" style={{ color: "#005B82" }}>
              Your Passport.<br />
              <em className="not-italic" style={{ color: "#3FA9F5" }}>Our Expertise.</em>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Visa rejections are stressful and expensive. We have processed visas for Egypt, Qatar, Kenya, Tanzania, Lebanon, Seychelles and more — our team knows exactly what embassies require.
            </p>
            <div className="space-y-3 mb-8">
              {["Expert documentation handling", "Embassy follow-up included", "Egypt, Qatar, Kenya, Tanzania, Lebanon, Seychelles & more", "Start 4 weeks before your travel date"].map((pt) => (
                <div key={pt} className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "rgba(63,169,245,0.15)" }}>
                    <Check size={11} style={{ color: "#3FA9F5" }} />
                  </div>
                  {pt}
                </div>
              ))}
            </div>
            <button onClick={() => wa("Hi Destination Royale, I need help with visa processing.")}
              className="flex items-center gap-2 text-white font-semibold px-7 py-4 rounded-full text-sm transition-all hover:scale-105"
              style={{ background: "#005B82" }}>
              Start My Visa Process <ArrowRight size={15} />
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="space-y-4">
            {VISA_STEPS.map(({ step, title, desc }) => (
              <div key={step}
                className="flex gap-5 items-start bg-white rounded-2xl p-5 border border-gray-100 hover:border-[#3FA9F5]/30 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(0,91,130,0.08)" }}>
                  <span className="font-black text-xs" style={{ color: "#005B82" }}>{step}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1" style={{ color: "#005B82" }}>{title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── WHY US ────────────────────────────────────────────────────────────────────

function WhyUs() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#3FA9F5" }}>Why Destination Royale</p>
          <h2 className="font-playfair font-black text-4xl md:text-5xl" style={{ color: "#005B82" }}>
            Travel Without<br />
            <em className="not-italic" style={{ color: "#3FA9F5" }}>The Headache.</em>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Shield, title: "End-to-End Service", desc: "Visa, flights, hotels, transfers — every detail handled so you focus on the experience, not the logistics." },
            { icon: Star, title: "Curated Packages", desc: "Every destination we offer has been researched and curated. No generic tours — just remarkable experiences." },
            { icon: Phone, title: "Always Reachable", desc: "Chat our team any time on WhatsApp. Real people, real answers — not automated bots." },
          ].map((item, i) => (
            <motion.div key={item.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 text-left">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "rgba(63,169,245,0.1)" }}>
                <item.icon size={22} style={{ color: "#005B82" }} />
              </div>
              <h3 className="font-playfair font-bold text-lg mb-3" style={{ color: "#005B82" }}>{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA BAND ──────────────────────────────────────────────────────────────────

function CTABand() {
  return (
    <section className="py-20 px-6 relative overflow-hidden" style={{ background: "#005B82" }}>
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="font-playfair font-black text-white mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
          Ready to See the <em className="not-italic" style={{ color: "#3FA9F5" }}>World?</em>
        </h2>
        <p className="text-white/60 text-lg mb-10">Tell us where you want to go. We&apos;ll handle the rest.</p>
        <button onClick={() => wa("Hi Destination Royale, I'm ready to plan my trip. Please help me get started.")}
          className="inline-flex items-center gap-3 text-white font-bold text-lg px-10 py-5 rounded-full transition-all hover:scale-105"
          style={{ background: "#3FA9F5" }}>
          Chat on WhatsApp <ArrowRight size={20} />
        </button>
      </motion.div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer id="contact" className="py-16 px-6 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="relative w-12 h-12 mb-4">
            <Image src="/logo.png" alt="Destination Royale" fill className="object-contain" sizes="48px" />
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Lagos&apos; trusted travel agency for curated packages, visa processing, tours, excursions, and honeymoon getaways.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-sm mb-4 tracking-widest uppercase" style={{ color: "#005B82" }}>Quick Links</h4>
          <div className="space-y-2">
            {NAV_LINKS.slice(1).map((l) => (
              <Link key={l.href} href={l.href} className="block text-sm text-gray-400 hover:text-gray-700 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-sm mb-4 tracking-widest uppercase" style={{ color: "#005B82" }}>Contact</h4>
          <div className="space-y-3">
            <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer"
              className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-gray-700 transition-colors">
              <Phone size={13} style={{ color: "#3FA9F5" }} /> 07037767246
            </a>
            <a href={`https://wa.me/${WA_NUMBER_2}`} target="_blank" rel="noreferrer"
              className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-gray-700 transition-colors">
              <Phone size={13} style={{ color: "#3FA9F5" }} /> 08058713944
            </a>
            <a href={`mailto:${EMAIL}`}
              className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-gray-700 transition-colors">
              <Mail size={13} style={{ color: "#3FA9F5" }} /> {EMAIL}
            </a>
            <div className="flex items-start gap-2.5 text-sm text-gray-400">
              <MapPin size={13} className="mt-0.5 shrink-0" style={{ color: "#3FA9F5" }} />
              Gbagada, Lagos, Nigeria
            </div>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer"
              className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-gray-700 transition-colors">
              <Instagram size={13} style={{ color: "#3FA9F5" }} /> @destination_royale
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-gray-300 text-xs">© 2026 Destination Royale Services. All rights reserved.</p>
        <p className="text-gray-300 text-xs">
          Demo by{" "}
          <a href="https://primyst-solutions.vercel.app" target="_blank" rel="noreferrer"
            style={{ color: "#005B82" }} className="hover:text-gray-500 transition-colors">
            Primyst Solutions
          </a>
        </p>
      </div>
    </footer>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);

  return (
    <div className="bg-white text-gray-900 min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero onBook={setSelectedPkg} />
      <Services />
      <PackagesSection onBook={setSelectedPkg} />
      <VisaSection />
      <WhyUs />
      <CTABand />
      <Footer />
      <ChatWidget />
      <BookingModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />
    </div>
  );
}
