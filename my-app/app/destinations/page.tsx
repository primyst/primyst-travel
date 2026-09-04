"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollNav from "@/components/ScrollNav";

const ease = [0.22, 1, 0.36, 1] as const;

const destinations = [
  {
    slug: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    description:
      "Skyline views, desert adventures, world-class dining and a city that moves at its own pace.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=85",
  },
  {
    slug: "london",
    name: "London",
    country: "United Kingdom",
    region: "Europe",
    description:
      "Historic landmarks, neighbourhood character and an endless list of things worth discovering.",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1400&q=85",
  },
  {
    slug: "paris",
    name: "Paris",
    country: "France",
    region: "Europe",
    description:
      "Architecture, art, cafés and the kind of atmosphere that rewards taking your time.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=85",
  },
  {
    slug: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    region: "Africa",
    description:
      "A rare meeting point of mountains, ocean, vineyards and unforgettable landscapes.",
    image:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1400&q=85",
  },
  {
    slug: "istanbul",
    name: "Istanbul",
    country: "Türkiye",
    region: "Europe",
    description:
      "A city shaped by two continents, rich history and a culture best experienced firsthand.",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1400&q=85",
  },
  {
    slug: "maldives",
    name: "Maldives",
    country: "Indian Ocean",
    region: "Asia",
    description:
      "Clear water, secluded stays and a slower rhythm for when the journey is about switching off.",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=85",
  },
  {
    slug: "tokyo",
    name: "Tokyo",
    country: "Japan",
    region: "Asia",
    description:
      "Neon streets, quiet temples and a precision to daily life that's worth experiencing firsthand.",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1400&q=85",
  },
  {
    slug: "new-york",
    name: "New York",
    country: "United States",
    region: "Americas",
    description:
      "A skyline, a pace and a mix of neighbourhoods that never quite feels finished discovering.",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1400&q=85",
  },
  {
    slug: "rome",
    name: "Rome",
    country: "Italy",
    region: "Europe",
    description:
      "History underfoot at every turn, and food that gives you a reason to slow down.",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1400&q=85",
  },
  {
    slug: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    region: "Africa",
    description:
      "Souks, riads and a colour palette that stays with you long after the trip ends.",
    image:
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1400&q=85",
  },
  {
    slug: "reykjavik",
    name: "Reykjavik",
    country: "Iceland",
    region: "Europe",
    description:
      "Glaciers, geothermal water and landscapes that feel like they belong to another planet.",
    image:
      "https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=1400&q=85",
  },
  {
    slug: "zanzibar",
    name: "Zanzibar",
    country: "Tanzania",
    region: "Africa",
    description:
      "Spice-scented streets in Stone Town, and coastline built for doing absolutely nothing.",
    image:
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1400&q=85",
  },
];

const regions = ["All", "Europe", "Middle East", "Africa", "Asia", "Americas"];

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease },
};

export default function DestinationsPage() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const matchesRegion = region === "All" || d.region === region;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q.length === 0 ||
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q);
      return matchesRegion && matchesQuery;
    });
  }, [query, region]);

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-[#181611]">
      <ScrollNav />

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-28 md:px-10 md:pt-32">
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="max-w-4xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#181611]/45">
            Destinations
          </p>
          <h1 className="mt-5 font-serif text-5xl font-medium leading-[0.94] tracking-tight sm:text-7xl">
            Find somewhere
            <br />
            <em className="not-italic font-serif italic">worth going.</em>
          </h1>
          <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-[#181611]/60 md:text-[16px]">
            Some trips begin with a plan. Others begin with a place you
            can't stop thinking about — start with what interests you.
          </p>
        </motion.div>
      </section>

      {/* Search + region filter */}
      <section className="sticky top-[57px] z-30 border-y border-[#181611]/10 bg-[#f4f1e9]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-10">
          <div className="relative w-full max-w-xs">
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#181611]/40"
              fill="none"
            >
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a destination or country"
              className="w-full rounded-full border border-[#181611]/15 bg-white py-2.5 pl-9 pr-4 text-[13px] text-[#181611] placeholder:text-[#181611]/35 focus:border-[#c9603f] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] transition ${
                  region === r
                    ? "bg-[#181611] text-[#f4f1e9]"
                    : "bg-white text-[#181611]/55 hover:text-[#181611]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-[14px] text-[#181611]/45">
            No destinations match that search.
          </p>
        ) : (
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((d, i) => (
              <motion.article
                key={d.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease }}
                className="group"
              >
                <Link href={`/destinations/${d.slug}`} className="block">
                  <div className="relative overflow-hidden rounded-2xl bg-[#e9e4d8]">
                    <img
                      src={d.image}
                      alt={`${d.name}, ${d.country}`}
                      className="aspect-[4/5] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.15em]">
                        {d.region}
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50 text-[15px] transition-transform duration-300 group-hover:rotate-45">
                        ↗
                      </span>
                    </div>
                  </div>
                  <div className="mt-5">
                    <h2 className="font-serif text-2xl font-medium tracking-tight">
                      {d.name}
                    </h2>
                    <p className="mt-0.5 text-[12px] text-[#181611]/45">{d.country}</p>
                    <p className="mt-3 max-w-md text-[13px] leading-relaxed text-[#181611]/60">
                      {d.description}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-[#181611] px-6 py-24 text-[#f4f1e9] md:px-10 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <motion.div {...fadeUp}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f4f1e9]/45">
              Not sure where to start?
            </p>
            <h2 className="mt-6 font-serif text-4xl font-medium leading-[0.98] tracking-tight sm:text-6xl">
              The right journey might start with a conversation.
            </h2>
          </motion.div>
          <motion.div {...fadeUp} className="lg:pb-1">
            <p className="max-w-lg text-[15px] leading-relaxed text-[#f4f1e9]/60">
              Tell us what kind of trip you have in mind — a city break, a
              major event, or somewhere entirely new. We can help you take
              the next step.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex w-fit items-center gap-3 rounded-full bg-[#f4f1e9] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611] transition hover:opacity-85"
            >
              Start planning <span>↗</span>
            </Link>
          </motion.div>
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
