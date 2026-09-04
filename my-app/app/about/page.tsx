"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollNav from "@/components/ScrollNav";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease },
};

const values = [
  {
    number: "01",
    title: "Clarity",
    text: "You should know what a journey offers before you commit to it.",
  },
  {
    number: "02",
    title: "Curiosity",
    text: "Every destination should give you a reason to look closer.",
  },
  {
    number: "03",
    title: "Thoughtfulness",
    text: "The small details shape a trip as much as the big ones do.",
  },
];

const steps = [
  { number: "01", title: "Discover", text: "Find destinations and ideas that catch your attention." },
  { number: "02", title: "Explore", text: "Go deeper into the places and journeys that feel right." },
  { number: "03", title: "Enquire", text: "Tell us what you're interested in — keep it simple." },
  { number: "04", title: "Go", text: "We confirm the details and help move the plan forward." },
];

export default function AboutPage() {
  return (
    <main className="bg-[#f4f1e9] text-[#181611]">
      <ScrollNav />

      {/* ---------------------------------------------------------- */}
      {/* HERO — ink panel, tilted photo collage, same language as   */}
      {/* the homepage's experimental/travel hero treatment          */}
      {/* ---------------------------------------------------------- */}
      <section className="relative min-h-[100svh] overflow-hidden bg-[#181611] pt-24 text-[#f4f1e9] md:pt-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6 pb-20 md:flex-row md:items-center md:gap-10 md:px-10">
          {/* Copy */}
          <div className="relative z-10 md:w-[52%]">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f4f1e9]/50"
            >
              About TravelQ
            </motion.p>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 0.28, ease }}
                className="font-serif text-[13vw] font-medium leading-[0.9] tracking-tight md:text-[4.6vw]"
              >
                Travel should
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 0.42, ease }}
                className="font-serif text-[13vw] font-medium italic leading-[0.9] tracking-tight text-[#f4f1e9]/70 md:text-[4.6vw]"
              >
                feel considered.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="mt-7 max-w-md text-[15px] leading-relaxed text-[#f4f1e9]/60"
            >
              We make it easier to discover remarkable places, choose the
              right journey, and move from inspiration to a trip worth
              remembering.
            </motion.p>
          </div>

          {/* Tilted photo pair — same collage language as the homepage */}
          <div className="relative z-10 h-[360px] w-full md:h-[480px] md:w-[48%]">
            <motion.img
              src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85"
              alt="Quiet hotel interior"
              initial={{ opacity: 0, y: 30, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: -4 }}
              transition={{ duration: 1, delay: 0.35, ease }}
              className="absolute left-[6%] top-[6%] h-[70%] w-[62%] rounded-sm object-cover shadow-2xl"
            />
            <motion.img
              src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=85"
              alt="Resort overlooking the sea"
              initial={{ opacity: 0, y: 30, rotate: 3 }}
              animate={{ opacity: 1, y: 0, rotate: 3 }}
              transition={{ duration: 1, delay: 0.5, ease }}
              className="absolute bottom-[4%] right-[4%] h-[56%] w-[48%] rounded-sm object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* APPROACH — cream                                          */}
      {/* ---------------------------------------------------------- */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <motion.div {...fadeUp} className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.7fr_1.3fr] md:items-end">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#181611]/40">
            Our approach
          </p>
          <div>
            <h2 className="max-w-3xl font-serif text-4xl font-medium leading-[0.98] tracking-tight md:text-6xl">
              Less searching. More knowing where to go.
            </h2>
            <p className="mt-7 max-w-2xl text-[15px] leading-relaxed text-[#181611]/60 md:text-[16px]">
              TravelQ is built around a simple idea: planning a trip
              shouldn't feel like assembling a spreadsheet. We bring
              destinations, journeys, and useful information together so you
              can make a confident choice — whether you already know where
              you're headed or you're still looking for an idea.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* VALUES — terracotta                                       */}
      {/* ---------------------------------------------------------- */}
      <section className="bg-[#c9603f] px-6 py-24 text-[#f4f1e9] md:px-10 md:py-32">
        <motion.div {...fadeUp} className="mx-auto mb-14 max-w-7xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f4f1e9]/60">
            What matters to us
          </p>
          <h2 className="max-w-2xl font-serif text-4xl font-medium leading-[0.98] tracking-tight md:text-6xl">
            Good travel is in the details.
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <motion.div
              key={v.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="rounded-2xl bg-[#f4f1e9]/10 p-6"
            >
              <span className="text-[11px] font-semibold text-[#f4f1e9]/50">
                {v.number}
              </span>
              <h3 className="mt-4 font-serif text-2xl font-medium tracking-tight">
                {v.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#f4f1e9]/70">
                {v.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* PROCESS — ink, numbered columns                           */}
      {/* ---------------------------------------------------------- */}
      <section className="bg-[#181611] px-6 py-24 text-[#f4f1e9] md:px-10 md:py-32">
        <motion.div {...fadeUp} className="mx-auto mb-14 max-w-7xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f4f1e9]/45">
            How TravelQ works
          </p>
          <h2 className="max-w-2xl font-serif text-4xl font-medium leading-[0.98] tracking-tight md:text-6xl">
            From a passing idea to a real journey.
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-7xl border-t border-[#f4f1e9]/15 md:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className="border-b border-[#f4f1e9]/15 py-8 md:border-b-0 md:border-r md:px-7 md:py-10 md:first:pl-0"
            >
              <span className="text-[11px] text-[#f4f1e9]/40">{s.number}</span>
              <h3 className="mt-8 font-serif text-3xl font-medium tracking-tight md:mt-10">
                {s.title}
              </h3>
              <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-[#f4f1e9]/55">
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* PROMISE / CTA — olive                                     */}
      {/* ---------------------------------------------------------- */}
      <section className="bg-[#4a4a35] px-6 py-24 text-[#f4f1e9] md:px-10 md:py-32">
        <motion.div {...fadeUp} className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.7fr_1.3fr]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f4f1e9]/55">
            The TravelQ promise
          </p>
          <div>
            <p className="max-w-3xl font-serif text-3xl font-medium leading-tight tracking-tight md:text-5xl">
              A better way to start the trip, before the trip begins.
            </p>
            <p className="mt-7 max-w-2xl text-[15px] leading-relaxed text-[#f4f1e9]/65">
              We're here to make the decision easier, the information
              clearer, and the first step toward your next journey feel
              genuinely exciting.
            </p>
            <Link
              href="/destinations"
              className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[#f4f1e9] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611] transition hover:opacity-85"
            >
              Explore destinations <span>↗</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* FOOTER — matches the homepage footer                      */}
      {/* ---------------------------------------------------------- */}
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
