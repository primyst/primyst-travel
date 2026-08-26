"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plane, Shield, MapPin, Phone, Mail, Instagram, ArrowRight,
  Check, Menu, X, Send, Clock, Calendar, Hotel, PlaneTakeoff,
  FileCheck, Bus, Compass,
} from "lucide-react";

// ============================================================
// THE "AFTER" — one path only: see trip -> understand offer ->
// trust them -> enquire on WhatsApp. Every section earns its
// place on that path. Nothing else made the cut.
// ============================================================

const WA_NUMBER = "2347035612652";
const EMAIL = "hello@pureqtravels.com";
const INSTAGRAM = "https://instagram.com/pureqtravels";
const COMPANY_NAME = "PureQ";

const openWhatsApp = (msg: string) => {
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
};

const NAV_LINKS = [
  { label: "Packages", href: "#packages" },
  { label: "Why PureQ", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

export type Package = {
  id: string;
  title: string;
  location: string;
  price: string;
  dates: string;
  duration: string;
  flag: string;
  image: string;
  included: { icon: typeof Plane; label: string }[];
};

const PACKAGES: Package[] = [
  {
    id: "egypt",
    title: "Egypt Escape",
    location: "Cairo + Sharm El Sheikh",
    price: "₦2,900,000",
    dates: "Apr 24 – 29",
    duration: "5 Nights",
    flag: "🇪🇬",
    image: "egypt.jpg",
    included: [
      { icon: PlaneTakeoff, label: "Flights" },
      { icon: Hotel, label: "Hotels" },
      { icon: FileCheck, label: "Visa" },
      { icon: Bus, label: "Transfers" },
      { icon: Compass, label: "Tours & activities" },
    ],
  },
  {
    id: "mombasa",
    title: "Mombasa Getaway",
    location: "Kenya Beach Coast",
    price: "₦2,550,000",
    dates: "Apr 23 – 28",
    duration: "4 Nights",
    flag: "🇰🇪",
    image: "mombasa.jpg",
    included: [
      { icon: PlaneTakeoff, label: "Flights" },
      { icon: Hotel, label: "Hotels" },
      { icon: Bus, label: "Transfers" },
      { icon: Compass, label: "Tours & activities" },
    ],
  },
  {
    id: "seychelles",
    title: "Seychelles Retreat",
    location: "Private Island Resort",
    price: "₦2,400,000",
    dates: "Nov 9 – 14",
    duration: "4 Nights",
    flag: "🇸🇨",
    image: "seychelles.jpg",
    included: [
      { icon: PlaneTakeoff, label: "Flights" },
      { icon: Hotel, label: "Hotels" },
      { icon: FileCheck, label: "Entry pass" },
      { icon: Compass, label: "Tours & activities" },
    ],
  },
];

function TextLogo({ className = "", size = "default" }: { className?: string; size?: "small" | "default" | "large" }) {
  const sizeClasses = { small: "text-lg", default: "text-2xl", large: "text-3xl" };
  return (
    <div className={`font-black tracking-tight ${sizeClasses[size]} ${className}`}>
      <span className="text-[#0D9488]">Pure</span>
      <span className="text-[#F97316]">Q</span>
    </div>
  );
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <TextLogo size="default" />
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
              onClick={() => openWhatsApp(`Hi ${COMPANY_NAME}, I'd like to talk to a travel expert.`)}
              className="hidden sm:flex items-center gap-2 bg-[#0D9488] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#0F766E] transition-all"
            >
              <Send size={14} /> Chat on WhatsApp
            </button>
            <button className="md:hidden p-2 text-[#0D9488]" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-x-0 top-[60px] z-30 bg-white border-b border-gray-100 shadow-lg p-4 md:hidden">
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
              onClick={() => { openWhatsApp(`Hi ${COMPANY_NAME}, I'd like to talk to a travel expert.`); setMobileOpen(false); }}
              className="mt-2 bg-[#0D9488] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Send size={16} /> Chat on WhatsApp
            </button>
          </nav>
        </div>
      )}
    </>
  );
}

function Hero() {
  return (
    <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#f0fdfa] via-white to-[#fff7ed]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0D9488] leading-tight mb-5">
          Your Next Trip Starts Here.
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Curated international trips with flights, hotels, visas and tours
          handled for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center justify-center gap-2 bg-[#0D9488] text-white font-bold px-8 py-4 rounded-full hover:bg-[#0F766E] transition-all"
          >
            Explore Packages <ArrowRight size={18} />
          </button>
          <button
            onClick={() => openWhatsApp(`Hi ${COMPANY_NAME}, I'd like to talk to a travel expert.`)}
            className="flex items-center justify-center gap-2 bg-white text-[#0D9488] font-bold px-8 py-4 rounded-full border-2 border-[#0D9488] hover:bg-gray-50 transition-all"
          >
            <Send size={18} /> Talk to a Travel Expert
          </button>
        </div>
      </div>
    </section>
  );
}

function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-52">
        <Image src={pkg.image} alt={pkg.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute top-3 left-3 text-3xl drop-shadow-lg">{pkg.flag}</div>
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <p className="font-bold text-xl drop-shadow-lg">{pkg.title}</p>
          <p className="text-sm text-white/90 drop-shadow">{pkg.location}</p>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <span className="flex items-center gap-1"><Calendar size={14} /> {pkg.dates}</span>
          <span className="flex items-center gap-1"><Clock size={14} /> {pkg.duration}</span>
        </div>

        <p className="text-xs font-bold uppercase tracking-widest text-[#0D9488] mb-2">What&apos;s included</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {pkg.included.map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-1.5 text-xs bg-slate-50 text-slate-600 px-3 py-1.5 rounded-full border border-slate-100">
              <Icon size={12} className="text-[#F97316]" /> {label}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400">Per person</p>
            <p className="text-2xl font-black text-[#0D9488]">{pkg.price}</p>
          </div>
          <button
            onClick={() => openWhatsApp(`Hi ${COMPANY_NAME}! I want the *${pkg.title}* package (${pkg.dates}, ${pkg.price} per person). Please guide me on next steps.`)}
            className="bg-[#0D9488] text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-[#0F766E] transition-colors flex items-center gap-2"
          >
            I want this trip <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Packages() {
  return (
    <section id="packages" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold text-[#F97316] uppercase tracking-widest mb-2">Upcoming Trips</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0D9488]">Why Book This Trip?</h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            Every price below is the full cost, per person — flights, hotel, and the essentials already included.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKAGES.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        <div className="mt-12 bg-[#0D9488]/5 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#0D9488] rounded-full flex items-center justify-center text-white">
              <Phone size={20} />
            </div>
            <div>
              <p className="font-bold text-[#0D9488]">Don&apos;t see your destination?</p>
              <p className="text-sm text-gray-600">Tell us where you want to go, we&apos;ll build the trip around you</p>
            </div>
          </div>
          <button
            onClick={() => openWhatsApp(`Hi ${COMPANY_NAME}, I need a custom travel package.`)}
            className="bg-[#0D9488] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#0F766E] transition-colors whitespace-nowrap"
          >
            Request Custom Trip
          </button>
        </div>
      </div>
    </section>
  );
}

// Trust section built on things that can actually be shown and checked,
// not invented percentages. Swap the placeholders below for the real
// business's actual reviews, photos, and registration details.
function WhyUs() {
  return (
    <section id="why-us" className="py-20 bg-[#f0fdfa]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-bold text-[#F97316] uppercase tracking-widest mb-2">Why Travelers Choose Us</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0D9488]">Real Trips. Real Travelers.</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {[
            { name: "Chidinma A.", trip: "Egypt Escape, March 2026", text: "Every part of the itinerary matched what we were quoted. Visa was ready two weeks before we flew out." },
            { name: "Emeka O.", trip: "Seychelles Retreat, Nov 2025", text: "Booked through WhatsApp end to end, no back and forth. Would use them again for the next trip." },
          ].map((r) => (
            <div key={r.name} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-gray-700 leading-relaxed mb-4">&quot;{r.text}&quot;</p>
              <p className="text-sm font-semibold text-[#0D9488]">{r.name}</p>
              <p className="text-xs text-gray-400">{r.trip}</p>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-start gap-3">
            <Shield size={20} className="text-[#0D9488] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#0D9488] text-sm">Registered Travel Agency</p>
              <p className="text-xs text-gray-500 mt-1">CAC-registered, Nigeria</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-start gap-3">
            <Send size={20} className="text-[#0D9488] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#0D9488] text-sm">Talk to a Real Person</p>
              <p className="text-xs text-gray-500 mt-1">Same-day WhatsApp replies</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-start gap-3">
            <MapPin size={20} className="text-[#0D9488] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#0D9488] text-sm">Based in Nigeria</p>
              <p className="text-xs text-gray-500 mt-1">Local team, local support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 bg-[#0D9488]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">Ready to Explore?</h2>
        <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
          Tell us where you want to go. We&apos;ll handle the rest.
        </p>
        <button
          onClick={() => openWhatsApp(`Hi ${COMPANY_NAME}, I'm ready to book my trip!`)}
          className="inline-flex items-center justify-center gap-2 bg-white text-[#0D9488] font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all"
        >
          <Send size={18} /> Start on WhatsApp
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <TextLogo size="large" className="mb-4" />
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-4">
              Curated travel packages, visa processing and unforgettable trips
              handled end to end.
            </p>
            <div className="flex gap-3">
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#0D9488] hover:bg-[#0D9488] hover:text-white transition-colors shadow-sm">
                <Instagram size={18} />
              </a>
              <a href={`https://wa.me/${WA_NUMBER}`} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#0D9488] hover:bg-[#0D9488] hover:text-white transition-colors shadow-sm">
                <Send size={18} />
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
                <a href={`https://wa.me/${WA_NUMBER}`} className="hover:text-[#0D9488]">Chat on WhatsApp</a>
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

        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2026 {COMPANY_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />
      <Packages />
      <WhyUs />
      <CTASection />
      <Footer />
    </main>
  );
}
