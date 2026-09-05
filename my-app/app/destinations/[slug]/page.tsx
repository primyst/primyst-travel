"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import ScrollNav from "@/components/ScrollNav";

const ease = [0.22, 1, 0.36, 1] as const;

type Destination = {
  name: string;
  country: string;
  region: string;
  image: string;
  intro: string;
  description: string;
  highlights: string[];
  package: string;
  duration: string;
  packageImage: string;
};

const destinations: Record<string, Destination> = {
  dubai: {
    name: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=85",
    intro: "A city of contrasts where extraordinary architecture, desert landscapes and coastal living exist within one journey.",
    description: "Dubai can be exactly what you want it to be. Spend your days exploring the city, head beyond it into the desert, discover its coastline, or simply take your time. The experience changes with the journey you choose.",
    highlights: ["Downtown & Burj Khalifa", "Desert experiences", "Dubai Marina", "Shopping & dining"],
    package: "Dubai Escape",
    duration: "5 nights",
    packageImage: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=1400&q=85",
  },
  london: {
    name: "London",
    country: "United Kingdom",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2200&q=85",
    intro: "Historic streets, contemporary culture and a different discovery waiting in almost every neighbourhood.",
    description: "London rewards curiosity. See the landmarks, then leave room for everything between them — neighbourhood cafés, galleries, markets, parks and the small discoveries that make a city memorable.",
    highlights: ["Historic landmarks", "Neighbourhoods & culture", "Museums & galleries", "Food & city life"],
    package: "London Discovery",
    duration: "6 nights",
    packageImage: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1400&q=85",
  },
  paris: {
    name: "Paris",
    country: "France",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2200&q=85",
    intro: "A city best experienced with enough time to wander, stop, look up and discover what is beyond the obvious.",
    description: "Paris is full of landmarks, but its atmosphere lives in the spaces between them. Take your time with its streets, cafés, architecture and neighbourhoods, and let the city unfold at its own pace.",
    highlights: ["Art & architecture", "Cafés & dining", "Iconic landmarks", "Neighbourhood walks"],
    package: "Paris at Your Pace",
    duration: "5 nights",
    packageImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=85",
  },
  "cape-town": {
    name: "Cape Town",
    country: "South Africa",
    region: "Africa",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=2200&q=85",
    intro: "Few cities bring mountains, ocean, vineyards and adventure together quite like Cape Town.",
    description: "Cape Town offers several journeys in one destination. Explore dramatic coastlines, spend time in the city, discover the surrounding winelands or head out into landscapes that make the journey itself part of the experience.",
    highlights: ["Table Mountain", "Coastal routes", "Winelands", "Culture & cuisine"],
    package: "Cape Town Explorer",
    duration: "7 nights",
    packageImage: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&w=1400&q=85",
  },
  istanbul: {
    name: "Istanbul",
    country: "Türkiye",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=2200&q=85",
    intro: "A city shaped by two continents, layered history and a culture best experienced firsthand.",
    description: "Istanbul brings together centuries of history, neighbourhood life, remarkable food and the energy of a city connecting Europe and Asia.",
    highlights: ["Historic old city", "Bosphorus", "Markets & cuisine", "Neighbourhood culture"],
    package: "Istanbul Discovery",
    duration: "5 nights",
    packageImage: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1400&q=85",
  },
  maldives: {
    name: "Maldives",
    country: "Indian Ocean",
    region: "Asia",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=2200&q=85",
    intro: "Clear water, secluded stays and a slower rhythm for when the journey is about switching off.",
    description: "The Maldives is made for slowing down. Days can be shaped around the water, quiet mornings, long meals and the kind of space that makes a holiday feel genuinely restorative.",
    highlights: ["Island stays", "Clear-water experiences", "Ocean dining", "Slow days"],
    package: "Maldives Escape",
    duration: "6 nights",
    packageImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=85",
  },
  tokyo: {
    name: "Tokyo",
    country: "Japan",
    region: "Asia",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2200&q=85",
    intro: "Neon streets, quiet temples and a precision to daily life that rewards taking your time.",
    description: "Tokyo moves quickly, but it also rewards slow exploration. Balance iconic neighbourhoods with quiet streets, excellent food and small discoveries.",
    highlights: ["City neighbourhoods", "Temples & culture", "Food experiences", "Design & technology"],
    package: "Tokyo Explorer",
    duration: "7 nights",
    packageImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1400&q=85",
  },
  "new-york": {
    name: "New York",
    country: "United States",
    region: "Americas",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=2200&q=85",
    intro: "A skyline, a pace and a mix of neighbourhoods that never quite feels finished discovering.",
    description: "New York is best approached with room for spontaneity. See the landmarks, then let the city pull you into neighbourhoods, restaurants, galleries and parks.",
    highlights: ["Manhattan landmarks", "Neighbourhoods", "Food & culture", "Arts & entertainment"],
    package: "New York City Break",
    duration: "6 nights",
    packageImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1400&q=85",
  },
  rome: {
    name: "Rome",
    country: "Italy",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=2200&q=85",
    intro: "History underfoot at every turn, with food and streets that give you a reason to slow down.",
    description: "Rome combines monumental history with an everyday rhythm of cafés, piazzas, neighbourhood walks and long meals.",
    highlights: ["Ancient Rome", "Art & architecture", "Italian cuisine", "Neighbourhood walks"],
    package: "Rome at Your Pace",
    duration: "5 nights",
    packageImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1400&q=85",
  },
  marrakech: {
    name: "Marrakech",
    country: "Morocco",
    region: "Africa",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=2200&q=85",
    intro: "Souks, riads and a colour palette that stays with you long after the journey ends.",
    description: "Marrakech is a destination of texture and atmosphere, from the medina and markets to quieter riad courtyards and food experiences.",
    highlights: ["Medina & souks", "Riads", "Moroccan cuisine", "Culture & design"],
    package: "Marrakech Escape",
    duration: "5 nights",
    packageImage: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1400&q=85",
  },
  reykjavik: {
    name: "Reykjavik",
    country: "Iceland",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=2200&q=85",
    intro: "A gateway to glaciers, geothermal water and landscapes that feel like another planet.",
    description: "Reykjavik works as both a city stay and a base for exploring Iceland's dramatic landscapes, geothermal pools and changing skies.",
    highlights: ["Geothermal experiences", "Golden Circle", "Coastal landscapes", "Local food"],
    package: "Iceland Explorer",
    duration: "6 nights",
    packageImage: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=1400&q=85",
  },
  zanzibar: {
    name: "Zanzibar",
    country: "Tanzania",
    region: "Africa",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=2200&q=85",
    intro: "Spice-scented streets in Stone Town and coastline built for doing absolutely nothing.",
    description: "Zanzibar combines history, island culture and long stretches of coastline. Explore Stone Town, discover local flavours and leave plenty of time for the ocean.",
    highlights: ["Stone Town", "Island beaches", "Spice experiences", "Ocean days"],
    package: "Zanzibar Escape",
    duration: "6 nights",
    packageImage: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1400&q=85",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function DestinationDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const destination = destinations[slug];

  if (!destination) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f4f1e9] px-6 text-center text-[#181611]">
        <div>
          <p className="text-[14px] text-[#181611]/55">Destination not found</p>
          <Link href="/destinations" className="mt-4 inline-block text-[14px] underline">
            Back to destinations
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
        <img
          src={destination.image}
          alt={`${destination.name}, ${destination.country}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        <div className="relative z-10 mx-auto flex min-h-[82vh] max-w-7xl items-end px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-5xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
              {destination.region} · {destination.country}
            </p>
            <h1 className="mt-5 font-serif text-6xl font-medium tracking-tight sm:text-8xl">
              {destination.name}
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/75">
              {destination.intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-[0.7fr_1.3fr]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611]/40">
          The destination
        </p>
        <div>
          <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight sm:text-5xl">
            More than a place to visit.
          </h2>
          <p className="mt-7 max-w-2xl text-[15px] leading-relaxed text-[#181611]/60">
            {destination.description}
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-white px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611]/40">
              A feel for the journey
            </p>
            <p className="max-w-xl text-[15px] leading-relaxed text-[#181611]/60">
              A few of the experiences that can shape time in {destination.name}.
            </p>
          </div>

          <div className="mt-12 grid gap-6 border-t border-[#181611]/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {destination.highlights.map((item) => (
              <div key={item} className="rounded-2xl bg-[#f4f1e9] p-6">
                <h3 className="font-serif text-xl font-medium tracking-tight">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related package */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-[1fr_1fr] lg:items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="overflow-hidden rounded-2xl"
        >
          <img
            src={destination.packageImage}
            alt={`${destination.package} in ${destination.name}`}
            className="aspect-[4/5] w-full object-cover"
          />
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611]/40">
            A journey built around it
          </p>
          <h2 className="mt-5 font-serif text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
            {destination.package}
          </h2>
          <p className="mt-4 text-[13px] text-[#181611]/45">
            {destination.duration} · {destination.name}
          </p>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-[#181611]/60">
            A considered way to experience the destination, with the
            important details planned before you travel and room to make
            the journey your own.
          </p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-[#181611] px-6 py-24 text-[#f4f1e9] md:px-10 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f4f1e9]/45">
              Ready when you are
            </p>
            <h2 className="mt-6 max-w-3xl font-serif text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
              Make {destination.name} the next destination.
            </h2>
          </div>
          <div>
            <p className="max-w-lg text-[15px] leading-relaxed text-[#f4f1e9]/60">
              Tell us what you're considering. You don't need every detail
              figured out before reaching out.
            </p>
            <Link
              href={`/enquire?type=destination&slug=${slug}`}
              className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[#f4f1e9] px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#181611] transition hover:opacity-85"
            >
              Plan a trip to {destination.name} <span>↗</span>
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
