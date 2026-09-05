'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

const events: Record<string, { title: string; location: string; date: string; category: string; image: string; description: string; highlights: string[]; timing: string[] }> = {
  'dubai-shopping-festival': {
    title: 'Dubai Shopping Festival', location: 'Dubai, United Arab Emirates', date: 'January', category: 'Shopping & Culture', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=85',
    description: 'An opportunity to experience Dubai when the city is filled with seasonal energy, entertainment and reasons to stay a little longer.',
    highlights: ['A curated Dubai stay', 'Festival-season experiences', 'Flexible trip planning', 'Travel guidance before departure'],
    timing: ['Choose your preferred travel dates', 'Tell us how long you would like to stay', 'We discuss suitable options', 'Confirm the details and prepare for the journey'],
  },
  'new-year-in-dubai': {
    title: 'New Year in Dubai', location: 'Dubai, United Arab Emirates', date: 'December — January', category: 'Seasonal Experience', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=2200&q=85',
    description: 'End one year and begin another in one of the world’s most energetic cities, with the journey planned around your own travel preferences.',
    highlights: ['Seasonal accommodation options', 'New Year experiences', 'Trip coordination', 'Pre-departure guidance'],
    timing: ['Start with your preferred dates', 'Share your travel preferences', 'Review suitable options', 'Confirm the journey'],
  },
  'cape-town-wine-culture-weekend': {
    title: 'Cape Town Wine & Culture Weekend', location: 'Cape Town, South Africa', date: 'Selected dates', category: 'Food & Culture', image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=2200&q=85',
    description: 'A weekend shaped around the landscapes, food, wine and cultural character that make Cape Town an exceptional place to explore.',
    highlights: ['Selected accommodation', 'Wine and cultural experiences', 'Flexible itinerary planning', 'Travel guidance'],
    timing: ['Choose an available date', 'Share what interests you', 'Review the journey details', 'Confirm and prepare to travel'],
  },
};

const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

export default function EventDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const event = events[slug];

  if (!event) return <main className="grid min-h-screen place-items-center bg-[#f5f4ef] px-6 text-center"><div><p className="text-sm text-slate-500">Event not found</p><Link href="/events" className="mt-5 inline-block underline">Explore events</Link></div></main>;

  return (
    <main className="min-h-screen bg-[#f5f4ef] text-slate-950">
      <section className="relative min-h-[85vh] overflow-hidden text-white">
        <img src={event.image} alt={event.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/50" />
        <nav className="absolute inset-x-0 top-0 z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10"><Link href="/" className="font-serif text-2xl">TravelQ.</Link><Link href="/events" className="text-sm text-white/80 hover:text-white">← All events</Link></nav>
        <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl items-end px-6 pb-16 lg:px-10 lg:pb-20"><motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-5xl"><p className="text-xs uppercase tracking-[0.3em] text-white/65">{event.category} · {event.date}</p><h1 className="mt-6 font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl lg:text-[7rem]">{event.title}</h1><p className="mt-6 text-lg text-white/75">{event.location}</p></motion.div></div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[0.65fr_1.35fr] lg:px-10 lg:py-28"><div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">About the event</p></div><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}><p className="max-w-3xl font-serif text-4xl leading-tight sm:text-6xl">{event.description}</p><div className="mt-12 border-y border-slate-900/10 py-7"><div className="grid gap-8 sm:grid-cols-3"><div><p className="text-xs uppercase tracking-[0.2em] text-slate-400">Location</p><p className="mt-2 font-medium">{event.location}</p></div><div><p className="text-xs uppercase tracking-[0.2em] text-slate-400">When</p><p className="mt-2 font-medium">{event.date}</p></div><div><p className="text-xs uppercase tracking-[0.2em] text-slate-400">Type</p><p className="mt-2 font-medium">{event.category}</p></div></div></div></motion.div></section>

      <section className="bg-white px-6 py-20 lg:px-10 lg:py-28"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.65fr_1.35fr]"><div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">What to expect</p></div><div className="grid gap-5 sm:grid-cols-2">{event.highlights.map((item, i) => <div key={item} className="border-t border-slate-200 pt-5"><span className="text-xs text-slate-400">0{i + 1}</span><p className="mt-8 text-lg">{item}</p></div>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28"><div className="grid gap-14 lg:grid-cols-[0.65fr_1.35fr]"><div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">How it comes together</p></div><div className="divide-y divide-slate-900/10">{event.timing.map((item, i) => <div key={item} className="grid grid-cols-[70px_1fr] gap-5 py-7"><span className="text-sm text-slate-400">0{i + 1}</span><p className="font-serif text-2xl sm:text-3xl">{item}</p></div>)}</div></div></section>

      <section className="bg-slate-950 px-6 py-24 text-white lg:px-10 lg:py-32"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-end"><div><p className="text-xs uppercase tracking-[0.3em] text-white/40">Interested in this event?</p><h2 className="mt-7 max-w-3xl font-serif text-5xl leading-tight sm:text-7xl">Let’s plan around it.</h2></div><div><p className="max-w-lg text-lg leading-8 text-white/60">Tell us you are interested in {event.title}. We’ll already know which event you are enquiring about, so you can keep the next step simple.</p><Link href={`/contact?event=${slug}`} className="mt-8 inline-flex rounded-full bg-white px-7 py-4 text-sm font-medium text-slate-950">Enquire about this event <span className="ml-6">↗</span></Link></div></div></section>
    </main>
  );
}
