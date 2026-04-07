"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Menu,
  X,
  MapPin,
  Clock,
  Users,
  Star,
  Phone,
  Mail,
  Instagram,
  ChevronDown,
  Plane,
  FileText,
  Globe,
  Heart,
  Anchor,
  Shield,
} from "lucide-react";

// ── Constants ──────────────────────────────────────────────────────────────
const WHATSAPP = "https://wa.me/2347037767246";
const EMAIL = "info.destinationroyale@gmail.com";
const INSTAGRAM = "https://instagram.com/destination_royale";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Packages", href: "#packages" },
  { label: "Visa", href: "#visa" },
  { label: "Tours", href: "#tours" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  { icon: Plane, label: "Flight Deals", desc: "Best fares on economy & business class worldwide" },
  { icon: FileText, label: "Visa Processing", desc: "We handle the paperwork so you don't stress" },
  { icon: Globe, label: "Tour Packages", desc: "Curated group & private tours across the globe" },
  { icon: Anchor, label: "Excursions", desc: "Day trips, island hops, and adventure activities" },
  { icon: Heart, label: "Honeymoon Packages", desc: "Romantic escapes tailored for two" },
  { icon: Shield, label: "Travel Insurance", desc: "Travel protected with comprehensive coverage" },
];

const PACKAGES = [
  {
    name: "Egypt",
    subtitle: "Cairo & Sharm El Sheikh",
    price: "₦2,900,000",
    dates: "Apr 24 – 29",
    nights: "5 Nights",
    highlights: ["Giza Pyramids & Sphinx", "Quad biking & Camel ride", "Snorkeling at Ras Mohammed", "Bedouin Dinner"],
    // Replace with: /images/egypt.jpg
    // Unsplash: https://unsplash.com/photos/giza-pyramids-egypt-aerial-R36CgpgQggI
    image: "https://images.unsplash.com/photo-1608425798560-b8d8a3e90861?w=800&q=80",
    tag: "Hot Deal",
    tagColor: "bg-orange-500",
  },
  {
    name: "Mombasa",
    subtitle: "Kenya Beach Escape",
    price: "₦2,550,000",
    dates: "Apr 23 – 28",
    nights: "4 Nights",
    highlights: ["4 Nights Beach Resort", "Haller Park Wildlife", "Wasini Island Tour", "Dhow Boat Ride"],
    // Replace with: /images/mombasa.jpg
    // Unsplash: https://unsplash.com/photos/mombasa-kenya-beach-resort-ocean
    image: "https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=800&q=80",
    tag: "Best Value",
    tagColor: "bg-[#3FA9F5]",
  },
  {
    name: "Seychelles",
    subtitle: "Luxury Island Retreat",
    price: "₦2,400,000",
    dates: "Nov 9 – 14",
    nights: "4 Nights",
    highlights: ["4 Nights Beach Resort", "Marine Tour", "Boat Ride & Fish Feeding", "Seychelles eTA included"],
    // Replace with: /images/seychelles.jpg
    // Unsplash: https://unsplash.com/photos/seychelles-beach-turquoise-water-tropical
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
    tag: "Most Popular",
    tagColor: "bg-emerald-500",
  },
  {
    name: "Qatar",
    subtitle: "Super Budget 3.0",
    price: "₦2,500,000",
    dates: "Nov 20 – 26",
    nights: "5 Nights",
    highlights: ["Villagio Mall Gondola", "Museum of Illusions", "Half-day Desert Safari", "Qatar Visa included"],
    // Replace with: /images/qatar.jpg
    // Unsplash: https://unsplash.com/photos/qatar-doha-skyline-cityscape-night
    image: "https://images.unsplash.com/photo-1564596823821-79b87fa83a21?w=800&q=80",
    tag: "Budget Pick",
    tagColor: "bg-violet-500",
  },
  {
    name: "Zanzibar",
    subtitle: "Tanzania Beach & History",
    price: "₦2,850,000",
    dates: "Oct 24 – 29",
    nights: "4 Nights",
    highlights: ["4 Nights Beach Resort", "Swimming with Turtles", "Stone Town Tour", "Mnemba Island"],
    // Replace with: /images/zanzibar.jpg
    // Unsplash: https://unsplash.com/photos/zanzibar-stone-town-beach-turquoise
    image: "https://images.unsplash.com/photo-1586861203927-800a5acdcc4d?w=800&q=80",
    tag: "New",
    tagColor: "bg-[#005B82]",
  },
  {
    name: "Beirut",
    subtitle: "Lebanon Winter Edition",
    price: "₦2,600,000",
    dates: "Mar 5 – 10",
    nights: "4 Nights",
    highlights: ["Snowmobile & Paragliding", "Cable Car Ride", "Jeita Grotto Boat Ride", "Visit to Harissa"],
    // Replace with: /images/beirut.jpg
    // Unsplash: https://unsplash.com/photos/beirut-lebanon-mountains-snow-cedar
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    tag: "Adventure",
    tagColor: "bg-rose-500",
  },
];

const TESTIMONIALS = [
  {
    name: "Adaeze Okonkwo",
    location: "Lagos",
    trip: "Seychelles Package",
    text: "I never imagined I could travel to Seychelles without the stress of figuring everything out myself. Destination Royale handled my visa, flights, and hotel — I just showed up. Absolutely magical experience.",
    rating: 5,
    initials: "AO",
  },
  {
    name: "Emeka & Chisom Eze",
    location: "Port Harcourt",
    trip: "Zanzibar Honeymoon",
    text: "Our honeymoon was everything we dreamed of and more. The team went above and beyond. Swimming with turtles at Mnemba Island was the highlight of our lives. We are already planning our anniversary trip.",
    rating: 5,
    initials: "EC",
  },
  {
    name: "Bola Fashola",
    location: "Abuja",
    trip: "Egypt Package",
    text: "The Egypt trip exceeded every expectation. From the Giza Pyramids to the Bedouin dinner under the stars, every detail was perfect. The visa-on-arrival arrangement was seamless. Highly recommended.",
    rating: 5,
    initials: "BF",
  },
];

const STATS = [
  { value: "500+", label: "Happy Travellers" },
  { value: "20+", label: "Destinations" },
  { value: "6+", label: "Years Experience" },
  { value: "98%", label: "Satisfaction Rate" },
];

// ── Navbar ─────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`w-full sticky top-9 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="#home" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="Destination Royale"
              width={48}
              height={47}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  scrolled
                    ? "text-[#53565A] hover:text-[#005B82]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#005B82] hover:bg-[#3FA9F5] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors duration-300"
            >
              Book Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden p-1 ${scrolled ? "text-[#005B82]" : "text-white"}`}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pb-5 pt-3">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-[#53565A] hover:text-[#005B82] transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#005B82] text-white text-sm font-semibold px-6 py-3 rounded-full text-center"
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────
function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax BG — Giza Pyramids */}
      {/* Replace src with /images/giza-hero.jpg */}
      {/* Unsplash recommended: https://unsplash.com/photos/giza-pyramids-desert-golden-hour-aerial-BpCMUCfCgbg */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-20 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=1600&q=90')",
        }}
      />

      {/* Deep overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#005B82]/75 via-[#005B82]/50 to-[#002d41]/90" />

      {/* Decorative rings */}
      <div className="absolute w-[500px] h-[500px] rounded-full border border-white/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute w-[750px] h-[750px] rounded-full border border-white/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* ── Foreground plane SVG (3D element in front of text) ── */}
      <div className="absolute bottom-0 right-0 lg:right-10 opacity-10 lg:opacity-20 pointer-events-none select-none">
        <svg
          viewBox="0 0 400 300"
          className="w-72 lg:w-[420px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylised commercial aircraft silhouette */}
          <path
            d="M20 160 L180 80 L360 100 L340 120 L180 105 L80 175 Z"
            fill="white"
          />
          <path
            d="M180 80 L220 30 L250 35 L210 85 Z"
            fill="white"
          />
          <path
            d="M80 175 L100 195 L130 185 L110 165 Z"
            fill="white"
          />
          <ellipse cx="280" cy="112" rx="14" ry="7" fill="#3FA9F5" opacity="0.6" />
          <ellipse cx="310" cy="114" rx="10" ry="6" fill="#3FA9F5" opacity="0.4" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Eyebrow pill */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3FA9F5] animate-pulse" />
          <span className="text-white/80 text-xs tracking-widest uppercase font-medium">
            Gbagada · Lagos · Nigeria
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6">
          Every Journey,{" "}
          <em className="not-italic text-[#3FA9F5]">Perfectly</em>{" "}
          Planned.
        </h1>

        {/* Sub copy */}
        <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          From visa processing to curated tours and honeymoon packages — we
          handle every detail so you travel without stress.
        </p>

        {/* Service pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {["Flights", "Visas", "Tours", "Excursions", "Honeymoons", "Insurance"].map((s) => (
            <span
              key={s}
              className="text-xs text-white/60 border border-white/15 rounded-full px-3 py-1 backdrop-blur-sm"
            >
              {s}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[#3FA9F5] hover:bg-white hover:text-[#005B82] text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#3FA9F5]/30"
          >
            Book Now <ArrowRight size={16} />
          </a>
          <Link
            href="#packages"
            className="w-full sm:w-auto border border-white/30 hover:border-white hover:bg-white/10 text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-300 text-center backdrop-blur-sm"
          >
            View Packages
          </Link>
        </div>

        {/* Scroll cue */}
        <div className="mt-16 flex justify-center animate-bounce">
          <ChevronDown size={22} className="text-white/40" />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

// ── Stats Bar ──────────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <section className="bg-[#005B82] py-10">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {STATS.map((s) => (
          <div key={s.label}>
            <p className="font-playfair text-3xl font-black text-white">{s.value}</p>
            <p className="text-white/60 text-xs mt-1 uppercase tracking-widest">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Services ───────────────────────────────────────────────────────────────
function Services() {
  return (
    <section id="tours" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-[#3FA9F5] text-xs uppercase tracking-widest font-semibold mb-3">
            What We Offer
          </p>
          <h2 className="font-playfair text-4xl lg:text-5xl font-black text-[#005B82] leading-tight">
            Everything You Need,{" "}
            <em className="not-italic text-[#53565A]">In One Place.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="group p-6 rounded-2xl border border-slate-100 hover:border-[#3FA9F5]/40 hover:shadow-lg hover:shadow-[#3FA9F5]/10 transition-all duration-300 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-[#005B82]/8 flex items-center justify-center mb-4 group-hover:bg-[#005B82] transition-colors duration-300">
                <Icon
                  size={22}
                  className="text-[#005B82] group-hover:text-white transition-colors duration-300"
                />
              </div>
              <h3 className="font-semibold text-[#005B82] mb-1">{label}</h3>
              <p className="text-[#53565A] text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Packages ───────────────────────────────────────────────────────────────
function Packages() {
  return (
    <section id="packages" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-[#3FA9F5] text-xs uppercase tracking-widest font-semibold mb-3">
            Travel Packages
          </p>
          <h2 className="font-playfair text-4xl lg:text-5xl font-black text-[#005B82] leading-tight">
            Where Will You Go{" "}
            <em className="not-italic text-[#53565A]">Next?</em>
          </h2>
          <p className="text-[#53565A] mt-4 text-sm leading-relaxed">
            All packages include return flights, accommodation, airport transfers, and guided tours.
            Prices are per person sharing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {/* Tag */}
                <span
                  className={`absolute top-4 left-4 ${pkg.tagColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}
                >
                  {pkg.tag}
                </span>
                {/* Price overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <p className="font-playfair text-white text-xl font-black">{pkg.name}</p>
                    <p className="text-white/70 text-xs">{pkg.subtitle}</p>
                  </div>
                  <p className="text-white font-black text-sm bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    {pkg.price}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-1">
                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-[#53565A] mb-4">
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-[#3FA9F5]" /> {pkg.nights}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-[#3FA9F5]" /> {pkg.dates}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} className="text-[#3FA9F5]" /> Per person
                  </span>
                </div>

                {/* Highlights */}
                <ul className="space-y-1.5 mb-6 flex-1">
                  {pkg.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs text-[#53565A]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3FA9F5] mt-1.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#005B82] hover:bg-[#3FA9F5] text-white text-sm font-semibold py-3 rounded-xl text-center transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  Book This Package <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Visa Section ───────────────────────────────────────────────────────────
function Visa() {
  const steps = [
    { step: "01", title: "Tell Us Your Destination", desc: "Share where you want to go and your travel dates via WhatsApp." },
    { step: "02", title: "We Prepare Your Documents", desc: "Our visa experts compile and verify everything required for your application." },
    { step: "03", title: "We Submit on Your Behalf", desc: "We handle all embassy submissions and follow up until approval." },
    { step: "04", title: "You Travel, Stress-Free", desc: "Collect your visa and pack your bags. We have got the rest covered." },
  ];

  return (
    <section id="visa" className="py-24 bg-[#005B82] relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#3FA9F5] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="text-[#3FA9F5] text-xs uppercase tracking-widest font-semibold mb-4">
              Visa Processing
            </p>
            <h2 className="font-playfair text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
              We Handle the{" "}
              <em className="not-italic text-[#3FA9F5]">Paperwork.</em>
              <br />You Handle the Excitement.
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-8">
              Visa rejections are stressful. We have processed visas for Egypt,
              Qatar, Kenya, Tanzania, Lebanon, Seychelles, and more. Our team
              knows exactly what embassies require — and we deliver.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#3FA9F5] hover:bg-white hover:text-[#005B82] text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all duration-300"
            >
              Start Your Visa Process <ArrowRight size={15} />
            </a>
          </div>

          {/* Right — Steps */}
          <div className="grid grid-cols-1 gap-5">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="flex gap-5 items-start">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <span className="text-[#3FA9F5] text-xs font-black">{step}</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">{title}</h4>
                  <p className="text-white/60 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Luxury Video Strip ─────────────────────────────────────────────────────
function LuxuryStrip() {
  return (
    <section className="relative h-64 sm:h-80 overflow-hidden flex items-center justify-center">
      {/*
        Auto-playing muted video of luxury travel moment.
        Replace /videos/luxury.mp4 with your own clip.
        Recommended: champagne pour on private boat, sunset deck shot, etc.
        Free source: https://www.pexels.com/search/videos/luxury%20travel/
      */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80"
      >
        <source src="/videos/luxury.mp4" type="video/mp4" />
        {/* Fallback: shows poster image if video not found */}
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#002d41]/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <p className="font-playfair text-3xl sm:text-4xl font-black text-white italic mb-3">
          "Travel is the only thing you buy that makes you richer."
        </p>
        <p className="text-white/50 text-xs uppercase tracking-widest">
          — Destination Royale Services
        </p>
      </div>
    </section>
  );
}

// ── Testimonials ───────────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-[#3FA9F5] text-xs uppercase tracking-widest font-semibold mb-3">
            Testimonials
          </p>
          <h2 className="font-playfair text-4xl lg:text-5xl font-black text-[#005B82] leading-tight">
            Travellers Who{" "}
            <em className="not-italic text-[#53565A]">Trust Us.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-slate-50 rounded-3xl p-7 flex flex-col justify-between border border-slate-100 hover:border-[#3FA9F5]/30 hover:shadow-lg transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              <p className="text-[#53565A] text-sm leading-relaxed mb-6 flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#005B82] flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">{t.initials}</span>
                </div>
                <div>
                  <p className="text-[#005B82] font-semibold text-sm">{t.name}</p>
                  <p className="text-[#53565A] text-xs">
                    {t.location} · {t.trip}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA Banner ─────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#005B82] to-[#003d5c] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#3FA9F5]/10 blur-3xl pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <p className="text-[#3FA9F5] text-xs uppercase tracking-widest font-semibold mb-4">
          Ready to Travel?
        </p>
        <h2 className="font-playfair text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
          Your Next Adventure{" "}
          <em className="not-italic text-[#3FA9F5]">Starts Today.</em>
        </h2>
        <p className="text-white/70 text-sm mb-10 max-w-xl mx-auto leading-relaxed">
          Chat with us on WhatsApp and let us plan every detail —
          from your visa to your hotel pillow.
        </p>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#3FA9F5] hover:bg-white hover:text-[#005B82] text-white font-semibold px-9 py-4 rounded-full transition-all duration-300 text-sm shadow-xl shadow-[#3FA9F5]/20"
        >
          Chat With Us on WhatsApp <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer id="contact" className="bg-[#002d41] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Image
              src="/logo.png"
              alt="Destination Royale"
              width={52}
              height={51}
              className="object-contain mb-4"
            />
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Lagos&apos; trusted travel agency for curated tours, visa
              processing, honeymoon packages, and amazing flight deals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">
              Quick Links
            </p>
            <div className="flex flex-col gap-2.5">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">
              Get In Touch
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors"
              >
                <Phone size={14} className="text-[#3FA9F5] shrink-0" />
                07037767246 · 08058713944
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors"
              >
                <Mail size={14} className="text-[#3FA9F5] shrink-0" />
                {EMAIL}
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors"
              >
                <Instagram size={14} className="text-[#3FA9F5] shrink-0" />
                @destination_royale
              </a>
              <p className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin size={14} className="text-[#3FA9F5] shrink-0 mt-0.5" />
                Gbagada, Lagos, Nigeria
              </p>
            </div>
          </div>
        </div>

        {/* Divider + Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Destination Royale Services. All rights reserved.
          </p>
          <p className="text-white/20 text-xs text-center">
            Demo site built by{" "}
            <a
              href="https://primyst-solutions.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3FA9F5]/60 hover:text-[#3FA9F5] transition-colors"
            >
              Primyst Solutions
            </a>
            . Not affiliated with Destination Royale.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StatsBar />
      <Services />
      <Packages />
      <Visa />
      <LuxuryStrip />
      <Testimonials />
      <CTABanner />
      <Footer />
    </main>
  );
}
