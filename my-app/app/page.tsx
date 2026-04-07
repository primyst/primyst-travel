"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Plane, 
  MapPin, 
  Calendar, 
  Users, 
  ChevronRight, 
  CheckCircle2, 
  Instagram, 
  Facebook, 
  Twitter,
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax Y-axis transforms
  const backgroundY = useTransform(scrollYProgress,, ["0%", "50%"]);
  const textY = useTransform(scrollYProgress,, ["0%", "150%"]);
  const foregroundY = useTransform(scrollYProgress,, ["0%", "-20%"]);

  const packages = [
    { title: "Ancient Wonders", city: "Cairo, Egypt", price: "₦2.9M", img: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=2070", tag: "Most Popular" },
    { title: "Winter in Beirut", city: "Beirut, Lebanon", price: "₦2.6M", img: "https://images.unsplash.com/photo-1547448415-e9f5b28e570d?q=80&w=2070", tag: "Seasonal" },
    { title: "Desert Luxury", city: "Doha, Qatar", price: "₦2.5M", img: "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?q=80&w=2070", tag: "Budget 3.0" },
    { title: "Tropical Paradise", city: "Zanzibar, Tanzania", price: "₦2.85M", img: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=2070", tag: "Beach" },
  ];

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      
      {/* 1. HERO SECTION WITH PARALLAX & VIDEO */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Background Layer: Pyramids */}
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1539768942893-daf53e448371?q=80&w=2071"
            alt="Giza Pyramids"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white" />
        </motion.div>

        {/* Video Overlay Layer (Champagne Boat) */}
        <div className="absolute top-20 right-10 z-10 w-64 h-80 hidden lg:block rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl skew-y-3">
           <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover"
           >
             <source src="/videos/luxury.mp4" type="video/mp4" />
           </video>
        </div>

        {/* Middle Layer: Text */}
        <motion.div style={{ y: textY }} className="relative z-20 text-center px-6">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-[#005B82] font-semibold tracking-[0.3em] uppercase mb-4 text-sm"
          >
            Luxury Travel Concierge
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-6xl md:text-8xl text-slate-900 leading-tight"
          >
            Travel the <span className="italic text-[#005B82]">Royale</span> Way
          </motion.h1>
          <p className="mt-6 text-slate-600 max-w-xl mx-auto text-lg font-light">
            Expertly curated vacations, seamless visa processing, and 5-star experiences tailored for the discerning traveler.
          </p>
          <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-[#005B82] text-white px-8 py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-[#004a6b] transition-all group">
              Explore Packages <Plane className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-slate-200 text-slate-800 px-8 py-4 rounded-full font-medium hover:bg-slate-50 transition-all">
              Custom Itinerary
            </button>
          </div>
        </motion.div>

        {/* Foreground Layer: Traveler Cutout / Plane Wing */}
        <motion.div 
          style={{ y: foregroundY }}
          className="absolute bottom-[-10%] right-[-5%] z-30 w-[40%] h-[60%] pointer-events-none hidden lg:block"
        >
           {/* Replace with your cutout image of a traveler or plane wing */}
           <div className="relative w-full h-full">
             <Image 
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1974" 
                alt="Traveler Cutout" 
                fill 
                className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
             />
           </div>
        </motion.div>
      </section>

      {/* 2. SERVICES BAR */}
      <section className="bg-white py-12 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Visa Assistance", icon: CheckCircle2 },
            { label: "Flight Booking", icon: Plane },
            { label: "Hotel Reservation", icon: MapPin },
            { label: "Group Tours", icon: Users },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 justify-center">
              <item.icon className="text-[#005B82] w-5 h-5" />
              <span className="text-slate-700 font-medium text-sm md:text-base">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BENTO PACKAGES SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-4xl text-slate-900 mb-4">Current Escapes</h2>
              <p className="text-slate-500">Hand-picked destinations ready for your next story.</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-[#005B82] font-semibold hover:gap-3 transition-all">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image src={pkg.img} alt={pkg.city} fill className="object-cover transition-transform duration-500 hover:scale-110" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#005B82]">
                    {pkg.tag}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs text-[#005B82] font-bold uppercase tracking-widest mb-1">{pkg.city}</p>
                  <h3 className="font-serif text-xl text-slate-900 mb-4">{pkg.title}</h3>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase">Starting from</p>
                      <p className="text-lg font-bold text-slate-900">{pkg.price}</p>
                    </div>
                    <button className="p-3 bg-slate-50 rounded-full hover:bg-[#005B82] hover:text-white transition-colors">
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION: THE WHATSAPP FLOW */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-[#005B82] rounded-[3rem] p-12 relative overflow-hidden text-center text-white">
          <div className="relative z-10">
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-sky-300" />
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Ready for your Royale experience?</h2>
            <p className="text-sky-100/80 mb-10 max-w-lg mx-auto">
              Skip the long forms. Chat directly with our travel consultants and get your custom quote in minutes.
            </p>
            <a 
              href="https://wa.me/08058713944" 
              className="bg-white text-[#005B82] px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform inline-block"
            >
              Chat on WhatsApp
            </a>
          </div>
          
          {/* Decorative circles */}
          <div className="absolute top-[-20%] left-[-10%] w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 rounded-full bg-black/10" />
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-serif text-2xl mb-6 tracking-tighter">Destination Royale.</h3>
            <p className="text-slate-400 max-w-xs mb-8">
              Lagos & Abuja based Luxury Travel Concierge. We turn your destination dreams into Royale realities.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="hover:text-white transition-colors cursor-pointer text-sm">Destinations</li>
              <li className="hover:text-white transition-colors cursor-pointer text-sm">Visa Services</li>
              <li className="hover:text-white transition-colors cursor-pointer text-sm">Group Trips</li>
              <li className="hover:text-white transition-colors cursor-pointer text-sm">Testimonials</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-center gap-2 italic">info.destinationroyale@gmail.com</li>
              <li>Lagos, Nigeria</li>
              <li className="text-white font-bold">+234 805 871 3944</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center text-xs text-slate-500">
          © 2026 Destination Royale Concept. Developed by Abdullateef.
        </div>
      </footer>
    </div>
  );
}
