"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, Calendar, Check, Clock, Compass, FileCheck, Hotel,
  Instagram, MapPin, Menu, Plane, PlaneTakeoff, Send, Shield,
  Sparkles, X, Bus, Phone, Mail,
} from "lucide-react";

const WA_NUMBER = "2347035612652";
const EMAIL = "hello@pureqtravels.com";
const INSTAGRAM = "https://instagram.com/pureqtravels";
const COMPANY_NAME = "PureQ";

const openWhatsApp = (msg: string) => {
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  if (typeof window !== "undefined") window.open(url, "_blank", "noopener,noreferrer");
};

const NAV_LINKS = [
  { label: "Trips", href: "#packages" },
  { label: "How it works", href: "#journey" },
  { label: "Why PureQ", href: "#why-us" },
];

type Package = {
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
      { icon: Compass, label: "Tours" },
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
      { icon: Compass, label: "Tours" },
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
      { icon: Compass, label: "Tours" },
    ],
  },
];

function TextLogo({ large = false }: { large?: boolean }) {
  return (
    <div className={`font-black tracking-tight ${large ? "text-3xl" : "text-2xl"}`}>
      <span className="text-[#0D9488]">Pure</span><span className="text-[#F97316]">Q</span>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/60 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/"><TextLogo /></Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-full px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-[#0D9488]">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => openWhatsApp(`Hi ${COMPANY_NAME}, I'd like to talk to a travel expert.`)} className="hidden items-center gap-2 rounded-full bg-[#0D9488] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0F766E] sm:flex">
              <Send size={14} /> Chat on WhatsApp
            </button>
            <button onClick={() => setOpen(!open)} className="p-2 text-[#0D9488] md:hidden" aria-label="Open menu">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div className="fixed inset-x-0 top-[61px] z-40 border-b border-gray-100 bg-white p-4 shadow-xl md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 font-medium text-gray-700 hover:bg-gray-50">
                {link.label}
              </Link>
            ))}
            <button onClick={() => { openWhatsApp(`Hi ${COMPANY_NAME}, I'd like to talk to a travel expert.`); setOpen(false); }} className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#0D9488] py-3 font-semibold text-white">
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
    <section className="relative min-h-[680px] overflow-hidden bg-slate-950 pt-24 text-white">
      <Image src="egypt.jpg" alt="Egypt travel experience" fill priority className="object-cover opacity-70" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      <div className="relative mx-auto flex min-h-[680px] max-w-6xl items-center px-4 py-20 sm:px-6">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#F97316]" /> Lagos · Nigeria
          </div>
          <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
            Your next trip,
            <br />without the <span className="text-[#F97316]">runaround.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
            Flights, hotels, visas, transfers and the actual trip — put together before you have to figure out what comes next.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })} className="flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-bold text-[#0D9488] transition hover:bg-white/90">
              See upcoming trips <ArrowRight size={18} />
            </button>
            <button onClick={() => openWhatsApp(`Hi ${COMPANY_NAME}, I want help planning a trip.`)} className="flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur-md transition hover:bg-white/20">
              <Send size={18} /> Talk to a travel expert
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 right-4 hidden w-[330px] rounded-2xl border border-white/20 bg-black/35 p-4 backdrop-blur-xl lg:block">
          <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/60">
            <span>Trip route</span><span>QP 024</span>
          </div>
          <div className="relative h-20">
            <div className="absolute left-6 right-8 top-9 border-t border-dashed border-white/50" />
            <div className="absolute left-4 top-6 h-7 w-7 rounded-full border border-white/30 bg-white/10 p-1.5"><MapPin size={14} /></div>
            <div className="absolute right-3 top-6 h-7 w-7 rounded-full border border-[#F97316]/50 bg-[#F97316]/20 p-1.5 text-[#F97316]"><MapPin size={14} /></div>
            <div className="absolute left-1/2 top-1 -translate-x-1/2 rotate-12 text-white"><Plane size={22} /></div>
          </div>
          <div className="flex justify-between text-sm font-semibold"><span>Lagos</span><span>Cairo</span></div>
          <div className="mt-1 flex justify-between text-[11px] text-white/55"><span>LOS</span><span>CAI</span></div>
        </div>
      </div>
    </section>
  );
}

function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative h-60 overflow-hidden">
        <Image src={pkg.image} alt={pkg.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xl shadow-lg">{pkg.flag}</div>
        <div className="absolute bottom-4 left-5 text-white">
          <p className="text-2xl font-black">{pkg.title}</p>
          <p className="text-sm text-white/80">{pkg.location}</p>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
          <span className="flex items-center gap-1.5"><Calendar size={14} /> {pkg.dates}</span>
          <span className="flex items-center gap-1.5"><Clock size={14} /> {pkg.duration}</span>
        </div>
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0D9488]">Included in the trip</p>
        <div className="mb-6 flex flex-wrap gap-2">
          {pkg.included.map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
              <Icon size={12} className="text-[#F97316]" /> {label}
            </span>
          ))}
        </div>
        <div className="flex items-end justify-between gap-3 border-t border-gray-100 pt-5">
          <div>
            <p className="text-xs text-gray-400">From / person</p>
            <p className="text-2xl font-black text-[#0D9488]">{pkg.price}</p>
          </div>
          <button onClick={() => openWhatsApp(`Hi ${COMPANY_NAME}! I'm interested in the *${pkg.title}* package (${pkg.dates}, ${pkg.price} per person).`)} className="flex items-center gap-1.5 rounded-xl bg-[#0D9488] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0F766E]">
            I want this <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

function Packages() {
  return (
    <section id="packages" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 max-w-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#F97316]">Pick a trip</p>
          <h2 className="text-4xl font-black tracking-tight text-[#0D9488] sm:text-5xl">Know where you want to go?</h2>
          <p className="mt-3 text-gray-500">Start with one of these trips. The important bits are already laid out — price, dates and what you are actually getting.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const steps = [
    { icon: PlaneTakeoff, label: "Flight", text: "Your route is planned." },
    { icon: Hotel, label: "Stay", text: "Hotel is part of the package." },
    { icon: FileCheck, label: "Documents", text: "Visa help where required." },
    { icon: Bus, label: "Transfers", text: "Know how you get around." },
    { icon: Compass, label: "Experience", text: "Then enjoy the destination." },
  ];
  return (
    <section id="journey" className="overflow-hidden bg-[#0b2928] py-24 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-14 max-w-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#F97316]">Less figuring out</p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">From takeoff to check-in,<br />the gaps are covered.</h2>
        </div>
        <div className="relative grid gap-8 md:grid-cols-5">
          <div className="absolute left-[10%] right-[10%] top-8 hidden border-t border-dashed border-white/20 md:block" />
          {steps.map(({ icon: Icon, label, text }, i) => (
            <div key={label} className="relative">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-[#F97316] backdrop-blur">
                <Icon size={25} />
              </div>
              <p className="mb-1 font-bold">0{i + 1} · {label}</p>
              <p className="text-sm leading-relaxed text-white/55">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="why-us" className="bg-[#f7faf9] py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#F97316]">Why PureQ</p>
            <h2 className="text-4xl font-black tracking-tight text-[#0D9488] sm:text-5xl">You book the trip.<br />We handle the moving parts.</h2>
            <p className="mt-5 max-w-md leading-relaxed text-gray-500">Travel gets stressful when the customer has to coordinate five different things alone. That is the part we take off your plate.</p>
            <button onClick={() => openWhatsApp(`Hi ${COMPANY_NAME}, I'd like help planning a trip.`)} className="mt-7 flex items-center gap-2 rounded-full bg-[#0D9488] px-6 py-3.5 font-bold text-white transition hover:bg-[#0F766E]">
              Talk to a travel expert <ArrowRight size={17} />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Plane, title: "Flights", text: "Your route and flight details are part of the plan." },
              { icon: Hotel, title: "Hotels", text: "Stay is selected as part of the trip, not left for later." },
              { icon: FileCheck, title: "Visa support", text: "Guidance for the documents your destination requires." },
              { icon: Bus, title: "Transfers", text: "Less arriving somewhere and wondering what happens next." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#0D9488]/10 text-[#0D9488]"><Icon size={20} /></div>
                <h3 className="font-bold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-gray-100">
            <div className="mb-6 flex items-center gap-2 text-[#F97316]"><Sparkles size={17} /><span className="text-xs font-bold uppercase tracking-widest">Traveller feedback</span></div>
            <p className="text-lg leading-relaxed text-gray-700">“Every part of the itinerary matched what we were quoted. Visa was ready before we flew out.”</p>
            <div className="mt-6"><p className="text-sm font-bold text-[#0D9488]">Chidinma A.</p><p className="text-xs text-gray-400">Egypt Escape · March 2026</p></div>
          </div>
          <div className="rounded-3xl bg-[#0D9488] p-7 text-white">
            <div className="mb-6 flex items-center gap-2 text-[#F97316]"><Shield size={18} /><span className="text-xs font-bold uppercase tracking-widest">A real person when you need one</span></div>
            <p className="text-2xl font-black leading-tight">Not another form that disappears into an inbox.</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">If you have a question about a trip, start the conversation directly on WhatsApp.</p>
            <button onClick={() => openWhatsApp(`Hi ${COMPANY_NAME}, I have a question about your trips.`)} className="mt-6 flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#0D9488]">
              <Send size={15} /> Start a conversation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CustomTrip() {
  const [kind, setKind] = useState("Honeymoon");
  const options = ["Honeymoon", "Family", "Beach", "Adventure", "Luxury"];
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#fff7ed] p-8 sm:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#F97316]/10 blur-3xl" />
          <div className="relative max-w-2xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#F97316]">Going somewhere else?</p>
            <h2 className="text-4xl font-black tracking-tight text-[#0D9488] sm:text-5xl">Tell us what kind of trip you want.</h2>
            <p className="mt-4 text-gray-600">Pick a starting point. We can work out the destination, dates and details with you.</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {options.map((option) => (
                <button key={option} onClick={() => setKind(option)} className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${kind === option ? "bg-[#0D9488] text-white" : "bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-[#0D9488]"}`}>
                  {option}
                </button>
              ))}
            </div>
            <button onClick={() => openWhatsApp(`Hi ${COMPANY_NAME}, I'm planning a ${kind.toLowerCase()} trip. I'd like help putting it together.`)} className="mt-7 flex items-center gap-2 rounded-full bg-[#0D9488] px-6 py-3.5 font-bold text-white transition hover:bg-[#0F766E]">
              Plan my {kind.toLowerCase()} trip <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="border-t border-gray-200 bg-gray-50 pb-24 pt-16 sm:pb-8">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-3">
        <div>
          <TextLogo large />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-500">Curated trips, visa support and the details between takeoff and check-in handled with you.</p>
          <div className="mt-5 flex gap-2">
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0D9488] shadow-sm"><Instagram size={18} /></a>
            <a href={`https://wa.me/${WA_NUMBER}`} aria-label="WhatsApp" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0D9488] shadow-sm"><Send size={18} /></a>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-[#0D9488]">Explore</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-gray-500">
            {NAV_LINKS.map((link) => <Link key={link.href} href={link.href} className="hover:text-[#0D9488]">{link.label}</Link>)}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-[#0D9488]">Talk to us</h3>
          <div className="mt-4 space-y-3 text-sm text-gray-500">
            <a href={`https://wa.me/${WA_NUMBER}`} className="flex items-center gap-2 hover:text-[#0D9488]"><Phone size={15} /> WhatsApp</a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-[#0D9488]"><Mail size={15} /> {EMAIL}</a>
            <span className="flex items-center gap-2"><MapPin size={15} /> Nigeria</span>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-gray-200 px-4 pt-7 text-center text-xs text-gray-400 sm:px-6">© 2026 {COMPANY_NAME}. All rights reserved.</div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />
      <Packages />
      <Journey />
      <WhyUs />
      <CustomTrip />
      <Footer />
      <div className="fixed inset-x-3 bottom-3 z-30 sm:hidden">
        <button onClick={() => openWhatsApp(`Hi ${COMPANY_NAME}, I'd like to talk to a travel expert.`)} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0D9488] py-4 font-bold text-white shadow-2xl">
          <Send size={17} /> Chat with a travel expert
        </button>
      </div>
    </main>
  );
}
