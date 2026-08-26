"use client";

import { ArrowRight, Send, Plane } from "lucide-react";

const WA_NUMBER = "2347035612652";
const COMPANY_NAME = "PureQ";

function openWhatsApp(message: string) {
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank", "noopener,noreferrer");
}

function FlightRoute() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[5] hidden sm:block">
      <svg
        viewBox="0 0 1200 720"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0" />
            <stop offset="15%" stopColor="#5EEAD4" stopOpacity="0.6" />
            <stop offset="85%" stopColor="#5EEAD4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* dashed arc path */}
        <path
          id="flightPath"
          d="M 150 480 Q 620 220 1050 380"
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="2"
          strokeDasharray="6 10"
          strokeLinecap="round"
        />

        {/* departure point */}
        <circle cx="150" cy="480" r="4" fill="#5EEAD4">
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>

        {/* destination point */}
        <circle cx="1050" cy="380" r="4" fill="#5EEAD4">
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur="2.5s"
            begin="1.2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* plane traveling along the path */}
        <g>
          <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
            <mpath href="#flightPath" />
          </animateMotion>
          <g transform="translate(-9,-9)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#5EEAD4">
              <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2.5 1.5V22l4-1 4 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[720px] overflow-hidden bg-black">
      {/* VIDEO BACKGROUND */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/travel-poster.jpg"
      >
        <source src="/videos/luxury.mp4" type="video/mp4" />
      </video>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-black/35" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/70" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/20" />

      {/* Flight route overlay */}
      <FlightRoute />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[720px] max-w-6xl items-end px-4 pb-20 pt-32 sm:px-6 sm:pb-24">
        <div className="max-w-3xl text-white">
          {/* Small travel indicator */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-md">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black">
              <Plane size={11} />
            </span>

            Your journey starts here
          </div>

          <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
            Go somewhere
            <br />
            <span className="text-[#5EEAD4]">worth remembering.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            Flights, stays, visas and unforgettable experiences — planned
            around the trip you actually want.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() =>
                document
                  .getElementById("packages")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0D9488] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#0F766E]"
            >
              Explore trips
              <ArrowRight size={17} />
            </button>

            <button
              onClick={() =>
                openWhatsApp(
                  `Hi ${COMPANY_NAME}, I'd like to plan my next trip.`
                )
              }
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"
            >
              <Send size={16} />
              Talk to an expert
            </button>
          </div>
        </div>
      </div>

      {/* Bottom cinematic info */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-black/20 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-xs text-white/60 sm:px-6">
          <span>Travel better. Start here.</span>

          <span className="hidden sm:block">
            Flights · Hotels · Visa · Experiences
          </span>
        </div>
      </div>
    </section>
  );
}
