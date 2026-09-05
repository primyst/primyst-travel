'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const destinations = {
  dubai: {
    name: 'Dubai', country: 'United Arab Emirates', region: 'Middle East',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=85',
    intro: 'A city of contrasts where extraordinary architecture, desert landscapes and coastal living exist within one journey.',
    description: 'Dubai can be exactly what you want it to be. Spend your days exploring the city, head beyond it into the desert, discover its coastline, or simply take your time. The experience changes with the journey you choose.',
    highlights: ['Downtown & Burj Khalifa', 'Desert experiences', 'Dubai Marina', 'Shopping & dining'],
    package: 'Dubai Escape', duration: '5 nights', packageImage: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=1400&q=85',
  },
  london: {
    name: 'London', country: 'United Kingdom', region: 'Europe',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2200&q=85',
    intro: 'Historic streets, contemporary culture and a different discovery waiting in almost every neighbourhood.',
    description: 'London rewards curiosity. See the landmarks, then leave room for everything between them — neighbourhood cafés, galleries, markets, parks and the small discoveries that make a city memorable.',
    highlights: ['Historic landmarks', 'Neighbourhoods & culture', 'Museums & galleries', 'Food & city life'],
    package: 'London Discovery', duration: '6 nights', packageImage: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1400&q=85',
  },
  paris: {
    name: 'Paris', country: 'France', region: 'Europe',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2200&q=85',
    intro: 'A city best experienced with enough time to wander, stop, look up and discover what is beyond the obvious.',
    description: 'Paris is full of landmarks, but its atmosphere lives in the spaces between them. Take your time with its streets, cafés, architecture and neighbourhoods, and let the city unfold at its own pace.',
    highlights: ['Art & architecture', 'Cafés & dining', 'Iconic landmarks', 'Neighbourhood walks'],
    package: 'Paris at Your Pace', duration: '5 nights', packageImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=85',
  },
  'cape-town': {
    name: 'Cape Town', country: 'South Africa', region: 'Africa',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=2200&q=85',
    intro: 'Few cities bring mountains, ocean, vineyards and adventure together quite like Cape Town.',
    description: 'Cape Town offers several journeys in one destination. Explore dramatic coastlines, spend time in the city, discover the surrounding winelands or head out into landscapes that make the journey itself part of the experience.',
    highlights: ['Table Mountain', 'Coastal routes', 'Winelands', 'Culture & cuisine'],
    package: 'Cape Town Explorer', duration: '7 nights', packageImage: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&w=1400&q=85',
  },
} as const;

const fallback = destinations.dubai;
const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

export default function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const destination = destinations[params.slug as keyof typeof destinations] || fallback;

  return (
    <main className="min-h-screen bg-[#f5f4ef] text-slate-950">
      <section className="relative min-h-[86vh] overflow-hidden text-white">
        <img src={destination.image} alt={`${destination.name}, ${destination.country}`} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/35" />
        <header className="absolute inset-x-0 top-0 z-10 border-b border-white/15">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
            <Link href="/" className="font-serif text-2xl">TravelQ.</Link>
            <div className="hidden items-center gap-8 text-sm md:flex">
              <Link href="/destinations">Destinations</Link><Link href="/packages">Packages</Link><Link href="/events">Events</Link><Link href="/blog">Journal</Link><Link href="/about">About</Link><Link href="/contact" className="rounded-full border border-white/50 px-5 py-2.5">Contact</Link>
            </div>
          </nav>
        </header>
        <div className="relative z-10 mx-auto flex min-h-[86vh] max-w-7xl items-end px-6 pb-16 pt-32 lg:px-10 lg:pb-24">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-xs uppercase tracking-[0.3em] text-white/65">{destination.region} · {destination.country}</p>
            <h1 className="mt-5 font-serif text-6xl tracking-tight sm:text-8xl lg:text-[10rem]">{destination.name}</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">{destination.intro}</p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.7fr_1.3fr] lg:px-10 lg:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">About {destination.name}</p>
        <div><h2 className="font-serif text-4xl leading-tight sm:text-6xl">More than a place to visit.</h2><p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">{destination.description}</p></div>
      </section>

      <section className="bg-white px-6 py-24 lg:px-10 lg:py-32"><div className="mx-auto max-w-7xl"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">What to experience</p><div className="mt-14 grid border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-4">{destination.highlights.map((item, index) => <div key={item} className="border-b border-r border-slate-200 p-7 first:pl-0 last:border-r-0 lg:border-b-0"><span className="text-xs text-slate-400">0{index + 1}</span><h3 className="mt-16 font-serif text-3xl">{item}</h3></div>)}</div></div></section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-10 lg:py-32">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="overflow-hidden"><img src={destination.packageImage} alt={destination.package} className="aspect-[4/5] w-full object-cover" /></motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}><p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Featured journey</p><h2 className="mt-6 font-serif text-5xl leading-tight sm:text-7xl">{destination.package}</h2><p className="mt-6 text-sm text-slate-400">{destination.duration} · {destination.name}</p><p className="mt-8 max-w-lg text-lg leading-8 text-slate-600">Start with a journey built around the destination, then explore the details and decide whether it is right for your trip.</p><Link href={`/packages/${destination.package.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} className="mt-9 inline-flex rounded-full bg-slate-950 px-7 py-4 text-sm font-medium text-white">Explore this journey <span className="ml-6">↗</span></Link></motion.div>
      </section>

      <section className="bg-slate-950 px-6 py-24 text-white lg:px-10 lg:py-32"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-end"><div><p className="text-xs uppercase tracking-[0.3em] text-white/40">Have {destination.name} in mind?</p><h2 className="mt-7 max-w-3xl font-serif text-5xl leading-tight sm:text-7xl">You can start with a simple question.</h2></div><div className="lg:pb-2"><p className="max-w-lg text-lg leading-8 text-white/60">Tell us what you are considering and we can take the conversation from there. You do not need every detail figured out before reaching out.</p><Link href={`/contact?destination=${params.slug}`} className="mt-8 inline-flex rounded-full bg-white px-7 py-4 text-sm font-medium text-slate-950">Enquire about {destination.name} <span className="ml-6">↗</span></Link></div></div></section>
    </main>
  );
}
