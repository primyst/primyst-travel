"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import ScrollNav from "@/components/ScrollNav";

const ease = [0.22, 1, 0.36, 1] as const;

type EventDetail = {
  title: string;
  location: string;
  date: string;
  category: string;
  image: string;
  description: string;
  highlights: string[];
  timing: string[];
};

const events: Record<string, EventDetail> = {
  "dubai-shopping-festival": {
    title: "Dubai Shopping Festival",
    location: "Dubai, United Arab Emirates",
    date: "January",
    category: "Shopping & Culture",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=85",
    description:
      "An opportunity to experience Dubai when the city is filled with seasonal energy, entertainment and reasons to stay a little longer.",
    highlights: ["A curated Dubai stay", "Festival-season experiences", "Flexible trip planning", "Travel guidance before departure"],
    timing: ["Choose your preferred travel dates", "Tell us how long you'd like to stay", "We discuss suitable options", "Confirm the details and prepare for the journey"],
  },
  "new-year-in-dubai": {
    title: "New Year in Dubai",
    location: "Dubai, United Arab Emirates",
    date: "December — January",
    category: "Seasonal Experience",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=2200&q=85",
    description:
      "End one year and begin another in one of the world's most energetic cities, with the journey planned around your own travel preferences.",
    highlights: ["Seasonal accommodation options", "New Year experiences", "Trip coordination", "Pre-departure guidance"],
    timing: ["Start with your preferred dates", "Share your travel preferences", "Review suitable options", "Confirm the journey"],
  },
  "cape-town-wine-culture-weekend": {
    title: "Cape Town Wine & Culture Weekend",
    location: "Cape Town, South Africa",
    date: "Selected dates",
    category: "Food & Culture",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=2200&q=85",
    description:
      "A weekend shaped around the landscapes, food, wine and cultural character that make Cape Town an exceptional place to explore.",
    highlights: ["Selected accommodation", "Wine and cultural experiences", "Flexible itinerary planning", "Travel guidance"],
    timing: ["Choose an available date", "Share what interests you", "Review the journey details", "Confirm and prepare to travel"],
  },
  "tokyo-cherry-blossom-season": {
    title: "Tokyo Cherry Blossom Season",
    location: "Tokyo, Japan",
    date: "Late March — Early April",
    category: "Seasonal Experience",
    image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=2200&q=85",
    description:
      "A short, precise window when the city's parks and riverbanks turn into something worth planning a trip around.",
    highlights: ["A curated Tokyo stay", "Seasonal viewing spots", "Flexible trip planning", "Travel guidance before departure"],
    timing: ["Choose your preferred travel dates", "Tell us how long you'd like to stay", "We discuss suitable options", "Confirm the details and prepare for the journey"],
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function EventDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const event = events[slug];

  if (!event) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f4f1e9] px-6 text-center text-[#181611]">
        <div>
          <p className="text-[14px] text-[#181611]/55">Event not found</p>
          <Link href="/events" className="mt-4 inline-block text-[14px] underline">
            Back to events
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-[#181611]">
      <ScrollNav />

      {/* Hero */}
      <section className="relative min-h-[82vh] overflow-hidden text-white">
        <img src={event.image} alt={event.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/50" />
        <div className="relative z-10 mx-auto flex min-h-[82vh] max-w-7xl items-end px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-5xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
              {event.category} · {event.date}
            </p>
            <h1 className="mt-5 font-serif text-5xl font-medium leading-[0.95] tracking-tight sm:text-7xl">
              {event.title}
            </h1>
            <p className="mt-5 text-[16px] text-white/75">{event.location}</p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-[0.7fr_1.3fr]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611]/40">
          The experience
        </p>
        <div>
          <p className="max-w-3xl font-serif text-3xl font-medium leading-tight tracking-tight sm:text-5xl">
            {event.description}
          </p>
          <div className="mt-12 grid gap-6 border-y border-[#181611]/10 py-7 sm:grid-cols-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611]/40">Location</p>
              <p className="mt-2 text-[15px] font-medium">{event.location}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611]/40">When</p>
              <p className="mt-2 text-[15px] font-medium">{event.date}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611]/40">Type</p>
              <p className="mt-2 text-[15px] font-medium">{event.category}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-white px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611]/40">
              What makes it worth the trip
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {event.highlights.map((item) => (
                <div key={item} className="rounded-2xl bg-[#f4f1e9] p-6">
                  <p className="text-[16px]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Planning steps */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611]/40">
            Planning around it
          </p>
          <div className="divide-y divide-[#181611]/10">
            {event.timing.map((item) => (
              <div key={item} className="py-6 first:pt-0">
                <p className="font-serif text-2xl font-medium tracking-tight sm:text-3xl">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#181611] px-6 py-24 text-[#f4f1e9] md:px-10 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f4f1e9]/45">
              Ready when you are
            </p>
            <h2 className="mt-6 max-w-3xl font-serif text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
              Build your trip around it.
            </h2>
          </div>
          <div>
            <p className="max-w-lg text-[15px] leading-relaxed text-[#f4f1e9]/60">
              Tell us you're interested in {event.title}. We already have
              the event context, so the next step stays simple.
            </p>
            <Link
              href={`/enquire?type=event&slug=${slug}`}
              className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[#f4f1e9] px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#181611] transition hover:opacity-85"
            >
              Enquire about this event <span>↗</span>
            </Link>
          </div>
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
