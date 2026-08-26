"use client";

import {
  ArrowRight,
  Check,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const WA_NUMBER = "2347035612652";
const EMAIL = "hello@pureqtravels.com";
const INSTAGRAM = "https://instagram.com/pureqtravels";
const COMPANY_NAME = "PureQ";

function openWhatsApp(message: string) {
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

/* ============================================================
   JOURNEY
   ============================================================ */

export function Journey() {
  const steps = [
    {
      number: "01",
      title: "Tell us where",
      text: "Have a destination in mind? Tell us what you're looking for and when you'd like to travel.",
    },
    {
      number: "02",
      title: "We handle the details",
      text: "Flights, accommodation, visas, transfers and activities are arranged around your trip.",
    },
    {
      number: "03",
      title: "You get ready to go",
      text: "Your itinerary is sorted. You just need to pack your bags and show up for the journey.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#F97316]">
              How it works
            </p>

            <h2 className="max-w-lg text-4xl font-black tracking-tight text-[#0D9488] sm:text-5xl">
              Less planning.
              <br />
              More travelling.
            </h2>

            <p className="mt-5 max-w-md text-base leading-7 text-gray-500">
              You don't need to figure out every part of an international trip
              yourself. Tell us what you have in mind and we'll take it from
              there.
            </p>

            <button
              onClick={() =>
                openWhatsApp(
                  `Hi ${COMPANY_NAME}, I'd like help planning an international trip.`
                )
              }
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0D9488] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#0F766E]"
            >
              Plan my trip
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-8 bottom-8 hidden w-px bg-gray-200 sm:block" />

            <div className="space-y-6">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="relative flex gap-5 rounded-2xl border border-gray-100 bg-gray-50 p-6 transition hover:border-[#0D9488]/20 hover:bg-white hover:shadow-lg"
                >
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-[#0D9488] shadow-sm ring-1 ring-gray-100">
                    {step.number}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {step.title}
                    </h3>

                    <p className="mt-1.5 text-sm leading-6 text-gray-500">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   WHY US
   ============================================================ */

export function WhyUs() {
  const reasons = [
    {
      icon: ShieldCheck,
      title: "One place for the important stuff",
      text: "Flights, hotels, visas and transfers don't have to be managed across five different conversations.",
    },
    {
      icon: Sparkles,
      title: "Trips built around you",
      text: "Whether it's a holiday, honeymoon or getaway, we help shape the trip around what you actually want.",
    },
    {
      icon: Send,
      title: "A real person when you need one",
      text: "Questions before you book? Changes during planning? Reach us directly on WhatsApp.",
    },
  ];

  return (
    <section id="why-us" className="bg-[#f0fdfa] py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#F97316]">
            Why PureQ
          </p>

          <h2 className="text-4xl font-black tracking-tight text-[#0D9488] sm:text-5xl">
            Travel without the
            <br className="hidden sm:block" />
            unnecessary stress.
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-500">
            The goal isn't to make travel complicated. It's to make getting
            there feel simple.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {reasons.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-white bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0D9488]/10 text-[#0D9488]">
                <Icon size={22} />
              </div>

              <h3 className="text-lg font-bold text-gray-900">{title}</h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            "Flights & accommodation",
            "Visa assistance",
            "Airport transfers & tours",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-sm"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0D9488]/10 text-[#0D9488]">
                <Check size={15} strokeWidth={3} />
              </div>

              <span className="text-sm font-semibold text-gray-700">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CTA
   ============================================================ */

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#0D9488] py-24">
      {/* Decorative route-like lines */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -right-8 -top-8 h-56 w-56 rounded-full border border-white/10" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
          Your next destination
        </p>

        <h2 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
          So, where are we going?
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
          Tell us the destination. We'll help you work out the rest.
        </p>

        <button
          onClick={() =>
            openWhatsApp(
              `Hi ${COMPANY_NAME}, I'm ready to plan my next trip.`
            )
          }
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#0D9488] shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-50"
        >
          <Send size={17} />
          Start on WhatsApp
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */

export function Footer() {
  return (
    <footer id="contact" className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_0.8fr_1fr]">
          {/* Brand */}
          <div>
            <div className="text-3xl font-black tracking-tight">
              <span className="text-[#0D9488]">Pure</span>
              <span className="text-[#F97316]">Q</span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-500">
              Curated international trips, visa assistance and travel
              arrangements handled from start to finish.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-[#0D9488] hover:bg-[#0D9488] hover:text-white"
              >
                <Instagram size={17} />
              </a>

              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-[#0D9488] hover:bg-[#0D9488] hover:text-white"
              >
                <Send size={17} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-gray-900">Explore</h3>

            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="#packages"
                  className="text-sm text-gray-500 transition hover:text-[#0D9488]"
                >
                  Packages
                </a>
              </li>

              <li>
                <a
                  href="#why-us"
                  className="text-sm text-gray-500 transition hover:text-[#0D9488]"
                >
                  Why PureQ
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className="text-sm text-gray-500 transition hover:text-[#0D9488]"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-gray-900">Talk to us</h3>

            <div className="mt-5 space-y-4">
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 text-sm text-gray-500 transition hover:text-[#0D9488]"
              >
                <Phone
                  size={17}
                  className="mt-0.5 shrink-0 text-[#F97316]"
                />
                <span>Chat with us on WhatsApp</span>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="flex items-start gap-3 text-sm text-gray-500 transition hover:text-[#0D9488]"
              >
                <Mail
                  size={17}
                  className="mt-0.5 shrink-0 text-[#F97316]"
                />
                <span>{EMAIL}</span>
              </a>

              <div className="flex items-start gap-3 text-sm text-gray-500">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-[#F97316]"
                />
                <span>Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-gray-200 pt-7 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {COMPANY_NAME}. All rights reserved.</p>

          <p>Travel made simpler.</p>
        </div>
      </div>
    </footer>
  );
}