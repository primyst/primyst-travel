'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] text-slate-950">
      <header className="border-b border-slate-900/10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <Link href="/" className="font-serif text-2xl tracking-tight">TravelQ.</Link>
          <div className="hidden items-center gap-8 text-sm md:flex">
            <Link href="/destinations" className="text-slate-500 hover:text-slate-950">Destinations</Link>
            <Link href="/packages" className="text-slate-500 hover:text-slate-950">Packages</Link>
            <Link href="/events" className="text-slate-500 hover:text-slate-950">Events</Link>
            <Link href="/blog" className="text-slate-500 hover:text-slate-950">Journal</Link>
            <Link href="/about" className="text-slate-500 hover:text-slate-950">About</Link>
            <Link href="/contact" className="rounded-full bg-slate-950 px-5 py-2.5 text-white">Contact</Link>
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-20 lg:px-10 lg:pb-24 lg:pt-28">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Contact TravelQ</p>
          <h1 className="mt-6 font-serif text-5xl leading-[0.94] tracking-[-0.045em] sm:text-7xl lg:text-[8rem]">Let’s talk about<br /><em>where next.</em></h1>
          <p className="mt-10 max-w-2xl text-lg leading-8 text-slate-600">Have a destination in mind, a journey you are considering, or a question before you start? Send us a message and let’s take it from there.</p>
        </motion.div>
      </section>

      <section className="border-y border-slate-900/10 bg-white px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.25fr]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Get in touch</p>
            <h2 className="mt-6 max-w-lg font-serif text-4xl leading-tight sm:text-5xl">A conversation is a good place to start.</h2>
            <div className="mt-12 space-y-8">
              <div><p className="text-xs uppercase tracking-[0.2em] text-slate-400">Email</p><a href="mailto:hello@travelq.com" className="mt-2 inline-block text-lg hover:underline">hello@travelq.com</a></div>
              <div><p className="text-xs uppercase tracking-[0.2em] text-slate-400">WhatsApp</p><a href="https://wa.me/1234567890" className="mt-2 inline-block text-lg hover:underline">Message us on WhatsApp ↗</a></div>
              <div><p className="text-xs uppercase tracking-[0.2em] text-slate-400">Prefer to explore first?</p><Link href="/destinations" className="mt-2 inline-block text-lg hover:underline">Browse destinations ↗</Link></div>
            </div>
            <p className="mt-16 max-w-sm border-t border-slate-200 pt-6 text-sm leading-6 text-slate-500">TravelQ is a concept portfolio product. Contact details shown here are for demonstration purposes.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="bg-[#f5f4ef] p-7 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Send a message</p>
            <form className="mt-10 space-y-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <label className="block"><span className="text-sm font-medium">Your name</span><input type="text" placeholder="How should we address you?" className="mt-3 w-full border-b border-slate-300 bg-transparent px-0 py-4 outline-none placeholder:text-slate-400 focus:border-slate-950" /></label>
                <label className="block"><span className="text-sm font-medium">Email address</span><input type="email" placeholder="you@example.com" className="mt-3 w-full border-b border-slate-300 bg-transparent px-0 py-4 outline-none placeholder:text-slate-400 focus:border-slate-950" /></label>
              </div>
              <label className="block"><span className="text-sm font-medium">What can we help with?</span><select defaultValue="" className="mt-3 w-full border-b border-slate-300 bg-transparent px-0 py-4 outline-none focus:border-slate-950"><option value="" disabled>Select an option</option><option>Planning a trip</option><option>Asking about a package</option><option>Asking about an event</option><option>Something else</option></select></label>
              <label className="block"><span className="text-sm font-medium">Tell us a little more</span><textarea rows={5} placeholder="Where are you thinking of going? What would you like to know?" className="mt-3 w-full resize-none border-b border-slate-300 bg-transparent px-0 py-4 outline-none placeholder:text-slate-400 focus:border-slate-950" /></label>
              <button type="button" className="inline-flex rounded-full bg-slate-950 px-7 py-4 text-sm font-medium text-white transition-transform hover:-translate-y-0.5">Send message <span className="ml-6">↗</span></button>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-24 text-white lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-end">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">The journey starts here</p>
            <h2 className="mt-7 max-w-3xl font-serif text-5xl leading-tight tracking-tight sm:text-7xl">You don’t need every detail figured out yet.</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:pb-2">
            <p className="max-w-lg text-lg leading-8 text-white/60">Start with a destination, a package or simply an idea. The first step can be as straightforward as saying where you would like to go.</p>
            <Link href="/destinations" className="mt-8 inline-flex rounded-full bg-white px-7 py-4 text-sm font-medium text-slate-950">Explore destinations <span className="ml-6">↗</span></Link>
          </motion.div>
        </div>
      </section>

      <footer className="px-6 py-10 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 border-t border-slate-900/10 pt-8 text-sm text-slate-500 sm:flex-row">
          <span className="font-serif text-xl text-slate-950">TravelQ.</span>
          <span>Thoughtful journeys. Remarkable places.</span>
          <span>© {new Date().getFullYear()} TravelQ</span>
        </div>
      </footer>
    </main>
  );
}
