'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const destinations = [
  {
    name: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Middle East',
    description: 'Skyline views, desert adventures, world-class dining and a city that moves at its own pace.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=85',
  },
  {
    name: 'London',
    country: 'United Kingdom',
    region: 'Europe',
    description: 'Historic landmarks, neighbourhood character and an endless list of things worth discovering.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1400&q=85',
  },
  {
    name: 'Paris',
    country: 'France',
    region: 'Europe',
    description: 'Architecture, art, cafés and the kind of atmosphere that rewards taking your time.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=85',
  },
  {
    name: 'Cape Town',
    country: 'South Africa',
    region: 'Africa',
    description: 'A rare meeting point of mountains, ocean, vineyards and unforgettable landscapes.',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1400&q=85',
  },
  {
    name: 'Istanbul',
    country: 'Türkiye',
    region: 'Europe & Asia',
    description: 'A city shaped by two continents, rich history and a culture best experienced firsthand.',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1400&q=85',
  },
  {
    name: 'Maldives',
    country: 'Indian Ocean',
    region: 'Asia',
    description: 'Clear water, secluded stays and a slower rhythm for when the journey is about switching off.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=85',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] text-slate-950">
      <header className="border-b border-slate-900/10 bg-[#f5f4ef]">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <Link href="/" className="font-serif text-2xl tracking-tight">TravelQ.</Link>
          <div className="hidden items-center gap-8 text-sm md:flex">
            <Link href="/destinations" className="font-medium">Destinations</Link>
            <Link href="/packages" className="text-slate-500 transition-colors hover:text-slate-950">Packages</Link>
            <Link href="/events" className="text-slate-500 transition-colors hover:text-slate-950">Events</Link>
            <Link href="/blog" className="text-slate-500 transition-colors hover:text-slate-950">Journal</Link>
            <Link href="/about" className="text-slate-500 transition-colors hover:text-slate-950">About</Link>
            <Link href="/contact" className="rounded-full bg-slate-950 px-5 py-2.5 text-white transition-transform hover:-translate-y-0.5">Contact</Link>
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-20 lg:px-10 lg:pb-24 lg:pt-28">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Destinations / 01—06</p>
          <h1 className="mt-6 font-serif text-5xl leading-[0.94] tracking-[-0.045em] sm:text-7xl lg:text-[8rem]">Find somewhere<br /><em>worth going.</em></h1>
          <div className="mt-10 grid max-w-3xl gap-6 text-base leading-7 text-slate-600 sm:grid-cols-2 sm:text-lg">
            <p>Some trips begin with a plan. Others begin with a place you cannot stop thinking about.</p>
            <p>Start with the destinations that interest you and see where the journey could take you.</p>
          </div>
        </motion.div>
      </section>

      <section className="border-y border-slate-900/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-10 gap-y-3 px-6 py-5 text-sm lg:px-10">
          <span className="font-medium">Explore by region</span>
          {['All destinations', 'Europe', 'Middle East', 'Africa', 'Asia'].map((item, index) => (
            <button key={item} className={index === 0 ? 'text-slate-950' : 'text-slate-400 transition-colors hover:text-slate-950'}>{item}</button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination, index) => (
            <motion.article
              key={destination.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <Link href={`/destinations/${destination.name.toLowerCase()}`} className="block">
                <div className="relative overflow-hidden bg-slate-200">
                  <img
                    src={destination.image}
                    alt={`${destination.name}, ${destination.country}`}
                    className="aspect-[4/5] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
                    <span className="text-xs tracking-[0.2em] uppercase">{destination.region}</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 text-lg transition-transform duration-300 group-hover:rotate-45">↗</span>
                  </div>
                </div>
                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <h2 className="font-serif text-3xl tracking-tight">{destination.name}</h2>
                    <p className="mt-1 text-sm text-slate-400">{destination.country}</p>
                  </div>
                  <span className="pt-2 text-xs text-slate-400">0{index + 1}</span>
                </div>
                <p className="mt-4 max-w-md leading-7 text-slate-600">{destination.description}</p>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-24 text-white lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1fr] lg:items-end">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">Not sure where to start?</p>
            <h2 className="mt-7 font-serif text-5xl leading-[0.98] tracking-tight sm:text-7xl">The right journey might start with a conversation.</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="lg:pb-2">
            <p className="max-w-lg text-lg leading-8 text-white/60">Tell us what kind of trip you have in mind. A city break, a major event, a special occasion or simply somewhere new — we can help you take the next step.</p>
            <Link href="/contact" className="mt-8 inline-flex rounded-full bg-white px-7 py-4 text-sm font-medium text-slate-950 transition-transform hover:-translate-y-0.5">Start planning <span className="ml-6">↗</span></Link>
          </motion.div>
        </div>
      </section>

      <footer className="bg-[#f5f4ef] px-6 py-10 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 border-t border-slate-900/10 pt-8 text-sm text-slate-500 sm:flex-row">
          <span className="font-serif text-xl text-slate-950">TravelQ.</span>
          <span>Thoughtful journeys. Remarkable places.</span>
          <span>© {new Date().getFullYear()} TravelQ</span>
        </div>
      </footer>
    </main>
  );
}
