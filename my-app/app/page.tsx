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

// UPDATED: pureQ T&T Contact Details - REPLACE WITH YOUR ACTUAL DETAILS
const WA_NUMBER = "234XXXXXXXXXX";  // Replace with your WhatsApp number
const WA_NUMBER_2 = "234XXXXXXXXXX"; // Replace with your second number (optional)
const EMAIL = "hello@pureqtravels.com"; // Replace with your email
const INSTAGRAM = "https://instagram.com/pureqtravels"; // Replace with your Instagram
const COMPANY_NAME = "pureQ T&T";
const COMPANY_FULL_NAME = "pureQ Travel & Tours";
const TAGLINE = "Your Journey, Our Passion";

// Brand Colors - UPDATED for pureQ (fresh, modern teal/coral palette)
const PRIMARY_COLOR = "#0D9488";     // Teal-600 - main brand color
const PRIMARY_DARK = "#0F766E";      // Teal-700 - hover states
const ACCENT_COLOR = "#F97316";      // Orange-500 - accents/CTAs
const SECONDARY_COLOR = "#14B8A6";   // Teal-500 - secondary elements

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

// UPDATED: Sample packages with generic content - REPLACE WITH YOUR ACTUAL PACKAGES
const PACKAGES: Package[] = [
  {
    id: "dubai",
    title: "Dubai",
    subtitle: "City of Gold Experience",
    price: "₦1,850,000",
    dates: "May 15 – 20",
    duration: "5 Nights",
    tag: "Hot Deal",
    flag: "🇦🇪",
    image: "/images/dubai.jpg", // Update image paths
    spotsLeft: 4,
    highlights: ["Burj Khalifa visit", "Desert Safari", "Dhow Cruise Dinner", "Dubai Mall Tour"],
    includes: ["Return flights", "4-star hotel", "UAE Visa", "Airport transfers", "Daily breakfast"],
  },
  {
    id: "maldives",
    title: "Maldives",
    subtitle: "Island Paradise Escape",
    price: "₦2,200,000",
    dates: "Jun 10 – 15",
    duration: "5 Nights",
    tag: "Most Popular",
    flag: "🇲🇻",
    image: "/images/maldives.jpg",
    spotsLeft: 6,
    highlights: ["Overwater villa stay", "Snorkeling excursion", "Sunset dolphin cruise", "Spa treatment"],
    includes: ["Return flights", "Water villa", "Speedboat transfer", "All-inclusive meals"],
  },
  {
    id: "singapore",
    title: "Singapore",
    subtitle: "Lion City Adventure",
    price: "₦1,650,000",
    dates: "Jul 5 – 10",
    duration: "5 Nights",
    tag: "Best Value",
    flag: "🇸🇬",
    image: "/images/singapore.jpg",
    spotsLeft: 8,
    highlights: ["Marina Bay Sands", "Sentosa Island", "Gardens by the Bay", "Night Safari"],
    includes: ["Return flights", "Boutique hotel", "Singapore Visa", "Airport transfers", "City tour"],
  },
  {
    id: "thailand",
    title: "Thailand",
    subtitle: "Bangkok & Phuket Combo",
    price: "₦1,450,000",
    dates: "Aug 12 – 19",
    duration: "7 Nights",
    tag: "Budget Pick",
    flag: "🇹🇭",
    image: "/images/thailand.jpg",
    spotsLeft: 12,
    highlights: ["Grand Palace tour", "Phi Phi Islands", "Floating Market", "Thai cooking class"],
    includes: ["Return flights", "3N Bangkok + 4N Phuket", "Thai Visa", "All transfers"],
  },
  {
    id: "southafrica",
    title: "South Africa",
    subtitle: "Cape Town & Safari",
    price: "₦2,100,000",
    dates: "Sep 8 – 15",
    duration: "7 Nights",
    tag: "Adventure",
    flag: "🇿🇦",
    image: "/images/southafrica.jpg",
    spotsLeft: 5,
    highlights: ["Table Mountain", "Kruger Safari", "Cape Winelands", "Robben Island"],
    includes: ["Return flights", "4-star hotels", "SA Visa", "Safari tour", "All transfers"],
  },
  {
    id: "morocco",
    title: "Morocco",
    subtitle: "Marrakech & Desert",
    price: "₦1,750,000",
    dates: "Oct 20 – 27",
    duration: "7 Nights",
    tag: "New",
    flag: "🇲🇦",
    image: "/images/morocco.jpg",
    spotsLeft: 3,
    highlights: ["Sahara Desert camp", "Marrakech medina", "Blue City Chefchaouen", "Atlas Mountains"],
    includes: ["Return flights", "Riad stays", "Morocco Visa", "Desert tour", "All transfers"],
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
  { icon: Plane, label: "Flight Booking", desc: "Competitive rates on domestic & international flights", stat: "Save 30%" },
  { icon: Globe, label: "Holiday Packages", desc: "Curated getaways for every budget and style", stat: "20+ Destinations" },
  { icon: FileText, label: "Visa Services", desc: "Hassle-free visa processing for major countries", stat: "95% Success" },
  { icon: Anchor, label: "Tour Excursions", desc: "Guided tours and adventure activities worldwide", stat: "100+ Tours" },
  { icon: Heart, label: "Honeymoon Specials", desc: "Romantic packages designed for couples", stat: "All-Inclusive" },
  { icon: Camera, label: "Travel Insurance", desc: "Comprehensive coverage for peace of mind", stat: "Global Cover" },
];

// ── TEXT LOGO COMPONENT ──────────────────────────────────────────────────────

function TextLogo({ className = "", size = "default" }: { className?: string; size?: "small" | "default" | "large" }) {
  const sizeClasses = {
    small: "text-lg",
    default: "text-xl",
    large: "text-2xl"
  };
  
  return (
    <div className={`font-bold tracking-tight ${sizeClasses[size]} ${className}`}>
      <span className="text-[#0D9488]">pure</span>
      <span className="text-[#F97316]">Q</span>
      <span className="text-gray-600 text-sm font-normal ml-1">T&T</span>
    </div>
  );
}

// ── AUTO-SLIDING INFINITE CAROUSEL ───────────────────────────────────────────

function AutoSlidingCarousel({ onBook }: { onBook: (pkg: Package) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);

  const duplicatedPackages = [...PACKAGES, ...PACKAGES];
  const itemWidth = 320;
  const totalWidth = PACKAGES.length * itemWidth;

  useEffect(() => {
    if (isHovered) return;
    let animationId: number;
    let currentX = 0;

    const animate = () => {
      currentX -= 0.5;
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
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#f0fdfa] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#f0fdfa] to-transparent z-10 pointer-events-none" />

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
                <div className="absolute inset-0 bg-gradient-to-br from-[#0D9488]/20 to-[#14B8A6]/20 flex items-center justify-center text-[#0D9488]">
                  <span className="text-4xl">{pkg.flag}</span>
                </div>
                
                {pkg.spotsLeft && pkg.spotsLeft <= 5 && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    {pkg.spotsLeft} spots left
                  </div>
                )}

                <div className="absolute top-3 left-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full text-white ${TAG_COLORS[pkg.tag] || "bg-[#0D9488]"}`}>
                    {pkg.tag}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-bold text-lg leading-tight drop-shadow-lg">{pkg.title}</p>
                  <p className="text-white/90 text-xs mt-0.5 drop-shadow">{pkg.subtitle}</p>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-gray-400 text-xs">From</p>
                    <p className="font-black text-xl text-[#0D9488]">{pkg.price}</p>
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

                <button className="w-full flex items-center justify-center gap-2 bg-[#0D9488] text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-[#0F766E] transition-colors">
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

// ── BOOKING MODAL ─────────────────────────────────────────────────────────────

function BookingModal({ pkg, onClose }: { pkg: Package | null; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", phone: "", travelers: "2", date: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!pkg) return null;

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.phone.trim()) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 600));

    const msg = `Hi ${COMPANY_NAME}! I'd like to book the *${pkg.title}* package (${pkg.dates}).\n\nName: ${formData.name}\nPhone: ${formData.phone}\nTravelers: ${formData.travelers}\nPreferred Date: ${formData.date || pkg.dates}\nPackage: ${pkg.price} per person\n\nPlease guide me on next steps.`;

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
            <div className="h-1 bg-gray-100">
              <motion.div 
                className="h-full bg-[#0D9488]" 
                initial={{ width: "0%" }}
                animate={{ width: step === 1 ? "50%" : "100%" }}
              />
            </div>

            <div className="relative h-48 bg-gradient-to-br from-[#0D9488] to-[#14B8A6] flex items-center justify-center">
              <span className="text-8xl">{pkg.flag}</span>
              <button onClick={onClose} className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 transition-colors">
                <X size={16} className="text-white" />
              </button>
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-black text-2xl drop-shadow-lg">{pkg.title}</p>
                <p className="text-white/90 text-sm drop-shadow">{pkg.subtitle}</p>
              </div>
            </div>

            <div className="p-6">
              {step === 1 ? (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-gray-400 text-xs">Price per person</p>
                      <p className="font-black text-3xl text-[#0D9488]">{pkg.price}</p>
                    </div>
                    {pkg.spotsLeft && pkg.spotsLeft <= 5 && (
                      <div className="text-right">
                        <p className="text-red-500 text-xs font-semibold">Only {pkg.spotsLeft} spots left</p>
                        <p className="text-gray-400 text-xs">Book now</p>
                      </div>
                    )}
                  </div>

                  <div className="mb-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#0D9488] mb-3">What's Included</p>
                    <div className="flex flex-wrap gap-2">
                      {pkg.includes.map((inc) => (
                        <span key={inc} className="flex items-center gap-1 text-xs bg-slate-50 text-slate-600 px-3 py-1.5 rounded-full border border-slate-100">
                          <Check size={10} className="text-[#F97316]" /> {inc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => setStep(2)}
                    className="w-full bg-[#0D9488] text-white font-bold py-3.5 rounded-xl hover:bg-[#0F766E] transition-colors flex items-center justify-center gap-2"
                  >
                    Continue to Book <ArrowRight size={16} />
                  </button>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#0D9488] mb-4">Almost there!</p>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-xs text-gray-500 mb-1.5 block font-medium">Full Name *</label>
                      <input 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="e.g. John Smith"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20 transition-all"
                        autoFocus
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-500 mb-1.5 block font-medium">WhatsApp Number *</label>
                      <input 
                        value={formData.phone} 
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="e.g. 0801 234 5678"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500 mb-1.5 block font-medium">Travelers</label>
                        <select 
                          value={formData.travelers} 
                          onChange={(e) => setFormData({...formData, travelers: e.target.value})}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0D9488] bg-white"
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
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0D9488]"
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
                      className="flex-[2] bg-[#0D9488] text-white font-bold py-3.5 rounded-xl hover:bg-[#0F766E] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

// ── ENHANCED CHAT WIDGET ─────────────────────────────────────────────────────

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
  "Visa processing time?": "Typically 5–15 business days depending on the country. We recommend starting at least 4 weeks before travel. We handle UAE, Singapore, Thailand, South Africa, Morocco & more!",
  "Payment plans?": "Yes! Secure your spot with a deposit (usually 30%), balance spread before travel. Chat with us for flexible payment options tailored to you.",
  "Destinations?": "Currently: Dubai, Maldives, Singapore, Thailand, South Africa, Morocco. New destinations added monthly!",
  "Contact team?": `📱 WhatsApp: ${WA_NUMBER}\n📧 Email: ${EMAIL}\n🌐 Instagram: @pureqtravels`,
};

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: `👋 Hi! Welcome to ${COMPANY_NAME}! I can help you book a trip, check availability, or answer questions. What would you like to know?`, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) },
  ]);
  const [hasInteracted, setHasInteracted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted && !isOpen) {
        setIsOpen(true);
        setMessages(prev => [...prev, { 
          from: "bot", 
          text: "💡 Quick tip: Our Dubai & Maldives packages for summer are filling up fast! Only a few spots left. Interested?",
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
    openWhatsApp(`Hi ${COMPANY_NAME}! I need personalized travel assistance.`);
    setIsOpen(false);
  };

  return (
    <>
      <motion.button 
        onClick={() => { setIsOpen(p => !p); setHasInteracted(true); }}
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#0D9488] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[#0F766E] transition-colors"
      >
        <AnimatePresence mode="wait">
          {isOpen ? <X size={22} key="close" /> : <MessageCircle size={22} key="open" />}
        </AnimatePresence>

        {!hasInteracted && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F97316] rounded-full animate-pulse" />
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
            <div className="bg-[#0D9488] p-4 flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <TextLogo size="small" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0D9488]" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">{COMPANY_NAME}</p>
                <p className="text-white/70 text-xs">Travel Assistant • Online</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 max-h-80">
              {messages.map((msg, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] ${msg.from === "user" ? "bg-[#0D9488] text-white rounded-2xl rounded-br-none" : "bg-white text-gray-700 rounded-2xl rounded-bl-none shadow-sm"} px-4 py-2.5`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    {msg.time && <p className={`text-[10px] mt-1 ${msg.from === "user" ? "text-white/60" : "text-gray-400"}`}>{msg.time}</p>}
                  </div>
                </motion.div>
              ))}
              <div ref={bottomRef} />
            </div>

            <div className="p-3 bg-white border-t border-gray-100">
              <p className="text-xs text-gray-400 mb-2 font-medium">Quick Questions:</p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {QUICK_QUESTIONS.map(({ q, icon: Icon }) => (
                  <button
                    key={q}
                    onClick={() => handleQuickQuestion(q)}
                    className="flex items-center gap-2 text-left text-xs text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
                  >
                    <Icon size={12} className="text-[#F97316]" />
                    {q}
                  </button>
                ))}
              </div>

              <button
                onClick={handleHandoff}
                className="w-full bg-[#0D9488] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#0F766E] transition-colors"
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
            <TextLogo size="default" className={isScrolled ? "" : ""} />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-sm px-4 py-2 rounded-full text-gray-600 hover:text-[#0D9488] hover:bg-gray-100 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => openWhatsApp(`Hi ${COMPANY_NAME}, I'd like to book a trip.`)}
              className="hidden sm:flex items-center gap-2 bg-[#0D9488] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#0F766E] transition-all hover:scale-105"
            >
              <Phone size={14} /> Book Now
            </button>

            <button 
              className="md:hidden p-2 text-[#0D9488]"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

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
                onClick={() => { openWhatsApp(`Hi ${COMPANY_NAME}, I'd like to book a trip.`); setMobileOpen(false); }}
                className="mt-2 bg-[#0D9488] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
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

// ── HERO SECTION ─────────────────────────────────────────────────────────────

function Hero({ onBook }: { onBook: (pkg: Package) => void }) {
  return (
    <section id="home" className="relative min-h-screen pt-20 pb-16 flex items-center bg-gradient-to-br from-[#f0fdfa] via-white to-[#fff7ed] overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#0D9488]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F97316]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#0D9488]/20 rounded-full px-4 py-2 mb-6 shadow-sm"
            >
              <div className="flex -space-x-2">
                {[1,2,3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-[#0D9488] to-[#14B8A6] border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">
                    {String.fromCharCode(64+i)}
                  </div>
                ))}
              </div>
              <span className="text-xs font-medium text-gray-600">Trusted by 300+ happy travelers</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0D9488] leading-tight mb-6">
              Discover Your Next <span className="text-[#F97316]">Adventure</span> With Confidence
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              We handle everything — flights, visas, hotels, tours — so you just pack and show up. 
              Experience seamless travel planning with {COMPANY_NAME}.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button
                onClick={() => {
                  const element = document.getElementById('packages');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group flex items-center justify-center gap-2 bg-[#0D9488] text-white font-bold px-8 py-4 rounded-full hover:bg-[#0F766E] transition-all hover:scale-105 shadow-lg shadow-[#0D9488]/20"
              >
                View Packages <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => openWhatsApp(`Hi ${COMPANY_NAME}, I need help planning my trip.`)}
                className="flex items-center justify-center gap-2 bg-white text-[#0D9488] font-bold px-8 py-4 rounded-full border-2 border-[#0D9488] hover:bg-gray-50 transition-all"
              >
                <MessageCircle size={18} /> Free Consultation
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <BadgeCheck size={16} className="text-[#F97316]" />
                <span>Visa Assistance</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-[#F97316]" />
                <span>Secure Booking</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-[#F97316]" />
                <span>Group Discounts</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <p className="text-sm font-semibold text-[#0D9488] mb-4 flex items-center gap-2">
                <Sparkles size={16} /> Trending Packages
              </p>
              <AutoSlidingCarousel onBook={onBook} />
            </div>
          </motion.div>
        </div>

        <div className="lg:hidden mt-12">
          <p className="text-sm font-semibold text-[#0D9488] mb-4 text-center">Trending Packages</p>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
            {PACKAGES.slice(0, 3).map((pkg) => (
              <div 
                key={pkg.id} 
                className="flex-shrink-0 w-72 snap-center"
                onClick={() => onBook(pkg)}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100">
                  <div className="relative h-40 bg-gradient-to-br from-[#0D9488]/20 to-[#14B8A6]/20 flex items-center justify-center">
                    <span className="text-6xl">{pkg.flag}</span>
                    <div className="absolute top-3 left-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full text-white ${TAG_COLORS[pkg.tag]}`}>
                        {pkg.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-[#0D9488]">{pkg.title}</p>
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
    <section id="services" className="py-20 bg-[#f0fdfa]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-bold text-[#F97316] uppercase tracking-widest mb-2">What We Offer</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0D9488]">
            Complete Travel Solutions
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
              <div className="w-12 h-12 bg-[#0D9488]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#0D9488] transition-colors">
                <service.icon size={24} className="text-[#0D9488] group-hover:text-white transition-colors" />
              </div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-[#0D9488]">{service.label}</h3>
                <span className="text-xs font-semibold text-[#F97316] bg-[#F97316]/10 px-2 py-1 rounded-full">
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

// ── PACKAGES GRID ─────────────────────────────────────────────────────────────

function PackagesSection({ onBook }: { onBook: (pkg: Package) => void }) {
  return (
    <section id="packages" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-bold text-[#F97316] uppercase tracking-widest mb-2">Upcoming Trips</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0D9488]">
              Explore Our Packages
            </h2>
          </div>
          <button
            onClick={() => openWhatsApp(`Hi ${COMPANY_NAME}, show me all available packages.`)}
            className="flex items-center gap-2 text-[#0D9488] font-semibold hover:gap-3 transition-all"
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
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#0D9488]/20 to-[#14B8A6]/20 flex items-center justify-center">
                <span className="text-8xl">{pkg.flag}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

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
                  <p className="font-bold text-xl drop-shadow-lg">{pkg.title}</p>
                  <p className="text-sm text-white/90 drop-shadow">{pkg.subtitle}</p>
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
                      <Check size={10} className="text-[#F97316]" /> {inc}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-400">Per person sharing</p>
                    <p className="text-2xl font-black text-[#0D9488]">{pkg.price}</p>
                  </div>
                  <button
                    onClick={() => onBook(pkg)}
                    className="bg-[#0D9488] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-[#0F766E] transition-colors flex items-center gap-2"
                  >
                    Book <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-[#0D9488]/5 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#0D9488] rounded-full flex items-center justify-center text-white">
              <Phone size={20} />
            </div>
            <div>
              <p className="font-bold text-[#0D9488]">Need a custom package?</p>
              <p className="text-sm text-gray-600">We can tailor any trip to your preferences</p>
            </div>
          </div>
          <button
            onClick={() => openWhatsApp(`Hi ${COMPANY_NAME}, I need a custom travel package.`)}
            className="bg-[#0D9488] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#0F766E] transition-colors whitespace-nowrap"
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
    <section id="visa" className="py-20 bg-[#f0fdfa]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-bold text-[#F97316] uppercase tracking-widest mb-2">Visa Processing</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0D9488] mb-4">
              Visa Made Simple
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Visa rejections are expensive and stressful. We've processed 500+ visas with a 95% approval rate. 
              We know exactly what embassies want to see.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Expert documentation review & preparation",
                "Embassy appointment scheduling & follow-up",
                "UAE, Singapore, Thailand, South Africa & more",
                "Start 4 weeks before travel for best results"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <div className="w-6 h-6 bg-[#F97316]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-[#0D9488]" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <button
              onClick={() => openWhatsApp(`Hi ${COMPANY_NAME}, I need help with visa processing.`)}
              className="bg-[#0D9488] text-white font-bold px-8 py-4 rounded-full hover:bg-[#0F766E] transition-all hover:scale-105 flex items-center gap-2"
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
            <h3 className="font-bold text-[#0D9488] mb-6 text-lg">Simple 4-Step Process</h3>
            <div className="space-y-6">
              {[
                { step: "1", title: "Share Your Destination", desc: "Tell us where you want to go and your travel dates" },
                { step: "2", title: "Document Review", desc: "We review and prepare all required documentation" },
                { step: "3", title: "Submission", desc: "We handle embassy submission and track your application" },
                { step: "4", title: "Approval & Travel", desc: "Collect your visa and pack your bags!" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 bg-[#0D9488] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-[#0D9488]">{item.title}</p>
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
          <p className="text-sm font-bold text-[#F97316] uppercase tracking-widest mb-2">Why Choose Us</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0D9488]">
            Travel Without The Stress
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { 
              icon: Shield, 
              title: "End-to-End Service", 
              desc: "From visa to touchdown, we handle every detail. You just show up and enjoy the experience.",
              stat: "Zero hassle"
            },
            { 
              icon: Star, 
              title: "Curated Experiences", 
              desc: "Every package is personally vetted. No generic tours—only remarkable, memorable journeys.",
              stat: "300+ happy travelers"
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
              className="bg-[#f0fdfa] p-8 rounded-2xl border border-gray-100 hover:border-[#F97316]/30 transition-colors"
            >
              <div className="w-12 h-12 bg-[#0D9488]/10 rounded-xl flex items-center justify-center mb-4">
                <item.icon size={24} className="text-[#0D9488]" />
              </div>
              <h3 className="font-bold text-xl text-[#0D9488] mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{item.desc}</p>
              <p className="text-sm font-semibold text-[#F97316]">{item.stat}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { num: "20+", label: "Destinations" },
            { num: "300+", label: "Happy Travelers" },
            { num: "95%", label: "Visa Success" },
            { num: "4.8★", label: "Average Rating" }
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 bg-[#0D9488] rounded-2xl text-white">
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
    <section className="py-20 bg-[#0D9488] relative overflow-hidden">
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
            Ready to Explore?
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
            Don't let planning stress hold you back. Let's turn your travel dreams into reality.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => openWhatsApp(`Hi ${COMPANY_NAME}, I'm ready to book my trip!`)}
              className="bg-white text-[#0D9488] font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all hover:scale-105 flex items-center justify-center gap-2"
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
            Professional travel services • Available nationwide
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
              <TextLogo size="large" />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-4">
              Your trusted partner for curated travel packages, visa processing, and unforgettable adventures. 
              We make travel simple and stress-free.
            </p>
            <div className="flex gap-4">
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#0D9488] hover:bg-[#0D9488] hover:text-white transition-colors shadow-sm">
                <Instagram size={18} />
              </a>
              <a href={`https://wa.me/${WA_NUMBER}`} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#0D9488] hover:bg-[#0D9488] hover:text-white transition-colors shadow-sm">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#0D9488] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-[#0D9488] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#0D9488] mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-[#F97316]" />
                <a href={`tel:${WA_NUMBER}`} className="hover:text-[#0D9488]">Click for WhatsApp</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-[#F97316]" />
                <a href={`mailto:${EMAIL}`} className="hover:text-[#0D9488]">{EMAIL}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-[#F97316] mt-0.5" />
                <span>Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© 2026 {COMPANY_NAME}. All rights reserved.</p>
          <p className="text-gray-400 text-sm">
            Crafted with care for travelers 🇳🇬
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
