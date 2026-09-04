"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ScrollNav from "@/components/ScrollNav";

const ease = [0.22, 1, 0.36, 1] as const;

const events = [
  {
    slug: "dubai-shopping-festival",
    title: "Dubai Shopping Festival",
    location: "Dubai, United Arab Emirates",
    date: "January 15 — February 1, 2027",
    category: "Festival",
    image:
      "https://images.unsplash.com/photo-1528114039593-4366cc08227d?auto=format&fit=crop&w=1800&q=85",
    description:
      "A seasonal reason to experience Dubai beyond the itinerary — retail, dining and entertainment across the city.",
  },
  {
    slug: "new-year-in-dubai",
    title: "New Year in Dubai",
    location: "Dubai, United Arab Emirates",
    date: "December 29, 2026 — January 3, 2027",
    category: "Seasonal journey",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=85",
    description:
      "End one year and begin the next in one of the world's most energetic cities.",
  },
  {
    slug: "cape-town-wine-culture-weekend",
    title: "Cape Town Wine & Culture Weekend",
    location: "Cape Town, South Africa",
    date: "March 12 — 16, 2027",
    category: "Experience",
    image:
      "https://images.unsplash.com/photo-1553603227-2358aabe821e?auto=format&fit=crop&w=1200&q=85",
    description:
      "A long weekend built around scenery, local culture, vineyards and the character of Cape Town.",
  },
  {
    slug: "tokyo-cherry-blossom-season",
    title: "Tokyo Cherry Blossom Season",
    location: "Tokyo, Japan",
    date: "Late March — Early April, 2027",
    category: "Seasonal journey",
    image:
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1200&q=85",
    description:
      "A short, precise window when the city's parks and riverbanks turn into something worth flying for.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

export default function EventsPage() {
  const [featured, ...rest] = events;

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-[#181611]">
      <ScrollNav />

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-28 md:px-10 md:pb-20 md:pt-32">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#181611]/45">
            Events &amp; experiences
          </p>
          <h1 className="mt-5 font-serif text-5xl font-medium leading-[0.94] tracking-tight sm:text-7xl">
            Travel for
            <br />
            <span className="italic">something more.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-[#181611]/60 md:text-[16px]">
            Some journeys are about the destination. Others happen because
            something worth experiencing is waiting there — discover events
            and seasonal experiences that give your next trip a reason.
          </p>
        </motion.div>
      </section>

      {/* Featured event */}
      <section className="px-6 pb-20 md:px-10 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="group grid overflow-hidden rounded-2xl bg-[#181611] text-[#f4f1e9] lg:grid-cols-[1.15fr_0.85fr]"
          >
            <div className="relative min-h-[380px] overflow-hidden lg:min-h-[560px]">
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
              <span className="absolute left-6 top-6 rounded-full border border-white/25 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] backdrop-blur-sm">
                Featured event
              </span>
            </div>
            <div className="flex flex-col justify-between p-8 sm:p-10 lg:p-14">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#f4f1e9]/45">
                  {featured.category}
                </span>
                <h2 className="mt-5 font-serif text-4xl font-medium leading-none tracking-tight sm:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#f4f1e9]/60">
                  {featured.description}
                </p>
              </div>
              <div className="mt-12 border-t border-[#f4f1e9]/15 pt-6">
                <div className="flex flex-col gap-2 text-[13px] text-[#f4f1e9]/55 sm:flex-row sm:justify-between">
                  <span>{featured.date}</span>
                  <span>{featured.location}</span>
                </div>
                <Link
                  href="/contact"
                  className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#f4f1e9] px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#181611] transition hover:opacity-85"
                >
                  Enquire about this event <span>↗</span>
                </Link>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Rest of the events grid */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10 md:pb-28">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <h2 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
            On the calendar.
          </h2>
          <p className="max-w-sm text-[14px] leading-relaxed text-[#181611]/55 md:text-right">
            Travel opportunities tied to a moment, season or experience
            worth planning around.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {rest.map((event, index) => (
            <motion.article
              key={event.slug}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
              transition={{ delay: index * 0.08 }}
              className="group"
            >
              <Link href={`/events/${event.slug}`}>
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-black/40 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                    {event.category}
                  </span>
                </div>
                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[13px] text-[#181611]/45">{event.date}</p>
                    <h3 className="mt-1 font-serif text-2xl font-medium tracking-tight">
                      {event.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-[#181611]/60">
                  {event.description}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-[#181611]/10 pt-4 text-[13px]">
                  <span className="text-[#181611]/50">{event.location}</span>
                  <span className="font-semibold">View details ↗</span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#4a4a35] px-6 py-24 text-[#f4f1e9] md:px-10 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f4f1e9]/55"
          >
            See something you like?
          </motion.p>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
              A good reason to travel is a good place to start.
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[#f4f1e9]/65">
              Tell us which event interests you and a little about your
              plans — we'll follow up with the next steps.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[#f4f1e9] px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#181611] transition hover:opacity-85"
            >
              Start an enquiry <span>↗</span>
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
