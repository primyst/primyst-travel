"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import ScrollNav from "@/components/ScrollNav";

const ease = [0.22, 1, 0.36, 1] as const;

type ItineraryRow = [day: string, title: string, text: string];

type Trip = {
  title: string;
  destination: string;
  duration: string;
  category: string;
  price: string;
  description: string;
  image: string;
  includes: string[];
  itinerary: ItineraryRow[];
};

const packages: Record<string, Trip> = {
  "dubai-escape": {
    title: "Dubai Escape",
    destination: "Dubai, United Arab Emirates",
    duration: "5 Nights",
    category: "City & Leisure",
    price: "From £1,850",
    description:
      "A carefully paced introduction to Dubai, balancing the city's energy with time to slow down and enjoy the experience.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=85",
    includes: ["Selected accommodation", "Airport transfers", "Curated city experiences", "Pre-departure trip guidance"],
    itinerary: [
      ["Day 01", "Arrival in Dubai", "Settle in and begin the journey at your own pace."],
      ["Day 02—03", "Explore the city", "Discover the landmarks, neighbourhoods and experiences that make Dubai unique."],
      ["Day 04", "A different side of Dubai", "Make room for an experience beyond the usual city itinerary."],
      ["Day 05", "Departure", "Wrap up the journey and head home with the details taken care of."],
    ],
  },
  "london-discovery": {
    title: "London Discovery",
    destination: "London, United Kingdom",
    duration: "6 Nights",
    category: "City Break",
    price: "From £2,100",
    description:
      "A considered city journey designed to give you time for London beyond simply ticking landmarks off a list.",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2200&q=85",
    includes: ["Selected accommodation", "Airport transfers", "Curated experiences", "Pre-departure trip guidance"],
    itinerary: [
      ["Day 01", "Arrive in London", "Settle in and get your first sense of the city."],
      ["Day 02—04", "Discover London", "Explore landmarks, neighbourhoods, food and culture at a considered pace."],
      ["Day 05", "Make it your own", "Keep the day open for the places that interested you most."],
      ["Day 06", "Departure", "A smooth close to your London journey."],
    ],
  },
  "cape-town-explorer": {
    title: "Cape Town Explorer",
    destination: "Cape Town, South Africa",
    duration: "7 Nights",
    category: "Nature & Culture",
    price: "From £1,950",
    description:
      "Mountains, coastlines, vineyards and city life come together in a journey built for travellers who want variety.",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=2200&q=85",
    includes: ["Selected accommodation", "Airport transfers", "Curated tours", "Pre-departure trip guidance"],
    itinerary: [
      ["Day 01", "Arrive in Cape Town", "Settle in beneath one of the world's most distinctive landscapes."],
      ["Day 02—03", "The city and its surroundings", "Explore Cape Town's culture, coast and landmarks."],
      ["Day 04—06", "Beyond the city", "Make space for landscapes, wine country and unforgettable experiences."],
      ["Day 07", "Departure", "A considered end to the journey."],
    ],
  },
  "tokyo-in-depth": {
    title: "Tokyo In Depth",
    destination: "Tokyo, Japan",
    duration: "8 Nights",
    category: "City Break",
    price: "From £2,480",
    description:
      "A slower, more deliberate way to take in a city that rarely sits still — neon streets one day, temple gardens the next.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2200&q=85",
    includes: ["Selected accommodation", "Rail pass", "Guided neighbourhood walks", "Pre-departure trip guidance"],
    itinerary: [
      ["Day 01", "Arrive in Tokyo", "Settle in and get your bearings in the city."],
      ["Day 02—05", "Neighbourhood by neighbourhood", "Move through the city at a considered pace, from Shibuya to Yanaka."],
      ["Day 06—07", "Day trips", "Step outside the city for a change of scenery."],
      ["Day 08", "Departure", "A smooth close to your Tokyo journey."],
    ],
  },
  "marrakech-and-the-atlas": {
    title: "Marrakech & The Atlas",
    destination: "Marrakech, Morocco",
    duration: "6 Nights",
    category: "Adventure",
    price: "From £1,590",
    description:
      "Souks and riads in the medina, then out to the Atlas foothills for a change of altitude and pace.",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=2200&q=85",
    includes: ["Riad stay", "Desert day trip", "Private guide", "Pre-departure trip guidance"],
    itinerary: [
      ["Day 01", "Arrive in Marrakech", "Settle into the medina and its rhythm."],
      ["Day 02—03", "The medina and its souks", "Explore the markets, riads and courtyards of the old city."],
      ["Day 04—05", "Into the Atlas", "Head for the foothills for a different pace altogether."],
      ["Day 06", "Departure", "A considered end to the journey."],
    ],
  },
  "maldives-retreat": {
    title: "Maldives Retreat",
    destination: "Maldives, Indian Ocean",
    duration: "5 Nights",
    category: "Luxury Escape",
    price: "From £3,250",
    description:
      "Clear water, a private stay and a schedule built entirely around doing as little as possible.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=2200&q=85",
    includes: ["Overwater villa", "All transfers", "Half-board dining", "Pre-departure trip guidance"],
    itinerary: [
      ["Day 01", "Arrival", "Transfer to your villa and settle in."],
      ["Day 02—04", "Slow days", "No fixed plan — just the water, the reef and the quiet."],
      ["Day 05", "Departure", "A gentle close to the trip."],
    ],
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function PackageDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const trip = packages[slug];

  if (!trip) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f4f1e9] px-6 text-center text-[#181611]">
        <div>
          <p className="text-[14px] text-[#181611]/55">Package not found</p>
          <Link href="/packages" className="mt-4 inline-block text-[14px] underline">
            Back to packages
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
        <img src={trip.image} alt={trip.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/45" />
        <div className="relative z-10 mx-auto flex min-h-[82vh] max-w-7xl items-end px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-5xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
              {trip.category} · {trip.duration}
            </p>
            <h1 className="mt-5 font-serif text-5xl font-medium leading-[0.95] tracking-tight sm:text-7xl">
              {trip.title}
            </h1>
            <p className="mt-5 text-[16px] text-white/75">{trip.destination}</p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-[0.7fr_1.3fr]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611]/40">
          The journey
        </p>
        <div>
          <p className="max-w-3xl font-serif text-3xl font-medium leading-tight tracking-tight sm:text-5xl">
            {trip.description}
          </p>
          <div className="mt-12 grid gap-6 border-y border-[#181611]/10 py-7 sm:grid-cols-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611]/40">
                Duration
              </p>
              <p className="mt-2 text-[15px] font-medium">{trip.duration}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611]/40">
                Journey
              </p>
              <p className="mt-2 text-[15px] font-medium">{trip.category}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611]/40">
                Starting from
              </p>
              <p className="mt-2 text-[15px] font-medium">{trip.price}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section className="bg-white px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611]/40">
              The plan
            </p>
            <div className="divide-y divide-[#181611]/10">
              {trip.itinerary.map(([day, title, text]) => (
                <div key={day} className="grid gap-4 py-8 first:pt-0 sm:grid-cols-[110px_1fr]">
                  <p className="text-[13px] text-[#181611]/40">{day}</p>
                  <div>
                    <h3 className="font-serif text-2xl font-medium tracking-tight sm:text-3xl">
                      {title}
                    </h3>
                    <p className="mt-2.5 max-w-xl text-[14px] leading-relaxed text-[#181611]/60">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Included */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-[0.7fr_1.3fr]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611]/40">
          Included
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {trip.includes.map((item) => (
            <div key={item} className="border-t border-[#181611]/10 pt-5">
              <p className="text-[16px]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#181611] px-6 py-24 text-[#f4f1e9] md:px-10 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f4f1e9]/45">
              Ready to plan?
            </p>
            <h2 className="mt-6 max-w-3xl font-serif text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
              Make this journey yours.
            </h2>
          </div>
          <div>
            <p className="max-w-lg text-[15px] leading-relaxed text-[#f4f1e9]/60">
              Tell us you're interested in {trip.title}. The package context
              will already be attached to your enquiry.
            </p>
            <Link
              href={`/enquire?type=package&slug=${slug}`}
              className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[#f4f1e9] px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#181611] transition hover:opacity-85"
            >
              Enquire about this journey <span>↗</span>
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
