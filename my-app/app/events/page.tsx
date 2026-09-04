'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const events = [
  {
    title: 'Dubai Shopping Festival',
    location: 'Dubai, United Arab Emirates',
    date: 'January 15 — February 1, 2027',
    category: 'Festival',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1800&q=85',
    description: 'A seasonal reason to experience Dubai beyond the itinerary — from retail and dining to entertainment across the city.',
  },
  {
    title: 'New Year in Dubai',
    location: 'Dubai, United Arab Emirates',
    date: 'December 29, 2026 — January 3, 2027',
    category: 'Seasonal Journey',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1800&q=85',
    description: 'End one year and begin the next in one of the world’s most energetic cities.',
  },
  {
    title: 'Cape Town Wine & Culture Weekend',
    location: 'Cape Town, South Africa',
    date: 'March 12 — 16, 2027',
    category: 'Experience',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1800&q=85',
    description: 'A long weekend built around scenery, local culture, vineyards and the unmistakable character of Cape Town.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] text-slate-950">
      <header className="border-b border-slate-900/10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <Link href="/" className="font-serif text-2xl tracking-tight">TravelQ.</Link>
          <div className="hidden items-center gap-8 text-sm md:flex">
            <Link href="/destinations" className="text-slate-500 hover:text-slate-950">Destinations</Link>
            <Link href="/packages" className="text-slate-500 hover:text-slate-950">Packages</Link>
            <Link href="/events" className="font-medium">Events</Link>
            <Link href="/blog" className="text-slate-500 hover:text-slate-950">Journal</Link>
            <Link href="/about" className="text-slate-500 hover:text-slate-950">About</Link>
            <Link href="/contact" className="rounded-full bg-slate-950 px-5 py-2.5 text-white">Contact</Link>
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Events / Experiences</p>
          <h1 className="mt-6 font-serif text-5xl leading-[0.94] tracking-[-0.045em] sm:text-7xl lg:text-[8rem]">Travel for<br /><em>something more.</em></h1>
          <p className="mt-10 max-w-2xl text-lg leading-8 text-slate-600">Some journeys are about the destination. Others happen because something worth experiencing is waiting there. Discover events and seasonal experiences that give your next trip a reason.</p>
        </motion.div>
      </section>

      <section className="px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <motion.article initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="group grid overflow-hidden bg-slate-950 text-white lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[480px] overflow-hidden lg:min-h-[650px]">
              <img src={events[0].image} alt={events[0].title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
              <span className="absolute left-7 top-7 rounded-full border border-white/30 px-4 py-2 text-xs backdrop-blur-sm">Featured event</span>
            </div>
            <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-16">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-white/45">{events[0].category}</span>
                <h2 className="mt-6 font-serif text-5xl leading-none tracking-tight sm:text-6xl">{events[0].title}</h2>
                <p className="mt-7 max-w-md leading-7 text-white/60">{events[0].description}</p>
              </div>
              <div className="mt-16 border-t border-white/15 pt-7">
                <div className="flex flex-col gap-2 text-sm text-white/60 sm:flex-row sm:justify-between">
                  <span>{events[0].date}</span><span>{events[0].location}</span>
                </div>
                <Link href="/contact" className="mt-8 inline-flex items-center rounded-full bg-white px-6 py-3.5 text-sm font-medium text-slate-950">Enquire about this event <span className="ml-6">↗</span></Link>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="mb-12 flex items-end justify-between gap-8">
          <div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">More to experience</p><h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">On the calendar.</h2></div>
          <p className="hidden max-w-sm text-right leading-7 text-slate-500 md:block">Travel opportunities tied to a moment, season or experience worth planning around.</p>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          {events.slice(1).map((event, index) => (
            <motion.article key={event.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp} transition={{ delay: index * 0.08 }} className="group">
              <div className="relative overflow-hidden"><img src={event.image} alt={event.title} className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.04]" /><span className="absolute left-5 top-5 rounded-full bg-black/35 px-3 py-1.5 text-xs text-white backdrop-blur-sm">{event.category}</span></div>
              <div className="mt-6 flex items-start justify-between gap-6"><div><p className="text-sm text-slate-400">{event.date}</p><h3 className="mt-2 font-serif text-3xl tracking-tight">{event.title}</h3></div><span className="text-xs text-slate-400">0{index + 2}</span></div>
              <p className="mt-4 max-w-xl leading-7 text-slate-600">{event.description}</p>
              <div className="mt-6 flex items-center justify-between border-t border-slate-900/10 pt-5 text-sm"><span className="text-slate-500">{event.location}</span><Link href="/contact" className="font-medium">View details ↗</Link></div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}><p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">See something you like?</p></motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}><h2 className="font-serif text-5xl leading-tight tracking-tight sm:text-7xl">A good reason to travel is a good place to start.</h2><p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">Tell us which event interests you and a little about your plans. We will follow up with the next steps.</p><Link href="/contact" className="mt-9 inline-flex rounded-full bg-slate-950 px-7 py-4 text-sm font-medium text-white">Start an enquiry <span className="ml-6">↗</span></Link></motion.div>
        </div>
      </section>

      <footer className="bg-[#f5f4ef] px-6 py-10 lg:px-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 border-t border-slate-900/10 pt-8 text-sm text-slate-500 sm:flex-row"><span className="font-serif text-xl text-slate-950">TravelQ.</span><span>Thoughtful journeys. Remarkable places.</span><span>© {new Date().getFullYear()} TravelQ</span></div></footer>
    </main>
  );
}
