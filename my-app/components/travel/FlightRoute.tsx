"use client";

import { Plane } from "lucide-react";

export default function FlightRoute() {
  return (
    <div className="relative mt-5 h-[112px]">
      <svg viewBox="0 0 380 112" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="flight-route" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0.45" />
          </linearGradient>
        </defs>
        <path d="M32 78 C105 92, 135 10, 208 38 S294 83, 348 28" fill="none" stroke="white" strokeOpacity="0.12" strokeWidth="7" />
        <path d="M32 78 C105 92, 135 10, 208 38 S294 83, 348 28" fill="none" stroke="url(#flight-route)" strokeWidth="2" strokeDasharray="7 8" />
        <circle cx="32" cy="78" r="5" fill="white" />
        <circle cx="348" cy="28" r="5" fill="#F97316" />
      </svg>
      <div className="absolute left-[18px] top-[80px] -translate-y-1/2">
        <p className="text-sm font-bold">LOS</p><p className="text-[10px] text-white/45">Lagos</p>
      </div>
      <div className="absolute right-[10px] top-[28px] -translate-y-1/2 text-right">
        <p className="text-sm font-bold text-[#F97316]">CAI</p><p className="text-[10px] text-white/45">Cairo</p>
      </div>
      <div className="absolute left-[42%] top-[43%] -translate-x-1/2 -translate-y-1/2 rotate-[18deg] text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]">
        <Plane size={24} fill="currentColor" />
      </div>
    </div>
  );
}
