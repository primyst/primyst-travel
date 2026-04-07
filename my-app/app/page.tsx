"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Plane, Globe, Shield, Heart, Anchor, MapPin,
  Phone, Mail, Instagram, ArrowRight, Star,
  Check, Menu, X, MessageCircle, Send, ChevronRight,
  Clock, FileText, Camera, Sparkles, TrendingUp,
  Users, BadgeCheck, Calendar, ArrowUpRight
} from "lucide-react";

// ── DATA ──────────────────────────────────────────────────────────────────────

const WA_NUMBER = "2347037767246";
const WA_NUMBER_2 = "2348058713944";
const EMAIL = "info.destinationroyale@gmail.com";
const INSTAGRAM = "https://instagram.com/destination_royale";

// Optimized WhatsApp opener with fallback
const openWhatsApp = (msg: string) => {
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  if (typeof window !== 'undefined') {
    window.open(url, "_blank", "noopener,noreferrer");
  }
};

const NAV_LINKS = [
  { label: "Packages", href: "#packages" },
  { label: "Visa Help", href: "#visa" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
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
  spotsLeft?: number;
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
    spotsLeft: 4,
    highlights: ["Giza Pyramids & The Sphinx", "Quad biking & Camel ride", "Ras Mohammed snorkeling", "Bedouin Dinner"],
    includes: ["Return flights", "2N Cairo + 3N Sharm hotel", "Visa on arrival", "Airport transfers", "All tours"],
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
    spotsLeft: 6,
    highlights: ["4 Nights beach resort", "Haller Park wildlife", "Wasini Island tour", "Dhow boat ride"],
    includes: ["Economy return ticket", "Beach resort B&D", "Airport transfers", "All tours"],
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
    spotsLeft: 8,
    highlights: ["4 Nights beach resort", "Marine tour & boat ride", "Fish feeding", "Seychelles eTA included"],
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
    spotsLeft: 12,
    highlights: ["Villagio Mall Gondola", "Museum of Illusions", "Desert Safari", "Qatar Visa included"],
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
    spotsLeft: 5,
    highlights: ["Swim with turtles", "Stone Town & Prison Island", "Mnemba Island", "Kayaking"],
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
    spotsLeft: 3,
    highlights: ["Snowmobile & Paragliding", "Cable car ride", "Jeita Grotto boat ride", "Harissa visit"],
    includes: ["Economy return ticket", "4N hotel B&B", "Airport transfers", "All activities"],
  },
];

const TAG_COLORS: Record<string, string> = {
  "Hot Deal": "bg-orange-500",
  "Best Value": "bg-sky-500",
  "Most Popular": "bg-emerald-600",
  "Budget Pick": "bg-violet-600",
  "New": "bg-cyan-700",
  "Adventure": "bg-rose-600",
};

const SERVICES = [
  { icon: Plane, label: "Flight Deals", desc: "Best fares on economy & business class worldwide", stat: "Save up to 40%" },
  { icon: Globe, label: "Travel Packages", desc: "Curated group & private tours across the globe", stat: "6 Destinations" },
  { icon: FileText, label: "Visa Processing", desc: "20+ countries, full documentation handled", stat: "98% Approval" },
  { icon: Anchor, label: "Excursions", desc: "Day trips, island hops & adventure activities", stat: "50+ Activities" },
  { icon: Heart, label: "Honeymoon Packages", desc: "Romantic escapes tailored for two", stat: "All-Inclusive" },
  { icon: Camera, label: "Tours", desc: "Expert-guided cultural & sightseeing tours", stat: "Expert Guides" },
];

// ── AUTO-SLIDING INFINITE CAROUSEL (Optimized for performance) ───────────────

function AutoSlidingCarousel({ onBook }: { onBook: (pkg: Package) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  
  // Double the items for seamless infinite loop
  const duplicatedPackages = [...PACKAGES, ...PACKAGES];
  
  // Calculate total width for one set
  const itemWidth = 320; // card width + gap
  const totalWidth = PACKAGES.length * itemWidth;

  useEffect(() => {
    if (isHovered) return;
    
    let animationId: number;
    let currentX = 0;
    
    const animate = () => {
      currentX -= 0.5; // pixels per frame - adjust for speed
      if (Math.abs(currentX) >= totalWidth) {
        currentX = 0;
      }
      x.set(currentX);
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationId);
  }, [isHovered, x, totalWidth]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient masks for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#f0f7fb] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#f0f7fb] to-transparent z-10 pointer-events-none" />
      
      <motion.div 
        className="flex gap-6"
        style={{ x, width: "max-content" }}
      >
        {duplicatedPackages.map((pkg, idx) => (
          <motion.div
            key={`${pkg.id}-${idx}`}
            className="flex-shrink-0 w-72 cursor-pointer group"
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            onClick={() => onBook(pkg)}
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group-hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden bg-slate-200">
                <Image 
                  src={pkg.image} 
                  alt={pkg.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="288px"
                  loading={idx < 4 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Urgency indicator */}
                {pkg.spotsLeft && pkg.spotsLeft <= 5 && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    {pkg.spotsLeft} spots left
                  </div>
                )}
                
                <div className="absolute top-3 left-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full text-white ${TAG_COLORS[pkg.tag] || "bg-[#005B82]"}`}>
                    {pkg.tag}
                  </span>
                </div>
                
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-bold text-lg leading-tight">{pkg.title}</p>
                  <p className="text-white/80 text-xs mt-0.5">{pkg.flag} {pkg.subtitle}</p>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-gray-400 text-xs">From</p>
                    <p className="font-black text-xl text-[#005B82]">{pkg.price}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    <Clock size={11} /> {pkg.duration}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {pkg.highlights.slice(0, 2).map((h) => (
                    <span key={h} className="text-[10px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full">
                      {h}
                    </span>
                  ))}
                </div>
                
                <button className="w-full flex items-center justify-center gap-2 bg-[#005B82] text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-[#004a6b] transition-colors">
                  Book Now <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// ── BOOKING MODAL (Optimized for conversions) ─────────────────────────────

function BookingModal({ pkg, onClose }: { pkg: Package | null; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", phone: "", travelers: "2", date: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!pkg) return null;

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.phone.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate brief processing for UX
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const msg = `Hi Destination Royale! I'd like to book the *${pkg.title}* package (${pkg.dates}).\n\nName: ${formData.name}\nPhone: ${formData.phone}\nTravelers: ${formData.travelers}\nPreferred Date: ${formData.date || pkg.dates}\nPackage: ${pkg.price} per person\n\nPlease guide me on next steps.`;
    
    openWhatsApp(msg);
    setIsSubmitting(false);
    onClose();
    setStep(1);
    setFormData({ name: "", phone: "", travelers: "2", date: "" });
  };

  return (
    <AnimatePresence>
      {pkg && (
        <motion.div
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Progress bar */}
            <div className="h-1 bg-gray-100">
              <motion.div 
                className="h-full bg-[#005B82]" 
                initial={{ width: "0%" }}
                animate={{ width: step === 1 ? "50%" : "100%" }}
              />
            </div>

            <div className="relative h-48 bg-slate-200">
              <Image src={pkg.image} alt={pkg.title} fill className="object-cover" sizes="448px" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <button onClick={onClose} className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 transition-colors">
                <X size={16} className="text-white" />
              </button>
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-black text-2xl">{pkg.title}</p>
                <p className="text-white/80 text-sm">{pkg.flag} {pkg.subtitle}</p>
              </div>
            </div>

            <div className="p-6">
              {step === 1 ? (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-gray-400 text-xs">Price per person</p>
                      <p className="font-black text-3xl text-[#005B82]">{pkg.price}</p>
                    </div>
                    {pkg.spotsLeft && pkg.spotsLeft <= 5 && (
                      <div className="text-right">
                        <p className="text-red-500 text-xs font-semibold">Only {pkg.spotsLeft} spots left</p>
                        <p className="text-gray-400 text-xs">Book now</p>
                      </div>
                    )}
                  </div>

                  <div className="mb-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#005B82] mb-3">What's Included</p>
                    <div className="flex flex-wrap gap-2">
                      {pkg.includes.map((inc) => (
                        <span key={inc} className="flex items-center gap-1 text-xs bg-slate-50 text-slate-600 px-3 py-1.5 rounded-full border border-slate-100">
                          <Check size={10} className="text-[#3FA9F5]" /> {inc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => setStep(2)}
                    className="w-full bg-[#005B82] text-white font-bold py-3.5 rounded-xl hover:bg-[#004a6b] transition-colors flex items-center justify-center gap-2"
                  >
                    Continue to Book <ArrowRight size={16} />
                  </button>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#005B82] mb-4">Almost there!</p>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-xs text-gray-500 mb-1.5 block font-medium">Full Name *</label>
                      <input 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="e.g. Amaka Johnson"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#3FA9F5] focus:ring-2 focus:ring-[#3FA9F5]/20 transition-all"
                        autoFocus
                      />
                    </div>
                    
                    <div>
                      <label className="text-xs text-gray-500 mb-1.5 block font-medium">WhatsApp Number *</label>
                      <input 
                        value={formData.phone} 
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="e.g. 0703 776 7246"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#3FA9F5] focus:ring-2 focus:ring-[#3FA9F5]/20 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500 mb-1.5 block font-medium">Travelers</label>
                        <select 
                          value={formData.travelers} 
                          onChange={(e) => setFormData({...formData, travelers: e.target.value})}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#3FA9F5] bg-white"
                        >
                          {["1", "2", "3", "4", "5", "6+"].map((n) => (
                            <option key={n} value={n}>{n} {n === "1" ? "Person" : "People"}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1.5 block font-medium">Travel Date</label>
                        <input 
                          type="date"
                          value={formData.date} 
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#3FA9F5]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => setStep(1)}
                      className="flex-1 border-2 border-gray-200 text-gray-600 font-semibold py-3.5 rounded-xl hover:border-gray-300 transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      onClick={handleSubmit}
                      disabled={!formData.name.trim() || !formData.phone.trim() || isSubmitting}
                      className="flex-[2] bg-[#005B82] text-white font-bold py-3.5 rounded-xl hover:bg-[#004a6b] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                          <Sparkles size={16} />
                        </motion.div>
                      ) : (
                        <>Send to WhatsApp <Send size={16} /></>
                      )}
                    </button>
                  </div>
                  
                  <p className="text-center text-gray-400 text-xs mt-4 flex items-center justify-center gap-1">
                    <BadgeCheck size={12} /> You'll be connected to our team instantly
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── ENHANCED CHAT WIDGET (Customer Assistant) ────────────────────────────────

type Msg = { from: "bot" | "user"; text: string; time?: string };

const QUICK_QUESTIONS = [
  { q: "How do I book?", icon: Calendar },
  { q: "What's included?", icon: Check },
  { q: "Visa processing time?", icon: Clock },
  { q: "Payment plans?", icon: TrendingUp },
  { q: "Destinations?", icon: Globe },
  { q: "Contact team?", icon: Phone },
];

const ANSWERS: Record<string, string> = {
  "How do I book?": "Tap 'Book Now' on any package, fill in your details, and you'll be instantly connected to our team on WhatsApp to confirm your booking. No advance payment needed to inquire!",
  "What's included?": "All prices are per person sharing and include: ✈️ Return flights, 🏨 Hotel accommodation, 🚗 Airport transfers, and 🎯 Listed tours. Full details on each package card.",
  "Visa processing time?": "Typically 5–15 business days depending on the country. We recommend starting at least 4 weeks before travel. We handle Egypt, Qatar, Kenya, Tanzania, Lebanon, Seychelles & more!",
  "Payment plans?": "Yes! Secure your spot with a deposit (usually 30%), balance spread before travel. Chat with us for flexible payment options tailored to you.",
  "Destinations?": "Currently: Egypt, Mombasa (Kenya), Seychelles, Qatar, Zanzibar (Tanzania), Beirut (Lebanon). New destinations added monthly!",
  "Contact team?": "📱 WhatsApp: 07037767246 or 08058713944\n📧 Email: info.destinationroyale@gmail.com\n📍 Office: Gbagada, Lagos",
};

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "👋 Hi! Welcome to Destination Royale! I can help you book a trip, check availability, or answer questions. What would you like to know?", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) },
  ]);
  const [hasInteracted, setHasInteracted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-open after 15 seconds if not interacted
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted && !isOpen) {
        setIsOpen(true);
        setMessages(prev => [...prev, { 
          from: "bot", 
          text: "💡 Quick tip: Our Egypt & Mombasa packages for April are filling up fast! Only a few spots left. Interested?",
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }]);
      }
    }, 15000);
    return () => clearTimeout(timer);
  }, [hasInteracted, isOpen]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleQuickQuestion = (question: string) => {
    setHasInteracted(true);
    const answer = ANSWERS[question];
    const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    setMessages(prev => [
      ...prev, 
      { from: "user", text: question, time },
      { from: "bot", text: answer, time }
    ]);
  };

  const handleHandoff = () => {
    openWhatsApp("Hi Destination Royale! I need personalized travel assistance.");
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button 
        onClick={() => { setIsOpen(p => !p); setHasInteracted(true); }}
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#005B82] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[#004a6b] transition-colors"
      >
        <AnimatePresence mode="wait">
          {isOpen ? <X size={22} key="close" /> : <MessageCircle size={22} key="open" />}
        </AnimatePresence>
        
        {/* Notification dot */}
        {!hasInteracted && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[600px]"
          >
            {/* Header */}
            <div className="bg-[#005B82] p-4 flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Image src="/logo.png" alt="DR" width={32} height={32} className="object-contain" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#005B82]" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">Destination Royale</p>
                <p className="text-white/70 text-xs">Travel Assistant • Online</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 max-h-80">
              {messages.map((msg, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] ${msg.from === "user" ? "bg-[#005B82] text-white rounded-2xl rounded-br-none" : "bg-white text-gray-700 rounded-2xl rounded-bl-none shadow-sm"} px-4 py-2.5`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    {msg.time && <p className={`text-[10px] mt-1 ${msg.from === "user" ? "text-white/60" : "text-gray-400"}`}>{msg.time}</p>}
                  </div>
                </motion.div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Quick actions */}
            <div className="p-3 bg-white border-t border-gray-100">
              <p className="text-xs text-gray-400 mb-2 font-medium">Quick Questions:</p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {QUICK_QUESTIONS.map(({ q, icon: Icon }) => (
                  <button
                    key={q}
                    onClick={() => handleQuickQuestion(q)}
                    className="flex items-center gap-2 text-left text-xs text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
                  >
                    <Icon size={12} className="text-[#3FA9F5]" />
                    {q}
                  </button>
                ))}
              </div>
              
              <button
                onClick={handleHandoff}
                className="w-full bg-[#005B82] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#004a6b] transition-colors"
              >
                <Send size={14} /> Chat on WhatsApp
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── NAVBAR ────────────────────────────────────────────────────────────────────

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-2" : "bg-transparent py-4"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <Image src="/logo.png" alt="Destination Royale" fill className="object-contain" sizes="40px" priority />
            </div>
            <span className={`font-bold text-lg hidden sm:block ${isScrolled ? "text-[#005B82]" : "text-[#005B82]"}`}>
              Destination Royale
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-sm px-4 py-2 rounded-full text-gray-600 hover:text-[#005B82] hover:bg-gray-100 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => openWhatsApp("Hi Destination Royale, I'd like to book a trip.")}
              className="hidden sm:flex items-center gap-2 bg-[#005B82] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#004a6b] transition-all hover:scale-105"
            >
              <Phone size={14} /> Book Now
            </button>
            
            <button 
              className="md:hidden p-2 text-[#005B82]"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-30 bg-white border-b border-gray-100 shadow-lg p-4 md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-700 font-medium py-3 px-4 rounded-xl hover:bg-gray-50"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => { openWhatsApp("Hi Destination Royale, I'd like to book a trip."); setMobileOpen(false); }}
                className="mt-2 bg-[#005B82] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <Phone size={16} /> Book a Trip
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── HERO SECTION (Conversion-optimized) ─────────────────────────────────────

function Hero({ onBook }: { onBook: (pkg: Package) => void }) {
  return (
    <section id="home" className="relative min-h-screen pt-20 pb-16 flex items-center bg-gradient-to-br from-[#e8f4f8] via-white to-[#f0f8ff] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#005B82]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#3FA9F5]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Social proof badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#005B82]/20 rounded-full px-4 py-2 mb-6 shadow-sm"
            >
              <div className="flex -space-x-2">
                {[1,2,3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-[#005B82] to-[#3FA9F5] border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">
                    {String.fromCharCode(64+i)}
                  </div>
                ))}
              </div>
              <span className="text-xs font-medium text-gray-600">Trusted by 500+ Nigerian travelers</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#005B82] leading-tight mb-6">
              Travel to Your Dream <span className="text-[#3FA9F5]">Destination</span> Without the Stress
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              We handle everything — flights, visas, hotels, tours — so you just pack and show up. 
              Join 500+ Nigerians who've traveled hassle-free with us.
            </p>

            {/* CTA buttons with urgency */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button
                onClick={() => {
                  const element = document.getElementById('packages');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group flex items-center justify-center gap-2 bg-[#005B82] text-white font-bold px-8 py-4 rounded-full hover:bg-[#004a6b] transition-all hover:scale-105 shadow-lg shadow-[#005B82]/20"
              >
                View Packages <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => openWhatsApp("Hi Destination Royale, I need help planning my trip.")}
                className="flex items-center justify-center gap-2 bg-white text-[#005B82] font-bold px-8 py-4 rounded-full border-2 border-[#005B82] hover:bg-gray-50 transition-all"
              >
                <MessageCircle size={18} /> Get Free Consultation
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <BadgeCheck size={16} className="text-[#3FA9F5]" />
                <span>Visa Assistance</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-[#3FA9F5]" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-[#3FA9F5]" />
                <span>Group Discounts</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Auto-sliding carousel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <p className="text-sm font-semibold text-[#005B82] mb-4 flex items-center gap-2">
                <Sparkles size={16} /> Trending Packages
              </p>
              <AutoSlidingCarousel onBook={onBook} />
            </div>
          </motion.div>
        </div>

        {/* Mobile carousel preview */}
        <div className="lg:hidden mt-12">
          <p className="text-sm font-semibold text-[#005B82] mb-4 text-center">Trending Packages</p>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
            {PACKAGES.slice(0, 3).map((pkg) => (
              <div 
                key={pkg.id} 
                className="flex-shrink-0 w-72 snap-center"
                onClick={() => onBook(pkg)}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100">
                  <div className="relative h-40 bg-slate-200">
                    <Image src={pkg.image} alt={pkg.title} fill className="object-cover" sizes="288px" />
                    <div className="absolute top-3 left-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full text-white ${TAG_COLORS[pkg.tag]}`}>
                        {pkg.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-[#005B82]">{pkg.title}</p>
                    <p className="text-sm text-gray-500">{pkg.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SERVICES SECTION ───────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="services" className="py-20 bg-[#f0f7fb]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-bold text-[#3FA9F5] uppercase tracking-widest mb-2">What We Offer</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#005B82]">
            One Agency. Every Journey.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-default group"
            >
              <div className="w-12 h-12 bg-[#005B82]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#005B82] transition-colors">
                <service.icon size={24} className="text-[#005B82] group-hover:text-white transition-colors" />
              </div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-[#005B82]">{service.label}</h3>
                <span className="text-xs font-semibold text-[#3FA9F5] bg-[#3FA9F5]/10 px-2 py-1 rounded-full">
                  {service.stat}
                </span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PACKAGES GRID (Conversion optimized) ────────────────────────────────────

function PackagesSection({ onBook }: { onBook: (pkg: Package) => void }) {
  return (
    <section id="packages" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-bold text-[#3FA9F5] uppercase tracking-widest mb-2">Upcoming Trips</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#005B82]">
              Where To Next?
            </h2>
          </div>
          <button
            onClick={() => openWhatsApp("Hi Destination Royale, show me all available packages.")}
            className="flex items-center gap-2 text-[#005B82] font-semibold hover:gap-3 transition-all"
          >
            View All Packages <ArrowUpRight size={18} />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden bg-slate-200">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={i < 3 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Urgency badge */}
                {pkg.spotsLeft && pkg.spotsLeft <= 5 && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 animate-pulse">
                    <Clock size={12} /> {pkg.spotsLeft} spots left
                  </div>
                )}
                
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full text-white ${TAG_COLORS[pkg.tag]}`}>
                    {pkg.tag}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="font-bold text-xl">{pkg.title}</p>
                  <p className="text-sm text-white/80">{pkg.flag} {pkg.subtitle}</p>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {pkg.dates}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {pkg.duration}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {pkg.includes.slice(0, 3).map((inc) => (
                    <span key={inc} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-full flex items-center gap-1">
                      <Check size={10} className="text-[#3FA9F5]" /> {inc}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-400">Per person sharing</p>
                    <p className="text-2xl font-black text-[#005B82]">{pkg.price}</p>
                  </div>
                  <button
                    onClick={() => onBook(pkg)}
                    className="bg-[#005B82] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-[#004a6b] transition-colors flex items-center gap-2"
                  >
                    Book <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust banner */}
        <div className="mt-12 bg-[#005B82]/5 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#005B82] rounded-full flex items-center justify-center text-white">
              <Phone size={20} />
            </div>
            <div>
              <p className="font-bold text-[#005B82]">Need a custom package?</p>
              <p className="text-sm text-gray-600">We can tailor any trip to your preferences</p>
            </div>
          </div>
          <button
            onClick={() => openWhatsApp("Hi Destination Royale, I need a custom travel package.")}
            className="bg-[#005B82] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#004a6b] transition-colors whitespace-nowrap"
          >
            Request Custom Quote
          </button>
        </div>
      </div>
    </section>
  );
}

// ── VISA SECTION ─────────────────────────────────────────────────────────────

function VisaSection() {
  return (
    <section id="visa" className="py-20 bg-[#f0f7fb]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-bold text-[#3FA9F5] uppercase tracking-widest mb-2">Visa Processing</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#005B82] mb-4">
              Your Passport. Our Expertise.
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Visa rejections are expensive and stressful. We've processed 1000+ visas with a 98% approval rate. 
              We know exactly what embassies want to see.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Expert documentation review & preparation",
                "Embassy appointment scheduling & follow-up",
                "Egypt, Qatar, Kenya, Tanzania, Lebanon, Seychelles & more",
                "Start 4 weeks before travel for best results"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <div className="w-6 h-6 bg-[#3FA9F5]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-[#005B82]" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <button
              onClick={() => openWhatsApp("Hi Destination Royale, I need help with visa processing.")}
              className="bg-[#005B82] text-white font-bold px-8 py-4 rounded-full hover:bg-[#004a6b] transition-all hover:scale-105 flex items-center gap-2"
            >
              Start My Visa Process <ArrowRight size={18} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
          >
            <h3 className="font-bold text-[#005B82] mb-6 text-lg">Simple 4-Step Process</h3>
            <div className="space-y-6">
              {[
                { step: "1", title: "Share Your Destination", desc: "Tell us where you want to go and your travel dates" },
                { step: "2", title: "Document Review", desc: "We review and prepare all required documentation" },
                { step: "3", title: "Submission", desc: "We handle embassy submission and track your application" },
                { step: "4", title: "Approval & Travel", desc: "Collect your visa and pack your bags!" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 bg-[#005B82] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-[#005B82]">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── WHY US / SOCIAL PROOF ───────────────────────────────────────────────────

function WhyUs() {
  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-bold text-[#3FA9F5] uppercase tracking-widest mb-2">Why Choose Us</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#005B82]">
            Travel Without The Headache
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { 
              icon: Shield, 
              title: "End-to-End Service", 
              desc: "From visa to touchdown, we handle every detail. You just show up and enjoy the experience.",
              stat: "0 hassle"
            },
            { 
              icon: Star, 
              title: "Curated Experiences", 
              desc: "Every package is personally vetted. No generic tours—only remarkable, memorable journeys.",
              stat: "500+ happy travelers"
            },
            { 
              icon: Phone, 
              title: "Always Reachable", 
              desc: "Real humans on WhatsApp, not bots. Get answers in minutes, not days.",
              stat: "< 5 min response"
            }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#f8fafc] p-8 rounded-2xl border border-gray-100 hover:border-[#3FA9F5]/30 transition-colors"
            >
              <div className="w-12 h-12 bg-[#005B82]/10 rounded-xl flex items-center justify-center mb-4">
                <item.icon size={24} className="text-[#005B82]" />
              </div>
              <h3 className="font-bold text-xl text-[#005B82] mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{item.desc}</p>
              <p className="text-sm font-semibold text-[#3FA9F5]">{item.stat}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { num: "6+", label: "Destinations" },
            { num: "500+", label: "Happy Travelers" },
            { num: "98%", label: "Visa Success" },
            { num: "4.9★", label: "Average Rating" }
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 bg-[#005B82] rounded-2xl text-white">
              <p className="text-3xl font-black mb-1">{stat.num}</p>
              <p className="text-sm text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA SECTION ───────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="py-20 bg-[#005B82] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "24px 24px"
        }} />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
            Ready to See the World?
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
            Don't let planning stress hold you back. Let's turn your travel dreams into reality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => openWhatsApp("Hi Destination Royale, I'm ready to book my trip!")}
              className="bg-white text-[#005B82] font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Send size={18} /> Start on WhatsApp
            </button>
            
            <a
              href={`tel:${WA_NUMBER}`}
              className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Phone size={18} /> Call Us Now
            </a>
          </div>

          <p className="text-white/50 text-sm mt-6">
            Based in Gbagada, Lagos • Serving travelers nationwide
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer id="contact" className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10">
                <Image src="/logo.png" alt="Destination Royale" fill className="object-contain" sizes="40px" />
              </div>
              <span className="font-bold text-xl text-[#005B82]">Destination Royale</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-4">
              Lagos' trusted travel agency for curated packages, visa processing, tours, and honeymoon getaways. 
              We make travel simple for Nigerians.
            </p>
            <div className="flex gap-4">
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#005B82] hover:bg-[#005B82] hover:text-white transition-colors shadow-sm">
                <Instagram size={18} />
              </a>
              <a href={`https://wa.me/${WA_NUMBER}`} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#005B82] hover:bg-[#005B82] hover:text-white transition-colors shadow-sm">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#005B82] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-[#005B82] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#005B82] mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-[#3FA9F5]" />
                <a href={`tel:${WA_NUMBER}`} className="hover:text-[#005B82]">0703 776 7246</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-[#3FA9F5]" />
                <a href={`tel:${WA_NUMBER_2}`} className="hover:text-[#005B82]">0805 871 3944</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-[#3FA9F5]" />
                <a href={`mailto:${EMAIL}`} className="hover:text-[#005B82]">{EMAIL}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-[#3FA9F5] mt-0.5" />
                <span>Gbagada, Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© 2026 Destination Royale Services. All rights reserved.</p>
          <p className="text-gray-400 text-sm">
            Crafted with care for Nigerian travelers 🇳🇬
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero onBook={setSelectedPkg} />
      <Services />
      <PackagesSection onBook={setSelectedPkg} />
      <VisaSection />
      <WhyUs />
      <CTASection />
      <Footer />
      
      <ChatWidget />
      <BookingModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />
    </main>
  );
}
