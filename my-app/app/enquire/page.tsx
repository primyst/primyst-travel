"use client";

import Link from "next/link";
import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const context: Record<
  string,
  Record<string, { label: string; title: string; description: string }>
> = {
  package: {
    "dubai-escape": {
      label: "Package enquiry",
      title: "Dubai Escape",
      description: "Tell us a few details about your trip and we'll take it from there.",
    },
    "london-discovery": {
      label: "Package enquiry",
      title: "London Discovery",
      description: "Tell us a few details about your trip and we'll take it from there.",
    },
    "cape-town-explorer": {
      label: "Package enquiry",
      title: "Cape Town Explorer",
      description: "Tell us a few details about your trip and we'll take it from there.",
    },
    "tokyo-in-depth": {
      label: "Package enquiry",
      title: "Tokyo In Depth",
      description: "Tell us a few details about your trip and we'll take it from there.",
    },
    "marrakech-and-the-atlas": {
      label: "Package enquiry",
      title: "Marrakech & The Atlas",
      description: "Tell us a few details about your trip and we'll take it from there.",
    },
    "maldives-retreat": {
      label: "Package enquiry",
      title: "Maldives Retreat",
      description: "Tell us a few details about your trip and we'll take it from there.",
    },
  },
  event: {
    "dubai-shopping-festival": {
      label: "Event enquiry",
      title: "Dubai Shopping Festival",
      description: "Tell us your preferred dates and what you have in mind.",
    },
    "new-year-in-dubai": {
      label: "Event enquiry",
      title: "New Year in Dubai",
      description: "Tell us your preferred dates and what you have in mind.",
    },
    "cape-town-wine-culture-weekend": {
      label: "Event enquiry",
      title: "Cape Town Wine & Culture Weekend",
      description: "Tell us your preferred dates and what you have in mind.",
    },
    "tokyo-cherry-blossom-season": {
      label: "Event enquiry",
      title: "Tokyo Cherry Blossom Season",
      description: "Tell us your preferred dates and what you have in mind.",
    },
  },
  destination: {
    dubai: { label: "Trip enquiry", title: "A trip to Dubai", description: "Tell us a little about the journey you're considering." },
    london: { label: "Trip enquiry", title: "A trip to London", description: "Tell us a little about the journey you're considering." },
    paris: { label: "Trip enquiry", title: "A trip to Paris", description: "Tell us a little about the journey you're considering." },
    "cape-town": { label: "Trip enquiry", title: "A trip to Cape Town", description: "Tell us a little about the journey you're considering." },
    istanbul: { label: "Trip enquiry", title: "A trip to Istanbul", description: "Tell us a little about the journey you're considering." },
    maldives: { label: "Trip enquiry", title: "A trip to the Maldives", description: "Tell us a little about the journey you're considering." },
    tokyo: { label: "Trip enquiry", title: "A trip to Tokyo", description: "Tell us a little about the journey you're considering." },
    "new-york": { label: "Trip enquiry", title: "A trip to New York", description: "Tell us a little about the journey you're considering." },
    rome: { label: "Trip enquiry", title: "A trip to Rome", description: "Tell us a little about the journey you're considering." },
    marrakech: { label: "Trip enquiry", title: "A trip to Marrakech", description: "Tell us a little about the journey you're considering." },
    reykjavik: { label: "Trip enquiry", title: "A trip to Reykjavik", description: "Tell us a little about the journey you're considering." },
    zanzibar: { label: "Trip enquiry", title: "A trip to Zanzibar", description: "Tell us a little about the journey you're considering." },
  },
};

function EnquireContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "general";
  const slug = searchParams.get("slug") || "";
  const selected = context[type]?.[slug];
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    payload.type = selected ? type : "general";
    payload.slug = selected ? slug : "";

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Something went wrong.");
      setStatus("success");
      event.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-[#181611]">
      {/* Minimal, focused header — deliberately not the full site nav,       */}
      {/* this is a conversion page and shouldn't invite people back out of it */}
      <header className="border-b border-[#181611]/10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <Link href="/" className="text-[15px] font-semibold tracking-tight">
            TRAVELQ
          </Link>
          <Link href="/contact" className="text-[13px] text-[#181611]/55 hover:text-[#181611]">
            General enquiry ↗
          </Link>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:px-10 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#181611]/45">
            {selected?.label || "Start an enquiry"}
          </p>
          <h1 className="mt-5 max-w-2xl font-serif text-4xl font-medium leading-[0.98] tracking-tight sm:text-6xl">
            {selected?.title || "Let's plan the next step."}
          </h1>
          <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-[#181611]/60">
            {selected?.description ||
              "Share a few details about what you have in mind. You don't need to have the entire trip figured out yet."}
          </p>
          <div className="mt-14 hidden border-t border-[#181611]/10 pt-6 lg:block">
            <p className="text-[13px] leading-relaxed text-[#181611]/50">
              No account. No long application form. Just enough information
              for TravelQ to understand what you're looking for.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="rounded-2xl bg-white p-7 sm:p-10 lg:p-12"
        >
          {status === "success" ? (
            <div className="py-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611]/40">
                Enquiry received
              </p>
              <h2 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight">
                We've got it.
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#181611]/60">
                Thanks for getting in touch. We've received your enquiry and
                sent a confirmation to your email.
              </p>
              <Link
                href="/"
                className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#181611] px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#f4f1e9] transition hover:opacity-85"
              >
                Back to TravelQ
              </Link>
            </div>
          ) : (
            <>
              {selected && (
                <div className="mb-9 border-b border-[#181611]/10 pb-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611]/40">
                    You're enquiring about
                  </p>
                  <p className="mt-2 font-serif text-2xl font-medium tracking-tight">
                    {selected.title}
                  </p>
                </div>
              )}

              <form className="space-y-7" onSubmit={handleSubmit}>
                <div className="grid gap-7 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-[13px] font-medium">Your name</span>
                    <input
                      name="name"
                      required
                      type="text"
                      autoComplete="name"
                      placeholder="Full name"
                      className="mt-2.5 w-full border-b border-[#181611]/20 bg-transparent py-3.5 text-[15px] outline-none placeholder:text-[#181611]/35 focus:border-[#c9603f]"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[13px] font-medium">Email address</span>
                    <input
                      name="email"
                      required
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="mt-2.5 w-full border-b border-[#181611]/20 bg-transparent py-3.5 text-[15px] outline-none placeholder:text-[#181611]/35 focus:border-[#c9603f]"
                    />
                  </label>
                </div>

                <div className="grid gap-7 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-[13px] font-medium">Phone or WhatsApp</span>
                    <input
                      name="phone"
                      required
                      type="tel"
                      autoComplete="tel"
                      placeholder="Your preferred number"
                      className="mt-2.5 w-full border-b border-[#181611]/20 bg-transparent py-3.5 text-[15px] outline-none placeholder:text-[#181611]/35 focus:border-[#c9603f]"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[13px] font-medium">Preferred travel date</span>
                    <input
                      name="travelDate"
                      type="date"
                      className="mt-2.5 w-full border-b border-[#181611]/20 bg-transparent py-3.5 text-[15px] outline-none focus:border-[#c9603f]"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-[13px] font-medium">How many people are travelling?</span>
                  <select
                    name="travellers"
                    defaultValue="1"
                    className="mt-2.5 w-full border-b border-[#181611]/20 bg-transparent py-3.5 text-[15px] outline-none focus:border-[#c9603f]"
                  >
                    <option value="1">1 traveller</option>
                    <option value="2">2 travellers</option>
                    <option value="3">3 travellers</option>
                    <option value="4">4 travellers</option>
                    <option value="5+">5+ travellers</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-[13px] font-medium">
                    Anything else we should know?{" "}
                    <span className="text-[#181611]/40">Optional</span>
                  </span>
                  <textarea
                    name="notes"
                    rows={4}
                    maxLength={1000}
                    placeholder="Tell us about your preferences, questions or anything important for the trip."
                    className="mt-2.5 w-full resize-none border-b border-[#181611]/20 bg-transparent py-3.5 text-[15px] outline-none placeholder:text-[#181611]/35 focus:border-[#c9603f]"
                  />
                </label>

                {status === "error" && (
                  <p role="alert" className="text-[13px] text-[#c9603f]">
                    {error}
                  </p>
                )}

                <button
                  disabled={status === "loading"}
                  type="submit"
                  className="inline-flex items-center gap-3 rounded-full bg-[#181611] px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#f4f1e9] transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" ? "Sending enquiry…" : <>Send enquiry <span>↗</span></>}
                </button>

                <p className="text-[13px] leading-relaxed text-[#181611]/40">
                  By submitting, you're sharing these details so TravelQ can
                  respond to your enquiry.
                </p>
              </form>
            </>
          )}
        </motion.div>
      </section>
    </main>
  );
}

export default function EnquirePage() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-screen place-items-center bg-[#f4f1e9] text-[#181611]/50">
          Loading enquiry…
        </main>
      }
    >
      <EnquireContent />
    </Suspense>
  );
}
