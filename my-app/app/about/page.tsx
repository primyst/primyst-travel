'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function AboutPage() {
  return (
    <main className="bg-[#f6f5f1] text-slate-950">
      <section className="relative min-h-[78vh] overflow-hidden bg-slate-950 text-white">
        <img
          src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=2200&q=85"
          alt="Quiet luxury hotel interior"
          className="absolute inset-0 h-full w-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />
        <div className="absolute inset-x-0 top-0 z-10 border-b border-white/15">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
            <Link href="/" className="font-serif text-2xl tracking-tight">TravelQ.</Link>
            <div className="hidden items-center gap-8 text-sm md:flex">
              <Link href="/destinations" className="transition-opacity hover:opacity-60">Destinations</Link>
              <Link href="/packages" className="transition-opacity hover:opacity-60">Packages</Link>
              <Link href="/events" className="transition-opacity hover:opacity-60">Events</Link>
              <Link href="/blog" className="transition-opacity hover:opacity-60">Journal</Link>
              <Link href="/contact" className="rounded-full border border-white/50 px-5 py-2.5 transition-colors hover:bg-white hover:text-slate-950">Contact</Link>
            </div>
          </nav>
        </div>
        <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-7xl items-end px-6 pb-20 pt-32 lg:px-10 lg:pb-24">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-white/70">About TravelQ</p>
            <h1 className="font-serif text-5xl leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-[7.5rem]">
              Travel should feel<br /><em>considered.</em>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
              We make it easier to discover remarkable places, choose the right journey, and move from inspiration to a trip worth remembering.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.7fr_1.3fr] lg:px-10 lg:py-32">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">01 / Our approach</p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
          <h2 className="max-w-4xl font-serif text-4xl leading-tight tracking-tight sm:text-6xl">
            Less searching.<br />More knowing where to go.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
            TravelQ is built around a simple idea: planning a trip should not feel like assembling a spreadsheet. We bring destinations, journeys, experiences, and useful information together so you can make a confident choice.
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Whether you already know where you are headed or are still looking for an idea, the experience stays clear from the first discovery to the moment you are ready to enquire.
          </p>
        </motion.div>
      </section>

      <section className="bg-white px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp} className="overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1500&q=85"
              alt="Luxury resort overlooking the sea"
              className="aspect-[4/5] w-full object-cover"
            />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">02 / What matters to us</p>
            <h2 className="mt-7 font-serif text-4xl leading-tight tracking-tight sm:text-6xl">Good travel is in the details.</h2>
            <div className="mt-12 space-y-9">
              {[
                ['01', 'Clarity', 'You should know what a journey offers before you commit to it.'],
                ['02', 'Curiosity', 'We want every destination to give you a reason to look closer.'],
                ['03', 'Thoughtfulness', 'The little things shape the experience just as much as the big ones.'],
              ].map(([number, title, text]) => (
                <div key={number} className="grid grid-cols-[45px_1fr] gap-5 border-t border-slate-200 pt-6">
                  <span className="text-xs text-slate-400">{number}</span>
                  <div>
                    <h3 className="text-lg font-medium">{title}</h3>
                    <p className="mt-2 max-w-lg leading-7 text-slate-500">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#151515] px-6 py-24 text-white lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/45">03 / How TravelQ works</p>
            <h2 className="mt-7 max-w-3xl font-serif text-4xl leading-tight tracking-tight sm:text-6xl">From a passing idea to a real journey.</h2>
          </motion.div>
          <div className="mt-16 grid border-t border-white/15 md:grid-cols-4">
            {[
              ['01', 'Discover', 'Find destinations, ideas, and experiences that catch your attention.'],
              ['02', 'Explore', 'Go deeper into the places and journeys that feel right for you.'],
              ['03', 'Enquire', 'Tell us what you are interested in with a short, straightforward request.'],
              ['04', 'Go', 'We follow up, confirm the details, and help move the plan forward.'],
            ].map(([number, title, text]) => (
              <motion.div key={number} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="border-b border-white/15 p-7 md:border-b-0 md:border-r md:first:pl-0">
                <span className="text-xs text-white/35">{number}</span>
                <h3 className="mt-14 font-serif text-3xl">{title}</h3>
                <p className="mt-5 max-w-xs text-sm leading-6 text-white/55">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp} className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">04 / The TravelQ promise</p>
          <div>
            <p className="font-serif text-4xl leading-tight tracking-tight sm:text-6xl">A better way to start the trip before the trip begins.</p>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">We are here to make the decision easier, the information clearer, and the first step toward your next journey feel genuinely exciting.</p>
            <Link href="/destinations" className="mt-10 inline-flex rounded-full bg-slate-950 px-7 py-4 text-sm font-medium text-white transition-transform hover:-translate-y-0.5">Explore destinations <span className="ml-6">↗</span></Link>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-slate-200 bg-[#f6f5f1] px-6 py-10 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-sm text-slate-500 sm:flex-row">
          <span className="font-serif text-xl text-slate-950">TravelQ.</span>
          <span>Thoughtful journeys. Remarkable places.</span>
          <span>© {new Date().getFullYear()} TravelQ</span>
        </div>
      </footer>
    </main>
  );
}
