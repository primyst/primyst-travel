"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const destinations = [
  {
    name: "Dubai",
    country: "United Arab Emirates",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85",
    size: "large",
  },
  {
    name: "London",
    country: "United Kingdom",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=85",
    size: "small",
  },
  {
    name: "Paris",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85",
    size: "small",
  },
  {
    name: "Cape Town",
    country: "South Africa",
    image:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1200&q=85",
    size: "medium",
  },
];

const packages = [
  {
    title: "Dubai Escape",
    meta: "5 Nights · Dubai",
    description: "A polished city break with hotel stay, transfers and carefully selected experiences.",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1400&q=85",
    price: "From £1,290",
  },
  {
    title: "London Discovery",
    meta: "6 Nights · London",
    description: "See the city beyond the landmarks with a comfortable stay and curated experiences.",
    image:
      "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=1400&q=85",
    price: "From £1,480",
  },
  {
    title: "Cape Town Explorer",
    meta: "7 Nights · Cape Town",
    description: "Mountain views, coastal drives and unforgettable experiences across the Cape.",
    image:
      "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=1400&q=85",
    price: "From £1,650",
  },
];

const events = [
  {
    title: "Dubai Shopping Festival",
    date: "Seasonal · Dubai",
    image:
      "https://images.unsplash.com/photo-1528114039593-4366cc08227d?auto=format&fit=crop&w=1600&q=85",
  },
  {
    title: "New Year in Dubai",
    date: "31 December · Dubai",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=85",
  },
];

const journal = [
  {
    title: "How to plan a trip that feels effortless",
    category: "Travel planning",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "The art of travelling with intention",
    category: "Inspiration",
    image:
      "https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Five experiences worth travelling for",
    category: "Experiences",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut" },
};

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#f7f6f2] text-[#171715]">
      {/* HERO */}
      <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-black text-white">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={destinations[0].image}
        >
          <source src="/videos/luxury.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/65" />

        <nav className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-7 md:px-10 lg:px-14">
          <Link href="/" className="text-xl font-bold tracking-[-0.04em]">
            TRAVELQ<span className="text-white/50">.</span>
          </Link>
          <div className="hidden items-center gap-8 text-[11px] font-medium uppercase tracking-[0.16em] md:flex">
            <Link href="/destinations" className="transition-opacity hover:opacity-60">Destinations</Link>
            <Link href="/packages" className="transition-opacity hover:opacity-60">Packages</Link>
            <Link href="/events" className="transition-opacity hover:opacity-60">Events</Link>
            <Link href="/blog" className="transition-opacity hover:opacity-60">Journal</Link>
            <Link href="/about" className="transition-opacity hover:opacity-60">About</Link>
          </div>
          <Link
            href="/contact"
            className="rounded-full border border-white/50 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors hover:bg-white hover:text-black"
          >
            Contact
          </Link>
        </nav>

        <div className="relative z-10 w-full px-6 pb-14 md:px-10 md:pb-16 lg:px-14 lg:pb-20">
          <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-5xl">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/70">Curated journeys · Remarkable places</p>
            <h1 className="font-serif text-[clamp(4rem,10vw,9rem)] font-bold leading-[0.84] tracking-[-0.065em]">
              YOUR NEXT
              <br />
              JOURNEY
              <br />
              BEGINS HERE.
            </h1>
            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
              <p className="max-w-md text-sm leading-6 text-white/75">
                Thoughtfully planned trips, unforgettable destinations and experiences worth travelling for.
              </p>
              <Link href="/packages" className="w-fit rounded-full bg-white px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-black transition-transform hover:scale-105">
                Explore journeys
              </Link>
            </div>
          </motion.div>
          <div className="mt-14 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/55">
            <span className="h-px w-10 bg-white/50" />
            Scroll to explore
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="px-6 py-24 md:px-10 md:py-32 lg:px-14">
        <motion.div {...fadeUp} className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.7fr_1.3fr] md:items-end">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/45">01 — The TravelQ way</p>
          <div>
            <h2 className="max-w-4xl font-serif text-4xl font-bold leading-[0.98] tracking-[-0.045em] md:text-6xl lg:text-7xl">
              Travel should feel exciting before you even leave.
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-7 text-black/60 md:text-lg">
              From choosing where to go to knowing what happens next, TravelQ brings the important pieces of a journey together without making the process feel complicated.
            </p>
          </div>
        </motion.div>
      </section>

      {/* DESTINATIONS */}
      <section className="px-6 pb-28 md:px-10 lg:px-14">
        <motion.div {...fadeUp} className="mx-auto mb-10 flex max-w-7xl items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-black/45">02 — Destinations</p>
            <h2 className="font-serif text-4xl font-bold tracking-[-0.045em] md:text-6xl">Where will you go?</h2>
          </div>
          <Link href="/destinations" className="hidden text-[10px] font-bold uppercase tracking-[0.16em] underline underline-offset-8 sm:block">View all destinations</Link>
        </motion.div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 md:grid-cols-12 md:grid-rows-[340px_280px]">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: index * 0.07 }}
              className={`${index === 0 ? "md:col-span-7 md:row-span-2" : index === 1 ? "md:col-span-5" : index === 2 ? "md:col-span-5" : "md:col-span-5"} group relative min-h-[280px] overflow-hidden bg-black`}
            >
              <img src={destination.image} alt={`${destination.name}, ${destination.country}`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-white/65">{destination.country}</p>
                <h3 className="font-serif text-3xl font-bold tracking-[-0.035em] md:text-4xl">{destination.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PACKAGES */}
      <section className="bg-[#1d1d1a] px-6 py-24 text-white md:px-10 md:py-32 lg:px-14">
        <motion.div {...fadeUp} className="mx-auto max-w-7xl">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">03 — Featured journeys</p>
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <h2 className="max-w-3xl font-serif text-4xl font-bold leading-[0.95] tracking-[-0.05em] md:text-6xl">Journeys, already imagined.</h2>
            <Link href="/packages" className="w-fit rounded-full border border-white/30 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors hover:bg-white hover:text-black">See all packages</Link>
          </div>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-7xl gap-10 md:grid-cols-3 md:gap-5">
          {packages.map((item, index) => (
            <motion.article key={item.title} {...fadeUp} transition={{ duration: 0.7, delay: index * 0.1 }} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-white/10">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-5 left-5 text-[10px] font-medium uppercase tracking-[0.16em] text-white/80">{item.price}</span>
              </div>
              <div className="pt-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/45">{item.meta}</p>
                <h3 className="mt-2 font-serif text-3xl font-bold tracking-[-0.04em]">{item.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/55">{item.description}</p>
                <Link href="/packages" className="mt-5 inline-block text-[10px] font-bold uppercase tracking-[0.16em] underline underline-offset-8">View journey</Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-6 py-24 md:px-10 md:py-32 lg:px-14">
        <motion.div {...fadeUp} className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.65fr_1.35fr]">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-black/45">04 — How it works</p>
            <h2 className="max-w-md font-serif text-4xl font-bold leading-[0.95] tracking-[-0.05em] md:text-6xl">You choose where. We help with the rest.</h2>
          </div>
          <div className="divide-y divide-black/10 border-y border-black/10">
            {["DISCOVER", "EXPLORE", "ENQUIRE", "GO"].map((step, index) => (
              <div key={step} className="flex items-center justify-between py-7 md:py-9">
                <div className="flex items-center gap-6">
                  <span className="text-[10px] font-semibold text-black/35">0{index + 1}</span>
                  <h3 className="font-serif text-3xl font-bold tracking-[-0.04em] md:text-4xl">{step}</h3>
                </div>
                <p className="hidden max-w-xs text-right text-sm leading-6 text-black/50 md:block">
                  {index === 0 && "Find destinations, experiences and places that fit your next trip."}
                  {index === 1 && "Explore journeys designed around the places you want to experience."}
                  {index === 2 && "Tell us what caught your eye. Keep the enquiry simple."}
                  {index === 3 && "We confirm the details and you get ready to travel."}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* EVENTS */}
      <section className="px-6 pb-28 md:px-10 lg:px-14">
        <motion.div {...fadeUp} className="mx-auto mb-10 max-w-7xl">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-black/45">05 — Events</p>
          <h2 className="font-serif text-4xl font-bold tracking-[-0.045em] md:text-6xl">Travel has a social side.</h2>
        </motion.div>
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[1.55fr_0.8fr]">
          {events.map((event, index) => (
            <motion.article key={event.title} {...fadeUp} transition={{ duration: 0.7, delay: index * 0.1 }} className="group relative min-h-[420px] overflow-hidden bg-black md:min-h-[560px]">
              <img src={event.image} alt={event.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
              <div className="absolute bottom-7 left-7 right-7 text-white">
                <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/60">{event.date}</p>
                <h3 className="max-w-xl font-serif text-4xl font-bold leading-none tracking-[-0.04em] md:text-5xl">{event.title}</h3>
                <Link href="/events" className="mt-5 inline-block text-[10px] font-bold uppercase tracking-[0.16em] underline underline-offset-8">Explore event</Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* JOURNAL */}
      <section className="bg-white px-6 py-24 md:px-10 md:py-32 lg:px-14">
        <motion.div {...fadeUp} className="mx-auto mb-12 flex max-w-7xl items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-black/40">06 — Journal</p>
            <h2 className="font-serif text-4xl font-bold tracking-[-0.045em] md:text-6xl">Stories for the road.</h2>
          </div>
          <Link href="/blog" className="hidden text-[10px] font-bold uppercase tracking-[0.16em] underline underline-offset-8 sm:block">Read the journal</Link>
        </motion.div>
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {journal.map((post, index) => (
            <motion.article key={post.title} {...fadeUp} transition={{ duration: 0.7, delay: index * 0.1 }} className="group">
              <div className="aspect-[1.2/1] overflow-hidden bg-[#e9e8e3]">
                <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.18em] text-black/40">{post.category}</p>
              <h3 className="mt-2 max-w-md font-serif text-2xl font-bold leading-tight tracking-[-0.035em]">{post.title}</h3>
              <Link href="/blog" className="mt-4 inline-block text-[10px] font-bold uppercase tracking-[0.16em] underline underline-offset-8">Read story</Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative min-h-[70svh] overflow-hidden bg-black text-white">
        <img src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2200&q=90" alt="Open landscape ready to explore" className="absolute inset-0 h-full w-full object-cover opacity-75" />
        <div className="absolute inset-0 bg-black/40" />
        <motion.div {...fadeUp} className="relative z-10 flex min-h-[70svh] flex-col justify-end px-6 py-14 md:px-10 md:py-20 lg:px-14">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60">07 — Your next chapter</p>
          <h2 className="max-w-5xl font-serif text-5xl font-bold leading-[0.88] tracking-[-0.06em] md:text-7xl lg:text-9xl">Where will you go next?</h2>
          <Link href="/destinations" className="mt-8 w-fit rounded-full bg-white px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-black transition-transform hover:scale-105">Explore destinations</Link>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#171715] px-6 py-12 text-white md:px-10 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-10 border-b border-white/10 pb-12 md:flex-row">
            <div>
              <p className="text-2xl font-bold tracking-[-0.04em]">TRAVELQ.</p>
              <p className="mt-4 max-w-sm text-sm leading-6 text-white/45">Curated journeys, remarkable destinations and experiences worth travelling for.</p>
            </div>
            <div className="grid grid-cols-2 gap-x-14 gap-y-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/55">
              <Link href="/destinations" className="hover:text-white">Destinations</Link>
              <Link href="/packages" className="hover:text-white">Packages</Link>
              <Link href="/events" className="hover:text-white">Events</Link>
              <Link href="/blog" className="hover:text-white">Journal</Link>
              <Link href="/about" className="hover:text-white">About</Link>
              <Link href="/contact" className="hover:text-white">Contact</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-3 pt-6 text-[9px] uppercase tracking-[0.16em] text-white/30 sm:flex-row">
            <span>© 2026 TravelQ</span>
            <span>Travel well. Go further.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
