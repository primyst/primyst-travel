"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ============================================================
// THE "BEFORE" — same business as /app/page.tsx (PureQ Travels)
// Deliberately built the way most small business sites actually
// ship: wall of text, no clear next step, contact buried at the
// bottom behind a slow form. Nothing here is exaggerated for
// effect — every pattern below is copied from real sites.
// ============================================================

const COMPANY_NAME = "PureQ Travels";
const EMAIL = "info@pureqtravels.com";
const PHONE = "+234 703 561 2652";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Our Services", href: "#services" },
  { label: "Destinations", href: "#destinations" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact Us", href: "#contact" },
];

const DESTINATIONS = [
  { name: "Egypt", desc: "Explore the wonders of ancient Egypt including the pyramids, museums and much more." },
  { name: "Mombasa", desc: "A beautiful coastal city in Kenya known for its beaches and rich history." },
  { name: "Seychelles", desc: "An archipelago of 115 islands in the Indian Ocean, known for its beaches." },
  { name: "Qatar", desc: "A modern Middle Eastern country with a mix of tradition and modernity." },
  { name: "Zanzibar", desc: "A semi-autonomous region of Tanzania, famous for its spice production." },
  { name: "Beirut", desc: "The capital of Lebanon, known for its vibrant nightlife and history." },
];

const SERVICES = [
  "Flight Booking Assistance",
  "International & Domestic Visa Processing",
  "Customized Holiday Packages",
  "Guided Tour Excursions",
  "Honeymoon Package Planning",
  "Travel Insurance Consultation",
  "Hotel Reservation Services",
  "Airport Pickup Coordination",
];

const TESTIMONIALS = [
  { name: "Chidinma A.", text: "PureQ Travels helped me plan my honeymoon and it was wonderful, would recommend to anyone looking to travel." },
  { name: "Emeka O.", text: "Good service, the visa took a while but eventually it worked out fine for our Dubai trip." },
  { name: "Blessing U.", text: "I have used them twice now for my Egypt trips, they are reliable." },
];

const FAQS = [
  { q: "How do I book a trip?", a: "Please fill out our contact form below or send us an email and a member of our team will get back to you within 2-3 business days to discuss your travel needs." },
  { q: "Do you handle visa processing?", a: "Yes, we assist with visa documentation for select countries. Processing times vary by embassy and can take several weeks." },
  { q: "What payment methods do you accept?", a: "We accept bank transfer only at this time. Payment details will be provided after your itinerary is confirmed." },
  { q: "Can I get a refund if I cancel?", a: "Refund policies vary by package and airline. Please contact our office for specific terms." },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="w-full bg-white border-b border-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-800">
          {COMPANY_NAME}
        </Link>
        <nav className="hidden lg:flex items-center gap-5">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-gray-600 hover:text-gray-900">
              {link.label}
            </Link>
          ))}
        </nav>
        <button className="lg:hidden text-gray-700" onClick={() => setMobileOpen(!mobileOpen)}>
          Menu
        </button>
      </div>
      {mobileOpen && (
        <nav className="lg:hidden flex flex-col border-t border-gray-200 px-4 py-2">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="py-2 text-sm text-gray-600 border-b border-gray-100">
              {link.label}
            </Link>
          ))}
        </nav>
      )}
      {/* secondary info bar — pushes actual content further down */}
      <div className="bg-gray-100 text-center text-xs text-gray-500 py-2 border-t border-gray-200">
        Registered Travel Agency | Est. 2021 | Open Monday - Friday, 9am - 5pm WAT
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative w-full h-[420px]">
      <Image
        src="hero-banner.jpg"
        alt="Travel banner"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-2">
          Welcome to {COMPANY_NAME}
        </h1>
        <p className="text-white/90 text-sm max-w-xl">
          Your number one travel agency for all your travel and tourism needs.
          We have been in operation since 2021, offering flight booking, visa
          processing, holiday packages and much more to our esteemed clients
          across Nigeria and beyond.
        </p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="max-w-4xl mx-auto px-4 py-12 text-gray-700 text-sm leading-relaxed">
      <h2 className="text-xl font-bold text-gray-800 mb-4">About {COMPANY_NAME}</h2>
      <p className="mb-4">
        {COMPANY_NAME} was founded with a mission to make travel accessible and
        stress-free for everyone. Over the years, we have grown into one of the
        trusted names in the travel industry, providing a wide range of services
        including flight booking, visa processing, holiday packages, and tour
        excursions to destinations across Africa, the Middle East and beyond.
      </p>
      <p className="mb-4">
        Our team is made up of experienced travel consultants who are passionate
        about helping our clients create memorable travel experiences. We believe
        that everyone deserves the opportunity to explore the world, and we work
        hard to make that possible through competitive pricing, personalized
        service and attention to detail.
      </p>
      <p>
        Whether you are planning a family vacation, a honeymoon, a business trip
        or a solo adventure, {COMPANY_NAME} is here to guide you every step of the
        way. Reach out to us today to begin planning your next journey.
      </p>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Our Services</h2>
        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600 list-disc list-inside">
          {SERVICES.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Destinations() {
  return (
    <section id="destinations" className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Popular Destinations</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DESTINATIONS.map((d) => (
          <div key={d.name} className="border border-gray-200 rounded p-4">
            <div className="w-full h-32 bg-gray-200 mb-3 flex items-center justify-center text-gray-400 text-xs">
              image coming soon
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">{d.name}</h3>
            <p className="text-xs text-gray-500">{d.desc}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-4">
        Prices and availability not listed online. Please contact our office for a quote.
      </p>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Gallery</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 flex items-center justify-center text-[10px] text-gray-400">
              img_{i + 1}.jpg
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-xl font-bold text-gray-800 mb-6">What Our Clients Say</h2>
      <div className="space-y-4">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="border-l-2 border-gray-300 pl-4">
            <p className="text-sm text-gray-600 italic mb-1">&quot;{t.text}&quot;</p>
            <p className="text-xs text-gray-400">— {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section id="faq" className="bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {FAQS.map((f, i) => (
            <div key={f.q} className="border border-gray-200 rounded">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 flex justify-between items-center"
              >
                {f.q}
                <span className="text-gray-400">{openIdx === i ? "-" : "+"}</span>
              </button>
              {openIdx === i && (
                <p className="px-4 pb-3 text-xs text-gray-500">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", destination: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="max-w-2xl mx-auto px-4 py-12">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Contact Us</h2>
      <p className="text-sm text-gray-500 mb-6">
        Fill out the form below and a member of our team will respond within
        2-3 business days.
      </p>

      {submitted ? (
        <div className="border border-gray-300 rounded p-6 text-sm text-gray-600">
          Thank you for reaching out. Your message has been received and we
          will get back to you shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Full Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Email Address</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Phone Number</label>
            <input
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Preferred Destination</label>
            <input
              value={form.destination}
              onChange={(e) => setForm({ ...form, destination: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Message</label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-gray-800 text-white text-sm font-medium px-6 py-2.5 rounded"
          >
            Submit Enquiry
          </button>
        </form>
      )}
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="max-w-6xl mx-auto px-4 text-center text-xs space-y-2">
        <p>{COMPANY_NAME} | {PHONE} | {EMAIL}</p>
        <p>&copy; 2026 {COMPANY_NAME}. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default function BeforePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Services />
      <Destinations />
      <Gallery />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <Footer />
    </main>
  );
}
