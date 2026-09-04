"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollNav from "@/components/ScrollNav";

const ease = [0.22, 1, 0.36, 1] as const;

const packages = [
  {
    slug: "dubai-escape",
    title: "Dubai Escape",
    destination: "Dubai, UAE",
    duration: "5 nights",
    category: "City break",
    description:
      "A polished introduction to Dubai, from its skyline and waterfront to the experiences that make the city impossible to do halfway.",
    includes: ["Accommodation", "Airport transfers", "City experiences"],
    price: "From £1,290",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "london-discovery",
    title: "London Discovery",
    destination: "London, United Kingdom",
    duration: "6 nights",
    category: "City break",
    description:
      "A week to experience London beyond the postcard — iconic landmarks, neighbourhoods, culture and time to find your own rhythm.",
    includes: ["Accommodation", "Airport transfers", "Curated experiences"],
    price: "From £1,480",
    image:
      "https://images.unsplash.com/photo-1488747279002-c8523379faaa?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "cape-town-explorer",
    title: "Cape Town Explorer",
    destination: "Cape Town, South Africa",
    duration: "7 nights",
    category: "Adventure",
    description:
      "Mountains, coastlines, vineyards and city life come together in one of the world's most visually rewarding destinations.",
    includes: ["Accommodation", "Selected tours", "Local experiences"],
    price: "From £1,650",
    image:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "tokyo-in-depth",
    title: "Tokyo In Depth",
    destination: "Tokyo, Japan",
    duration: "8 nights",
    category: "City break",
    description:
      "From neon streets to quiet temple gardens — a slower, more deliberate way to take in a city that rarely sits still.",
    includes: ["Accommodation", "Rail pass", "Guided neighbourhood walks"],
    price: "From £1,980",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "marrakech-and-the-atlas",
    title: "Marrakech & The Atlas",
    destination: "Marrakech, Morocco",
    duration: "6 nights",
    category: "Adventure",
    description:
      "Souks and riads in the medina, then out to the Atlas foothills for a change of altitude and pace.",
    includes: ["Riad stay", "Desert day trip", "Private guide"],
    price: "From £1,190",
    image:
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "maldives-retreat",
    title: "Maldives Retreat",
    destination: "Maldives, Indian Ocean",
    duration: "5 nights",
    category: "Luxury escape",
    description:
      "Clear water, a private stay and a schedule built entirely around doing as little as possible.",
    includes: ["Overwater villa", "All transfers", "Half-board dining"],
    price: "From £2,750",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=85",
  },
];

const categories = ["All", "City break", "Adventure", "Luxury escape"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

export default function PackagesPage() {
  const [category, setCategory] = useState("All");

  const filtered = useMemo(
    () =>
      packages.filter((p) => category === "All" || p.category === category),
    [category]
  );

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-[#181611]">
      <ScrollNav />

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-28 md:px-10 md:pb-20 md:pt-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#181611]/45">
              TravelQ journeys
            </p>
            <h1 className="mt-5 font-serif text-5xl font-medium leading-[0.94] tracking-tight sm:text-7xl">
              More than a
              <br />
              <span className="italic">destination.</span>
            </h1>
          </div>
          <p className="max-w-lg text-[15px] leading-relaxed text-[#181611]/60 md:text-[16px]">
            Start with a journey that already has a shape. Explore what it
            offers, imagine the experience, and make it your own when
            you're ready.
          </p>
        </motion.div>
      </section>

      {/* Filter */}
      <section className="sticky top-[57px] z-30 border-y border-[#181611]/10 bg-[#f4f1e9]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-6 py-4 md:px-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] transition ${
                category === c
                  ? "bg-[#181611] text-[#f4f1e9]"
                  : "bg-white text-[#181611]/55 hover:text-[#181611]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Journeys, alternating layout */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24">
        <div className="space-y-24 md:space-y-32">
          {filtered.map((item, index) => (
            <motion.article
              key={item.slug}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
              className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <Link
                  href={`/packages/${item.slug}`}
                  className="group relative block overflow-hidden rounded-2xl bg-[#e9e4d8]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="aspect-[5/6] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full border border-white/40 bg-black/15 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                    {item.category}
                  </span>
                  <span className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/50 text-[17px] text-white transition-transform duration-300 group-hover:rotate-45">
                    ↗
                  </span>
                </Link>
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611]/40">
                  {item.destination}
                </p>
                <h2 className="mt-4 font-serif text-4xl font-medium tracking-tight sm:text-5xl">
                  {item.title}
                </h2>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-[13px] text-[#181611]/55">
                  <span>{item.duration}</span>
                  <span className="h-1 w-1 rounded-full bg-[#181611]/25" />
                  <span>{item.price}</span>
                </div>
                <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#181611]/60">
                  {item.description}
                </p>

                <div className="mt-7 border-y border-[#181611]/10 py-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611]/40">
                    Journey highlights
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-[#181611]/70">
                    {item.includes.map((highlight) => (
                      <span key={highlight}>✦ {highlight}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-5">
                  <Link
                    href={`/packages/${item.slug}`}
                    className="inline-flex items-center gap-3 rounded-full bg-[#181611] px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#f4f1e9] transition hover:opacity-85"
                  >
                    View journey <span>↗</span>
                  </Link>
                  <span className="text-[13px] text-[#181611]/40">
                    Enquire when you're ready.
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#c9603f] px-6 py-24 text-[#f4f1e9] md:px-10 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f4f1e9]/60">
            How it works
          </p>
          <div>
            <h2 className="max-w-3xl font-serif text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
              Found something you'd actually like to do?
            </h2>
            <div className="mt-10 grid gap-8 border-t border-[#f4f1e9]/20 pt-6 sm:grid-cols-3">
              {["Explore the journey", "Send a short enquiry", "We follow up with you"].map(
                (step) => (
                  <p key={step} className="text-[15px] leading-relaxed">
                    {step}
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#181611] px-6 py-24 text-[#f4f1e9] md:px-10 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f4f1e9]/45">
              Still looking?
            </p>
            <h2 className="mt-6 font-serif text-4xl font-medium leading-[0.98] tracking-tight sm:text-6xl">
              The next journey doesn't have to look like anyone else's.
            </h2>
          </div>
          <div className="lg:pb-1">
            <p className="max-w-lg text-[15px] leading-relaxed text-[#f4f1e9]/60">
              Explore the destinations that interest you, or start a
              conversation about the kind of trip you have in mind.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/destinations"
                className="rounded-full bg-[#f4f1e9] px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#181611] transition hover:opacity-85"
              >
                Explore destinations
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-[#f4f1e9]/30 px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#f4f1e9] transition hover:bg-[#f4f1e9]/10"
              >
                Start a conversation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f4f1e9] px-6 py-12 text-[#181611] md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-10 border-b border-[#181611]/10 pb-10 md:flex-row">
            <div>
              <p className="text-[14px] font-semibold tracking-tight">TRAVELQ</p>
              <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-[#181611]/50">
                Curated journeys and destinations worth travelling for.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#181611]/55">
              <Link href="/destinations" className="hover:text-[#181611]">Destinations</Link>
              <Link href="/packages" className="hover:text-[#181611]">Packages</Link>
              <Link href="/events" className="hover:text-[#181611]">Events</Link>
              <Link href="/journal" className="hover:text-[#181611]">Journal</Link>
              <Link href="/about" className="hover:text-[#181611]">About</Link>
              <Link href="/contact" className="hover:text-[#181611]">Contact</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-2 pt-6 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#181611]/35 sm:flex-row">
            <span>© 2026 TravelQ</span>
            <span>Travel well. Go further.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
