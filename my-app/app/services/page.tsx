"use client";

import { motion } from "framer-motion";
import { Plane, Users, Globe, MapPin, Heart, Shield, Anchor, ArrowRight, Check } from "lucide-react";
import Nav from "@/components/Nav";
import Link from "next/link";
import { WA } from "@/lib/elrom-data";

const wa = (msg: string) =>
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank");

const services = [
  {
    icon: Plane,
    title: "Flight Bookings",
    tagline: "Domestic & International",
    desc: "We handle flight searches, bookings, and confirmations across all major airlines. Whether you're flying within Nigeria or across continents, we find the best fares and ensure a smooth booking process.",
    points: ["All major airlines covered", "Economy, Business & First Class", "Group booking discounts", "24hr booking support"],
    msg: "Hi Elrom Holidays, I'd like to enquire about flight bookings.",
  },
  {
    icon: Users,
    title: "Group Tours",
    tagline: "Curated Group Experiences",
    desc: "Travel is better together. Our group tours are carefully curated itineraries for groups of any size — from family trips to corporate retreats. Everything from accommodation to activities is pre-arranged.",
    points: ["Groups of 5 to 50+", "Pre-arranged itineraries", "Dedicated tour coordinator", "Group discounts available"],
    msg: "Hi Elrom Holidays, I'd like to enquire about group tours.",
  },
  {
    icon: Globe,
    title: "Private Tours",
    tagline: "Fully Tailored For You",
    desc: "Your trip, your rules. Private tours are designed around your schedule, preferences, and pace. You get a dedicated guide and a completely personalised itinerary for your chosen destination.",
    points: ["Custom itinerary design", "Private guide included", "Flexible scheduling", "Any destination worldwide"],
    msg: "Hi Elrom Holidays, I'd like to enquire about a private tour.",
  },
  {
    icon: MapPin,
    title: "Visa Processing",
    tagline: "20+ Countries Handled",
    desc: "Visa applications are stressful — we take that off your plate entirely. From document preparation to submission and follow-up, our visa team handles every step with precision.",
    points: ["UK, Canada, Schengen & more", "Document checklist provided", "Application submission handled", "Real-time status updates"],
    msg: "Hi Elrom Holidays, I need help with visa processing.",
  },
  {
    icon: Heart,
    title: "Destination Weddings",
    tagline: "Say I Do, Anywhere",
    desc: "Plan the wedding of your dreams beyond your borders. We coordinate venues, vendor bookings, guest travel arrangements, accommodation, and logistics — so your special day is exactly that.",
    points: ["Venue sourcing & coordination", "Guest travel management", "Accommodation blocks", "Full logistics support"],
    msg: "Hi Elrom Holidays, I'd like to plan a destination wedding.",
  },
  {
    icon: Shield,
    title: "Travel Insurance",
    tagline: "Peace of Mind, Guaranteed",
    desc: "Things don't always go as planned. Travel insurance ensures you're covered for trip cancellations, medical emergencies, lost luggage, and flight delays — so you travel without worry.",
    points: ["Trip cancellation cover", "Medical emergency coverage", "Lost luggage protection", "Flight delay compensation"],
    msg: "Hi Elrom Holidays, I'd like to enquire about travel insurance.",
  },
  {
    icon: Anchor,
    title: "Cruises",
    tagline: "Luxury on the Open Sea",
    desc: "Experience the world from a different angle. We book cruise packages across the world's most iconic routes — Mediterranean, Caribbean, Southeast Asia — including cabin selection and shore excursions.",
    points: ["Multiple cruise lines available", "Cabin class selection", "Shore excursion packages", "Pre & post cruise stays"],
    msg: "Hi Elrom Holidays, I'd like to enquire about cruise packages.",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap'); .font-display{font-family:'Playfair Display',serif;}`}</style>
      <Nav />

      {/* Hero */}
      <div className="pt-24 pb-14 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #ffffff 60%, #fff5f5 100%)" }}>
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1B3A6B" strokeWidth="1" /></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" /></svg>
        </div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#C8102E" }}>What We Do</p>
          <h1 className="font-display font-black mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#1B3A6B" }}>
            One Agency.<br /><span className="italic" style={{ color: "#C8102E" }}>Every Journey.</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">From your first enquiry to your safe return — we handle every aspect of your travel experience.</p>
        </motion.div>
      </div>

      {/* Services */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-6">
        {services.map((s, i) => {
          const Icon = s.icon;
          const isEven = i % 2 === 0;
          return (
            <motion.div key={s.title}
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1 }}
              className={`grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500`}>

              {/* Icon panel */}
              <div className={`flex flex-col justify-center p-10 ${isEven ? "md:order-1" : "md:order-2"}`}
                style={{ background: i % 3 === 0 ? "#1B3A6B" : i % 3 === 1 ? "#f8faff" : "#fff5f5" }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: i % 3 === 0 ? "rgba(255,255,255,0.12)" : "rgba(200,16,46,0.1)" }}>
                  <Icon size={28} style={{ color: i % 3 === 0 ? "white" : "#C8102E" }} />
                </div>
                <p className="text-xs font-bold tracking-widest uppercase mb-2"
                  style={{ color: i % 3 === 0 ? "rgba(255,255,255,0.5)" : "#C8102E" }}>
                  {s.tagline}
                </p>
                <h2 className="font-display font-black text-3xl mb-4"
                  style={{ color: i % 3 === 0 ? "white" : "#1B3A6B" }}>
                  {s.title}
                </h2>
                <div className="space-y-2">
                  {s.points.map((pt) => (
                    <div key={pt} className="flex items-center gap-2.5 text-sm"
                      style={{ color: i % 3 === 0 ? "rgba(255,255,255,0.75)" : "#6b7280" }}>
                      <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: i % 3 === 0 ? "rgba(255,255,255,0.15)" : "rgba(200,16,46,0.1)" }}>
                        <Check size={9} style={{ color: i % 3 === 0 ? "white" : "#C8102E" }} />
                      </div>
                      {pt}
                    </div>
                  ))}
                </div>
              </div>

              {/* Text panel */}
              <div className={`flex flex-col justify-between p-10 bg-white ${isEven ? "md:order-2" : "md:order-1"}`}>
                <p className="text-gray-500 text-base leading-relaxed mb-8">{s.desc}</p>
                <button onClick={() => wa(s.msg)}
                  className="self-start flex items-center gap-2 text-white text-sm font-semibold px-6 py-3 rounded-full transition-all hover:scale-105"
                  style={{ background: "#C8102E" }}>
                  Enquire Now <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="py-20 px-6 text-center" style={{ background: "#1B3A6B" }}>
        <h2 className="font-display font-black text-white text-4xl mb-4">
          Not Sure Where to Start?
        </h2>
        <p className="text-white/60 mb-8 max-w-md mx-auto">Tell us where you want to go and we'll figure out the rest together.</p>
        <button onClick={() => wa("Hi Elrom Holidays, I need help planning my trip.")}
          className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105"
          style={{ background: "#C8102E" }}>
          Chat on WhatsApp <ArrowRight size={16} />
        </button>
      </div>

      <footer className="py-6 text-center border-t border-gray-100 bg-white">
        <p className="text-gray-300 text-xs">© 2026 Elrom Holidays · Website by <span style={{ color: "#1B3A6B" }}>Primyst Solutions</span></p>
      </footer>
    </div>
  );
}
