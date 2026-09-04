'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const packages = [
  {
    number: '01',
    title: 'Dubai Escape',
    destination: 'Dubai, UAE',
    duration: '5 nights',
    category: 'City break',
    description: 'A polished introduction to Dubai, from its skyline and waterfront to the experiences that make the city impossible to do halfway.',
    includes: ['Accommodation', 'Airport transfers', 'City experiences'],
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=85',
  },
  {
    number: '02',
    title: 'London Discovery',
    destination: 'London, United Kingdom',
    duration: '6 nights',
    category: 'City exploration',
    description: 'A week to experience London beyond the postcard: iconic landmarks, neighbourhoods, culture and time to find your own rhythm.',
    includes: ['Accommodation', 'Airport transfers', 'Curated experiences'],
    image: 'https://images.unsplash.com/photo-1488747279002-c8523379faaa?auto=format&fit=crop&w=1600&q=85',
  },
  {
    number: '03',
    title: 'Cape Town Explorer',
    destination: 'Cape Town, South Africa',
    duration: '7 nights',
    category: 'Adventure & culture',
    description: 'Mountains, coastlines, vineyards and city life come together in one of the world’s most visually rewarding destinations.',
    includes: ['Accommodation', 'Selected tours', 'Local experiences'],
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1600&q=85',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] text-slate-950">
      <header className="border-b border-slate-900/10 bg-[#f5f4ef]">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <Link href="/" className="font-serif text-2xl tracking-tight">TravelQ.</Link>
          <div className="hidden items-center gap-8 text-sm md:flex">
            <Link href="/destinations" className="text-slate-500 hover:text-slate-950">Destinations</Link>
            <Link href="/packages" className="font-medium">Packages</Link>
            <Link href="/events" className="text-slate-500 hover:text-slate-950">Events</Link>
            <Link href="/blog" className="text-slate-500 hover:text-slate-950">Journal</Link>
            <Link href="/about" className="text-slate-500 hover:text-slate-950">About</Link>
            <Link href="/contact" className="rounded-full bg-slate-950 px-5 py-2.5 text-white">Contact</Link>
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-20 lg:px-10 lg:pb-28 lg:pt-28">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">TravelQ journeys</p>
            <h1 className="mt-6 font-serif text-5xl leading-[0.94] tracking-[-0.045em] sm:text-7xl lg:text-[8rem]">More than a<br /><em>destination.</em></h1>
          </div>
          <p className="max-w-lg text-lg leading-8 text-slate-600">Start with a journey that already has a shape. Explore what it offers, imagine the experience, and make it your own when you are ready.</p>
        </motion.div>
      </section>

      <section className="border-y border-slate-900/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-x-10 gap-y-4 px-6 py-5 text-sm lg:px-10">
          <span className="font-medium">Browse journeys</span>
          <button className="text-slate-950">All</button>
          <button className="text-slate-400 hover:text-slate-950">City breaks</button>
          <button className="text-slate-400 hover:text-slate-950">Adventure</button>
          <button className="text-slate-400 hover:text-slate-950">Luxury escapes</button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="space-y-24 lg:space-y-32">
          {packages.map((item, index) => (
            <motion.article key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp} className="grid gap-10 lg:grid-cols-2 lg:gap-20 lg:items-center">
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <Link href={`/packages/${item.title.toLowerCase().replaceAll(' ', '-')}`} className="group relative block overflow-hidden bg-slate-200">
                  <img src={item.image} alt={item.title} className="aspect-[5/6] w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute left-6 top-6 rounded-full border border-white/40 bg-black/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white backdrop-blur-sm">{item.category}</span>
                  <span className="absolute bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/50 text-xl text-white transition-transform group-hover:rotate-45">↗</span>
                </Link>
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">{item.number} / {item.destination}</p>
                <h2 className="mt-6 font-serif text-5xl tracking-tight sm:text-6xl">{item.title}</h2>
                <div className="mt-5 flex items-center gap-4 text-sm text-slate-500"><span>{item.duration}</span><span className="h-1 w-1 rounded-full bg-slate-300" /><span>{item.category}</span></div>
                <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">{item.description}</p>
                <div className="mt-9 border-y border-slate-900/10 py-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Journey highlights</p>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-700">
                    {item.includes.map((highlight) => <span key={highlight}>✦ {highlight}</span>)}
                  </div>
                </div>
                <div className="mt-9 flex flex-wrap items-center gap-5">
                  <Link href={`/packages/${item.title.toLowerCase().replaceAll(' ', '-')}`} className="inline-flex rounded-full bg-slate-950 px-7 py-4 text-sm font-medium text-white transition-transform hover:-translate-y-0.5">View journey <span className="ml-6">↗</span></Link>
                  <span className="text-sm text-slate-400">Enquire when you’re ready.</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bg-[#ddd9d0] px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">How it works</p>
          <div>
            <h2 className="max-w-4xl font-serif text-4xl leading-tight tracking-tight sm:text-6xl">Found something you would actually like to do?</h2>
            <div className="mt-12 grid gap-8 border-t border-slate-900/15 pt-7 sm:grid-cols-3">
              {['Explore the journey', 'Send a short enquiry', 'We follow up with you'].map((step, index) => (
                <div key={step}><span className="text-xs text-slate-400">0{index + 1}</span><p className="mt-4 text-lg leading-7">{step}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-24 text-white lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">Still looking?</p>
            <h2 className="mt-7 font-serif text-5xl leading-[0.98] tracking-tight sm:text-7xl">The next journey does not have to look like anyone else’s.</h2>
          </div>
          <div className="lg:pb-2">
            <p className="max-w-lg text-lg leading-8 text-white/60">Explore the destinations that interest you or start a conversation about the kind of trip you have in mind.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/destinations" className="rounded-full bg-white px-7 py-4 text-sm font-medium text-slate-950">Explore destinations</Link>
              <Link href="/contact" className="rounded-full border border-white/30 px-7 py-4 text-sm font-medium text-white">Start a conversation</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
