"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollNav from "@/components/ScrollNav";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

type FormState = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

const initialForm: FormState = { name: "", email: "", topic: "", message: "" };

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function validate(values: FormState) {
    const next: Partial<FormState> = {};
    if (!values.name.trim()) next.name = "Tell us how to address you.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!values.topic) next.topic = "Pick what this is about.";
    if (!values.message.trim() || values.message.trim().length < 10) {
      next.message = "Give us a little more detail (10+ characters).";
    }
    return next;
  }

  function handleChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // No backend wired up yet — this is where a real submit handler
    // (API route / server action, with the same validation re-run
    // server-side) would send the form. Client-side validation alone
    // is never sufficient on its own for a production form.
    setStatus("sent");
    setForm(initialForm);
  }

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-[#181611]">
      <ScrollNav />

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-28 md:px-10 md:pb-20 md:pt-32">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#181611]/45">
            Contact TravelQ
          </p>
          <h1 className="mt-5 font-serif text-5xl font-medium leading-[0.94] tracking-tight sm:text-7xl">
            Let's talk about
            <br />
            <span className="italic">where next.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-[#181611]/60 md:text-[16px]">
            Have a destination in mind, a journey you're considering, or a
            question before you start? Send us a message and let's take it
            from there.
          </p>
        </motion.div>
      </section>

      {/* Get in touch + form */}
      <section className="border-y border-[#181611]/10 bg-white px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1.25fr]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611]/45">
              Get in touch
            </p>
            <h2 className="mt-5 max-w-lg font-serif text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
              A conversation is a good place to start.
            </h2>
            <div className="mt-10 space-y-7">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611]/40">
                  Email
                </p>
                <a href="mailto:hello@travelq.com" className="mt-1.5 inline-block text-[16px] hover:underline">
                  hello@travelq.com
                </a>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611]/40">
                  WhatsApp
                </p>
                <a href="https://wa.me/1234567890" className="mt-1.5 inline-block text-[16px] hover:underline">
                  Message us on WhatsApp ↗
                </a>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611]/40">
                  Prefer to explore first?
                </p>
                <Link href="/destinations" className="mt-1.5 inline-block text-[16px] hover:underline">
                  Browse destinations ↗
                </Link>
              </div>
            </div>
            <p className="mt-14 max-w-sm border-t border-[#181611]/10 pt-5 text-[13px] leading-relaxed text-[#181611]/50">
              TravelQ is a concept portfolio product. Contact details shown
              here are for demonstration purposes.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="rounded-2xl bg-[#f4f1e9] p-7 sm:p-10"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#181611]/45">
              Send a message
            </p>

            {status === "sent" ? (
              <div className="mt-10 rounded-xl bg-[#181611]/5 p-6 text-[14px] leading-relaxed text-[#181611]/70">
                Thanks — your message is in. We'll get back to you shortly.
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 block text-[13px] font-semibold underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-7">
                <div className="grid gap-7 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-[13px] font-medium">Your name</span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="How should we address you?"
                      className="mt-2.5 w-full border-b border-[#181611]/20 bg-transparent px-0 py-3.5 text-[15px] outline-none placeholder:text-[#181611]/35 focus:border-[#c9603f]"
                    />
                    {errors.name && (
                      <span className="mt-1.5 block text-[12px] text-[#c9603f]">{errors.name}</span>
                    )}
                  </label>
                  <label className="block">
                    <span className="text-[13px] font-medium">Email address</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="you@example.com"
                      className="mt-2.5 w-full border-b border-[#181611]/20 bg-transparent px-0 py-3.5 text-[15px] outline-none placeholder:text-[#181611]/35 focus:border-[#c9603f]"
                    />
                    {errors.email && (
                      <span className="mt-1.5 block text-[12px] text-[#c9603f]">{errors.email}</span>
                    )}
                  </label>
                </div>

                <label className="block">
                  <span className="text-[13px] font-medium">What can we help with?</span>
                  <select
                    value={form.topic}
                    onChange={(e) => handleChange("topic", e.target.value)}
                    className="mt-2.5 w-full border-b border-[#181611]/20 bg-transparent px-0 py-3.5 text-[15px] outline-none focus:border-[#c9603f]"
                  >
                    <option value="" disabled>Select an option</option>
                    <option>Planning a trip</option>
                    <option>Asking about a package</option>
                    <option>Asking about an event</option>
                    <option>Something else</option>
                  </select>
                  {errors.topic && (
                    <span className="mt-1.5 block text-[12px] text-[#c9603f]">{errors.topic}</span>
                  )}
                </label>

                <label className="block">
                  <span className="text-[13px] font-medium">Tell us a little more</span>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Where are you thinking of going? What would you like to know?"
                    className="mt-2.5 w-full resize-none border-b border-[#181611]/20 bg-transparent px-0 py-3.5 text-[15px] outline-none placeholder:text-[#181611]/35 focus:border-[#c9603f]"
                  />
                  {errors.message && (
                    <span className="mt-1.5 block text-[12px] text-[#c9603f]">{errors.message}</span>
                  )}
                </label>

                <button
                  type="submit"
                  className="inline-flex items-center gap-3 rounded-full bg-[#181611] px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#f4f1e9] transition hover:opacity-85"
                >
                  Send message <span>↗</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#181611] px-6 py-24 text-[#f4f1e9] md:px-10 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f4f1e9]/45">
              The journey starts here
            </p>
            <h2 className="mt-6 max-w-3xl font-serif text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
              You don't need every detail figured out yet.
            </h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:pb-1">
            <p className="max-w-lg text-[15px] leading-relaxed text-[#f4f1e9]/60">
              Start with a destination, a package or simply an idea. The
              first step can be as straightforward as saying where you'd
              like to go.
            </p>
            <Link
              href="/destinations"
              className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[#f4f1e9] px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#181611] transition hover:opacity-85"
            >
              Explore destinations <span>↗</span>
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
