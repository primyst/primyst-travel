'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const articles = [
  { category: 'Destination Guide', title: 'How to Spend Five Unforgettable Days in Dubai', excerpt: 'A considered guide to experiencing the city beyond the obvious stops.', date: 'Travel Guide', read: '6 min read', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85' },
  { category: 'Travel Planning', title: 'When Is the Best Time to Plan Your Next Trip?', excerpt: 'A practical way to think about seasons, events, prices and the experience you actually want.', date: 'Planning', read: '5 min read', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=85' },
  { category: 'City Guide', title: 'A Different Way to Experience London', excerpt: 'Look beyond the checklist and give yourself time to discover the city at your own pace.', date: 'City Guide', read: '7 min read', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=85' },
  { category: 'Travel Notes', title: 'Why Some Journeys Stay With You Longer', excerpt: 'The places we remember are rarely defined by a single landmark.', date: 'Travel Notes', read: '4 min read', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85' },
  { category: 'Destination Guide', title: 'Cape Town: Mountains, Coastlines and More', excerpt: 'A closer look at one of the world’s most visually diverse city destinations.', date: 'Destination Guide', read: '8 min read', image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1200&q=85' },
];

const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] text-slate-950">
      <header className="border-b border-slate-900/10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <Link href="/" className="font-serif text-2xl tracking-tight">TravelQ.</Link>
          <div className="hidden items-center gap-8 text-sm md:flex">
            <Link href="/destinations" className="text-slate-500 hover:text-slate-950">Destinations</Link><Link href="/packages" className="text-slate-500 hover:text-slate-950">Packages</Link><Link href="/events" className="text-slate-500 hover:text-slate-950">Events</Link><Link href="/blog" className="font-medium">Journal</Link><Link href="/about" className="text-slate-500 hover:text-slate-950">About</Link><Link href="/contact" className="rounded-full bg-slate-950 px-5 py-2.5 text-white">Contact</Link>
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-20 lg:px-10 lg:pb-24 lg:pt-28">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">TravelQ Journal</p>
          <h1 className="mt-6 font-serif text-5xl leading-[0.94] tracking-[-0.045em] sm:text-7xl lg:text-[8rem]">Stories for<br /><em>the journey.</em></h1>
          <p className="mt-10 max-w-xl text-lg leading-8 text-slate-600">Destination ideas, travel notes and useful perspectives for curious travellers.</p>
        </motion.div>
      </section>

      <section className="border-y border-slate-900/10 bg-white"><div className="mx-auto flex max-w-7xl gap-8 overflow-x-auto px-6 py-5 text-sm lg:px-10">{['All stories', 'Destination guides', 'Travel planning', 'City guides', 'Travel notes'].map((item, i) => <button key={item} className={i === 0 ? 'whitespace-nowrap font-medium' : 'whitespace-nowrap text-slate-400 hover:text-slate-950'}>{item}</button>)}</div></section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <Link href="/blog/dubai-five-day-guide" className="group grid gap-8 border-b border-slate-900/10 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="overflow-hidden"><img src={articles[0].image} alt="Dubai skyline" className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.03]" /></div>
          <div className="lg:pb-4"><p className="text-xs uppercase tracking-[0.25em] text-slate-400">Featured story / {articles[0].read}</p><h2 className="mt-5 font-serif text-4xl leading-tight sm:text-6xl">{articles[0].title}</h2><p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">{articles[0].excerpt}</p><span className="mt-8 inline-block text-sm font-medium">Read story <span className="ml-3">↗</span></span></div>
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32"><div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">{articles.slice(1).map((article, i) => <motion.article key={article.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp} className={i === 3 ? 'lg:col-span-2 lg:grid lg:grid-cols-[1fr_1fr] lg:gap-8' : ''}><Link href={`/blog/${article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} className="group block"><div className="overflow-hidden"><img src={article.image} alt={article.title} className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.04]" /></div><p className="mt-6 text-xs uppercase tracking-[0.22em] text-slate-400">{article.category} · {article.read}</p><h2 className="mt-3 font-serif text-3xl leading-tight">{article.title}</h2><p className="mt-3 leading-7 text-slate-600">{article.excerpt}</p><span className="mt-5 inline-block text-sm font-medium">Read story ↗</span></Link></motion.article>)}</div></section>

      <section className="bg-slate-950 px-6 py-24 text-white lg:px-10 lg:py-32"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mx-auto max-w-7xl text-center"><p className="text-xs uppercase tracking-[0.3em] text-white/40">Keep exploring</p><h2 className="mx-auto mt-7 max-w-4xl font-serif text-5xl leading-tight sm:text-7xl">A good trip often starts with a little curiosity.</h2><Link href="/destinations" className="mt-10 inline-flex rounded-full bg-white px-7 py-4 text-sm font-medium text-slate-950">Explore destinations <span className="ml-6">↗</span></Link></motion.div></section>

      <footer className="px-6 py-10 lg:px-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 border-t border-slate-900/10 pt-8 text-sm text-slate-500 sm:flex-row"><span className="font-serif text-xl text-slate-950">TravelQ.</span><span>Thoughtful journeys. Remarkable places.</span><span>© {new Date().getFullYear()} TravelQ</span></div></footer>
    </main>
  );
}
