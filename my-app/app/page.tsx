"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/* Data — same shape as v1, kept as the content spec                   */
/* ------------------------------------------------------------------ */

const destinations = [
  {
    slug: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "london",
    name: "London",
    country: "United Kingdom",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "paris",
    name: "Paris",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    image:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "bali",
    name: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "santorini",
    name: "Santorini",
    country: "Greece",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85",
  },
];

const packages = [
  {
    slug: "dubai-escape",
    title: "Dubai Escape",
    meta: "5 Nights · Dubai",
    description:
      "A polished city break with hotel stay, transfers and carefully selected experiences.",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1400&q=85",
    price: "From £1,290",
  },
  {
    slug: "london-discovery",
    title: "London Discovery",
    meta: "6 Nights · London",
    description:
      "See the city beyond the landmarks with a comfortable stay and curated experiences.",
    image:
      "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=1400&q=85",
    price: "From £1,480",
  },
  {
    slug: "cape-town-explorer",
    title: "Cape Town Explorer",
    meta: "7 Nights · Cape Town",
    description:
      "Mountain views, coastal drives and unforgettable experiences across the Cape.",
    image:
      "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=1400&q=85",
    price: "From £1,650",
  },
];

const events = [
  {
    slug: "dubai-shopping-festival",
    title: "Dubai Shopping Festival",
    date: "Seasonal · Dubai",
    image:
      "https://images.unsplash.com/photo-1528114039593-4366cc08227d?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "new-year-in-dubai",
    title: "New Year in Dubai",
    date: "31 December · Dubai",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=85",
  },
];

const journal = [
  {
    slug: "plan-a-trip-that-feels-effortless",
    title: "How to plan a trip that feels effortless",
    category: "Travel planning",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "travelling-with-intention",
    title: "The art of travelling with intention",
    category: "Inspiration",
    image:
      "https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "five-experiences-worth-travelling-for",
    title: "Five experiences worth travelling for",
    category: "Experiences",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85",
  },
];

const sections = [
  { id: "destinations", label: "Destinations" },
  { id: "packages", label: "Journeys" },
  { id: "process", label: "Process" },
  { id: "events", label: "Events" },
  { id: "journal", label: "Journal" },
];

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease },
};

/* ------------------------------------------------------------------ */
/* Scroll-aware nav — same visual language as the rest of the page.    */
/* Hides on scroll down, reappears on scroll up, and switches from     */
/* transparent-on-hero to a frosted ink bar once past the hero.        */
/* ------------------------------------------------------------------ */

function ScrollNav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setSolid(y > 80);
  });

  const navLinks = [
    { href: "/destinations", label: "Destinations" },
    { href: "/packages", label: "Journeys" },
    { href: "/events", label: "Events" },
    { href: "/journal", label: "Journal" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 transition-colors duration-500 md:px-10 ${
        solid
          ? "border-b border-[#181611]/10 bg-[#f4f1e9]/90 backdrop-blur-md"
          : "bg-[#181611]/10 backdrop-blur-sm"
      }`}
    >
      <Link
        href="/"
        className={`text-[14px] font-semibold tracking-tight transition-colors ${
          solid ? "text-[#181611]" : "text-[#181611] md:text-white"
        }`}
      >
        TRAVELQ
      </Link>

      {/* Desktop menu — always visible, consistent styling regardless of scroll */}
      <div
        className={`hidden items-center gap-8 text-[11px] font-medium uppercase tracking-[0.15em] transition-colors md:flex ${
          solid ? "text-[#181611]/65" : "text-white/80"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="transition-opacity hover:opacity-70"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/contact"
          className={`hidden rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] transition sm:inline-block ${
            solid
              ? "border-[#181611]/30 text-[#181611] hover:bg-[#181611] hover:text-[#f4f1e9]"
              : "border-white/40 text-white hover:bg-white hover:text-black"
          }`}
        >
          Contact
        </Link>

        {/* Mobile menu toggle — so small screens get more than just Contact */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          className={`flex h-9 w-9 items-center justify-center rounded-full border transition md:hidden ${
            solid
              ? "border-[#181611]/30 text-[#181611]"
              : "border-white/40 text-white"
          }`}
        >
          <div className="flex flex-col gap-[3px]">
            <span className="h-[1.5px] w-4 bg-current" />
            <span className="h-[1.5px] w-4 bg-current" />
          </div>
        </button>
      </div>

      {/* Mobile menu panel */}
      <motion.div
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 right-0 top-full overflow-hidden border-b border-[#181611]/10 bg-[#f4f1e9] md:hidden"
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-[13px] font-medium uppercase tracking-[0.1em] text-[#181611]/75"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 w-fit rounded-full bg-[#181611] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#f4f1e9]"
          >
            Contact
          </Link>
        </div>
      </motion.div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <main className="bg-[#f4f1e9] text-[#181611]">
      <ScrollNav />

      {/* Sticky side-index nav — replaces the usual floating hamburger/nav */}
      <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 md:flex">
        {sections.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#181611]/40 transition hover:text-[#181611]"
          >
            <span className="hidden font-sans font-semibold group-hover:inline">{s.label}</span>
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-[#181611]/30 transition group-hover:scale-150 group-hover:bg-[#c9603f]" />
            </span>
          </a>
        ))}
      </div>

      {/* ---------------------------------------------------------- */}
      {/* HERO — split panel, not full-bleed dark video              */}
      {/* ---------------------------------------------------------- */}
      <section className="relative flex min-h-[100svh] flex-col md:flex-row">
        {/* Left: ink panel with oversized display type */}
        <div className="flex min-h-[56svh] w-full flex-col justify-end bg-[#181611] px-6 pb-12 pt-24 text-[#f4f1e9] md:min-h-[100svh] md:w-[46%] md:px-10 md:pb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-5 font-sans font-semibold text-[11px] uppercase tracking-[0.2em] text-[#f4f1e9]/50"
          >
            Curated journeys / est. 2019
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.3, ease }}
              className="font-serif text-[15vw] font-medium leading-[0.86] tracking-tight md:text-[4.6vw]"
            >
              Go
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.44, ease }}
              className="font-serif text-[15vw] font-medium italic leading-[0.86] tracking-tight text-[#f4f1e9]/70 md:text-[4.6vw]"
            >
              somewhere
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.58, ease }}
              className="font-serif text-[15vw] font-medium leading-[0.86] tracking-tight md:text-[4.6vw]"
            >
              real.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-7 max-w-sm text-[14px] leading-relaxed text-[#f4f1e9]/55"
          >
            Thoughtfully planned trips and destinations worth the time it
            takes to get there.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.92 }}
          >
            <Link
              href="/packages"
              className="mt-8 inline-block w-fit rounded-full bg-[#f4f1e9] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611] transition hover:opacity-85"
            >
              Explore journeys
            </Link>
          </motion.div>
        </div>

        {/* Right: cinematic video, poster fallback keeps it safe pre-load */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease }}
          className="relative min-h-[44svh] w-full overflow-hidden md:min-h-[100svh] md:w-[54%]"
        >
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={destinations[0].image}
          >
            <source src="/videos/luxury.mp4" type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#181611]/15" />
        </motion.div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* MARQUEE TICKER — replaces a second static intro section    */}
      {/* ---------------------------------------------------------- */}
      <div className="overflow-hidden border-y border-[#181611]/10 bg-[#f4f1e9] py-4">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity }}
          className="flex w-max gap-10 font-sans font-semibold text-[12px] uppercase tracking-[0.2em] text-[#181611]/45"
        >
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-10">
              <span>Dubai</span>
              <span>·</span>
              <span>London</span>
              <span>·</span>
              <span>Paris</span>
              <span>·</span>
              <span>Cape Town</span>
              <span>·</span>
              <span>Journeys planned, not guessed</span>
              <span>·</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* DESTINATIONS — 6 tiles, tilted for character, packed in a clean grid */}
      {/* ---------------------------------------------------------- */}
      <section id="destinations" className="scroll-mt-24 px-6 py-24 md:px-10 md:py-32">
        <motion.div {...fadeUp} className="mx-auto mb-16 max-w-7xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#181611]/40">
            01 / Destinations
          </p>
          <h2 className="max-w-xl font-serif text-4xl font-medium leading-[0.98] tracking-tight md:text-6xl">
            Where will you go?
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-20 sm:grid-cols-3 md:gap-x-8">
          {destinations.map((d, i) => {
            const rotations = [-3, 2, -2, 3, -2, 2];
            return (
              <motion.div
                key={d.slug}
                initial={{ opacity: 0, y: 30, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: rotations[i] }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.06, ease }}
                className="group relative mx-auto w-full max-w-[260px]"
              >
                <Link href={`/destinations/${d.slug}`} className="block">
                  <div className="aspect-[3/4] w-full overflow-hidden shadow-xl">
                    <img
                      src={d.image}
                      alt={`${d.name}, ${d.country}`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div
                    className="absolute -bottom-6 left-4 rounded-lg bg-[#181611] px-3 py-2 text-[#f4f1e9] shadow-lg"
                    style={{ transform: `rotate(${-rotations[i]}deg)` }}
                  >
                    <p className="text-[9px] font-medium uppercase tracking-wide text-[#f4f1e9]/50">
                      {d.country}
                    </p>
                    <p className="font-serif text-[16px] leading-tight">{d.name}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* PACKAGES — terracotta section                              */}
      {/* ---------------------------------------------------------- */}
      <section id="packages" className="scroll-mt-24 bg-[#c9603f] px-6 py-24 text-[#f4f1e9] md:px-10 md:py-32">
        <motion.div {...fadeUp} className="mx-auto mb-14 max-w-7xl">
          <p className="mb-3 font-sans font-semibold text-[11px] uppercase tracking-[0.2em] text-[#f4f1e9]/60">
            02 / Featured journeys
          </p>
          <h2 className="max-w-2xl font-serif text-4xl font-medium leading-[0.98] tracking-tight md:text-6xl">
            Journeys, already imagined.
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3 md:gap-6">
          {packages.map((item, index) => (
            <motion.article
              key={item.slug}
              {...fadeUp}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/packages/${item.slug}`}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-[#f4f1e9] px-3 py-1 font-sans font-semibold text-[10px] font-semibold text-[#181611]">
                    {item.price}
                  </span>
                </div>
                <p className="mt-4 font-sans font-semibold text-[10px] uppercase tracking-[0.15em] text-[#f4f1e9]/55">
                  {item.meta}
                </p>
                <h3 className="mt-1 font-serif text-2xl font-medium tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-[#f4f1e9]/65">
                  {item.description}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* PROCESS — cream, numbered rows                             */}
      {/* ---------------------------------------------------------- */}
      <section id="process" className="scroll-mt-24 px-6 py-24 md:px-10 md:py-32">
        <motion.div {...fadeUp} className="mx-auto mb-14 max-w-7xl">
          <p className="mb-3 font-sans font-semibold text-[11px] uppercase tracking-[0.2em] text-[#181611]/40">
            03 / How it works
          </p>
          <h2 className="max-w-xl font-serif text-4xl font-medium leading-[0.98] tracking-tight md:text-6xl">
            You choose where. We handle the rest.
          </h2>
        </motion.div>

        <div className="mx-auto max-w-7xl divide-y divide-[#181611]/10 border-y border-[#181611]/10">
          {[
            { step: "Discover", copy: "Find destinations and experiences that fit your next trip." },
            { step: "Explore", copy: "Browse journeys designed around the places you want to see." },
            { step: "Enquire", copy: "Tell us what caught your eye — keep it simple." },
            { step: "Go", copy: "We confirm the details. You get ready to travel." },
          ].map((row, i) => (
            <motion.div
              key={row.step}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="flex flex-col justify-between gap-2 py-7 md:flex-row md:items-center md:py-9"
            >
              <div className="flex items-baseline gap-6">
                <span className="font-sans font-semibold text-[11px] text-[#c9603f]">0{i + 1}</span>
                <h3 className="font-serif text-3xl font-medium tracking-tight md:text-4xl">
                  {row.step}
                </h3>
              </div>
              <p className="max-w-xs text-[13px] leading-relaxed text-[#181611]/55 md:text-right">
                {row.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* EVENTS — olive section                                     */}
      {/* ---------------------------------------------------------- */}
      <section id="events" className="scroll-mt-24 bg-[#4a4a35] px-6 py-24 text-[#f4f1e9] md:px-10 md:py-32">
        <motion.div {...fadeUp} className="mx-auto mb-12 max-w-7xl">
          <p className="mb-3 font-sans font-semibold text-[11px] uppercase tracking-[0.2em] text-[#f4f1e9]/55">
            04 / Events
          </p>
          <h2 className="max-w-xl font-serif text-4xl font-medium leading-[0.98] tracking-tight md:text-6xl">
            Travel has a social side.
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[1.5fr_1fr]">
          {events.map((event, index) => (
            <motion.article
              key={event.slug}
              {...fadeUp}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="group relative min-h-[380px] overflow-hidden rounded-2xl md:min-h-[480px]"
            >
              <Link href={`/events/${event.slug}`}>
                <img
                  src={event.image}
                  alt={event.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="mb-2 font-sans font-semibold text-[10px] uppercase tracking-[0.15em] text-white/65">
                    {event.date}
                  </p>
                  <h3 className="max-w-sm font-serif text-3xl font-medium leading-tight tracking-tight text-white md:text-4xl">
                    {event.title}
                  </h3>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* JOURNAL — cream                                            */}
      {/* ---------------------------------------------------------- */}
      <section id="journal" className="scroll-mt-24 px-6 py-24 md:px-10 md:py-32">
        <motion.div {...fadeUp} className="mx-auto mb-14 max-w-7xl">
          <p className="mb-3 font-sans font-semibold text-[11px] uppercase tracking-[0.2em] text-[#181611]/40">
            05 / Journal
          </p>
          <h2 className="max-w-xl font-serif text-4xl font-medium leading-[0.98] tracking-tight md:text-6xl">
            Stories for the road.
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          {journal.map((post, index) => (
            <motion.article
              key={post.slug}
              {...fadeUp}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/journal/${post.slug}`}>
                <div className="aspect-[1.2/1] overflow-hidden rounded-2xl bg-[#e9e4d8]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-4 font-sans font-semibold text-[10px] uppercase tracking-[0.15em] text-[#181611]/40">
                  {post.category}
                </p>
                <h3 className="mt-1 max-w-sm font-serif text-xl font-medium leading-tight tracking-tight">
                  {post.title}
                </h3>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* CTA — ink                                                  */}
      {/* ---------------------------------------------------------- */}
      <section className="relative min-h-[60svh] overflow-hidden bg-[#181611] text-[#f4f1e9]">
        <motion.div
          {...fadeUp}
          className="relative z-10 flex min-h-[60svh] flex-col justify-center px-6 py-16 md:px-10"
        >
          <p className="mb-4 font-sans font-semibold text-[11px] uppercase tracking-[0.2em] text-[#f4f1e9]/50">
            06 / Your next chapter
          </p>
          <h2 className="max-w-4xl font-serif text-5xl font-medium leading-[0.9] tracking-tight md:text-8xl">
            Where will you go next?
          </h2>
          <Link
            href="/destinations"
            className="mt-8 w-fit rounded-full bg-[#f4f1e9] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611] transition hover:opacity-85"
          >
            Explore destinations
          </Link>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* FOOTER                                                     */}
      {/* ---------------------------------------------------------- */}
      <footer className="bg-[#f4f1e9] px-6 py-12 text-[#181611] md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-10 border-b border-[#181611]/10 pb-10 md:flex-row">
            <div>
              <p className="font-sans font-semibold text-[14px] tracking-tight">TRAVELQ</p>
              <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-[#181611]/50">
                Curated journeys and destinations worth travelling for.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-2 font-sans font-semibold text-[11px] uppercase tracking-[0.12em] text-[#181611]/55">
              <Link href="/destinations" className="hover:text-[#181611]">Destinations</Link>
              <Link href="/packages" className="hover:text-[#181611]">Packages</Link>
              <Link href="/events" className="hover:text-[#181611]">Events</Link>
              <Link href="/journal" className="hover:text-[#181611]">Journal</Link>
              <Link href="/about" className="hover:text-[#181611]">About</Link>
              <Link href="/contact" className="hover:text-[#181611]">Contact</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-2 pt-6 font-sans font-semibold text-[10px] uppercase tracking-[0.12em] text-[#181611]/35 sm:flex-row">
            <span>© 2026 TravelQ</span>
            <span>Travel well. Go further.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
